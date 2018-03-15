'use strict';

const { Router } = require('express');

const client = require('smartsheet');
const level = process.env.NODE_ENV === 'production' ? null : 'info';
const smartsheet = client.createClient({ accessToken: process.env.SMARTSHEET_ACCESS_TOKEN, logLevel: level });

module.exports = new Router()

  // GETS ALL THE TODOS
  .get('/todos', (req, res, next) => {
    smartsheet.sheets.getSheet({ id: req.sheetId })
      .then(result => {
        res.json(result);
      })
      .catch(next);
  })
  // GETS INDIVIDUAL TODO
  .get('/todos/:id', (req, res, next) => {
    smartsheet.sheets.getRow({ sheetId: req.sheetId, rowId: req.params.id })
      .then(result => {
        res.json(result);
      })
      .catch(next);
  })
  // POST A TODO
  .post('/todos', (req, res, next) => {
    smartsheet.sheets.addRows({ sheetId: req.sheetId, body: req.body })
      .then(result => {
        res.json(result);
      })
      .catch(next);
  })
  
  // UPDATES A TODO
  .put('/todos', (req, res, next) => {
    smartsheet.sheets.updateRow({ sheetId: req.sheetId, body: req.body })
      .then(result => {
        res.json(result);
      })
      .catch(next);
  })
  // DELETES A TODO
  .delete('/todos/:id', (req, res, next) => {
    smartsheet.sheets.deleteRow({ sheetId: req.sheetId, rowId: req.params.id })
      .then(result => {
        res.json(result);
      })
      .catch(next);
  });
