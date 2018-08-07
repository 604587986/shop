<template>
  <div id="member-index" style="background-color: #f0f2f5">
    <van-nav-bar>
      <span slot="title">我的</span>
    </van-nav-bar>
    <div class="member-container">
      <div class="head-box" :style="{backgroundImage: 'url('+ user.face +')'}"></div>
      <div class="head-items">
        <div class="head-img">
          <en-face :url="user.face"/>
        </div>
        <div class="head-user-name">{{ user.nickname }}</div>
        <!--<div class="head-user-lvname"></div>-->
        <div class="items">
          <a href="/member/my-collection" class="item">
            <span>
              <p>5</p>
              <p>收藏的商品</p>
            </span>
          </a>
          <a class="item" href="/member/my-collection?type=shop">
            <p>0</p>
            <p>收藏的店铺</p>
          </a>
          <a class="item" href="/member//my-order?order_status=WAIT_COMMENT">
            <p>4</p>
            <p>待评论</p>
          </a>
        </div>
      </div>
    </div>
    <tab-bar :active="3"/>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import * as API_Members from '@/api/members'
  export default {
    name: 'member-index',
    data() {
      return {
      }
    },
    mounted() {
    },
    computed: {
      ...mapGetters(['user'])
    },
    methods: {
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ {
    .van-nav-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    }
  }
  .member-container {
    padding-top: 46px;
    .head-box {
      width: 100%;
      height: 130px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      filter: blur(15px);
    }
    .head-items {
      position: relative;
      height: 55px;
      background-color: #fff;
    }
    .head-img {
      position: absolute;
      top: -35px;
      left: 15px;
      width: 70px;
      height: 70px;
      border: 3px rgba(255, 255, 255, 0.8) solid;
      border-radius: 100%;
      background-color: #fff;
      img {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
    .head-user-name {
      position: absolute;
      top: -40px;
      left: 100px;
      max-width: 168px;
      font-size: 16px;
      color: #fff;
      -webkit-line-clamp: 1;
      line-clamp: 1;
      display: -webkit-box;
      word-break: break-all;
      -webkit-box-orient: vertical;
      box-orient: vertical;
      overflow: hidden;
    }
    .items {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      width: calc(100% - 100px);
      height: 55px;
      float: right;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: calc(100% / 3);
        border-left: 1px solid #e7e7e7;
        &:first-child {
          border-left: none;
        }
        span {
          align-self: flex-start;
        }
        p {
          text-align: center;
          font-size: 12px;
          line-height: 18px;
        }
      }
    }
  }
</style>

