<template>
  <button class="btn-component-wrap" @click="onClick">
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {},
  data() {
    return {}
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    onClick() {
      this.$emit('click')
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.btn-component-wrap {
  background-color: #fff;
  border: 1px solid blue;
  color: blue;
  padding: 3px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 6px 0 0;
}
</style>
