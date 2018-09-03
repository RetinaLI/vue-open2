<template>
  <section class="con-info">
    <ConBreadCrumbs :navShow="crumbs"/>
    <div class="con-info-user">
      <div class="con-news">
        <el-collapse>
          <el-collapse-item :name="i + 1" :key="i" v-for="(item, i) in getNews.data">
            <template slot="title">
              <span class="con-news-title">{{item.title}}</span>
              <i class="icon-news" v-if="item.news"></i>
              <span class="con-news-date">{{item.date}}</span>
            </template>
            <div class="con-news-content">{{item.content}}</div>
          </el-collapse-item>
        </el-collapse>
        <div class="con-news-pages" v-if="getNews.total > 10">
          <el-pagination
            @current-change="pageChangeHandle"
            :current-page="getCurrentPage"
            background
            layout="prev, pager, next"
            :total="getNews.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ConBreadCrumbs from '@/components/console/con-bread-crumbs/index';
// import {mapGetters, mapActions} from 'vuex';
export default {
  name: 'news',
  data () {
    return {
      crumbs: {
        nav: [
          {
            title: '个人中心',
            path: '/console/info/index.html'
          }
        ],
        current: '我的消息'
      },
      getNews: {
        total: 0,
        data: []
      }
    };
  },
  computed: {
    getCurrentPage () {
      return Number(this.$route.query.page);
    }
    // ...mapGetters([
    //   'getNews'
    // ])
  },
  watch: {
    '$route' () {
      // this.getNewsList(this.$route.query.page);
    }
  },
  methods: {
    // ...mapActions([
    //   'getNewsList'
    // ]),
    pageChangeHandle (val) {
      // 将路由跳转到对应id的知识点
      this.$router.push({path: '/console/news/index.html', query: {page: val}});
    }
  },
  mounted: function () {
  },
  components: {
    ConBreadCrumbs
  }
};
</script>

<style scoped lang="scss">
  $news: '~@/assets/images/balance/new.png';
  .con-news {
    padding: 30px 50px 0;
    .el-collapse {
      border-top: none;
    }
    .icon-news {
      width: 35px;
      height: 20px;
      display: inline-block;
      vertical-align: middle;
      background: url($news) no-repeat;
      background-size: 100% 100%;
      margin-left: 8px;
      transform: rotate(-30deg);
    }
    .con-news-title {
      width: 400px;
      display: inline-block;
      font-size: 16px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      vertical-align: middle;
    }
    .con-news-date {
      float: right;
      margin-right: 15px;
      font-size: 12px;
    }
    .con-news-content {
      padding: 0 30px;
      font-size: 14px;
      color: #666;
    }
    .con-news-pages {
      margin-top: 25px;
      text-align: center;
      .el-pagination {
        display: inline-block;
      }
    }
  }
</style>
