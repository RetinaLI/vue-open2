<template>
  <div class="data">
    <div class="t">
      <el-tabs v-model="tabsModel" type="card" class="el-tabs" @tab-click="handleTypeClick">
        <el-tab-pane v-for="(item, i) in apiTypes" :key="i" :label="item.name" :name="'type'+item.id"></el-tab-pane>
      </el-tabs>
      <div class="search">
        <input type="text" class="ipt" v-model="keywords" @keyup.enter="handleSearch">
        <span class="el-icon-search vc" @click="handleSearch"></span>
      </div>
    </div>
    <el-table stripe :data="tableData" class="my-table">
      <el-table-column type="index" :width="WITH_LESS_2_WORDS" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="name" :min-width="WITH_WITH_INDEFINITE_SUPER_LENGTH_TEXT" label="数据接口名称">
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.name" placement="bottom" effect="light">
            <p>{{ scope.row.name }}</p>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="requestUrl" :min-width="WITH_WITH_INDEFINITE_SUPER_LENGTH_TEXT" label="接口地址">
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.requestUrl" placement="bottom" effect="light">
            <p>{{ scope.row.requestUrl }}</p>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="price" :width="WITH_LESS_8_WORDS" label="调用单价（元/次）">
      </el-table-column>
      <el-table-column prop="frequency" :width="WITH_LESS_8_WORDS" label="已调用次数">
      </el-table-column>
      <el-table-column prop="consumptionAmount" :width="WITH_LESS_8_WORDS" label="已消费金额（元）">
      </el-table-column>
      <el-table-column :width="WITH_LESS_8_WORDS" align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" :round="true" size="mini" @click="handleTableClick(scope.row)" class="jump el-button"  align="center">
            查看
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
import cellWidth from '@/lib/cellWidth.js';
export default {
  name: 'ConData',
  created () {
    this.getListApiType();
  },
  data () {
    return {
      ...cellWidth,
      apiService: new ApiService(),
      tabsModel: '',
      keywords: '',
      pagination: {
        totalCount: 0,
        pageSize: 20,
        // curPage用于分页器当前页
        curPage: 1
      },
      apiTypes: [],
      tableData: [],
      columns: ['数据接口名称', '接口地址', '调用单价（元/次）', '已调用次数', '已消费金额（元）', '操作']
    };
  },
  methods: {
    handleTableClick (row) {
      this.$router.push({ path: '/console/data/detail/index.html', query: { id: row.id } });
    },
    getListApiType () {
      this.apiService.getListApiType().then(res => {
        if (!res || res.length === 0) return false;
        this.apiTypes = res;
        let p = Number(this.$route.query.page);
        let t = Number(this.$route.query.apiType);
        if (p) this.pagination.curPage = p;
        if (t) {
          this.apiType = t;
          this.tabsModel = 'type' + t;
        } else {
          this.apiType = res[0].id;
          this.tabsModel = 'type' + res[0].id;
        }
        this.getData();
      });
    },
    getData () {
      this.apiService.getApiSubscibe({
        'status': 1,
        'pageSize': this.pagination.pageSize,
        'pageNum': this.pagination.curPage,
        'apiTypeId': this.apiType,
        'name': this.enCodeURIKeywords
      })
        .then(res => {
          this.tableData = res.list;
          this.pagination.totalCount = res.totalCount || res.count;
          this.keywords = '';
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
      this.$router.push({path: this.$route.path + '?page=' + this.pagination.curPage + '&name=' + this.enCodeURIKeywords});
    },
    handleTypeClick (pane) {
      console.log(pane);
      // 重置分类
      let paneName = pane.paneName;
      this.apiType = parseInt(paneName.split('type')[1]);
      // 重置keywords
      this.keywords = '';
      // 重置page
      if (this.pagination.curPage !== 1) this.pagination.curPage = 1;
      this.$router.push({ path: this.$route.path + '?page=' + this.pagination.curPage + '&apiType=' + this.apiType });
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
    title: '控制台-我的数据'
  }
};
</script>
<style scoped lang="scss">
.data {
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
  .jump /deep/ span {
    font-size: 14px !important;
    color: #fff;
  }
  .block {
    margin: 20px 0;
    text-align: center;
  }
}
</style>
