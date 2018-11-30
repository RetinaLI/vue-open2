import Vuex from 'vuex';
import { mount, createLocalVue } from 'vue-test-utils';
import VueRouter from 'vue-router';
import TopBar from '@/components/top-bar';
import StaticLayout from '@/components/static-layout';
import HomeIndex from '@/pages/home/index';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe('src/components/top-bar.vue 导航index', () => {
  const routes = [
    {
      path: '/',
      component: StaticLayout,
      children: [
        {
          path: '',
          redirect: 'index.html'
        },
        {
          path: 'index.html',
          name: 'index',
          component: HomeIndex
        }
      ]
    }
  ];
  const router = new VueRouter({
    routes
  });
  let actions;
  let getters;
  let store;
  beforeEach(() => {
    getters = {
      getCurrentUser: () => ({
        counter: 88,
        email: 'ddd@126.com放松放松非公开接受了开机速度就仿佛看见跨境电商斐林试剂分手就分手浪费健康',
        expire: '2016-05-04',
        fee: 15,
        headImageUrl: 'http://localhost:8081/public/img/zfb.png',
        id: 1,
        name: '王小虎dfljglkjdsjdsfjf都结束了开发技术就算了副教授积分',
        token: 'jdslkfjdslkfsfkdsklf13221lkjlkjkjkjlkjlkdgdfdfff'
      })
    };

    actions = {
      getNewsList: () => {
        return 1;
      }
    };

    store = new Vuex.Store({
      getters,
      actions
    });
  });
  it('src/components/top-bar.vue 被加载', () => {
    const wrapper = mount(TopBar, {
      store,
      localVue,
      router
    });

    wrapper.setData({
      menus: {
        index: 0,
        service: 1,
        serviceDetail: 1,
        products: 2,
        cars: 2,
        solution: 3,
        dynamic: 4
      }
    });
    // 断言
    let border = wrapper.find('.border');
    expect(border.classes()).to.contain('pos0');
  });
});

describe('src/components/top-bar.vue 导航service', () => {
  const routes = [
    {
      path: '/',
      component: StaticLayout,
      children: [
        {
          path: '',
          redirect: 'index.html'
        },
        {
          path: 'index.html',
          name: 'service',
          component: HomeIndex
        }
      ]
    }
  ];
  const router = new VueRouter({
    routes
  });
  let getters;
  let actions;
  let store;
  beforeEach(() => {
    getters = {
      getCurrentUser: () => ({
        counter: 88,
        email: 'ddd@126.com放松放松非公开接受了开机速度就仿佛看见跨境电商斐林试剂分手就分手浪费健康',
        expire: '2016-05-04',
        fee: 15,
        headImageUrl: 'http://localhost:8081/public/img/zfb.png',
        id: 1,
        name: '王小虎dfljglkjdsjdsfjf都结束了开发技术就算了副教授积分',
        token: 'jdslkfjdslkfsfkdsklf13221lkjlkjkjkjlkjlkdgdfdfff'
      }),
      getNewsLength: () => {
        return 1;
      }
    };

    actions = {
      getNewsList: () => {
        return 1;
      }
    };

    store = new Vuex.Store({
      getters,
      actions
    });
  });
  it('src/components/top-bar.vue 被加载', () => {
    const wrapper = mount(TopBar, {
      store,
      localVue,
      router
    });

    wrapper.setData({
      menus: {
        index: 0,
        service: 1,
        serviceDetail: 1,
        products: 2,
        cars: 2,
        solution: 3,
        dynamic: 4
      }
    });
    // 断言
    let border = wrapper.find('.border');
    expect(border.classes()).to.contain('pos1', 'white');
  });
});
