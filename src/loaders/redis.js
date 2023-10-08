const Redis = require('ioredis');
const { default: Redlock, ResourceLockedError } = require('redlock');

module.exports = {
  init: () => {
    // Create a Redis instance
    const redisClient = new Redis({
      port: 6379,
      host: "127.0.0.1",
    });

    const redlock = new Redlock([redisClient], { retryCount: 0 });

    redlock.on("error", (error) => {
      // Resource is explicitly marked as locked on a client
      if (error instanceof ResourceLockedError) {
        console.log(`[REDIS][ResourceLockedError]: ${error}`);
        return;
      }
    
      // Log all other errors.
      console.error(`[REDIS][ERROR]: ${error}`);
    });

    return { redisClient, redlock };
  },
}