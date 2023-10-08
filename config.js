module.exports = {
  database: {
    host:
      process.env.MONGODB_URL ||
      'mongodb://localhost:27017/redis-idempotency-db',
  },
};
