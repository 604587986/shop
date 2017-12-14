<template>
    <sku-editor :init='initData' :categoryID='123' ref='skueditor'></sku-editor>
</template>

<script>
// 在需要使用的组件中导入该组件
import SkuEditor from '@/plugins/selector/vue/SkuEditor'

export default {
  data() {
    return {
      // 初始化所需数据示例
      initData: {
        quantity: 123,
        skuList: [
          {
            price: 44,
            weight: 123,
            quantity: 4,
            cost: 4,
            sn: 123,
            specList: [
              {
                spec_name: '颜色',
                spec_id: 1,
                spec_value: 123,
                spec_value_id: 100,
                spec_type: null,
                spec_image: null
              }
            ]
          },
          {
            price: 4,
            weight: 4,
            quantity: 4,
            cost: 4,
            sn: 4,
            specList: [
              {
                spec_name: '颜色',
                spec_id: 1,
                spec_value: 124,
                spec_value_id: 101,
                spec_type: null,
                spec_image: null
              }
            ]
          }
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
  },
  // 注册为子组件
  components: {
    SkuEditor
  }
}
</script>