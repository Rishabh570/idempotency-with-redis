module.exports = {
  init: ({ redlock }) => {
    const service = require('../service')({ redlock });
    return service;
  }
}