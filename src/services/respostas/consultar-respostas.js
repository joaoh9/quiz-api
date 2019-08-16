'use strict';

const respostaSchema = require('./resposta.schema');
const core = require('../../../../core');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(respostaSchema);

  fastify.get('/respostas', schemaHelper.query('Retorna as respostas cadastradas'), async function() {
    return core.resposta.consultar();
  });
};
