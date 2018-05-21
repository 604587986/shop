/**
 * Created by andste.cc@gmail.com on 2018/5/18.
 */

import Vue from 'vue'

/** mixin */
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      floorData: JSON.parse(JSON.stringify(this.data))
    }
  },
  methods: {
    cc() {
      console.log('cc')
    },
    /** 选择图片 */
    selectImg(index) {
      const data = JSON.parse(JSON.stringify(this.data))
      data.blockList[index].block_value = 'http://javashop-statics.oss-cn-beijing.aliyuncs.com/demo/2A70E151F2D14E26B1CF4BD2CC6AC849.jpg'
      this.$emit('change', data)
    }
  }
}
