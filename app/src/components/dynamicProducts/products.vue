<template>
  <div>
    <div class="pros">
      <div class="pro" v-for="(value, index) in products" :key="index">
        <a :href="value.url" target="_blank">
          <h5>{{ value.title }}</h5>
          <div>
            {{ value.details }}
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
  name: 'dynamicProducts',
  data () {
    return {
      products: [],
      totalCount: 0,
      pageSize: 9,
      // curPage用于分页器当前页
      curPage: 1,
      // param用于 传参 当前页
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
      axiosApi('getDynamicProducts', {
        'pageSize': this.pageSize,
        'page': this.param
      })
        .then(res => {
          console.log(res);
          this.products = res.data;
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
.pro {
  margin: 30px 0;
  padding: 25px 0;
  width: 100%;
  border: 1px solid #eee;
  background-color: #fff;
  &:hover {
    box-shadow:0px 4px 12px 0px rgba(0,0,0,0.1);
  }
  h5 {
    margin-bottom: 10px;
    padding-left: 26px;
    border-left: 6px solid #4475FD;
    line-height: 24px;
    font-size: 24px;
    color: #111;
  }
  div {
    padding-left: 30px;
    font-size: 16px;
    color: #999;
    line-height: 20px;
  }
}
.el-pagination {
  margin-top: 60px;
  text-align: center;
}
</style>
