<template>
    <div class="goods-cats-edit-container" style="padding: 10px; background-color: #fff"></div>
</template>

<script>
  import $ from 'jquery'
  import '@/plugins/selector/js/jquery.goodsCatsEdit'
  export default {
    name: 'EnGoodsCatsEdit',
    props: {
      api: {
        type: String,
        default: `${process.env.BASE_API}/goods-info/category/@id/children.do?format=plugin`
      },
      canEdit: {
        type: Boolean,
        default: true
      },
      addCat: {
        type: Function,
        default: (data) => console.log('添加分类', data)
      },
      selectItem: {
        type: Function,
        default: (data) => console.log('触发回调', data)
      },
      itemBtns: {
        type: Array,
        default: () => [
          { text: '编辑', onClick: (cat) => console.log('编辑分类', cat) },
          { text: '删除', textStyle: 'color: red', onClick: (cat) => console.log('删除分类', cat) }
        ]
      }
    },
    data() {
      return {
        options: {
          api: this.api,
          canEdit: this.canEdit,
          addCat: this.addCat,
          callback: this.selectItem,
          itemBtns: this.itemBtns
        }
      }
    },
    mounted() {
      this.goodsCatsEdit = $('.goods-cats-edit-container').goodsCatsEdit(this.options).init()
    },
    methods: {
      refresh() {
        this.goodsCatsEdit.refreshData()
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
  @import "../css/jquery.goodsCatsEdit.css";
</style>
