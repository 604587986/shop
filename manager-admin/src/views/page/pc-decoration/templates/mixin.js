/**
 * Created by andste.cc@gmail.com on 2018/5/18.
 */

/** mixin */
export default {
  props: {
    /** 数据 */
    data: {
      type: Object,
      default: () => ({})
    },
    /** 是否为编辑模式 */
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    /** 点击遮罩 */
    onClickMask(index) {
      const data = JSON.parse(JSON.stringify(this.data))
      this.$emit('handle-edit', data, index)
    }
  }
}
