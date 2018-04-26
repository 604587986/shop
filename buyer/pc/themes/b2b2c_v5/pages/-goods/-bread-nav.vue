<template>
  <div id="bread-nav">
    <div class="bread-nav-container w">
      <span class="left-nav">
        <nuxt-link to="/">首页</nuxt-link>
        &gt;
        <nuxt-link to="/notebook">笔记本</nuxt-link>
        &gt;
        <nuxt-link to="/">戴尔DELL INS15-7567湛黑版15.6英寸笔记本电脑i7-7700 8G 1T+128G固态GTX1050t</nuxt-link>
      </span>
      <span>商品编码：{{ goodsSn }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "bread-nav",
    props: ['goodsSn']
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
