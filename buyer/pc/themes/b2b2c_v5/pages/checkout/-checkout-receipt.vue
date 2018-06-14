<template>
  <div class="ckt-item receipt">
    <div class="top-ckt">
      <span class="title-top">发票信息</span>
      <div class="clearfix"></div>
    </div>
    <div class="content-ckt receipt">
      <div class="item receipt-title">易族智汇（北京）科技有限公司</div>
      <div class="item receipt-content">明细</div>
      <a href="javascript:;" class="edit-btn" @click="handleEditReceipt">修改</a>
    </div>
    <div id="receiptForm" class="receipt-layer" style="display: none">
      <el-form :model="receiptForm" :rules="receiptRules" ref="receiptForm" label-width="100px">
        <el-form-item label="发票抬头" prop="title">
          <div :class="['ckt-checkbox title-receipt', selectedReceiptId === 0 && 'selected']">
            <span>个人</span>
            <input class="company-receipt-input" value="个人" style="display: none;">
          </div>
          <div
            v-for="receipt in receipts"
            :key="receipt.title"
            :class="['ckt-checkbox title-receipt selected']"
          >
            <span>个人</span>
            <input class="company-receipt-input" value="个人" style="display: none;">
          </div>
          <div v-show="selectedReceiptId === 'add'" class="ckt-checkbox title-receipt selected">
            <input class="company-receipt-input" maxlength="60" style="border: none; outline: none; display: block;" placeholder="新增单位发票抬头">
            <div class="__btns__ show">
              <a href="javascript:;" class="__save__">保存</a>
            </div>
          </div>
          <a href="javascript:;" class="add-receipt" @click="handleAddReceipt">新增单位发票</a>
        </el-form-item>
        <el-form-item label="纳税人识别号" prop="mobile">
          <el-input v-model="receiptForm.mobile" size="small" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="发票内容" prop="content">
          <div
            v-for="content in contents"
            :key="content"
            :class="['ckt-checkbox content-receipt', receiptForm.content === content && 'selected']"
            @click="handleSelectContent(content)"
          >
            <span>{{ content }}</span>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  /**
   * 结算页
   * 发票组件
   */
  import * as API_Members from '@/api/members'
  export default {
    name: 'checkout-receipt',
    data() {
      return {
        // 发票表单
        receiptForm: {
          content: '劳保用品'
        },
        // 已选发票
        selectedReceiptId: 0,
        // 发票表单规则
        receiptRules: {},
        // 会员发票列表
        receipts: [],
        // 发票内容数组
        contents: ['明细', '劳保用品', '办公用品']
      }
    },
    mounted() {
      // 获取会员发票列表
      API_Members.getReceipts().then(response => this.receipts = response.data)
    },
    methods: {
      /** 修改发票 */
      handleEditReceipt() {
        this.$layer.open({
          type: 1,
          title: '发票信息',
          area: '550px',
          scrollbar: false,
          content: $('#receiptForm'),
          btn: ['确认', '取消']
        })
      },
      /** 选择发票内容 */
      handleSelectContent(content) {
        this.receiptForm.content = content
      },
      /** 新增单位发票 */
      handleAddReceipt() {
        this.selectedReceiptId = 'add'
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ {
    .receipt-layer {
      padding: 10px 30px;
      .add-receipt {
        color: rgb(0, 94, 167)
      }
      .title-receipt {
        padding-left: 10px;
        max-width: 300px;
        text-align: left;
      }
      .content-receipt {
        float: left;
        margin-right: 10px;
        margin-top: 0;
        margin-bottom: 10px;
        min-width: 50px;
        padding: 0 10px;
      }
    }
    .el-form-item__label { line-height: 30px }
    .el-form-item__label, .el-form-item__content { font-size: 12px }
  }

</style>
