<template>
  <div id="checkout">
    <div class="checkout-header">
      <div class="w">
        <div class="logo"><en-logo/></div>
        <en-cart-step :step="2"/>
      </div>
    </div>
    <div class="ckt-control">
      <div class="ckt-title">填写并核对订单信息</div>
      <div class="ckt-content">
        <!--收货人信息 start-->
        <checkout-address
          :address-id="params.address_id"
          @change="(id) => { params.address_id = id}"
        />
        <!--收货人信息 end-->

        <!--支付方式 start-->
        <checkout-payment
          :payment-type="params.payment_type"
          @change="(type) => { params.payment_type = type }"
        />
        <!--支付方式 end-->

        <!--配送清单 start-->
        <div class="ckt-item inventory" id="inventory">
          <div class="top-ckt">
            <span class="title-top">配送清单</span>
            <span class="other-top"><a href="/javashop/cart.html" class="c-back-cart">返回购物车修改</a></span>
            <div class="clearfix"></div>
          </div>
          <div class="content-ckt-inventory inventory">
            <div class="item-ckt-inventory" id="store_18" storeid="18">
              <div class="left-item-inventory" style="height: 221px;">
                <div class="express-inventory">
                  <div class="title-item-inventory">配送方式</div>
                  <div class="content-item-inventory express">
                    <div class="ckt-checkbox express selected" type_id="1" title="运费&nbsp;（0&nbsp;元）">
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
                      <a target="_blank" href="/javashop/store_themes/18/index.html?store_id=0&amp;menu=store" style="color: #005ea7;">店铺</a>&nbsp;看看吧！
                    </p>
                    <div style="clear: both;"></div>
                  </div>
                </div>
              </div>
              <div class="right-item-inventory">
                <div class="gooods-inventory">
                  <div class="title-item-inventory">
                    <div class="store-name">店铺名称：
                      <a target="_blank" href="/javashop/store_themes/18/index.html?store_id=18&amp;menu=store" style="color: #005ea7;">数码家电</a>
                    </div>
                    <div class="store-total">
                      <div class="discount-store-total">优惠折扣： <span>￥0.00</span>
                      </div>
                      <div class="total-store-total">店铺合计（含运费）： <span>￥11,687.00</span>
                      </div>
                    </div>
                    <input type="hidden" name="storeid" value="18">
                  </div>
                  <div class="content-item-inventory goods">
                    <table class="table-gooods-inventory">
                      <tbody><tr>
                        <td class="img-gooods-inventory">
                          <a target="_blank" href="/javashop/goods-279.html">
                            <img src="http://javashop-statics.oss-cn-beijing.aliyuncs.com/demo/2FA07EED46144151B7BBEF8A76839293.jpg_300x300">                                            </a>
                          <!-- 此处应该是促销list [item.activity_id?exists && item.activity_id != 0] -->
                        </td>
                        <td class="name-gooods-inventory">
                          <a target="_blank" href="/javashop/goods-279.html"> 戴尔DELL INS15-7567湛黑版15.6英寸笔记本电脑i7-7700 8G 1T+128G固态GTX1050t
                          </a>
                        </td>
                        <td class="price-gooods-inventory">
                          ￥7,288.00
                        </td>
                        <td class="num-gooods-inventory">x1</td>
                        <td class="subtotal-gooods-inventory">
                          ￥7,288.00
                        </td>
                      </tr>
                      <tr>
                        <td class="img-gooods-inventory">
                          <a target="_blank" href="/javashop/goods-210.html">
                            <img src="http://javashop-statics.oss-cn-beijing.aliyuncs.com/demo/7C7CB2FC5FE6480EA4EC425108A2FDC9.jpg_300x300">                                            </a>
                          <!-- 此处应该是促销list [item.activity_id?exists && item.activity_id != 0] -->
                        </td>
                        <td class="name-gooods-inventory">
                          <a target="_blank" href="/javashop/goods-210.html">长虹(CHANGHONG)60G3 60英寸25核轻薄4K
                          </a>
                        </td>
                        <td class="price-gooods-inventory">
                          ￥4,399.00
                        </td>
                        <td class="num-gooods-inventory">x1</td>
                        <td class="subtotal-gooods-inventory">
                          ￥4,399.00
                        </td>
                      </tr>
                      </tbody></table>
                  </div>
                </div>
              </div>
              <div style="clear: both;"></div>
              <div class="bottom-item-inventory">
                <!-- 注释 [store.activity_id??] -->
                <!-- 注释 [store.storeprice.gift_id != 0] -->
                <!-- 注释 [store.storeprice.bonus_id != 0]-->
              </div>
              <div style="clear: both;"></div>
            </div>
            <div class="item-ckt-inventory" id="store_1" storeid="1">
              <div class="left-item-inventory">
                <div class="express-inventory">
                  <div class="title-item-inventory">配送方式</div>
                  <div class="content-item-inventory express">
                    <div class="ckt-checkbox express selected" type_id="1" title="运费&nbsp;（0&nbsp;元）">
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
                      <a target="_blank" href="/javashop/store_themes/1/index.html?store_id=0&amp;menu=store" style="color: #005ea7;">店铺</a>&nbsp;看看吧！
                    </p>
                    <div style="clear: both;"></div>
                  </div>
                </div>
              </div>
              <div class="right-item-inventory" style="height: 156px;">
                <div class="gooods-inventory">
                  <div class="title-item-inventory">
                    <div class="store-name">店铺名称：
                      <a target="_blank" href="/javashop/store_themes/1/index.html?store_id=1&amp;menu=store" style="color: #005ea7;">平台自营</a>
                    </div>
                    <div class="store-total">
                      <div class="discount-store-total">优惠折扣： <span>￥0.00</span>
                      </div>
                      <div class="total-store-total">店铺合计（含运费）： <span>￥798.00</span>
                      </div>
                    </div>
                    <input type="hidden" name="storeid" value="1">
                  </div>
                  <div class="content-item-inventory goods">
                    <table class="table-gooods-inventory">
                      <tbody><tr>
                        <td class="img-gooods-inventory">
                          <a target="_blank" href="/javashop/goods-203.html">
                            <img src="http://javashop-statics.oss-cn-beijing.aliyuncs.com/demo/D298849609114B168FD10106C45AEFF1.jpg_300x300">                                            </a>
                          <!-- 此处应该是促销list [item.activity_id?exists && item.activity_id != 0] -->
                        </td>
                        <td class="name-gooods-inventory">
                          <a target="_blank" href="/javashop/goods-203.html">小米（MI）米家IH电饭煲 智能电饭煲 IH电磁环绕加热 手
                          </a>
                        </td>
                        <td class="price-gooods-inventory">
                          ￥399.00
                        </td>
                        <td class="num-gooods-inventory">x2</td>
                        <td class="subtotal-gooods-inventory">
                          ￥798.00
                        </td>
                      </tr>
                      </tbody></table>
                  </div>
                </div>
              </div>
              <div style="clear: both;"></div>
              <div class="bottom-item-inventory">
                <!-- 注释 [store.activity_id??] -->
                <!-- 注释 [store.storeprice.gift_id != 0] -->
                <!-- 注释 [store.storeprice.bonus_id != 0]-->
              </div>
              <div style="clear: both;"></div>
            </div>
          </div>
          <div class="bottom-ckt-inventory">
            订单备注：
            <input name="remark" id="remark" class="form-control" maxlength="120" value="">
            <button type="button" class="btn btn-primary remark-confirm-btn" id="remark-confirm">确定</button>
            <i>*请勿填写有关支付、收货、发票方面的信息，如有特殊需要请联系客服人员。</i>
          </div>
          <div class="placeholder-20"></div>
        </div>
        <!--配送清单 end-->

        <!--送货时间 start-->
        <div class="ckt-item time">
          <div class="top-ckt">
            <span class="title-top">送货时间</span>
            <div class="clearfix"></div>
          </div>
          <div class="content-ckt time">
            <div class="ckt-checkbox time selected">
              <span>任意时间</span>
            </div>
            <div class="ckt-checkbox time">
              <span>仅工作日</span>
            </div>
            <div class="ckt-checkbox time">
              <span>仅休息日</span>
            </div>
          </div>
          <div class="placeholder-20"></div>
        </div>
        <!--送货时间 end-->

        <!--发票信息 start-->
        <div class="ckt-item invoice">
          <div class="top-ckt">
            <div class="clearfix"></div>
          </div>
          <div class="content-ckt invoice">

            <div class="receipt-title"></div>
            <div class="receipt-content">无需发票</div>
            <a href="javascript: void(0);" class="edit-invoice">修改</a>
            <div style="display: none;" id="invoice_content"><div class="invoice-dialog" id="invoice_dialog">
              <div class="invoice-head">
                <div class="title-invoice-head">发票抬头：</div>
                <div class="items-invoice-head" style="margin-bottom: 10px">
                  <div class="ckt-checkbox head-invoice personal selected">
                    <span>个人</span>
                    <input class="company-invoice-input" value="个人" style="display: none;">
                  </div>
                  <div class="ckt-checkbox head-invoice __add_ele__" style="display: none">
                    <input class="company-invoice-input" maxlength="60" style="border: none; outline: none;" placeholder="新增单位发票抬头">
                    <div class="__btns__ show">
                      <a href="javascript:;" class="__save__">保存</a>
                    </div>
                  </div>
                  <a href="javascript:;" style="color: #005ea7" class="add-invoice">新增单位发票</a>
                </div>
              </div>
              <div class="invoice-head duty" style="display: none;">
                <div class="title-invoice-head" style="margin-top: 10px">纳税人识别号：</div>
                <input class="duty-invoice-input" placeholder="纳税人识别号" maxlength="50" value="">
                <span style="color: #ff3500">必填</span>
              </div>
              <div class="invoice-content">
                <div class="title-invoice-head">发票内容：</div>
                <div class="items-invoice-content" style="float: left; width: 360px;">
                  <div class="ckt-checkbox content-invoice personal selected">
                    <span>明细</span>
                  </div>
                  <div class="ckt-checkbox content-invoice">
                    <span>办公用品</span>
                  </div>
                  <div class="ckt-checkbox content-invoice">
                    <span>劳保用品</span>
                  </div>
                  <div class="ckt-checkbox content-invoice">
                    <span>耗材</span>
                  </div>
                </div>
              </div>

              <div class="invoice-inputs" style="display: none;">
                <input type="hidden" name="receiptContent" value="明细">
                <input type="hidden" name="receiptTitle" value="个人">
                <input type="hidden" name="receiptDuty" value="">
              </div>
            </div></div>
          </div>            </div>
        <!--发票信息 end-->
      </div>
      <div class="ckt-total">
        <div class="total-ckt-total">
          <div class="details-ckt-total">
            <ul class="ul-details-ckt-total">
              <li>
                <span class="title-details-ckt-total">商品总金额：</span>
                <em class="price-details-ckt-total">￥12,485.00</em>
                <div class="clear-details-ckt-total"></div>
              </li>
              <li class="li_discount_price">
                <span class="title-details-ckt-total">优惠金额：</span>
                <em class="price-details-ckt-total">-￥0.00</em>
                <div class="clear-details-ckt-total"></div>
              </li>
              <li>
                <span class="title-details-ckt-total">运费总计：</span>
                <em class="price-details-ckt-total">￥0.00</em>
                <div class="clear-details-ckt-total"></div>
              </li>
            </ul>
          </div>
          <div class="summary-ckt-total">
            <div class="amounts-payable-ckt">
              <span class="title-details-ckt-total amounts">应付金额：</span>
              <em class="price-details-ckt-total amounts">￥12,485.00</em>
              <div class="clear-details-ckt-total"></div>
            </div>
          </div>            </div>
        <div class="summary-ckt-total">
          <div class="address-info-ckt">
            <span>收货人信息：</span>
            <span id="address-info">河北 石家庄市 辛集市 辛集镇 12312313</span>
            <span>&nbsp;收货人：&nbsp;<em id="address-name">王先生</em>&nbsp;<em id="address-mobile">13333333333</em></span>
          </div>
        </div>
        <div class="bill-btn-ckt">
          <a href="javascript:;" class="bill_btn" @click="handleCreateTrade">提交订单</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import CheckoutAddress from './-checkout-address'
  import CheckoutPayment from './-checkout-payment'
  import * as API_Trade from '@/api/trade'
  export default {
    name: 'checkout-index',
    components: {
      CheckoutAddress,
      CheckoutPayment
    },
    data() {
      return {
        params: ''
      }
    },
    mounted() {
      // 获取默认结算数据
      API_Trade.getCheckoutParams().then(response => this.params = response)
    },
    methods: {
      /** 提交订单 */
      handleCreateTrade() {
        /** 先调用创建订单接口，再跳转到收银台 */
        API_Trade.createTrade().then(response => {
          this.$router.push({ path: '/checkout/cashier' })
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../../assets/styles/checkout";
</style>
