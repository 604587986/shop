<template>
  <div class="tree-menu" :style="{width, height}">
    <ul v-for="menuItem in treeData" :key="menuItem.id">
      <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
      <!--<div style="margin: 15px 0;"></div>-->
      <!--<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">-->
        <!--<el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>-->
      <!--</el-checkbox-group>-->
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
