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
    url: '/profile/detail',
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
  'getLoginUserFormInfo': {
    url: '/passport',
    method: REQUEST_METHOD_MAP.GET,
    isList: false
  },
  'getDynamicIndustry': {
    url: '/profile/dynamicIndustry',
    method: REQUEST_METHOD_MAP.GET,
    isList: false
  },
  'getDynamicProducts': {
    url: '/profile/dynamicProducts',
    method: REQUEST_METHOD_MAP.GET,
    isList: false
  },
  'getInterfaces': {
    url: '/profile/interfaces',
    method: REQUEST_METHOD_MAP.GET,
    isList: false
  },
  'getApiDetail': {
    url: '/profile/apiDetail',
    method: REQUEST_METHOD_MAP.GET,
    isList: false
  },
  'getBalance': {
    url: '/console/getBalance',
    isList: false
  },
  'getBalanceTabPay': {
    url: '/console/getBalanceTabPay',
    isList: true
  },
  'getBalanceTabCost': {
    url: '/console/getBalanceTabCost',
    isList: true
  },
  'getInfo': {
    url: '/console/getInfo',
    isList: false
  },
  'getInfoEmail': {
    url: '/console/getInfoEmail',
    isList: false
  },
  'getInfoToken': {
    url: '/console/getInfoToken',
    isList: false
  },
  'getAuth': {
    url: '/console/getAuth',
    isList: false
  },
  'getNews': {
    url: '/console/getNews',
    isList: true
  },
  'getDetail': {
    url: '/console/getDetail',
    isList: false
  },
  'getDetailChart': {
    url: '/console/getDetailChart',
    isList: true
  },
  'getDetailTable': {
    url: '/console/getDetailTable',
    isList: true
  },
  'getIdentifyCodeUrl': {
    url: '/captcha.pic',
    isList: true
  },
  'getRegistInfo': {
    url: '/passport/regist',
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
  result.url = process.env.NODE_ENV !== 'production' ? `/api${result.url}` : result.url;
  return result;
};

export {getUrlConfig};
