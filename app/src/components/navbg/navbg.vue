<template>
  <div class="navbg" v-if="!isConsole"></div>
</template>
<script>
// 该组件用于填充顶部导航的背景色
export default {
  data () {
    return {
      isConsole: false
    };
  },
  created () {
    var p = this.$route.path;
    if (p.indexOf('console') >= 0) this.isConsole = true;
  }
};
</script>
<style lang="scss" scoped>
.navbg {
  height: 64px;
  background-color: #4475FD;
  margin-bottom: 36px;
}
</style>
