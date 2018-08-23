
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();
let router = express.Router();
let config = require('../config/index');
let ControllerMap = require('./controllers');
const port = config.dev.mockServerPort;

/*
 * 访问静态资源文件时，express.static 中间件会根据目录添加的顺序查找所需的文件。
 * 第一个 参数 指定访问静态文件名称【支持正则方式】  第二个参数文件所在目录
 */
app.use('/public', express.static(path.join(__dirname,'/public')));

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  next();
});

router.get('/api/test', (req, res) => {
  res.status(200).send('ok, come on!');
});

router.get('/api/profile/detail', (req, res) => {
  res.status(200).send(ControllerMap.profile.getCurrentUser());
});

router.get('/api/profile/menus', (req, res) => {
  res.status(200).send(ControllerMap.profile.getValidMenus());
});

router.get('/api/profile/list', (req, res) => {
  res.status(200).send(ControllerMap.profile.getApiList());
});

router.get('/api/front/user!login.do', (req, res) => {
  res.status(200).send(ControllerMap.passport.getLoginUserFormInfo());
});
router.get('/api/profile/dynamicIndustry', (req, res) => {
  res.status(200).send(ControllerMap.profile.getDynamicIndustry());
});

router.get('/api/profile/dynamicProducts', (req, res) => {
  res.status(200).send(ControllerMap.profile.getDynamicProducts());
});

router.get('/api/profile/interfaces', (req, res) => {
  res.status(200).send(ControllerMap.profile.getInterfaces());
});

router.get('/api/profile/apiDetail', (req, res) => {
  res.status(200).send(ControllerMap.profile.getApiDetail());
});

// 控制台-个人中心
router.get('/api/console/getBalance', (req, res) => {
  res.status(200).send(ControllerMap.balance.getBalanceTop());
});

router.get('/api/console/getBalanceTabPay', (req, res) => {
  res.status(200).send(ControllerMap.balance.getBalanceTabPay());
});

router.get('/api/console/getBalanceTabCost', (req, res) => {
  res.status(200).send(ControllerMap.balance.getBalanceTabCost());
});

router.get('/api/console/getInfo', (req, res) => {
  res.status(200).send(ControllerMap.info.getInfo());
});

router.get('/api/console/getInfoEmail', (req, res) => {
  res.status(200).send(ControllerMap.info.getInfoEmail());
});

router.get('/api/console/getInfoToken', (req, res) => {
  res.status(200).send(ControllerMap.info.getInfoToken());
});

router.get('/api/console/getAuth', (req, res) => {
  res.status(200).send(ControllerMap.auth.getAuth());
});

router.get('/api/console/getNews', (req, res) => {
  res.status(200).send(ControllerMap.news.getNews());
});

router.get('/api/console/getDetail', (req, res) => {
  res.status(200).send(ControllerMap.detail.getDetail());
});

router.get('/api/console/getDetailChart', (req, res) => {
  res.status(200).send(ControllerMap.detail.getDetailChart());
});

router.get('/api/console/getDetailTable', (req, res) => {
  res.status(200).send(ControllerMap.detail.getDetailTable());
});

router.get('/api/captcha.pic', (req, res) => {
  res.sendFile(path.join(__dirname, '/json/identify.png'));
});

router.get('/api/front/user/register.json', (req, res) => {
  res.status(200).send(ControllerMap.passport.getRegistInfo());
});

app.use(router);
app.listen(port, () => {
  console.info(`mock server start success! please visit: http://localhost:${port}/***`);
});
module.exports = app;
