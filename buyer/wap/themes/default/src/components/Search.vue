<template>
  <div class="search-container" :style="{backgroundColor: backgroundColor}">
    <div class="search-bar"></div>
    <div class="search-main"></div>
  </div>
</template>

<script>
  export default {
    name: 'Search',
    data() {
      return {
        backgroundColor: `rgba(201, 21, 35, 0)`
      }
    },
    created() {
      window.addEventListener('scroll', () => {
        const sy = window.scrollY
        if (sy >= 100) {
          this.backgroundColor = `rgba(201, 21, 35, 0.8)`
        } else {
          this.backgroundColor = `rgba(201, 21, 35, ${sy / 100})`
        }
      })
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .search-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 40px;
    transition: background-color .2ms ease-in;
  }
  .search-bar {

  }
</style>
