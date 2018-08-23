<template>
  <div class="banner" :style="bannerStyle">
    <div class="wrapper">
      <div class="txt-box vc">
        <h3>{{ txt.h3 }}</h3>
        <p class="font14">{{ txt.p }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      bannerStyle: {
        'background-image': 'url(' + this.bannerdata.bgImg + ')',
        'height': this.bannerdata.height ? this.bannerdata.height + 'px' : '640px'
      },
      txt: {
        'h3': this.bannerdata.h3,
        'p': this.bannerdata.p ? this.bannerdata.p : ''
      }
    };
  },
  props: ['bannerdata']
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
      animation: banner .8s cubic-bezier(.4,0,.2,1) 0s 1;
      h3 {
        font-size: 54px;
        margin-bottom: 14px;
      }
    }
  }
}
</style>
