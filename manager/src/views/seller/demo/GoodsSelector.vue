<template>
  <div>
    <el-button type='primary' size='small' @click='dialogVisible=true'>弹出</el-button>
    <goods-selector-dialog :defaultData='[21]' :maxLength='12' @hideDialogFunc='hideDialog' @refreshFunc='refresh' :mode='"admin"' :showDialog='dialogVisible'></goods-selector-dialog>
    <goods-selector-dialog-with-panel :defaultData='[21]' :maxLength='12' @refreshFunc='refresh'></goods-selector-dialog-with-panel>
  </div>
</template>

<script>
import GoodsSelectorDialog from '@/plugins/selector/vue/GoodsSelectorDialog'
import GoodsSelectorDialogWithPanel from '@/plugins/selector/vue/GoodsSelectorDialogWithPanel'
export default {
  data() {
    return {
      dialogVisible: true
    }
  },
  methods: {
    refresh(data) {
      console.log('refresh-->', data)
    },
    hideDialog() {
      this.dialogVisible = false
    }
  },
  components: {
    GoodsSelectorDialog,
    GoodsSelectorDialogWithPanel
  }
}
</script>