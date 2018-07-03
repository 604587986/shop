<template>
  <div style="background-color: #f9f9f9">
    <en-header-other title="帮助中心"/>
    <div class="help-container">
      <div class="help-menus">
        <h3 class="h3-title">常见问题分类</h3>
        <dl class="subside-mod on">
          <dt class="title">
            购物指南 <b class="icon-triangle"></b>
          </dt>
          <dd class="subside-cnt">
            <ul class="subside-list">
              <li class="list-item">
                <a href="#">交易条款</a>
              </li>
              <li class="list-item">
                <a href="#">购物流程</a>
              </li>
              <li class="list-item">
                <a href="#">促销咨询</a>
              </li>
              <li class="list-item">
                <a href="#">商品咨询</a>
              </li>
              <li class="list-item">
                <a href="#">生活旅行</a>
              </li>
            </ul>
          </dd>
        </dl>
      </div>
      <div class="help-content">
        <div class="breadcrumb">
          <span>订单百事通</span>
          &gt;
          <a href="#"><span id="sLevel2">第三方交易纠纷</span></a>
        </div>
        <nuxt-child class="content"/>
      </div>
    </div>
    <span class="clr"></span>
  </div>
</template>

<script>
  export default {
    name: 'help',
    layout: 'full'
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .help-container {
    width: 1000px;
    margin: 20px auto;
    overflow: hidden;
  }
  .help-menus {
    width: 210px;
    float: left;
    .h3-title {
      color: #fff;
      text-align: center;
      font-size: 18px;
      line-height: 40px;
      height: 40px;
      background-color: #f42424;
      font-weight: normal;
    }
    .subside-mod {
      .title {
        position: relative;
        height: 39px;
        line-height: 39px;
        padding-left: 45px;
        background-color: #eaeaea;
        border-bottom: 1px solid #fff;
        font-size: 14px;
        cursor: pointer;
        &:hover {
          background-color: #dadada;
        }
      }
      &.on .icon-triangle {
        border-width: 0 5px 5px;
      }
      .icon-triangle {
        border-style: solid dashed solid dashed;
        border-color: #999 transparent #999 transparent;
        border-width: 5px 5px 0;
        position: absolute;
        top: 17px;
        right: 20px;
        font-size: 0;
        line-height: 0;
        height: 0;
        overflow: hidden;
      }
    }
    .subside-mod.on .subside-cnt {
      height: auto;
    }
    .subside-cnt {
      height: 0;
      transition: all ease .3s;
      background-color: #fff;
      .list-item {
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #faf8f9;
        a {
          display: block;
          padding-left: 45px;
          color: #333;
          &:hover {
            color: #f42424;
          }
        }
      }
    }
  }
  .help-content {
    float: left;
    width: 780px;
    min-height: 800px;
    margin-left: 10px;
    background-color: #fff;
    .breadcrumb {
      height: 39px;
      line-height: 39px;
      font-size: 14px;
      background: #eaeaea;
      padding-left: 13px;
    }
    .content {
      padding: 20px;
    }
  }
</style>
