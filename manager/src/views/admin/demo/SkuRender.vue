<template>
    <div>
        <en-sku-render @refreshFunc='refresh' :goodsID='163'></en-sku-render>
    </div>
</template>

<script>

export default {
  methods: {
    // 每次用户选择不同的规格选项，都会调用此方法，将选择的sku数据抛出来
    refresh(data) {
      console.log('-->', data)
    }
  }
}
</script>