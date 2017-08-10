<template>
    <div class="indexContainer">
         <common-header></common-header> 

        <tabbar>
            <tabbar-item selected>
                <img slot="icon" src="../assets/img/home.png">
                <span slot="label">主页</span>
            </tabbar-item>
            <tabbar-item link="/category">
                <img slot="icon" src="../assets/img/category.png">
                <span slot="label">分类</span>
            </tabbar-item>
            <tabbar-item link="/cart">
                <img slot="icon" src="../assets/img/cart.png">
                <span slot="label">购物车</span>
            </tabbar-item>
            <tabbar-item link="/member">
                <img slot="icon" src="../assets/img/member.png">
                <span slot="label">我的</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
import Header from '@/components/common/Header'

export default {
    name: 'Home',
    data() {
        return {
            selected: '',
        }
    },
    components: {
        Tabbar,
        TabbarItem,
        CommonHeader: Header,
    }
}
</script>


<style scoped>
.indexContainer>div>a.mint-tab-item>div.mint-tab-item-icon img {
    display: inline-block;
    height: 2rem;
    width: 2.5rem;
    position: relative;
    top: -0.2rem;
    left: -0.8rem;
}
</style>


