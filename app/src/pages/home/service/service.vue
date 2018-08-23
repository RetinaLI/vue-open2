<template>
  <div class="box">
    <navbg v-if="isConsole"></navbg>
    <div class="service wrap clearfix">
      <service-side-nav v-bind:current="apiType"></service-side-nav>
      <div class="fr content">
        <div class="top">
          <div class="txt">车辆数据共包含
            <span>{{ pagination.totalCount }}</span>项</div>
          <div class="search">
            <input type="text" class="ipt" v-model="keywords" @keyup.enter="getData">
            <span class="el-icon-search vc" @click="getData"></span>
          </div>
        </div>
        <div class="main">
          <div v-for="(item, index) in apis" :key="index">
            <a :href="`/service/detail?id=${item.id}&apiType=${apiType}`">
              <div class="api">
                <h6>
                  <i class="bor"></i>
                  <span class="name text-overflow-single">{{ item.name }}</span>
                  <span class="free" v-if="item.price === 0">免费</span>
                </h6>
                <p :class="{ 'text-overflow-multi': item.abstract.length > 68 }">{{ item.abstract }}</p>
              </div>
              <div class="apply">
                <a :href="`/service/detail?id=${item.id}&apiType=${apiType}`">申请数据</a>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="block" v-show="pagination.totalCount > pagination.pageSize">
      <el-pagination background @current-change="handleCurrentChange" :current-page.sync="pagination.curPage" :page-size="pagination.pageSize" layout="prev, pager, next" :total="pagination.totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import axiosApi from '@/http/axiosApi';
import Navbg from 'components/navbg/navbg';
import ServiceSideNav from 'components/serviceSideNav/serviceSideNav';
export default {
  data () {
    return {
      // param用于 传参 当前页
      param: 1,
      // 搜索的关键字
      keywords: '',
      pagination: {
        totalCount: 0,
        pageSize: 9,
        // curPage用于分页器当前页
        curPage: 1
      },
      apis: [],
      apiType: 'car1',
      // 用于判断是前台页面还是控制台页面
      isConsole: true,
      path: ''
    };
  },
  created () {
    this.path = this.$route.path;
    this.getData();
  },
  computed: {
    enCodeURIKeywords () {
      return encodeURIComponent(this.keywords);
    }
  },
  methods: {
    getData () {
      var q = this.$route.query;
      // p 是当前的page
      var { page: p, apiType: t } = q;
      p = parseInt(p);
      if (p) this.param = p;
      if (t) this.apiType = t;
      this.pagination.curPage = p;

      // 获取数据
      axiosApi('getInterfaces', {
        'pageSize': this.pagination.pageSize,
        'page': this.param,
        'type': this.apiType,
        'keywords': this.enCodeURIKeywords
      })
        .then(res => {
          this.apis = res.data;
          this.pagination.totalCount = res.totalCount;
          this.pagination.curPage = p;
        });
    },
    handleCurrentChange (val) {
      // 点击分页跳转
      var url = this.$route.path;
      var nUrl = url + '?page=' + val + '&apiType=' + this.apiType + '&keywords=' + this.enCodeURIKeywords;
      window.location.href = nUrl;
    }
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
        transition: width .3s;

        .ipt {
          padding-left: 35px;
          padding-right: 15px;
          width: 100%;
          height: 30px;
          line-height: 30px;
          border: 1px solid #aaa;
          border-radius: 100px;
        }
        .vc {
          width: 12px;
          left: 17px;
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
        margin-bottom: 10px;
        width: 480px;
        height: 104px;
        background-color: #fff;
        box-shadow: 0 4px 4px 0 rgba(77, 144, 245, 0.03);
        &:hover {
          border: 1px solid #eee;
          box-shadow:0px 4px 16px 0px rgba(77,144,245,0.16);
          .bor {
            opacity: 1 !important;
          }
        }
        & > a {
          display: block;
          width: 100%;
          height: 100%;
          padding: 20px 30px;
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
              height: 50px;
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
            border: 1px solid #4475fd;
            border-radius: 100px;
            background: #ecf1fe url(./img/icon_apply.png) 5px center no-repeat;
            &:hover {
              background-color: #4475fd;
              background-image: url(./img/icon_apply_grey.png);
              a {
                color: #fff;
              }
            }
            a {
              display: block;
              width: 100%;
              height: 100%;
              color: #4475fd;
              font-size: 14px;
              text-indent: 15px;
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
