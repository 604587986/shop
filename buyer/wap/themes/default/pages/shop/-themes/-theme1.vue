<template>
  <div id="shop-theme-1">
    <en-shop-header :shop="shop"/>
    <en-shop-sildes :shop-id="shop.shop_id"/>
    <theme1-coupons :shop-id="shop.shop_id"/>
    <div class="shop-tags">
      <div class="tags-container">
        <div class="item hot">
          <ul>
            <template v-for="(goods, index) in hotGoods">
              <li v-if="index < 5" :key="goods.goods_id" class="goods-item">
                <div class="w">
                  <div class="goods-info">
                    <h3>店家热卖<span>Hot-Recommend</span></h3>
                    <nuxt-link :to="'/goods/' + goods.goods_id" class="goods-name">{{ goods.goods_name }}</nuxt-link>
                    <div class="goods-price">
                      <span>RMB：<strong>￥{{ goods.price | unitPrice }}</strong></span>
                      <span>已销售：{{ goods.buy_count }}件</span>
                    </div>
                    <nuxt-link :to="'/goods/' + goods.goods_id" class="goods-btn">查看详情</nuxt-link>
                  </div>
                  <div class="goods-image">
                    <nuxt-link :to="'/goods/' + goods.goods_id">
                      <img :src="goods.thumbnail" :alt="goods.goods_name" :title="goods.goods_name">
                    </nuxt-link>
                  </div>
                </div>
              </li>
            </template>
          </ul>
        </div>
        <div class="item new">
          <ul>
            <template v-for="(goods, index) in newGoods">
              <li v-if="index < 8" :key="goods.goods_id" class="goods-item">
                <div class="goods-image">
                  <nuxt-link :to="'/goods/' + goods.goods_id">
                    <img :src="goods.thumbnail" :alt="goods.goods_name" :title="goods.goods_name">
                  </nuxt-link>
                </div>
                <div class="goods-info">
                  <nuxt-link :to="'/goods/' + goods.goods_id" class="goods-name">{{ goods.goods_name }}</nuxt-link>
                  <div class="goods-price">
                    <span>RMB：<strong>￥{{ goods.price | unitPrice }}</strong></span>
                    <span>已销售：{{ goods.buy_count }}件</span>
                  </div>
                </div>
              </li>
            </template>
            <li class="middle-item">
              <div class="shop-logo">
                <img :src="shop.shop_logo" :alt="shop.shop_name">
              </div>
              <h3>新品</h3>
              <p>追求卓越品质,打造一流品牌</p>
            </li>
          </ul>
        </div>
        <div class="item rec">
          <h3>掌柜推荐</h3>
          <ul>
            <template v-for="(goods, index) in recGoods">
              <li v-if="index < 8" :key="goods.goods_id" class="goods-item">
                <div class="goods-image">
                  <nuxt-link :to="'/goods/' + goods.goods_id">
                    <img :src="goods.thumbnail" :alt="goods.goods_name" :title="goods.goods_name">
                  </nuxt-link>
                </div>
                <nuxt-link :to="'/goods/' + goods.goods_id" class="goods-name">{{ goods.goods_name }}</nuxt-link>
                <div class="goods-price">
                  <span>RMB：<strong>￥{{ goods.price | unitPrice }}</strong></span>
                  <span>已销售：{{ goods.buy_count }}件</span>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
    <div class="shop-intro" id="shop-intro">
      <div class="w">
        <div class="intro-title">店铺简介</div>
        <div class="intro-body" v-html="shop.shop_desc || '暂无简介'"></div>
      </div>
    </div>
    <div class="shop-info" id="shop-info">
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
  import theme1Coupons from './-theme1-coupons'
  export default {
    name: 'shop-theme-1',
    mixins: [mixin],
    components: { theme1Coupons }
  }
</script>

<style type="text/scss" lang="scss" scoped>
</style>
