
export const REQUEST_METHODS = {
  GET: 'GET',
  POST: 'POST'
};

export class ServerRoutesService {
  constructor () {
    this.checkValid();
  }

  /*
    routeMap = {
      [x:string]: [
        url: string,
        REQUEST_METHOD: string,
        callbackIsList: boolean,
        delay: number
      ]
    };
  */
  routeMap = {
    'getCurrentUser': ['/api/profile/detail', REQUEST_METHODS.GET, false, 0],
    'getValidMenus': ['/api/profile/menus', REQUEST_METHODS.GET, true, 0],
    'getApiList': ['/api/profile/list', REQUEST_METHODS.GET, true, 0],
    'getLoginUserFormInfo': ['/api/passport/login', REQUEST_METHODS.GET, false, 0]
  }

  checkValid () {
    let actionMap = {};
    let urlMap = {};
    Object.keys(this.routeMap).forEach(action => {
      if (actionMap[action]) {
        actionMap[action]++;
        console.warn(`action repeat: ${action}`);
      } else {
        actionMap[action] = 1;
      }
      let actionConfig = this.routeMap[action];
      let url = actionConfig[0];

      if (urlMap[url]) {
        urlMap[url]++;
        console.warn(`request url repeat: ${url}`);
      } else {
        urlMap[url] = 1;
      }

      urlMap[url] = 1;
    });
  }

  get (action) {
    let route = this.routeMap[action];

    if (!route) {
      return null;
    }
    return {
      url: route[0],
      type: route[1],
      callbackIsList: route[2],
      delay: route[3]
    };
  }
}
