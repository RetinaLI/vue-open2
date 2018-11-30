import Vuex from 'vuex';
import { mount, createLocalVue } from 'vue-test-utils';
import PersonalInfo from '@/pages/console/personal/info';
const localVue = createLocalVue();
localVue.use(Vuex);

describe('控制台-个人中心-账户信息：/console/info/index.html', () => {
  describe('获取数据不完整时', () => {
    let getters;
    let store;
    let wrapper;
    beforeEach(() => {
      getters = {
        getCurrentUser: () => ({
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
    it('没有头像时，显示默认头像', () => {
      const span = wrapper.findAll('img.avatar').at(0);
      expect(span.attributes().src).to.equal('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABURJREFUWAnFWUtv20YQnqVoPWLScSwjQl0EPSTIybf8kLRFiwK99B4kp/Zcwz23pwa999gH+vghueXYIoeiSm1Ifoh0bMkUt9+34lIuTUlLW27GoMgl5/Ht7O7szFrJFenoTN8fj+Sx1vJIlGxBzZZocxe0u2h30e4qJS9qdfl9van+vIopVUUoivTdUSpPAeADANuuIgugLwH417onz8NQ7bvKOgHUWgcHsXyuU/kCigOjXIt+M0rVEIjTVGScanPnN88TqXnK3BtAdKvuaXTK2oqVJ19vBPKNUio2uub8WKGZLL1If4ief4erQ6YzADo5TWV4rmfKlH1orChZbXnSBGBDSvYA+clmqH4p47fvZgKE1xS89iWA7WA41ShJZRCnMkqqAbOG7L3uK1kLPKn7nmDY6dldePMreLNUcSlAgGsdRPI9gH1MJUfRWJ2cYRyXSKtNT9bDGkwBp5KfNkL5DA+nRROXABrPRfIDwaF/uh8lmGelnSvqqtxu1JW0Q9/MzwzkJ0VPZhNiqpvDasHtH53fGDhaZMdpg46gTTOlplDM0388yAWBmfAzv/SOb85zBQxCT27ehidBWslHFxdODhBdCPqR/IHedI7jsSx7zhVBFduck7eDGoP8XjuUBxhqE4J8y8g4R3BcrVXB3QmVbISe8QT1cegOolQOI/e5S5utpuLq7hgsIrvUZTzIHWKYCreioHeUOIcSHx2+d7cmAeJbGcWIl3/tjyUZl329/I4haHPd+CxueHKfO47RjNj7DOwBg3CVODcPHM0TOHlcibaJgaK4PeXDpOtK3meDO4QrcVhnee6iDvKQ15VyDNjvKeMxK8ES3+ZSr7J9cc65UhVeg2ESdraJzWPKREPc+F0Nko+hwZWq8FKnxUJsHrz3iC9Hk7Hn41snZkgkYsOOPUkyx+7TzwhX2f6q8FI50zdDwMaJxGzY5HPmpeMP45wrVeGlTuaWGQFglqbnqO2nBXcGYca5RUSeKgGb+nIswEYP5nAXGSt+ZxCeB9IG6qJchbb2MQdfA2LIND11jPjWAHeIV6/HiHPptbc6q5N3YjEEbNxXWIE9ZA2RjK/mTA7hYVSxdxMIpb/EklGXc5AAp6jtp7d4zz0IbD4y2ReIN5+y+jodVvMCk4W1VU/WbjELUeJnuVGSIK5iXx28wXWSOicL1ifEQiI2xe0kGZo8UHf7yG4diMA6d2pmj2VBMY+YKnMK7B26ZzVb7RVTBvgNeeCx4oeNl1gsiqXhIgrhrYf3fNlYY1W2mJ885KUMZReRwQAsxERsE19q+Y2CrFvnURuG3uvUTFE+j6/sGyc+ZaljHuUYcApBPsONIf8WzzGLas6lMmLv32m7ea1Mnu/oFuqY5Unazgr7GFCeU8YAZObK4wi+YFFdJJs5uwxpUbbYpg4msdRZJGubWOz5Te6ueUXTu5s1M4+KCq/TPhik8ndvGjVmFU25u9CzGAvlCTqoWfHbHI49rZIRu4KmTutF2qJN2p5gmB4q5QCp2NSjOCtBZFCs+KmAcW4ZQ1sETp3UTRu0RZv4271YE1MmH2KrAJwK5zL50Ueznqp8ZVmmJd1Zf5yNJkdzwMvzmUtHH6WmALLVH+gfe8daJ4lO0b4Rom7aoC0YaJWCmfUSAqof6R3sAul5snx81EndtEFbs3AsfM/zmt5A/4N9VSPbuTZRB3VRpzkcXYjAgQGocG6jdzAcUXyqNRIBUpWhTylDWerIvDY5Sl5gv5Jrs0P0Z1haLPS368heVnAxfTNXFhOYsrOs4HVuMhuD4uYO0cs6+X/9G+JfH8mpoGjqJJEAAAAASUVORK5CYII=');
    });
    it('没有昵称时，显示“暂无”', () => {
      const span = wrapper.findAll('.con-name').at(0);
      expect(span.text()).to.equal('暂无');
    });
    it('没有邮箱时，显示为“暂无”', () => {
      const span = wrapper.findAll('.con-email').at(0);
      expect(span.text()).to.equal('暂无');
    });
    it('没有token时，显示为“暂无”', () => {
      const span = wrapper.findAll('.con-info-dep-code').at(0);
      expect(span.text()).to.equal('暂无');
    });
  });
});
