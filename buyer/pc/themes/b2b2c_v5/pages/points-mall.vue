<template>
  <div id="points-mall">
    <div class="points-category">
      <ul class="inner-points-cate w">
        <li v-for="i in 7" :key="i" :class="[i === 0 && 'active']">
          <a href="javascript:;">食品饮料</a>
        </li>
      </ul>
    </div>
    <div class="points-goods">
      <ul class="goods-list w">
        <li v-for="i in 50" :key="i" class="goods-item">
          <a href="javascript:;">
            <img class="goods-img" src="http://javashop-statics.oss-cn-beijing.aliyuncs.com/demo/7EBD931E14FF477FB248823F3CA3316A.jpg_300x300" alt="">
          </a>
          <div class="goods-info">
            <p class="integral">
              <span class="price">￥0+500积分</span>
              <span class="origin-price">原价：￥52</span>
            </p>
            <p class="goods-name">资生堂 珊珂 绵润泡沫洁面乳 120g啊啊啊飒飒啊啊爱上a</p>
            <p>已有<span>23</span>人兑换</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'points-mall',
    head() {
      return {
        title: `积分商城-${this.site.title}`
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../assets/styles/color";
  .points-category {
    width: 100%;
    background: #eceaea;
    :after {
      display: block;
      clear: both;
    }
    ul {
      height: 80px;
      line-height: 80px;
    }
    li {
      position: relative;
      float: left;
      font-size: 16px;
      margin-right: 25px;
      &:not(:first-child)::after {
        position: absolute;
        top: 0;
        left: -17.5px;
        font-size: 30px;
        content: '∙';
      }
      &.active {
        color: $color-main;
      }
    }
  }
  .points-goods {
    margin-top: 20px;
    margin-bottom: 50px;
    .goods-list {
      overflow: hidden;
    }
    .goods-item {
      float: left;
      width: 230px;
      height: 320px;
      margin: 0 5px 10px 0;
      border: 1px solid #ddd;
      a {
        display: inline-block;
        margin: 5%;
        width: 200px;
        height: 200px;
      }
      .goods-img {
        width: 100%;
        height: 100%;
      }
      .goods-info {
        margin: 5%;
        width: 90%;
      }
      .integral {
        font-size: 20px;
      }
      .origin-price {
        font-size: 12px;
        text-decoration: line-through;
        color: grey;
        float: right;
        margin-right: 10px;
      }
      .goods-name {
        font-size: 18px;
        margin: 1rem 0;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>
