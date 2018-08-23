<template>
  <div>
    <markdown-editor></markdown-editor>
  </div>
</template>

<script>

import mdeditor from 'components/mdeditor';

export default {
  name: 'profile-mdeditor',
  metainfo: {
    title: 'profile-mdeditor'
  },
  data () {
    return {
    };
  },
  components: {
    'markdown-editor': mdeditor
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
