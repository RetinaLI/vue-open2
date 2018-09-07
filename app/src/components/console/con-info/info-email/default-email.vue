<template>
  <el-form
    label-width="100px"
  >
    <el-form-item
      label="邮箱 :"
    >
      <span class="con-email">{{getCurrentUser.email || '暂无'}}</span>
    </el-form-item>
  </el-form>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'default-email',
  computed: {
    ...mapGetters([
      'getCurrentUser'
    ])
  }
};
</script>

<style scoped>

</style>
