<template>
  <div>
    <el-button type='primary' size='small' @click='dialogVisible=true'>弹出</el-button>
    <en-goods-selector-dialog :defaultData='[21]' :maxLength='12' @hideDialogFunc='hideDialog' @refreshFunc='refresh' :mode='"admin"' :showDialog='dialogVisible'></en-goods-selector-dialog>
    <en-goods-selector-dialog-with-panel :defaultData='[21]' :maxLength='12' @refreshFunc='refresh'></en-goods-selector-dialog-with-panel>
  </div>
</template>

<script>
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
  }
}
</script>