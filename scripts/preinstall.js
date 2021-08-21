const fs = require('fs');
const path = require('path');
fs.writeFile(
  path.join(__dirname, '../google-credentials-heroku.json'),
  process.env.GOOGLE_CONFIG,
  (err) => {
    err && console.log(err);
  },
);
