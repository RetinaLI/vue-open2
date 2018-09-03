let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();
let router = express.Router();
let config = require('../config/index');
let ControllerMap = require('./controllers');
const port = config.dev.mockServerPort;
let multiparty = require('multiparty');
let fs = require('fs');
/*
 * 访问静态资源文件时，express.static 中间件会根据目录添加的顺序查找所需的文件。
 * 第一个 参数 指定访问静态文件名称【支持正则方式】  第二个参数文件所在目录
 */
app.use('/public', express.static(path.join(__dirname, '/public')));

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));

const URL_PREFIXERS = '/api';

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  next();
});

router.get(URL_PREFIXERS + '/test', (req, res) => {
  res.status(200).send('ok, come on!');
});

router.get(URL_PREFIXERS + '/api/front/me/userInfo.json', (req, res) => {
  res.status(200).send(ControllerMap.profile.getCurrentUser());
});

router.get(URL_PREFIXERS + '/api/front/me/userInfo.json', (req, res) => {
  res.status(200).send(ControllerMap.profile.getCurrentUser());
});

router.get(URL_PREFIXERS + '/profile/menus', (req, res) => {
  res.status(200).send(ControllerMap.profile.getValidMenus());
});

router.get(URL_PREFIXERS + '/profile/list', (req, res) => {
  res.status(200).send(ControllerMap.profile.getApiList());
});

router.post(URL_PREFIXERS + '/api/front/user!login.do', (req, res) => {
  res.status(200).send(ControllerMap.passport.login());
});
// 行业&产品动态
router.get(URL_PREFIXERS + '/nosecurity/api/front/news/listNews.json',
  (req, res) => {
    res.status(200).send(ControllerMap.profile.getDynamicIndustry());
  });
// 行业&产品动态
router.get(URL_PREFIXERS + '/nosecurity/api/front/news/listNews.json',
  (req, res) => {
    res.status(200).send(ControllerMap.profile.getDynamicProducts());
  });

// service页面 获取数据列表
router.get(URL_PREFIXERS + '/nosecurity/api/front/apiInfo/list.json',
  (req, res) => {
    res.status(200).send(ControllerMap.profile.getInterfaces());
  });
// 控制台-我的数据
router.get(URL_PREFIXERS + '/api/front/apiSubscibe/list.json', (req, res) => {
  res.status(200).send(ControllerMap.profile.getApiSubscibe());
});

// service页面 获取数据类型列表
router.get(URL_PREFIXERS + '/nosecurity/api/front/apiType/list.json',
  (req, res) => {
    res.status(200).send(ControllerMap.profile.getListApiType());
  });

// ServiceDetail页面 获取单个数据详情
router.get(URL_PREFIXERS + '/nosecurity/api/front/apiInfo/getById.json',
  (req, res) => {
    res.status(200).send(ControllerMap.profile.getApiDetail());
  });

// 数据服务页面 申请/购买数据
router.get(URL_PREFIXERS + '/api/front/apiSubscibe/applyData.json',
  (req, res) => {
    res.status(200).send(ControllerMap.profile.applyData());
  });

// 控制台-个人中心
router.get(URL_PREFIXERS + '/api/front/balance/sumRechargeByMonth.json',
  (req, res) => {
    res.status(200).send(ControllerMap.balance.getBalanceTop());
  });
// 控制台-申请数据
router.get(URL_PREFIXERS + '/api/front/apiInfo/listAudit.json', (req, res) => {
  res.status(200).send(ControllerMap.profile.getInterfaces());
});

router.get(URL_PREFIXERS + '/api/front/balance/rechargeRrecord.json',
  (req, res) => {
    res.status(200).send(ControllerMap.balance.getBalanceTabPay());
  });

router.get(URL_PREFIXERS + '/console/getBalanceTabCost', (req, res) => {
  res.status(200).send(ControllerMap.balance.getBalanceTabCost());
});

router.get(URL_PREFIXERS + '/console/getInfo', (req, res) => {
  res.status(200).send(ControllerMap.info.getInfo());
});

router.get(URL_PREFIXERS + '/api/front/verification/getChangeEmailCode.json',
  (req, res) => {
    res.status(200).send(ControllerMap.info.getInfoCode());
  });

router.get(URL_PREFIXERS + '/api/front/me/resetToken.json', (req, res) => {
  res.status(200).send(ControllerMap.info.getInfoToken());
});

router.post(URL_PREFIXERS + '/api/front/me/updateName.json', (req, res) => {
  res.status(200).send(ControllerMap.info.postName());
});

router.post(URL_PREFIXERS + '/file!uploadFiles.do', (req, res) => {
  var form = new multiparty.Form({ uploadDir: './public/img/' });

  // 上传完成后处理
  form.parse(req, function (err, fields, files) {
    var filesTmp = JSON.stringify(files, null, 2);

    if (err) {
      console.log('parse error: ' + err);
    } else {
      console.log('parse files: ' + filesTmp);
      var inputFile = files.inputFile[0];
      var uploadedPath = inputFile.path;
      var dstPath = './public/files/' + inputFile.originalFilename;

      // 重命名为真实文件名
      fs.rename(uploadedPath, dstPath, function (err) {
        if (err) {
          console.log('rename error: ' + err);
        } else {
          console.log('rename ok');
        }
      });
    }

    res.status(200).send(ControllerMap.info.postImg());
  });
});

router.post(URL_PREFIXERS + '/api/front/me/changeEmail.json', (req, res) => {
  res.status(200).send(ControllerMap.info.postEmail());
});

router.post(URL_PREFIXERS + '/api/front/verification/checkOldEmailCode.json', (req, res) => {
  res.status(200).send(ControllerMap.info.postOldCode());
});

router.post(URL_PREFIXERS + '/api/front/verification/getNewEmailCode.json', (req, res) => {
  res.status(200).send(ControllerMap.info.postNewCode());
});

router.get(URL_PREFIXERS + '/api/front/auth/getByUser.json',
  (req, res) => {
    res.status(200).send(ControllerMap.auth.getAuth());
  });

router.post(URL_PREFIXERS + '/api/front/auth/save.json', (req, res) => {
  res.status(200).send(ControllerMap.auth.postAuth());
});

router.post(URL_PREFIXERS + '/api/front/user/recharge.json', (req, res) => {
  res.status(200).send(ControllerMap.pay.postPay());
});

router.get(URL_PREFIXERS + '/console/getNews', (req, res) => {
  res.status(200).send(ControllerMap.news.getNews());
});

router.get(URL_PREFIXERS + '/console/getDetail', (req, res) => {
  res.status(200).send(ControllerMap.detail.getDetail());
});

router.get(URL_PREFIXERS + '/console/getDetailChart', (req, res) => {
  res.status(200).send(ControllerMap.detail.getDetailChart());
});

router.get(URL_PREFIXERS + '/console/getDetailTable', (req, res) => {
  res.status(200).send(ControllerMap.detail.getDetailTable());
});

router.get(URL_PREFIXERS + '/captcha.pic', (req, res) => {
  res.sendFile(path.join(__dirname, '/json/identify.png'));
});

router.post(URL_PREFIXERS + '/api/front/user/checkEmail.json', (req, res) => {
  res.status(200).send(ControllerMap.passport.retrivePassword());
});

router.post(URL_PREFIXERS + '/api/front/user/register.json', (req, res) => {
  res.status(200).send(ControllerMap.passport.regist());
});

router.post(URL_PREFIXERS + '/api/front/user/resetPwd.json', (req, res) => {
  res.status(200).send(ControllerMap.passport.resetPassword());
});

router.post(URL_PREFIXERS + '/nosecurity/api/front/verification/sendEmailCode.json', (req, res) => {
  res.status(200).send(ControllerMap.passport.resendCode());
});

router.get(URL_PREFIXERS + '/api/front/user!logout.do', (req, res) => {
  res.status(200).send(ControllerMap.passport.logout());
});

router.post(URL_PREFIXERS + '/api/front/me/modifyHeadImage.json', (req, res) => {
  res.status(200).send(ControllerMap.info.modifyAvatar());
});
app.use(router);
app.listen(port, () => {
  console.info(
    `mock server start success! please visit: http://localhost:${port}/***`);
});
module.exports = app;
