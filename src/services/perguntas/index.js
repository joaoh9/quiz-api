'use strict';

module.exports = async function(fastify) {
  fastify.register(require('./consultar-perguntas'));
  fastify.register(require('./cadastrar-pergunta'));
  fastify.register(require('./recuperar-pergunta'));
  fastify.register(require('./atualizar-pergunta'));
  fastify.register(require('./remover-pergunta'));
};
