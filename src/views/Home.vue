<template>
  <div class="home-wrap">
    <Editor id="imce"></Editor>
  </div>
</template>

<script>
import Editor from '~/base/tiny_editor'
export default {
  name: 'Home',
  components: { Editor },
  data() {
    return {}
  },
  mounted() {
    tinymce.init({}) // 这里传个空对象就可以了
  }
}
</script>
<style lang="less" scoped>
.home-wrap {
  .setSize(100%, 100%);
  padding: 20px;
}
</style>
