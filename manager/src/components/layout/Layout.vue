<template>
  <el-container>
    <layout-tools-bar/>
    <layout-sidebar/>
    <layout-nav-tabs/>
  </el-container>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import LayoutToolsBar from './ToolsBar.vue'
  import LayoutSidebar from './Sidebar.vue'
  import LayoutNavTabs from './NavTabs.vue'

  export default {
    name: 'Layout',
    mounted() {
      /** 模拟登录状态失效 */
      /* setTimeout(() => {
        this.loginExpired()
      }, 1000 * 5) */
    },
    methods: {
      ...mapActions(['loginExpired'])
    },
    components: {
      LayoutToolsBar,
      LayoutSidebar,
      LayoutNavTabs
    }
  }
</script>
