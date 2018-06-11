<template>
  <el-dialog title="新增赠品" :visible.sync="giftShow" width="30%">
    <el-form :model="giftModelForm" label-position="right" :rules="rules" label-width="100px">
      <el-form-item label="赠品名称：" prop="gift_name">
        <el-input
          auto-complete="off"
          v-model="giftModelForm.gift_name"
          placeholder="不超过20个字"
          maxlength="20"
          label-width="100"></el-input>
      </el-form-item>
      <el-form-item label="赠品价格：" prop="gift_price">
        <el-input v-model.number="giftModelForm.gift_price"></el-input>
      </el-form-item>
      <el-form-item label="赠品库存：" prop="gift_real_stock">
        <el-input auto-complete="off"  v-model.number="giftModelForm.gift_real_stock"></el-input>
      </el-form-item>
      <el-form-item label="赠品图片：">
        <el-upload
          class="upload-demo"
          :action="BASE_IMG_URL"
          :file-list="fileList"
          :on-success="uploadSuccess"
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
      }
    },
    watch: {
      giftShow() {
        !this.giftShow && this.$emit('saveGift', false)
      },
      giftModelShow() {
        this.giftShow = this.giftModelShow
      },
      currentGiftId() {
        if (this.currentGiftId) {
          this.GET_giftDetails()
        } else {
          this.giftModelForm = {
            /** 赠品名称 */
            gift_name: '',

            /** 赠品图片 */
            gift_image: '',

            /** 赠品价格 */
            gift_price: 0,

            /** 实际库存 */
            gift_real_stock: 0,

            /** 可用库存 */
            gift_usable_stock: 0,

            /** 创建时间 */
            gift_creat_time: ''
          }
          this.fileList = []
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
          gift_real_stock: 0,

          /** 可用库存 */
          gift_usable_stock: 0,

          /** 创建时间 */
          gift_creat_time: ''
        },

        /** 存储上传的图片*/
        fileList: [],

        /** 校验规则 */
        rules: {
          gift_name: [
            { required: true, message: '请输入赠品名称', trigger: 'blur' }
          ],
          gift_price: [
            { required: true, message: '请输入赠品价格', trigger: 'blur' },
            { type: 'number', message: '请输入数字值', trigger: 'blur' }
          ],
          gift_usable_stock: [
            { required: true, message: '请输入赠品库存', trigger: 'blur' },
            { type: 'number', message: '请输入数字值', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
      this.currentGiftId && this.GET_giftDetails()
    },
    methods: {
      /** 查询一个赠品详情 */
      GET_giftDetails() {
        this.$nextTick(() => {
          API_Gift.getGiftDetails(this.currentGiftId, {}).then((response) => {
            this.giftModelForm = { ...response }
            this.fileList = [{ url: this.giftModelForm.gift_image }]
          })
        })
      },

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
          })
        } else {
          // 新增
          API_Gift.addGifts(this.giftModelForm).then(() => {
            this.giftShow = false
            this.$message.success('保存成功！')
            this.$emit('saveGift', true)
          })
        }
      },

      /** 上传成功之后 */
      uploadSuccess(response, file, fileList) {
        this.giftModelForm.gift_image = response.url
        this.fileList.shift()
        this.fileList.push(response)
      }
    }
  }
</script>

<style lang="scss" type="scss" scoped>
  .upload-demo {
    text-align: left;
  }
</style>
