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
      props: ['block', 'isEdit', 'blockHref'],
      template: `<div class="layout-item">
                   <template v-if="isEdit || $parent.isEdit">
                     <div class="mask-floor" @click="$emit('handle-edit')">
                       <div class="mask-bg-floor">
                         <button type="button" class="mask-btn-floor">
                           <svg-icon icon-class="pen-leather"></svg-icon>编辑
                         </button>
                       </div>
                     </div>
                     <slot :block="block"></slot>
                     <template v-if="block.block_type === 'IMAGE'">
                       <img v-if="block.block_value" :src="block.block_value">
                       <div v-else-if="isEdit || $parent.isEdit" class="no-image"></div>
                     </template>
                   </template>
                   <a v-else :href="blockHref || $parent.blockHref(block)">
                     <slot :block="block"></slot>
                     <img v-if="block.block_type === 'IMAGE'" :src="block.block_value">
                   </a>
                 </div>`
    }
  },
  methods: {
    /** 获取区块链接 */
    blockHref(block) {
      if (block.block_type === 'GOODS') {
        if (!block.block_value) return '#'
        return `/goods/${block.block_value.goods_id}`
      }
      if (!block || !block.block_opt) return '#'
      const { opt_type, opt_value } = block.block_opt
      // Andste_TODO 2018/7/9: 未适配完成
      switch (opt_type) {
        case 'KEYWORD': return `/goods?keyword=${opt_value}`
        default: return '/'
      }
    },
    /** 编辑区块 */
    handleEditBlock(blockIndex) {
      this.$emit('edit-block', JSON.parse(JSON.stringify(this.data)), blockIndex)
    }
  }
}
