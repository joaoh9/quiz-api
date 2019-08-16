'use strict';

const respostaSchema = require('./resposta.schema');
const core = require('../../../../core');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(respostaSchema);

  fastify.post('/respostas', schemaHelper.create('Cadastra uma nova resposta'), async function({
    body: novaResposta,
  }) {
    try {
      return await core.resposta.cadastrar(novaResposta);
    } catch ({ message }) {
      throw fastify.httpErrors.notFound(message);
    }
  });
};
