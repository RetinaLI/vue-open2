<!-- 顶部导航组件 -->
<!-- 使用说明：<top-bar></top-bar> -->
<template>
  <div id="mdeditor-wrap">
    <button v-on:click="getContent">获取</button>
    <mavon-editor style="height: 100%" v-model="value" v-on:change="onChange"></mavon-editor>
  </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

export default {
  name: 'markdown-editor',
  data () {
    return {
      value: `
@[toc](目录)

Markdown 语法简介
=============
> [语法详解](http://commonmark.org/help/)
      `,
      html: ''
    };
  },
  computed: {
  },
  methods: {
    getContent () {
    },
    onChange (v, r) {
      this.html = r;
      console.info(v, r, this.value);
    }
  },
  components: {
    mavonEditor
  }
};
</script>
<style scoped lang="scss">
    #mdeditor-wrap {
        margin: auto;
        width: 80%;
        height: 580px;
    }
</style>
