'use strict';

module.exports = async function(fastify) {
  fastify.register(require('./consultar-respostas'));
  fastify.register(require('./cadastrar-resposta'));
  fastify.register(require('./recuperar-resposta'));
  fastify.register(require('./atualizar-resposta'));
  fastify.register(require('./remover-resposta'));
  fastify.register(require('./recuperar-resposta-com-pergunta'));
};
