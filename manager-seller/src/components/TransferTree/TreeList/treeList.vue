<template>
  <div class="tree-menu" :style="{width, height}">
    <ul v-for="menuItem in treeData" :key="menuItem.id">
      <en-tree-item :model="menuItem" @selectCaputure="onselected"></en-tree-item>
    </ul>
  </div>
</template>
<script>
  import treeItem from './treeItem.vue'
  import { cloneObj } from '@/utils/index'
  export default {
    name: 'EnTreeList',
    props: {
      /** 树形数据 */
      treeData: {
        type: Object,
        default: {}
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
        /** 地区数据（全部数据） */
        areaData: {},

        /** 选中数据 */
        chooseData: {}
      }
    },
    mounted() {
      this.areaData = cloneObj(this.treeData)
    },
    methods: {
      /** 监听选中数据 */
      onselected(model, parentNode) { // 监听响应 选中之后进行计算现在选中之后的数据
        if (model.isSelected) { // 选中时加入选中数据 计算选中数据
          switch (model.level) {
            case 1: this.chooseData[model.id] = this.areaData[model.id]
              break
            case 2: this.addLevelTwoData(model, parentNode)
              break
            case 3: this.addLevelThreeData(model, parentNode)
              break
          }
        } else { // 未选中时 删除选中数据 从选中数据中删除对应项
          switch (model.level) {
            case 1: delete this.chooseData[model.id]
              break
            case 2: delete this.chooseData[parentNode.id].children[model.id]
              break
            case 3: delete this.chooseData[parentNode.parent_id].children[parentNode.id].children[model.id]
              break
          }
        }
        console.log(this.chooseData)
        this.$emit('getChooseData', this.chooseData)
      },

      /** 添加level2数据 */
      addLevelTwoData(model, parentNode) { // 获取选中数据 树形对象
        let isExit = false // 是否父节点（level1）已经存在 默认不存在
        for (let i in this.chooseData) {
          if (parentNode.id === i) { // 存在
            isExit = true
          }
        }
        if (!isExit) { // 如果不存在
          this.chooseData[parentNode.id] = this.areaData[parentNode.id]
          this.chooseData[parentNode.id].children = {}
        }
        this.chooseData[parentNode.id].children[model.id] = model
      },

      /** 添加level3数据 */
      addLevelThreeData(model, parentNode) {
        let isExitLevel1 = false // 是否祖节点（level1）已经存在 默认不存在
        for (let i in this.chooseData) {
          if (parentNode.parent_id === i) { // 祖节点（level1）存在
            isExitLevel1 = true
          }
        }
        if (isExitLevel1) { // 如果祖节点存在
          let isExitLevel2 = false // 是否父节点（level2）已经存在 默认不存在
          for (let i in this.chooseData[parentNode.parent_id].children) {
            if (parentNode.id === i) { // 存在
              isExitLevel2 = true
            }
          }
          if (!isExitLevel2) { // 父节点不存在 则把父节点赋值 并且置空children属性
            this.chooseData[parentNode.parent_id].children[parentNode.id] = this.areaData[parentNode.parent_id].children[parentNode.id]
            this.chooseData[parentNode.parent_id].children = {}
          }
        } else { // 如果祖节点不存在 则把祖节点加入 并且置空children属性
          this.chooseData[parentNode.parent_id] = this.areaData[parentNode.parent_id]
          this.chooseData[parentNode.parent_id].children = {}
          // 此时父节点一定不存在 把父节点加入 并且置空父节点children属性
          this.chooseData[parentNode.parent_id].children[parentNode.id] = parentNode
          this.chooseData[parentNode.parent_id].children[parentNode.id].children = {}
        }
        // 把当前节点添加进入对应位置
        this.chooseData[parentNode.parent_id].children[parentNode.id].children[model.id] = model
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
