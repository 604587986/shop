<template>
  <div>
    <el-button type='primary' size='small' @click='dialogVisible=true'>弹出</el-button>
    <area-selector-dialog @confirmFunc='confirm' :defaultData='areaData' @hideDialogFunc='hideDialog' :showDialog='dialogVisible'></area-selector-dialog>
  </div>
</template>

<script>
import AreaSelectorDialog from '@/plugins/selector/vue/AreaSelectorDialog'
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
  },
  components: {
    AreaSelectorDialog
  }
}
</script>