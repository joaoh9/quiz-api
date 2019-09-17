'use strict';

const perguntaSchema = require('./pergunta.schema');
const core = require('../../../../core');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(perguntaSchema);

  fastify.post('/perguntas', schemaHelper.create('Cadastra uma nova pergunta'), async function({
    body: novaPergunta,
  }) {
    return core.pergunta.cadastrar(novaPergunta);
  });
};
