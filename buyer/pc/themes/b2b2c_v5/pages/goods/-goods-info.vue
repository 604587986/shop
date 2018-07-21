<template>
  <div id="goods-info" class="goods-info">
    <div class="pro-name bottom-border" :title="goodsInfo.goods_name">
      <h1>{{ goodsInfo.goods_name }}</h1>
    </div>
    <div class="pro-details">
      <goods-groupbuy-seckill :promotions="promotions"/>
      <div class="price-box">
        <div class="pro-list">
          <div class="pro-title">价格</div>
          <!--如果有大于1个的sku，则显示价格区间-->
          <div v-if="priceRange" class="pro-content price">
            <span>￥</span>
            <strong>{{ priceRange[0] | unitPrice }}</strong>
            <template v-if="priceRange[1]"> ~ <strong>{{ priceRange[1] | unitPrice }}</strong></template>
          </div>
          <div v-else class="pro-content price">
            <span>￥</span>
            <strong>{{ goodsInfo.price | unitPrice }}</strong>
          </div>
        </div>
        <goods-promotions :promotions="promotions"/>
      </div>
      <goods-coupons :shop-id="goods.seller_id"/>
    </div>
    <div v-if="specList && specList.length" :class="['pro-spec', unselectedSku && 'error']">
      <div v-for="(spec, specIndex) in specList" :key="spec.spec_id" class="pro-list">
        <div class="pro-title">{{ spec.spec_name }}</div>
        <div class="pro-content">
          <button
            v-for="spec_val in spec.valueList"
            :key="spec_val.spec_value_id"
            :class="['spec-val-btn', spec_val.selected && 'selected', spec.spec_type === 1 && 'spec-image']"
            @click="handleClickSpec(spec, specIndex, spec_val)"
            type="button"
          >
            <img v-if="spec.spec_type === 1" :src="spec_val['spec_value_img'].thumbnail">
            <span class="spec-text">{{ spec_val.spec_value }}</span>
            <i class="icon-spec-selected"></i>
          </button>
        </div>
      </div>
      <div v-if="unselectedSku" class="pro-list error-msg">
        <div class="pro-title"></div>
        <div class="pro-content">请选择商品规格！</div>
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
        <span style="margin-left: 15px">仅剩 {{ goodsInfo.quantity }} 件，抓紧时间购买哦！</span>
      </div>
    </div>
    <div class="buy-btns">
      <button type="button" class="buy-btn buy" @click="handleBuyNow"></button>
      <button type="button" class="buy-btn add" @click="handleAddToCart"></button>
    </div>
  </div>
</template>

<script>
  /**
   * 商品信息模块
   * 包括商品名称、商品价格、购买数量、加入购物车
   * 包括优惠券
   * 包括促销信息
   * 包括限时抢购
   * 包括团购活动
   */
  import Vue from 'vue'
  import * as API_Goods from '@/api/goods'
  import * as API_Trade from '@/api/trade'
  import Storage from '@/utils/storage'
  import GoodsCoupons from './-goods-coupons'
  import GoodsPromotions from './-goods-promotions'
  import GoodsGroupbuySeckill from './-goods-groupbuy-seckill'
  import GoodsPromBar from './-goods-prom-bar'
  Vue.component('goods-prom-bar', GoodsPromBar)
  export default {
    name: 'goods-info',
    props: ['goods', 'promotions'],
    components: { GoodsCoupons, GoodsPromotions, GoodsGroupbuySeckill },
    data() {
      return {
        goodsInfo: JSON.parse(JSON.stringify(this.goods)),
        // 购买数量
        buyNum: 1,
        // skuMap
        skuMap: new Map(),
        // 规格列表
        specList: [],
        // 被选中规格
        selectedSpec: [],
        // 被选中sku
        selectedSku: '',
        // 没有选中sku，初始化为false
        unselectedSku: false,
        // 有规格的商品价格区间
        priceRange: ''
      }
    },
    mounted() {
      API_Goods.getGoodsSkus(this.goods.goods_id).then(response => {
        const specList = []
        const priceList = []
        response.forEach((sku, skuIndex) => {
          const { spec_list, price } = sku
          priceList.push(price)
          const spec_value_ids = []
          if (spec_list) {
            spec_list.forEach((spec, specIndex) => {
              const _specIndex = specList.findIndex(_spec => _spec['spec_id'] === spec.spec_id)
              const _spec = {
                spec_id: spec.spec_id,
                spec_name: spec.spec_name,
                spec_type: spec.spec_type
              }
              const _value = {
                spec_value: spec.spec_value,
                spec_value_id: spec.spec_value_id,
                spec_value_img: {
                  original: spec.spec_image,
                  thumbnail: spec.thumbnail
                }
              }
              spec_value_ids.push(spec.spec_value_id)
              if(_specIndex === -1){
                specList.push({..._spec, valueList: [{..._value}]})
              }else if(specList[_specIndex]['valueList'].findIndex(_value => _value['spec_value_id'] === spec['spec_value_id']) === -1) {
                specList[_specIndex]['valueList'].push({ ..._value })
              }
            })
            this.skuMap.set(spec_value_ids.join('-'), sku)
          } else {
            this.skuMap.set('no_spec', sku)
          }
        })
        // 如果价格区间大于1个
        if (priceList.length > 1) {
          const min = Math.min(...priceList)
          const max = Math.max(...priceList)
          if (min === max) {
            this.priceRange = [max]
          } else {
            this.priceRange = [min, max]
          }
        }
        this.specList = specList
        // 如果有sku信息，初始化已选规格
        if (this.$route.query.sku_id) {
          this.initSpec()
        }
        // 如果没有规格，把商品第一个sku给已选择sku
        if (!specList.length) {
          this.selectedSku = this.skuMap.get('no_spec')
        }
      })
    },
    methods: {
      /** 初始化规格 */
      initSpec() {
        let { sku_id } = this.$route.query
        let selectedSpecs = ''
        if (sku_id) {
          sku_id = Number(sku_id)
          this.skuMap.forEach((value, key) => {
            if (value.sku_id === sku_id) {
              selectedSpecs = key.split('-')
            }
          })
        }
        const _selectedSpecVals = []
        this.specList.forEach((spec, specIndex)=> {
          if (Array.isArray(spec.valueList)) {
            spec.valueList.forEach((val, specValIndex) => {
              if (selectedSpecs) {
                const spec_value_id = val.spec_value_id
                if (selectedSpecs.includes(String(spec_value_id))) {
                  val.selected = true
                  this.selectedSpec[specValIndex] = val.spec_value_id
                  _selectedSpecVals.push(val.spec_value_id)
                }
              } else if (specValIndex === 0) {
                val.selected = true
                this.selectedSpec[specValIndex] = val.spec_value_id
                _selectedSpecVals.push(val.spec_value_id)
              }
            })
          }
        })
        this.handleSelectedSku()
      },
      /** 选择规格 */
      handleClickSpec(spec, specIndex, spec_val) {
        if (spec.spec_type === 1 ) {
          this.$emit('spec-img-change', JSON.parse(JSON.stringify(spec_val.spec_value_img)))
        }
        if (spec_val.selected) return
        spec.valueList.map(item => {
          item.selected = item.spec_value_id === spec_val.spec_value_id
          return item
        })
        this.$set(this.specList, specIndex, spec)
        this.selectedSpec[specIndex] = spec_val.spec_value_id
        this.handleSelectedSku()
      },
      /** 购买数量增加减少 */
      handleBuyNumChanged(symbol) {
        if (symbol === '+') {
          const { quantity } = this.selectedSku
          if (quantity === 0) {
            this.$message.error('该规格暂时缺货！')
          } else if (this.buyNum >= quantity) {
            this.$message.error('超过最大库存！')
          } else {
            this.buyNum += 1
          }
        } else {
          if (this.buyNum < 2) {
            this.$message.error('不能再少啦！')
          } else {
            this.buyNum -= 1
          }
        }
      },
      /** 根据已选规格选出对应的sku */
      handleSelectedSku() {
        let sku
        if (this.selectedSpec.size !== 0) {
          const spec_vals = []
          this.selectedSpec.forEach(item => spec_vals.push(item))
          sku = this.skuMap.get(spec_vals.join('-'))
        } else {
          sku = this.skuMap.get('no_spec')
        }
        if (sku) {
          this.selectedSku = sku
          this.unselectedSku = false
          this.priceRange = ''
          this.goodsInfo = { ...this.goodsInfo, ...sku }
          this.buyNum = sku.quantity === 0 ? 0 : 1
        }
      },
      /** 立即购买 */
      handleBuyNow() {
        if (!this.isLogin()) return
        const { num } = this
        const { sku_id } = this.selectedSku
        API_Trade.buyNow(sku_id, num).then(response => {
          this.$store.dispatch('cart/getCartDataAction')
          this.$router.push('/checkout')
        })
      },
      /** 加入购物车 */
      handleAddToCart() {
        if (!this.isLogin()) return
        const { num } = this
        const { sku_id } = this.selectedSku
        API_Trade.addToCart(sku_id, num).then(response => {
          this.$store.dispatch('cart/getCartDataAction')
          this.$confirm('加入购物车成功！要去看看吗？', () => {
            this.$router.push({ path: '/cart' })
          })
        })
      },
      /** 是否已登录 */
      isLogin() {
        if (!this.selectedSku) {
          this.$message.error('请选择商品规格！')
          this.unselectedSku = true
          return false
        }
        if (!Storage.getItem('user')) {
          this.$confirm('您还未登录，要现在去登录吗？', () => {
            this.$router.push({ path: '/login', query: { forward: `${this.$route.path}?sku_id=${this.selectedSku.sku_id}`} })
          })
          return false
        } else {
          return true
        }
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .pro-name, .pro-details {
    background: url(../../assets/images/icons-goods.png) repeat-x 0 bottom;
    padding-bottom: 15px;
  }
  .goods-info {
    padding-left: 20px;
    padding-right: 20px;
    .pro-name {
      h1 {
        font: normal 16px/24px "microsoft yahei";
        color: #333;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        padding-left: 10px;
      }
    }
    .pro-details {
      padding: 10px 0;
      color: #666666;
      position: relative;
    }
    .buy-num {
      padding-top: 5px;
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
  /deep/ {
    .pro-list {
      display: flex;
      margin-bottom: 5px;
      padding-left: 10px;
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
      &.price {
        span { font-size: 16px }
        strong { font-size: 22px }
      }
    }
  }
  .pro-spec {
    position: relative;
    margin-top: 10px;
    &.error {
      &:before {
        position: absolute;
        content: '';
        width: 104%;
        height: 104%;
        border: 2px solid red;
        margin-left: -2%;
        margin-top: -2%;
      }
      .error-msg {
        color: red
      }
    }
  }
  .spec-val-btn {
    position: relative;
    border: 2px solid #e2e1e3;
    color: black;
    padding: 10px 15px;
    margin: 0 5px 5px 0;
    cursor: pointer;
    background-color: #fff;
    &.selected {
      border-color: #f42424;
      .icon-spec-selected{ display: block }
    }
    &.spec-image {
      width: 50px;
      height: 50px;
      margin-bottom: 25px;
      background-color: #fff;
      img { width: 100%; height: 100% }
      .spec-text {
        position: absolute;
        width: 100%;
        bottom: -20px;
        left: 50%;
        margin-left: -23px;
      }
    }
    .icon-spec-selected {
      position: absolute;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJUExURUxpcf8AN////7f4NBoAAAABdFJOUwBA5thmAAAAMUlEQVQI103MAQ4AMAQEQev/j66i6YrEXIKIX9jY2NjYyDmhZnlCo5rdyWvebfYDVAcSmABbA7WD+QAAAABJRU5ErkJggg==)  ;
      right: 0;
      bottom: 0;
      display: none;
      width: 12px;
      height: 12px;
    }
  }
  .price-box {
    position: relative;
    background-color: #f3f3f3;
  }
</style>
