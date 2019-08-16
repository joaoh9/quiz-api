'use strict';

const respostaSchema = require('./resposta.schema');
const core = require('../../../../core');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(respostaSchema);

  fastify.post(
    '/respostas/:respostaId',
    schemaHelper.update('Atualiza informações de um resposta cadastrada'),
    async function({ params: { respostaId }, body: atualizacoes }) {
      try {
        return await core.resposta.atualizar(respostaId, atualizacoes);
      } catch ({ message }) {
        throw fastify.httpErrors.notFound(message);
      }
    }
  );
};
