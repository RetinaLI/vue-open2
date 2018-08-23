<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {};
  },
  /* metaInfo: {
    title: '数据开放平台'
  }, */
  beforeCreate () {
  },
  async created () {
    await this.$store.dispatch('initCurrentUser');
  }
};
</script>
<style lang="scss">
  @import "./assets/global.scss";
  @import "assets/extend/con-info";
</style>
