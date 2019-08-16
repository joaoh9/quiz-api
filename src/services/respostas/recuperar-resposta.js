'use strict';

const respostaSchema = require('./resposta.schema');
const core = require('../../../../core');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(respostaSchema);

  fastify.get(
    '/respostas/:respostaId',
    schemaHelper.get('Retorna os detalhes de uma resposta cadastrada'),
    async function({ params: { respostaId } }) {
      const resposta = await core.resposta.recuperar(respostaId);

      if (!resposta) {
        throw fastify.httpErrors.notFound();
      }

      return resposta;
    }
  );
};
