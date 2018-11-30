<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
  /* metaInfo: {
    title: '数据开放平台'
  }, */
  methods: {
    logined () {
      this.$store.dispatch('initCurrentUser');
    }
  },
  created () {
    this.logined();
  }
};
</script>
<style lang="scss">
  @import "./assets/global.scss";
  @import "assets/extend/con-info";
</style>
