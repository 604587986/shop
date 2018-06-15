<template>
  <div class="ckt-item receipt">
    <div class="top-ckt">
      <span class="title-top">发票信息</span>
      <div class="clearfix"></div>
    </div>
    <div class="content-ckt receipt">
      <div v-if="receipt.need_receipt === 'no'" class="item">无须发票</div>
      <template v-else>
        <div class="item receipt-title">{{ receipt.title }}</div>
        <div class="item receipt-content">{{ receipt.content }}</div>
      </template>
      <a href="javascript:;" class="item edit-btn" @click="handleEditReceiptInfo">修改</a>
      <a v-if="receipt.need_receipt === 'yes'" href="javascript:;" class="item cancel-btn" @click="handleCancelReceipt">取消发票</a>
    </div>
    <div id="receiptForm" class="receipt-layer" style="display: none">
      <el-form :model="receiptForm" :rules="receiptRules" ref="receiptForm" label-width="100px">
        <el-form-item label="发票抬头" prop="title">
          <div
            v-for="receipt in receipts"
            :key="receipt.title"
            :class="['ckt-checkbox title-receipt', selectedReceipt.title === receipt.title && 'selected', edittingReceipt.id === receipt.id && 'editting']"
            @click="handleSelectReceipt(receipt)"
          >
            <span class="title">{{ receipt.title }}</span>
            <input class="company-receipt-input" v-model="receiptForm.title" maxlength="60" placeholder="单位发票抬头">
            <div v-if="receipt.type === 1" class="title-btns">
              <a href="javascript:;" class="btn save-btn" @click.stop="handleSaveReceipt">保存</a>
              <a href="javascript:;" class="btn edit-btn" @click="handleEditReceipt(receipt)">编辑</a>
              <a href="javascript:;" class="btn delete-btn" @click.stop="handleDeleteReceipt(receipt)">删除</a>
              <a href="javascript:;" class="btn cancel-btn" @click="edittingReceipt = ''">取消</a>
            </div>
          </div>
          <div v-show="selectedReceipt.id === -1" class="ckt-checkbox title-receipt selected editting">
            <input class="company-receipt-input" v-model="receiptForm.title" maxlength="60" placeholder="新增单位发票抬头">
            <div class="title-btns">
              <a href="javascript:;" class="btn save-btn" @click.stop="handleSaveReceipt">保存</a>
            </div>
          </div>
          <a v-if="!edittingReceipt.id" href="javascript:;" class="add-receipt" @click="handleAddReceipt">新增单位发票</a>
        </el-form-item>
        <el-form-item v-show="selectedReceipt.type !== 0" label="纳税人识别号" prop="duty">
          <input
            v-model="receiptForm.duty"
            :readonly="!edittingReceipt.id"
            class="duty-receipt-input"
            placeholder="纳税人识别号"
            maxlength="50"
          >
        </el-form-item>
        <el-form-item label="发票内容" prop="content">
          <div
            v-for="content in contents"
            :key="content"
            :class="['ckt-checkbox content-receipt', selectedReceipt.content === content && 'selected']"
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
  // Andste_TODO 2018/6/15: 发票内容获取待优化
  import * as API_Members from '@/api/members'
  import * as API_Trade from '@/api/trade'
  import { RegExp } from '~/ui-utils'
  export default {
    name: 'checkout-receipt',
    props: ['receipt'],
    data() {
      return {
        // 发票表单
        receiptForm: {
          duty: this.receipt.duty_invoice
        },
        // 发票表单规则
        receiptRules: {
          title: [this.MixinRequired('请输入发票抬头！')],
          duty: [
            this.MixinRequired('请输入纳税人识别号！'),
            {
              validator: (rule, value, callback) => {
                if (!RegExp.TINumber.test(value)) {
                  callback(new Error('纳税人识别号格式不正确！'))
                } else {
                  callback()
                }
              },
              trigger: 'blur'
            }
          ]
        },
        // 会员发票列表
        receipts: [],
        // 发票内容数组
        contents: ['明细', '劳保用品', '办公用品'],
        // 已选择发票
        selectedReceipt: {
          ...this.receipt,
          duty: this.receipt.duty_invoice
        },
        // 正在编辑发票
        edittingReceipt: ''
      }
    },
    mounted() {
      // 获取会员发票列表
      this.GET_ReceiptList()
    },
    methods: {
      /** 修改发票信息 */
      handleEditReceiptInfo() {
        this.$layer.open({
          type: 1,
          title: '发票信息',
          zIndex: 200,
          area: '550px',
          scrollbar: false,
          content: $('#receiptForm'),
          btn: ['确认', '取消'],
          yes: this.handleConfirmReceipt
        })
      },
      /** 选择已有发票 */
      handleSelectReceipt(receipt) {
        this.selectedReceipt = JSON.parse(JSON.stringify(receipt))
        this.receiptForm = JSON.parse(JSON.stringify(receipt))
        if (this.edittingReceipt.id !== receipt.id) {
          this.edittingReceipt = ''
        }
      },
      /** 选择发票内容 */
      handleSelectContent(content) {
        this.selectedReceipt.content = content
        this.receiptForm.content = content
      },
      /** 新增单位发票 */
      handleAddReceipt() {
        this.receiptForm = {
          is_default: 1,
          type: 1,
          content: '明细'
        }
        this.edittingReceipt = this.selectedReceipt = {
          id: -1,
          content: '明细'
        }
      },
      /** 修改发票 */
      handleEditReceipt(receipt) {
        this.receiptForm = JSON.parse(JSON.stringify(receipt))
        this.edittingReceipt = JSON.parse(JSON.stringify(receipt))
      },
      /** 删除发票 */
      handleDeleteReceipt(receipt) {
        if (this.edittingReceipt) {
          this.$message.error('请先保存正在编辑的内容！')
          return
        }
        if (receipt.id === this.selectedReceipt.id) {
          this.$message.error('已选择发票不能删除！')
          return
        }
        this.$confirm('确定要删除这个发票吗？', () => {
          API_Members.deleteReceipt(receipt.id).then(() => {
            this.$message.success('删除成功！')
            this.GET_ReceiptList()
          })
        })
      },
      /** 保存发票 */
      handleSaveReceipt() {
        this.$refs['receiptForm'].validate((valid) => {
          if (valid) {
            const saveSuccess = () => {
              this.$message.success('保存成功！')
              this.GET_ReceiptList()
              this.edittingReceipt = ''
            }
            const { id } = this.receiptForm
            if (id) {
              API_Members.editReceipt(id, this.receiptForm).then(saveSuccess)
            } else {
              API_Members.addReceipt(this.receiptForm).then(saveSuccess)
            }
          } else {
            this.$message.error('表单填写有误，请核对！')
            return false
          }
        })
      },
      /** 确认发票 */
      handleConfirmReceipt(index) {
        if (this.edittingReceipt) {
          this.$message.error('请先保存正在编辑的内容！')
          return
        }
        let receipt = JSON.parse(JSON.stringify(this.selectedReceipt))
        receipt.need_receipt = 'yes'
        API_Trade.setRecepit(receipt).then(() => {
          this.$message.success('设置成功！')
          this.$emit('change', receipt)
          this.$layer.close(index)
        })
      },
      /** 取消发票 */
      handleCancelReceipt() {
        this.$confirm('确定要取消发票吗？', () => {
          const receipt = {
            type: 0,
            title: '',
            content: '',
            duty_invoice: '',
            need_receipt: 'no'
          }
          API_Trade.setRecepit(receipt).then(() => {
            this.$message.success('取消成功！')
            this.$emit('change', receipt)
          })
        })
      },
      /** 获取发票列表 */
      GET_ReceiptList() {
        API_Members.getReceipts().then(response => {
          const receipts = [{ id: 0, title: '个人', content: '明细', type: 0 }]
          receipts.push(...response.data)
          this.receipts = receipts
        })
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
        margin-bottom: 10px;
        .title {
          display: inline-block;
          width: 220px;
          height: 24px;
        }
        .company-receipt-input, .title-btns {
          display: none;
        }
        .company-receipt-input {
          width: 220px;
        }
        .title-btns {
          width: 70px;
          text-align: right;
          .btn {
            margin-right: 7px;
            color: #005ea7;
            &:hover {
              color: #f42424;
            }
            &.save-btn, &.cancel-btn {
              display: none;
            }
          }
        }
        &.selected {
          .title-btns {
            .delete-btn { cursor: not-allowed }
          }
        }
        &.editting {
          .company-receipt-input, .title-btns {
            display: inline-block;
          }
          .title {
            display: none;
          }
          .title-btns {
            .save-btn, .cancel-btn { display: inline }
            .edit-btn, .delete-btn { display: none }
          }
        }
        &:hover .title-btns {
          display: inline-block;
        }
      }
      .duty-receipt-input {
        padding-left: 10px;
        height: 28px;
        line-height: 28px;
        width: 230px;
        outline: none;
        border: 1px solid #ddd;
      }
      .content-receipt {
        float: left;
        margin: 0 10px 0 0;
        min-width: 50px;
        padding: 0 10px;
      }
    }
    .el-form-item__label, .el-form-item__content {
      font-size: 12px;
      line-height: 30px
    }
  }

</style>
