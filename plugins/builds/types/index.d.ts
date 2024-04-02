import {BuildModel, EventModel, PipelineModel, StageModel} from './models.js';
import {BuildFactory, PipelineFactory, EventFactory, StageBuildFactory, StageFactory, JobFactory, BannerFactory, TriggerFactory} from 'screwdriver-models';

// -----------------------------------------------------------------------------
//      Build API Plugin Server
// -----------------------------------------------------------------------------
/**
 * These are the assigned arguments of hapi servers expose function
 */
export type ServerConfig = {
    pipeline: PipelineModel;
    job: JoinJob;
    build: BuildModel;
    username: number;
    scmContext: string;
    event: EventModel;
    stage: StageModel | null;
};

export type ServerApp = {
    buildFactory: BuildFactory;
    pipelineFactory: PipelineFactory;
    eventFactory: EventFactory;
    stageBuildFactory: StageBuildFactory;
    stageFactory: StageFactory;
    jobFactory: JobFactory;
    bannerFactory: BannerFactory;
    triggerFactory: TriggerFactory;
};

// -----------------------------------------------------------------------------
//      JoinPipelines
// -----------------------------------------------------------------------------
/**
 * JoinPipelines is used in 'createJoinObject' in 'helper.js'
 */
export type JoinPipelines = Record<string, JoinJobs>;

export type JoinJobs = {
    jobs: Record<string, JoinJob>;
    event: string;
};

export type JoinJob = {
    id: string;
    join: Array<Join>;
    isExternal: boolean;
};

export type Join = {
    name: string;
    id: number;
};

// -----------------------------------------------------------------------------
//      JobInfo
// -----------------------------------------------------------------------------
/**
 * JobInfo is used in 'parseJobInfo' in 'helper.js'
 */
export type JobInfo = {
    parentBuilds: Record<string, ParentBuild>,
    joinListNames: Array<string>,
    joinParentBuilds: Record<string, {
        eventId: object;
        jobs: Record<string, object>,
    }>,
}

export type ParentBuild = {
    eventId: number;
    jobs: Record<string, number>,
}
