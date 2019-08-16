'use strict';

const perguntaSchema = require('./pergunta.schema');
const core = require('../../../../core');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(perguntaSchema);

  fastify.get('/perguntas', schemaHelper.query('Consulta os perguntas cadastrados'), async function() {
    return core.pergunta.consultar();
  });
};
