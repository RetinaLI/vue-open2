let fs = require('fs');
let path = require('path');

module.exports = {
  getAuth () {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../json/real-auth.json')));
  }
};
