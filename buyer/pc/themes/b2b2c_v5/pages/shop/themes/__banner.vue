<template>
  <el-carousel height="500px" class="banner-container">
    <el-carousel-item
      v-for="banner in banners"
      :key="banner.id"
    >
      <nuxt-link :to="banner.link">
        <img :src="banner.image" class="banner-img">
      </nuxt-link>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  import Vue from 'vue'
  import { Carousel, CarouselItem } from 'element-ui'
  Vue.use(Carousel)
  Vue.use(CarouselItem)
  export default {
    name: 'shop-banner',
    props: ['banners']
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .banner-container {
    /deep/ .el-carousel__arrow--left {
      left: 100px;
    }
    /deep/ .el-carousel__arrow--right {
      right: 100px;
    }
    .banner-img {
      width: 100%;
      height: 100%;
    }
  }
</style>
