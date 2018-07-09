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
  components: {
    'layout-item': {
      props: ['block'],
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
                   <a v-else :href="$parent.blockHref(block)">
                     <slot :block="block"></slot>
                     <img :src="block.block_value">
                   </a>
                 </div>`
    }
  },
  methods: {
    /** 获取区块链接 */
    blockHref(block) {
      const { opt_type, opt_value } = block.block_opt
      switch (opt_type) {
        case 'GOODS': return `/goods/${opt_value}`
        case 'KEYWORD': return `/goods?keyword=${opt_value}`
        default: return '/'
      }
    },
    /** 编辑区块 */
    handleEditBlock(blockIndex) {
      this.$emit('edit-block', JSON.parse(JSON.stringify(this.data)), blockIndex)
    },
    /** 点击遮罩 */
    onClickMask(index) {
      const data = JSON.parse(JSON.stringify(this.data))
      this.$emit('handle-edit', data, index)
    }
  }
}
