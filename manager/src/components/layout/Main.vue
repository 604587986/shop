<template>
  <transition name="el-fade-in-linear">
    <div class="main-container" :style="mainWidth">
      <div class="inner-main-container">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'LayoutMain',
    computed: {
      mainWidth() {
        return this.$store.state.layout.mainWidth
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../../styles/mixin";

  .main-container {
    position: fixed;
    top: (50px + 50px);
    left: 200px;
    overflow: scroll;
    width: calc(100% - 200px);
    height: calc(100% - 50px - 50px);
    @include transition(all ease-out .2s);

    .inner-main-container {
      margin: 10px;
      width: calc(100% - 20px);
      height: calc(100% - 20px);
    }
  }
</style>
