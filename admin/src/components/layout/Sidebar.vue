<template>
  <div class="sidebar-container">
    <el-menu
      :default-active="defaultActive"
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
</template>

<script>
  import Vue from 'vue'
  import sidebarMenu from '../../assets/sidebar-menus.json'

  export default {
    name: 'LayoutSidebar',
    data () {
      return {
        sidebarMenu
      }
    },
    computed: {
      defaultActive () {
        return this.$store.getters.currentTabName
      }
    },
    watch: {
      // 监听当前的menu
      defaultActive (newVal, oldVal) {
        const _path = this.filterMenu(newVal).path
        this.$router.replace(_path || '/404')
      }
    },
    methods: {
      sidebarSelected (index, indexPath) {
        let _menu = this.filterMenu(index)
        const _tab = { title: _menu.title, name: index, closable: true }
        index === 0 && (_tab.closable = false)
        window.Layout.NewTab(_tab)
        this.$router.push({ path: _menu.path || '/404' })
      },
      // 筛选出当前点击的menu
      filterMenu (index) {
        let _menu = this.sidebarMenu
        index.split('-').forEach(item => {
          _menu[item].children
            ? _menu = _menu[item].children
            : (_menu = _menu[item])
        })
        return _menu
      }
    }
  }

  // 菜单组件
  Vue.component('menus-item', {
    props: ['item', 'index'],
    template: `
          <keep-alive>
            <el-menu-item-group v-if="item.type === 'menu-item-group'">
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

<style type="text/scss" lang="scss" scoped>
  @import "../../styles/_color.scss";

  .sidebar-container {
    width: 200px;
    position: fixed;
    top: 56px;
    left: 0;
    height: calc(100% - 56px);
    background-color: $sider-bar_background;
    overflow-y: scroll;
  }
  .el-menu {
    border: none;
  }
</style>
