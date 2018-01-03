<template>
  <div class="login-container">
    <div class="login-bg" id="login-bg"></div>
    <div class="login-form">
      <div class="login-logo">
        <img class="login-logo-img" src="../../assets/logo_images/logo-javashop-rectangle-light.png" alt="javashop">
      </div>
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="login-input">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" :placeholder="translateKey('username')" autofocus></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" :placeholder="translateKey('password')" :minlength="6" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="validcode">
          <el-input v-model="loginForm.validcode" @keyup.native.enter="submitLogin" :placeholder="translateKey('validcode')" :maxlength="4">
            <template slot="append">
              <img class="login-validcode-img" src="http://data.andste.cc/developers/web/temp/images/validcode-img.png" alt="3qnz" @click="changeValidcode">
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="submitLogin">{{translateKey('logIn')}}</el-button>
        </el-form-item>
        <lang-select class="set-language"/>
      </el-form>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import particles from 'particles.js'
import particlesjsConfig from '@/assets/particlesjs-config.json'
import LangSelect from '@/components/LangSelect'

export default {
  components: { LangSelect },
  name: 'login',
  data() {
    return {
      loading: false,
      loginForm: {
        username: 'javashop',
        password: '111111',
        validcode: '3qnz'
      },
      loginRules: {
        username: [
          { required: true, message: this.translateKey('val_username'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.translateKey('val_password'), trigger: 'blur' }
        ],
        validcode: [
          { required: true, message: this.translateKey('val_validcode'), trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.loadParticles()
  },
  methods: {
    /** 翻译 */
    translateKey(key) {
      return this.$t('login.' + key)
    },
    /** 加载背景插件 */
    loadParticles() {
      window.particlesJS('login-bg', particlesjsConfig)
    },
    /** 更换图片验证码 */
    changeValidcode() {
      this.$notify.success('验证码更换成功！')
    },
    /** 表单提交 */
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
            // this.showDialog = true
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$message.error(this.translateKey('val_form'))
          return false
        }
      })
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../../styles/mixin";
  .login-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .bg {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
  }

  $form_width: 325px;
  .login-form {
    position: absolute;
    z-index: 1;
    left: 50%;
    top: 100px;
    padding: 20px 15px;
    margin-left: -(($form_width+30px)/2);
    width: $form_width;
    background-color: #fff;
    @include box-shadow(0 0 15px 2px #d8dce5)
  }
  .login-logo {
    width: 100%;
    height: 110px;
  }
  .login-logo-img {
    width: 300px;
    height: 100px;
    margin: 0 auto;
    display: block;
  }

  .login-input {
    margin-top: 20px;
    .el-button {
      width: 100%;
    }
    /deep/ .el-input-group__append {
      padding: 0;
      margin: 0;
      border: 0;
    }
    .login-validcode-img {
      width: 90px;
      height: 36px;
      display: block;
      cursor: pointer;
    }
  }
</style>
