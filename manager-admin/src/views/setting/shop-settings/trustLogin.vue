<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="QQ信任登录">
        <el-form :model="QQForm" :rules="QQRules" ref="QQForm" label-width="130px" style="width: 500px">
          <el-form-item label="APP ID" prop="app_id">
            <el-input v-model="QQForm.api_id"></el-input>
          </el-form-item>
          <el-form-item label="APP Key" prop="app_key">
            <el-input v-model="QQForm.api_key"></el-input>
          </el-form-item>
          <el-form-item label="回调地址" prop="token_url">
            <el-input v-model="QQForm.token_url"></el-input>
          </el-form-item>
          <el-form-item label="WAP回调地址" prop="wap_token_url">
            <el-input v-model="QQForm.wap_token_url"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small">立即保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="微信信任登录">
        <el-form :model="wechatForm" :rules="wechatRules" ref="wechatForm" label-width="130px" style="width: 500px">
          <el-form-item label="APP ID" prop="app_id">
            <el-input v-model="wechatForm.api_id"></el-input>
          </el-form-item>
          <el-form-item label="APP Secret" prop="app_secret">
            <el-input v-model="wechatForm.api_key"></el-input>
          </el-form-item>
          <el-form-item label="回调地址" prop="token_url">
            <el-input v-model="wechatForm.token_url"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small">立即保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="微博信任登录">
        <el-form :model="weiboForm" :rules="weiboRules" ref="weiboForm" label-width="130px" style="width: 500px">
          <el-form-item label="APP ID" prop="app_id">
            <el-input v-model="weiboForm.api_id"></el-input>
          </el-form-item>
          <el-form-item label="APP Key" prop="app_key">
            <el-input v-model="weiboForm.api_key"></el-input>
          </el-form-item>
          <el-form-item label="回调地址" prop="token_url">
            <el-input v-model="weiboForm.token_url"></el-input>
          </el-form-item>
          <el-form-item label="WAP回调地址" prop="wap_token_url">
            <el-input v-model="weiboForm.wap_token_url"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small">立即保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import * as API_Connect from '@/api/connect'

  export default {
    name: 'trustLogin',
    data() {
      return {
        /** QQ信任登录 */
        QQForm: {},
        QQRules: {},
        /** 微信信任登录 */
        wechatForm: {},
        wechatRules: {},
        /** 微博信任登录 */
        weiboForm: {},
        weiboRules: {}
      }
    },
    mounted() {
      API_Connect.getConnect().then(response => {
        console.log(response)
      })
    },
    methods: {}
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
