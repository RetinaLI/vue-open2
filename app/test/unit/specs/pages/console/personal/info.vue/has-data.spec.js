import Vuex from 'vuex';
import { mount, createLocalVue } from 'vue-test-utils';
import PersonalInfo from '@/pages/console/personal/info';
const localVue = createLocalVue();
localVue.use(Vuex);

describe('控制台-个人中心-账户信息：/console/info/index.html', () => {
  describe('获取到完整数据时：', () => {
    let getters;
    let store;
    let wrapper;
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
        getActived: () => {
          return 1;
        },
        getNewCode: () => {
          return 1;
        },
        getTimes: () => {
          return 1;
        },
        getOldCode: () => {
          return 1;
        }
      };

      store = new Vuex.Store({
        getters
      });
      wrapper = mount(PersonalInfo, {
        store,
        localVue
      });
    });
    it('头像加载成功', () => {
      const span = wrapper.findAll('img.avatar').at(0);
      expect(span.attributes().src).to.equal(store.getters.getCurrentUser.headImageUrl);
    });
    it('昵称显示正确', () => {
      const span = wrapper.findAll('.con-name').at(0);
      expect(span.text()).to.equal(store.getters.getCurrentUser.name);
    });
    it('邮箱显示正确', () => {
      const span = wrapper.findAll('.con-email').at(0);
      expect(span.text()).to.equal(store.getters.getCurrentUser.email);
    });
    it('token显示正确', () => {
      const span = wrapper.findAll('.con-info-dep-code').at(0);
      expect(span.text()).to.equal(store.getters.getCurrentUser.token);
    });
  });
});
