<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
  export default {
    name: 'mobileDecoration',
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      }
    }
  }
</script>
