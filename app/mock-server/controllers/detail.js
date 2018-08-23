let fs = require('fs');
let path = require('path');

module.exports = {
  getDetail () {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../json/detail.json')));
  },
  getDetailChart () {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../json/detail-chart.json')));
  },
  getDetailTable () {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../json/detail-table.json')));
  }
};
