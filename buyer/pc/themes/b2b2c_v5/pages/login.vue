<template>
  <div id="login">
    <div class="login w">
      <!-- logo -->
      <div class="index-login">
        <a target="_blank" href="/">
          <img src="../assets/images/logo-javashop.png" alt="logo">
        </a>
        <span>欢迎登录</span>
      </div>
    </div>
    <!-- 大图 -->
    <div class="content">
      <div class="prompt">
        <div>
          <i></i>
          <p>依据《网络安全法》，为保障您的账户安全和正常使用，请尽快完成手机号验证！ 新版<a href="#">《javashop隐私政策》</a>已上线，将更有利于保护您的个人隐私。</p>
        </div>
      </div>
      <div class="login-banner">
        <div class="bg-banner">
          <div class="banner-img"></div>
          <!-- 登录页 -->
          <div class="login-box">
            <div class="login-form">
              <div class="tips-wapper">
                <i></i>
                <p>Javashop不会以任何理由要求您转账汇款，谨防诈骗。</p>
              </div>
              <div class="login-tab">
                <ul>
                  <li @click="login_type = 'quick'">
                    <a :class="['tab-a', login_type === 'quick' ? 'active' : '']">快捷登录</a>
                  </li>
                  <li @click="login_type = 'account'">
                    <a :class="[login_type === 'account' ? 'active' : '']">账号登录</a>
                  </li>
                </ul>
              </div>
              <div class="login-interface">
                <div v-show="login_type === 'quick'" class="login-show quick-login">
                  <form class="quick-form">
                    <div class="item item-form-o">
                      <label for="mobile">
                        <i class="iconfont ea-icon-mobile"></i>
                      </label>
                      <input id="mobile" placeholder="请输入手机号" maxlength="11" autofocus>
                    </div>
                    <div class="item">
                      <label for="validcode-mobile">
                        <i class="iconfont ea-icon-safe"></i>
                      </label>
                      <input id="validcode-mobile" placeholder="图片验证码" maxlength="4">
                      <img class="validcode-img" src="http://data.andste.cc/developers/web/temp/images/validcode-img.png">
                    </div>
                    <div class="item item-form-t">
                      <button class="send-sms-btn" type="button">获取手机验证码</button>
                    </div>
                    <div class="item item-form-p">
                      <label for="sms-code">
                        <i class="iconfont ea-icon-sms"></i>
                      </label>
                      <input id="sms-code" placeholder="短信验证码" maxlength="6">
                    </div>
                    <div class="forget">
                      <span><nuxt-link to="/find-password">忘记密码</nuxt-link></span>
                    </div>
                    <button class="form-sub" type="button" @click="handleLogin">登&nbsp;&nbsp;&nbsp;录</button>
                  </form>
                </div>
                <div v-show=" login_type === 'account'" class="login-show account-login">
                  <form class="account-form">
                    <div class="item">
                      <label for="username">
                        <i class="iconfont ea-icon-persion"></i>
                      </label>
                      <input id="username" placeholder="邮箱/用户名/已验证手机" maxlength="20">
                    </div>
                    <div class="item">
                      <label for="password">
                        <i class="iconfont ea-icon-password"></i>
                      </label>
                      <input id="password" placeholder="请输入密码" maxlength="20">
                    </div>
                    <div class="item">
                      <label for="validcode">
                        <i class="iconfont ea-icon-safe"></i>
                      </label>
                      <input id="validcode" placeholder="图片验证码" maxlength="4">
                      <img class="validcode-img" src="http://data.andste.cc/developers/web/temp/images/validcode-img.png">
                    </div>
                    <div class="forget">
                      <span><nuxt-link to="/find-pwd">忘记密码</nuxt-link></span>
                    </div>
                    <button class="form-sub" type="button" @click="handleLogin">登&nbsp;&nbsp;&nbsp;录</button>
                  </form>
                </div>
              </div>
              <!-- 立即注册 -->
              <div class="other-login">
                <ul>
                  <li class="other-one">
                    <a href="#">
                      <b></b>
                      <span>QQ</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <b></b>
                      <span>微信</span>
                    </a>
                  </li>
                  <li class="other-right">
                    <nuxt-link to="/register" class="registered">
                      <b></b>立即注册
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    layout: 'full',
    data() {
      return {
        login_type: 'quick',
        login_banner: 'http://data.andste.cc/developers/web/temp/images/background-banner.jpg'
      }
    },
    methods: {
      /** 登录事件 */
      handleLogin() {
        this.$message.success('登录方式：', this.login_type)
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../assets/styles/login";
</style>
