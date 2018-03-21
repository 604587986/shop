<template>
  <div id="member-nav" class="w">
    <nuxt-link to="/"><i class="iconfont ea-icon-home"></i>首页</nuxt-link>&ensp;&gt;
    <nuxt-link to="/member">会员中心</nuxt-link>&ensp;&gt;
    <nuxt-link :to="fullPath">{{ currentName }}</nuxt-link>
  </div>
</template>

<script>
  export default {
    name: 'member-nav',
    computed: {
      fullPath() {
        return this.$route.fullPath
      },
      currentName() {
        return this.$route.name
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  #member-nav {
    position: relative;
    font-size: 12px;
    height: 20px;
    padding: 10px 0;
    color: #777;
    .iconfont {
      margin-right: 5px;
    }
  }
</style>
