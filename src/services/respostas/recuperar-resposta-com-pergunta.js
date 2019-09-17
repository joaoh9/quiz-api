'use strict';

const respostaSchema = require('./resposta.schema');
const core = require('../../../../core/src');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(respostaSchema);

  fastify.get(
    '/respostas/pergunta/:perguntaId',
    schemaHelper.get(
      'Retorna os detalhes de uma resposta cadastrada com o Id da pergunta que ela faz referência'
    ),
    async function({ params: { perguntaId } }) {
      const resposta = await core.resposta.recuperarPelaPergunta(perguntaId);

      if (!resposta) {
        throw fastify.httpErrors.notFound();
      }

      return resposta;
    }
  );
};
