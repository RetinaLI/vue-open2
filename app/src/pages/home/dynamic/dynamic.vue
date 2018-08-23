<template>
  <div class="news">
    <navbg></navbg>
    <div class="content">
      <div class="tab">
        <a class="ind" ref="industry" href="/dynamic/industry">行业动态</a>
        <a class="pro" ref="products" href="/dynamic/products">产品动态</a>
        <p ref="border" class="border"></p>
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
  methods: {
  },
  mounted () {
    var routeName = this.$route.name;
    var industry = this.$refs.industry;
    var products = this.$refs.products;
    var border = this.$refs.border;
    if (routeName === 'dynamicIndustry') {
      industry.className = 'on';
      border.className += ' industry';
    } else {
      products.className = 'on';
      border.className += ' products';
    }
  },
  components: {
    Navbg
  }
};
</script>
<style lang="scss" scoped>
.news {
  background-color: #F6F9FC;
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
        font-size: 24px;
        color: #555;
        &.on {
          color: #4475FD;
        }
        &.ind:hover ~ .border {
          left: 474px;
        }
        &.pro:hover ~ .border {
          left: 648px;
        }
      }
      .border {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 60px;
        height: 4px;
        background-color: #4475FD;
        transition: left .5s;

        &.industry {
          left: 474px;
        }
        &.products {
          left: 648px;
        }
      }
    }
  }
}
</style>
