<template>
  <div>
    <el-form label-width="100px" class="con-form view-wrapper" v-show="!changeInfo.changed">
      <el-form-item label="头像 :" class="con-upload-icon">
        <div class="con-user-icon">
          <img :src="getCurrentUser.headImageUrl || iconPng" class="avatar">
        </div>
      </el-form-item>
      <el-form-item label="昵称 :" prop="username">
        <span class="con-name">{{getCurrentUser.name || '暂无'}}</span>
      </el-form-item>
    </el-form>
    <el-form
      :model="infoForm"
      :rules="rules"
      ref="infoForm"
      label-width="100px"
      v-show="changeInfo.changed"
      class="con-form edit-wrapper">
      <el-form-item label="头像 :" class="con-upload-icon">
        <div class="con-user-icon">
          <img v-if="infoForm.userIcon" :src="infoForm.userIcon" class="avatar">
        </div>
        <el-upload
          class="avatar-uploader"
          :action="fileUploadUrl"
          :data="fileUploadData"
          multiple
          name="fileData"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-success="onFileUploadSuccess">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <p class="danger font12 file-info" v-show="changeInfo.changed">上传文件类型:png/jpg/gif,大小不超过2M</p>
      </el-form-item>
      <el-form-item class="edit-input" label="昵称 :" prop="username">
        <el-input
          type="text"
          v-model="infoForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="save" type="primary" @click="submitInfoForm('infoForm', 'changeInfo')" size="mini">保存</el-button>
        <el-button class="cancel" @click="cancelInfoForm('infoForm', 'changeInfo')" size="mini">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import iconPng from '@/assets/images/icon-user.png';
import ValidateFactory from '@/lib/validate';
import ToastTip from '@/lib/message';
import Common from '@/lib/common';
import { getUrlConfig } from '@/http/http.url.config';
import InfoService from '@/services/info';

export default {
  name: 'Index',
  data () {
    return {
      fileUploadUrl: getUrlConfig('postImg').url,
      fileUploadData: {
        moduleId: 'api'
      },
      infoForm: {
        userIcon: '',
        username: ''
      },
      rules: {
        username: [
          {validator: ValidateFactory.nickName, trigger: 'blur'}
        ]
      },
      iconPng,
      file: ''
    };
  },
  props: {
    changeInfo: {
      type: Object,
      default: () => {
        return {
          changed: false,
          title: '修改'
        };
      }
    }
  },
  computed: {
    ...mapGetters([
      'getCurrentUser'
    ])
  },
  methods: {
    infoFormValue () {
      this.infoForm.username = this.getCurrentUser.name || '暂无';
      this.infoForm.userIcon = this.getCurrentUser.headImageUrl || iconPng;
    },
    async changeName () {
      let res = await InfoService.postName({
        name: this.infoForm.username
      });
      Common.requestMsgHandler(res);
      if (res.code === 1) {
        this.$store.commit('UPDATE_NAME', this.infoForm.username);
      }
      return res;
    },
    async changeAvatar () {
      if (this.file) {
        let res = await InfoService.modifyAvatar({
          headImageUrl: this.file[0].filePath
        });
        if (res.code === 1) {
          this.$store.commit('UPDATE_HEADIMG', this.infoForm.userIcon);
        }
        Common.requestMsgHandler(res);
        return res;
      }
    },
    submitInfoForm (formName, type) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.infoForm.username !== this.getCurrentUser.name || this.infoForm.userIcon !==
            this.getCurrentUser.headImageUrl) {
            let nameRes = await this.changeName();
            let avatarRes = await this.changeAvatar();
            if (nameRes.code === 1 || avatarRes.code === 1) {
              this.cancelInfoForm(formName, type);
            }
          } else {
            this[type].changed = false;
            this[type].title = '修改';
          }
        }
      });
    },
    cancelInfoForm (formName, type) {
      this.$refs[formName].resetFields();
      this.infoForm.userIcon = this.getCurrentUser.headImageUrl || iconPng;
      this.infoForm.username = this.getCurrentUser.name || '暂无';
      this[type].changed = false;
      this[type].title = '修改';
    },
    onFileUploadSuccess (response, file) {
      if (response.success) {
        this.infoForm.userIcon = response.fileBeans[0].filePath;
        this.file = response.fileBeans;
      } else {
        this.file = '';
      }
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        ToastTip.error('上传头像图片只能是 JPG/PNG/GIF 格式!');
      }
      if (!isLt2M) {
        ToastTip.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
      // },
      // getInfo () {
      //   console.log('--获取头像--');
      // let {name = '', headImageUrl = iconPng} = this.getCurrentUser;
      // this.infoForm.userIcon = headImageUrl;
      // this.infoForm.username = name;
    }
  },
  mounted: function () {
    // this.getInfo();
  }
};
</script>

<style scoped lang="scss">
  $iconHeight: 80px;
  .con-upload-icon /deep/ {
    & > label {
      line-height: $iconHeight;
    }
    & > div {
      display: flex;
    }
  }

  .file-info {
    line-height: $iconHeight;
    margin-left: 10px;
  }

  .con-user-icon {
    width: $iconHeight;
    height: $iconHeight;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #eee;
    margin-right: 25px;

    .avatar {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
</style>
