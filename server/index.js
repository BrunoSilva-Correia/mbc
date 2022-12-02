const express = require('express');
const { serverConfig } = require('./config/settings')

async function startServer() {

  const app = express()
  require('./loaders/express')(app)

  app.listen(serverConfig.port, () => {
      console.log(`Server listening on port: ${serverConfig.port}`);
  }).on('error', err => {
      console.error(err);
      process.exit(1);
  });

}

startServer()
