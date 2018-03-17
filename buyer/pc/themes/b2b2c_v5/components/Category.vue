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
      /** 如果为首页，总是展开 */
      always_unfold() {
        return this.$route.path === '/'
      }
    },
    methods: {
      /** 鼠标移入 */
      handleCategoryMouseover() {
        if (this.always_unfold) return
        this.unfold = true
      },
      /** 鼠标移出 */
      handleCategoryMouseout() {
        if (this.always_unfold) return
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
