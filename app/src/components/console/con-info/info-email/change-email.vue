<template>
  <!--验证老邮箱-->
  <div>
    <div class="email-steps">
      <el-steps
        :active="getActived"
        class="email-el-steps"
        :align-center="Boolean(true)"
        process-status="finish"
        finish-status="success">
        <el-step title="验证原邮箱"></el-step>
        <el-step title="填写新邮箱"></el-step>
      </el-steps>
    </div>
    <OldEmail v-show="getActived === 0" />
    <NewEmail v-show="getActived === 1" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import OldEmail from './old-email';
import NewEmail from './new-email';

export default {
  name: 'change-email',
  data () {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'getActived'
    ])
  },
  components: {
    OldEmail,
    NewEmail
  }
};
</script>

<style scoped lang="scss">
  .email-steps {
    margin: 0 auto 40px;
    width: 600px;
  }
</style>
