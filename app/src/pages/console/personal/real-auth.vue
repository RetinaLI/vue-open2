<template>
  <section class="con-info">
    <div class="con-info-user padTop">
      <!--<h3 class="con-info-user-title">实名认证</h3>-->
      <div class="con-info-part">
        <con-title
          :title="title[0]"
          :isShow="true"
          :showAuth="showAuth"
          :changeInfo="changeInfo"
          @changeInfoHandle="changeInfoHandle('ruleForm')"
        />
        <div class="con-info-auto">
          <el-form
            label-width="150px"
            v-show="!changeInfo.changed"
          >
            <el-form-item label="企业名称 :">{{ruleForm.name || '暂无'}}</el-form-item>
            <el-form-item class="con-auth-reg-num" label="统一社会信用代码/营业执照注册号 :">{{ruleForm.regNum || '暂无'}}</el-form-item>
            <el-form-item label="企业营业执照影印件 :">
              <div class="con-auth-avatar-get" v-if="ruleForm.photo">
                <img :src="ruleForm.photo" class="avatar">
              </div>
              <p v-else>暂无</p>
            </el-form-item>
            <el-form-item label="用户类型 :">{{ruleForm.resource || '暂无'}}</el-form-item>
            <el-form-item label="联系人 :">{{ruleForm.uname || '暂无'}}</el-form-item>
            <el-form-item label="联系电话 :">{{ruleForm.tel || '暂无'}}</el-form-item>
          </el-form>
          <el-form
            v-show="changeInfo.changed"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="150px"
            class="demo-ruleForm">
            <el-form-item label="企业名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item class="con-auth-reg-num" label="统一社会信用代码/营业执照注册号" prop="regNum">
              <el-input v-model="ruleForm.regNum"></el-input>
            </el-form-item>
            <el-form-item class="con-auth-photo" label="企业营业执照影印件" prop="photo">
              <el-upload
                class="avatar-uploader"
                :action="fileUploadUrl"
                :data="fileUploadData"
                :show-file-list="false"
                multiple
                name="fileData"
                :on-success="onFileUploadSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="ruleForm.photo" :src="ruleForm.photo" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <p class="con-auth-photo-info">请教企业营业执照的扫描文件或复印件，需要加盖双章（红色企业公章+自带右下角签发机关章）。<br/>需确保图片清晰可见。图片支持JPG/PNG格式，大小不超过20MB
              </p>
            </el-form-item>
            <el-form-item label="用户类型" prop="resource">
              <el-radio-group v-model="ruleForm.resource">
                <el-radio :label="radioText[0].text"></el-radio>
                <el-radio :label="radioText[1].text"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input v-model="ruleForm.uname"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
              <el-input v-model="ruleForm.tel"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary ok" @click="submitForm('ruleForm')" size="small">确认修改</el-button>
              <el-button @click="cancelForm('ruleForm')" size="small">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ToastTip from '@/lib/message';
import AuthService from '@/services/auth';
import ConTitle from '@/components/console/con-info-title/con-info-title';
import { getUrlConfig } from '@/http/http.url.config';
import ValidateFactory from '@/lib/validate';

export default {
  name: 'PersonalAuth',
  metaInfo: {
    title: '控制台-实名认证'
  },
  data () {
    return {
      title: ['认证信息'],
      radioText: [
        {
          text: '非合同用户',
          type: 0
        }, {
          text: '合同用户（线下签订）',
          type: 1
        }
      ],
      fileUploadUrl: getUrlConfig('postImg').url,
      fileUploadData: {
        moduleId: 'api'
      },
      changeInfo: {
        changed: false,
        title: '修改'
      },
      old: {},
      ruleForm: {
        name: '',
        regNum: '',
        photo: '',
        uname: '',
        tel: '',
        resource: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入企业名称', trigger: 'blur'}
        ],
        regNum: [
          {required: true, message: '请输入统一社会信用代码/营业执照注册号', trigger: 'blur'},
          {validator: ValidateFactory.NumAndWord, trigger: 'blur'}
        ],
        photo: [
          {required: true, message: '请上传营业执照影印件', trigger: 'blur'}
        ],
        resource: [
          {required: true, message: '请选择用户类型', trigger: 'blur'}
        ]
      },
      showAuth: {
        bool: true,
        authStatus: '3',
        reason: ''
      },
      file: ''
    };
  },
  methods: {
    changeInfoHandle (formName) {
      if (formName === 'ruleForm') {
        // 修改信息状态
        if (this.changeInfo.changed) {
          return false;
        }
        this.changeInfo.changed = true;
        this.changeInfo.title = '编辑中...';
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.ruleForm.name === this.old.enterprise &&
            this.ruleForm.regNum === this.old.uscc &&
            this.ruleForm.photo === this.old.businessLicense &&
            this.ruleForm.uname === this.old.operator &&
            this.ruleForm.tel === this.old.mobile &&
            this.ruleForm.resource === this.old.resource) {
            this.cancelForm(formName);
          } else {
            let type = this.radioText.filter(ele => ele.text === this.ruleForm.resource);
            let {code = 0, message = ''} = await AuthService.postAuth({
              enterprise: this.ruleForm.name,
              uscc: this.ruleForm.regNum.toLocaleUpperCase(),
              businessLicense: this.ruleForm.photo,
              operator: this.ruleForm.uname,
              mobile: this.ruleForm.tel,
              payType: type[0].type
            });
            // let data = await this.uploadImg();
            if (code === 1) {
              ToastTip.success(message);
              this.showAuth.authStatus = '0';
              this.old.enterprise = this.ruleForm.name;
              this.old.uscc = this.ruleForm.regNum;
              if (this.file) {
                this.old.businessLicense = this.file[0].filePath;
              }
              this.old.operator = this.ruleForm.uname;
              this.old.mobile = this.ruleForm.tel;
              this.old.resource = this.ruleForm.resource;
              this.changeInfo.changed = false;
              this.changeInfo.title = '修改';
            } else {
              ToastTip.error(message);
            }
          }
        } else {
          return false;
        }
      });
    },
    cancelForm (formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.name = this.old.enterprise;
      this.ruleForm.regNum = this.old.uscc;
      this.ruleForm.photo = this.old.businessLicense;
      this.ruleForm.uname = this.old.operator;
      this.ruleForm.tel = this.old.mobile;
      if (this.old.payType === 0 || this.old.payType === 1) {
        this.ruleForm.resource = this.radioText[this.old.payType].text;
      } else {
        this.ruleForm.resource = '';
      }
      if (formName === 'ruleForm') {
        this.changeInfo.changed = false;
        this.changeInfo.title = '修改';
      }
    },
    // handleChange (file) {
    //   let before = this.beforeAvatarUpload(file);
    //   if (before) {
    //     this.ruleForm.photo = URL.createObjectURL(file.raw);
    //     this.file = file;
    //   }
    // },
    // async uploadImg () {
    //   let form = new FormData();
    //   form.append('file', this.file);
    //   return authService.postImg({
    //     moduleId: 'api',
    //     fileData: form
    //   });
    // },
    onFileUploadSuccess (response, file) {
      // this.$store.dispatch('initCurrentUser');
      // console.log(response);
      if (response.success) {
        this.ruleForm.photo = response.fileBeans[0].filePath;
        this.file = response.fileBeans;
      } else {
        this.file = '';
      }
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 * 10 < 20;

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 20MB!');
      }
      return isJPG && isLt2M;
    },
    async getAuth () {
      this.old = await AuthService.getAuth();
      this.ruleForm.name = this.old.enterprise || '';
      this.ruleForm.regNum = this.old.uscc || '';
      this.ruleForm.photo = this.old.businessLicense || '';
      this.ruleForm.uname = this.old.operator || '';
      this.ruleForm.tel = this.old.mobile || '';
      if (this.old.payType === 0 || this.old.payType === 1) {
        this.ruleForm.resource = this.radioText[this.old.payType].text;
      } else {
        this.ruleForm.resource = '';
      }
      this.showAuth.authStatus = this.old.authStatus + '' || '3';
      this.showAuth.reason = this.old.reason || '';
    }
  },
  mounted: function () {
    this.getAuth();
  },
  components: {
    ConTitle
  }
};
</script>

<style scoped lang="scss">
  $photoHeight: 240px;
  .con-info-part {
    .el-form {
      padding-right: 15px;
      .con-auth-reg-num {
        & /deep/ > label {
          line-height: 20px;
        }
      }
    }
    /deep/ .con-auth-photo > div {
      display: flex;
      align-items: center;
      .avatar-uploader {
        width: $photoHeight;
        height: $photoHeight;
        & > div {
          width: 100%;
          height: 100%;
        }
      }
    }
    .con-auth-avatar-get {
      width: $photoHeight;
      height: $photoHeight;
    }
    .avatar {
      width: 100%;
      height: 100%;
      display: block;
    }
    .con-auth-photo-info {
      font-size: 12px;
      line-height: 20px;
      flex: 1;
      padding-left: 15px;
    }
    .avatar-uploader-icon {
      @extend .avatar-uploader;
      line-height: $photoHeight;
    }
  }

  .el-input {
    width: 300px;
  }

  .ok {
    background-color: #4475FD;
    border-color: #4475FD;
  }
</style>
