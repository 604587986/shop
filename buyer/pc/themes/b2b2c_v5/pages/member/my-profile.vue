<template>
  <div id="my-profile">
    <div class="member-nav">
      <ul class="member-nav-list">
        <li class="active">个人资料</li>
      </ul>
    </div>
    <div class="profile-container">
      <el-form :model="profileForm" :rules="profileRules" ref="profileForm" label-width="100px" style="width:350px">
        <el-form-item label="账户名称">
          <span>{{ profileForm.username }}</span>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input clearable></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="profileForm.sex" :label="1">男</el-radio>
          <el-radio v-model="profileForm.sex" :label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
            v-model="profileForm.birthday"
            type="date"
            placeholder="请选择生日"
            :editable="false"
            clearable
            :picker-options="{disabledDate(time) { return time.getTime() > Date.now() }}"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地区">
          <en-address-select @changed="handleAddressSelectChanged"/>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input clearable></el-input>
        </el-form-item>
        <el-form-item label="邮编">
          <el-input clearable></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button>保存资料</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'
  import { AddressSelect } from '@/components'
  export default {
    name: 'my-profile',
    components: {
      [AddressSelect.name]: AddressSelect
    },
    data() {
      return {
        profileForm: {},
        profileRules: {}
      }
    },
    mounted() {
      window.axios = axios
    },
    computed: {
      ...mapGetters({
        user: 'user/user'
      })
    },
    methods: {
      /** 地区选择器值发生改变 */
      handleAddressSelectChanged(object) {
        console.log(object)
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .profile-container {
    padding-top: 15px;
    /deep/ .el-date-editor.el-input { width: 100% }
    /deep/ .app-address { margin-top: 7px }
  }
</style>
