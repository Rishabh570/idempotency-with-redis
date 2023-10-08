
module.exports = ({ service }) => {
  const urlController = require('./url')({ service });

  return {
    urlController,
  }
};
