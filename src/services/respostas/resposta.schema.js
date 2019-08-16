'use strict';

module.exports = {
  object: {
    type: 'object',
    properties: {
      pergunta: {
        type: 'string',
        bsonType: 'objectId',
        description: 'Id da pergunta relacionado a essa resposta',
      },
      opcoes: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            resposta: {
              type: 'string',
            },
            certa: {
              type: 'boolean',
              description: 'indica se a resposta está certa ou errada',
            },
          },
        },
        description: 'possiveis respostas da pergunta',
      },
    },
    required: ['pergunta'],
  },
  params: {
    type: 'object',
    properties: {
      respostaId: {
        type: 'string',
        bsonType: 'objectId',
        description: 'O identificador único da resposta',
      },
    },
    required: ['respostaId'],
  },
};
