<template>
  <el-carousel height="500px" class="banner-container">
    <el-carousel-item
      v-for="silde in sildes"
      :key="silde.silde_id"
    >
      <nuxt-link :to="silde.silde_url">
        <img :src="silde.img" class="banner-img">
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
    name: 'shop-sildes',
    props: ['sildes']
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
