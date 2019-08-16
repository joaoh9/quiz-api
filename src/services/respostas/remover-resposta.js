'use strict';

const respostaSchema = require('./resposta.schema');
const core = require('../../../../core');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(respostaSchema);

  fastify.delete(
    '/respostas/:respostaId',
    schemaHelper.remove('Remove uma reposta cadastrada'),
    async function({ params: { respostaId } }) {
      try {
        return await core.resposta.remover(respostaId);
      } catch ({ message }) {
        throw fastify.httpErrors.notFound(message);
      }
    }
  );
};
