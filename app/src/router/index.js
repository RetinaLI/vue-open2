import Vue from 'vue';
import Router from 'vue-router';
import * as views from '@/views/index';
import { ProfileService } from '@/services/profile';

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

// 定义路由
const routes = [
  {
    path: '/',
    component: views.StaticLayout,
    children: [
      {
        path: '',
        name: 'index',
        component: views.homeIndex
      },
      {
        path: 'products',
        name: 'products',
        component: views.homeProducts
      },
      // {
      //   path: 'cars/:type',
      //   name: 'cars',
      //   component: views.proCar
      // },
      {
        path: 'cars',
        redirect: 'cars/truck'
      },
      {
        path: 'cars/truck',
        name: 'cars',
        component: views.homeCarsTruck
      },
      {
        path: 'cars/energy',
        name: 'energy',
        component: views.homeCarsEnergy
      },
      {
        path: 'solution',
        name: 'solution',
        component: views.homeSolution
      },
      {
        path: 'service',
        name: 'service',
        component: views.homeService
      },
      {
        path: 'dynamic',
        component: views.homeDynamic,
        children: [
          {
            path: 'industry',
            name: 'dynamicIndustry',
            component: views.homeDynamicIndustry
          },
          {
            path: 'products',
            name: 'dynamicProducts',
            component: views.homeDynamicProducts
          },
          {
            path: '/',
            redirect: 'industry'
          }
        ]
      },
      {
        path: 'service/detail',
        name: 'serviceDetail',
        component: views.homeServiceDetail
      }
      // {
      //   path: 'example',
      //   name: 'Example',
      //   meta: { // 是否需要登录访问
      //     requireAuth: true
      //   },
      //   component: views.Example
      // }
    ]
  },
  {
    path: '/docs',
    component: views.StaticLayout,
    children: [
      {
        path: '',
        redirect: 'api/detail'
      },
      {
        path: 'api/detail',
        component: views.apiDetail
      }
    ]
  },
  {
    path: '/passport',
    component: views.passportLayout,
    children: [
      {
        path: '',
        name: 'login',
        component: views.passportLogin
      },
      {
        path: 'regist',
        name: 'regist',
        component: views.passportRegist
      },
      {
        path: 'protocol',
        name: 'protocol',
        component: views.passportProtocol
      },
      {
        path: 'retrieve',
        name: 'retrieve',
        component: views.passportRetrieve
      }
    ]
  },
  {
    path: '/console',
    component: views.ConLayout,
    meta: { // 是否需要登录访问
      // requireAuth: true
      requireAuth: false
    },
    children: [
      {
        path: '',
        name: 'conIndex',
        component: views.conIndex
      },
      {
        path: 'data',
        name: 'conData',
        component: views.conData
      },
      {
        path: 'data/detail',
        name: 'conDetail',
        component: views.conDetail
      },
      {
        path: 'apply_list',
        name: 'conApply',
        component: views.conApplyList
      },
      {
        path: 'info',
        name: 'conPersonalInfo',
        component: views.conPersonalInfo
      },
      {
        path: 'auth',
        name: 'conPersonalRealAuth',
        component: views.conPersonalRealAuth
      },
      {
        path: 'balance',
        name: 'conPersonBalance',
        component: views.conPersonalBalance
      },
      {
        path: 'pay',
        name: 'conPay',
        component: views.conPay
      },
      {
        path: 'news',
        name: 'conNews',
        component: views.conNews
      }
    ]
  },
  {
    path: '/*',
    name: 'page404',
    component: views.page404
  }
];

const router = new Router({
  mode: 'history',
  routes,
  scrollBehavior
});

let profileService = new ProfileService();
let currentUser;

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (currentUser === undefined) {
      currentUser = await profileService.getCurrentUser();
    }
    if (currentUser.name) { // 能够获取session
      next();
    } else {
      // 无session，返回登录页面
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
      next();
    }
  } else {
    next();
  }
});

export default router;
