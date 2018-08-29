<template>
  <div class="tree-menu" :style="{width, height}">
    <ul v-for="menuItem in treeData" :key="menuItem.id">
      <en-tree-item @selectCaputure="onselect(menuItem)" :model="menuItem"></en-tree-item>
    </ul>
  </div>
</template>
<script>
  import treeItem from './treeItem.vue'
  export default {
    name: 'EnTreeList',
    props: {
      /** 树形数据 */
      treeData: {
        type: Array,
        default: []
      },
      /** 宽度 */
      width: {
        type: String,
        default: '240px'
      },
      /** 高度 */
      height: {
        type: String,
        default: '400px'
      },

      /** 是否全部展开 */
      'default-expand-all': {
        type: Boolean,
        default: false
      }
    },
    components: {
      [treeItem.name]: treeItem
    },
    data() {
      return {

      }
    },
    methods: {
      onselect(item) {
        this.$emit('selectCaputure', item)
      }
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
  .tree-menu {
    overflow-y: scroll;
    & > ul {
      & li {
        text-align: left;
      }
    }
  }
</style>
