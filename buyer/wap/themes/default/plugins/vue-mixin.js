import Vue from 'vue'
import * as API_Common from '@/api/common'
import { domain, api } from '~/ui-domain'

Vue.mixin({
  data() {
    return {
      // 图片上传API
      MixinUploadApi: `${api.base}/uploaders`,
      // 地区上传API
      MixinRegionApi: `${api.base}/regions/@id/children`,
      // 域名
      MixinDomain: domain
    }
  },
  computed: {
    /** 计算是否有forward */
    MixinForward() {
      const { forward } = this.$route.query
      return forward ? `?forward=${forward}` : ''
    },
    /** 站点信息 */
    site() {
      return this.$store.getters.site
    }
  },
  methods: {
    /** 滚动到顶部【动画】 */
    MixinScrollToTop(top) {
      if (process.isServer) return
      $("html,body").animate({ scrollTop: top || 0 }, 300)
    },
    /** 用得比较多，放到mixin里 */
    MixinRequired(message, trigger) {
      return { required: true, message, trigger: trigger || 'blur' }
    },
    /** 返回上一页 */
    MixinRouterBack() {
      if (window.history.length <= 1) {
        location.href = '/'
      } else {
        this.$router.back()
      }
    },
    /** 是否为微信浏览器 */
    MixinIsWeChatBrowser() {
      if (!process.client) return false
      return !/micromessenger/i.test(navigator.userAgent)
    }
  }
})
