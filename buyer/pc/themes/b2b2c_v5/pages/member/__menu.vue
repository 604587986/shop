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
  import menus from './menus'
  export default {
    name: 'member-menu',
    data() {
      return {
        menus
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
      &.nuxt-link-active, &:hover {
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
