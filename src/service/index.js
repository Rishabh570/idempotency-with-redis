module.exports = ({ redlock }) => {
  const urlService = require('./url')({ redlock });

  return {
    urlService,
  }
}
