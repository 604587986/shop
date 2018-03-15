<template>
  <div>
    <div id="login" class="login w">
      <!-- logo -->
      <div class="index-login">
        <a target="_blank" href="/">
          <img src="~/static/images/logo-javashop.png" alt="logo">
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
          <div class="banner-img" :style="{background: 'url('+ login_banner +') no-repeat center center;background-size: cover'}"></div>
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
                      <span><nuxt-link to="/find-pwd">忘记密码</nuxt-link></span>
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
    name: 'Login',
    data() {
      return {
        login_type: 'quick',
        login_banner: 'http://data.andste.cc/developers/web/temp/images/background-banner.jpg'
      }
    },
    methods: {
      /** 登陆事件 */
      handleLogin() {
        console.log(this.login_type)
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .login .index-login {
    width: 1000px;
    margin: 20px auto;
    height: 60px;
    a {
      float: left;
      width: 245px;
      height: 60px;
    }
    img {
      width: 240px;
      height: 60px;
    }
    span {
      font-size: 23px;
      float: left;
      display: block;
      margin: 25px 5px;
    }
  }

  .content .prompt {
    width: 100%;
    text-align: center;
    background: #fff8f0;
    margin: 0 auto;
    padding: 10px 0;
    padding: 17px 0px\0;
    /* ie8下显示此样式 */
    a {
      color: black;
    }
  }

  .content .login-banner {
    background: #FF5E18;
    width: 100%;
    .bg-banner {
      width: 1200px;
      margin: 0 auto;
      position: relative;
      .banner-img {
        height: 560px;
      }
      .login-box {
        float: right;
        position: absolute;
        right: 20px;
        top: 20px;
        width: 346px;
        background: #ffffff;
      }
    }
  }

  .login-box .login-form .tips-wapper {
    background: #fff8f0;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    p {
      font-size: 12px;
      color: #999;
    }
  }

  .login-box .login-form .login-tab {
    height: 60px;
    border-bottom: 1px solid #f4f4f4;
    ul li {
      float: left;
      width: 50%;
      padding: 20px 0;
      text-align: center;
      font-size: 20px;
      cursor: pointer;
      a {
        display: block;
        height: 18px;
        width: 99%;
        &:hover {
          color: #f42424;
        }
      }
      .tab-a {
        border-right: 1px solid #f4f4f4;
      }
    }
  }

  .login-form .login-interface .account-login {
    display: block;
  }

  .login-form .login-interface .login-show form {
    width: 280px;
    margin: 25px auto;
  }

  .active {
    color: #f42424;
  }

  .login-interface form .item.focus {
    border-color: #666;
    label {
      border-color: #666;
      .iconfont {
        color: #666;
      }
    }
  }

  .login-interface form .item-form-t {
    width: 225px !important;
    height: 30px;
    border: 0 !important;
    button {
      width: 100%;
      height: 100%;
      cursor: pointer;
      border-radius: 3px;
    }
  }

  .login-interface .quick-form .item {
    position: relative;
    width: 100%;
    height: 35px;
    margin-bottom: 10px;
    border: 1px solid #bdbdbd;
  }

  .login-interface .account-form .item {
    position: relative;
    width: 100%;
    height: 35px;
    margin-bottom: 25px;
    border: 1px solid #bdbdbd;
  }

  .validcode-img {
    position: absolute;
    top: 0;
    right: 0;
    width: 85px;
    height: 35px;
    cursor: pointer;
  }

  .login-interface form .item label {
    width: 35px;
    height: 35px;
    float: left;
    display: inline-block;
    border-right: 1px solid #bdbdbd;
  }

  .login-interface form .item .iconfont {
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 35px;
    color: #666;
  }

  .login-interface form .item input {
    display: inline-block;
    height: 35px;
    line-height: 35px;
    width: 225px;
    padding-left: 10px;
  }

  .login-interface form .forget {
    height: 18px;
    margin: 20px 0;
  }

  .login-interface form .forget span {
    float: right;
  }

  .login-interface form .form-sub {
    width: 100%;
    height: 35px;
    background: #f42424;
    text-align: center;
    margin: 10px 0;
    cursor: pointer;
    color: #fff;
    font-size: 14px;
    transition: background ease-out .2s;
  }

  .login-interface form .form-sub:hover {
    background: #f65555;
  }

  .login-box .login-form .other-login {
    height: 50px;
    border-top: 1px solid #f4f4f4;
    padding: 0 20px;
    background-color: #fcfcfc;
  }

  .login-box .login-form .other-login ul li {
    float: left;
    line-height: 50px;
    a>span {
      padding: 0 10px;
    }
  }


  .login-box .login-form .other-login ul .other-one a>span {
    border-right: 1px solid #bdbdbd;
  }

  .login-box .login-form .other-login ul .other-right {
    float: right;
  }

  .other-login ul .other-right a {
    color: #f42424;
    font-size: 15px;
  }

  .send-sms-btn {
    width: 187px;
    height: 35px;
    border: none;
    color: #ffffff;
    background-color: #607d8b;
    transition: background ease-out .2s;
  }

  .send-sms-btn:hover {
    background-color: #516a77;
  }

  .send-sms-btn:disabled {
    background-color: #ccc;
  }
</style>
