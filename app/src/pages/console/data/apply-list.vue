<template>
  <div class="apply-list">
    <div class="t">
      <el-tabs v-model="tabModel" type="card" class="el-tabs" @tab-click="handleTypeClick">
        <el-tab-pane v-for="(item, i) in statusTypes" :key="i" :label="item.name" :name="item.name"></el-tab-pane>
      </el-tabs>
      <div class="search">
        <input type="text" class="ipt" v-model="keywords" @keyup.enter="handleSearch">
        <span class="el-icon-search vc" @click="handleSearch"></span>
      </div>
    </div>
    <el-table stripe :data="tableData" class="my-table">
      <el-table-column type="index" :width="WITH_LESS_2_WORDS" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="apiType.name" :min-width="WITH_WITH_INDEFINITE_SUPER_LENGTH_TEXT" label="数据接口名称" align="left">
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="url" width="300" label="费用详情" align="left">
        <template slot-scope="scope">
          <p>单次调用{{ scope.row.price }}元/每月上限{{ scope.row.limit }}元</p>
        </template>
      </el-table-column>
      <el-table-column :width="WITH_LESS_8_WORDS" align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="statusId === 0" type="primary" :round="true" size="mini" class="el-button" disabled align="center">
            审核中
          </el-button>
          <el-button v-else-if="statusId === 1" type="primary" :round="true" size="mini" @click="handleTableCheckClick(scope.row)" class="el-button" align="center">
            查看
          </el-button>
          <el-button v-else type="success" :round="true" size="mini" @click="handleApplyDataClick(scope.row, $event)" class="el-button" align="center">
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
import { ApiService } from '@/services/api.js';
import ToastTip from '@/lib/message.js';
import cellWidth from '@/lib/cellWidth.js';
import common from '@/lib/common.js';

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
      apiService: new ApiService(),
      tabModel: '未申请',
      statusId: 2,
      statusTypes: [
        {
          name: '未申请',
          id: 2
        },
        {
          name: '审核中',
          id: 0
        },
        {
          name: '已申请',
          id: 1
        }
      ],
      keywords: '',
      pagination: {
        totalCount: 0,
        pageSize: 20,
        // curPage用于分页器当前页
        curPage: 1
      },
      tableData: [],
      columns: ['数据接口名称', '接口地址', '调用单价（次/元）', '已调用次数', '已消费金额（元）', '操作']
    };
  },
  methods: {
    handleTableCheckClick (row) {
      this.$router.push({ path: '/console/data/detail/index.html', query: { id: row.id } });
    },
    handleApplyDataClick (row, $e) {
      let btn = $e.target.parentNode;
      let confirm = ToastTip.confirm({
        content: `您将购买数据接口“${row.name}”`
      });
      confirm.then(() => {
        this.apiService.applyData({id: row.id}).then(res => {
          common.requestMsgHandler(res);
          if (res.code === 1) {
            btn.disabled = 'disabled';
            btn.className = 'el-button el-button el-button--primary el-button--mini is-disabled is-round';
            btn.innerHTML = '<span>审核中</span>';
          }
        }).catch(() => { });
      }).catch(() => {});
    },
    async getData () {
      let res = await this.apiService.getListAudit({
        'apiTypeId': '',
        'pageSize': this.pagination.pageSize,
        'pageNum': this.pagination.curPage,
        'name': this.enCodeURIKeywords,
        'auditStats': this.statusId
      });
      this.tableData = res.list;
      this.pagination.totalCount = res.count || res.totalCount;
    },
    handleCurrentChange (val) {
      // 点击分页跳转
      let url = this.$route.path;
      let nUrl = url + '?page=' + val;
      this.$router.push({ path: nUrl });
    },
    handleSearch () {
      if (this.pagination.curPage !== 1) this.pagination.curPage = 1;
      this.$router.push({ path: this.$route.path + '?page=' + this.pagination.curPage + '&name=' + this.enCodeURIKeywords });
    },
    handleTypeClick (pane) {
      // 重置分类
      let paneName = pane.paneName;
      this.statusTypes.forEach(v => {
        if (v.name === paneName) this.statusId = v.id;
      });
      // 重置keywords
      this.keywords = '';
      // 重置page
      if (this.pagination.curPage !== 1) this.pagination.curPage = 1;
      this.$router.push({ path: this.$route.path + '?page=' + this.pagination.curPage + '&auditStats=' + this.statusId });
      // 这里不需要手动从新获取数据，因为监听了路由
      // this.getData();
    }
  },
  computed: {
    enCodeURIKeywords () {
      return encodeURIComponent(this.keywords);
    }
  },
  watch: {
    '$route': 'getData'
  },
  metaInfo: {
    title: '控制台-申请数据'
  }
};
</script>
<style scoped lang="scss">
.none {
  display: none !important;
}
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
      position: absolute;
      top: 20px;
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
