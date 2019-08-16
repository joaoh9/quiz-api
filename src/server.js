'use strict';

const path = require('path');
const AutoLoad = require('fastify-autoload');
const helmet = require('fastify-helmet');
const fastifyEnv = require('fastify-env');
const fastifySensible = require('fastify-sensible');
const fastifyCircuitBreaker = require('fastify-circuit-breaker');
const fastifySwagger = require('fastify-swagger');
const fp = require('fastify-plugin');
const database = require('./core/database-utils');

/* eslint no-unused-vars:0 */
module.exports = async function(fastify, opts) {
  fastify.register(fastifyEnv, {
    schema: {
      type: 'object',
      required: ['PORT', 'NODE_ENV'],
      properties: {
        PORT: {
          type: 'string',
          default: 3000,
        },
        NODE_ENV: {
          type: 'string',
          default: 'development',
        },
      },
    },
  });

  fastify.register(fastifySwagger, {
    exposeRoute: true,
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'Quiz Liberal',
        description: 'Quiz liberal description',
        version: '0.0.1',
      },
    },
  });

  fastify.register(
    fp(async function() {
      await database.connect();

      fastify.addHook('onClose', () => database.disconnect());
    })
  );

  fastify.register(fastifyCircuitBreaker);
  fastify.register(fastifySensible);

  fastify.register(helmet, { hidePoweredBy: { setTo: 'PHP 4.2.0' } });

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
  });

  // This loads all plugins defined in services
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services'),
    options: { prefix: '/api' },
  });

  fastify.ready().then(() => {
    fastify.swagger();
  });
};
