<template>
  <div id="nav" class="w">
    <en-category/>
    <ul class="nav-list">
      <li v-for="nav in navList" :key="nav.id">
        <nuxt-link :to="nav.link">{{ nav.title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'EnNav',
    mounted() {
      this.getNavData()
    },
    computed: {
      ...mapGetters(['navList'])
    },
    methods: {
      ...mapActions(['getNavData'])
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  #nav {
    display: flex;
    height: 40px;
    .nav-list {
      overflow: hidden;
      max-width: calc(1190px - 240px);
      li {
        vertical-align: top;
        letter-spacing: normal;
        word-spacing: normal;
        display: inline-block;
        a {
          font-size: 16px;
          line-height: 40px;
          color: #333;
          height: 40px;
          padding: 0 24px;
          display: inline-block;
          zoom: 1;
          font-weight: 500;
          &:hover {
            color: #f42424
          }
        }
      }
    }
  }
</style>
