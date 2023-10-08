const mongoose = require('mongoose');

const { database } = require('../../config');

module.exports = {
  getConnection: async () => {
    try {
      mongoose.connection.on('open', function () {
        console.debug(`mongodb: 'open'`);
      });
      mongoose.connection.on('connected', function () {
        console.debug('mongodb: "connected"');
      });
      mongoose.connection.on('error', function (err) {
        console.error(err);
      });
      mongoose.connection.on('reconnected', function () {
        console.debug(`mongodb: 'reconnected'`);
      });
      mongoose.connection.on('disconnecting', function () {
        console.debug(`mongodb: 'disconnecting'`);
      });
      mongoose.connection.on('disconnected', function () {
        console.debug(`mongodb: 'disconnected'`);
      });
      mongoose.connection.on('close', function () {
        console.debug(`mongodb: 'close'`);
      });

      await mongoose.connect(database.host);
      return mongoose.connection;
    } catch (e) {
      console.error(`Could not initialize mongoose connection: ${e}`);
      return null;
    }
  },
};
