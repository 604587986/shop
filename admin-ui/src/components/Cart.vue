<template>
    <div class='cartContainer'>
        <common-header></common-header>
        <div class='cartRemind'>
            <img src='../assets/img/grey-cart.png'>
            <p>登陆后可同步电脑与手机购物车</p>
            <x-button mini type='warn' link='/login'>登录</x-button>
        </div>
        <div class='coupon'>
            <div>
                <img src='../assets/img/coupon.png'>
                <div class='topRight'>
                    <p>每日神券</p>
                    <p class='grey'>限量发放,快去抢</p>
                </div>
            </div>
            <div>
                <img src='../assets/img/attention.png'>
                <div class='topRight'>
                    <p>我的关注</p>
                    <p class='grey'>你关心的都在这里</p>
                </div>
            </div>
        </div>
        <div class='bigGift'>
            <img src='../assets/img/big-gift.png'>
        </div>
        <div class='boundaryLine'>
            <span>商城热卖</span>
        </div>
        <div class='goodsSection'>
            <template v-for='good in goods'>
                <div class='good' :key='good.length'>
                    <img :src='good.img'>
                    <p class='name'>{{good.name.length>27 ? `${good.name.substring(0,27)}...` : good.name}}</p>
                    <p class='goodBottom'>
                        <span class='price'>
                            <span>¥</span>
                            {{good.price}}
                        </span>
                        <span class='cartBox'>
                            <img class='icon' src='../assets/img/small-grey-cart.png'>
                        </span>
                    </p>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import Header from '@/components/common/Header'
import { XButton } from 'vux'

export default {
    name: 'Cart',
    data() {
        return {
            goods: [{
                img: 'https://img10.360buyimg.com/n7/jfs/t3799/19/1509763179/34348/d642997f/5829d108N788ac02b.jpg',
                name: '玖嘉久魔兽战机16万跑分/AMD7650K四核主机/独显8G LOL游戏家用台式机电脑整机 电脑主机 配置一 2G核显 16万跑分',
                price: '998',
            }, {
                img: 'https://img10.360buyimg.com/n7/jfs/t3799/19/1509763179/34348/d642997f/5829d108N788ac02b.jpg',
                name: '玖嘉久魔兽战机16万跑分/AMD7650K四核主机/独显8G LOL游戏家用台式机电脑整机 电脑主机 配置一 2G核显 16万跑分',
                price: '998',
            }, {
                img: 'https://img10.360buyimg.com/n7/jfs/t3799/19/1509763179/34348/d642997f/5829d108N788ac02b.jpg',
                name: '玖嘉久魔兽战机16万跑分/AMD7650K四核主机/独显8G LOL游戏家用台式机电脑整机 电脑主机 配置一 2G核显 16万跑分',
                price: '998',
            }, {
                img: 'https://img10.360buyimg.com/n7/jfs/t3799/19/1509763179/34348/d642997f/5829d108N788ac02b.jpg',
                name: '玖嘉久魔兽战机16万跑分/AMD7650K四核主机/独显8G LOL游戏家用台式机电脑整机 电脑主机 配置一 2G核显 16万跑分',
                price: '998',
            }, {
                img: 'https://img10.360buyimg.com/n7/jfs/t3799/19/1509763179/34348/d642997f/5829d108N788ac02b.jpg',
                name: '玖嘉久魔兽战机16万跑分/AMD7650K四核主机/独显8G LOL游戏家用台式机电脑整机 电脑主机 配置一 2G核显 16万跑分',
                price: '998',
            }, {
                img: 'https://img10.360buyimg.com/n7/jfs/t3799/19/1509763179/34348/d642997f/5829d108N788ac02b.jpg',
                name: '玖嘉久魔兽战机16万跑分/AMD7650K四核主机/独显8G LOL游戏家用台式机电脑整机 电脑主机 配置一 2G核显 16万跑分',
                price: '998',
            }, {
                img: 'https://img10.360buyimg.com/n7/jfs/t3799/19/1509763179/34348/d642997f/5829d108N788ac02b.jpg',
                name: '玖嘉久魔兽战机16万跑分/AMD7650K四核主机/独显8G LOL游戏家用台式机电脑整机 电脑主机 配置一 2G核显 16万跑分',
                price: '998',
            },]
        }
    },
    components: {
        CommonHeader: Header,
        XButton,
    }
}
</script>

<style scoped>
.cartContainer {
    background: #f8f8f8;
}

.cartRemind {
    display: flex;
    background: #fff;
    height: 4.5rem;
    align-items: center;
    justify-content: space-around;
    padding: 0 8%;
}

.cartRemind p {
    font-size: 0.7rem;
    color: #bfbfbf;
    height: 1.4285714285714286rem;
    line-height: 1.4285714285714286rem;
}

.cartRemind>button {
    height: 1.4285714285714286rem;
    line-height: 1.4285714285714286rem;
    border-radius: 0;
}

.coupon {
    display: flex;
    background: #fff;
    border-top: 1px solid #ddd;
    height: 4.785714285714286rem;
    padding-top: 0.7142857142857143rem;
    left: 1.1428571428571428rem;
}

.coupon>div {
    display: flex;
    color: #f23030;
    width: 50%;
    justify-content: space-around;
}

.coupon .topRight {
    text-align: right;
}

.coupon img {
    width: 4.571428571428571rem;
    height: 4.571428571428571rem;
}

.coupon .grey {
    color: #ddd;
    font-size: 0.8rem;
}

.bigGift img {
    display: block;
    width: 26.785714285714285rem;
    height: 7.5rem;
}

.boundaryLine {
    background: #f8f8f8;
    padding: 1rem 0.8571428571428571rem;
    height: 1.2142857142857142rem;
    text-align: center;
}

.goodsSection {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.good {
    width: 13.214285714285714rem;
    height: 20.214285714285715rem;
    background: #fff;
    margin-bottom: 0.3857142857142857rem;
}

.good p {
    padding: 0 0.35714285714285715rem;
}

.good>img {
    height: 12.642857142857142rem;
}

.good .name {
    word-break: break-all;
}

.good .goodBottom{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 0.5rem;
}

.good .icon {
    width: 1.3142857142857142rem;
    height: 1.3142857142857142rem;
}

.good .price {
    color: #f23030;
    font-size: 1.2857142857142858rem;
}

.good .price span {
    font-size: 1rem;
}

.good .cartBox {
    border: 1.5px solid #edefef;
    display: inline-block;
    width: 1.6142857142857142rem;
    height: 1.6142857142857142rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.good .cartBox img{
    display: block;
}
</style>
