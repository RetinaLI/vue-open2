<template>
<el-form :model='ruleForm' :rules='rules' ref='ruleForm' label-width='100px' :label-position='labelPosition' class='demo-ruleForm'>

  <el-form-item label='名称' prop='name'>
    <el-input v-model='ruleForm.name'></el-input>
  </el-form-item>

  <el-form-item label='密码' prop='password'>
    <el-input v-model='ruleForm.password'></el-input>
  </el-form-item>

  <el-form-item label='出生日期' prop='birth'>
    <el-date-picker type='date' placeholder='选择日期' v-model='ruleForm.birth' style='width: 100%;'></el-date-picker>
  </el-form-item>

  <el-form-item label='性别' prop='gender'>
    <el-radio-group v-model='ruleForm.gender'>
      <el-radio label='男'></el-radio>
      <el-radio label='女'></el-radio>
    </el-radio-group>
  </el-form-item>

  <el-form-item label='头像上传'>
    <el-upload
      class='avatar-uploader'
      action='https://jsonplaceholder.typicode.com/posts/'
      :show-file-list='false'
      :on-success='handleAvatarSuccess'
      :before-upload='beforeAvatarUpload'>
      <img v-if ='imageUrl' :src='imageUrl' class='avatar'>
      <i v-else class='el-icon-plus avatar-uploader-icon'></i>
    </el-upload>
  </el-form-item>

  <el-form-item label='手机号' prop='mobile'>
    <el-input v-model='ruleForm.mobile'></el-input>
  </el-form-item>

  <el-form-item label='邮箱' prop='email'>
    <el-input v-model='ruleForm.email'></el-input>
  </el-form-item>

  <el-form-item >
    <el-button type='primary' round>确定</el-button>
    <el-button type='info' round>取消</el-button>
  </el-form-item>

</el-form>
</template>

<script>
// import { ProfileService } from '@/services/profile';
// import { STORE_MUTATION_MAP } from '@/stores';
// import { mapState } from 'vuex';
// let profileService = new ProfileService();

export default {
  name: 'profile-setting',
  metaInfo: {
    title: 'profile-setting'
  },
  data () {
    return {
      imageUrl: '',
      labelPosition: 'right',
      ruleForm: {
        name: '',
        password: '',
        // birth: '',
        gender: '',
        mobile: '',
        email: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请选择6-10位密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        mobile: [{validator: (rule, value, callback) => {
          if (/(^0?[1][34578][0-9]{9}$)/.test(value) === false) {
            callback(new Error('输入正确的11位手机号'));
          } else {
            callback();
          }
        },
        required: true,
        trigger: 'blur'}
        ],
        email: [{validator: (rule, value, callback) => {
          /* eslint-disable */
          if (/^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,4}$/.test(value) === false) {
            callback(new Error('输入正确的邮箱'));
          } else {
            callback();
          }
        },
        required: true,
        trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let para = Object.assign({}, this.ruleForm);
          console.log(para);
          this.$message({
            message: '提交成功，请在控制台查看json!！',
            type: 'success'
          });
        } else {
          return false;
        }
      });
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style>
.demo-ruleForm{
  margin-top: 40px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
