<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <div class="logo-container" :class="[isCollapse && 'collapse']">
      <span class="logo-tip">商家中心</span>
      <img src="../../../../assets/logo_images/logo-javashop-white.png" class="logo-img">
    </div>
    <el-menu
      mode="vertical"
      :default-active="$route.path"
      :collapse="isCollapse"
    >
      <sidebar-item v-for="route in routers" :key="route.name" :item="route" :base-path="route.path"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import { constantRouterMap, asyncRouterMap } from '@/router'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data() {
    return {
      routers: [...constantRouterMap, ...asyncRouterMap]
    }
  }
}
</script>
