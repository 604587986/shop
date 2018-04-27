<template>
  <div id="goods-zoom" class="goods-zoom-container">
    <div class="swiper-container-zoom">
      <div class="swiper-wrapper">
        <img v-for="image in images" :src="image.small" :key="image.small" class="swiper-slide">
      </div>
    </div>
    <div class="zoom-box">
      <pic-zoom :url="current.small" :big-url="current.big" style="width: 400px;height: 400px"></pic-zoom>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import { PicZoom } from '@/components'
  export default {
    name: "goods-zoom",
    props: ['images', 'curImg'],
    components: { PicZoom },
    computed: {
      current() {
        return this.images[0]
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initZoomSwiper()
      })
    },
    watch: {
      curImg(newVal, oldVal) {
        this.current = { small: newVal, big: newVal }
      }
    },
    methods: {
      initZoomSwiper() {
        this.zoomSwiper = new Swiper('.swiper-container-zoom', {
          direction : 'vertical',
          slidesPerView: 5
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .goods-zoom-container {
    display: flex;
    width: 480px;
    height: 400px;
    border: 1px solid #ededed;
  }
  .swiper-container-zoom {
    overflow: hidden;
    width: 80px;
    border-right: 1px solid #ededed;
    .swiper-slide {
      width: 80px;
      height: 80px;
      cursor: pointer;
    }
  }
  .zoom-box {
    width: 400px;
    height: 400px;
  }
</style>
