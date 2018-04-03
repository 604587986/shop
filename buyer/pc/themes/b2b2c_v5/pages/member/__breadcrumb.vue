<template>
  <div id="member-breadcrumb" class="w">
    <nuxt-link to="/"><i class="iconfont ea-icon-home"></i>首页</nuxt-link>&ensp;&gt;
    <nuxt-link to="/member">会员中心</nuxt-link>&ensp;&gt;
    <nuxt-link :to="fullPath">{{ currentName }}</nuxt-link>
  </div>
</template>

<script>
  import menus from './menus'
  export default {
    name: 'member-breadcrumb',
    computed: {
      fullPath() {
        return this.$route.fullPath
      },
      currentName() {
        let _name = this.$route.name
        menus.every(item => {
          let flag = true
          item.children.every(_item => {
            if ('member-' + _item.name === _name) {
              flag = false
              _name = _item.title
            }
            return flag
          })
          return flag
        })
        return _name
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  #member-breadcrumb {
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
