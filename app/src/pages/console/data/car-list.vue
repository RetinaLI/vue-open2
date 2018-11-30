<template>
  <section class="con-info">
    <ConBreadCrumbs :navShow="crumbs" :btnShow="addBtn" @onAnyMethod="childMethod"/>
    <template>
      <el-table
        :data="tableData"
        class="my-table"
        style="width: 100%">
        <el-table-column
          prop="num"
          :width="cellWidth.WITH_LESS_2_WORDS"
          align="center"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="vin"
          label="车辆VIN">
        </el-table-column>
        <el-table-column
          prop="lpn"
          label="车牌号">
        </el-table-column>
        <el-table-column
          prop="state"
          :width="cellWidth.WITH_LESS_8_WORDS"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="date"
          :width="cellWidth.WITH_LESS_8_WORDS"
          label="添加日期">
        </el-table-column>
      </el-table>
    </template>
    <!--<p v-show="!auth" class="danger auth-err">您还未实名认证或者非合同用户，请先去 <router-link to="/console/auth/index.html">认证</router-link>或修改认证信息下的用户类型！</p>-->
    <div class="con-bal-pages" v-if="total > 10">
      <el-pagination
        @current-change="pageChangeHandle"
        :current-page="getCurrentPage"
        background
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog title="新增车辆-上传文件" :visible.sync="dialogAddFileVisible" width="500px">
      <el-form
        ref="addForm"
        label-width="130px"
        class="add-form">
        <el-form-item label="车辆申请列表 :" class="add-file">
          <el-upload
            class="add-uploader"
            :action="fileUploadUrl"
            :data="fileUploadData"
            multiple
            name="fileData"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="onFileUploadSuccess">
            <el-button size="mini" type="primary">上传文件</el-button>
          </el-upload>
          <p class="font12 danger file-name" v-if="file">{{file[0].fileName}}</p>
          <a href="/file!downFile.do?fileName=usercar_template.xlsx" class="down-text">下载模板</a>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancleFile" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitFile" size="mini">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="上传结果"
      :visible.sync="dialogResVisible"
      width="500px">
      <div class="dialog-res-content">
        <el-alert
          :title="`总共上传【${dialogResVisibleContent.count || 0}】条,成功上传【${dialogResVisibleContent.success || 0}】条,失败上传【${dialogResVisibleContent.fail || 0}】条`"
          type="success"
          :closable="false">
        </el-alert>
        <div class="dialog-info">
          <p class="dialog-info-title">详细信息</p>
          <div class="dialog-info-content" v-html="dialogResVisibleContent.msg"></div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogResVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import DetailService from '@/services/detail';
import AuthService from '@/services/auth';
import ConBreadCrumbs from '@/components/console/con-bread-crumbs/index';
import Common from '@/lib/common';
import cellWidth from '@/lib/cellWidth';
import ToastTip from '@/lib/message';
import { getUrlConfig } from '@/http/http.url.config';
import { mapGetters } from 'vuex';

export default {
  name: 'car_list',
  metaInfo: {
    title: '控制台-我的车辆'
  },
  data () {
    return {
      total: 0,
      fileUploadUrl: getUrlConfig('postImg').url,
      fileUploadData: {
        moduleId: 'api'
      },
      dialogAddFileVisible: false,
      dialogResVisible: false,
      dialogResVisibleContent: {},
      cellWidth,
      crumbs: {
        current: '我的车辆'
      },
      addBtn: {
        title: '新增',
        auth: false
      },
      tableData: [
        // {
        //   num: 1,
        //   vin: 'sdfsafsfsafsfdsgsgsfsfsafs',
        //   state: '正常',
        //   date: '2016-05-02'
        // }
      ],
      file: '',
      auth: true
    };
  },
  computed: {
    getCurrentPage () {
      return Number(this.$route.query.page) || 1;
    },
    ...mapGetters([
      'getCurrentUser'
    ])
  },
  watch: {
    '$route' () {
      // 路由变化执行
      this.getCarList();
    }
  },
  methods: {
    pageChangeHandle (val) {
      // 将路由跳转到对应page页
      this.$router.push({path: '/console/car_list/index.html', query: {page: val}});
    },
    childMethod () {
      this.dialogAddFileVisible = true;
    },
    async getCarList () {
      let auth = await AuthService.getAuth();
      if (auth.authStatus === 1 && auth.payType === 1) {
        this.auth = true;
        let {data, message, code, totalCount} = await DetailService.getCarList({
          pageSize: 10,
          pageNum: this.$route.query.page || 1
        });
        if (code === 1) {
          this.total = totalCount;
          let stateText = ['禁用', '审批驳回', '新申请', '审批通过'];
          this.tableData = data.map((ele, i) => {
            let date = ele.auditTime === null ? '暂无' : ele.auditTime.split(' ')[0];
            let lpn = ele.lpn || '暂无';
            return {
              num: i + 1,
              lpn,
              vin: ele.vin,
              state: stateText[ele.status + 2],
              date
            };
          });
        } else {
          ToastTip.error(message);
        }
      } else {
        this.$router.push({path: '/console/index.html'});
      }
    },
    cancleFile () {
      this.dialogAddFileVisible = false;
      this.file = '';
    },
    async submitFile () {
      if (this.file) {
        let res = await DetailService.submitFile({
          filePath: this.file[0].filePath
        });
        if (res.code === 1) {
          this.dialogAddFileVisible = false;
          this.file = '';
          this.getCarList();
          // 显示上传结果
          this.dialogResVisible = true;
          let str = res.data.msg.replace(/(\n)(\1)+/g, function ($1, $2) {
            return $2;
          });
          this.dialogResVisibleContent = Object.assign(res.data, {
            msg: str.replace(/\n/g, '<br/>') || '暂无详情'
          });
        } else {
          Common.requestMsgHandler(res);
        }
        return res;
      } else {
        ToastTip.warn('请先上传文件');
      }
    },
    onFileUploadSuccess (response, file) {
      if (response.success) {
        this.file = response.fileBeans;
      } else {
        this.file = '';
      }
    },
    beforeAvatarUpload (file) {
      let xlsx = /^(.)+\.xlsx?$/;
      const isXLS = xlsx.test(file.name);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isXLS) {
        ToastTip.error('上传头像图片只能是 xls/xlsx 格式!');
      }
      if (!isLt2M) {
        ToastTip.error('上传头像图片大小不能超过 2MB!');
      }
      return isXLS && isLt2M;
      // },
      // getInfo () {
      //   console.log('--获取头像--');
      // let {name = '', headImageUrl = iconPng} = this.getCurrentUser;
      // this.infoForm.userIcon = headImageUrl;
      // this.infoForm.username = name;
    }
  },
  mounted: function () {
    this.getCarList();
  },
  components: {
    ConBreadCrumbs
  }
};
</script>

<style scoped lang="scss">
  .dialog-info-title {
    padding: 10px 0;
    font-size: 15px;
    font-weight: bold;
  }

  .dialog-info-content {
    font-size: 14px;
    height: 100px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .add-file /deep/ > div {
    display: flex;
    align-items: center;
  }

  .auth-err {
    padding-left: 25px;
    font-size: 14px;
    font-weight: bold;
    a {
      color: #4475FD;
    }
  }

  .down-text {
    margin-left: 15px;
    color: #4475fd;
    & /deep/ > * {
      font-size: 14px !important;
    }
  }

  .avatar-uploader .el-upload.add-upload {
    border: none;
  }

  .file-name {
    margin-left: 15px;
  }

  .con-bal-pages {
    margin-top: 25px;
    text-align: center;
    .el-pagination {
      display: inline-block;
    }
  }
</style>
