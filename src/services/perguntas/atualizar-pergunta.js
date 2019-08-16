'use strict';

const perguntaSchema = require('./pergunta.schema');
const core = require('../../../../core');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(perguntaSchema);

  fastify.post(
    '/perguntas/:perguntaId',
    schemaHelper.update('Atualiza informações de um pergunta cadastrada'),
    async function({ params: { perguntaId }, body: atualizacoes }) {
      try {
        return await core.pergunta.atualizar(perguntaId, atualizacoes);
      } catch ({ message }) {
        throw fastify.httpErrors.notFound(message);
      }
    }
  );
};
