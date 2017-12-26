<template>
  <div class="sidebar-container" :style="sidebarWidth">
    <div class="sidebar-container-logo">
      <div v-if="isCollapse" class="logo-square"></div>
      <div v-else class="logo-rectangle"></div>
    </div>
    <div class="sidebar-container-menu" :style="{overflow: isCollapse ? 'visible' : 'scroll'}">
      <en-scroll-bar v-if="isCollapse">
        <el-menu
          :collapse="isCollapse"
          :default-active="currentTabName"
          background-color="#313641"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          @select="sidebarSelected"
        >
          <template v-for="(item, index) in sidebarMenu">
            <menus-item :item="item" :index="index"></menus-item>
          </template>
        </el-menu>
      </en-scroll-bar>
      <el-menu
        v-else
        :collapse="isCollapse"
        :default-active="currentTabName"
        background-color="#313641"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened
        @select="sidebarSelected"
      >
        <template v-for="(item, index) in sidebarMenu">
          <menus-item :item="item" :index="index"></menus-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapActions, mapGetters } from 'vuex'
  import ScrollBar from '../../components/scroll-bar'
  ScrollBar.install()
  import sidebarMenuSeller from '@/sidebar-menus.seller'
  import sidebarMenuAdmin from '@/sidebar-menus.admin'
  const managerPath = require('../../../config/manager.config').path
  window.localStorage.setItem('sidebarMenu',
    JSON.stringify(managerPath === 'admin' ? sidebarMenuAdmin : sidebarMenuSeller)
  )

  export default {
    name: 'LayoutSidebar',
    data() {
      return {
        sidebarMenu: managerPath === 'admin'
          ? sidebarMenuAdmin
          : sidebarMenuSeller
      }
    },
    mounted() {
      if (!this.$store.getters.currentTabs[0]) {
        this.layoutNewTab({
          ...this.sidebarMenu[0],
          name: this.currentTabName
        })
      }
    },
    computed: {
      ...mapGetters(['currentTabName', 'isCollapse', 'sidebarWidth'])
    },
    methods: {
      sidebarSelected(index, indexPath) {
        let _menu = this.filterMenu(index)
        const _tab = {
          title: _menu.title,
          name: index,
          closable: true,
          component: _menu.component
        }
        index === 0 && (_tab.closable = false)
        this.layoutNewTab(_tab)
      },

      /** 筛选出当前点击的menu */
      filterMenu(index) {
        let _menu = this.sidebarMenu
        index.split('-').forEach(item => {
          _menu[item].children
            ? _menu = _menu[item].children
            : (_menu = _menu[item])
        })
        return _menu
      },
      ...mapActions([
        'layoutNewTab'
      ])
    }
  }

  // 菜单组件
  Vue.component('menus-item', {
    props: ['item', 'index'],
    template: `
          <keep-alive>
            <el-menu-item-group v-if="item.children && item.children.length === 1 || item.type === 'menu-item-group'">
              <template slot="title">{{ item.title }}</template>
              <template v-if="item.children && item.children[0]" v-for="(_item, _index) in item.children">
                <menus-item :item="_item" :index="index + '-' + _index"></menus-item>
              </template>
            </el-menu-item-group>
            <el-submenu v-if="item.type === 'submenu'" :index="index + ''">
              <template slot="title">
                 <i v-if="item.icon" :class="item.icon"></i>
                 <span>{{ item.title }}</span>
              </template>
              <template v-if="item.children && item.children[0]" v-for="(_item, _index) in item.children">
                <menus-item :item="_item" :index="index + '-' + _index"></menus-item>
              </template>
            </el-submenu>
            <el-menu-item v-else :index="index + ''">
              <i v-if="item.icon" :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </keep-alive>
        `
  })
</script>

<style type="text/scss" lang="scss">
  @import "../../styles/color";
  @import "../../styles/mixin";

  .sidebar-container {
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    height: 100%;
    background-color: $sider-bar_background;
    @include transition(width ease-out .2s);

    .sidebar-container-logo {
      height: 50px;
      .logo-square {
        width: 50px;
        height: 50px;
        background: url("../../assets/logo-javashop-square.png") no-repeat center;
        background-size: 50px 50px;
        margin: 0 auto;
      }
      .logo-rectangle {
        width: 160px;
        height: 50px;
        margin: 0 20px;
        color: #fff;
        background: url("../../assets/logo-javashop-rectangle-dark.png") no-repeat left;
        background-size: 100% 50px;
      }
    }
    .sidebar-container-menu {
      height: calc(100% - 50px);
      overflow-y: scroll;
    }
    .el-menu {
      border: none;
    }
    .el-submenu__title span, .el-menu-item span, .el-menu-item-group__title {
      user-select: none;
    }
  }
</style>
