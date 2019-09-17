'use strict';

const Fastify = require('fastify');
const server = require('../src/server');
let fastify;
const core = require('../../core');

exports.register = async function register(t, logger) {
  if (logger) {
    logger = { level: 'debug', prettyPrint: true };
  }

  fastify = Fastify({
    logger,
  });

  server(fastify, {}, () => {});
  t.teardown(() => fastify.close());
  await fastify.ready();

  await core.db.getDB('quiz-liberal').dropDatabase();

  return fastify;
};
