import ROUTES from '@/router/config';

export default class RouterService {
  /**
   * 根据name获取路由的实际path
   * @param {*} name string 路由name
   * @returns path string 路由的实际path
   */
  getRoutePathByName (name = '') {
    let path = '';

    ROUTES.find(element => {
      if (element.name === name) {
        path = element.path;
        return true;
      } else if (element.children) {
        return element.children.find(cr => {
          if (cr.name === name) {
            path = `${element.path}/${cr.path}`;
            return true;
          }
          return false;
        });
      }
      return false;
    });

    return path;
  }
}
