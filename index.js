const app = require('./src/app');

const PORT = 8201;
const server = app.listen(PORT, () => {
  console.info(`🎉🎉🎉 Application running on port: ${PORT} 🎉🎉🎉`);
});

module.exports = server;
