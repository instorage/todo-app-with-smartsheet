'use strict';
const client = require('smartsheet');

const level = process.env.NODE_ENV === 'production' ? null : 'info';
const smartsheet = client.createClient({ accessToken: process.env.SMARTSHEET_ACCESS_TOKEN, logLevel: level });

let sheetId;
let sheetAppName = process.env.SHEET_APP_NAME;
let initialSetup = {
  body: {
    name: sheetAppName,
    columns: [
      {
        title: 'ToDo',
        primary: true,
        type: 'TEXT_NUMBER',
      },
      {
        title: 'Status',
        type: 'CHECKBOX',
      },
      {
        title: 'Due Date',
        type: 'DATE',
      },
      {
        title: 'Category',
        type: 'PICKLIST',
        options: ['Work', 'Home', 'Honey-Do', 'Bucket', 'Misc'],
      },
    ],
  },
};

module.exports = (req, res, next) => {

  if (!sheetId) {
    // checks whether the sheet already exists
    smartsheet.sheets.getSheet()
      .then(res => {
        // if sheet does exist, find it and return it
        let matchingSheets = res.data.filter(sheet => sheet.name === sheetAppName);
        if (matchingSheets.length > 0)
          return matchingSheets[0];
        // if it doesn't exist, create it
        let newSheet = smartsheet.sheets.createSheet(initialSetup)
          .then(res => {
            return res.result;
          })
          .catch(err => console.log(err));
        return newSheet;
      })
      .then(res => {
        sheetId = res.id;
        req.sheetId = sheetId;
        next();
      })
      .catch(next);
  }

  // if the sheet has been found once, there should be a sheetId in store
  if (sheetId) {
    req.sheetId = sheetId;
    next();
  }
};
