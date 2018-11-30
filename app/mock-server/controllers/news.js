let fs = require('fs');
let path = require('path');

module.exports = {
  getNews () {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../json/news.json')));
  },
  postNews () {
    return {
      code: 1,
      msg: 'success',
      data: {
        id: 1,
        isRead: 1
      }
    }
  },
};
