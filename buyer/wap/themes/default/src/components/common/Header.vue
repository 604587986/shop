<template>
    <div class='headerContainer' :style='headerContainerStyle'>
        <div @click='goBack' class='backIcon' :style='backIconStyle'>
            <x-icon type="ios-arrow-back" size="30"></x-icon>
        </div>
        <div class='searchBox' :style='searchBoxStyle'>
            <search v-if='type==1' placeholder='搜索商品/店铺' v-model='searchValue'></search>
            <p v-else class='labelName'>{{labelName}}</p>
        </div>
        <div :style='loginStyle' :class='["login",type===1 ? "loginWhite" : "loginBlack"]'>
            <router-link to="/login">登录</router-link>
        </div>
    </div>
</template>

<script>
import { Search } from 'vux'

export default {
    name: 'CommonHeader',
    data() {
        return {
            type: 0, // type===1 表示首页. 0 表示其他页
            searchValue: '',
            backIconStyle: {},
            searchBoxStyle: {},
            headerContainerStyle: {},
            loginStyle: {}, // 仅控制显隐的样式
        }
    },
    computed: {
        labelName() {
            switch (this.$route.path) {
                case '/cart':
                    return '购物车';
                case '/category':
                    return '分类';
                case '/member':
                    return '我的';
                case '/login':
                    return '商城登录';
            }
        }
    },
    methods: {
        goBack() {
            // 返回上一条浏览记录.
            if (this.$route.path != '/') {
                this.$router.go(-1);
            }
        },
    },
    mounted() {
        // 如果是首页
        // 改变样式
        if (this.$route.path === '/') {
            this.type = 1
            this.backIconStyle.display = 'none'
            this.searchBoxStyle = {
                display: 'block',
                width: '88%',
                'margin-left': 0,
            }
            this.headerContainerStyle.background = '#e12f32'

        } else {
            if (this.$route.path === '/login') {
                this.loginStyle.visibility = 'hidden';
            }
            this.type = 0
            this.backIconStyle.display = 'flex'
            this.searchBoxStyle = {
                display: 'block',
                width: '84%',
                'margin-left': '-0.6rem',
            }
            this.headerContainerStyle = {
                background: '#f4f4f4',
                'border-bottom': '1px solid #ddd',
            }
        }
    },
    created() {
        console.log('created');
    },
    beforeCreate() {
        console.log('beforecreated');
    },
    components: {
        Search,
    }
}
</script>

<style scoped>
.headerContainer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 3rem;
}

.headerContainer>div.searchBox {
    width: 84%;
    height: 2.5rem;
    margin-left: -0.6rem;
    position: relative;
    top: -0.286851rem;
}

.headerContainer>div.login {
    position: relative;
    left: -0.2rem;
    top: 0.1rem;
}

.headerContainer>div.login a {
    color: black;
}

.headerContainer .backIcon {
    display: flex;
    align-items: center;
}

.headerContainer .labelName {
    line-height: 3.5rem;
    height: 3rem;
    text-align: center;
    letter-spacing: 0.14285714285714285rem;
    font-size: 1.1rem;
}

.headerContainer div.loginWhite a {
    color: white;
}

.headerContainer div.loginBlack a {
    color: black;
}
</style>

<style>
/* 调整vux搜索框的样式 */

.headerContainer div.vux-search-box>div.weui-search-bar {
    background: #e12f32;
    padding-bottom: 0.5rem;
}

.headerContainer div.vux-search-box>div.weui-search-bar .weui-search-bar__form {
    border-radius: 1rem;
}

.headerContainer div.vux-search-box.vux-search-fixed>div.weui-search-bar.weui-search-bar_focusing>a {
    font-size: 0.8rem;
}

.headerContainer div.vux-search-box>div.weui-search-bar .weui-search-bar__form .weui-search-bar__cancel-btn {
    font-size: 0.5rem;
}

.headerContainer>div.searchBox>div>div.weui-search-bar.weui-search-bar_focusing>a {
    color: white;
}
</style>
