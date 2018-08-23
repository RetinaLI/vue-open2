// let fs = require('fs');
// let path = require('path');

module.exports = {
  getLoginUserFormInfo () {
    return {
      'data': {
        'authFailTimes': 0,
        'info': '',
        'success': true,
        'texts': '',
        'url': '',
        'user': {'id': 41}
      }
    };
  }

  getRegistInfo () {
    return {
      'code': 1,
      'msg': 'success'
    };
  }

};
