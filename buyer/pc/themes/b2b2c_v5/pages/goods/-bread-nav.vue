<template>
  <div id="bread-nav">
    <div class="bread-nav-container w">
      <span class="left-nav">
        <nuxt-link to="/">首页</nuxt-link>
        &gt;
        <nuxt-link :to="'/goods?category=' + goods.category_id">{{ goods.category_name }}</nuxt-link>
        &gt;
        <a href="javascript:;">{{ goods.goods_name }}</a>
      </span>
      <span>商品编码：{{ goods.sn }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "bread-nav",
    props: ['goods']
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .bread-nav-container {
    display: flex;
    justify-content: space-between;
    padding: 30px 0;
    color: #333333;
    font-weight: 400;
  }
  .left-nav {
    a:last-child {
      font-family: serif;
    }
  }
</style>
