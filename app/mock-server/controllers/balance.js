let fs = require('fs');
let path = require('path');

module.exports = {
  getBalanceTop () {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../json/balance.json')));
  },
  getBalanceTabPay () {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../json/balancePay.json')));
  },
  getBalanceTabCost () {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../json/balanceCost.json')));
  },
  getInterfaceUsage () {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../json/interfaceUsage.json')));
  },
  getHalfMonthIUsage () {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../json/userReq15Days.json')));
  }
};
