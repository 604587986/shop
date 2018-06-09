<template>
  <div id="goods-info" class="goods-info">
    <div class="pro-name bottom-border" :title="goods.goods_id">
      <h1>{{ goods.goods_name }}</h1>
    </div>
    <div class="pro-details">
      <div class="pro-list">
        <div class="pro-title">价格</div>
        <div class="pro-content price">
          <span>￥</span>
          <strong>{{ goods.price | unitPrice }}</strong>
        </div>
      </div>
      <div class="pro-list">
        <div class="pro-title">温馨提示</div>
        <div class="pro-content">本商品无质量问题不支持退换货</div>
      </div>
    </div>
    <div class="pro-list buy-num">
      <div class="pro-title">购买数量</div>
      <div class="pro-content">
        <div class="count-num">
          <a href="javascript:;" @click="handleBuyNumChanged('-')" class="oper-num down" :class="[buyNum < 2 && 'not-oper']"></a>
          <span class="num">
            <input type="number" v-model.number="buyNum">
          </span>
          <a href="javascript:;" @click="handleBuyNumChanged('+')" class="oper-num up"></a>
        </div>
        <span style="margin-left: 15px">仅剩 {{ goods.quantity }} 件，抓紧时间购买哦！</span>
      </div>
    </div>
    <div class="buy-btns">
      <button type="button" class="buy-btn buy"></button>
      <button type="button" class="buy-btn add"></button>
    </div>
  </div>
</template>

<script>
  /**
   * 商品信息模块
   * 包括商品名称、商品价格、购买数量、加入购物车等等
   */
  import * as API_Goods from '@/api/goods'
  export default {
    name: 'goods-info',
    props: ['goods'],
    data() {
      return {
        buyNum: 1,
        skuMap: new Map(),
        specList: []
      }
    },
    mounted() {
      API_Goods.getGoodsSkus(this.goods.goods_id).then(response => {
        const specMap = new Map()
        response.forEach((sku, index) => {
          const { spec_list } = sku
          const spec_value_ids = []
          const spec_values = []
          spec_list.forEach((spec, index) => {
            spec_values.push(spec.spec_value)
            spec_value_ids.push(spec.spec_value_id)
            const _spec = JSON.parse(JSON.stringify(spec))
            const _specs = specMap.get(spec.spec_id) || []
            if (!_specs[0]) {
              specMap.set(spec.spec_id, [_spec])
            } else if (_specs.findIndex(item => item.spec_value_id === _spec.spec_value_id) === -1) {
              _specs.push(_spec)
            }
          })
          console.log(spec_values.join(' - '))
          // console.log(spec_value_ids.join('-'))
          this.skuMap.set(spec_value_ids.join('-'), sku)
        })
        specMap.forEach((value, key, map) => {
          this.specList.push(value)
        })
        console.log('skuMap: ', this.skuMap)
        console.log('specMap: ', specMap)
        console.log('skuList: ', response)
      })
    },
    methods: {
      /** 购买数量增加减少 */
      handleBuyNumChanged(symbol) {
        const isAdd = symbol === '+'
        if (isAdd) {
          this.buyNum += 1
        } else {
          if (this.buyNum < 2) {
            this.$message.error('不能再少啦！')
            return false
          }
          this.buyNum -= 1
        }
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .pro-name, .pro-details {
    background: url(../../assets/images/icons-goods.png) repeat-x;
    background-position: 0 bottom;
  }
  .goods-info {
    padding-left: 30px;
    padding-right: 20px;
    .price {
      span { font-size: 16px }
      strong { font-size: 30px }
    }
    .pro-name {
      h1 {
        font: normal 16px/24px "microsoft yahei";
        color: #333;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        padding-bottom: 20px;
      }
    }
    .pro-details {
      padding: 15px 0 10px 0;
      color: #666666;
      position: relative;
    }
    .buy-num {
      padding-top: 20px;
      .pro-content { display: flex }
    }
    .count-num {
      display: flex;
      align-items: center;
    }
    .num {
      border-top: 1px solid #ededed;
      border-bottom: 1px solid #ededed;
      height: 19px;
      padding-top: 1px;
      background: #fff;
      display: block;
      input {
        border: 0 none;
        display: block;
        width: 34px;
        height: 18px;
        line-height: 18px;
        text-align: center;
      }
    }
    .oper-num {
      display: block;
      align-items: center;
      background: url(../../assets/images/icons-goods.png) no-repeat;
      width: 21px;
      height: 22px;
      &.down {
        background-position: right -69px;
      }
      &.up {
        background-position: right -47px;
      }
      &:hover { background-position-x: -178px }
      &.not-oper { cursor: not-allowed }
    }
    .buy-btns {
      display: flex;
      .buy-btn {
        display: block;
        width: 160px;
        height: 45px;
        background: url(../../assets/images/icons-goods.png) no-repeat;
        border: none;
        padding-top: 0;
        padding-bottom: 0;
        cursor: pointer;
      }
      .buy {
        background-position: right -551px;
        margin-right: 8px;
        &:hover { background-position: right -459px }
      }
      .add {
        background-position: right -597px;
        &:hover { background-position: right -505px }
      }
    }
  }
  .pro-list {
    display: flex;
    margin-bottom: 5px;
  }
  .pro-title {
    width: 60px;
    padding-right: 17px;
    height: 33px;
    line-height: 33px;
  }
  .pro-content {
    width: 307px;
    min-height: 33px;
    line-height: 33px;
  }
</style>
