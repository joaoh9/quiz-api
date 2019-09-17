'use strict';

module.exports = {
  object: {
    type: 'object',
    properties: {
      pergunta: {
        type: 'string',
      },
      dificuldade: {
        type: 'string',
      },
    },
    required: ['pergunta', 'dificuldade'],
  },
  params: {
    type: 'object',
    properties: {
      perguntaId: {
        type: 'string',
        bsonType: 'objectId',
        description: 'O identificador único de uma pergunta',
      },
    },
    required: ['perguntaId'],
  },
};
