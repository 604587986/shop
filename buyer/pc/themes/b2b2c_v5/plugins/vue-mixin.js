import Vue from 'vue'

import * as API_Common from '@/api/common'

Vue.mixin({
  methods: {
    /** 滚动到顶部【动画】 */
    MixinScrollToTop(top) {
      $("html,body").animate({ scrollTop: top || 0 }, 300)
    },
    /** 获取验证图片URL */
    MixinGetValidateCodeUrl(type) {
      return API_Common.getValidateCodeUrl(type)
    }
  }
})
