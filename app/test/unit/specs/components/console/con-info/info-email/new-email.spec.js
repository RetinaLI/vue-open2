import Vuex from 'vuex';
import { mount, createLocalVue } from 'vue-test-utils';
import ConNewEmail from '@/components/console/con-info/info-email/new-email';
import ElementUI from 'element-ui';

const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(Vuex);

describe('控制台-个人中心-账户信息：/console/info/index.html', () => {
  describe('修改基本信息new-email：', () => {
    let mutations;
    let state;
    let actions;
    let getters;
    let store;
    let wrapper;
    beforeEach(() => {
      state = {
        actived: 0,
        oldCode: {
          disabled: false,
          text: '获取验证码'
        },
        newCode: {
          disabled: false,
          text: '获取验证码'
        },
        times: 601
      };

      getters = {
        getCurrentUser: () => ({
          counter: 88,
          email: 'ddd@126.com放松放松非公开接受了开机速度就仿佛看见跨境电商斐林试剂分手就分手浪费健康',
          expire: '2016-05-04',
          fee: 15,
          headImageUrl: 'http://localhost:8081/public/img/zfb.png',
          id: 1,
          name: '王小虎dfljgl',
          token: 'jdslkfjdslkfsfkdsklf13221lkjlkjkjkjlkjlkdgdfdfff'
        }),
        getActived: () => {
          return state.actived;
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

      actions = {
        getOldCodeHander: () => {
          return 1;
        }
      };

      mutations = {
        'UPDATE_OLD_EMAIL_ALL' () {
          clearInterval(window.Timing);
          state.oldCode = state.newCode = {
            disabled: false,
            text: '获取验证码'
          };
          state.times = 601;
        },
        'UPDATE_OLD_ACTIVED' (actived) {
          state.actived = parseInt(actived);
        }
      };

      store = new Vuex.Store({
        getters,
        actions,
        mutations
      });
      wrapper = mount(ConNewEmail, {
        store,
        localVue
      });
    });
    it('初始化：new-email正确', () => {
      expect(wrapper.vm.newEmailForm).to.eql({
        email: '',
        code: ''
      });
      expect(wrapper.vm.submited).to.eql(false);
    });
    it('new-email: actived为0时', () => {
      wrapper.setData({
        newEmailForm: {
          email: '213@126.com',
          code: '123456'
        }
      });
      let $button = wrapper.find('.newForm button.save');
      $button.trigger('click');

      expect(wrapper.vm.getActived).to.eql(0);
    });
  });
});
describe('控制台-个人中心-账户信息：/console/info/index.html', () => {
  describe('修改基本信息new-email：', () => {
    let mutations;
    let state;
    let actions;
    let getters;
    let store;
    let wrapper;
    beforeEach(() => {
      state = {
        actived: 1,
        oldCode: {
          disabled: false,
          text: '获取验证码'
        },
        newCode: {
          disabled: false,
          text: '获取验证码'
        },
        times: 601
      };

      getters = {
        getCurrentUser: () => ({
          counter: 88,
          email: 'ddd@126.com放松放松非公开接受了开机速度就仿佛看见跨境电商斐林试剂分手就分手浪费健康',
          expire: '2016-05-04',
          fee: 15,
          headImageUrl: 'http://localhost:8081/public/img/zfb.png',
          id: 1,
          name: '王小虎dfljgl',
          token: 'jdslkfjdslkfsfkdsklf13221lkjlkjkjkjlkjlkdgdfdfff'
        }),
        getActived: () => {
          return state.actived;
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

      actions = {
        getOldCodeHander: () => {
          return 1;
        }
      };

      mutations = {
        'UPDATE_OLD_EMAIL_ALL' () {
          clearInterval(window.Timing);
          state.oldCode = state.newCode = {
            disabled: false,
            text: '获取验证码'
          };
          state.times = 601;
        },
        'UPDATE_OLD_ACTIVED' (actived) {
          state.actived = parseInt(actived);
        }
      };

      store = new Vuex.Store({
        getters,
        actions,
        mutations
      });
      wrapper = mount(ConNewEmail, {
        store,
        localVue
      });
    });
    it('new-email 验证：邮箱和验证码为空时，点击保存', () => {
      let $button = wrapper.find('.newForm button.save');
      let $wrapperEmail = wrapper.findAll('.newForm>div').at(0);
      let $wrapperCode = wrapper.findAll('.newForm>div').at(1);
      $button.trigger('click');

      expect($wrapperEmail.classes()).to.include('is-error');
      expect($wrapperCode.classes()).to.include('is-error');
    });
  });
});
