const express = require('express');

const urlRouter = express.Router();

module.exports = ({ service }) => {
  const { urlController } = require('../controller')({ service });

  urlRouter.post('/create', urlController.create);
  urlRouter.get('/:slug', urlController.get);

  return urlRouter;
}
