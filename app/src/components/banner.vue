<template>
  <div class="banner" :style="bannerStyle">
    <div class="wrapper">
      <div class="txt-box vc">
        <h3>{{ bannerdata.title || '' }}</h3>
        <p class="font14">{{ bannerdata.text || '' }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Banner',
  data () {
    return {
      bannerStyle: {
        backgroundImage: 'url(' + this.bannerdata.bgImg + ')',
        height: this.bannerdata.height ? this.bannerdata.height + 'px' : '640px'
      }
    };
  },
  props: {
    bannerdata: {
      type: Object,
      default: () => {
        return {
          bgImg: '',
          height: '',
          title: '',
          text: ''
        };
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  .banner {
    width: 100%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    .wrapper {
      position: relative;
      height: 100%;
      .txt-box {
        width: 50%;
        color: #fff;
        animation: banner .8s cubic-bezier(.4, 0, .2, 1) 0s 1;
        h3 {
          font-size: 54px;
          margin-bottom: 14px;
        }
      }
    }
  }
</style>
