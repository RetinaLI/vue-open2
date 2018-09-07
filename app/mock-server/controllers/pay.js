// let fs = require('fs');
// let path = require('path');

module.exports = {
  // getAuth () {
  //   return JSON.parse(fs.readFileSync(path.join(__dirname, '../json/real-auth.json')));
  // },
  postPay () {
    return {
      code: 1,
      msg: 'success'
    }
  },
  postEwm () {
    return {
      code: 1,
      data: {
        orderPrice: 'lksjflksjfljlkjlkjgdkjf',
        payWayType: 'ALIPAY',
        orderNo: '30',
        accountNo: '7893798437743984',
        orderForm: '开放平台充值',
        productName: '开发平台',
        orderIp: '172.12.22.22',
        returnUrl: '',
        orderId: '100'
      },
      msg: 'success'
    }
  },
  postPayRes() {
    return {
      code: 1,
      data: {
        status: 'YES',
        orderPrice: '60',
        returnUrl: '',
        productName: '开放平台充值'
      },
      msg: 'success'
    }
  },
  postPaied () {
    return {
      code: 1,
      msg: '跳出'
    }
  },
  getEwmUrl() {
    return {
      code: 1,
      data: {
        url: 'http://localhost:8081/public/img/identify.png'
      },
      msg: 'success'
    }
  }
};
