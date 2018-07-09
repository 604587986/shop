<template>
  <div id="index-banner">
    <no-ssr>
      <swiper :options="swiperOption">
        <swiper-slide v-for="(focus, index) in focusList" :key="index">
          <en-operation :opt="{type: focus.operation_type, value: focus.operation_param}">
            <img :src="focus.pic_url">
          </en-operation>
        </swiper-slide>
        <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
      </swiper>
    </no-ssr>
  </div>
</template>

<script>
  import * as API_Home from '@/api/home'
  import EnOperation from "@/components/Operation";
  export default {
    name: 'index-banner',
    components: {EnOperation},
    data() {
      return {
        focusList: [],
        swiperOption: {
          autoplay: true,
          loop: true,
          effect: 'fade',
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
            clickable: true
          }
        }
      }
    },
    mounted() {
      API_Home.getFocusPictures('WAP').then(response => {
        this.focusList = response
      })
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  #index-banner .swiper-slide {
    height: 180px;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
