<template>
  <div id="my-performance">
    <div class="member-nav">
      <ul class="member-nav-list">
        <li><nuxt-link to="./my-performance">与我相关的订单</nuxt-link></li>
        <li><nuxt-link to="./my-performance-refund">与我相关的退货单</nuxt-link></li>
        <li><nuxt-link to="./my-performance-history">我的历史业绩</nuxt-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'my-performance'
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
