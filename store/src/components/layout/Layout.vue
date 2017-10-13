<template>
  <el-container>
    <layout-sidebar/>
    <layout-nav-tabs/>
  </el-container>
</template>

<script>
  import LayoutSidebar from './Sidebar.vue'
  import LayoutNavTabs from './NavTabs.vue'

  export default {
    name: 'Layout',
    components: {
      LayoutSidebar,
      LayoutNavTabs
    }
  }
</script>
