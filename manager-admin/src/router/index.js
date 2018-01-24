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
      { path: 'goods-list', component: _import('goods/goodsList'), name: 'goods-list', meta: { title: 'goodsList' }},
      {
        path: '/goods/goods-setting',
        component: _import('goods/goods-setting/index'),
        redirect: '/goods/goods-setting/category-list',
        name: 'goods-setting',
        meta: { title: 'goodsSetting' },
        children: [
          { path: 'category-list', component: _import('goods/goods-setting/categoryList'), name: 'category-list', meta: { title: 'categoryList' }},
          { path: 'brand-list', component: _import('goods/goods-setting/brandList'), name: 'brand-list', meta: { title: 'brandList' }},
          { path: 'spec-list', component: _import('goods/goods-setting/specList'), name: 'spec-list', meta: { title: 'specList' }}
        ]
      },
      { path: 'goods-audit', component: _import('goods/goodsAudit'), name: 'goods-audit', meta: { title: 'goodsAudit' }},
      {
        path: '/goods/tag-manage',
        component: _import('goods/tag-manage/index'),
        redirect: '/goods/tag-manage/tag-list',
        name: 'tag-manage',
        meta: { title: 'tagManage' },
        children: [
          { path: 'tag-list', component: _import('goods/tag-manage/tagList'), name: 'tag-list', meta: { title: 'tagList' }}
          // { path: 'tag-goods-set', component: _import('goods/tag-manage/tagGoodsSet'), name: 'tag-goods-set', meta: { title: 'tagGoodsSet' }}
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
      {
        path: 'order-list',
        component: _import('order/orderList'),
        name: 'order-list',
        meta: { title: 'orderList' }
      },
      {
        path: 'refund-list',
        component: _import('order/refundList'),
        name: 'refund-list',
        meta: { title: 'refundList', noCache: true }
      },
      {
        path: 'receipt-history',
        component: _import('order/receiptHistory'),
        name: 'receipt-history',
        meta: { title: 'receiptHistory', noCache: true }
      },
      {
        path: 'detail/:sn',
        component: _import('order/orderDetail'),
        name: 'order-detail',
        hidden: true,
        meta: { title: 'orderDetail' }
      },
      {
        path: 'refund/:sn',
        component: _import('order/refundDetail'),
        name: 'refund-detail',
        hidden: true,
        meta: { title: 'refundDetail' }
      }
    ]
  },
  // 会员管理
  {
    path: '/member',
    component: Layout,
    redirect: '/member/member-manage/member-list',
    name: 'member',
    meta: {
      title: 'member',
      icon: 'member-manage'
    },
    children: [
      {
        path: '/member/member-manage',
        component: _import('member/member-manage/index'),
        redirect: '/member/member-manage/member-list',
        name: 'member-manage',
        meta: { title: 'memberManage' },
        children: [
          { path: 'member-list', component: _import('member/member-manage/memberList'), name: 'member-list', meta: { title: 'memberList' }},
          { path: 'member-recycle', component: _import('member/member-manage/memberRecycle'), name: 'member-recycle', meta: { title: 'memberRecycle' }},
          { path: 'edit/:id', component: _import('member/member-manage/memberEdit'), name: 'member-edit', hidden: true, meta: { title: 'memberEdit' }}
        ]
      },
      {
        path: '/member/goods-comment',
        component: _import('member/goods-comment/index'),
        redirect: '/member/goods-comment/goods-comment-list',
        name: 'goods-comment',
        meta: { title: 'goodsComment' },
        children: [
          { path: 'goods-comment-list', component: _import('member/goods-comment/goodsCommentList'), name: 'mgoods-comment-list', meta: { title: 'goodsCommentList' }},
          { path: 'goods-ask-list', component: _import('member/goods-comment/goodsAskList'), name: 'goods-ask-list', meta: { title: 'goodsAskList' }}
        ]
      },
      {
        path: '/member/member-notification',
        component: _import('member/member-notification/index'),
        redirect: '/member/member-notification/notification-history',
        name: 'member-notification',
        meta: { title: 'memberNotification' },
        children: [
          { path: 'notification-history', component: _import('member/member-notification/notificationHistory'), name: 'notification-history', meta: { title: 'notificationHistory' }}
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
    meta: {
      title: 'shop',
      icon: 'shop-manage'
    },
    children: [
      {
        path: '/shop/shop-manage',
        component: _import('shop/shop-manage/index'),
        redirect: '/shop/shop-manage/shop-list',
        name: 'shop-manage',
        meta: { title: 'shopManage', noCache: true },
        children: [
          { path: 'shop-list', component: _import('shop/shop-manage/shopList'), name: 'shop-list', meta: { title: 'shopList' }},
          { path: 'shop-audit', component: _import('shop/shop-manage/shopAudit'), name: 'shop-audit', meta: { title: 'shopAudit' }}
        ]
      },
      {
        path: '/shop/settlement-manage',
        component: _import('shop/settlement-manage/index'),
        redirect: '/shop/settlement-manage/settlement-list',
        name: 'settlement-manage',
        meta: { title: 'settlementManage', noCache: true },
        children: [
          { path: 'settlement-list', component: _import('shop/settlement-manage/settlementList'), name: 'settlement-list', meta: { title: 'settlementList' }}
        ]
      },
      {
        path: '/shop/shop-theme-manage',
        component: _import('shop/shop-theme-manage/index'),
        redirect: '/shop/shop-theme-manage/theme-list',
        name: 'shop-theme-manage',
        meta: { title: 'shopThemeManage', noCache: true },
        children: [
          { path: 'theme-list', component: _import('shop/shop-theme-manage/themeList'), name: 'theme-list', meta: { title: 'themeList' }},
          { path: 'theme-list-wap', component: _import('shop/shop-theme-manage/themeListWap'), name: 'theme-list-wap', meta: { title: 'themeListWap' }}
        ]
      },
      {
        path: '/shop/shop-level-manage',
        component: _import('shop/shop-level-manage/index'),
        redirect: '/shop/shop-level-manage/level-apply-list',
        name: 'shop-level-audit',
        meta: { title: 'shopLevelManage', noCache: true },
        children: [
          { path: 'level-apply-list', component: _import('shop/shop-level-manage/levelApplyList'), name: 'level-apply-list', meta: { title: 'levelApplyList' }}
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
    meta: {
      title: 'promotions',
      icon: 'promotions-manage'
    },
    children: [
      {
        path: '/promotions/group-buy-manage',
        component: _import('promotions/group-buy-manage/index'),
        redirect: '/promotions/group-buy-manage/group-buy-list',
        name: 'group-buy-manage',
        meta: { title: 'groupBuyManage' },
        children: [
          { path: 'group-buy-list', component: _import('promotions/group-buy-manage/groupBuyList'), name: 'group-buy-list', meta: { title: 'groupBuyList' }},
          { path: 'group-buy-classify', component: _import('promotions/group-buy-manage/groupBuyClassify'), name: 'group-buy-classify', meta: { title: 'groupBuyClassify' }}
        ]
      },
      {
        path: '/promotions/points-mall-manage',
        component: _import('promotions/points-mall-manage/index'),
        redirect: '/promotions/points-mall-manage/points-classify',
        name: 'points-mall-manage',
        meta: { title: 'pointsMallManage' },
        children: [
          { path: 'points-classify', component: _import('promotions/points-mall-manage/pointsClassify'), name: 'points-classify', meta: { title: 'pointsClassify' }},
          { path: 'points-goods', component: _import('promotions/points-mall-manage/pointsGoods'), name: 'points-goods', meta: { title: 'pointsGoods' }}
        ]
      },
      {
        path: 'seckill-list',
        component: _import('promotions/seckillList'),
        name: 'seckill-list',
        meta: { title: 'seckillList' }
      }
    ]
  },
  // 页面管理
  {
    path: '/page',
    component: Layout,
    redirect: '/page/pc-decoration/pc-theme',
    name: 'page',
    meta: {
      title: 'page',
      icon: 'page-manage'
    },
    children: [
      {
        path: '/page/pc-decoration',
        component: _import('page/pc-decoration/index'),
        redirect: '/page/pc-decoration/pc-theme',
        name: 'pc-decoration',
        meta: {
          title: 'pcDecoration'
        },
        children: [
          { path: 'pc-theme', component: _import('page/pc-decoration/pcThemeManage'), name: 'pc-theme-manage', meta: { title: 'pcThemeManage' }},
          { path: 'pc-floor', component: _import('page/pc-decoration/pcFloorManage'), name: 'pc-floor-manage', meta: { title: 'pcFloorManage' }},
          { path: 'pc-focus', component: _import('page/pc-decoration/pcFocusManage'), name: 'pc-focus-manage', meta: { title: 'pcFocusManage' }}
        ]
      },
      {
        path: '/page/mobile-decoration',
        component: _import('page/mobile-decoration/index'),
        redirect: '/page/mobile-decoration/mobile-theme',
        name: 'mobile-decoration',
        meta: {
          title: 'mobileDecoration'
        },
        children: [
          { path: 'mobile-theme', component: _import('page/mobile-decoration/mobileThemeManage'), name: 'mobile-theme-manage', meta: { title: 'mobileThemeManage' }},
          { path: 'mobile-floor', component: _import('page/mobile-decoration/mobileFloorManage'), name: 'mobile-floor-manage', meta: { title: 'mobileFloorManage' }},
          { path: 'mobile-focus', component: _import('page/mobile-decoration/mobileFocusManage'), name: 'mobile-focus-manage', meta: { title: 'mobileFocusManage' }}
        ]
      },
      {
        path: '/page/page-setting',
        component: _import('page/page-setting/index'),
        redirect: '/page/page-setting/pc-navbar',
        name: 'page-setting',
        meta: {
          title: 'pageSetting'
        },
        children: [
          { path: 'pc-navbar', component: _import('page/page-setting/pcNavbar'), name: 'pc-navbar', meta: { title: 'pcNavbar' }},
          { path: 'mobile-navbar', component: _import('page/page-setting/mobileNavbar'), name: 'mobile-navbar', meta: { title: 'mobileNavbar' }},
          { path: 'hot-keyword', component: _import('page/page-setting/hotKeyword'), name: 'hot-keyword', meta: { title: 'hotKeyword' }},
          { path: 'help-center', component: _import('page/page-setting/helpCenter'), name: 'help-center', meta: { title: 'helpCenter' }},
          { path: 'mall-announcement', component: _import('page/page-setting/mallAnnouncement'), name: 'mall-announcement', meta: { title: 'mallAnnouncement' }},
          { path: 'contact-mall', component: _import('page/page-setting/contactMall'), name: 'contact-mall', meta: { title: 'contactMall' }}
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
    meta: {
      title: 'statistics',
      icon: 'statistics-manage'
    },
    children: [
      {
        path: '/statistics/member-analysis',
        component: _import('statistics/member-analysis/index'),
        redirect: '/statistics/member-analysis/order-amount',
        name: 'member-analysis',
        meta: { title: 'memberAnalysis' },
        children: [
          { path: 'order-amount', component: _import('statistics/member-analysis/orderAmount'), name: 'order-amount', meta: { title: 'orderAmount' }},
          { path: 'added-member', component: _import('statistics/member-analysis/addedMember'), name: 'added-mmeber', meta: { title: 'addedMember' }}
        ]
      },
      {
        path: '/statistics/goods-statistics',
        component: _import('statistics/goods-statistics/index'),
        redirect: '/statistics/goods-statistics/price-sales',
        name: 'goods-statistics',
        meta: { title: 'goodsStatistics' },
        children: [
          { path: 'price-sales', component: _import('statistics/goods-statistics/priceSales'), name: 'price-sales', meta: { title: 'priceSales' }},
          { path: 'hot-goods', component: _import('statistics/goods-statistics/hotGoods'), name: 'hot-goods', meta: { title: 'hotGoods' }},
          { path: 'goods-sales-details', component: _import('statistics/goods-statistics/goodsSalesDetails'), name: 'goods-sales-details', meta: { title: 'goodsSalesDetails' }},
          { path: 'goods-collect', component: _import('statistics/goods-statistics/goodsCollect'), name: 'goods-collect', meta: { title: 'goodsCollect' }}
        ]
      },
      {
        path: '/statistics/industry-analysis',
        component: _import('statistics/industry-analysis/index'),
        redirect: '/statistics/industry-analysis/industry-scale',
        name: 'industry-analysis',
        meta: { title: 'industryAnalysis' },
        children: [
          { path: 'industry-scale', component: _import('statistics/industry-analysis/industryScale'), name: 'industry-scale', meta: { title: 'industryScale' }},
          { path: 'generality-overview', component: _import('statistics/industry-analysis/generalityOverview'), name: 'generality-overview', meta: { title: 'generalityOverview' }}
        ]
      },
      {
        path: '/statistics/traffic-analysis',
        component: _import('statistics/traffic-analysis/index'),
        redirect: '/statistics/traffic-analysis/index',
        name: 'traffic-analysis',
        meta: { title: 'trafficAnalysis' },
        children: [
          { path: 'index', component: _import('statistics/traffic-analysis/trafficAnalysisIndex'), name: 'index-traffic-analysis', meta: { title: 'trafficAnalysisIndex' }},
          { path: 'goods', component: _import('statistics/traffic-analysis/trafficAnalysisGoods'), name: 'goods-traffic-analysis', meta: { title: 'trafficAnalysisGoods' }}
        ]
      },
      {
        path: '/statistics/other-statistics',
        component: _import('statistics/other-statistics/index'),
        redirect: '/statistics/other-statistics/order',
        name: 'other-statistics',
        meta: { title: 'otherStatistics' },
        children: [
          { path: 'order', component: _import('statistics/other-statistics/orderStatistics'), name: 'order-statistics', meta: { title: 'orderStatistics' }},
          { path: 'sales-revenue', component: _import('statistics/other-statistics/salesRevenueStatistics'), name: 'sales-revenue-statistics', meta: { title: 'salesRevenueStatistics' }},
          { path: 'regional-analysis', component: _import('statistics/other-statistics/regionalAnalysis'), name: 'regional-analysis', meta: { title: 'regionalAnalysis' }},
          { path: 'customer-price-distribution', component: _import('statistics/other-statistics/customerPriceDistribution'), name: 'customer-price-distribution', meta: { title: 'customerPriceDistribution' }},
          { path: 'refund', component: _import('statistics/other-statistics/refundStatistics'), name: 'refund-statistics', meta: { title: 'refundStatistics' }}
        ]
      },
      {
        path: 'statistics/log-manage',
        component: _import('statistics/log-manage/index'),
        name: 'log-manage',
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
    meta: {
      title: 'setting',
      icon: 'setting-manage'
    },
    children: [
      {
        path: '/setting/shop-settings',
        component: _import('setting/shop-settings/index'),
        redirect: '/setting/shop-settings/system',
        name: 'shop-settings',
        meta: { title: 'shopSettings' },
        children: [
          { path: 'system', component: _import('setting/shop-settings/systemSettings'), name: 'system-settings', meta: { title: 'systemSettings' }},
          { path: 'smtp', component: _import('setting/shop-settings/SMTPSettings'), name: 'smtp-settings', meta: { title: 'smtpSettings' }},
          { path: 'sms-gateway', component: _import('setting/shop-settings/SMSGatewaySettings'), name: 'sms-gateway-settings', meta: { title: 'SMSGatewaySettings' }},
          { path: 'express-platform', component: _import('setting/shop-settings/expressPlatformSettings'), name: 'express-platform-settings', meta: { title: 'expressPlatformSettings' }},
          { path: 'invoice-settings', component: _import('setting/shop-settings/invoiceSettings'), name: 'invoice-settings', meta: { title: 'invoiceSettings' }},
          { path: 'electronic-receipt', component: _import('setting/shop-settings/electronicReceipt'), name: 'electronicr-eceipt-settings', meta: { title: 'electronicReceipt' }},
          { path: 'storage-solution', component: _import('setting/shop-settings/storageSolution'), name: 'storage-solution-settings', meta: { title: 'storageSolution' }},
          { path: 'static-page', component: _import('setting/shop-settings/staticPage'), name: 'static-page-settings', meta: { title: 'staticPage' }},
          { path: 'goods-index', component: _import('setting/shop-settings/goodsIndex'), name: 'goods-index-settings', meta: { title: 'goodsIndex' }},
          { path: 'trust-login', component: _import('setting/shop-settings/trustLogin'), name: 'trust-login-settings', meta: { title: 'trustLogin' }},
          { path: 'cache-manage', component: _import('setting/shop-settings/cacheManage'), name: 'cache-manage-settings', meta: { title: 'cacheManage' }}
        ]
      },
      {
        path: '/setting/message-settings',
        component: _import('setting/message-settings/index'),
        redirect: '/setting/message-settings/member',
        name: 'message-settings',
        meta: { title: 'messageSettings' },
        children: [
          { path: 'shop', component: _import('setting/message-settings/shopMessage'), name: 'shop-message-settings', meta: { title: 'shopMessage' }},
          { path: 'member', component: _import('setting/message-settings/memberMessage'), name: 'member-message-settings', meta: { title: 'memberMessage' }},
          { path: 'other', component: _import('setting/message-settings/otherMessage'), name: 'other-message-settings', meta: { title: 'otherMessage' }}
        ]
      },
      {
        path: '/setting/payment-and-delivery',
        component: _import('setting/payment-and-delivery/index'),
        redirect: '/setting/payment-and-delivery/payment',
        name: 'payment-and-delivery',
        meta: { title: 'paymentAndDelivery' },
        children: [
          { path: 'payment', component: _import('setting/payment-and-delivery/payment'), name: 'payment-settings', meta: { title: 'payment' }},
          { path: 'express-company', component: _import('setting/payment-and-delivery/expressCompany'), name: 'express-company-settings', meta: { title: 'expressCompany' }},
          { path: 'regional-management', component: _import('setting/payment-and-delivery/regionalManagement'), name: 'regional-management-settings', meta: { title: 'regionalManagement' }}
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
    meta: {
      title: 'development',
      icon: 'development-manage'
    },
    children: [
      {
        path: '/development/tool-manage',
        component: _import('development/tool-manage/index'),
        redirect: '/development/tool-manage/url-mapping',
        name: 'tool-manage',
        meta: { title: 'toolManage' },
        children: [
          { path: 'url-mapping', component: _import('development/tool-manage/URLMapping'), name: 'url-mapping', meta: { title: 'URLMapping' }},
          { path: 'menu-manage', component: _import('development/tool-manage/menuManage'), name: 'menu-manage', meta: { title: 'menuManage' }},
          { path: 'data-output', component: _import('development/tool-manage/dataOutput'), name: 'data-output', meta: { title: 'dataOutput' }},
          { path: 'clear-example-data', component: _import('development/tool-manage/clearExampleData'), name: 'clear-example-data', meta: { title: 'clearExampleData' }}
        ]
      },
      {
        path: '/development/site-theme-manage',
        component: _import('development/site-theme-manage/index'),
        redirect: '/development/site-theme-manage/frontdesk-theme',
        name: 'site-theme-manage',
        meta: { title: 'SiteThemeManage' },
        children: [
          { path: 'frontdesk-theme', component: _import('development/site-theme-manage/frontdeskTheme'), name: 'frontdesk-theme', meta: { title: 'frontdeskTheme' }},
          { path: 'backstage-theme', component: _import('development/site-theme-manage/backstageTheme'), name: 'backstage-theme', meta: { title: 'backstageTheme' }}
        ]
      },
      {
        path: '/development/article-manage',
        component: _import('development/article-manage/index'),
        redirect: '/development/article-manage/article-list',
        name: 'article-manage',
        meta: { title: 'articleManage' },
        children: [
          { path: 'article-model', component: _import('development/article-manage/articleModel'), name: 'article-model', meta: { title: 'articleModel' }},
          { path: 'article-list', component: _import('development/article-manage/articleList'), name: 'article-list', meta: { title: 'articleList' }}
        ]
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
