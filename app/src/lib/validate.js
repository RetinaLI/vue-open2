import { PassportService } from '@/services/passport';

let passportService = new PassportService();

export default class ValidateFactory {
  static NumAndWord (rule, value, callback) {
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{18}$/;
    if (!reg.test(value)) {
      callback(new Error('请输入18位字母和数字组合'));
    } else {
      callback();
    }
  }

  static account = {
    fn: (rule, value, callback) => {
      if (value === '') {
        callback(new Error('*请输入用户名'));
      } else {
        let targ = /^([A-Za-z0-9]{8,16})$/;
        let targ2 = /^\d+$/;

        if (targ2.test(value)) {
          callback(new Error('*请输入8-16位字母或字母数字'));
        } else if (!targ.test(value)) {
          callback(new Error('*请输入8-16位字母或字母数字'));
        }
        callback();
      }
    },
    echeck: (rule, value, callback) => {
      passportService.checkAjax({
        zk_captcha: value,
        type: 1
      }).then((res) => {
        if (res.code === 1) {
          callback();
        }
        if (res.code === -1) {
          callback(new Error(res.message));
        }
        callback();
      });
    }
  };

  static nickName (rule, value, callback) {
    if (value === '') {
      callback(new Error('*请输入昵称'));
    } else {
      let targ = /^[\u4E00-\u9FA5A-Za-z0-9]{2,16}$/;

      if (!targ.test(value)) {
        callback(new Error('请输入2-16位并且不包含特殊字符:*-/等'));
      }
      callback();
    }
  }

  static password = {
    min: 8,
    max: 20,
    message: '*密码长度8-20位',
    fn: (rule, value, callback) => {
      if (value === '') {
        callback(new Error('*请输入密码'));
      } else {
        callback();
      }
    }
  };

  static identifyCode4 = {
    fn: (rule, value, callback) => {
      if (!value) {
        return callback(new Error('*验证码不能为空'));
      } else {
        let targ = /^([A-Za-z0-9]{4})$/;
        if (!targ.test(value)) {
          callback(new Error('*请输入正确验证码'));
        } else {
          callback();
        }
      }
    },
    echeck: (rule, value, callback) => {
      passportService.checkAjax({
        zk_captcha: value,
        type: 2
      }).then((res) => {
        if (res.code === 1) {
          callback();
        }
        if (res.code === -1) {
          callback(new Error(res.message));
        }
      });
    }
  };

  static identifyCode6 (rule, value, callback) {
    if (!value) {
      return callback(new Error('*验证码不能为空'));
    } else {
      let targ = /^([A-Za-z0-9]{6})$/;
      if (!targ.test(value)) {
        callback(new Error('*请输入正确验证码'));
      } else {
        callback();
      }
    }
  }

  static email = {
    fn: (rule, value, callback) => {
      if (!value) {
        return callback(new Error('*邮箱不能为空'));
      } else {
        let targ = /^[a-zA-Z0-9_.-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/;
        if (!targ.test(value)) {
          callback(new Error('*请输入正确邮箱'));
        } else {
          callback();
        }
      }
    },
    echeck: (rule, value, callback) => {
      passportService.checkAjax({
        zk_captcha: value,
        type: 3
      }).then((res) => {
        if (res.code === 1) {
          callback();
        }
        if (res.code === -1) {
          callback(new Error(res.message));
        }
      });
    }
  };

  static retrieveAccount (rule, value, callback) {
    if (!value) {
      return callback(new Error('*此项不能为空'));
    } else {
      let targ1 = /^[a-zA-Z0-9_.-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/;
      let targ2 = /^([A-Za-z0-9]{8,16})$/;
      let targ0 = /^\d+$/;
      if (targ0.test(value)) {
        callback(new Error('*请输入账号或邮箱'));
      } else if (!targ1.test(value) && !targ2.test(value)) {
        callback(new Error('*请输入账号或邮箱'));
      } else {
        callback();
      }
    }
  }
}
