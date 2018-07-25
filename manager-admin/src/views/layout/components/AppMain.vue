<template>
  <section class="app-main" style="min-height: 100%; padding: 10px; position: relative">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'AppMain'
  }
</script>

<style scoped>
  .app-main {
    /*84 = navbar + tags-view = 50 +34 */
    min-height: calc(100vh - 84px);
    position: relative;
    overflow: hidden;
  }
  /deep/ .container {
    padding: 10px;
    background-color: #fff;
  }
</style>
