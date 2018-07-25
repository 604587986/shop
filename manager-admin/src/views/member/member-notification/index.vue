<template>
  <keep-alive :include="cachedViews">
    <router-view></router-view>
  </keep-alive>
</template>

<script>
  export default {
    name: 'memberNotification',
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
