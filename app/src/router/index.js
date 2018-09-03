import Vue from 'vue';
import Router from 'vue-router';
import * as views from '@/views/index';
import ROUTES from './config';
import { ProfileService } from '@/services/profile';
import { PassportService } from '@/services/passport';

// components引入 写在views/index 内

Vue.use(Router);

// 初始化滚动轴位置
const scrollBehavior = (to, from, savedPosition) => {
  // 如果是浏览器前进/后退 -> 还处于浏览位置
  if (savedPosition) {
    return savedPosition;
  } else {
    return {
      x: 0,
      y: 0
    };
  }
};

let renderRoutes = (rs = []) => {
  rs.forEach(elem => {
    if (elem.component) elem.component = views[elem.component];
    if (elem.children) renderRoutes(elem.children);
  });
};

renderRoutes(ROUTES);

// 定义路由
const routes = ROUTES;

const router = new Router({
  mode: 'history',
  routes,
  scrollBehavior
});

let profileService = new ProfileService();
let passportService = new PassportService();
let currentUser;

router.beforeEach(async (to, from, next) => {
  if (window.PROJECT && window.PROJECT.BUILDING) {
    next();
  } else if (to.matched.some(r => r.meta.requireAuth)) {
    if (currentUser === undefined) {
      currentUser = await profileService.getCurrentUser();
    }
    if (currentUser.name) { // 能够获取session
      next();
    } else {
      // 无session，返回登录页面
      passportService.redirectToLogin(to.fullPath);
      next();
    }
  } else {
    next();
  }
});

export default router;
