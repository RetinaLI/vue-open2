// let fs = require('fs');
// let path = require('path');

module.exports = {
  login () {
    return {
      'authFailTimes': 1,
      'info': '成功11111',
      'success': true,
      'texts': '',
      'url': '',
      'user': {'id': 41}
    };
  },
  regist () {
    return {
      'code': 1,
      'msg': 'success!!!!!'
    };
  },
  retrivePassword () {
    return {
      'data': {
        'email': 'we233@foton.cn'
      },
      'code': 1,
      'msg': 'success'
    };
  },
  resetPassword () {
    return {
      'code': 1,
      'msg': 'success'
    };
  },
  resendCode () {
    return {
      'data': {
        'email': 'we233@foton.cn'
      },
      'code': 1,
      'msg': 'success'
    };
  },
  logout () {
    return {
      'info': '退出成功啦啦啦',
      'success': true,
      'text': '',
      'url': ''
    };
  },
  checkAjax () {
    return {
      'code': 1,
      'msg': 'chengg啦啦啦啦啦'
    };
  }
};
