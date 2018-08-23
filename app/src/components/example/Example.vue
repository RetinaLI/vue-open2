<template>
  <section class="formAll">
    <div class="form1">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密 码" prop="password">
          <el-input v-model="ruleForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="再次输入" prop="password2">
          <el-input v-model="ruleForm.password2" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">注 册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form2">
      <hr/>
      <ul style="display: flex;">
        <li v-if="nums.datas.length > 0" v-for="(n, ind) in nums.datas" :key="ind">id:{{n.id}}; name: {{n.name}}; url: {{n.url}}
        </li>
      </ul>
    </div>
    <div class="form3">
      <hr/>
      <ul>
        <li v-if="getLists.datas.length > 0" v-for="(n, ind) in getLists.datas" :key="ind">id:{{n.id}}; name: {{n.name}}; url: {{n.url}}
        </li>
      </ul>
    </div>
    <div class="form4">
      <hr/>
      <el-input v-model="message"></el-input>
    </div>
  </section>

</template>

<script>
import axiosApi from '@/http/axiosApi';
import {mapGetters} from 'vuex';

export default {
  data () {
    return {
      nums: [],
      ruleForm: {
        username: '',
        password: '',
        password2: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        password2: [
          {
            required: true,
            message: '请再次输入密码',
            trigger: 'blur'
          },
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'},
          {
            validator: (rule, value, callback) => {
              if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致'));
              } else {
                callback();
              }
            }
          }
        ]
        // type: [
        //   {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
        // ]
      }
    };
  },
  computed: {
    ...mapGetters([
      'getLists'
    ]),
    // 修改
    message: {
      get () {
        return this.$store.message;
      },
      set (value) {
        this.$store.commit('UPDATEMESSAGE', value);
      }
    }
  },
  created: function () {
    this.getNum();
    this.getGoods();
  },
  methods: {
    getNum () {
      // 不借用store的方式
      axiosApi('list')
        .then(res => {
          console.log(res);
          this.nums = res;
        });
    },
    getGoods () {
      // 借用store方式
      this.$store.dispatch('getList');
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 异步提交数据
          this.$store.dispatch('login', this.ruleForm);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped lang="scss">
  .formAll {
    box-sizing: border-box;
    width: 100%;
    padding: 80px 30%;
    background: aquamarine;
  }

  .el-input {
    border: 1px solid blue;
  }
</style>
