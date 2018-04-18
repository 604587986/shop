<template>
  <div class="shop-star">
    <i v-for="_ in star" :key="_" class="iconfont ea-icon-fill-star" :style="{color: fillColor}"></i>
    <i v-for="_ in (5 - star)" :key="_ + 5" class="iconfont ea-icon-fill-star" :style="{color: color}"></i>
  </div>
</template>

<script>
  export default {
    name: 'EnShopStar',
    props: {
      star: {
        type: Number,
        default: 5
      },
      /** 默认颜色 */
      color: {
        type: String,
        default: '#e0e0e0'
      },
      /** 填充色 */
      fillColor: {
        type: String,
        default: '#f9ac02'
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .shop-star {
    display: inline-block;
  }
</style>
