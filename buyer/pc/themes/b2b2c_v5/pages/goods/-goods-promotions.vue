<template>
  <div v-if="promotions" class="promotions-container">
    <div class="pro-list promotions-box" id="promotions-box">
      <div class="pro-title">促销信息</div>
      <div class="pro-content prom">
        <template v-for="(prom, index) in promotions">
          <!--满减-->
          <div :key="index" v-if="prom.full_discount_vo" class="prom-item">
            <em class="hl_red_bg">满减</em>
            <em class="hl_red">满{{ prom.full_discount_vo.full_money }}元，立减现金 <span class="price">{{ prom.full_discount_vo.minus_value }}</span>元</em>
            <!--<nuxt-link v-if="index === 0" :to="'/shop/'+ prom.full_discount_vo.seller_id + '/promotions'" target="blank"> 详情>></nuxt-link>&nbsp;-->
          </div>
          <!--单品立减-->
          <div :key="index" v-if="prom.minus_vo" class="prom-item">
            <em class="hl_red_bg">单品立减</em>
            <em class="hl_red">单件立减现金<span class="price">{{ prom.minus_vo.single_reduction_value }}</span>元</em>
          </div>
          <!--第二件半价-->
          <div :key="index" v-if="prom.half_price_vo" class="prom-item">
            <em class="hl_red_bg">第二件半价</em>
            <em class="hl_red">第二件半价优惠</em>
          </div>
        </template>
      </div>
    </div>
    <div id="promotions-place" class="promotions-place"></div>
  </div>
</template>

<script>
  /**
   * 商品促销模块
   * 包含满减满赠、单品立减、第二件半价
   */
  import * as API_Promotions from '@/api/promotions'
  export default {
    name: 'goods-promotions',
    props: ['promotions'],
    watch: {
      promotions: function () {
        this.$nextTick(() => {
          const $proBox = document.getElementById('promotions-box')
          const $plaBox = document.getElementById('promotions-place')
          $plaBox.style.height = $proBox.offsetHeight + 'px'
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .promotions-container {
    position: relative;
  }
  .promotions-box {
    background: url("../../assets/images/background-price.png") 0 -12px repeat-x #efefef;
    padding-bottom: 5px;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
  }
  .promotions-place {
    position: relative;
    z-index: 1;
  }
  .pro-content {
    em.hl_red_bg {
      padding: 2px 3px;
      color: #df3033;
      border: 1px solid #df3033;
      margin-right: 4px;
    }
    .prom-item:not(:first-child) {
      display: inline-block;
      .hl_red {
        display: none;
      }
    }
  }
  .promotions-box:hover .prom-item {
    display: block;
    .hl_red { display: inline-block }
  }
</style>
