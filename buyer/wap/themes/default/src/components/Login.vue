<template>
    <div class='loginContainer'>
        <common-header></common-header>
        <div class='mainSection' @keyup='isInputing'>
            <div class='form'>
                <span>账号</span>
                <input placeholder='用户名/邮箱/已验证手机' v-model='account' @focus='inputFocus[1] = true' @blur='inputFocus[1] = false'>
                <span @click='clear(1)' v-show='inputFocus[1]'>
                    <icon class='icon' type="clear"></icon>
                </span>
            </div>
            <div class='form'>
                <span>密码</span>
                <input class='inputTwo' placeholder='请输入密码' v-model='dynamicPassword' @focus='inputFocus[2] = true' @blur='inputFocus[2] = false'>
                <span @click='passwordController = !passwordController' :class='["passwordControl",passwordController ? "showPassword": "hidePassword"]'></span>
                <span @click='clear(2)' v-show='inputFocus[2]'>
                    <icon class='icon' type="clear"></icon>
                </span>
            </div>
            <div class='form phone' v-show='turnOnValidate'>
                <input placeholder='请输入手机号' v-model='phone' @focus='inputFocus[3] = true' @blur='inputFocus[3] = false'>
                <span @click='clear(3)' v-show='inputFocus[3]'>
                    <icon class='icon' type="clear"></icon>
                </span>
                <span>获取验证码</span>
            </div>
            <div class='form validate' v-show='turnOnValidate'>
                <input placeholder='请输入收到的验证码' v-model='validateCode' @focus='inputFocus[4] = true' @blur='inputFocus[4] = false'>
                <span @click='clear(4)' v-show='inputFocus[4]'>
                    <icon class='icon' type="clear"></icon>
                </span>
            </div>
    
            <div class='loginButton login' :styleObj='loginButtonStyle'>
                登录
            </div>
            <div class='loginOneStep login'>
                一键登录
            </div>
            <div class='quickNav'>
                <router-link :to='{name: "Home"}'>
                    <i class='forgetPassword'></i>
                    <span>忘记密码</span>
                </router-link>
                <router-link :to='{name: "Home"}'>
                    <i class='quickRegister'></i>
                    <span>手机快速注册</span>
                </router-link>
            </div>
            <divider class='divider'>其他登录方式</divider>
            <div class='otherLoginWay'>
                <div>
                    <router-link :to='{name: "Home"}'>
                        <i class='qq'></i>
                        <span>QQ</span>
                    </router-link>
                </div>
                <div>
                    <router-link :to='{name: "Home"}'>
                        <i class='weChat'></i>
                        <span>微信</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Group, XInput, Icon, Divider } from 'vux'
import Header from '@/components/common/Header'

export default {
    name: 'Login',
    data() {
        return {
            validateCode: '',
            phone: '',
            account: '',
            password: '', //永远存储真实的密码值
            dynamicPassword: '', // 用来实现密码的显隐
            passwordController: false,  // 显示密码?
            inputFocus: {
                1: false,
                2: false,
                3: false,
                4: false,
            }, // 控制四个input的聚焦状态
            turnOnValidate: false, // 开启验证模式 ? (显示手机,验证码框)
            loginButtonStyle: {},
        }
    },
    methods: {
        clear(which) {
            switch (which) {
                case 1:
                    this.account = '';
                    break;
                case 2:
                    this.dynamicPassword = '';
                    break;
                case 3:
                    this.phone = '';
                    break;
                case 4:
                    this.validateCode = '';
                    break;
            }
        },
        computeInputValue(){
            // 计算用户有没有在给出的输入
        }
    },
    watch: {
        dynamicPassword(val) {
            // 控制密码框的逻辑:

            // 涉及到: 显隐and增删 四种状态 
            console.log(val)
            // 密码显示状态
            if (this.passwordController) {
                this.password = val
            } else {
                // 密码隐藏状态
                var numberDeleted = this.password.length - val.length; // 删除的字符数量
                if (numberDeleted > 0) {
                    this.password = this.password.substring(0, this.password.length - numberDeleted)
                } else {
                    // 把最后一个字符加到密码里
                    // 如果输入字符中全是*的话,return.一是组织用户输入*号.二是组织程序掉进watch循环
                    if (val.search(/[^\*]/) < 0) {
                        return
                    }
                    this.password += val.substr(-1)
                    // 显示出和密码数量相同的 * 号
                    this.dynamicPassword = '*'.repeat(this.password.length)
                }
            }
        },
        passwordController(val) {
            // 切换密码的显隐状态
            val ? this.dynamicPassword = this.password : this.dynamicPassword = '*'.repeat(this.password.length)
        }
    },
    components: {
        CommonHeader: Header,
        Group,
        XInput,
        Icon,
        Divider
    }

}
</script>

<style scoped>
.mainSection {
    padding: 1.4285714285714286rem;
    padding-top: 0px;
}

.form {
    border-bottom: 1px solid rgb(215, 215, 215);
    /* width: 80%; */
    height: 3.357142857142857rem;
    display: flex;
    align-items: center;
}

.form input {
    height: 1.4285714285714286rem;
    width: 75%;
    border: 1px solid transparent;
    outline: none;
    margin-left: 1.5rem;
    font-size: 1rem;
}

.form.phone input {
    width: 60%;
}

.form.validate input {
    width: 83.5%;
}

.form .inputTwo {
    width: 66%;
}

.form .icon {
    font-size: 1.5rem;
    opacity: 0.7;
}

::-moz-placeholder {
    color: #ccc;
}

::-webkit-input-placeholder {
    color: #ccc;
}

:-ms-input-placeholder {
    color: #ccc;
}

.showPassword {
    background: url('../assets/img/show-password.png');
}

.hidePassword {
    background: url('../assets/img/hide-password.png');
}

.passwordControl {
    display: inline-block;
    width: 2.142857142857143rem;
    height: 1.2857142857142858rem;
    background-size: cover;
    background-repeat: no-repeat;
}

.login {
    height: 3.2142857142857144rem;
    text-align: center;
    line-height: 3.2142857142857144rem;
}

.loginButton {
    margin-top: 2.142857142857143rem;
    color: #848689;
    background: #eee;
}

.loginOneStep {
    margin-top: 0.7142857142857143rem;
    border: 1px solid red;
    color: red;
}

.quickNav {
    height: 1.5714285714285714rem;
    margin-top: 1.4285714285714286rem;
    display: flex;
    justify-content: space-between;
}

.quickNav a,
.otherLoginWay a {
    color: #333;
    font-size: 0.8571428571428571rem;
}

.quickNav i,
.otherLoginWay i {
    position: absolute;
    overflow: hidden;
    background: url('../assets/img/loginImgs.png');
    display: inline-block;
    width: 1.5714285714285714rem;
    height: 1.5714285714285714rem;
    background-repeat: no-repeat;
    background-size: 100% auto;
}

.quickNav .forgetPassword {
    background-position: 0rem -1.65rem;
}

.quickNav .quickRegister {
    background-position: 0rem -3rem;
}

.quickNav span {
    margin-left: 1.7rem;
    line-height: 1.5714285714285714rem;
}

.divider {
    margin: 7.5rem 0 0.9rem 0;
    color: #bfbfbf;
}

.otherLoginWay {
    display: flex;
    justify-content: space-between;
}

.otherLoginWay>div {
    display: flex;
    width: 40%;
    height: 20rem;
}

.otherLoginWay>div:first-child {
    justify-content: flex-end;
    align-content: flex-start;
}

.otherLoginWay>div:last-child {
    justify-content: flex-start;
    align-content: flex-start;
}

.otherLoginWay .qq {
    background-position: 0rem -9.2rem;
}

.otherLoginWay .weChat {
    background-position: 0rem -11.1rem;
}

.otherLoginWay span {
    display: inline-block;
    margin-top: 1.5rem;
}
</style>

<style>

</style>
