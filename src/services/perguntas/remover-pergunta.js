'use strict';

const perguntaSchema = require('./pergunta.schema');
const core = require('../../../../core');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(perguntaSchema);

  fastify.delete('/perguntas/:perguntaId', schemaHelper.remove('Remove um pergunta cadastrada'), async function({
    params: { perguntaId },
  }) {
    try {
      return await core.pergunta.remover(perguntaId);
    } catch ({ message }) {
      throw fastify.httpErrors.notFound(message);
    }
  });
};
