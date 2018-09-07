<template>
  <div>
    <DefaultEmail v-show="!changeEmail.changed"/>
    <ChangeEmail v-show="changeEmail.changed"/>
  </div>
</template>

<script>
import DefaultEmail from './default-email';
import ChangeEmail from './change-email';

export default {
  name: 'index',
  props: {
    changeEmail: {
      type: Object,
      default: () => {
        return {
          changed: false,
          title: '修改'
        };
      }
    }
  },
  methods: {
    cancelChange () {
      this.changeEmail.changed = false;
      this.changeEmail.title = '修改';
    }
  },
  components: {
    DefaultEmail,
    ChangeEmail
  }
};
</script>

<style scoped>

</style>
