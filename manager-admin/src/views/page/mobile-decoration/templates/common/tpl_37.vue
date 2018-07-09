<template>
  <div class="floor-layout tpl-37">
    <div class="layout-main">
      <div class="layout-item">
        <div class="goods-item">
          <div class="image-goods">
            <img :src="data.blockList[0].block_value.goods_image">
          </div>
          <div class="name-goods">{{ data.blockList[0].block_value.goods_name }}</div>
          <div class="price-goods">{{ data.blockList[0].block_value.goods_price | formatPrice }}</div>
        </div>
        <floor-mask @click="onClickMask(0)"/>
      </div>
      <div class="layout-item">
        <div class="goods-item">
          <div class="image-goods">
            <img :src="data.blockList[1].block_value.goods_image">
          </div>
          <div class="name-goods">{{ data.blockList[1].block_value.goods_name }}</div>
          <div class="price-goods">{{ data.blockList[1].block_value.goods_price | formatPrice }}</div>
        </div>
        <floor-mask @click="onClickMask(1)"/>
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from '../mixin'

  export default {
    name: 'tpl_37',
    mixins: [mixin],
    title: '商品模块',
    dataTpl: {
      tpl_id: 37,
      blockList: [
        { block_type: 'GOODS', block_value: '', block_opt: '' },
        { block_type: 'GOODS', block_value: '', block_opt: '' }
      ]
    },
    filters: {
      formatPrice(price) {
        if (!price) return ''
        return '￥' + String(Number(price).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
