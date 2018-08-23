<template>
  <div>
    <div class="box">
      <div v-for="(item, index) in industry" :key="index">
        <a :href="item.url" target="_blank">
          <img :src="item.poster" alt="">
          <div>
            <h5 :class="{'text-overflow-multi': item.title.length >= 34 }">{{ item.title }}</h5>
            <p>{{ item.date }}</p>
          </div>
        </a>
      </div>
    </div>
    <div class="block">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="curPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import axiosApi from '@/http/axiosApi';
export default {
  name: 'dynamicIndustry',
  data () {
    return {
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
      axiosApi('getDynamicIndustry', {
        'pageSize': this.pageSize,
        'page': this.param
      })
        .then(res => {
          console.log(res);
          this.industry = res.data;
          this.totalCount = res.totalCount;
          this.curPage = p;
        });
    },
    handleCurrentChange (val) {
      // 点击分页跳转
      var url = this.$route.fullPath;
      var nUrl = url.split('?page=')[0] + '?page=' + val;
      window.location.href = nUrl;
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  margin-top: 38px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  &>div {
    margin-bottom: 20px;
    width: 380px;
    height: 374px;
    border: 1px solid #eee;
    background-color: #fff;
    &:hover {
      box-shadow: 0px 4px 12px 0px rgba(0,0,0,0.1);
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
