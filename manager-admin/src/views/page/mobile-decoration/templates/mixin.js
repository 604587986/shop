/**
 * Created by andste.cc@gmail.com on 2018/5/18.
 */

/** mixin */
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    cc() {
      console.log('cc')
    }
  }
}
