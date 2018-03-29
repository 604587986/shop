import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    role: ['admin','editor']     will control the page role (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard' }
    }]
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

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
      { path: 'goods-list', component: _import('goods/goodsList'), name: 'goodsList', meta: { title: 'goodsList' }},
      {
        path: '/goods/goods-setting',
        component: _import('goods/goods-setting/index'),
        redirect: '/goods/goods-setting/category-list',
        name: 'goodsSetting',
        meta: { title: 'goodsSetting' },
        children: [
          { path: 'category-list', component: _import('goods/goods-setting/categoryList'), name: 'categoryList', meta: { title: 'categoryList' }},
          { path: 'category-params/:id', component: _import('goods/goods-setting/categoryParams'), name: 'categoryParams', hidden: true, meta: { title: 'categoryParams', noCache: true }},
          { path: 'brand-list', component: _import('goods/goods-setting/brandList'), name: 'brandList', meta: { title: 'brandList' }},
          { path: 'spec-list', component: _import('goods/goods-setting/specList'), name: 'specList', meta: { title: 'specList' }}
        ]
      },
      { path: 'goods-audit', component: _import('goods/goodsAudit'), name: 'goodsAudit', meta: { title: 'goodsAudit' }},
      {
        path: '/goods/tag-manage',
        component: _import('goods/tag-manage/index'),
        redirect: '/goods/tag-manage/tag-list',
        name: 'tagManage',
        meta: { title: 'tagManage' },
        children: [
          { path: 'tag-list', component: _import('goods/tag-manage/tagList'), name: 'taglist', meta: { title: 'tagList' }},
          { path: 'tag-goods-set', component: _import('goods/tag-manage/tagGoodsSet'), name: 'tagGoodsSet', meta: { title: 'tagGoodsSet' }}
        ]
      }
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
      { path: 'order-list', component: _import('order/orderList'), name: 'orderList', meta: { title: 'orderList' }},
      { path: 'refund-list', component: _import('order/refundList'), name: 'refundList', meta: { title: 'refundList' }},
      { path: 'receipt-history', component: _import('order/receiptHistory'), name: 'receiptHistory', meta: { title: 'receiptHistory' }},
      { path: 'detail/:sn', component: _import('order/orderDetail'), name: 'orderDetail', hidden: true, meta: { title: 'orderDetail' }},
      { path: 'refund/:sn', component: _import('order/refundDetail'), name: 'refundDetail', hidden: true, meta: { title: 'refundDetail' }}
    ]
  },
  // 会员管理
  {
    path: '/member',
    component: Layout,
    redirect: '/member/member-manage/member-list',
    name: 'member',
    meta: { title: 'member', icon: 'member-manage' },
    children: [
      {
        path: '/member/member-manage',
        component: _import('member/member-manage/index'),
        redirect: '/member/member-manage/member-list',
        name: 'memberManage',
        meta: { title: 'memberManage' },
        children: [
          { path: 'member-list', component: _import('member/member-manage/memberList'), name: 'memberList', meta: { title: 'memberList' }},
          { path: 'member-recycle', component: _import('member/member-manage/memberRecycle'), name: 'memberRecycle', meta: { title: 'memberRecycle' }},
          { path: 'edit/:id', component: _import('member/member-manage/memberEdit'), name: 'memberEdit', hidden: true, meta: { title: 'memberEdit' }}
        ]
      },
      {
        path: '/member/goods-comment',
        component: _import('member/goods-comment/index'),
        redirect: '/member/goods-comment/goods-comment-list',
        name: 'goodsComment',
        meta: { title: 'goodsComment' },
        children: [
          { path: 'goods-comment-list', component: _import('member/goods-comment/goodsCommentList'), name: 'mgoodsCommentList', meta: { title: 'goodsCommentList' }},
          { path: 'goods-ask-list', component: _import('member/goods-comment/goodsAskList'), name: 'goodsAskList', meta: { title: 'goodsAskList' }}
        ]
      },
      {
        path: '/member/member-notification',
        component: _import('member/member-notification/index'),
        redirect: '/member/member-notification/notification-history',
        name: 'memberNotification',
        meta: { title: 'memberNotification' },
        children: [
          { path: 'notification-history', component: _import('member/member-notification/notificationHistory'), name: 'notificationHistory', meta: { title: 'notificationHistory' }}
        ]
      }
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
      {
        path: '/shop/shop-manage',
        component: _import('shop/shop-manage/index'),
        redirect: '/shop/shop-manage/shop-list',
        name: 'shopManage',
        meta: { title: 'shopManage' },
        children: [
          { path: 'shop-list', component: _import('shop/shop-manage/shopList'), name: 'shopList', meta: { title: 'shopList' }},
          { path: 'shop-audit', component: _import('shop/shop-manage/shopAudit'), name: 'shopAudit', meta: { title: 'shopAudit' }},
          { path: 'edit/:shop_id', component: _import('shop/shop-manage/shopEdit'), name: 'shopEdit', hidden: true, meta: { title: 'shopEdit' }}
        ]
      },
      {
        path: '/shop/settlement-manage',
        component: _import('shop/settlement-manage/index'),
        redirect: '/shop/settlement-manage/settlement-list',
        name: 'settlementManage',
        meta: { title: 'settlementManage' },
        children: [
          { path: 'settlement-list', component: _import('shop/settlement-manage/settlementList'), name: 'settlementList', meta: { title: 'settlementList' }}
        ]
      },
      {
        path: '/shop/shop-theme-manage',
        component: _import('shop/shop-theme-manage/index'),
        redirect: '/shop/shop-theme-manage/theme-list',
        name: 'shopThemeManage',
        meta: { title: 'shopThemeManage' },
        children: [
          { path: 'theme-list', component: _import('shop/shop-theme-manage/themeList'), name: 'themeList', meta: { title: 'themeList' }},
          { path: 'theme-list-wap', component: _import('shop/shop-theme-manage/themeListWap'), name: 'themeListWap', meta: { title: 'themeListWap' }}
        ]
      },
      {
        path: '/shop/shop-level-manage',
        component: _import('shop/shop-level-manage/index'),
        redirect: '/shop/shop-level-manage/level-apply-list',
        name: 'shopLevelAudit',
        meta: { title: 'shopLevelManage' },
        children: [
          { path: 'level-apply-list', component: _import('shop/shop-level-manage/levelApplyList'), name: 'levelApplyList', meta: { title: 'levelApplyList' }}
        ]
      }
    ]
  },
  // 促销管理
  {
    path: '/promotions',
    component: Layout,
    redirect: '/promotions/group-buy-manage/group-buy-list',
    name: 'promotions',
    meta: { title: 'promotions', icon: 'promotions-manage' },
    children: [
      {
        path: '/promotions/group-buy-manage',
        component: _import('promotions/group-buy-manage/index'),
        redirect: '/promotions/group-buy-manage/group-buy-list',
        name: 'groupBuyManage',
        meta: { title: 'groupBuyManage' },
        children: [
          { path: 'group-buy-list', component: _import('promotions/group-buy-manage/groupBuyList'), name: 'groupBuyList', meta: { title: 'groupBuyList' }},
          { path: 'group-buy-category', component: _import('promotions/group-buy-manage/groupBuyCategory'), name: 'groupBuyCategory', meta: { title: 'groupBuyCategory' }},
          { path: 'group-buy-goods/:id', component: _import('promotions/group-buy-manage/groupBuyGoods'), name: 'groupBuyGoods', hidden: true, meta: { title: 'groupBuyGoods' }},
          { path: 'group-buy-goods-info', component: _import('promotions/group-buy-manage/groupBuyGoodsInfo'), name: 'groupBuyGoodsInfo', hidden: true, meta: { title: 'groupBuyGoodsInfo' }}
        ]
      },
      {
        path: '/promotions/points-mall-manage',
        component: _import('promotions/points-mall-manage/index'),
        redirect: '/promotions/points-mall-manage/points-classify',
        name: 'pointsMallManage',
        meta: { title: 'pointsMallManage' },
        children: [
          { path: 'points-classify', component: _import('promotions/points-mall-manage/pointsClassify'), name: 'pointsClassify', meta: { title: 'pointsClassify' }},
          { path: 'points-goods', component: _import('promotions/points-mall-manage/pointsGoods'), name: 'pointsGoods', meta: { title: 'pointsGoods' }}
        ]
      },
      {
        path: '/promotions/seckill-manage',
        component: _import('promotions/seckill-manage/index'),
        redirect: '/promotions/seckill-manage/seckill-list',
        name: 'seckillManage',
        meta: { title: 'seckillManage' },
        children: [
          { path: 'seckill-list', component: _import('promotions/seckill-manage/seckillList'), name: 'seckillList', meta: { title: 'seckillList' }},
          { path: 'seckill-list/audit/:id', component: _import('promotions/seckill-manage/seckillAuditGoodsList'), name: 'seckillAuditGoodsList', hidden: true, meta: { title: 'seckillAuditGoodsList', noCache: true }},
          { path: 'seckill-list/pass/:id', component: _import('promotions/seckill-manage/seckillPassGoodsList'), name: 'seckillPassGoodsList', hidden: true, meta: { title: 'seckillPassGoodsList', noCache: true }}
        ]
      }
    ]
  },
  // 页面管理
  {
    path: '/page',
    component: Layout,
    redirect: '/page/pc-decoration/pc-theme',
    name: 'page',
    meta: { title: 'page', icon: 'page-manage' },
    children: [
      {
        path: '/page/pc-decoration',
        component: _import('page/pc-decoration/index'),
        redirect: '/page/pc-decoration/pc-theme',
        name: 'pcDecoration',
        meta: {
          title: 'pcDecoration'
        },
        children: [
          { path: 'pc-theme', component: _import('page/pc-decoration/pcThemeManage'), name: 'pcThemeManage', meta: { title: 'pcThemeManage' }},
          { path: 'pc-floor', component: _import('page/pc-decoration/pcFloorManage'), name: 'pcFloorManage', meta: { title: 'pcFloorManage' }},
          { path: 'pc-focus', component: _import('page/pc-decoration/pcFocusManage'), name: 'pcFocusManage', meta: { title: 'pcFocusManage' }}
        ]
      },
      {
        path: '/page/mobile-decoration',
        component: _import('page/mobile-decoration/index'),
        redirect: '/page/mobile-decoration/mobile-theme',
        name: 'mobileDecoration',
        meta: {
          title: 'mobileDecoration'
        },
        children: [
          { path: 'mobile-theme', component: _import('page/mobile-decoration/mobileThemeManage'), name: 'mobileThemeManage', meta: { title: 'mobileThemeManage' }},
          { path: 'mobile-floor', component: _import('page/mobile-decoration/mobileFloorManage'), name: 'mobileFloorManage', meta: { title: 'mobileFloorManage' }},
          { path: 'mobile-focus', component: _import('page/mobile-decoration/mobileFocusManage'), name: 'mobileFocusManage', meta: { title: 'mobileFocusManage' }}
        ]
      },
      {
        path: '/page/page-setting',
        component: _import('page/page-setting/index'),
        redirect: '/page/page-setting/pc-site-menu',
        name: 'pageSetting',
        meta: { title: 'pageSetting' },
        children: [
          { path: 'pc-site-menu', component: _import('page/page-setting/pcSiteMenu'), name: 'pcSiteMenu', meta: { title: 'pcSiteMenu' }},
          { path: 'mobile-site-menu', component: _import('page/page-setting/mobileSiteMenu'), name: 'mobileSiteMenu', meta: { title: 'mobileSiteMenu' }},
          { path: 'hot-keyword', component: _import('page/page-setting/hotKeyword'), name: 'hotKeyword', meta: { title: 'hotKeyword' }},
          { path: 'help-center', component: _import('page/page-setting/helpCenter'), name: 'helpCenter', meta: { title: 'helpCenter' }},
          { path: 'mall-announcement', component: _import('page/page-setting/mallAnnouncement'), name: 'mallAnnouncement', meta: { title: 'mallAnnouncement' }},
          { path: 'contact-mall', component: _import('page/page-setting/contactMall'), name: 'contactMall', meta: { title: 'contactMall' }}
        ]
      }
    ]
  },
  // 统计
  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/member-analysis/order-amount',
    name: 'statistics',
    meta: { title: 'statistics', icon: 'statistics-manage' },
    children: [
      {
        path: '/statistics/member-analysis',
        component: _import('statistics/member-analysis/index'),
        redirect: '/statistics/member-analysis/order-amount',
        name: 'memberAnalysis',
        meta: { title: 'memberAnalysis' },
        children: [
          { path: 'order-amount', component: _import('statistics/member-analysis/orderAmount'), name: 'orderAmount', meta: { title: 'orderAmount' }},
          { path: 'added-member', component: _import('statistics/member-analysis/addedMember'), name: 'addedMmeber', meta: { title: 'addedMember' }}
        ]
      },
      {
        path: '/statistics/goods-statistics',
        component: _import('statistics/goods-statistics/index'),
        redirect: '/statistics/goods-statistics/price-sales',
        name: 'goodsStatistics',
        meta: { title: 'goodsStatistics' },
        children: [
          { path: 'price-sales', component: _import('statistics/goods-statistics/priceSales'), name: 'priceSales', meta: { title: 'priceSales' }},
          { path: 'hot-goods', component: _import('statistics/goods-statistics/hotGoods'), name: 'hotGoods', meta: { title: 'hotGoods' }},
          { path: 'goods-sales-details', component: _import('statistics/goods-statistics/goodsSalesDetails'), name: 'goodsSalesDetails', meta: { title: 'goodsSalesDetails' }},
          { path: 'goods-collect', component: _import('statistics/goods-statistics/goodsCollect'), name: 'goodsCollect', meta: { title: 'goodsCollect' }}
        ]
      },
      {
        path: '/statistics/industry-analysis',
        component: _import('statistics/industry-analysis/index'),
        redirect: '/statistics/industry-analysis/industry-scale',
        name: 'industryAnalysis',
        meta: { title: 'industryAnalysis' },
        children: [
          { path: 'industry-scale', component: _import('statistics/industry-analysis/industryScale'), name: 'industryScale', meta: { title: 'industryScale' }},
          { path: 'generality-overview', component: _import('statistics/industry-analysis/generalityOverview'), name: 'generalityOverview', meta: { title: 'generalityOverview' }}
        ]
      },
      {
        path: '/statistics/traffic-analysis',
        component: _import('statistics/traffic-analysis/index'),
        redirect: '/statistics/traffic-analysis/index',
        name: 'trafficAnalysis',
        meta: { title: 'trafficAnalysis' },
        children: [
          { path: 'index', component: _import('statistics/traffic-analysis/trafficAnalysisIndex'), name: 'indexTrafficAnalysis', meta: { title: 'trafficAnalysisIndex' }},
          { path: 'goods', component: _import('statistics/traffic-analysis/trafficAnalysisGoods'), name: 'goodsTrafficAnalysis', meta: { title: 'trafficAnalysisGoods' }}
        ]
      },
      {
        path: '/statistics/other-statistics',
        component: _import('statistics/other-statistics/index'),
        redirect: '/statistics/other-statistics/order',
        name: 'otherStatistics',
        meta: { title: 'otherStatistics' },
        children: [
          { path: 'order', component: _import('statistics/other-statistics/orderStatistics'), name: 'orderStatistics', meta: { title: 'orderStatistics' }},
          { path: 'salesRevenue', component: _import('statistics/other-statistics/salesRevenueStatistics'), name: 'salesRevenueStatistics', meta: { title: 'salesRevenueStatistics' }},
          { path: 'regionalAnalysis', component: _import('statistics/other-statistics/regionalAnalysis'), name: 'regionalAnalysis', meta: { title: 'regionalAnalysis' }},
          { path: 'customerPriceDistribution', component: _import('statistics/other-statistics/customerPriceDistribution'), name: 'customerPriceDistribution', meta: { title: 'customerPriceDistribution' }},
          { path: 'refund', component: _import('statistics/other-statistics/refundStatistics'), name: 'refundStatistics', meta: { title: 'refundStatistics' }}
        ]
      },
      {
        path: 'statistics/log-manage',
        component: _import('statistics/log-manage/index'),
        name: 'logManage',
        meta: { title: 'logManage' }
      }
    ]
  },
  // 设置
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/shop-settings/system',
    name: 'setting',
    meta: { title: 'setting', icon: 'setting-manage' },
    children: [
      {
        path: '/setting/shop-settings',
        component: _import('setting/shop-settings/index'),
        redirect: '/setting/shop-settings/system',
        name: 'shopSettings',
        meta: { title: 'shopSettings' },
        children: [
          { path: 'system', component: _import('setting/shop-settings/systemSettings'), name: 'systemSettings', meta: { title: 'systemSettings' }},
          { path: 'smtp', component: _import('setting/shop-settings/SMTPSettings'), name: 'smtpSettings', meta: { title: 'smtpSettings' }},
          { path: 'sms-gateway', component: _import('setting/shop-settings/SMSGatewaySettings'), name: 'smsGatewaySettings', meta: { title: 'SMSGatewaySettings' }},
          { path: 'express-platform', component: _import('setting/shop-settings/expressPlatformSettings'), name: 'expressPlatformSettings', meta: { title: 'expressPlatformSettings' }},
          { path: 'receipt-content-settings', component: _import('setting/shop-settings/receiptContentSettings'), name: 'receiptContentSettings', meta: { title: 'receiptContentSettings' }},
          { path: 'electronic-receipt', component: _import('setting/shop-settings/electronicReceipt'), name: 'electronicrEceiptSettings', meta: { title: 'electronicReceipt' }},
          { path: 'storage-solution', component: _import('setting/shop-settings/storageSolution'), name: 'storageSolutionSettings', meta: { title: 'storageSolution' }},
          { path: 'static-page', component: _import('setting/shop-settings/staticPage'), name: 'staticPageSettings', meta: { title: 'staticPage' }},
          { path: 'goods-index', component: _import('setting/shop-settings/goodsIndex'), name: 'goodsIndexSettings', meta: { title: 'goodsIndex' }},
          { path: 'trust-login', component: _import('setting/shop-settings/trustLogin'), name: 'trustLoginSettings', meta: { title: 'trustLogin' }},
          { path: 'cache-manage', component: _import('setting/shop-settings/cacheManage'), name: 'cacheManageSettings', meta: { title: 'cacheManage' }}
        ]
      },
      {
        path: '/setting/message-settings',
        component: _import('setting/message-settings/index'),
        redirect: '/setting/message-settings/member',
        name: 'messageSettings',
        meta: { title: 'messageSettings' },
        children: [
          { path: 'shop', component: _import('setting/message-settings/shopMessage'), name: 'shopMessageSettings', meta: { title: 'shopMessage' }},
          { path: 'member', component: _import('setting/message-settings/memberMessage'), name: 'memberMessageSettings', meta: { title: 'memberMessage' }},
          { path: 'other', component: _import('setting/message-settings/otherMessage'), name: 'otherMessageSettings', meta: { title: 'otherMessage' }}
        ]
      },
      {
        path: '/setting/payment-and-delivery',
        component: _import('setting/payment-and-delivery/index'),
        redirect: '/setting/payment-and-delivery/payment',
        name: 'paymentAndDelivery',
        meta: { title: 'paymentAndDelivery' },
        children: [
          { path: 'payment', component: _import('setting/payment-and-delivery/payment'), name: 'paymentSettings', meta: { title: 'payment' }},
          { path: 'express-company', component: _import('setting/payment-and-delivery/expressCompany'), name: 'expressCompanySettings', meta: { title: 'expressCompany' }},
          { path: 'regional-management', component: _import('setting/payment-and-delivery/regionalManagement'), name: 'regionalManagementSettings', meta: { title: 'regionalManagement' }}
        ]
      },
      {
        path: '/setting/auth-settings',
        component: _import('setting/auth-settings/index'),
        redirect: '/setting/auth-settings/administrator-manage',
        name: 'authSettings',
        meta: { title: 'authSettings' },
        children: [
          { path: 'administrator-manage', component: _import('setting/auth-settings/administratorManage'), name: 'administratorManage', meta: { title: 'administratorManage' }},
          { path: 'role-manage', component: _import('setting/auth-settings/roleManage'), name: 'roleManage', meta: { title: 'roleManage' }},
          { path: 'auth-manage', component: _import('setting/auth-settings/authManage'), name: 'authManage', meta: { title: 'authManage' }},
          { path: 'role-permission', component: _import('setting/auth-settings/rolePermission'), name: 'rolePermission', hidden: true, meta: { title: 'rolePermission' }}
        ]
      }
    ]
  },
  // 开发
  {
    path: '/development',
    component: Layout,
    redirect: '/development/tool-manage/url-mapping',
    name: 'development',
    meta: { title: 'development', icon: 'development-manage' },
    children: [
      {
        path: '/development/tool-manage',
        component: _import('development/tool-manage/index'),
        redirect: '/development/tool-manage/url-mapping',
        name: 'toolManage',
        meta: { title: 'toolManage' },
        children: [
          { path: 'url-mapping', component: _import('development/tool-manage/URLMapping'), name: 'urlMapping', meta: { title: 'URLMapping' }},
          { path: 'menu-manage', component: _import('development/tool-manage/menuManage'), name: 'menuManage', meta: { title: 'menuManage' }},
          { path: 'data-output', component: _import('development/tool-manage/dataOutput'), name: 'dataOutput', meta: { title: 'dataOutput' }},
          { path: 'clear-example-data', component: _import('development/tool-manage/clearExampleData'), name: 'clearExampleData', meta: { title: 'clearExampleData' }}
        ]
      },
      {
        path: '/development/article-manage',
        component: _import('development/article-manage/index'),
        redirect: '/development/article-manage/article-list',
        name: 'articleManage',
        meta: { title: 'articleManage' },
        children: [
          { path: 'article-model', component: _import('development/article-manage/articleModel'), name: 'articleModel', meta: { title: 'articleModel' }},
          { path: 'article-list', component: _import('development/article-manage/articleList'), name: 'articleList', meta: { title: 'articleList' }}
        ]
      },
      {
        path: '/development/component-manage',
        component: _import('development/component-manage/index'),
        redirect: '/development/component-manage/component-list',
        name: 'componentManage',
        meta: { title: 'componentManage' },
        children: [
          { path: 'component-list', component: _import('development/component-manage/componentList'), name: 'componentList', meta: { title: 'componentList' }}
        ]
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
