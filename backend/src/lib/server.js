'use strict';

require('dotenv').config();

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const jsonParser = require('body-parser').json();
const smartsheetRouter = require('../route/smartsheet-router.js');
const smartsheetMiddleware = require('./smartsheet-middleware.js');

let server = null;
const app = express();
const production = process.env.NODE_ENV === 'production';

app.use(jsonParser);
app.use(morgan(production ? 'combined' : 'dev'));
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use(smartsheetMiddleware);

// routes
app.use(smartsheetRouter);

// 404 routes
app.all('*', (req, res) => res.sendStatus(404));
// error handler
app.use(require('./error-middleware'));

module.exports = {
  start: () => {
    return new Promise((resolve, reject) => {
      if (server)
        return reject(new Error('__SERVER_ERROR__ The server is already running'));
      server = app.listen(process.env.PORT, () => {
        console.log(`__SERVER_ON__ running on PORT ${process.env.PORT}`);
        return resolve();
      });
    });
  },
  stop: () => {
    return new Promise((resolve, reject) => {
      if (server)
        return reject(new Error('__SERVER_ERROR__ The server is already off'));
      server = null;
      console.log('__SERVER_OFF__');
      return resolve;
    });
  },
};