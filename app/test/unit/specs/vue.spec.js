import Vuex from 'vuex';
import { mount, createLocalVue } from 'vue-test-utils';
import App from '@/App';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('src-APP.vue', () => {
  let actions;
  let store;
  beforeEach(() => {
    actions = {
      initCurrentUser: () => {
        return {};
      }
    };

    store = new Vuex.Store({
      state: {},
      actions
    });
  });
  it('src-App.vue 被加载，并用有logined方法', () => {
    mount(App, {
      store,
      localVue
    });
    // 断言事件已经被触发
    expect(App.methods).to.have.property('logined');
    expect(typeof App.created).to.eql('function');
  });
});
