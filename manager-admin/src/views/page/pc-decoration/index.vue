<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
  export default {
    name: 'pcDecoration',
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      }
    }
  }
</script>
