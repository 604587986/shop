<template>
  <div id="index-card" class="index-card">
    <div class="card-user">
      <div class="inner-card-user">
        <div class="card-user-avatar">
          <nuxt-link to="/member">
            <img src="//storage.jd.com/i.imageUpload/6c616979756e636875616e31343834333537343637373532_mid.jpg">
          </nuxt-link>
        </div>
        <div v-if="user" class="card-user-show logined">
          <p>Hi,<nuxt-link to="/member"> {{ user.uname }}</nuxt-link></p>
          <p class="btns">
            <nuxt-link to="/member" class="to-member">进入个人中心</nuxt-link>
          </p>
        </div>
        <div v-else class="card-user-show">
          <p>Hi,<a href="#">&ensp;欢迎来到Javashop！</a></p>
          <p class="btns">
            <nuxt-link :to="'/login' + MixinForward" class="please-login">请登录</nuxt-link>
            <a href="#" class="apply-shop">申请开店</a>
          </p>
        </div>
      </div>
    </div>
    <div class="card-news">
      <div class="card-news-tab">
        <a href="#" @mouseenter="card_news_tab_x = 0">商城公告</a>
        <a href="#" @mouseenter="card_news_tab_x = 70">联系方式</a>
        <div class="card-news-tab-active" :style="{transform: 'translateX('+ card_news_tab_x +'px)'}"></div>
        <a href="#" class="card-news-more">更多</a>
      </div>
      <div class="card-news-content">
        <div class="card-news-con-item" v-show="card_news_tab_x === 0">
          <ul>
            <li class="news-item"><a href="">路由秒杀风暴，抢99减50神券</a></li>
            <li class="news-item"><a href="">轮胎3送1每满500减50</a></li>
            <li class="news-item"><a href="">春分保养领券最高减100</a></li>
            <li class="news-item"><a href="">爆款手机立省800元</a></li>
          </ul>
        </div>
        <div class="card-news-con-item" v-show="card_news_tab_x === 70">
          <ul>
            <li class="news-item"><a href="">京东启用全新客服电话“950618”</a></li>
            <li class="news-item"><a href="">大家电订单超期自动取消公告</a></li>
            <li class="news-item"><a href="">关于召回普利司通（天津）轮胎有限公司2个规格乘用车轮胎的公告</a></li>
            <li class="news-item"><a href="">京东物流推出配送员统一外呼电话"95056”</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="card-service">
      <a href="" class="service-item">
        <i class="iconfont ea-icon-point"></i>
        <span>我的积分</span>
      </a>
      <a href="" class="service-item">
        <i class="iconfont ea-icon-score"></i>
        <span>我的评价</span>
      </a>
      <a href="" class="service-item">
        <i class="iconfont ea-icon-order"></i>
        <span>我的订单</span>
      </a>
      <a href="" class="service-item">
        <i class="iconfont ea-icon-star"></i>
        <span>我的收藏</span>
      </a>
      <a href="" class="service-item">
        <i class="iconfont ea-icon-security"></i>
        <span>账号安全</span>
      </a>
      <a href="" class="service-item">
        <i class="iconfont ea-icon-shop"></i>
        <span>商家入驻</span>
      </a>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'index-card',
    data() {
      return {
        card_news_tab_x: 0
      }
    },
    computed: {
      ...mapGetters(['user'])
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .index-card {
    position: absolute;
    top: 25px;
    right: 0;
    width: 190px;
    height: 450px;
    background-color: #fff;
    z-index: 2;
    .card-user {
      height: 140px;
      text-align: center;
      background-color: #fff;
      .inner-card-user {
        position: relative;
        padding-top: 62px;
        height: 78px;
      }
      .card-user-avatar {
        position: absolute;
        left: 50%;
        top: -10px;
        margin-left: -34px;
        width: 65px;
        height: 65px;
        a {
          display: block;
          width: 55px;
          height: 55px;
          border: 5px solid #e3e1df;
          -moz-border-radius: 50%;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 3px 6px 25px #c3c3c3;
        }
        img {
          display: block;
          width: 55px;
          height: 55px;
        }
      }
      .card-user-show {
        padding: 0 10px;
        a {
          color: #666;
          &:hover {
            color: #f42424;
          }
        }
        .btns {
          display: flex;
          justify-content: space-around;
          margin-top: 10px;
          a {
            display: block;
            float: left;
            line-height: 22px;
            width: 68px;
            height: 22px;
            border: 1px solid #333;
            text-align: center;
          }
          .apply-shop {
            border-color: #f42424;
            color: #f42424;
          }
        }
        &.logined .to-member {
          width: 60%;
          color: #f42424;
          border-color: #f42424;
          transition: all .2s ease;
          &:hover {
            background-color: #f42424;
            color: #fff;
            border-color: #f42424;
          }
        }
      }
    }
    .card-news {
      overflow: hidden;
      height: 130px;
      background: #fff;
      .card-news-tab {
        padding: 8px 0 0;
        position: relative;
        line-height: 13px;
        font-size: 0;
        a {
          font-size: 12px;
          color: #333;
          padding: 0 10px;
          border-right: 1px solid #dfe0e1;
          &:last-child {
            border-right: none;
          }
        }
      }
      .card-news-tab-active {
        position: absolute;
        bottom: -1px;
        left: 0;
        margin-left: 11px;
        width: 45px;
        height: 2px;
        background: #db192b;
        transform: translateX(0);
        transition: transform .3s ease;
      }
      .card-news-content {
        position: relative;
        padding-top: 8px;
        margin: 0 15px;
        height: 88px;
      }
      .card-news-con-item {
        height: 100%;
        overflow: hidden;
      }
      .news-item {
        line-height: 22px;
        max-width: 160px;
        _width: 160px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        color: #999;
        a {
          color: #666;
          &:hover {
            color: #f42424;
          }
        }
      }
      .card-news-more {
        position: absolute;
        right: 5px;
        top: 8px;
        font-size: 12px;
        &:hover {
          color: #f42424;
        }
      }
    }
    .card-service {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;
      position: relative;
      height: 160px;
      transition: all .2s ease;
      padding: 10px;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        display: block;
        width: 160px;
        left: 15px;
        height: 1px;
        background: #ebeaea;
        z-index: 1;
      }
      .service-item {
        display: block;
        color: #666;
        &:hover { color: #f42424 }
        .iconfont {
          display: block;
          font-size: 30px;
          line-height: 30px;
          margin: 5px auto;
          text-align: center;
        }
      }
    }
  }
</style>
