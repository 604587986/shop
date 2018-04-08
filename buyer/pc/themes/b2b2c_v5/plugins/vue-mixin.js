import Vue from 'vue'

Vue.mixin({
  methods: {
    /** 滚动到顶部【动画】 */
    MixinScrollToTop(top) {
      $("html,body").animate({ scrollTop: top || 0 }, 300)
    }
  }
})
