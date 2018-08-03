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
  import * as API_Shop from '@/api/shop'
  export default {
    name: 'shop-sildes',
    props: ['shopId'],
    data() {
      return {
        sildes: []
      }
    },
    mounted() {
      API_Shop.getShopSildes(this.shopId).then(response => { this.sildes = response })
    }
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
