<template>
  <div class="login-container">
    <!--顶部导航-->
    <Navtop></Navtop>
    <!--登录-->
    <el-carousel indicator-position="none">
      <!--背景轮播-->
      <el-carousel-item v-for="item in 4" :key="item">
        <div class="login"></div>
      </el-carousel-item>
      <!--登录表单-->
      <div class="container">
        <div class="login-form">
          <h3> 商户卖家登录 </h3>
          <h5>请使用卖家账户可登录后进入店铺或申请开店</h5>
          <el-form :model="loginForm" size="large">
            <el-form-item label="商家账号" :label-width="formLabelWidth">
              <el-input v-model="loginForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="登录密码" :label-width="formLabelWidth">
              <el-input v-model="loginForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码" :label-width="formLabelWidth">
              <el-input placeholder="验证码" v-model="loginForm.name">
                <template slot="append">
                  <img src="http://yiqisi.s1.natapp.cc/base-api/captchas/880faf50-9f66-11e8-a0a7-f12ce8235848/LOGIN?rmd=1534218102051" alt="" class="verification-code">
                </template>
              </el-input>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
              <el-button type="primary" @click="">确认登录</el-button>
            </el-form-item>
          </el-form>
          <div class="to-register">
            还没有成为我们的合作伙伴？<a @click="handleRegister">快速注册</a>
          </div>
        </div>
      </div>
    </el-carousel>
    <!--申请开店流程-->
    <div class="container">
      <div class="shop-process  container">
        <h2>申请开店流程</h2>
        <p>商家按照下面的流程步骤，即可在本商城开设您的店铺。</p>
        <ul class="index-joinin-step">
          <li class="step" v-for="item in steps">
            <div class="step-info">
              <img :src="item.stepImg">
              <p>{{ item.text1 }}</p>
              <p>{{ item.text2 }}</p>
            </div>
            <i class="arrow el-icon-arrow-right"></i>
          </li>
        </ul>
      </div>
    </div>
    <!--入驻指南-->
    <div class="admission container">
      <h2>入驻指南</h2>
      <p>了解商家入驻指南，提供完善的资料，快速开通店铺。</p>
      <el-tabs type="card" stretch>
        <el-tab-pane label="资费标准">资费标准</el-tab-pane>
        <el-tab-pane label="资质要求">资质要求</el-tab-pane>
        <el-tab-pane label="招商标准">招商标准</el-tab-pane>
        <el-tab-pane label="招商方向">招商方向</el-tab-pane>
      </el-tabs>
    </div>
    <!--注册-->
    <el-dialog :visible.sync="registerFormDialog" width="30%">
      <div slot="title" class="dialog-title">
       <h2>商家账号注册</h2>
       <h5>Bizpower【B2B2C】平台提供各类专业管家服务，协助您开通店铺、运营店铺、组织营销活动及分析运营数据，悉心为您解答各类疑问，引导您按相关规则展开运营；我们将竭尽全力，为您的店铺保驾护航。
       </h5>
      </div>
      <el-form :model="registerForm">
        <el-form-item label="会员登陆用户名" :label-width="registerFormLabelWidth">
          <el-input v-model="registerForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员手机号码" :label-width="registerFormLabelWidth">
          <el-input v-model="registerForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="registerFormLabelWidth">
          <el-input v-model="registerForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="短信验证码" :label-width="registerFormLabelWidth">
          <el-input v-model="registerForm.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="">提交注册</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Navtop from './components/Navtop'
  export default {
    name: 'login',
    components: {
      Navtop
    },
    data() {
      return {

        /** 登录表单 */
        loginForm: {

        },

        /* 商家商户注册 */
        registerFormDialog: false,

        /** 注册表单 */
        registerForm: {

        },

        /** 登录表单label宽度 */
        formLabelWidth: '80px',

        /** 注册表单label宽度 */
        registerFormLabelWidth: '120px',

        /** 申请开店流程 */
        steps: [
          {
            stepImg: 'http://img.zcool.cn/community/010a3f574d52de32f875a429122cba.jpg@1280w_1l_2o_100sh.jpg',
            text1: '注册商家账号',
            text2: '登录后申请开店'
          },
          {
            stepImg: 'http://img.zcool.cn/community/010a3f574d52de32f875a429122cba.jpg@1280w_1l_2o_100sh.jpg',
            text1: '在线申请开店',
            text2: '提交相关信息'
          },
          {
            stepImg: 'http://img.zcool.cn/community/010a3f574d52de32f875a429122cba.jpg@1280w_1l_2o_100sh.jpg',
            text1: '申请提交平台',
            text2: '审核商家资料'
          },
          {
            stepImg: 'http://img.zcool.cn/community/010a3f574d52de32f875a429122cba.jpg@1280w_1l_2o_100sh.jpg',
            text1: '缴纳相关费用',
            text2: '提交付款凭证'
          },
          {
            stepImg: 'http://img.zcool.cn/community/010a3f574d52de32f875a429122cba.jpg@1280w_1l_2o_100sh.jpg',
            text1: '平台审核开通',
            text2: '进入店铺管理'
          }
        ]
      }
    },
    mounted() {

    },
    methods: {
      /** 显示注册 */
      handleRegister() {
        this.registerFormDialog = true
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped >
  .login-container {
    background-color: white;
  }
  .container {
    width: 1200px;
    margin: 0 auto;
  }
  /deep/ .el-carousel__container {
    width: 100%;
    height: 600px;
    position:relative;
    .login {
      width: 100%;
      height: 600px;
      background: url("http://java.bizpower.com/seller/static/img/joinin/banner_02.png");
    }
    .container {
      position: absolute;
      left: calc((100% - 1200px) / 2);
      z-index: 1000;
      width: 1200px;
      height: 600px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      .login-form {
        width: 400px;
        background: rgba(255, 255, 255, .9);
        border-radius: 5px;
        h3 {
          display: block;
          height: 30px;
          margin: 20px 0 0;
          text-align: center;
          font-size: 24px;
          font-weight: normal;
          line-height: 30px;
          color: #333;
        }
        h5 {
          display: block;
          height: 30px;
          text-align: center;
          font-size: 13px;
          font-weight: normal;
          line-height: 30px;
          color: #999;
        }
        form {
          margin: 0 20px;
          /deep/ .el-input-group__append {
            padding: 0;
            margin: 0;
            border: 0;
            .verification-code {
              width: 90px;
              height: 40px;
              display: block;
              cursor: pointer;
            }
          }
        }
        .to-register {
          width: 100%;
          color: #CCC;
          background: rgba(0,0,0,0.5);
          text-align: center;
          padding: 10px 0;
          border-radius: 0 0 5px 5px;
          line-height: 30px;
          font-size: 14px;
          a {
            color: #FF0;
          }
        }
      }
    }
  }

  /*申请开店流程*/
  .index-joinin-step {
    padding: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    font-size: 0;
    margin: 40px auto 60px auto;
    overflow: hidden;
    li {
      list-style: none;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      div.step-info {
        display: inline-block;
        img {
          width: 100px;
          height: 100px;
          border: none;
          border-radius: 50%;
        }
        p {
          margin: 5px 0;
          font-size: 12px;
          color: #666;
        }
      }
      i.arrow {
        margin: 0 0 35px 55px ;
        display: inline-block;
        width: 22px;
        height: 22px;
        font-weight: bold;
        font-size: 26px;
        font-family: "Yuanti SC", Arial, "Yuanti SC", Helvetica, sans-serif;
        color: #aaa;
      }
    }
  }
  /*入驻*/
  .admission, .shop-process{
    h2 {
      font: lighter 28px/36px "microsoft yahei";
      color: #333;
      text-align: center;
    }
    p {
      font: lighter 14px/20px "microsoft yahei";
      color: #999;
      text-align: center;
    }
  }

  .dialog-title {
    h2 {
      font-size: 16px;
    }
    h5 {
      margin: 0;
      line-height: 16px;
      font: lighter 12px/20px "microsoft yahei";
      color: #666;
      padding: 0px 15px 0 15px;
    }
  }
</style>
