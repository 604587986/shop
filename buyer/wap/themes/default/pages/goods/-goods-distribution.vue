<template>
  <van-popup v-model="show" position="bottom" style="height:100%">
    <van-nav-bar title="推荐商品" @click-right="$emit('close')">
      <i class="iconfont ea-icon-close" slot="right"/>
    </van-nav-bar>
    <div class="distribution-container">
      <qrcode-vue
        :value="config.value"
        :size="config.size"
        level="H"
        style="text-align: center; padding: 10px 0;">
      </qrcode-vue>
      <div style="margin: 20px 0">
        <van-cell-group>
          <van-field
            v-model="config.value"
            center
            :border="false"
            clearable
            label="我的分享链接"
            placeholder="我的分享链接">
          </van-field>
        </van-cell-group>
        <div style="text-align: center;margin-top: 15px;">
          <van-button
            type="warning"
            size="normal"
            plain
            v-clipboard:copy="config.value"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">复制到剪贴板</van-button>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
  /**
   * 分销组件
   */
  import Vue from 'vue'
  import VueClipboard from 'vue-clipboard2'
  import QrcodeVue from 'qrcode.vue'

  Vue.use(VueClipboard)
  import * as API_distribution from '@/api/distribution'
  import { domain } from '~/ui-domain'
  export default {
    name: 'goods-distribution',
    props: ['show'],
    components:{ QrcodeVue },
    data() {
      return {
        /** 是否显示二维码弹框 */
        isShowQRCode: false,

        config: {
          value: '',
          size: 200
        }
      }
    },
    watch: {
      show: 'showQRCode'
    },
    methods: {
      /** 显示并生成二维码 */
      showQRCode() {
        if (!this.show) return
        /** 登录校验 */
        const { user } = this.$store.getters
        // 如果没有登录，跳转到登录页
        if (!user) {
          this.$router.push(`/login?forward=${this.$route.fullPath}`)
        } else {
          API_distribution.generateShortLink({ goods_id: this.$route.params.id}).then(response => {
            this.isShowQRCode = true
            const _query = response.message.substring(response.message.indexOf("?"), response.message.length)
            this.config.value = `${domain.buyer_pc}/goods/${this.$route.params.id}${_query}`
          })
        }
    },

      /** 复制成功 */
      onCopy(e) {
        this.$message.success('已复制')
      },

      /** 复制失败 */
      onError(e) {
        this.$message.error('无法复制文本')
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  div.distribution-container {
    padding-top: 125px;
  }
  /deep/ .van-cell, .van-button {
    font-size: 12px;
  }
  /deep/ input.van-field__control {
    font-size: 12px;
  }
</style>
