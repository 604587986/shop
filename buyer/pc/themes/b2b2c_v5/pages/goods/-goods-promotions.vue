<template>
  <div class="pro-list">
    <div class="pro-title">促销信息</div>
    <div class="pro-content">
      <div class="parent_tips_prom">
        <div class="prom-item" data-code="18">
          <em class="hl_red_bg">满减</em>
          <em class="hl_red">满100元，立减现金10元</em>
          <a href="javascript:;" target="blank">详情>></a>&nbsp;
        </div>
        <!--<div class="tips_prom" style="width: 295px;">
          <p>1111</p>
        </div>
        <div class="hover-section-one"><em class="hl_red_bg">立减</em></div>
        <div class="hover-section-two">
          <div class="pro-list clearfix pro-activity">
            <div class="pro-content">
              <div class="parent_tips_prom">
                <div class="prom-item" data-code="18">
                  <em class="hl_red_bg">立减</em>
                  <em class="hl_red">下单立减10元</em>
                </div>
                <div class="tips_prom" style="width: 295px;">
                  <p>单品立减1</p>
                </div>
              </div>
            </div>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * 商品促销模块
   * 包含满减满赠、单品立减、第二件半价等
   */
  import * as API_Promotions from '@/api/promotions'
  export default {
    name: 'goods-promotions',
    props: ['goods-id'],
    mounted() {
      API_Promotions.getGoodsPromotions(this.goodsId).then(response => {
        console.log(response)
      })
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .pro-content em.hl_red_bg,.hover-section-one em.hl_red_bg {
    padding: 2px 3px;
    color: #df3033;
    border: 1px solid #df3033;
    margin-right: 2px;
  }
</style>
