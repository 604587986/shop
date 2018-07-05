import Vue from 'vue'
import Router from 'vue-router'
const pathToRegexp = require('path-to-regexp')

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard' }
    }]
  }
]

export const asyncRouterMap = [
  // 商品管理
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/goods-list',
    name: 'goods',
    meta: {
      title: 'goods',
      icon: 'goods-manage'
    },
    children: [
      { path: 'goods-list', component: () => import('@/views/goods/goodsList'), name: 'goodsList', meta: { title: 'goodsList', noCache: true }},
      { path: 'draft-list', component: () => import('@/views/goods/draftList'), name: 'draftList', meta: { title: 'draftList' }},
      { path: 'category-manage', component: () => import('@/views/goods/categoryManage'), name: 'categoryManage', meta: { title: 'categoryManage' }},
      { path: 'tag-manage', component: () => import('@/views/goods/tagManage'), name: 'tagManage', meta: { title: 'tagManage' }},
      { path: 'tag-add/:tag_id', component: () => import('@/views/goods/tagAdd'), name: 'tagAdd', meta: { title: 'tagAdd', noCache: true }, hidden: true },
      { path: 'recycle-station', component: () => import('@/views/goods/recycleStation'), name: 'recycleStation', meta: { title: 'recycleStation' }},
      { path: 'understock', component: () => import('@/views/goods/understock'), name: 'understock', meta: { title: 'understock' }},
      { path: 'good-publish/:goodsid?/:isdraft?', component: () => import('@/views/goods/goodsPublish'), name: 'goodPublish', meta: { title: 'goodPublish', noCache: true }, hidden: true }
    ]
  },
  // 订单管理
  {

    path: '/order',
    component: Layout,
    name: 'order',
    redirect: '/order/order-list',
    meta: { title: 'order', icon: 'order-manage' },
    children: [
      { path: 'order-list', component: () => import('@/views/order/orderList'), name: 'orderList', meta: { title: 'orderList', noCache: true }},
      { path: 'detail/:sn', component: () => import('@/views/order/orderDetail'), name: 'orderDetail', hidden: true, meta: { title: 'orderDetail', noCache: true }},
      { path: 'refund-list', component: () => import('@/views/order/refundList'), name: 'refundList', meta: { title: 'refundList' }},
      { path: 'logistics-manage', component: () => import('@/views/order/logisticsManage'), name: 'logisticsManage', meta: { title: 'logisticsManage' }},
      { path: 'comments-manage', component: () => import('@/views/order/commentsManage'), name: 'commentsManage', meta: { title: 'commentsManage' }},
      { path: 'settlement-manage', component: () => import('@/views/order/settlementManage'), name: 'settlementManage', meta: { title: 'settlementManage' }},
      { path: 'settlement-detail/:sn', component: () => import('@/views/order/settlementDetail'), name: 'settlementDetail', meta: { title: 'settlementDetail', noCache: true }, hidden: true },
      { path: 'receipt-history', component: () => import('@/views/order/receiptHistory'), name: 'receiptHistory', meta: { title: 'receiptHistory' }}
    ]
  },
  // 店铺管理
  {
    path: '/shop',
    component: Layout,
    redirect: '/shop/shop-manage/shop-list',
    name: 'shop',
    meta: { title: 'shop', icon: 'shop-manage' },
    children: [
      { path: 'shop-themes-pc', component: () => import('@/views/shop/shopThemesPc'), name: 'shopThemesPc', meta: { title: 'shopThemesPc' }},
      { path: 'shop-themes-wap', component: () => import('@/views/shop/shopThemesWap'), name: 'shopThemesWap', meta: { title: 'shopThemesWap' }},
      { path: 'shop-slide', component: () => import('@/views/shop/shopSlide'), name: 'shopSlide', meta: { title: 'shopSlide' }},
      { path: 'shop-nav', component: () => import('@/views/shop/shopNav'), name: 'shopNav', meta: { title: 'shopNav' }}
    ]
  },
  // 促销管理
  {
    path: '/promotions',
    component: Layout,
    redirect: '/promotions/group-buy-manager',
    name: 'promotions',
    meta: { title: 'promotions', icon: 'promotions-manage' },
    children: [
      { path: 'full-cut', component: () => import('@/views/promotions/fullCut'), name: 'fullCut', meta: { title: 'fullCut' }},
      { path: 'single-cut', component: () => import('@/views/promotions/singleCut'), name: 'singleCut', meta: { title: 'singleCut' }},
      { path: 'second-half-price', component: () => import('@/views/promotions/secondHalfPrice'), name: 'secondHalfPrice', meta: { title: 'secondHalfPrice' }},
      { path: 'discount-manager', component: () => import('@/views/promotions/discountManager'), name: 'discountManager', meta: { title: 'discountManager' }},
      { path: 'gift-manager', component: () => import('@/views/promotions/giftManager'), name: 'giftManager', meta: { title: 'giftManager' }},
      { path: 'group-buy-manager', component: () => import('@/views/promotions/groupBuyManager'), name: 'groupBuyManager', meta: { title: 'groupBuyManager' }},
      { path: 'group-time-limit', component: () => import('@/views/promotions/timeLimit'), name: 'timeLimit', meta: { title: 'timeLimit' }},
      { path: 'add-time-limit/:id', component: () => import('@/views/promotions/addTimeLimit'), name: 'addTimeLimit', meta: { title: 'addTimeLimit', noCache: true }, hidden: true },
      { path: 'activity-goods-data/:id', component: () => import('@/views/promotions/activityGoodsData'), name: 'activityGoodsData', meta: { title: 'activityGoodsData' }, hidden: true },
      { path: 'add-group-buy-goods', component: () => import('@/views/promotions/addGroupBuyGoods'), name: 'addGroupBuyGoods', meta: { title: 'addGroupBuyGoods' }, hidden: true },
      { path: 'edit-group-buy-goods/:goods_id', component: () => import('@/views/promotions/editGroupBuyGoods'), name: 'editGroupBuyGoods', meta: { title: 'editGroupBuyGoods', noCache: true }, hidden: true }
    ]
  },
  // 统计
  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/generality-overview',
    name: 'statistics',
    meta: { title: 'statistics', icon: 'statistics-manage' },
    children: [
      { path: 'generality-overview', component: () => import('@/views/statistics/generalityOverview'), name: 'generalityOverview', meta: { title: 'generalityOverview' }},
      {
        path: '/statistics/goods-analysis',
        component: () => import('@/views/statistics/goodsAnalysis/index'),
        redirect: '/statistics/goods-analysis/goods-details',
        name: 'goodsAnalysis',
        meta: { title: 'goodsAnalysis' },
        children: [
          { path: 'goods-details', component: () => import('@/views/statistics/goodsAnalysis/goodsDetailsAnalysis'), name: 'goodsDetailsAnalysis', meta: { title: 'goodsDetailsAnalysis' }},
          { path: 'price-sales', component: () => import('@/views/statistics/goodsAnalysis/goodsPriceSales'), name: 'goodsPriceSales', meta: { title: 'goodsPriceSales' }},
          { path: 'hot-selling-goods', component: () => import('@/views/statistics/goodsAnalysis/hotSellingGoods'), name: 'hotSellingGoods', meta: { title: 'hotSellingGoods' }}
        ]
      },
      {
        path: '/statistics/operate-report',
        component: () => import('@/views/statistics/operateReport/index'),
        redirect: '/statistics/goods-analysis/goods-details',
        name: 'operateReport',
        meta: { title: 'operateReport' },
        children: [
          { path: 'regional-analysis', component: () => import('@/views/statistics/operateReport/regionalAnalysis'), name: 'regionalAnalysis', meta: { title: 'regionalAnalysis' }},
          { path: 'sales-statistics', component: () => import('@/views/statistics/operateReport/salesStatistics'), name: 'salesStatistics', meta: { title: 'salesStatistics' }},
          { path: 'buy-analysis', component: () => import('@/views/statistics/operateReport/buyAnalysis'), name: 'buyAnalysis', meta: { title: 'buyAnalysis' }}
        ]
      },
      { path: 'traffic-statistics', component: () => import('@/views/statistics/trafficStatistics'), name: 'trafficStatistics', meta: { title: 'trafficStatistics' }},
      { path: 'collect-statistics', component: () => import('@/views/statistics/collectStatistics'), name: 'collectStatistics', meta: { title: 'collectStatistics' }},
      { path: 'log-manage', component: () => import('@/views/statistics/logManage'), name: 'logManage', meta: { title: 'logManage' }, hidden: true }
    ]
  },
  // 客服管理
  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/consultation',
    name: 'customer',
    meta: { title: 'customer', icon: 'user' },
    children: [
      { path: 'consultation', component: () => import('@/views/customer-service/consultation'), name: 'consultation', meta: { title: 'consultation' }},
      { path: 'message', component: () => import('@/views/customer-service/message'), name: 'message', meta: { title: 'message' }}
    ]
  },
  // 设置
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/shop',
    name: 'setting',
    meta: { title: 'setting', icon: 'setting-manage' },
    children: [
      { path: 'shop-setting', component: () => import('@/views/setting/shopSettings'), name: 'shopSettings', meta: { title: 'shopSettings' }},
      { path: 'goods-warning', component: () => import('@/views/setting/goodsWarning'), name: 'goodsWarning', meta: { title: 'goodsWarning' }},
      { path: 'grade-application', component: () => import('@/views/setting/gradeApplication'), name: 'gradeApplication', meta: { title: 'gradeApplication' }, hidden: true }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRouterMap, ...asyncRouterMap]
})
