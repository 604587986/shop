<template>
  <div id="cart" style="background: #f5f5f5;padding-bottom: 20px">
    <div class="cart-header">
      <div class="w">
        <div class="logo"><en-logo/></div>
        <en-cart-step :step="1"/>
      </div>
    </div>
    <div class="cart-content" id="cart-content">
      <div class="w">
        <div class="list-header">
          <span class="checkbox select-all" @click="handleCheckAll">
            <a href="javascript:;" :class="['check', 'check-all', all_checked && 'checked']">
              <i class="iconfont ea-icon-check"></i>
            </a>全选
          </span>
          <span class="title">商品信息</span>
          <span class="price">单价（元）</span>
          <span class="num">数量</span>
          <span class="weight">重量（kg）</span>
          <span class="total">小计（元）</span>
          <span class="action">操作</span>
        </div>
        <div class="list-content">
          <div v-if="shopList && shopList.length > 0" class="">
            <div v-for="shop in shopList" :key="shop.shop_id" class="shop-item">
              <div class="shop-header">
                <a href="javascript:;" :class="['check', shop.checked && 'checked']" @click="handleCheckShop(shop)">
                  <i class="iconfont ea-icon-check"></i>
                </a>
                <nuxt-link :to="'/shop/' + shop.shop_id" class="shop-name">{{ shop.shop_name }}</nuxt-link>
              </div>
              <div class="shop-body">
                <div v-for="sku in shop.skuList" :key="sku.sku_id" class="sku-item">
                  <div class="item clearfix">
                    <a href="javascript:;" :class="['check', sku.checked && 'checked']" @click="handleCheckSku(sku)">
                      <i class="iconfont ea-icon-check"></i>
                    </a>
                    <nuxt-link :to="'/goods/' + sku.sku_id" class="sku-pic">
                      <img :src="sku.goods_image" :alt="sku.goods_name">
                    </nuxt-link>
                    <nuxt-link :to="'/goods/' + sku.sku_id" class="sku-name">
                      {{ sku.goods_name }}
                    </nuxt-link>
                    <div class="sku-price">{{ sku.price | unitPrice }}</div>
                    <div class="sku-num">
                      <div class="num-action clearfix">
                        <a :class="['oper', sku.num < 2 && 'unable']" href="javascript:;" @click="handleUpdateSkuNum(sku, '-')">−</a>
                        <input
                          class="input"
                          type="number"
                          :value="sku.num"
                          :title="sku.num"
                          @focus="handleSkuNumFocus(sku)"
                          @change="handleSkuNumChanged($event, sku)"
                        >
                        <a class="oper" href="javascript:;" @click="handleUpdateSkuNum(sku, '+')">+</a>
                      </div>
                    </div>
                    <div class="sku-weight">
                      {{ (sku.num * sku.weight).toFixed(2) }}
                    </div>
                    <div class="sku-total">
                      {{ sku.price * sku.num | unitPrice }}
                    </div>
                    <div class="sku-action">
                      <i class="iconfont ea-icon-delete" @click="handleDelete(sku)"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="shop-footer">
                <div class="shop-footer-item">
                  重量：<span>4.90kg</span>
                </div>
                <div class="shop-footer-item price">
                  <em>￥</em>
                  <span>1622.00</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else style="background: #fff">
            <div class="empty-cart">
              <h1>您的购物车中暂无商品</h1>
              <nuxt-link to="/">挑选心爱的商品</nuxt-link>
              <nuxt-link to="/member/order">查看我的订单</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="['cart-checkbar', check_bar_fiexd_top && 'fiexd-top', check_bar_fiexd_bottom && 'fiexd-bottom']" id="check-bar">
      <div class="check-bar">
        <div class="w">
          <div class="check-bar-left">
            <span class="select-all" @click="handleCheckAll">
              <a href="javascript:;" :class="['check', 'check-all', all_checked && 'checked']">
                  <i class="iconfont ea-icon-check"></i>
                </a>
                <span>全选（共<b>{{ allCount }}</b>）件</span>
            </span>
            <em>|</em>
            <a href="javascript:;" class="check-tool-a" @click="handleBatchDelete">批量删除</a>
            <em>|</em>
            <a href="javascript:;" class="check-tool-a" @click="handleCleanCart">清空购物车</a>
          </div>
          <div class="check-bar-right">
            <span>已选商品<b style="color: #ff5e5e; margin: 0 2px">{{ checkedCount }}</b>件</span>
            <em>|</em>
            <span>合计：<b class="price">￥<i>250.00</i></b></span>
            <a href="javascript:;" class="check-btn" @click="handleCheckout">去结算</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import * as API_Cart from '@/api/cart'
  import * as regExp from '@/utils/RegExp'
  export default {
    name: 'cart',
    layout: 'full',
    data() {
      return {
        /** 结算栏相对顶部高度 */
        check_bar_top: 0,
        /** 是否固定到顶部 */
        check_bar_fiexd_top: false,
        /** 是否固定到底部 */
        check_bar_fiexd_bottom: false,
        /** 当前操作的输入框的值【变化之前】 */
        current_input_value: 1
      }
    },
    mounted() {
      this.$nextTick(() => {
        /** 获内容区域jQuery对象 */
        this.$cartContent = $('#cart-content')
        /** 添加滚动事件监听 */
        window.addEventListener('scroll', this.countCheckBarFiexd)
        /** 获取购物车数据 */
        this.getCartData()
      })
    },
    computed: {
      ...mapGetters({
        shopList: 'cart/shopList',
        skuList: 'cart/skuList',
        checkedCount: 'cart/checkedCount',
        allCount: 'cart/allCount'
      }),
      /** 是否全部选中 */
      all_checked() {
        return !!this.checkedCount && this.checkedCount === this.allCount
      }
    },
    watch: {
      /** 当数据变化时，重新计算结算栏相对顶部距离。并且计算是应该固定在顶部，还是固定到底部，或者是位置不变 */
      skuList() {
        // 计算当前结算栏相对顶部距离【计算结算栏以上的高度】
        this.$nextTick(() => {
          // 31: 顶部快捷导航高度 -|- 100: logo区域高度 -|- 20 + 20: 内容margin-top + 内容padding-bottom
          this.check_bar_top = 31 + (this.$cartContent.height() + 20 + 20) + 100
          this.countCheckBarFiexd()
        })
      }
    },
    methods: {
      /** 勾选、取消勾选商品 */
      handleCheckSku(sku) {
        this.checkSkuItem({ sku_id: sku.sku_id, checked: sku.checked ? 0 : 1 })
      },
      /** 勾选、取消勾选店铺 */
      handleCheckShop(shop) {
        this.checkShopSku({ shop_id: shop.shop_id, checked: shop.checked ? 0 : 1 })
      },
      /** 全选、取消全选 */
      handleCheckAll() {
        this.checkAll(this.all_checked ? 0 : 1)
      },
      /** 更新商品数量 */
      handleUpdateSkuNum(sku, symbol) {
        if (symbol === '-' && sku.num < 2) return
        let _num = symbol === '+' ? sku.num + 1 : sku.num - 1
        this.updateSkuNum({sku_id: sku.sku_id, num: _num})
      },
      /** 输入框被焦点【记录当前值】 */
      handleSkuNumFocus(sku) {
        this.current_input_value = sku.num
      },
      /** 输入框值发生改变 */
      handleSkuNumChanged(event, sku) {
        const _value = event.target.value
        if (!regExp.integer.test(_value)) {
          this.$message.error('您的输入不合法！')
          event.target.value = this.current_input_value
          return
        }
        if (Number(_value) === sku.num) return
        this.current_input_value = sku.num
        this.updateSkuNum({sku_id: sku.sku_id, num: Number(_value)})
      },
      /** 删除 */
      handleDelete(sku) {
        this.$layer.confirm('确认要删除这个货品吗？', () => {
          this.deleteSkuItem(sku.sku_id).then(response => {
            this.$message.success('删除成功！')
          })
        })
      },
      /** 批量删除 */
      handleBatchDelete() {
        this.$layer.confirm('确认要删除这些货品吗？', () => {
          // 筛选出已选中的
          const _sku_list = this.skuList.filter(item => item.checked).map(item => item.sku_id)
          this.deleteSkuItem(_sku_list).then(response => {
            this.$message.success('删除成功！')
          })
        })
      },
      /** 清空购物车 */
      handleCleanCart() {
        this.$layer.confirm('确认要清空购物车吗？', () => {
          this.cleanCart().then(() => this.$message.success('购物车已清空！'))
        })
      },
      /** 去结算 */
      handleCheckout() {
        console.log('去结算...')
      },
      /** 监听页面滚动，实现结算栏浮起、固定 */
      countCheckBarFiexd(event) {
        // 获取滚动条当前位置
        const bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop
        // 是否固定到顶部
        this.check_bar_fiexd_top = bodyScrollTop > this.check_bar_top
        // 是否固定到底部
        this.check_bar_fiexd_bottom = bodyScrollTop < (this.check_bar_top - window.innerHeight  + 60)
      },
      /** vuex/cart */
      ...mapActions({
        // 获取购物车数据
        getCartData: 'cart/getCartDataAction',
        // 更新货品数量
        updateSkuNum: 'cart/updateSkuNumAction',
        // 选择、取消选择货品
        checkSkuItem: 'cart/checkSkuItemAction',
        // 选择、取消选择店铺内所有商品
        checkShopSku: 'cart/checkShopSkuAction',
        // 全选、取消全选
        checkAll: 'cart/checkAllAction',
        // 删除货品
        deleteSkuItem: 'cart/deleteSkuItemAction',
        // 清空购物车
        cleanCart: 'cart/cleanCartAction'
      })
    },
    destroyed() {
      /** 当组件销毁时，移除事件监听 */
      window.removeEventListener('scroll', this.countCheckBarFiexd)
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .cart-header {
    width: 100%;
    background: #fff;
    .w {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100px;
      .logo {
        width: 260px;
        height: 60px;
      }
    }
  }
  .cart-content {
    position: relative;
    width: 100%;
    margin-top: 20px;
    background: #f5f5f5;
    font-size: 12px;
    overflow: hidden;
    padding-bottom: 20px;
    .list-header {
      margin: 10px auto;
      padding: 0 30px;
      height: 40px;
      background: #fff;
      color: #666;
      font-size: 12px;
      line-height: 40px;
      border: 1px solid #eee;
      border-radius: 3px;
      span {
        display: inline-block;
        color: #333;
      }
      .checkbox {
        width: 125px;
        cursor: pointer;
      }
      .title { width: 280px }
      .price { width: 165px; text-align: right; font-size: 12px; font-weight: normal }
      .num { width: 280px; text-align: center }
      .weight { width: 90px; text-align: center }
      .total { width: 108px; text-align: center }
      .action { width: 80px; text-align: center }
    }
    .list-content {
      .empty-cart {
        height: 280px;
        margin: 0 auto;
        overflow: hidden;
        position: relative;
        width: 380px;
        z-index: 1;
        padding: 50px 0 20px 280px;
        background: url(../assets/images/icon-empty-cart.jpg) no-repeat left 40px;
        h1 {
          color: #333;
          font: lighter 22px/30px "microsoft yahei";
          width: 380px;
          line-height: 30px;
          margin: 55px 0 10px 0;
        }
        a {
          width: 100px;
          height: 25px;
          line-height: 25px;
          float: left;
          text-align: center;
          margin-right: 10px;
          border: 1px solid #dcdcdc;
          background: #f5f5f5;
          font-size: 12px;
          color: #666;
          &:hover { color: #f42424 }
        }
      }
    }
    .shop-item {
      background-color: #fff;
      margin-top: 20px;
      color: #333333;
      font-size: 12px;
      border: 1px solid #dcdcdc;
      border-radius: 3px;
      .item {
        display: flex;
        align-items: center;
        position: relative;
        .check {
          position: absolute;
          left: 0;
          top: 50%;
          margin-top: -7px;
          z-index: 1;
        }
        .sku-pic {
          position: relative;
          float: left;
          width: 75px;
          height: 75px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .sku-name {
          float: left;
          width: 275px;
          padding-left: 20px;
          overflow: hidden;
          color: #333333;
          font-size: 12px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          &:hover { color: #f42424 }
        }
        .sku-price {
          position: relative;
          float: left;
          width: 165px;
          text-align: right;
          font-size: 12px;
        }
        .sku-num {
          display: flex;
          justify-content: center;
          position: relative;
          float: left;
          width: 280px;
        }
        .num-action {
          padding: 3px 0;
          width: 80px;
          height: 18px;
          background-color: #fff;
          overflow: hidden;
          border: 1px solid #dfdfdf;
          border-radius: 2px;
          .oper {
            float: left;
            width: 20px;
            text-align: center;
            color: #333333;
            font-family: "Tahoma";
            font-size: 14px;
            overflow: hidden;
            user-select: none;
            &.unable {
              color: #dfdfdf;
              cursor: default;
            }
          }
          .input {
            float: left;
            width: 38px;
            height: 18px;
            border: none;
            border-left: 1px solid #dfdfdf;
            border-right: 1px solid #dfdfdf;
            text-align: center;
            line-height: 18px;
            outline: none;
          }
        }
        .sku-weight {
          width: 90px;
          text-align: center;
          font-size: 12px;
        }
        .sku-total {
          width: 108px;
          text-align: center;
          font-size: 12px;
          color: #ff5e5e;
        }
        .sku-action {
          width: 80px;
          text-align: center;
          i {
            font-size: 18px;
            cursor: pointer;
          }
        }
      }
    }
    .shop-header {
      display: flex;
      align-items: center;
      padding: 15px 30px;
      height: 25px;
      line-height: 25px;
      border-bottom: 1px solid #dcdcdc;
      .shop-name {
        font-size: 14px;
        color: #333;
        font-weight: 600;
      }
    }
    .shop-body {
      .sku-item {
        padding: 0 30px;
        background-color: #fff;
        transition: background-color 0.2s ease-in-out;
        &:hover {
          background-color: #fff7f7;
        }
        .item {
          position: relative;
          padding: 20px 0 20px 35px;
        }
      }
    }
    .shop-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 50px;
      padding-right: 25px;
      border-top: 1px solid #dcdcdc;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      background-color: #fefcfc;
      .shop-footer-item {
        padding-left: 20px;
        &.price {
          font-size: 12px;
          font-weight: normal;
          color: #ff5e5e;
          span {
            font-size: 14px;
            font-weight: bold;
          }
        }
      }
    }
  }
  .cart-checkbar {
    display: block;
    width: 100%;
    height: 60px;
    &.fiexd-top {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1110;
      box-shadow: 0 0 10px #ccc;
    }
    &.fiexd-bottom {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 1110;
      min-width: 1190px;
      box-shadow: 0 0 10px #ccc;
    }
    .check-bar {
      position: relative;
      z-index: 10;
      width: 100%;
      height: 60px;
      background-color: #fff;
      .w {
        display: flex;
        justify-content: space-between;
      }
    }
    .check-bar-left {
      display: flex;
      align-items: center;
      height: 60px;
      color: #dedede;
      overflow: hidden;
      .select-all {
        float: left;
        margin: 0 18px 0 30px;
        cursor: pointer;
        span { color: #333333; font-size: 13px }
        b { font-style: normal }
      }
      em { font-size: 16px }
      .check-tool-a {
        margin: 0 18px;
        font-size: 12px;
        color: #999;
      }
    }
    .check-bar-right {
      display: flex;
      align-items: center;
      height: 60px;
      .check-btn {
        display: inline-block;
        width: 130px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        background-color: #ff5e5e;
        font-weight: bold;
        font-size: 17px;
        color: #fff;
        cursor: pointer;
        user-select: none;
        transition: background-color 0.2s ease-in-out;
        &.disabled {
          pointer-events: none;
          background-color: #ccc;
          cursor: default;
        }
      }
      em { font-size: 16px; color: #dedede }
      span { margin: 0 20px }
      .price i { font-size: 20px }
    }
  }
  .check {
    display: inline-block;
    position: relative;
    top: -1px;
    width: 13px;
    height: 13px;
    line-height: normal;
    margin-right: 20px;
    background-color: #fff;
    border: 1px solid #dcdcdc;
    border-radius: 3px;
    transition: background-color 0.2s ease-in-out;
    vertical-align: middle;
    &.checked {
      background-color: #ff5e5e;
      border-color: #ff5e5e;
      i { opacity: 1 }
    }
    i {
      opacity: 0;
      font-size: 14px !important;
      color: #fff;
      user-select: none;
      transition: opacity 0.2s ease-in-out;
    }
  }
  .price {
    font-size: 16px;
    color: #ff5e5e;
    font-weight: bold;
  }
</style>
