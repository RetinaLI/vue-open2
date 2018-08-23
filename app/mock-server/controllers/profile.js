let fs = require('fs');
let path = require('path');

module.exports = {
  getValidMenus () {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../json/valid-menus.json')));
  },
  getCurrentUser () {
    return {
      data: {
        "id":1,
        "name": "王小虎",
        "counter": 88,
        "fee":15,
        "expire":"2016-05-04"
      }
    };
  },
  getApiList () {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../json/api-list.json')));
  },
  getDynamicIndustry () {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../json/dynamic-industry.json')));
  },
  getDynamicProducts () {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../json/dynamic-products.json')));
  },
  getInterfaces () {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../json/interfaces.json')));
  },
  getApiDetail () {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../json/apiDetail.json')));
  }
};
