<template>
  <div class="box">
    <navbg v-if="isConsole"></navbg>
    <div class="service wrap clearfix">
      <service-side-nav
        v-bind:navData="listApiType"
        v-bind:currentNav="apiType"
        @sideNavClick="sideNavHander">
      </service-side-nav>
      <div class="fr content">
        <div class="top">
          <div class="txt">车辆数据共包含
            <span>{{ pagination.totalCount }}</span>项</div>
          <div class="search" ref="search">
            <input type="text" @focus="getFocus" @blur="getBlur" class="ipt" v-model="keywords" @keyup.enter="handleSearch">
            <span class="el-icon-search vc" @click="handleSearch"></span>
          </div>
        </div>
        <div class="main">
          <div v-for="(item, index) in apis" :key="index" @click="jumpToDetail(item.id)">
            <div class="api">
              <h6>
                <i class="bor"></i>
                <span class="name text-overflow-single">{{ item.name }}</span>
                <span class="free" v-if="item.price === 0">免费</span>
              </h6>
              <p :class="{ 'text-overflow-multi': item.title.length > 40 }">{{ item.title }}</p>
            </div>
            <div class="apply">
              <span v-if="item.applyStatus === 0" class="ing">审核中</span>
              <span v-else-if="item.applyStatus === 1" class="ed">已申请</span>
              <span v-else @click.stop="checkLogin(item)" class="not">申请数据</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="block" v-show="pagination.totalCount > pagination.pageSize">
      <el-pagination background @current-change="handleCurrentChange" :current-page.sync="pagination.pageNum" :page-size="pagination.pageSize" layout="prev, pager, next" :total="pagination.totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { ApiService } from '@/services/api.js';
import { PassportService } from '@/services/passport.js';
import Navbg from 'components/navbg/navbg';
import ToastTip from '@/lib/message.js';
import ServiceSideNav from 'components/serviceSideNav/serviceSideNav';
import common from '@/lib/common.js';

export default {
  data () {
    return {
      // sideNav list
      listApiType: [],
      // sideNav 当前项id
      apiType: 0,
      passportService: new PassportService(),
      apiService: new ApiService(),
      // param用于 传参 当前页
      param: 1,
      // 搜索的关键字
      keywords: '',
      pagination: {
        totalCount: 0,
        pageSize: 20,
        pageNum: 1
      },
      apis: [],
      // 用于判断是前台页面还是控制台页面
      isConsole: true,
      path: '',
      userInfo: {}
    };
  },
  created () {
    this.getListApiType();
  },
  methods: {
    getFocus () {
      this.$refs.search.style.width = `200px`;
    },
    getBlur () {
      this.$refs.search.style = ``;
    },
    sideNavHander (id) {
      this.apiType = id;
      this.pagination.pageNum = 1;
      this.keywords = '';
      this.getData();
    },
    jumpToDetail (id) {
      this.$router.push({ path: '/service/detail/index.html', query: { id: id } });
    },
    handleSearch () {
      this.pagination.pageNum = 1;
      this.getData();
    },
    async getData () {
      // 获取数据
      let res = await this.apiService.getInterfaces({
        'pageSize': this.pagination.pageSize,
        'pageNum': this.pagination.pageNum,
        'apiTypeId': this.apiType,
        'name': this.keywords
      });
      this.apis = res.list;
      this.pagination.totalCount = res.count;
    },
    handleCurrentChange (val) {
      // 点击分页跳转
      this.pagination.pageNum = parseInt(val);
      this.getData();
    },
    async getListApiType () {
      let res = await this.apiService.getListApiType();
      if (Array.isArray(res) && res.length !== 0) {
        this.listApiType = res;
        this.apiType = this.$route.query.id || res[0].id;
        this.getData();
      }
    },
    async checkLogin (api) {
      this.userInfo = this.$store.getters.getCurrentUser;
      if (this.userInfo && this.userInfo.name) {
        try {
          let confirm = await ToastTip.confirm({ content: '请确认申请此数据接口吗？' });
          if (confirm) {
            let res = await this.apiService.applyData({ id: api.id });
            common.requestMsgHandler(res);
            if (res.code === 1) api.applyStatus = 0;
          }
        } catch (e) {
        }
      } else {
        ToastTip.error('请先登录！');
        let timer = setTimeout(() => {
          clearTimeout(timer);
          this.$router.push({path: this.passportService.getRedirectToLoginPath()});
        }, 2000);
        // this.$route.push({path: , query: to.fullfill})
      }
    }
  },
  metaInfo: {
    title: '数据服务-车联网数据开放平台'
  },
  components: {
    Navbg,
    ServiceSideNav
  }
};
</script>
<style lang="scss" scoped>
.box {
  background-color: #f6f9fc;
  padding-bottom: 60px;
}
.navbg {
  margin-bottom: 14px !important;
}
.service {
  margin-bottom: 80px;

  .content {
    width: 970px;
    .top,
    .main {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .top {
      margin-bottom: 22px;
      .txt {
        line-height: 30px;
        span {
          color: #4475fd;
        }
      }
      .search {
        position: relative;
        width: 50px;
        transition: width 0.3s;
        border: 1px solid #aaa;
        border-radius: 100px;
        overflow: hidden;
        .ipt {
          padding-left: 15px;
          padding-right: 38px;
          width: 100%;
          height: 30px;
          line-height: 30px;
        }
        .vc {
          width: 12px;
          left: auto;
          right: 20px;
          z-index: 0;
          cursor: pointer;
        }
        &:hover {
          width: 200px;
        }
      }
    }
    .main {
      & > div {
        padding: 20px 30px;
        margin-bottom: 10px;
        width: 480px;
        height: 104px;
        background-color: #fff;
        box-shadow: 0 4px 4px 0 rgba(77, 144, 245, 0.03);
        border: 1px solid transparent;
        cursor: pointer;
        &:hover {
          border: 1px solid #eee;
          box-shadow: 0px 4px 16px 0px rgba(77, 144, 245, 0.16);
          .bor {
            opacity: 1 !important;
          }
        }

        .api {
          float: left;
          width: 270px;
          h6 {
            font-size: 16px;
            color: #333;
            position: relative;
            .bor {
              position: absolute;
              width: 6px;
              height: 17px;
              background-color: #4475fd;
              top: 2px;
              left: -30px;
              opacity: 0;
              transition: opacity 0.3s;
            }
            .name {
              display: inline-block;
              width: 270px;
            }
            .free {
              padding: 2px 10px;
              font-size: 12px;
              border-radius: 20px;
              background-color: #e5f8ec;
              color: #00c046;
            }
          }
          p {
            margin-top: 5px;
            color: #aaa;
            font-size: 12px;
            height: 33px;
          }
        }
        .apply {
          float: right;
          margin-top: 14px;
          margin-right: 6px;
          width: 100px;
          height: 36px;
          line-height: 36px;
          text-align: center;
          overflow: hidden;

          span {
            display: block;
            width: 100%;
            height: 100%;
            color: #4475fd;
            font-size: 14px;
            text-indent: 15px;
            border-radius: 100px;
            background-color: #ecf1fe;
            &.not {
              border: 1px solid #4475fd;
              background-image: url(./img/icon_apply.png);
              background-position: 5px center;
              background-repeat: no-repeat;
              &:hover {
                background-color: #4475fd;
                background-image: url(./img/icon_apply_grey.png);
                color: #fff;
              }
            }
            &.ed,
            &.ing {
              border: none;
              text-indent: 0;
            }
          }
        }
      }
    }
  }
}
.el-pagination {
  margin-top: 60px;
  text-align: center;
}
</style>
