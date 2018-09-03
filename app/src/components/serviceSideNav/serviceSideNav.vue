<template>
  <div class="fl menus">
    <h5 v-for="(item, index) in navData" :key="index">
      <a :class="{'on': currentNav == item.id}" :href="`${url}?apiType=${item.id}`">
        {{ item.name }}
      </a>
    </h5>
  </div>
</template>
<script>
export default {
  props: ['navData', 'currentNav'],
  data () {
    return {
      url: '/service/index.html'
    };
  },
  created () {
  }
};
</script>
<style lang="scss" scoped>
.menus {
  width: 185px;
  h5 a {
    display: block;
    margin-bottom: 20px;
    width: 180px;
    height: 50px;
    border: 1px solid #eee;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    color: #666;
    background-position: 20px center;
    background-repeat: no-repeat;
    &.run {
      background-image: url(./img/icon_run_grey.png);
    }
    &.analysis {
      background-image: url(./img/icon_analysis_grey.png);
    }
    &.user {
      background-image: url(./img/icon_user_grey.png);
    }
    &.on.run {
      background-image: url(./img/icon_run.png);
    }
    &.on.analysis {
      background-image: url(./img/icon_analysis.png);
    }
    &.on.user {
      background-image: url(./img/icon_user.png);
    }
    &.on {
      color: #4475fd;
      background-color: #fff;
      box-shadow: 0px 2px 4px 0px rgba(20, 30, 57, 0.1);
    }
  }
}
</style>
