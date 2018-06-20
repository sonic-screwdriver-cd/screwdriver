'use strict';

const boom = require('boom');
const joi = require('joi');
const schema = require('screwdriver-data-schema');
const getSchema = schema.models.pipeline.get;
const idSchema = joi.reach(schema.models.pipeline.base, 'id');

module.exports = () => ({
    method: 'GET',
    path: '/pipelines/{id}',
    config: {
        description: 'Get a single pipeline',
        notes: 'Returns a pipeline record',
        tags: ['api', 'pipelines'],
        auth: {
            strategies: ['token'],
            scope: ['user', 'build', 'pipeline']
        },
        plugins: {
            'hapi-swagger': {
                security: [{ token: [] }]
            }
        },
        handler: (request, reply) => {
            const factory = request.server.app.pipelineFactory;
            const id = request.params.id;
            const isValidToken = request.server.plugins.pipelines.isValidToken;

            if (!isValidToken(id, request.auth.credentials)) {
                return reply(boom.unauthorized('Token does not have permission to this pipeline'));
            }

            return factory.get(id)
                .then((pipeline) => {
                    if (!pipeline) {
                        throw boom.notFound('Pipeline does not exist');
                    }

                    return reply(pipeline.toJson());
                })
                .catch(err => reply(boom.wrap(err)));
        },
        response: {
            schema: getSchema
        },
        validate: {
            params: {
                id: idSchema
            }
        }
    }
});
