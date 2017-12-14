<template>
    <div>
        <sku-render @refreshFunc='refresh' :goodsID='163'></sku-render>
    </div>
</template>

<script>
// 导入组件
import SkuRender from '@/plugins/selector/vue/SkuRender'

export default {
  methods: {
    // 每次用户选择不同的规格选项，都会调用此方法，将选择的sku数据抛出来
    refresh(data) {
      console.log('-->', data)
    }
  },
  // 绑定成子组件
  components: {
    SkuRender
  }
}
</script>