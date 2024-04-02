import {BuildModel, EventModel, PipelineModel, StageModel} from './models.js';

export type JoinPipelines = Record<string, Jobs>;

export type Jobs = {
    jobs: Record<string, Job>;
    event: string;
};

export type Job = {
    id: string;
    join: Array<Join>;
    isExternal: boolean;
};

export type Join = {
    name: string;
    id: number;
};

export type ParsedJobInfo = {
    parentBuilds: Record<string, {
        eventId: number;
        jobs: Record<string, number>,
    }>,
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

// -----------------------------------------------------------------------------
//      Config
// -----------------------------------------------------------------------------
export type ServerConfig = {
    pipeline: PipelineModel;
    job: Job;
    build: BuildModel;
    username: number;
    scmContext: string;
    event: EventModel;
    stage: StageModel | null;
};

// -----------------------------------------------------------------------------
//      App
// -----------------------------------------------------------------------------
import {BuildFactory, PipelineFactory, EventFactory, StageBuildFactory, StageFactory, JobFactory, BannerFactory, TriggerFactory} from 'screwdriver-models';

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
