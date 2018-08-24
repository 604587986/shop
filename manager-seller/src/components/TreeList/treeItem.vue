<template>
  <li>
    <!--图标 & 当前项数据-->
     <div @click="toggle(model.id)">
         <i v-if="isFolder" :class="[open ? 'el-icon-caret-bottom': 'el-icon-caret-right']"></i>
         <i v-if="!isFolder"></i>
         {{ model.local_name }}
     </div>
    <!--子项数据-->
    <collapse-transition>
      <ul style="padding-left: 18px"  v-show="open" v-if="isFolder">
        <en-tree-item @selectCaputure="onselect(item)" v-for="item in model.children" :model="item" :key="item.id"></en-tree-item>
      </ul>
    </collapse-transition>
  </li>
</template>

<script>
  import collapseTransition from './collapse-transition'
  export default {
    name: 'EnTreeItem',
    props: {
      model: {
        type: Object,
        default: {}
      }
    },
    components: {
      collapseTransition
    },
    data() {
      return {
        open: false
      }
    },
    computed: {
      isFolder() { // 是否有子项
        return this.model.children && this.model.children.length
      }
    },
    methods: {
      toggle(id) {
        this.$emit('selectCaputure', id)
        if (this.isFolder) {
          this.open = !this.open
        }
      },
      onselect(item) {
        this.$emit('selectCaputure', item)
      }
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  ul {
    list-style: none;
  }
  .tree-menu li {
    line-height: 1.5;
  }
  .tree-menu li div{
    width: 100%;
    cursor: pointer;
    display: inline-block;
    line-height: 30px;
    &:hover {
      background-color: #f5f7fa;
    }
  }
</style>

