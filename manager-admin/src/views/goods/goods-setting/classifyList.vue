<template>
  <div>
    <en-goods-cats-edit
      ref="goodscatsedit"
      canEdit
      :add-cat="handleAddCat"
      :item-btns="itemBtns"
    />
    <el-dialog title="添加分类" :visible.sync="dialogAddCatVisible">
      添加分类
    </el-dialog>
  </div>
</template>

<script>
  import { GoodsCatsEdit } from '../../../plugins/selector/vue'
  export default {
    name: 'classifyList',
    components: {
      [GoodsCatsEdit.name]: GoodsCatsEdit
    },
    data() {
      return {
        itemBtns: [
          { text: '参数', onClick: (cat) => console.log(cat) },
          { text: '品牌', onClick: (cat) => console.log(cat) },
          { text: '规格', onClick: (cat) => console.log(cat) },
          { text: '编辑', onClick: (cat) => console.log(cat) },
          { text: '删除', textStyle: 'color: red', onClick: this.handleDeleteCat }
        ],
        dialogAddCatVisible: false
      }
    },
    methods: {
      /** 添加分类 */
      handleAddCat(cat) {
        this.dialogAddCatVisible = true
        console.log(cat)
      },

      /** 删除分类确认 */
      handleDeleteCat(cat) {
        this.$confirm('确定要删除这个分类吗？', '提示', { type: 'warning' })
          .then(() => { this.DELETE_Cat(cat.id) })
          .catch(() => {})
      },

      /** 调用插件内部刷新方法 */
      handleRefresh() {
        this.$refs.goodscatsedit.refresh()
      },

      /** 删除分类请求 */
      DELETE_Cat(ids) {
        this.$http.delete(`http://localhost:8080/javashop/goods-info/admin/category/delete/${ids}.do`)
          .then(() => {
            this.$message.success('删除成功！')
            this.handleRefresh()
          })
          .catch((error) => { console.log(error) })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
