const ROUTES = [
  {
    path: '/',
    component: 'StaticLayout',
    children: [
      {
        path: '',
        redirect: 'index.html'
      },
      {
        path: 'index.html',
        name: 'index',
        isStatic: true,
        component: 'homeIndex'
      },
      {
        path: 'products/index.html',
        name: 'products',
        isStatic: true,
        component: 'homeProducts'
      },
      // {
      //   path: 'cars/:type',
      //   name: 'cars',
      //   component: views.proCar
      // },
      {
        path: 'cars',
        redirect: 'cars/truck/index.html'
      },
      {
        path: 'cars/truck/index.html',
        name: 'cars-truck',
        isStatic: true,
        component: 'homeCarsTruck'
      },
      {
        path: 'cars/energy/index.html',
        name: 'cars-energy',
        isStatic: true,
        component: 'homeCarsEnergy'
      },
      {
        path: 'cars/mechanics/index.html',
        name: 'cars-mechanics',
        isStatic: true,
        component: 'homeCarsMechanics'
      },
      {
        path: 'cars/passenger/index.html',
        name: 'cars-passenger',
        isStatic: true,
        component: 'homeCarsPassenger'
      },
      {
        path: 'cars/bus/index.html',
        name: 'cars-bus',
        isStatic: true,
        component: 'homeCarsBus'
      },
      {
        path: 'solution/service/index.html',
        name: 'solution-service',
        isStatic: true,
        component: 'solutionService'
      },
      {
        path: 'solution/manage/index.html',
        name: 'solution-manage',
        isStatic: true,
        component: 'solutionManage'
      },
      {
        path: 'solution/finance/index.html',
        name: 'solution-finance',
        isStatic: true,
        component: 'solutionFinance'
      },
      {
        path: 'solution/logistic/index.html',
        name: 'solution-logistic',
        isStatic: true,
        component: 'solutionLogistic'
      },
      {
        path: 'service/index.html',
        name: 'service',
        component: 'homeService'
      },
      {
        path: 'dynamic',
        component: 'homeDynamic',
        children: [
          {
            path: 'industry/index.html',
            name: 'dynamicIndustry',
            isStatic: true,
            component: 'homeDynamicIndustry'
          },
          {
            path: 'products/index.html',
            name: 'dynamicProducts',
            isStatic: true,
            component: 'homeDynamicProducts'
          },
          {
            path: '',
            isStatic: true,
            redirect: 'industry/index.html'
          }
        ]
      },
      {
        path: 'service/detail/index.html',
        name: 'serviceDetail',
        component: 'homeServiceDetail'
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
    path: '/passport',
    component: 'passportLayout',
    children: [
      {
        path: '',
        isStatic: true,
        redirect: 'login/index.html'
      },
      {
        path: 'login/index.html',
        name: 'login',
        isStatic: true,
        component: 'passportLogin'
      },
      {
        path: 'regist/index.html',
        name: 'regist',
        isStatic: true,
        component: 'passportRegist'
      },
      {
        path: 'protocol/index.html',
        name: 'protocol',
        isStatic: true,
        component: 'passportProtocol'
      },
      {
        path: 'retrieve/index.html',
        name: 'retrieve',
        isStatic: true,
        component: 'passportRetrieve'
      }
    ]
  },
  {
    path: '/console',
    component: 'ConLayout',
    meta: { // 是否需要登录访问
      requireAuth: true
      // requireAuth: false
    },
    children: [
      {
        path: '',
        redirect: 'data/index.html'
      },
      {
        path: 'index.html',
        redirect: 'data/index.html'
      },
      {
        path: 'data/index.html',
        name: 'conData',
        component: 'conData'
      },
      {
        path: 'data/detail/index.html',
        name: 'conDetail',
        component: 'conDetail'
      },
      {
        path: 'apply_list/index.html',
        name: 'conApply',
        component: 'conApplyList'
      },
      {
        path: 'info/index.html',
        name: 'conPersonalInfo',
        component: 'conPersonalInfo'
      },
      {
        path: 'auth/index.html',
        name: 'conPersonalRealAuth',
        component: 'conPersonalRealAuth'
      },
      {
        path: 'balance/index.html',
        name: 'conPersonBalance',
        component: 'conPersonalBalance'
      },
      {
        path: 'pay/index.html',
        name: 'conPay',
        component: 'conPay'
      },
      {
        path: 'news/index.html',
        name: 'conNews',
        component: 'conNews'
      }
    ]
  }
  // {
  //   path: '/*',
  //   name: 'page404',
  //   component: 'page404'
  // }
];

module.exports = ROUTES;
