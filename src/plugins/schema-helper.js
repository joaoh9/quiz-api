'use strict';

const fp = require('fastify-plugin');

function schemaHelper(schema) {
  const addIdToObject = object => ({
    ...object,
    properties: {
      _id: {
        type: 'string',
      },
      ...object.properties,
    },
  });

  return {
    create(descricaoOperacao) {
      return {
        schema: {
          description: descricaoOperacao,
          body: schema.object,
          response: {
            200: addIdToObject(schema.object),
          },
        },
      };
    },

    get(descricaoOperacao) {
      return {
        schema: {
          description: descricaoOperacao,
          params: schema.params,
          response: {
            200: addIdToObject(schema.object),
          },
        },
      };
    },

    update(descricaoOperacao) {
      return {
        schema: {
          description: descricaoOperacao,
          params: schema.params,
          body: {
            ...schema.object,
            required: [],
          },
          response: {
            200: addIdToObject(schema.object),
          },
        },
      };
    },

    query(descricaoOperacao) {
      return {
        schema: {
          description: descricaoOperacao,
          response: {
            200: {
              type: 'array',
              items: addIdToObject(schema.object),
            },
          },
        },
      };
    },

    processamentoArquivos(descricaoOperacao) {
      return {
        schema: {
          description: descricaoOperacao,
          response: {
            200: addIdToObject(schema.object),
          },
        },
      };
    },

    remove(descricaoOperacao) {
      return this.get(descricaoOperacao);
    },
  };
}

module.exports = fp(async function(fastify) {
  fastify.decorate('schemaHelper', schemaHelper);
});
