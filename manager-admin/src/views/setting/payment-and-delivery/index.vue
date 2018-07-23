<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
  export default {
    name: 'paymentAndDelivery',
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
