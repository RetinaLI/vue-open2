/**
 * 设置api接口
 * @type {boolean}
 * localhostDev = true 开发环境 : 生产环境;
 * @param url: 必填required
 * @param method: 请求方式 -- default: 'get'
 * @param isList: 是否需要列表格式[] -- default: false
 * @param delay: 请求延迟，单位毫秒 -- default: 0
 */

export const REQUEST_METHOD_MAP = {
  GET: 'get',
  POST: 'post'
};

// const HOST = localhostDev ? 'http://localhost:8081' : 'http://xxx.com';
const HTTP_URL_MAP = {
  // 'list': {
  //   url: _host + '/profile/menus',
  //   method: 'get',
  //   isList: true
  // }
  'getCurrentUser': {
    url: '/api/front/me/userInfo.json',
    method: REQUEST_METHOD_MAP.GET,
    isList: false
  },
  'getApiListByKeywords': {
    url: '/api/list-by-keywords',
    method: REQUEST_METHOD_MAP.GET,
    isList: false
  },
  'getApiBaseDetail': {
    url: '/api/detail/base',
    method: REQUEST_METHOD_MAP.GET,
    isList: false
  },
  'login': {
    url: '/api/front/user/login.json',
    method: REQUEST_METHOD_MAP.POST,
    isList: false
  },
  // 行业&产品动态
  'getDynamicIndustry': {
    url: '/nosecurity/api/front/news/listNews.json',
    method: REQUEST_METHOD_MAP.GET,
    isList: false
  },
  // 行业&产品动态
  'getDynamicProducts': {
    url: '/nosecurity/api/front/news/listNews.json',
    method: REQUEST_METHOD_MAP.GET,
    isList: false
  },
  // service页面 获取数据列表
  'getInterfaces': {
    url: '/nosecurity/api/front/apiInfo/list.json',
    method: REQUEST_METHOD_MAP.GET,
    isList: false
  },
  // service页面 获取数据类型列表
  'getListApiType': {
    url: '/nosecurity/api/front/apiType/list.json',
    method: REQUEST_METHOD_MAP.GET,
    isList: false
  },
  // serviceDetail页面 获取单个数据详情
  'getApiDetail': {
    url: '/nosecurity/api/front/apiInfo/getById.json',
    method: REQUEST_METHOD_MAP.GET,
    isList: false
  },
  // 数据服务页面 申请数据
  'applyData': {
    url: '/api/front/apiSubscibe/applyData.json',
    method: REQUEST_METHOD_MAP.GET,
    isList: false
  },
  // 控制台 根据状态申请数据
  'getListAudit': {
    url: '/api/front/apiInfo/listAudit.json',
    method: REQUEST_METHOD_MAP.GET,
    isList: false
  },
  // 控制台-我的数据
  'getApiSubscibe': {
    url: '/api/front/apiSubscibe/listCallInfo.json',
    method: REQUEST_METHOD_MAP.GET,
    isList: false
  },
  // 控制台-数据看板1
  'getInterfaceUsage': {
    url: '/api/front/accountRecord/user.json',
    method: REQUEST_METHOD_MAP.GET,
    isList: false
  },
  // 控制台-数据看板2
  'getHalfMonthIUsage': {
    url: '/api/front/accountDaily/userReq15Days.json',
    method: REQUEST_METHOD_MAP.GET,
    isList: false
  },
  // 个人中心
  'getInfoToken': {
    url: '/api/front/me/resetToken.json',
    isList: false
  },
  'getInfoCode': {
    url: '/api/front/verification/getChangeEmailCode.json',
    isList: false
  },
  'postName': {
    url: '/api/front/me/updateName.json',
    method: REQUEST_METHOD_MAP.POST,
    isList: false
  },
  'postEmail': {
    url: '/api/front/me/changeEmail.json',
    method: REQUEST_METHOD_MAP.POST,
    isList: false
  },
  'postOldCode': {
    url: '/api/front/verification/checkOldEmailCode.json',
    method: REQUEST_METHOD_MAP.POST,
    isList: false
  },
  'postNewCode': {
    url: '/api/front/verification/getNewEmailCode.json',
    method: REQUEST_METHOD_MAP.POST,
    isList: false
  },
  'postImg': {
    url: '/file!uploadFiles.do',
    method: REQUEST_METHOD_MAP.POST
  },
  'postPay': {
    url: '/api/front/balance/recharge.json',
    method: REQUEST_METHOD_MAP.POST,
    isList: false
  },
  'postEwm': {
    url: '/api/front/balance/rechargePrecreate.json',
    method: REQUEST_METHOD_MAP.POST,
    isList: false
  },
  'getEwmUrl': {
    url: '/pay/scanPayPrecreate.json',
    isList: false
  },
  'postPayRes': {
    url: '/gateway/pay/scanPay/orderQueryByOrderNo.json',
    method: REQUEST_METHOD_MAP.POST,
    isList: false
  },
  'postPaied': {
    url: '/gateway/pay/scanPay/toPayResult.htm',
    method: REQUEST_METHOD_MAP.POST,
    isList: false
  },
  'getBalanceTop': {
    url: '/api/front/balance/userAmountInfo.json',
    isList: false
  },
  'getBalanceTabPay': {
    url: '/api/front/balance/paymentRecord.json',
    isList: true
  },
  'getBalanceTabCost': {
    url: '/console/getBalanceTabCost',
    isList: true
  },
  'getAuth': {
    url: '/api/front/auth/getByUser.json',
    isList: false
  },
  'postAuth': {
    url: '/api/front/auth/save.json',
    method: REQUEST_METHOD_MAP.POST,
    isList: false
  },
  'getNews': {
    url: '/api/front/inMail/list.json',
    isList: false
  },
  'postNews': {
    url: '/api/front/inMail/get.json',
    method: REQUEST_METHOD_MAP.POST,
    isList: false
  },
  // 数据中心-数据详情
  'getDetail': {
    url: '/api/front/accountDaily/getApiSummaryEndOfYesterday.json',
    isList: false
  },
  'getDetailChart': {
    url: '/api/front/accountMonthly/getApiSixMonthSummary.json',
    isList: false
  },
  'getDetailMonth': {
    url: '/api/front/accountMonthly/getApiMonthlyListByPage.json',
    isList: true
  },
  'getDetailDay': {
    url: '/api/front/accountDaily/getApiDailyListByPage.json',
    isList: true
  },
  'getDetailTable': {
    url: '/console/getDetailTable',
    isList: true
  },
  'getCarList': {
    url: '/api/front/userCar/listByPage.json',
    isList: true
  },
  // 登录注册
  'getIdentifyCodeUrl': {
    url: '/captcha.pic',
    isList: false
  },
  'regist': {
    url: '/api/front/user/register.json',
    method: REQUEST_METHOD_MAP.POST,
    isList: false
  },
  'retrivePassword': {
    url: '/api/front/user/checkEmail.json',
    method: REQUEST_METHOD_MAP.POST,
    isList: false
  },
  'resetPassword': {
    url: '/api/front/user/resetPwd.json',
    method: REQUEST_METHOD_MAP.POST,
    isList: false
  },
  'resendCode': {
    url: '/nosecurity/api/front/verification/sendEmailCode.json',
    method: REQUEST_METHOD_MAP.POST,
    isList: false
  },
  'logout': {
    url: '/api/front/user/logout.json',
    method: REQUEST_METHOD_MAP.GET,
    isList: false
  },
  'checkAjax': {
    url: '/api/front/user/checkRegisterInfo.json',
    method: REQUEST_METHOD_MAP.POST,
    isList: false
  },
  'modifyAvatar': {
    url: '/api/front/me/modifyHeadImage.json',
    method: REQUEST_METHOD_MAP.POST,
    isList: false
  },
  'submitFile': {
    url: '/api/front/userCar/importUserCar.json',
    method: REQUEST_METHOD_MAP.POST,
    isList: false
  }
};

let getUrlConfig = (action) => {
  let result = Object.assign({
    url: '',
    action: action,
    method: REQUEST_METHOD_MAP.GET,
    isList: false,
    delay: 0
  }, HTTP_URL_MAP[action]);
  result.url = process.env.NODE_ENV !== 'production'
    ? `/api${result.url}`
    : `${result.url}`;
  return result;
};

export { getUrlConfig };
