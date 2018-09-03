<template>
  <div>
    <div class="box">
      <div v-for="(item, index) in industry" :key="index">
        <a :href="item.link" target="_blank">
          <div class="img">
            <img class="vhc" :src="item.photoPath" alt="">
          </div>
          <div>
            <h5 :class="{'text-overflow-multi': item.title.length >= 34 }">{{ item.title }}</h5>
            <p>{{ item.created }}</p>
          </div>
        </a>
      </div>
    </div>
    <div class="block">
      <el-pagination background @current-change="handleCurrentChange" :current-page.sync="curPage" :page-size="pageSize" layout="prev, pager, next" :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { ApiService } from '@/services/api.js';
export default {
  name: 'dynamicIndustry',
  data () {
    return {
      apiService: new ApiService(),
      industry: [],
      totalCount: 0,
      pageSize: 9,
      // curPage 与param 应该是同一个值，但是用同一个变量时，分页器的当前页会有bug，原因还没找到
      // 用于分页器当前页
      curPage: 1,
      // 用于 传参 当前页
      param: 1
    };
  },
  created () {
    this.getData();
  },
  methods: {
    getData () {
      var p = parseInt(this.$route.query.page);
      if (p) {
        this.param = p;
      }
      // 获取数据
      this.apiService.getDynamicIndustry({
        'pageSize': this.pageSize,
        'pageNum': this.param,
        'type': 'industry'
      })
        .then(res => {
          this.industry = res.list;
          this.totalCount = res.count;
          this.curPage = p;
        });
    },
    handleCurrentChange (val) {
      // 点击分页跳转
      var url = this.$route.fullPath;
      var nUrl = url.split('?page=')[0] + '?page=' + val;
      window.location.href = nUrl;
    }
  },
  metaInfo: {
    title: '行业动态-车联网数据开放平台'
  }
};
</script>
<style lang="scss" scoped>
.box {
  margin-top: 38px;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  & > div {
    margin: 10px 6px;
    width: 380px;
    height: 374px;
    border: 1px solid #eee;
    background-color: #fff;
    &:hover {
      box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
    }
    & .img {
      position: relative;
      width: 380px;
      height: 252px;
      overflow: hidden;
      img {
        min-width: 380px;
        min-height: 252px;
        position: relative;
        &::after {
          content: "";
          display: block;
          position: absolute;
          z-index: 2;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #eee;
        }
      }
    }
    & a div {
      padding: 14px;
      height: 122px;
      position: relative;
      h5 {
        font-size: 20px;
        color: #111;
        line-height: 28px;
        height: 56px;
      }
      p {
        position: absolute;
        bottom: 17px;
        color: #999;
        font-size: 14px;
      }
    }
  }
}
.el-pagination {
  margin-top: 60px;
  text-align: center;
}
</style>
