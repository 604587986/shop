<template>
  <el-container>
    <layout-sidebar/>
    <layout-nav-tabs/>
    <layout-main></layout-main>
  </el-container>
</template>

<script>
  import LayoutSidebar from './Sidebar.vue'
  import LayoutNavTabs from './NavTabs.vue'
  import LayoutMain from './Main.vue'
  export default {
    name: 'Layout',
    components: {
      LayoutSidebar,
      LayoutNavTabs,
      LayoutMain
    }
  }
</script>
