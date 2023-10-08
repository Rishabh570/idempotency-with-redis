const express = require('express');

const loaders = require('./loaders');
const { urlRoutes } = require('./routes');

const app = express();

loaders
  .run()
  .then(({ service }) => {
    app.use(express.urlencoded({ limit: '5mb', extended: true }));
    app.use(express.json({ limit: '5mb' }));

    // Health check route
    app.get('/', (req, res) => {
      res.json({ status: true });
    });

    // Main app route(s)
    app.use('/url', urlRoutes({ service }));

    // Error handlers
    process.on('uncaughtException', (err) => {
      console.error(`uncaughtException error: ${err}`);
      process.exit(1);
    });

    process.on('unhandledRejection', (err) => {
      console.error(`uncaughtRejection error: ${err}`);
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error(`Could not initialize server: ${err}`);
    process.exit(1);
  });

module.exports = app;
