<template>
  <div>
    <div class="box">
      <div v-for="(item, index) in industry" :key="index">
        <a :href="item.link" target="_blank">
          <div class="img">
            <img class="vhc" :src="item.photoPath" alt="">
          </div>
          <div>
            <h5 class="text-overflow-single">{{ item.title }}</h5>
            <p>{{ item.created }}</p>
          </div>
        </a>
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
export default {
  name: 'dynamicIndustry',
  data () {
    return {
      apiService: new ApiService(),
      industry: [],
      pagination: {
        totalCount: 0,
        pageSize: 15,
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
      let res = await this.apiService.getDynamicIndustry({
        'pageSize': this.pagination.pageSize,
        'pageNum': this.pagination.pageNum,
        'type': 'industry'
      });
      this.industry = res.list;
      this.pagination.totalCount = res.count;
    },
    handleCurrentChange (val) {
      this.pagination.pageNum = parseInt(val);
      this.getData();
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
    // height: 374px;
    border: 1px solid #eee;
    background-color: #fff;
    &:hover {
      box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
    }
    & .img {
      position: relative;
      width: 378px;
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
      height: 88px;
      position: relative;
      h5 {
        font-size: 16px;
        color: #111;
        line-height: 28px;
        height: 28px;
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
