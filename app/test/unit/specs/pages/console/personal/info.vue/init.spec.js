import Vuex from 'vuex';
import { mount, createLocalVue } from 'vue-test-utils';
import PersonalInfo from '@/pages/console/personal/info';
const localVue = createLocalVue();
localVue.use(Vuex);

describe('控制台-个人中心-账户信息：/console/info/index.html', () => {
  describe('页面加载：', () => {
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

    it('初始化：title正确', () => {
      ['个人信息', '绑定的邮箱', '开发者信息'].forEach((str, i) => {
        expect(wrapper.vm.title[i]).to.equal(str);
      });
    });

    it('初始化：changeInfo正确', () => {
      expect(wrapper.vm.changeInfo).to.eql({
        changed: false,
        title: '修改'
      });
    });

    it('初始化：changeEmail正确', () => {
      expect(wrapper.vm.changeEmail).to.eql({
        changed: false,
        title: '修改'
      });
    });

    it('初始化：tokenTimes正确', () => {
      expect(wrapper.vm.tokenTimes).to.equal(null);
    });
  });
});
