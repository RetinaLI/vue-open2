// import Vue from 'vue';
import Vuex from 'vuex';
import { mount, createLocalVue } from 'vue-test-utils';
import PersonalInfo from '@/pages/console/personal/info';
import ElementUI from 'element-ui';

const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(Vuex);

describe('控制台-个人中心-账户信息：/console/info/index.html', () => {
  describe('修改基本信息email：', () => {
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
      wrapper = mount(PersonalInfo, {
        store,
        localVue
      });
      let button = wrapper.find('div.baseEmail .con-info-part-title button');
      button.trigger('click');
    });
    it('按钮文本变为“编辑中...”', () => {
      let button = wrapper.find('div.baseEmail .con-info-part-title button');
      expect(button.text()).to.equal('编辑中...');
    });
    it('邮箱模块变为修改状态', () => {
      let $viewWrapper = wrapper.find('div.baseEmail .view-wrapper');
      let $editWrapper = wrapper.find('div.baseEmail .edit-wrapper');

      expect($viewWrapper.attributes().style).to.equal('display: none;');
      expect($editWrapper.attributes().style).to.not.equal('display: none;');
    });
    it('邮箱模块变为修改状态-默认第一步', () => {
      let $editWrapperOldForm = wrapper.find('.edit-wrapper .oldForm');
      let $editWrapperNewForm = wrapper.find('.edit-wrapper .newForm');

      expect($editWrapperOldForm.attributes().style).to.not.equal('display: none;');
      expect($editWrapperNewForm.attributes().style).to.equal('display: none;');
    });
    it('邮箱编辑-第一步取消成功', () => {
      let $button = wrapper.find(
        'div.baseEmail .edit-wrapper .oldForm button.cancle');
      $button.trigger('click');
      let $viewWrapper = wrapper.find('div.baseEmail .view-wrapper');
      let $editWrapper = wrapper.find('div.baseEmail .edit-wrapper');
      let $editButton = wrapper.find('div.baseEmail .con-info-part-title button');

      expect($viewWrapper.attributes().style).to.not.equal('display: none;');
      expect($editWrapper.attributes().style).to.equal('display: none;');
      expect($editButton.text()).to.equal('修改');
    });
    it('邮箱编辑-第一步提交验证码验证-为空的时候', () => {
      let $button = wrapper.find('div.baseEmail .edit-wrapper .oldForm button.save');
      $button.trigger('click');
      let $editWrapperOldForm = wrapper.findAll('.edit-wrapper .oldForm>div').at(1);
      expect($editWrapperOldForm.classes()).to.include('is-error');
    });

    // it('邮箱保存编辑成功', () => {
    //   let $button = wrapper.find('div.baseEmail .edit-wrapper button.save');
    //   $button.trigger('click');
    //   let $viewWrapper = wrapper.find('div.baseEmail .view-wrapper');
    //   let $editWrapper = wrapper.find('div.baseEmail .edit-wrapper');
    //   let $editButton = wrapper.find('div.baseEmail .con-info-part-title button');
    //
    //   expect($viewWrapper.attributes().style).to.not.equal('display: none;');
    //   expect($editWrapper.attributes().style).to.equal('display: none;');
    //   expect($editButton.text()).to.equal('修改');
    // });

    // todo: 用户名验证
  });
});
describe('控制台-个人中心-账户信息：/console/info/index.html', () => {
  describe('修改基本信息email：', () => {
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
      wrapper = mount(PersonalInfo, {
        store,
        localVue
      });
      let button = wrapper.find('div.baseEmail .con-info-part-title button');
      button.trigger('click');
    });
    it('邮箱编辑-第一步提交验证码成功-显示第二步', () => {
      wrapper.setData({
        oldEmailForm: {
          code: '123456'
        }
      });
      let $button = wrapper.find('div.baseEmail .edit-wrapper .oldForm button.save');
      $button.trigger('click');
      let $viewWrapper = wrapper.find('div.baseEmail .view-wrapper');
      let $editWrapper = wrapper.find('div.baseEmail .edit-wrapper');
      let $editWrapperOldForm = wrapper.find('.edit-wrapper .oldForm');
      let $editWrapperNewForm = wrapper.find('.edit-wrapper .newForm');

      expect($editWrapperOldForm.attributes().style).to.equal('display: none;');
      expect($editWrapperNewForm.attributes().style).to.not.equal('display: none;');
      expect($viewWrapper.attributes().style).to.equal('display: none;');
      expect($editWrapper.attributes().style).to.not.equal('display: none;');
    });
    it('邮箱编辑-第二步提交表单-为空的时候', () => {
      let $button = wrapper.find('div.baseEmail .edit-wrapper .newForm button.save');
      $button.trigger('click');
      let $editWrapperNewFormEmail = wrapper.findAll('.edit-wrapper .newForm>div').at(0);
      let $editWrapperNewFormCode = wrapper.findAll('.edit-wrapper .newForm>div').at(1);

      expect($editWrapperNewFormEmail.classes()).to.include('is-error');
      expect($editWrapperNewFormCode.classes()).to.include('is-error');
    });
    it('邮箱编辑-第二步取消成功', () => {
      let $button = wrapper.find('div.baseEmail .edit-wrapper .newForm button.cancle');
      $button.trigger('click');
      let $viewWrapper = wrapper.find('div.baseEmail .view-wrapper');
      let $editWrapper = wrapper.find('div.baseEmail .edit-wrapper');
      let $editButton = wrapper.find('div.baseEmail .con-info-part-title button');

      expect($viewWrapper.attributes().style).to.not.equal('display: none;');
      expect($editWrapper.attributes().style).to.equal('display: none;');
      expect($editButton.text()).to.equal('修改');
    });

    // it('邮箱保存编辑成功', () => {
    //   let $button = wrapper.find('div.baseEmail .edit-wrapper button.save');
    //   $button.trigger('click');
    //   let $viewWrapper = wrapper.find('div.baseEmail .view-wrapper');
    //   let $editWrapper = wrapper.find('div.baseEmail .edit-wrapper');
    //   let $editButton = wrapper.find('div.baseEmail .con-info-part-title button');
    //
    //   expect($viewWrapper.attributes().style).to.not.equal('display: none;');
    //   expect($editWrapper.attributes().style).to.equal('display: none;');
    //   expect($editButton.text()).to.equal('修改');
    // });
  });
});
