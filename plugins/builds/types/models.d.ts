// -----------------------------------------------------------------------------
//      screwdriver-models.PipelineModel
// -----------------------------------------------------------------------------
/**
 * @example
 * import {PipelineModel} from 'screwdriver-models/lib/pipeline'
 * >>> PipelineModel
 */
export type PipelineModel = {
    id: number;
    name: string;
    scmUri: string;
    scmContext: string;
    scmRepo: {
        branch: string;
        name: string;
        url: string;
        rootDir: string;
        private: boolean;
    },
    createTime: string;
    admins: Record<string, boolean>,
    workflowGraph: {
        nodes: Array<{
            name: string;
            id: number;
        }>,
        edges: Array<{
            src: string;
            dest: string;
            join: boolean;
        }>,
    },
    annotations: {},
    lastEventId: number;
    configPipelineId: undefined;
    childPipelines: undefined;
    prChain: boolean;
    parameters: {},
    settings: {},
    state: string;
    subscribedScmUrlsWithActions: Array<unknown>
    badges: undefined;
    templateVersionId: undefined;
    admin: {},
}

// -----------------------------------------------------------------------------
//      screwdriver-models.Job
// -----------------------------------------------------------------------------
/**
 * import('screwdriver-models/lib/job').Job
 */
export type Job = {
    title: undefined;
    createTime: undefined;
    username: undefined;
    userProfile: undefined;
    url: undefined;
    id: number;
    name: string;
    prParentJobId: undefined;
    permutations: Array<{
        annotations: {},
        commands: Array<{
            name: string;
            command: string;
        }>,
        environment: {},
        image: string;
        secrets: [],
        settings: {},
        requires: Array<string>,
    }>,
    description: undefined;
    pipelineId: number;
    state: string;
    stateChanger: undefined;
    stateChangeTime: undefined;
    stateChangeMessage: undefined;
    archived: boolean;
    templateId: undefined;
    pipeline: {},
};
// -----------------------------------------------------------------------------
//      screwdriver-models.BuildModel
// -----------------------------------------------------------------------------
/**
 * import('screwdriver-models/lib/build').BuildModel
 */
export type BuildModel = {
    id: number;
    environment: Array<Record<string, string>>,
    eventId: number;
    jobId: number;
    parentBuildId: undefined;
    parentBuilds: undefined;
    number: number;
    container: string;
    cause: string;
    sha: string;
    subscribedConfigSha: undefined;
    createTime: string;
    startTime: string;
    endTime: string;
    parameters: undefined;
    meta: {
        build: {
            buildId: string;
            eventId: string;
            jobId: string;
            jobName: string;
            pipelineId: string;
            sha: string;
        },
        commit: {
            author: {
                avatar: string;
                id: string;
                name: string;
                url: string;
                username: string;
            },
            changedFiles: string;
            committer: {
                avatar: string;
                id: string;
                name: string;
                url: string;
                username: string;
            },
            message: string;
            url: string;
        },
        event: {
            creator: string;
        },
    },
    status: string;
    statusMessage: undefined;
    stats: {},
    templateId: undefined;
    buildClusterName: undefined;
    job: {},
    pipeline: {},
};

// -----------------------------------------------------------------------------
//      screwdriver-models.EventModel
// -----------------------------------------------------------------------------
/**
 * import('screwdriver-models/lib/event').EventModel
 */
export type EventModel = {
    id: number;
    parentEventId: undefined;
    groupEventId: number;
    causeMessage: string;
    commit: {
        author: {
            id: string;
            avatar: string;
            name: string;
            username: string;
            url: string;
        },
        committer: {
            id: string; ;
            avatar: string;
            name: string;
            username: string;
            url: string;
        },
        message: string;
        url: string;
    },
    createTime: string;
    creator: {
        id: string;
        avatar: string;
        name: string;
        username: string;
        url: string;
    },
    meta: {
        build: {
            buildId: string;
            eventId: string;
            jobId: string;
            jobName: string;
            pipelineId: string;
            sha: string;
        },
        commit: {
            author: {
                avatar: string;
                id: string;
                name: string;
                url: string;
                username: string;
            },
            changedFiles: string;
            committer: {
                avatar: string;
                id: string;
                name: string;
                url: string;
                username: string;
            },
            message: string;
            url: string;
        },
        event: {
            creator: string;
        },
    },
    pipelineId: number;
    sha: string;
    configPipelineSha: undefined;
    startFrom: string;
    type: string;
    workflowGraph: {
        nodes: Array<{
            name: string;
            id: number;
        }>,
        edges: Array<{
            src: string;
            dest: string;
            join: boolean;
        }>,
    },
    pr: {},
    prNum: undefined;
    baseBranch: string;
}

export type StageModel = object;
