'use strict';

const { test } = require('tap');
const core = require('../../core');
const { register } = require('./test-helpers');

const perguntaPadrao = {
  pergunta: 'Quem escreveu a obra \'Ação Humana\'?',
  dificuldade: 'facil',
};

const respostaPadrao = pergunta => ({
  pergunta: pergunta,
  opcoes: [
    { resposta: 'Ludwig Von Mises', certa: true },
    { resposta: 'Carl Menger', certa: false },
    { resposta: 'Hans Hermann Hoppe', certa: false },
    { resposta: 'Frederich Hayek', certa: false },
  ],
});

test('lista respostas cadastradas', async t => {
  const fastify = await register(t);

  const { statusCode, payload } = await fastify.inject({
    url: '/api/respostas',
  });

  t.same(statusCode, 200);
  t.same(payload, '[]');
  t.end();
});

test('cadastra nova resposta', async t => {
  const fastify = await register(t);

  const { _id: perguntaId } = await core.pergunta.cadastrar(perguntaPadrao);

  const res = await fastify.inject({
    method: 'POST',
    url: '/api/respostas',
    payload: respostaPadrao(perguntaId),
  });

  t.same(res.statusCode, 200);
  t.end();
});

test('recupera uma resposta usando um id válido', async t => {
  const fastify = await register(t);

  const { _id: perguntaId } = await core.pergunta.cadastrar(perguntaPadrao);
  const { _id: respostaId } = await core.resposta.cadastrar(respostaPadrao(perguntaId));

  t.ok(respostaId);

  const { statusCode } = await fastify.inject({
    url: `/api/respostas/${respostaId}`,
  });

  t.same(statusCode, 200);
  t.end();
});

test('responde 404 ao recuperar uma resposta usando um id não cadastrado', async t => {
  const fastify = await register(t);

  const idInvalido = core.db.ObjectId();

  const { statusCode } = await fastify.inject({
    url: `/api/respostas/${idInvalido}`,
  });

  t.same(statusCode, 404);
  t.end();
});

test('recupera uma resposta usando um id válido de uma pergunta', async t => {
  const fastify = await register(t);

  const { _id: perguntaId } = await core.pergunta.cadastrar(perguntaPadrao);
  const { _id: respostaId } = await core.resposta.cadastrar(respostaPadrao(perguntaId));

  t.ok(respostaId);

  const { statusCode } = await fastify.inject({
    url: `/api/respostas/pergunta/${perguntaId}`,
  });

  t.same(statusCode, 200);
  t.end();
});

test('responde 404 ao recuperar uma resposta usando um id não cadastrado de uma pergunta', async t => {
  const fastify = await register(t);

  const idInvalido = core.db.ObjectId();

  const { statusCode } = await fastify.inject({
    url: `/api/respostas/pergunta/${idInvalido}`,
  });

  t.same(statusCode, 404);
  t.end();
});

test('atualiza uma resposta já cadastrada', async t => {
  const fastify = await register(t);

  const { _id: perguntaId } = await core.pergunta.cadastrar(perguntaPadrao);
  const { _id: respostaId } = await core.resposta.cadastrar(respostaPadrao(perguntaId));

  t.ok(respostaId);

  const mudancas = {
    opcoes: [
      { resposta: 'Ludwig Von Mises', certa: true },
      { resposta: 'Carl Menger', certa: false },
      { resposta: 'Hans Hermann Hoppe', certa: false },
      { resposta: 'Frederich Hayek', certa: false },
      { resposta: 'Murray Rothbard', certa: false },
    ],
  };

  const { statusCode, payload } = await fastify.inject({
    method: 'POST',
    url: `/api/respostas/${respostaId}`,
    payload: mudancas,
  });

  const payloadJson = JSON.parse(payload);

  t.same(payloadJson.opcoes, mudancas.opcoes);
  t.same(statusCode, 200);
  t.end();
});

test('responde 404 quando tenta atualizar uma resposta não cadastrada', async t => {
  const fastify = await register(t);

  const idInvalido = core.db.ObjectId();

  const { statusCode } = await fastify.inject({
    method: 'POST',
    url: `/api/respostas/${idInvalido}`,
    payload: {},
  });

  t.same(statusCode, 404);
  t.end();
});

test('deleta uma resposta usando um id válido', async t => {
  const fastify = await register(t);

  const { _id: perguntaId } = await core.pergunta.cadastrar(perguntaPadrao);
  const resposta = await core.resposta.cadastrar(respostaPadrao(perguntaId));

  t.ok(resposta._id);

  const { statusCode } = await fastify.inject({
    method: 'DELETE',
    url: `/api/respostas/${resposta._id}`,
  });

  t.same(statusCode, 200);

  t.end();
});

test('retorna 404 ao tentar deletar uma resposta com id inválido', async t => {
  const fastify = await register(t);

  const idInvalido = core.db.ObjectId();

  const { statusCode } = await fastify.inject({
    method: 'DELETE',
    url: `/api/respostas/${idInvalido}`,
  });

  t.same(statusCode, 404);
  t.end();
});
