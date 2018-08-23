<template>
  <div class="apply-list">
    <div class="t">
      <el-tabs v-model="statusType" type="card" class="el-tabs" @tab-click="handleTypeClick">
        <el-tab-pane v-for="(item, i) in statusTypes" :key="i" :label="item.name" :name="item.type"></el-tab-pane>
      </el-tabs>
      <div class="search">
        <input type="text" class="ipt" v-model="keywords" @keyup.enter="handleSearch">
        <span class="el-icon-search vc" @click="handleSearch"></span>
      </div>
    </div>
    <el-table stripe :data="tableData" class="my-table">
      <el-table-column type="index" :width="WITH_LESS_2_WORDS" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="name" :min-width="WITH_INDEFINITE_SUPER_LENGTH_TEXT" label="数据接口名称" align="left">
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="url" width="300" label="费用详情" align="left">
        <template slot-scope="scope">
          <p>单次调用{{ scope.row.price }}元/每月上限{{ scope.row.limit }}元</p>
        </template>
      </el-table-column>
      <el-table-column :width="WITH_LESS_2_WORDS" align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" :round="true" size="mini" @click="handleTableClick(scope.row)" class="el-button" align="center">
            申请
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" v-show="pagination.totalCount > pagination.pageSize">
      <el-pagination background @current-change="handleCurrentChange" :current-page.sync="pagination.curPage" :page-size="pagination.pageSize" layout="prev, pager, next" :total="pagination.totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axiosApi from '@/http/axiosApi';
import ToastTip from '@/lib/message.js';
import cellWidth from '@/lib/cellWidth.js';
export default {
  name: 'ConData',
  created () {
    let p = Number(this.$route.query.page);
    if (p) {
      this.pagination.curPage = p;
    }
    this.getData();
  },
  data () {
    return {
      ...cellWidth,
      statusType: 'ing',
      keywords: '',
      pagination: {
        totalCount: 0,
        pageSize: 20,
        // curPage用于分页器当前页
        curPage: 1
      },
      statusTypes: [
        {
          name: '申请中',
          type: 'ing'
        },
        {
          name: '已开通',
          type: 'ed'
        },
        {
          name: '未开通',
          type: 'not'
        }
      ],
      tableData: [],
      columns: ['数据接口名称', '接口地址', '调用单价（次/元）', '已调用次数', '已消费金额（元）', '操作']
    };
  },
  methods: {
    handleTableClick (row) {
      ToastTip.info('暂无申请页面');
      // this.$router.push({path: '/console/data/detail/', query: {id: row.id}});
    },
    getData () {
      axiosApi('getInterfaces', {
        'pageSize': this.pagination.pageSize,
        'page': this.pagination.curPage,
        'type': this.statusType,
        'keywords': this.enCodeURIKeywords
      })
        .then(res => {
          this.tableData = res.data;
          this.pagination.totalCount = res.totalCount;
        });
    },
    handleCurrentChange (val) {
      // 点击分页跳转
      let url = this.$route.path;
      let nUrl = url + '?page=' + val;
      this.$router.push({ path: nUrl });
    },
    handleSearch () {
      if (this.pagination.curPage !== 1) this.pagination.curPage = 1;
      this.$router.push({ path: this.$route.path + '?page=' + this.pagination.curPage });
    },
    handleTypeClick (el) {
      this.keywords = '';
      if (this.pagination.curPage !== 1) this.pagination.curPage = 1;
      this.$router.push({ path: this.$route.path + '?page=' + this.pagination.curPage });
    }
  },
  computed: {
    enCodeURIKeywords () {
      return encodeURIComponent(this.keywords);
    }
  },
  watch: {
    '$route': 'getData'
  }
};
</script>
<style scoped lang="scss">
.apply-list {
  min-width: 840px;
  min-height: 100%;
  background-color: #fff;
  color: #333;
  overflow: hidden;
  .t {
    position: relative;
    /deep/ .el-tabs__item {
      font-size: 16px;
      line-height: 60px;
      height: 60px;
      text-align: center;
    }
    .search {
      display: none;
      position: absolute;
      top: 100px;
      right: 30px;
      width: 50px;
      transition: width 0.3s 0.3s;
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
  .my-table {
    table-layout: fixed;
    /deep/ .cell {
      font-weight: normal;
      color: #333;
      font-size: 14px;
      div,
      p {
        font-weight: normal;
        color: #333;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    /deep/ th > .cell {
      color: rgba(51, 51, 51, 0.5);
      // text-align: left;
    }
  }

  .el-button {
    /deep/ span {
      font-size: 14px;
      color: #fff;
    }
  }
  .block {
    margin: 20px 0;
    text-align: center;
  }
}
</style>
