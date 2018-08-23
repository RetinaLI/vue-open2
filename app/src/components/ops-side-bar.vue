<!-- 左侧导航组件 -->
<!-- 使用说明：<side-bar></side-bar> -->
<template>
    <div id="sidebar-wrap">
        <h3 class="logo rythm twist1">菜单个数{{validMenus.length}}</h3>
        <el-menu background-color="#324157" text-color="#ddd" :default-active="$route.path" :unique-opened="isUnique" :router="isRouter" mode="vertical">
            <template v-for="item in validMenus">
                <el-submenu v-if="item.children && item.children.length !== 0" :index="item.url" :key="item.id">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.name}}</span>
                    </template>
                    <el-menu-item v-for="child in item.children" :index="child.router" :key="child.router">
                        <i :class="child.icon"></i>
                        <span slot="title">{{langType === 'en'? child.name_en: child.name}}</span>
                    </el-menu-item>
                </el-submenu>

                <el-menu-item v-else :index="item.url" :key="item.id">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.name}}</span>
                </el-menu-item>

            </template>
        </el-menu>
    </div>
</template>
<script>
import { ProfileService } from '@/services/profile';
import { STORE_MUTATION_MAP } from '@/stores';
import { mapState } from 'vuex';
let profileService = new ProfileService();

export default {
  name: 'ops-side-bar',
  data () {
    return {
      isMusicOn: false,
      isUnique: true,
      isRouter: true
    };
  },
  computed: {
    ...mapState([ 'validMenus' ])
  },
  created () {
    this.initMenus();
  },
  methods: {
    async initMenus () {
      let result = await profileService.getValidMenus();
      this.$store.commit(STORE_MUTATION_MAP.UPDATE_VALID_MENUS, result.list);
    }
  }
};
</script>
<style scoped lang="scss">
#sidebar-wrap {
  width: 160px;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  background: #324157;
  z-index: 5;
  transition: all 0.3s;

  /* 图标动画 */
  .imgWrap {
    text-align: center;
    position: absolute;
    bottom: 30px;
    width: 100%;
    .gif {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .logo {
    color: #fff;
    text-align: center;
    margin: 18px 0;
  }
}

// 动态改变左侧导航包裹层宽度
#sidebar-wrap.collapsed {
  width: 64px;
  transition: all 0.3s;
}

// 美化左侧导航的留白
.el-submenu .el-menu-item {
  padding: 0 20px;
  min-width: 160px;
  padding-left: 20px !important;
}
</style>
