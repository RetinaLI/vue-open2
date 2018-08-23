<template>
 <div>
   <el-form :inline="true" :model="criteria" class="demo-form-inline">
    <el-form-item label="按接口号查询">
      <el-input v-model="criteria.interFace" placeholder="接口"></el-input>
    </el-form-item>
    <el-form-item label="按时间段查询">
      <el-date-picker
      v-model="criteria.daterange"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions2">
    </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="search" v-on:click="search">查询</el-button>
    </el-form-item>
  </el-form>

    <el-table
    :data="tableData"
    stripe
    border
    style="width: 100%; height: 600px"
    class="res-table"
    @row-click="handleclick"
    :row-class-name = "tableRowClassName"
    >
    <el-table-column
      prop="id"
      label="ID号"
      width="100">
    </el-table-column>

    <el-table-column
      prop="name"
      label="接口名称"
      width="180">
    </el-table-column>

    <el-table-column
      prop="counter"
      label="使用次数"
      width="120">
    </el-table-column>

     <el-table-column
      prop="fee"
      label="费用"
      width="120">
    </el-table-column>

     <el-table-column
      prop="expire"
      label="过期时间"
      width="220">
    </el-table-column>

    <el-table-column
      prop="operate"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="pageNo"
    :page-sizes="pageSizeList"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalCount">
  </el-pagination>

  <el-dialog title="修改接口信息" :visible="dialogFormVisible" :before-close="handleClose" size="tiny">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="ID号">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="接口名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="使用次数">
          <el-input v-model="form.counter"></el-input>
        </el-form-item>
        <el-form-item label="费用">
          <el-input v-model="form.fee"></el-input>
        </el-form-item>
        <el-form-item label="过期日期">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.expire" style="width: 100%;" ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave" :loading="editLoading">修改</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
 </div>
</template>

<script>
import { ProfileService } from '@/services/profile';
let profileService = new ProfileService();

export default {
  name: 'profile-index',
  metaInfo: {
    title: 'profile-index'
  },
  created () {
    this.initApiList();
  },
  components: {
  },
  methods: {
    async initApiList () {
      let result = await profileService.getApiList();
      if (result.list.length > 0) {
        this.tableData = result.list;
        this.totalCount = result.list.length;
      } else {
        this.tableData = [];
        this.totalCount = 0;
      }
    },
    search () {
    },
    handleclick: function (row, event, column) {
      this.highlightId = row.id;
    },
    handleEdit (index, row) {
      this.dialogFormVisible = true;
      this.form = Object.assign({}, row);
      this.table_index = index;
    },
    handleSave () {
      this.$confirm('确认提交吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'cancel'
      }).then(() => {
        this.editLoading = true;
        // let date = this.form.date;
        // if (typeof date === "object") {
        //   date = [date.getFullYear(), (date.getMonth() + 1), (date.getDate())].join('-');
        //   this.form.date = date
        // }
        //          this.tableData[this.table_index] = this.form;
        // this.tableData.splice(this.table_index, 1, this.form);
        this.$message({
          message: '操作成功！',
          type: 'success'
        });
        this.editLoading = false;
        this.dialogFormVisible = false;
      }).catch(() => {
      });
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.editLoading = false;
          this.dialogFormVisible = false;
        })
        .catch(_ => { });
    },

    tableRowClassName: function (row, index) {
      if (row.id === this.highlightId) {
        return 'info-row';
      }
    },

    // 每页显示数据量变更
    handleSizeChange: function (val) {
      this.pagesize = val;
      this.loadData(this.criteria, this.currentPage, this.pagesize);
    },

    // 页码变更
    handleCurrentChange: function (val) {
      this.currentPage = val;
      this.loadData(this.criteria, this.currentPage, this.pagesize);
    }
  },
  data () {
    return {
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      criteria: {
        interFace: '',
        daterange: ''
      },
      pageNo: 1,
      pageSize: 10,
      pageSizeList: [10, 15, 20, 30, 50],
      tableData: [],
      totalCount: 0,
      highlightId: -1,
      dialogFormVisible: false,
      form: {
        id: '',
        interface: '',
        num: '',
        fee: '',
        expire: ''
      },
      editLoading: false
    };
  }
};
</script>

<style>
.res-table .cell {
  height: 26px;
}

.el-dialog {
  width: 35%;
}
</style>
