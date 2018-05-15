<template>
  <el-dialog title="新增赠品" :visible.sync="giftShow" width="40%" align="center">
    <el-form :model="giftModelForm" label-position="right" label-width="160px">
      <el-form-item label="赠品名称">
        <el-input
          auto-complete="off"
          v-model="giftModelForm.gift_name"
          placeholder="不超过20个字"
          label-width="100"></el-input>
      </el-form-item>
      <el-form-item label="赠品价格">
        <el-input auto-complete="off"  v-model="giftModelForm.gift_price" label-width="100"></el-input>
      </el-form-item>
      <el-form-item label="赠品库存">
        <el-input auto-complete="off"  v-model="giftModelForm.gift_usable_stock" label-width="100"></el-input>
      </el-form-item>
      <el-form-item label="赠品图片">
        <el-upload
          class="upload-demo"
          :action="BASE_IMG_URL"
          :file-list="fileList"
          :limit="1"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancelGifts">取 消</el-button>
      <el-button type="primary" @click="handleReserveGifts">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import * as API_Gift from '@/api/gift'
  export default {
    name: 'AddGift',
    props: {
      /** 当前赠品id */
      currentGiftId: {
        type: [String, Number],
        default: () => {
          return ''
        }
      },

      /** 赠品弹框显示*/
      giftModelShow: {
        type: Boolean,
        default: false
      },

      /** 赠品编辑表单*/
      giftForm: {
        type: [Object, String],
        default: () => {
          return {}
        }
      }
    },
    watch: {
      giftModelShow() {
        this.giftShow = this.giftModelShow
      },

      giftForm() {
        if (this.giftForm) {
          this.giftModelForm = { ...this.giftForm }
        } else {
          this.giftModelForm = {
            gift_name: '',

            gift_image: '',

            gift_price: 2,

            gift_real_stock: 8,

            gift_usable_stock: 2,

            gift_creat_time: ''
          }
        }
      }
    },
    data() {
      return {
        /** 图片服务器地址 */
        BASE_IMG_URL: process.env.BASE_IMG_URL,

        giftShow: false,

        /** 赠品编辑表单*/
        giftModelForm: {

          /** 赠品名称 */
          gift_name: '',

          /** 赠品图片 */
          gift_image: '',

          /** 赠品价格 */
          gift_price: 1,

          /** 实际库存 */
          gift_real_stock: 1,

          /** 可用库存 */
          gift_usable_stock: 2,

          /** 创建时间 */
          gift_creat_time: ''
        },

        /** 存储上传的图片*/
        fileList: []
      }
    },
    methods: {
      /** 取消 */
      handleCancelGifts() {
        this.$emit('saveGift', false)
      },

      /** 保存赠品*/
      handleReserveGifts() {
        if (this.currentGiftId) {
          // 更新
          API_Gift.saveGifts(this.currentGiftId, this.giftModelForm).then(() => {
            this.giftShow = false
            this.$message.success('保存成功！')
            this.$emit('saveGift', true)
          }).catch((error) => this.$message.error(error))
        } else {
          // 新增
          API_Gift.addGifts(this.giftModelForm).then(() => {
            this.giftShow = false
            this.$message.success('保存成功！')
            this.$emit('saveGift', true)
          }).catch((error) => this.$message.error(error))
        }
      }
    }
  }
</script>

<style lang="scss" type="scss" scoped>

</style>
