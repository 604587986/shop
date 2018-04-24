<template>
  <div id="apply-shop">
    <apply-header/>
    <nuxt-child/>
  </div>
</template>

<script>
  import applyHeader from './apply/-apply-header'
  export default {
    name: 'apply',
    components: { applyHeader }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
