<template>
  <div id="member-menu">
    <div v-for="menu in menus" :key="menu.name" class="menu-item">
      <h2>{{ menu.title }}</h2>
      <nuxt-link v-for="item in menu.children" :key="item.name" :to="'/member/' + item.name">
        <em>&gt;</em>
        {{ item.title }}
        <em>&lt;</em>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'member-menu',
    data() {
      return {
        menus: [
          { title: '交易管理', name: 'transaction', children: [
              { title: '我的订单', name: 'order' },
              { title: '收货地址', name: 'shipping-address' },
              { title: '售后申请', name: 'after-sale' }
            ]
          },
          { title: '客服服务', name: 'service', children: [
              { title: '我的收藏', name: 'order' },
              { title: '我的咨询', name: 'shipping-address' },
              { title: '我的评论', name: 'after-sale' },
              { title: '我的积分', name: 'after-sale' },
              { title: '我的优惠券', name: 'after-sale' },
              { title: '站内消息', name: 'after-sale' }
            ]
          },
          { title: '账号管理', name: 'account', children: [
              { title: '完善资料', name: 'order' },
              { title: '账户安全', name: 'after-sale' },
              { title: '账号绑定', name: 'after-sale' }
            ]
          }
        ]
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  #member-menu {
    width: 208px;
    border: 1px solid #e7e7e7;
    h2 {
      background: #F7F7F7;
      color: #333;
      font-size: 14px;
      font-weight: 600;
      border-bottom: 1px solid #eee;
      padding: 10px;
    }
    a {
      display: block;
      line-height: 32px;
      padding-left: 20px;
      color: #777;
      font-weight: 400;
      transition: all .3s ease-out;
      &.active, &:hover {
        background-color: #FF6A67;
        color: #fff;
        padding-left: 30px;
      }
    }
    em {
      color: #fff;
    }
  }
</style>
