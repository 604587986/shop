<template>
  <div>
    <el-button type='primary' size='small' @click='dialogVisible=true'>弹出</el-button>
    <en-area-selector-dialog @confirmFunc='confirm' :defaultData='areaData' @hideDialogFunc='hideDialog' :showDialog='dialogVisible'></en-area-selector-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: true,
      areaData: []
    }
  },
  methods: {
    confirm(data) {
      console.log('refresh-->', data)
    },
    hideDialog() {
      this.dialogVisible = false
    }
  }
}
</script>