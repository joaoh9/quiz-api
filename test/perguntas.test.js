'use strict';

const { test } = require('tap');
const core = require('../../core');
const { register } = require('./test-helpers');

const perguntaPadrao = {
  pergunta: 'Quem escreveu a obra \'Ação Humana\'?',
  dificuldade: 'facil',
};

test('lista perguntas cadastrados', async t => {
  const fastify = await register(t);

  const { statusCode, payload } = await fastify.inject({
    url: '/api/perguntas',
  });

  t.same(statusCode, 200);
  t.same(payload, '[]');
  t.end();
});

test('cadastra novo pergunta', async t => {
  const fastify = await register(t);

  console.log(perguntaPadrao);
  const res = await fastify.inject({
    method: 'POST',
    url: '/api/perguntas',
    payload: perguntaPadrao,
  });

  t.same(res.statusCode, 200);
  t.end();
});

test('recupera um pergunta usando um id válido', async t => {
  const fastify = await register(t);

  const { _id: perguntaId } = await core.pergunta.cadastrar(perguntaPadrao);

  const { statusCode } = await fastify.inject({
    url: `/api/perguntas/${perguntaId}`,
  });

  t.same(statusCode, 200);
  t.end();
});

test('responde 404 ao recuperar um pergunta usando um id não cadastrado', async t => {
  const fastify = await register(t);

  const idInvalido = core.db.ObjectId();

  const { statusCode } = await fastify.inject({
    url: `/api/perguntas/${idInvalido}`,
  });

  t.same(statusCode, 404);
  t.end();
});

test('atualiza um pergunta já cadastrado', async t => {
  const fastify = await register(t);

  const { _id: perguntaId } = await core.pergunta.cadastrar(perguntaPadrao);

  t.ok(perguntaId);

  const mudancas = {
    pergunta: 'Quem escreveu a obra: "O caminho da servidão"?',
  };

  const { statusCode } = await fastify.inject({
    method: 'POST',
    url: `/api/perguntas/${perguntaId}`,
    payload: mudancas,
  });

  t.same(statusCode, 200);
  t.end();
});

test('responde 404 quando atualiza um pergunta não cadastrado', async t => {
  const fastify = await register(t);
  const idInvalido = core.db.ObjectId();

  const { statusCode } = await fastify.inject({
    method: 'POST',
    url: `/api/perguntas/${idInvalido}`,
    payload: perguntaPadrao,
  });

  t.same(statusCode, 404);
  t.end();
});

test('deleta um pergunta usando um id válido', async t => {
  const fastify = await register(t);

  const { _id: perguntaId } = await core.pergunta.cadastrar(perguntaPadrao);

  t.ok(perguntaId);

  const { statusCode } = await fastify.inject({
    method: 'DELETE',
    url: `/api/perguntas/${perguntaId}`,
  });

  t.same(statusCode, 200);
  t.end();
});

test('retorna 404 ao tentar deleter um pergunta com id inválido', async t => {
  const fastify = await register(t);
  const idInvalido = core.db.ObjectId();

  const { statusCode } = await fastify.inject({
    method: 'DELETE',
    url: `/api/perguntas/${idInvalido}`,
  });

  t.same(statusCode, 404);
  t.end();
});
