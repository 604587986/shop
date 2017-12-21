<template>
  <en-sku-editor :init='initData' :categoryID='123' ref='skueditor'></en-sku-editor>
</template>

<script>
export default {
  data() {
    return {
      // 初始化所需数据示例
      initData: {
        quantity: 123,
        skuList: [
        ]
      }
    }
  },
  methods: {
    getSkuList() {
      // 获取规格数组数据
      console.log(this.$refs.skueditor.getSkuList())
    },
    generateSN() {
      // 启用’是否自动生成规格‘窗口
      console.log(this.$refs.skueditor.generateSN())
    },
    skuHasChanged() {
      // 规格数据相对于上次是否有改变
      console.log(this.$refs.skueditor.skuHasChanged())
    }
  }
}
</script>