const express = require('express');

//const db = require('./data/dbConfig.js');
const accountRouter = require('./routers/accountsRouter.js');

const server = express();

server.use(express.json());
server.use('/accounts', accountRouter);

server.get('/', (req, res) => {
  res.send('API UP AND RUNNING');
});

module.exports = server;
