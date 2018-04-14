<template>
  <div id="checkout">
    <div class="checkout-header">
      <div class="w">
        <div class="logo"><en-logo/></div>
        <en-cart-step :step="1"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'checkout-index'
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../../assets/styles/checkout";
</style>
