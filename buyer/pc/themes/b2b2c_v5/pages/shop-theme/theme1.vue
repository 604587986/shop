<template>
  <div id="shop-theme-1">
    <en-banner :banners="shop.shop_banner"/>
  </div>
</template>

<script>
  import mixin from './themeMixin'
  export default {
    name: 'shop-theme-1',
    mixins: [mixin]
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
