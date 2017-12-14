<template>
  <div>
    <el-button type='primary' size='small' @click='dialogVisible=true'>弹出</el-button>
    <text-selector-dialog :defaultData='initData' @hideDialogFunc='hideDialog' @confirmFunc='confirm' :showDialog='dialogVisible'></text-selector-dialog>
  </div>
</template>

<script>
import TextSelectorDialog from '@/plugins/selector/vue/TextSelectorDialog'
export default {
  data() {
    return {
      dialogVisible: true,
      initData: {
        content: '讲述警探Michael Britten和妻儿一起经历了严重的车祸，事后他发现世界被分成两种，一边是妻子在事故中去世儿子还活着而另一边是儿子在事故中去世而妻子还活着。他要适应两种生活，而两边的心理医生都极具说服力的证明自己的世界是真的；在两边的案件调查中Michael发现两个世界的案件有着独特的联系；这让他更加困惑，究竟哪个是真实的世界哪个是自己的幻想，或者都不是真实的。',
        op_type: 'link',
        op_value: '《异度觉醒》'
      }
    }
  },
  methods: {
    confirm(data) {
      console.log('confirm-->', data)
    },
    hideDialog() {
      this.dialogVisible = false
    }
  },
  components: {
    TextSelectorDialog
  }
}
</script>

