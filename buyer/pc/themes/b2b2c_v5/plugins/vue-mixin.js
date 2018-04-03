import Vue from 'vue'

Vue.mixin({
  methods: {
    /** 滚动到顶部【动画】 */
    MixinScrollToTop() {
      $("html,body").animate({ scrollTop: 0 }, 300)
    }
  }
})
