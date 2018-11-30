<template>
  <div>
    <div class="pros">
      <div class="pro" v-for="(value, index) in products" :key="index">
        <a :href="value.link" target="_blank">
          <h5>{{ value.title }}</h5>
          <div v-html="changeLineInStr(value.content)"></div>
        </a>
      </div>
    </div>
    <div class="block" v-show="pagination.totalCount > pagination.pageSize">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="pagination.pageNum"
        :page-size="pagination.pageSize"
        layout="prev, pager, next"
        :total="pagination.totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { ApiService } from '@/services/api.js';
export default {
  name: 'dynamicProducts',
  data () {
    return {
      apiService: new ApiService(),
      products: [],
      pagination: {
        totalCount: 0,
        pageSize: 10,
        pageNum: 1
      }
    };
  },
  created () {
    this.getData();
  },
  methods: {
    async getData () {
      // 获取数据
      let res = await this.apiService.getDynamicProducts({
        'pageSize': this.pagination.pageSize,
        'pageNum': this.pagination.pageNum,
        'type': 'product'
      });
      this.products = res.list;
      this.pagination.totalCount = res.count;
    },
    handleCurrentChange (val) {
      this.pagination.pageNum = parseInt(val);
      this.getData();
    },
    changeLineInStr (str) {
      return str.replace(/\n/g, '<br>');
    }
  },
  metaInfo: {
    title: '产品动态-车联网数据开放平台'
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
    font-size: 16px;
    color: #111;
  }
  div {
    padding: 0 30px;
    font-size: 14px;
    color: #999;
    line-height: 20px;
  }
}
.el-pagination {
  margin-top: 60px;
  text-align: center;
}
</style>
