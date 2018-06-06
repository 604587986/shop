<template>
  <div class="container">
    <div class="focus-container">
      <div class="w">
        <index-banner/>
        <index-card/>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { IndexBanner, IndexCard } from '@/pages/-index'
  import * as API_Common from '@/api/common'
  export default {
    name: 'index',
    components: {
      IndexBanner,
      IndexCard
    },
    data() {
      return {
        /** 首页卡片tab x坐标 */
        card_news_tab_x: 0
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .focus-container {
    height: 500px;
    background-color: rgb(241, 241, 241);
    .w {
      position: relative;
    }
    .swiper-container {
      height: 100%;
    }
    /deep/ .swiper-pagination-index {
      position: relative;
      .custom-pagination-inner {
        display: block;
        position: absolute;
        z-index: 1;
        left: 50%;
        bottom: 20px;
        font-size: 0;
        padding: 4px 8px;
        border-radius: 12px;
        background-color: hsla(0, 0%, 100%, 0.4);
        .custom-pagination-btn {
          display: inline-block;
          margin-right: 10px;
          width: 12px;
          height: 12px;
          border-radius: 100%;
          background-color: #fff;
          cursor: pointer;
        }
        .custom-pagination-btn.__active__ {
          background-color: #f42424;
        }
        .custom-pagination-btn.__last__ {
          margin-right: 0;
        }
      }
    }
  }
</style>
