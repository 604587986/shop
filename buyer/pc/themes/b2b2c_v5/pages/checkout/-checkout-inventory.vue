<template>
  <div class="ckt-item inventory">
    <div class="top-ckt">
      <span class="title-top">配送清单</span>
      <span class="other-top"><nuxt-link to="/cart" class="c-back-cart">返回购物车修改</nuxt-link></span>
      <div class="clearfix"></div>
    </div>
    <div class="content-ckt-inventory inventory">
      <div
        v-for="(shop, shopIndex) in inventoryList"
        :key="shop.seller_id"
        class="item-ckt-inventory"
      >
        <div class="left-item-inventory">
          <div class="express-inventory">
            <div class="title-item-inventory">配送方式</div>
            <div class="content-item-inventory express">
              <div class="ckt-checkbox express selected" :title="'运费（' + shop.price.freight_price + '元）'">
                <span>运费&nbsp;（{{ shop.price.freight_price }}&nbsp;元）</span>
              </div>
            </div>
            <div style="clear: both;"></div>
          </div>
          <div class="hr-inventory"></div>
          <div class="discount-inventory">
            <div class="title-item-inventory">优惠折扣</div>
            <div class="content-item-inventory">
              <template v-if="!shop.coupon_list || !shop.coupon_list.length">
                <p class="no-item-discount-inventory">您在该店铺还没有领到优惠劵，去&nbsp;
                  <nuxt-link :to="'/shop/' + shop.seller_id" target="_blank" style="color: #005ea7;">店铺</nuxt-link>&nbsp;看看吧！
                </p>
              </template>
              <template v-else>
                <div
                  v-for="(coupon, couponIndex) in shop.coupon_list"
                  :key="couponIndex"
                  class="item-discount-inventory"
                  :class="[coupon.selected === 1 && 'selected', coupon.enable === 0 && 'full']"
                  @click="useCoupon(shop.seller_id, shopIndex, coupon, couponIndex)"
                >
                  <div class="lace-item-discount">
                    <div class="lace-discount">
                      <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
                    </div>
                  </div>
                  <div class="select-discount">
                    <span class="bg-select-discount"></span>
                    <i class="iconfont ea-icon-check"></i>
                  </div>
                  <div class="money-item-discount">￥{{ coupon.amount || unitPrice }}</div>
                  <div class="detail-item-discount">
                    <p class="first">{{ coupon.use_term }}</p>
                    <p>有效期至{{ coupon.end_time | unixToDate('yyyy-MM-dd') }}</p>
                  </div>
                </div>
              </template>
              <div style="clear: both;"></div>
            </div>
          </div>
        </div>
        <div class="right-item-inventory">
          <div class="gooods-inventory">
            <div class="title-item-inventory">
              <div class="store-name">店铺名称：
                <nuxt-link :to="'/shop/' + shop.seller_id" target="_blank">{{ shop.seller_name }}</nuxt-link>
              </div>
              <div class="store-total">
                <div class="discount-store-total">优惠折扣： <span>-￥{{ shop.price.discount_price | unitPrice }}</span>
                </div>
                <div class="total-store-total">店铺合计（含运费）： <span>￥{{ shop.price.total_price | unitPrice }}</span>
                </div>
              </div>
              <input type="hidden" name="storeid" value="18">
            </div>
            <div
              :title="shop.promotion_notice"
              class="shop-act-info"
              v-if="shop.promotion_notice"
            >{{ shop.promotion_notice }}</div>
            <div class="content-item-inventory goods">
              <table class="table-gooods-inventory">
                <tbody>
                <tr v-for="goods in shop.sku_list" :key="goods.sku_id">
                  <td class="img-gooods-inventory">
                    <nuxt-link :to="'/goods/' + goods.goods_id" target="_blank">
                      <img :src="goods.goods_image">
                    </nuxt-link>
                  </td>
                  <td class="name-gooods-inventory">
                    <nuxt-link :to="'/goods/' + goods.goods_id" target="_blank">
                      {{ goods.name }}
                    </nuxt-link>
                    <span class="sku-spec">{{ goods | formatterSkuSpec }}</span>
                    <p v-if="goods.promotion_tags && goods.promotion_tags.length">
                      <span class="sku-act-tag" v-for="(tag, index) in goods.promotion_tags" :key="index">{{ tag }}</span>
                    </p>
                  </td>
                  <td class="price-gooods-inventory">
                    ￥{{ goods.purchase_price | unitPrice }}{{ goods.point ? ('+'+goods.point+'积分')  : '' }}
                    <p v-if="goods.purchase_price < goods.original_price" class="price-goods-org">原价￥{{ goods.original_price | unitPrice }}</p>
                  </td>
                  <td class="num-gooods-inventory">x{{ goods.num }}</td>
                  <td class="subtotal-gooods-inventory">￥{{ goods.subtotal | unitPrice }}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="gift-item-inventory">
              <div class="gift-item" v-if="shop.gift_coupon_list && shop.gift_coupon_list.length">
                <div class="gf-tit">赠送优惠券：</div>
                <div class="gf-con">
                  <span :key="index" v-for="(coupon, index) in shop.gift_coupon_list">
                    {{ coupon.amount }}的优惠券
                  </span>
                </div>
              </div>
              <div class="gift-item" v-if="shop.gift_list && shop.gift_list.length">
                <div class="gf-tit">赠送礼品：</div>
                <div class="gf-con gift">
                  <span :key="index" v-for="(gift, index) in shop.gift_list">
                    价值{{ gift.gift_price }}的{{ gift.gift_name }}
                    <a :href="gift.gift_img" target="_blank">
                      <img :src="gift.gift_img" alt="" class="gift-img">
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="clear: both;"></div>
        <div class="bottom-item-inventory">
        </div>
        <div style="clear: both;"></div>
      </div>
    </div>
    <div class="bottom-ckt-inventory">
      订单备注：
      <el-input v-model="iRemark" size="small" :maxlength="120" clearable>
        <el-button slot="append" @click="handleSetRemark">保存</el-button>
      </el-input>
      <span class="remark-tip">*请勿填写有关支付、收货、发票方面的信息，如有特殊需要请联系客服人员。</span>
    </div>
    <div class="placeholder-20"></div>
  </div>
</template>

<script>
  /**
   * 结算页
   * 购物车清单组件
   */
  import * as API_Trade from '@/api/trade'
  export default {
    name: 'checkout-inventory',
    props: ['inventoryList', 'remark'],
    data() {
      return {
        iRemark: this.remark
      }
    },
    watch: {
      remark(newVal) { this.iRemark = newVal }
    },
    methods: {
      /** 使用优惠券 */
      useCoupon(shop_id, shopIndex, coupon, couponIndex) {
        // 取消使用
        if (coupon.enable === 0) {
          this.$message.error('订单金额不满足此优惠券使用条件！')
          return
        }
        if (coupon.selected === 1) {
          API_Trade.useCoupon(shop_id, 0).then(() => {
            this.$emit('coupon-change')
          })
        } else {
          API_Trade.useCoupon(shop_id, coupon.member_coupon_id).then(() => {
            this.$emit('coupon-change')
          })
        }
      },
      /** 设置备注 */
      handleSetRemark() {
        API_Trade.setRemark(this.iRemark).then(() => {
          this.$message.success('保存成功！')
        })
      }
    }
  }
</script>
