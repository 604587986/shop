import Vue from 'vue'
import Router from 'vue-router'

import Index from 'views/Index'
import Animal from 'views/animal/Index'
import AnimalName from 'views/animal/Name'
import AnimalSize from 'views/animal/Size'
import People from 'views/animal/people/Index'
import PeopleAge from 'views/animal/people/Age'
import PeopleName from 'views/animal/people/Name'
import Info from '@/components/Info'
import StoreIndex from 'views/store/Index'
import StoreManageIndex from 'views/store/storeManage/Index'
import ReviewStore from 'views/store/storeManage/ReviewStore'
import StoreList from 'views/store/storeManage/StoreList'
import StoreInfoMaintainIndex from 'views/store/storeInfoMaintain/Index'
import ConnectPlatform from 'views/store/storeInfoMaintain/ConnectPlatform'
import MallAnnouncement from 'views/store/storeInfoMaintain/MallAnnouncement'



Vue.use(Router)

// hasSubMenu:  有子菜单?
// hasIcon: 有图标?
// hidden: 在侧栏不显示?
// alias: 路由的汉字描述

// Warning: name不能有重复值,必须唯一.(因为后续一些判断会使用name)!!!

const tempRoutes = [{
    path: '/',
    name: 'IndexRoute',
    alias: '主页',
    component: Index,
    hasSubMenu: false,
    hasIcon: true,
    hidden: true
}, {
    path: '/info',
    name: 'InfoRoute',
    alias: '简介',
    component: Info,
    hasSubMenu: false,
    hasIcon: true,
    hidden: false
}, {
    path: '/animal',
    name: 'AnaimalRoute',
    alias: '动物',
    component: Animal,
    hasSubMenu: true,
    hasIcon: true,
    hidden: false,
    children: [{
        path: 'name',
        name: 'AnimalNameRoute',
        alias: '动物名称',
        component: AnimalName,
        hasSubMenu: false,
        hasIcon: true,
        hidden: false
    }, {
        path: 'size',
        name: 'AnimalSizeRoute',
        alias: '动物大小',
        component: AnimalSize,
        hasSubMenu: false,
        hasIcon: true,
        hidden: false
    }, {
        path: 'people',
        name: 'PeopleRoute',
        alias: '人类',
        component: People,
        hasSubMenu: true,
        hasIcon: true,
        hidden: false,
        children: [{
            path: 'age',
            name: 'PeopleAgeRoute',
            alias: '人类年龄',
            component: PeopleAge,
            hasSubMenu: false,
            hasIcon: true,
            hidden: false
        }, {
            path: 'name',
            name: 'PeopleNameRoute',
            alias: '人类名称',
            component: PeopleName,
            hasSubMenu: false,
            hasIcon: true,
            hidden: false
        }]
    }]
}, {
    path: '/store',
    name: 'StoreRoute',
    alias: '店铺',
    component: StoreIndex,
    hasSubMenu: true,
    hasIcon: true,
    hidden: false,
    children: [{
        path: 'storemanage',
        name: 'StoreManageRoute',
        alias: '店铺管理',
        component: StoreManageIndex,
        hasSubMenu: true,
        hasIcon: true,
        hidden: false,
        children: [{
            path: 'storelist',
            name: 'StoreListRoute',
            alias: '店铺列表',
            component: StoreList,
            hasSubMenu: false,
            hasIcon: true,
            hidden: false
        }, {
            path: 'reviewstore',
            name: 'ReviewStoreRoute',
            alias: '审核店铺',
            component: ReviewStore,
            hasSubMenu: false,
            hasIcon: true,
            hidden: false
        }]
    }, {
        path: 'storeinfomaintain',
        name: 'StoreInfoMaintainRoute',
        alias: '店铺信息维护',
        component: StoreInfoMaintainIndex,
        hasSubMenu: true,
        hasIcon: true,
        hidden: false,
        children: [{
            path: 'mallannouncement',
            name: 'MallAnnouncementRoute',
            alias: '商城公告',
            component: MallAnnouncement,
            hasSubMenu: false,
            hasIcon: true,
            hidden: false
        }, {
            path: 'connectplatform',
            name: 'ConnectPlatformRoute',
            alias: '联系平台',
            component: ConnectPlatform,
            hasSubMenu: false,
            hasIcon: true,
            hidden: false
        }]
    }]
}]

export default new Router({
    routes: tempRoutes
})

export const routerData = tempRoutes
