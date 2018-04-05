<template>
  <div id="member-breadcrumb" class="w">
    <nuxt-link to="/"><i class="iconfont ea-icon-home"></i>首页</nuxt-link>&ensp;&gt;
    <nuxt-link to="/member">会员中心</nuxt-link>&ensp;&gt;
    <template v-for="(b, i) in breadcrumbs">
      <nuxt-link :to="b.path" :key="b.path"> {{ b.title }}</nuxt-link>
      <template v-if="i !== breadcrumbs.length - 1">&ensp;&gt;</template>
    </template>
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
      breadcrumbs() {
        let _name = this.$route.name
        let _paths = this.$route.path.split('/').slice(2, 6)
        let _bcs = []
        menus.forEach(item => {
          item.children.forEach(_item => {
            if (_item.name === _paths[0]) {
              _bcs.push({ title: _item.title, path: '/member/' + _item.name })
              if (_item.children) {
                _item.children.forEach(__item => {
                  if (__item.name === _paths[1]) _bcs.push({ title: __item.title, path: '/member/' + _item.name + '/' + __item.name })
                })
              }
            }
          })
        })
        return _bcs
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
