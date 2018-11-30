<template>
  <div class="con-info-user-title">
    <div class="con-info-user-title-nav">
      <div
        v-if="navShow.nav[0].path.length > 0"
        :key="i"
        v-for="(item, i) in navShow.nav"
        class="every-nav">
        <router-link :to="item.path" tag="span" class="nav font14">{{item.title}}</router-link>
        <span class="split font14">/</span>
      </div>
      <span class="font14">{{navShow.current}}</span>
    </div>
    <router-link :to="btnShow.path" tag="div" v-if="btnShow.path && btnShow.title">
      <el-button type="primary" size="mini">{{btnShow.title}}</el-button>
    </router-link>
    <el-button
      type="primary"
      size="mini"
      v-if="btnShow.title && !btnShow.path && !btnShow.auth"
      @click="anyMethod"
    >{{btnShow.title}}
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'ConBreadCrumbs',
  props: {
    navShow: {
      type: Object,
      default: () => {
        return {
          nav: {
            type: Array,
            default: [
              {
                path: '',
                title: ''
              }]
          },
          current: ''
        };
      }
    },
    btnShow: {
      type: Object,
      default: () => {
        return {
          title: '',
          path: '',
          auth: false
        };
      }
    }
  },
  methods: {
    anyMethod () {
      this.$emit('onAnyMethod');
    }
  }
};
</script>

<style scoped lang="scss">
  $allColor: #4475FD;
  .con-info-user-title {
    color: #666;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    .con-info-user-title-nav {
      display: flex;
      align-items: center;
      height: 24px;
      line-height: 24px;
      &:before {
        content: '';
        width: 4px;
        height: 14px;
        background: $allColor;
        margin-right: 6px;
      }
      .every-nav {
        display: flex;
        align-items: center;
      }
      .nav {
        cursor: pointer;
        &:hover {
          color: $allColor;
        }
      }
      .split {
        margin: 0 6px;
      }
    }
  }
</style>
