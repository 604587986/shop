<template>
  <div id="shop-nav" class="shop-nav">
    <ul>
      <li>
        <span>{{ shop.shop_credit }}</span>
        <p>信用</p>
        <i></i>
      </li>
      <li>
        <nuxt-link :to="'/shop/goods-list?shop_id=' + shop.shop_id">
          <span>{{ shop.goods_num }}</span>
          <p>全部宝贝</p>
          <i></i>
        </nuxt-link>
      </li>
      <li class="last" @click="collectionShop">
        <span>{{ shop.shop_collect }}</span>
        <p>收藏</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import * as API_Members from '@/api/members'
  import Storage from '@/utils/storage'
  export default {
    name: 'shop-nav',
    props: ['shop'],
    methods: {
      /** 收藏店铺 */
      collectionShop() {
        if (!Storage.getItem('refresh_token')) {
          this.$message.error('未登录不能收藏店铺！')
          return false
        }
        API_Members.collectionShop(this.shop.shop_id).then(() => {
          this.$message.success('收藏成功！')
        })
      },
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .shop-nav {
    width: 100%;
    overflow: hidden;
    text-align: center;
    ul {
      width: 100%;
      height: 100%;
      overflow: hidden;
      text-align: center;
      background: #fff;
    }
    li {
      list-style: none outside none;
      text-align: center;
      width: 32%;
      display: inline-block;
      height: 100%;
      padding: 8px 0;
      position: relative;
    }
    span {
      font-size: 16px;
    }
    i {
      width: 1px;
      height: 32px;
      display: block;
      border-right: 1px solid #dedede;
      position: absolute;
      top: 14px;
      right: 0;
    }
  }
</style>
