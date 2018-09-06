<template>
  <li>
    <!--图标 & 当前项数据-->
     <div :class="[model.isSelected ? 'is-selected' : '']" >
       <span @click="toggle(model)">
         <i v-if="isFolder" :class="[open ? 'el-icon-remove': 'el-icon-circle-plus']"></i>
         <i v-if="!isFolder"></i>
       </span>
       <span class="name-label" @click="handleChoose(model)"> {{ model.local_name }} </span>
     </div>
    <!--子项数据-->
    <collapse-transition>
      <ul style="padding-left: 18px"  v-show="open" v-if="isFolder">
        <en-tree-item
          v-for="item in model.children"
          @selectCaputure="onselect(item)"
          :model="item"
          :key="item.id"></en-tree-item>
      </ul>
    </collapse-transition>
  </li>
</template>

<script>
  import collapseTransition from './collapse-transition'
  export default {
    name: 'EnTreeItem',
    props: {
      /** 当前地区项 */
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
      toggle() {
        if (this.isFolder) { // 如果存在子项 则展开/关闭
          this.open = !this.open
        }
      },
      handleChoose(model) { // 选中/不选中
        this.model.isSelected = !this.model.isSelected
        this.$emit('selectCaputure', model)
      },
      onselect(model) {
        let stack = []
        stack.push(model)
        let item; let val = model.isSelected
        while (stack.length) {
          item = stack.shift()
          // 如果该节点有子节点，继续添加进入栈顶
          item.isSelected = val
          const result = this.model.children.every(key => {
            return key.isSelected
          })
          if (result) {
            this.model.isSelected = val
          } else {
            this.model.isSelected = false
          }
          if (item.children && item.children.length) {
            stack = item.children.concat(stack)
          }
        }
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
    line-height: 40px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    i {
      font-size: 16px;
      color: #d7d7d7;
    }
    span.name-label {
      display: inline-block;
      margin-left: 5px;
      width: 150px;
      cursor: pointer;
    }
  }
  /deep/ .is-selected {
    background-color: #d7d7d7;
    color: #fff;
  }
</style>

