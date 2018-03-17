<template>
  <div
    id="category"
    @mouseover="handleCategoryMouseover"
    @mouseout="handleCategoryMouseout"
  >
    <nuxt-link to="/goods-list" class="category-title">全部商品分类</nuxt-link>
    <div v-show="unfold" class="category-layer">

    </div>
  </div>
</template>

<script>
  export default {
    name: 'EnCategory',
    data() {
      return {
        unfold: this.$route.path === '/'
      }
    },
    computed: {
      always_show() {
        return this.$route.path === '/'
      }
    },
    methods: {
      handleCategoryMouseover() {
        if (this.always_show) return
        this.unfold = true
      },
      handleCategoryMouseout() {
        if (this.always_show) return
        this.unfold = false
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  #category {
    width: 240px;
    height: 40px;
    background-color: #ff2828;
    flex-shrink: 0;
    z-index: 10;
    .category-title {
      display: block;
      font-size: 18px;
      font-weight: bold;
      color: #fff;
      text-align: center;
      line-height: 40px;
    }
    .category-layer {
      height: 500px;
      background-color: rgba(0, 0, 0, .6);
    }
  }
</style>
