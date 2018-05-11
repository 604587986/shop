/**
 * Created by andste.cc@gmail.com on 2018/5/9.
 */

import * as API_Common from '@/api/common'

export default {
  data() {
    return {
      /** 图片上传API */
      MixinUploadApi: API_Common.uploadApi
    }
  },
  methods: {
    /** 返回克隆后的对象 */
    MixinClone(obj) {
      return JSON.parse(JSON.stringify(obj))
    }
  },
  computed: {}
}
