const mongoose = require('./mongoose');
const redis = require('./redis');
const serviceModule = require('./service');

let mongoClient;

module.exports = {
  run: () => {
    return new Promise(async (resolve, reject) => {
      if (mongoClient) return mongoClient;

      mongoClient = await mongoose.getConnection();
      const { redlock } = await redis.init();
      const service = serviceModule.init({ redlock });
      // other dependencies init goes here...

      resolve({ service });
    });
  },
};
