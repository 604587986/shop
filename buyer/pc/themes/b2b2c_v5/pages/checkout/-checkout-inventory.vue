<template>
  <div class="ckt-item inventory">
    <div class="top-ckt">
      <span class="title-top">配送清单</span>
      <span class="other-top"><nuxt-link to="/cart" class="c-back-cart">返回购物车修改</nuxt-link></span>
      <div class="clearfix"></div>
    </div>
    <div class="content-ckt-inventory inventory">
      <div
        v-for="shop in inventoryList"
        :key="shop.seller_id"
        class="item-ckt-inventory"
      >
        <div class="left-item-inventory" style="height: 221px;">
          <div class="express-inventory">
            <div class="title-item-inventory">配送方式</div>
            <div class="content-item-inventory express">
              <div class="ckt-checkbox express selected" title="运费&nbsp;（0&nbsp;元）">
                <span>运费&nbsp;（0&nbsp;元）</span>
              </div>
            </div>
            <div style="clear: both;"></div>
          </div>
          <div class="hr-inventory"></div>
          <div class="discount-inventory">
            <div class="title-item-inventory">优惠折扣</div>
            <div class="content-item-inventory">
              <p class="no-item-discount-inventory">您在该店铺还没有领到优惠劵，去&nbsp;
                <nuxt-link :to="'/shop?shop_id=' + shop.seller_id" target="_blank" style="color: #005ea7;">店铺</nuxt-link>&nbsp;看看吧！
              </p>
              <div style="clear: both;"></div>
            </div>
          </div>
        </div>
        <div class="right-item-inventory">
          <div class="gooods-inventory">
            <div class="title-item-inventory">
              <div class="store-name">店铺名称：
                <nuxt-link :to="'/shop?shop_id=' + shop.seller_id" target="_blank">{{ shop.seller_name }}</nuxt-link>
              </div>
              <div class="store-total">
                <div class="discount-store-total">优惠折扣： <span>-￥{{ shop.price.discount_price | unitPrice }}</span>
                </div>
                <div class="total-store-total">店铺合计（含运费）： <span>￥{{ shop.price.total_price | unitPrice }}</span>
                </div>
              </div>
              <input type="hidden" name="storeid" value="18">
            </div>
            <div class="content-item-inventory goods">
              <table class="table-gooods-inventory">
                <tbody>
                <tr v-for="goods in shop.sku_list" :key="goods.sku_id">
                  <td class="img-gooods-inventory">
                    <nuxt-link :to="'/goods-' + goods.goods_id + '.html'" target="_blank">
                      <img :src="goods.goods_image">
                    </nuxt-link>
                  </td>
                  <td class="name-gooods-inventory">
                    <nuxt-link :to="'/goods-' + goods.goods_id + '.html'" target="_blank">
                      {{ goods.name }}
                    </nuxt-link>
                    <span class="sku-spec">{{ goods | formatterSkuSpec }}</span>
                  </td>
                  <td class="price-gooods-inventory">￥{{ goods.purchase_price | unitPrice }}</td>
                  <td class="num-gooods-inventory">x{{ goods.num }}</td>
                  <td class="subtotal-gooods-inventory">￥{{ goods.subtotal | unitPrice }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div style="clear: both;"></div>
        <div class="bottom-item-inventory">
          <!--// Andste_TODO 2018/6/13: 促销相关未适配-->
          <!-- 注释 [store.activity_id??] -->
          <!-- 注释 [store.storeprice.gift_id != 0] -->
          <!-- 注释 [store.storeprice.bonus_id != 0]-->
        </div>
        <div style="clear: both;"></div>
      </div>
    </div>
    <div class="bottom-ckt-inventory">
      订单备注：
      <el-input v-model="iRemark" size="small" :maxlength="120" clearable>
        <el-button slot="append" icon="el-icon-check" @click="handleSetRemark"></el-button>
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
    props: ['remark'],
    data() {
      return {
        inventoryList: [],
        iRemark: this.remark
      }
    },
    watch: {
      remark(newVal) { this.iRemark = newVal }
    },
    mounted() {
      API_Trade.getCarts('checked').then(response => this.inventoryList = response)
    },
    methods: {
      handleSetRemark() {
        API_Trade.setRemark(this.iRemark).then(() => {
          this.$message.success('设置成功！')
        })
      }
    }
  }
</script>
