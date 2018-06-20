<template>
  <div id="goods-info" class="goods-info">
    <div class="pro-name bottom-border" :title="goodsInfo.goods_name">
      <h1>{{ goodsInfo.goods_name }}</h1>
    </div>
    <div class="pro-details">
      <div class="pro-list">
        <div class="pro-title">价格</div>
        <div class="pro-content price">
          <span>￥</span>
          <strong>{{ goodsInfo.price | unitPrice }}</strong>
        </div>
      </div>
      <div class="pro-list">
        <div class="pro-title">温馨提示</div>
        <div class="pro-content">本商品无质量问题不支持退换货</div>
      </div>
    </div>
    <div class="pro-spec">
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
   * 包括商品名称、商品价格、购买数量、加入购物车等等
   */
  import * as API_Goods from '@/api/goods'
  import * as API_Trade from '@/api/trade'
  export default {
    name: 'goods-info',
    props: ['goods'],
    data() {
      return {
        goodsInfo: JSON.parse(JSON.stringify(this.goods)),
        // 购买数量
        buyNum: 1,
        // skuMap
        skuMap: new Map(),
        // 规格列表
        specList: [],
        // 被选中规格Map
        selectedSpecMap: new Map(),
        // 被选中sku
        selectedSku: ''
      }
    },
    mounted() {
      API_Goods.getGoodsSkus(this.goods.goods_id).then(response => {
        const specList = []
        response.forEach((sku, skuIndex) => {
          const { spec_list } = sku
          const spec_value_ids = []
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
        })
        this.specList = specList
        // 初始化规格
        this.initSpec()
      })
    },
    methods: {
      /** 初始化规格 */
      initSpec() {
        const _selectedSpecVals = []
        this.specList.forEach(spec => {
          spec.valueList.forEach((val, index) => {
            if (index === 0) {
              val.selected = true
              this.selectedSpecMap.set(spec.spec_id, val.spec_value_id)
              _selectedSpecVals.push(val.spec_value_id)
            }
          })
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
        this.selectedSpecMap.set(spec.spec_id, spec_val.spec_value_id)
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
        const spec_vals = []
        this.selectedSpecMap.forEach((value, key, map) => spec_vals.push(value))
        const sku = this.skuMap.get(spec_vals.join('-'))
        this.selectedSku = sku
        this.goodsInfo = { ...this.goodsInfo, ...sku }
        this.buyNum = sku.quantity === 0 ? 0 : 1
      },
      /** 立即购买 */
      handleBuyNow() {},
      /** 加入购物车 */
      handleAddToCart() {
        const { num } = this
        const { sku_id } = this.selectedSku
        API_Trade.addToCart(sku_id, num).then(response => {
          this.$store.dispatch('cart/getCartDataAction')
          this.$confirm('加入购物车成功！要去看看吗？', () => {
            this.$router.push({ path: '/cart' })
          })
        })
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
  .pro-spec { margin-top: 10px }
  .spec-val-btn {
    position: relative;
    border: 2px solid #e2e1e3;
    color: black;
    padding: 10px 15px;
    margin: 0 5px 5px 0;
    cursor: pointer;
    &.selected {
      border-color: #f42424;
      .icon-spec-selected{ display: block }
    }
    &.spec-image {
      width: 50px;
      height: 50px;
      margin-bottom: 25px;
      img { width: 100%; height: 100% }
      .spec-text {
        position: absolute;
        bottom: -20px;
        left: 50%;
        margin-left: -12px;
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
</style>
