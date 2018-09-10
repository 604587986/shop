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
        /** 地区数据（全部数据） */
        areaData: [],

        /** 选中数据 */
        chooseData: []
      }
    },
    mounted() {
      this.areaData = cloneObj(this.treeData)
    },
    methods: {
      /** 监听选中数据 */
      onselected(model, parentNode) { // 监听响应 选中之后进行计算现在选中之后的数据
        if (model.isSelected) { // 选中时加入选中数据 计算选中数据\
          let result = this.getSelectedData(this.areaData, parentNode.isSelected ? parentNode : model)
          this.chooseData.push(cloneObj(result))
        } else { // 未选中时 删除选中数据 从选中数据中删除对应项

        }
        this.$emit('getChooseData', this.chooseData)
        console.log(this.chooseData)
      },

      getSelectedData(all, part) { // 获取选中数据 树形数组
        let result = []
        if (part.level === 1) { // 1级别 把1级项加入选中数据 终止循环
          all.forEach(key => {
            if (key.id === part.id) {
              result.push(key)
              return
            }
          })
        } else if (part.level === 2) { // 2级别 把2级项加入选中数据 终止循环
          all.forEach(key => {
            if (key.id === part.parent_id) {
              key.children = key.children.filter(item => {
                if (item.id === part.id) {
                  return item
                }
              })
              result.push(key)
              return
            }
          })
        } else if (part.level === 3) { // 3级别 叶子节点
          result = this.getLevel3Data(all, part)
          all.filter(key => {
            if (key.id === part.id) {
              all = []
              all.push(part)
              return all
            } else if (key.children.length) {
              key.children = this.getSelectedData(key.children, part)
            }
          })
        }
        return result
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
