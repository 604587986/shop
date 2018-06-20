/**
 * Created by andste.cc@gmail.com on 2018/5/18.
 */

// import { swiper, swiperSlide } from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'

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
  components: {
    'layout-item': {
      props: ['block'],
      methods: {
        getBlockHref() {
          const { opt_type, opt_value } = this.block.block_opt
          switch (opt_type) {
            case 'GOODS': return `/goods/${opt_value}`
            default: return '/'
          }
        }
      },
      template: `<div class="layout-item">
                   <template v-if="$parent.isEdit">
                     <div class="mask-floor" @click="$emit('handle-edit')">
                       <div class="mask-bg-floor">
                         <button type="button" class="mask-btn-floor">
                           <svg-icon icon-class="pen-leather"></svg-icon>编辑
                         </button>
                       </div>
                     </div>
                     <slot :block="block"></slot>
                     <img v-if="block.block_value" :src="block.block_value">
                     <div v-else-if="$parent.isEdit" class="no-image"></div>
                   </template>
                   <a v-else :href="getBlockHref()" target="_blank">
                     <slot :block="block"></slot>
                     <img :src="block.block_value">
                   </a>
                 </div>`
    }
  },
  methods: {
    /** 获取颜色相关信息 */
    colors(columnIndex = 0) {
      const _colors = this.data.columnList[columnIndex].titleColors
      return {
        title: `background-color: ${_colors[0]}; background-image: linear-gradient(90deg, ${_colors.join(',')});`,
        color: (colorIndex = 0) => `color: ${_colors[colorIndex]}`
      }
    },
    /** 获取block数据 */
    getBlock(columnIndex = 0, blockIndex = 0) {
      return this.data.columnList[columnIndex].blockList[blockIndex]
    },
    /** 点击遮罩编辑 */
    handleEditBlock(columnIndex, blockIndex) {
      const data = JSON.parse(JSON.stringify(this.data))
      this.$emit('edit-block', data, columnIndex, blockIndex)
    }
  }
}
