/**
 * Created by andste.cc@gmail.com on 2018/5/13.
 * mixin
 */

export default {
  data() {
    return {
      aa: 'bb'
    }
  },
  props: {
    /**
     * 最多展示级数
     * 默认展示到3级
     */
    maxLevel: {
      type: Number,
      default: 3
    }
  }
}
