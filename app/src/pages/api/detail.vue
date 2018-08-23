<template>
  <div>
    <div class="content markdown-body" v-html="rawHtml"></div>
    <div class="editor-wrapper">
      <mavon-editor style="height: 100%" v-model="value" v-on:change="onChange"></mavon-editor>
    </div>
  </div>
</template>

<script>

import { mavonEditor } from 'mavon-editor';

export default {
  name: 'profile-mdeditor',
  metainfo: {
    title: 'profile-mdeditor'
  },
  data () {
    return {
      value: `
@[toc](目录)

Markdown 语法简介
=============
> [语法详解](http://commonmark.org/help/)
      `,
      rawHtml: ''
    };
  },
  components: {
    mavonEditor
  },
  methods: {
    onChange (v, r) {
      this.rawHtml = r;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.editor-wrapper {
  display: none;
}
</style>
