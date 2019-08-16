'use strict';

const perguntaSchema = require('./pergunta.schema');
const core = require('../../../../core');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(perguntaSchema);

  fastify.get(
    '/perguntas/:perguntaId',
    schemaHelper.get('Retorna os detalhes de um pergunta cadastrada'),
    async function({ params: { perguntaId } }) {
      const pergunta = await core.pergunta.recuperar(perguntaId);

      if (!pergunta) {
        throw fastify.httpErrors.notFound();
      }

      return pergunta;
    }
  );
};
