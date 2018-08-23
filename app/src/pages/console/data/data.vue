<template>
  <div class="data">
    <div class="t">
      <el-tabs v-model="apiType" type="card" class="el-tabs" @tab-click="handleTypeClick">
        <el-tab-pane v-for="(item, i) in apiTypes" :key="i" :label="item.name" :name="item.type"></el-tab-pane>
      </el-tabs>
      <div class="search">
        <input type="text" class="ipt" v-model="keywords" @keyup.enter="handleSearch">
        <span class="el-icon-search vc" @click="handleSearch"></span>
      </div>
    </div>
    <el-table stripe :data="tableData" class="my-table">
      <el-table-column type="index" :width="WITH_LESS_2_WORDS" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="name" :min-width="WITH_INDEFINITE_SUPER_LENGTH_TEXT" label="数据接口名称">
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.name" placement="bottom" effect="light">
            <p>{{ scope.row.name }}</p>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="url" :min-width="WITH_INDEFINITE_SUPER_LENGTH_TEXT" label="接口地址">
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.url" placement="bottom" effect="light">
            <p>{{ scope.row.url }}</p>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="price" :width="WITH_LESS_8_WORDS" label="调用单价（元/次）">
      </el-table-column>
      <el-table-column prop="useCount" :width="WITH_LESS_8_WORDS" label="已调用次数">
      </el-table-column>
      <el-table-column prop="amount" :width="WITH_LESS_8_WORDS" label="已消费金额（元）">
      </el-table-column>
      <el-table-column :width="WITH_LESS_2_WORDS" align="center" label="操作">
        <template slot-scope="scope">
          <span @click="handleTableClick(scope.row)" class="jump">查看</span>
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
      apiType: 'car1',
      keywords: '',
      pagination: {
        totalCount: 0,
        pageSize: 20,
        // curPage用于分页器当前页
        curPage: 1
      },
      apiTypes: [
        {
          name: '车辆运行数据',
          type: 'car1'
        },
        {
          name: '车辆数据分析',
          type: 'car2'
        },
        {
          name: '车主服务数据',
          type: 'car3'
        }
      ],
      tableData: [],
      columns: ['数据接口名称', '接口地址', '调用单价（元/次）', '已调用次数', '已消费金额（元）', '操作']
    };
  },
  methods: {
    handleTableClick (row) {
      this.$router.push({path: '/console/data/detail/', query: {id: row.id}});
    },
    getData () {
      axiosApi('getInterfaces', {
        'pageSize': this.pagination.pageSize,
        'page': this.pagination.curPage,
        'type': this.apiType,
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
  .jump {
    font-size: 14px;
    color: #0099cc;
    cursor: pointer;
  }
  .block {
    margin: 20px 0;
    text-align: center;
  }
}
</style>
