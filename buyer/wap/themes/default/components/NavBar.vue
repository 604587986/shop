<template>
  <div class="classify">
    <van-nav-bar
      left-arrow
      @click-left="$router.go(-1)"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </div>
</template>

<script>
  export default {
    name: 'NavBar'
  }
</script>

<style type="text/scss" lang="scss" scoped>
 .classify {
   /deep/ .van-nav-bar__left .van-nav-bar__arrow {
     color: #666;
   }
 }
</style>
