let fs = require('fs');
let path = require('path');

module.exports = {
  getInfo () {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../json/info.json')));
  },
  getInfoEmail () {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../json/info-email.json')));
  },
  getInfoToken () {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../json/info-token.json')));
  },
};
