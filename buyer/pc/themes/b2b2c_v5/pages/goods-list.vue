<template>
  <div id="goods-list"></div>
</template>

<script>
  export default {
    name: '',
    created() {
      console.log(this.$route.query.keyword)
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
