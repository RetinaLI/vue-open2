<template>
  <div class="data">
    <div class="t">
      <el-tabs v-model="tabsModel" type="card" class="el-tabs" @tab-click="handleTypeClick">
        <el-tab-pane v-for="(item, i) in apiTypes" :key="i" :label="item.name" :name="'type'+item.id"></el-tab-pane>
      </el-tabs>
      <div class="search" ref="search">
        <input type="text" @focus="getFocus" @blur="getBlur" class="ipt" v-model="keywords" @keyup.enter="handleSearch">
        <span class="el-icon-search vc" @click="handleSearch"></span>
      </div>
    </div>
    <el-table stripe :data="tableData" class="my-table" v-loading="loading">
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
          <el-tooltip :content="scope.row.requesturl" placement="bottom" effect="light">
            <p>{{ scope.row.requesturl }}</p>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="price" :width="WITH_LESS_8_WORDS" label="调用单价（元/次）">
      </el-table-column>
      <el-table-column prop="frequency" :width="WITH_LESS_8_WORDS" label="已调用次数">
      </el-table-column>
      <el-table-column prop="consumptionamount" :width="WITH_LESS_8_WORDS" label="已消费金额（元）">
      </el-table-column>
      <el-table-column :width="WITH_LESS_8_WORDS" align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" :round="true" size="mini" @click="handleTableClick(scope.row)"
                     class="jump el-button" align="center">查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="no-data" v-if="tableData.length <= 0" v-show="!loading">
      <router-link to="/console/apply_list/index.html" tag="span">立即申请数据</router-link>
    </div>
    <div class="block" v-show="pagination.totalCount > pagination.pageSize">
      <el-pagination background @current-change="handleCurrentChange" :current-page.sync="pagination.curPage"
                     :page-size="pagination.pageSize" layout="prev, pager, next" :total="pagination.totalCount">
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
      columns: ['数据接口名称', '接口地址', '调用单价（元/次）', '已调用次数', '已消费金额（元）', '操作'],
      loading: true
    };
  },
  methods: {
    getFocus () {
      this.$refs.search.style.width = `200px`;
    },
    getBlur () {
      this.$refs.search.style = ``;
    },
    handleTableClick (row) {
      this.$router.push(
        {path: '/console/data/detail/index.html', query: {apiid: row.apiid, name: encodeURIComponent(row.name)}});
    },
    async getListApiType () {
      let res = await this.apiService.getListApiType();
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
    },
    async getData () {
      let res = await this.apiService.getApiSubscibe({
        'status': 1,
        'pageSize': this.pagination.pageSize,
        'pageNum': this.pagination.curPage,
        'apiTypeId': this.apiType,
        'name': this.keywords
      });
      if (res.list !== undefined && res.list.length) {
        this.tableData = res.list.map(ele => {
          return Object.assign(ele, {
            consumptionamount: ele.consumptionamount || 0,
            frequency: ele.frequency || 0,
            price: ele.price || 0
          });
        });
        this.pagination.totalCount = res.totalCount || res.count;
      } else {
        this.tableData = [];
        this.pagination.totalCount = 0;
      }
      this.loading = false;
    },
    handleCurrentChange (val) {
      // 点击分页跳转
      let url = this.$route.path;
      let nUrl = url + '?page=' + val;
      this.$router.push({path: nUrl});
    },
    handleSearch () {
      if (this.pagination.curPage !== 1) this.pagination.curPage = 1;
      this.$router.push({path: this.$route.path + '?page=' + this.pagination.curPage + '&name=' + this.keywords});
    },
    handleTypeClick (pane) {
      // 重置分类
      let paneName = pane.paneName;
      this.apiType = parseInt(paneName.split('type')[1]);
      // 重置keywords
      this.keywords = '';
      // 重置page
      if (this.pagination.curPage !== 1) this.pagination.curPage = 1;
      this.$router.push({path: this.$route.path + '?page=' + this.pagination.curPage + '&apiType=' + this.apiType});
      // 这里不需要手动从新获取数据，因为监听了路由
      // this.getData();
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
  .no-data {
    text-align: center;
    span {
      cursor: pointer;
      display: inline-block;
      margin: 30px auto 0;
      padding: 10px 15px;
      background: #4475FD;
      color: #fff;
      font-size: 14px;
      border-radius: 5px;
      &:hover {
        background: rgba(68, 117, 253, .95);
      }
    }
  }

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
        border: 1px solid #aaa;
        border-radius: 100px;
        overflow: hidden;
        transition: width 0.3s 0.3s;
        .ipt {
          padding-left: 15px;
          padding-right: 38px;
          width: 100%;
          height: 30px;
          line-height: 30px;
        }
        .vc {
          width: 12px;
          left: auto;
          right: 20px;
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
