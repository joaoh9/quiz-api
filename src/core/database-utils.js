'use strict';

const core = require('../../../core');

module.exports = {
  connect: async () => {
    return core.db.connect('mongodb://localhost:27017', 'quiz-liberal');
  },
  disconnect: async () => {
    return core.db.disconnect();
  },
};
