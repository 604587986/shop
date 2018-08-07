<template>
  <div id="cart">
    <van-nav-bar
      :left-arrow="!is_home"
      title="购物车"
      @click-left="$router.go(-1)"
    >
      <header-shortcut v-if="!is_home" slot="right"/>
    </van-nav-bar>
    <tab-bar v-if="is_home" :active="2"></tab-bar>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import * as API_Trade from '@/api/trade'
  import { RegExp } from '~/ui-utils'
  export default {
    name: 'cart',
    layout: 'full',
    middleware: 'auth-user',
    data() {
      return {
        // 当前操作的输入框的值【变化之前】
        current_input_value: 1
      }
    },
    mounted() {
      /** 获取购物车数据 */
      this.getCartData()
    },
    computed: {
      // 是否处于首页
      is_home() {
        return !this.$route.query.form
      },
      /** 是否全部选中 */
      all_checked() {
        return !!this.checkedCount && this.checkedCount === this.allCount
      },
      ...mapGetters({
        shopList: 'cart/shopList',
        skuList: 'cart/skuList',
        checkedCount: 'cart/checkedCount',
        allCount: 'cart/allCount',
        cartTotal: 'cart/cartTotal'
      })
    },
    methods: {
      /** 勾选、取消勾选商品 */
      handleCheckSku(sku) {
        this.checkSkuItem({ sku_id: sku.sku_id, checked: sku.checked ? 0 : 1 })
      },
      /** 勾选、取消勾选店铺 */
      handleCheckShop(shop) {
        this.checkShopSku({ shop_id: shop.seller_id, checked: shop.checked ? 0 : 1 })
      },
      /** 全选、取消全选 */
      handleCheckAll() {
        this.checkAll(this.all_checked ? 0 : 1)
      },
      /** 更新商品数量 */
      handleUpdateSkuNum(sku, symbol) {
        if (symbol === '-' && sku.num < 2) return
        if (symbol === '+' && sku.num >= sku.enable_quantity) {
          this.$message.error('超过最大库存！')
          return
        }
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
        if (!RegExp.integer.test(_value)) {
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
        this.$confirm('确定要删除这个货品吗？', () => {
          this.deleteSkuItem(sku.sku_id).then(response => {
            this.$message.success('删除成功！')
          })
        })
      },
      /** 批量删除 */
      handleBatchDelete() {
        this.$confirm('确定要删除这些货品吗？', () => {
          // 筛选出已选中的
          const _sku_list = this.skuList.filter(item => item.checked).map(item => item.sku_id)
          this.deleteSkuItem(_sku_list).then(response => {
            this.$message.success('删除成功！')
          })
        })
      },
      /** 清空购物车 */
      handleCleanCart() {
        this.$confirm('确定要清空购物车吗？', () => {
          this.cleanCart().then(() => this.$message.success('购物车已清空！'))
        })
      },
      /** 去结算 */
      handleCheckout() {
        this.$router.push({ path: '/checkout' })
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
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../assets/styles/cart";
</style>
