let fs = require('fs');
let path = require('path');

module.exports = {
  getNews () {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../json/news.json')));
  },
};
