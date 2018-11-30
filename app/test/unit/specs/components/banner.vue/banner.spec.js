import { mount } from 'vue-test-utils';
import Banner from '@/components/banner';

describe('src/components/banner.vue', () => {
  it('src/components/banner.vue 被加载', () => {
    const wrapper = mount(Banner);

    wrapper.setProps({
      bannerData: {
        bgImg: '',
        height: '640px',
        title: '',
        text: ''
      }
    });

    // 断言
    const bannerH3 = wrapper.find('.banner h3');
    const bannerP = wrapper.find('.banner p');

    expect(bannerH3.text()).to.equals(wrapper.props().bannerData.title);
    expect(bannerP.text()).to.equals(wrapper.props().bannerData.text);
  });
});
