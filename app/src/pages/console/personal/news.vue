<template>
  <section class="con-info">
    <ConBreadCrumbs :navShow="crumbs"/>
    <div class="con-info-user">
      <div class="con-news">
        <el-collapse>
          <div class="con-news-line" v-for="(item, i) in getNews.data"
               :key="i"
               @click="readNews(item.id, item.isRead)">
            <el-collapse-item :name="i + 1">
              <template slot="title">
                <span class="con-news-title">{{item.title}}</span>
                <i class="icon-news" v-if="item.isRead === 0"></i>
                <span class="con-news-date">{{item.sendTime.split(' ')[0]}}</span>
              </template>
              <div class="con-news-content">{{item.content}}</div>
            </el-collapse-item>
          </div>
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
import { mapGetters } from 'vuex';
import NewsService from '@/services/news';
let newsService = new NewsService();
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
      }
    };
  },
  computed: {
    getCurrentPage () {
      return Number(this.$route.query.page);
    },
    ...mapGetters([
      'getNews'
    ])
  },
  watch: {
    '$route' () {
      this.getList();
    }
  },
  methods: {
    pageChangeHandle (val) {
      // 将路由跳转到对应id的知识点
      this.$router.push({path: '/console/news/index.html', query: {page: val}});
    },
    async readNews (id, isRead) {
      if (isRead === 1) return false;
      let {code} = await newsService.postNews({id});
      if (code === 1) {
        this.$store.commit('NEWS_IS_READ', id);
      }
    },
    getList () {
      this.$store.dispatch('getNewsList', {
        pageNum: this.$route.query.page || 1,
        pageSize: 10
      });
    }
  },
  mounted: function () {
    this.getList();
  },
  components: {
    ConBreadCrumbs
  }
};
</script>

<style scoped lang="scss">
  $news: '~@/assets/images/balance/new.png';
  /deep/ .el-collapse-item__header {
    border-bottom: none;
  }
  .con-news {
    padding: 30px 50px 0;
    .con-news-line {
      border-bottom: 2px solid #ebeef5;
      &:nth-last-child(1) {
        border-bottom: none;
      }
    }
    .el-collapse {
      border: none;
    }
    .icon-news {
      width: 26px;
      height: 17px;
      display: inline-block;
      vertical-align: middle;
      background: url($news) no-repeat;
      background-size: 100% 100%;
      margin-left: 8px;
      transform: rotate(-30deg);
    }
    .con-news-title {
      color: #666;
      max-width: 560px;
      display: inline-block;
      font-size: 12px;
      font-weight: bold;
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
