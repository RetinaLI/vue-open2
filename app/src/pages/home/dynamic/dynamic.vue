<template>
  <div class="news">
    <navbg></navbg>
    <div class="content">
      <div class="tab">
        <router-link class="ind" ref="industry" to="/dynamic/industry/index.html">行业动态</router-link>
        <router-link class="pro" ref="products" to="/dynamic/products/index.html">产品动态</router-link>
        <p ref="border" class="border industry"></p>
      </div>
      <router-view/>
    </div>
  </div>
</template>
<script>
import Navbg from 'components/navbg/navbg';
export default {
  name: 'news',
  data () {
    return {
    };
  },
  mounted () {
    this.setClass();
  },
  methods: {
    setClass () {
      let routeName = this.$route.name;
      let border = this.$refs.border;
      if (routeName === 'dynamicIndustry') {
        border.className = 'border industry';
      } else {
        border.className = 'border products';
      }
    }
  },
  components: {
    Navbg
  },
  watch: {
    '$route': 'setClass'
  }
};
</script>
<style lang="scss" scoped>
.news {
  background-color: #f6f9fc;
  height: 100%;
  .content {
    margin: 0 auto 60px;
    width: 1180px;
    .tab {
      position: relative;
      padding-bottom: 15px;
      text-align: center;
      border-bottom: 1px solid #eee;
      a {
        margin: 0 35px;
        font-size: 20px;
        color: #555;
        &.on {
          color: #4475fd;
        }
        &.ind:hover ~ .border {
          left: 487px;
        }
        &.pro:hover ~ .border {
          left: 639px;
        }
      }
      .border {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 60px;
        height: 4px;
        background-color: #4475fd;
        transition: left 0.5s;

        &.industry {
          left: 487px;
        }
        &.products {
          left: 639px;
        }
      }
    }
  }
}
</style>
