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
        default: '200px'
      },
      /** 高度 */
      height: {
        type: String,
        default: '400px'
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
      onselect(model) {
        let stack = []
        stack.push(model)
        let item; let val = model.isSelected
        while (stack.length) {
          item = stack.shift()
          // 如果该节点有子节点，继续添加进入栈顶
          item.isSelected = val
          if (item.children && item.children.length) {
            stack = item.children.concat(stack)
          }
        }
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
