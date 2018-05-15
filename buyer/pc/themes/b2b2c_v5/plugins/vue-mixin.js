import Vue from 'vue'
import * as API_Common from '@/api/common'

Vue.mixin({
  data() {
    return {
      /** 图片上传API */
      MixinUploadApi: API_Common.uploadApi
    }
  },
  methods: {
    /** 滚动到顶部【动画】 */
    MixinScrollToTop(top) {
      $("html,body").animate({ scrollTop: top || 0 }, 300)
    }
  },
  computed: {
    /** 计算是否有forward */
    MixinForward() {
      const { forward } = this.$route.query
      return forward ? `?forward=${forward}` : ''
    }
  },
  methods: {
    /** 用得比较多，放到mixin里 */
    MixinRequired(message, trigger) {
      return { required: true, message, trigger: trigger || 'blur' }
    }
  }
})
