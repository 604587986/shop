<template>
  <div id="shop-theme-3" class="container">
    <en-shop-header :shop="shop"/>
    <en-shop-sildes :shop-id="shop.shop_id"/>
    <theme3-coupons :shop-id="shop.shop_id"/>
    <div class="shop-tags">
      <div class="tags-container">
        <div class="item hot">
          <div class="item-header">
            <h2>店铺热卖</h2>
            <span>HOT-GOODS</span>
            <nuxt-link :to="'./goods-list?shop_id=' + shop_id" class="more">更多&gt;&gt;</nuxt-link>
          </div>
          <ul>
            <template v-for="(goods, index) in hotGoods">
              <li v-if="index < 10" :key="index" class="goods-item">
                <div class="goods-image">
                  <nuxt-link :to="'/goods/' + goods.goods_id">
                    <img :src="goods.thumbnail" :alt="goods.goods_name" :title="goods.goods_name">
                  </nuxt-link>
                </div>
                <div class="goods-name">
                  <nuxt-link :to="'/goods/' + goods.goods_id">{{ goods.goods_name }}</nuxt-link>
                </div>
                <div class="goods-price">
                  <span>RMB：<i class="price">￥{{ goods.price | unitPrice }}</i></span>
                  <span>已售：{{ goods.buy_count }}件</span>
                </div>
              </li>
            </template>
          </ul>
        </div>
        <div class="item new">
          <div class="item-header">
            <h2>店铺新品</h2>
            <span>SHOP-NEW</span>
            <nuxt-link :to="'./goods-list?shop_id=' + shop_id" class="more">更多&gt;&gt;</nuxt-link>
          </div>
          <ul>
            <template v-for="(goods, index) in newGoods">
              <li v-if="index < 10" :key="goods.goods_id" class="goods-item">
                <div class="goods-image">
                  <img :src="goods.thumbnail" :alt="goods.goods_name" :title="goods.goods_name">
                </div>
                <div class="goods-info">
                  <div class="goods-name">
                    <nuxt-link :to="'/goods/' + goods.goods_id">{{ goods.goods_name }}</nuxt-link>
                  </div>
                  <div v-if="index === 0" class="goods-price">
                    <p>RMB: <strong class="price">￥{{ goods.price | unitPrice }}</strong></p>
                    <p>已销售：{{ goods.buy_count }}件</p>
                  </div>
                </div>
              </li>
            </template>
          </ul>
        </div>
        <div class="item rec">
          <div class="item-header">
            <h2>店铺推荐</h2>
            <span>SHOP-RECOMMEND</span>
            <nuxt-link :to="'./goods-list?shop_id=' + shop_id" class="more">更多&gt;&gt;</nuxt-link>
          </div>
          <ul>
            <template v-for="(goods, index) in recGoods">
              <li v-if="index < 8" :key="goods.goods_id" class="goods-item">
                <div class="goods-image">
                  <nuxt-link :to="'/goods/' + goods.goods_id">
                    <img :src="goods.thumbnail" :alt="goods.goods_name" :title="goods.goods_name">
                  </nuxt-link>
                </div>
                <div class="goods-name">
                  <nuxt-link :to="'/goods/' + goods.goods_id">{{ goods.goods_name }}</nuxt-link>
                </div>
                <div class="goods-price">
                  <p>RMB：<strong>￥{{ goods.price | unitPrice }}</strong></p>
                  <p>已销售：{{ goods.buy_count }}件</p>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
    <div class="shop-intro w">
      <div class="intro-title">
        <h2>关于店铺</h2>
        <h3>Welcome to my shop I wish you a happy shopping</h3>
      </div>
      <div class="intro-body" v-html="shop.shop_desc || '暂无简介'"></div>
    </div>
    <div class="shop-info">
      <div class="info-title">关于本店</div>
      <div class="info-information">
        <div class="item">
          <h3>{{ shop.shop_name }}</h3>
          <div class="information-same">
            <p>身份认证：身份已认证</p>
            <p>店铺认证：店铺已认证</p>
            <p>创店时间：{{ shop.shop_createtime | unixToDate('yyyy-MM-dd') }}</p>
          </div>
        </div>
        <div class="item">
          <h3>联系方式</h3>
          <div class="information-same">
            <p>所在地址：{{ formatAddress() }}</p>
            <p>详细地址：{{ shop.shop_add }}</p>
            <p>联系电话：{{ shop.link_phone || '无' }}</p>
          </div>
        </div>
        <div class="item">
          <h3>店铺评价</h3>
          <div class="information-same">
            <div>描述相符：<en-shop-star :star="shop.shop_description_credit"/></div>
            <div>服务态度：<en-shop-star :star="shop.shop_service_credit"/></div>
            <div>发货速度：<en-shop-star :star="shop.shop_delivery_credit"/></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from './themeMixin'
  import theme3Coupons from './-theme3-coupons'
  export default {
    name: 'shop-theme-3',
    mixins: [mixin],
    components: { theme3Coupons }
  }
</script>

<style type="text/scss" lang="scss" scoped>
</style>
