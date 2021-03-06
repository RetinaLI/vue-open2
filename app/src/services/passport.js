import axiosApi from '@/http/axiosApi';
import RouterService from '@/services/router';
import url from 'url';
export class PassportService {
  routerService = new RouterService();
  loginPath = '';
  registPath = '';
  retrievePath = '';

  constructor () {
    this.loginPath = this.routerService.getRoutePathByName('login') || '';
    this.registPath = this.routerService.getRoutePathByName('regist' || '');
    this.retrievePath = this.routerService.getRoutePathByName('retrieve' || '');
  }

  async login (params) {
    let result = await axiosApi('login', params);
    return result;
  }

  async regist (params) {
    let result = await axiosApi('regist', params);
    return result;
  }

  async retrievePassword (params) {
    let result = await axiosApi('retrivePassword', params);
    return result;
  }

  redirectToLogin (redirectUrl = OpenApiApp.$router.currentRoute.fullPath) {
    OpenApiApp.$router.push({path: this.getRedirectToLoginPath(redirectUrl)});
  }

  getRedirectToLoginPath (redirectUrl = OpenApiApp.$router.currentRoute.fullPath) {
    let redirectObj = url.parse(redirectUrl);

    if (redirectObj.pathname !== this.loginPath && redirectObj.pathname !==
      this.registPath && redirectObj.pathname !== this.retrievePath) {
      return `${this.loginPath}?redirect=${redirectUrl}`;
    }
    return this.loginPath;
  }

  async resetPassword (params) {
    let result = await axiosApi('resetPassword', params);
    return result;
  }

  async resendCode (params) {
    let result = await axiosApi('resendCode', params);
    return result;
  }

  async logout () {
    let result = await axiosApi('logout');
    return result;
  }

  async checkAjax (params) {
    let result = await axiosApi('checkAjax', params);
    return result;
  }
}
