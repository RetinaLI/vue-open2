<template>
  <section class="con-info">
    <div class="con-info-user padTop">
      <!--<h3 class="con-info-user-title">实名认证</h3>-->
      <div class="con-info-part">
        <con-title
          :title="title[0]"
          :isShow="true"
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
                action=""
                :auto-upload="false"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-change="handleChange"
                :before-upload="beforeAvatarUpload">
                <img v-if="ruleForm.photo" :src="ruleForm.photo" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <p class="con-auth-photo-info">请教企业营业执照的扫描文件或复印件，需要加盖双章（红色企业公章+自带右下角签发机关章）。<br/>需确保图片清晰可见。图片格式支持png、bmp、jpeg、jpg，大小不超过20MB
              </p>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input v-model="ruleForm.uname"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
              <el-input v-model="ruleForm.tel"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" size="small">确认修改</el-button>
              <el-button @click="cancelForm('ruleForm')" size="small">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { AuthService } from '@/services/auth';
import ConTitle from '@/components/console/con-info-title/con-info-title';

let authService = new AuthService();
export default {
  name: 'PersonalAuth',
  data () {
    return {
      title: ['认证信息'],
      changeInfo: {
        changed: false,
        title: '修改'
      },
      old: {
        name: '',
        regNum: '',
        photo: '',
        uname: '',
        tel: ''
      },
      ruleForm: {
        name: '',
        regNum: '',
        photo: '',
        uname: '',
        tel: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入企业名称', trigger: 'blur'}
        ],
        regNum: [
          {required: true, message: '请输入统一社会信用代码/营业执照注册号', trigger: 'blur'}
        ],
        photo: [
          {required: true, message: '请上传营业执照影印件', trigger: 'blur'}
        ]
      }
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    cancelForm (formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.name = this.old.name;
      this.ruleForm.regNum = this.old.regNum;
      this.ruleForm.photo = this.old.photo;
      this.ruleForm.uname = this.old.uname;
      this.ruleForm.tel = this.old.tel;
      if (formName === 'ruleForm') {
        this.changeInfo.changed = false;
        this.changeInfo.title = '修改';
      }
    },
    handleChange (file) {
      console.log(file);
      this.beforeAvatarUpload(file);
      this.ruleForm.photo = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess (res, file) {
      this.ruleForm.photo = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      const isJPG = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 * 10 < 20;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 20MB!');
      }
      return isJPG && isLt2M;
    },
    async getAuth () {
      let {companyName, companyCode, companyImg, user, tel} = await authService.getAuth();
      this.ruleForm.name = this.old.name = companyName;
      this.ruleForm.regNum = this.old.regNum = companyCode;
      this.ruleForm.photo = this.old.photo = companyImg;
      this.ruleForm.uname = this.old.uname = user;
      this.ruleForm.tel = this.old.tel = tel;
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
        &/deep/>label {
          line-height: 20px;
        }
      }
    }
    /deep/ .con-auth-photo>div {
      display: flex;
      align-items: center;
      .avatar-uploader {
        width: $photoHeight;
        height: $photoHeight;
        &>div {
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
</style>
