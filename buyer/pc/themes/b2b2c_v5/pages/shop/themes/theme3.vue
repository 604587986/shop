<template>
  <div id="shop-theme-3">
    <en-banner :banners="shop.shop_banner"/>
  </div>
</template>

<script>
  import mixin from './themeMixin'
  export default {
    name: 'shop-theme-3',
    mixins: [mixin]
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
