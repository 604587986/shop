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
          :model="item"
          :parentNode="model"
          @selectCaputure="onselected"
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
      /** 当前节点 */
      model: {
        type: Object,
        default: {}
      },

      /** 当前节点的父节点 */
      parentNode: {
        type: Object,
        default: () => { return {} }
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
        if (this.isFolder) { // 如果存在子项 则展开/ 关闭
          this.open = !this.open
        }
      },
      handleChoose(model) { // 选中/不选中 model为当前项
        model.isSelected = !model.isSelected
        // 如果当前项存在后代节点 则后代节点一并选中/不选中
        let stack = []
        stack.push(model)
        let item
        while (stack.length) {
          item = stack.shift()
          // 如果当前节点全部兄弟节点选中，则当前节点父节点选中，否则不选中
          item.isSelected = model.isSelected
          if (this.parentNode.children) {
            const result = this.parentNode.children.every(key => {
              return key.isSelected
            })
            if (result) {
              this.parentNode.isSelected = model.isSelected
            } else {
              this.parentNode.isSelected = false
            }
          }
          // 如果该节点有子节点，继续添加进入栈顶
          if (item.children && item.children.length) {
            stack = item.children.concat(stack)
          }
        }
        this.$emit('selectCaputure', model, this.parentNode)
      },
      onselected(model, parentNode) { // 监听响应 选中之后进行计算现在选中之后的数据
        this.$emit('selectCaputure', model, parentNode)
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

