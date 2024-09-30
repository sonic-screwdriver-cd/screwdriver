'use strict';

const { createInternalBuild, Status } = require('./helpers');

/**
 * @typedef {import('screwdriver-models').BuildFactory} BuildFactory
 * @typedef {import('screwdriver-models').JobFactory} JobFactory
 * @typedef {import('screwdriver-models').PipelineFactory} PipelineFactory
 * @typedef {import('screwdriver-models/lib/build')} Build
 * @typedef {import('screwdriver-models/lib/event')} Event
 */

class OrBase {
    /**
     * Trigger the next jobs of the current job
     * @param {Object} app Server app object
     * @param {BuildFactory} app.buildFactory
     * @param {JobFactory} app.jobFactory
     * @param {PipelineFactory} app.pipelineFactory
     * @param {Object} config Configuration object
     * @param {Build} config.currentBuild
     * @param {String} config.username
     * @param {String} config.scmContext
     */
    constructor(app, config) {
        this.buildFactory = app.buildFactory;
        this.jobFactory = app.jobFactory;
        this.pipelineFactory = app.pipelineFactory;

        this.currentBuild = config.build;
        this.username = config.username;
        this.scmContext = config.scmContext;
    }

    /**
     * Trigger the next jobs of the current job
     * @param {Event} event
     * @param {Number} pipelineId
     * @param {Job} nextJob
     * @param {import('./helpers').ParentBuilds} parentBuilds
     * @param {Boolean} isNextJobVirtual
     * @return {Promise<Build|null>}
     */
    async trigger(event, pipelineId, nextJob, parentBuilds, isNextJobVirtual) {
        let nextBuild = await this.buildFactory.get({
            eventId: event.id,
            jobId: nextJob.id
        });

        const hasFreezeWindows =
            nextJob.permutations[0].freezeWindows && nextJob.permutations[0].freezeWindows.length > 0;

        if (nextBuild !== null) {
            if (Status.isStarted(nextBuild.status)) {
                return nextBuild;
            }

            // Bypass execution of the build if the job is virtual
            if (isNextJobVirtual && !hasFreezeWindows) {
                nextBuild.status = Status.SUCCESS;

                return nextBuild.update();
            }

            nextBuild.status = Status.QUEUED;
            await nextBuild.update();

            return nextBuild.start();
        }

        nextBuild = await createInternalBuild({
            jobFactory: this.jobFactory,
            buildFactory: this.buildFactory,
            pipelineId,
            jobName: nextJob.name,
            jobId: nextJob.id,
            username: this.username,
            scmContext: this.scmContext,
            event,
            baseBranch: event.baseBranch || null,
            parentBuilds,
            parentBuildId: this.currentBuild.id,
            start: hasFreezeWindows || !isNextJobVirtual
        });

        // Bypass execution of the build if the job is virtual
        if (isNextJobVirtual && !hasFreezeWindows) {
            nextBuild.status = Status.SUCCESS;

            nextBuild = nextBuild.update();
        }

        return nextBuild;
    }
}

module.exports = {
    OrBase
};
