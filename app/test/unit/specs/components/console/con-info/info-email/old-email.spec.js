import Vuex from 'vuex';
import { mount, createLocalVue } from 'vue-test-utils';
import ConOldEmail from '@/components/console/con-info/info-email/old-email';
import ElementUI from 'element-ui';

const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(Vuex);

describe('控制台-个人中心-账户信息：/console/info/index.html', () => {
  describe('修改基本信息old-email：', () => {
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
        getOldCodeHander: ({commit}) => {
          commit('UPDATE_OLD_ACTIVED', '1');
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
      wrapper = mount(ConOldEmail, {
        store,
        localVue
      });
    });
    it('初始化：old-email正确', () => {
      expect(wrapper.vm.oldEmailForm).to.eql({
        code: ''
      });
    });
    it('old-email 保存按钮点击时: 验证码为空时', () => {
      let $button = wrapper.find('.oldForm button.save');
      $button.trigger('click');
      let $editWrapperOldForm = wrapper.findAll('.oldForm>div').at(1);
      expect($editWrapperOldForm.classes()).to.include('is-error');
    });
    it('old-email 保存按钮点击时: 不等于6位时', () => {
      wrapper.setData({
        oldEmailForm: {
          code: '123456'
        }
      });
      let $button = wrapper.find('.oldForm button.save');
      $button.trigger('click');

      expect(wrapper.vm.oldEmailForm.code.length).to.eql(6);
    });
    it('old-email 发送邮件按钮点击时', () => {
      let $button = wrapper.find('.oldForm button.con-info-code-btn');
      let codeInfo = wrapper.find('.oldForm .code-info');
      $button.trigger('click');

      expect(codeInfo.attributes().style.display).to.not.eql('none');
    });
  });
});
