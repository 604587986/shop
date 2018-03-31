[
  {
    name: 'goods',
    title: '商品管理',
    children: [
      { name: 'goodsList', title: '商品列表' },
      {
        name: 'goodsSetting',
        title: '商品设置',
        children: [
          { name: 'categoryList', title: '分类列表' },
          { name: 'brandList', title: '品牌列表' },
          { name: 'specList', title: '规格列表' }
        ]
      },
      { name: 'goodsAudit', title: '商品审核' },
      {
        name: 'tagManage',
        title: '标签管理',
        children: [
          { name: 'taglist', title: '标签列表' }
        ]
      }
    ]
  },
  {
    name: 'order',
    title: '订单管理',
    children: [
      { name: 'orderList', title: '订单列表' },
      { name: 'refundList', title: '售后订单' },
      { name: 'receiptHistory', title: '发票历史' }
    ]
  },
  {
    name: 'member',
    title: '会员管理',
    children: [
      {
        name: 'memberManage',
        title: '管理会员',
        children: [
          { name: 'memberList', title: '会员列表' },
          { name: 'memberRecycle', title: '会员回收站' }
        ]
      },
      {
        name: 'goodsComment',
        title: '商品评论',
        children: [
          { name: 'mgoodsCommentList', title: '商品评论列表' },
          { name: 'goodsAskList', title: '商品咨询列表' }
        ]
      },
      {
        name: 'memberNotification',
        title: '会员通知',
        children: [
          { name: 'notificationHistory', title: '通知历史' }
        ]
      }
    ]
  },
  {
    name: 'shop',
    title: '店铺管理',
    children: [
      {
        name: 'shopManage',
        title: '管理店铺',
        children: [
          { name: 'shopList', title: '店铺列表' },
          { name: 'shopAudit', title: '店铺审核' }
        ]
      },
      {
        name: 'settlementManage',
        title: '结算管理',
        children: [
          { name: 'settlementList', title: '结算列表' }
        ]
      },
      {
        name: 'shopThemeManage',
        title: '店铺模板管理',
        children: [
          { name: 'themeList', title: '模板列表' },
          { name: 'themeListWap', title: 'WAP模板列表' }
        ]
      },
      {
        name: 'shopLevelAudit',
        title: '店铺等级管理',
        children: [
          { name: 'levelApplyList', title: '等级申请' }
        ]
      }
    ]
  },
  {
    name: 'promotions',
    title: '促销管理',
    children: [
      {
        name: 'groupBuyManage',
        title: '团购管理',
        children: [
          { name: 'groupBuyList', title: '团购列表' },
          { name: 'groupBuyCategory', title: '团购分类' }
        ]
      },
      {
        name: 'pointsMallManage',
        title: '积分商城',
        children: [
          { name: 'pointsClassify', title: '积分分类' },
          { name: 'pointsGoods', title: '积分商品' }
        ]
      },
      {
        name: 'seckillManage',
        title: '限时抢购管理',
        children: [
          { name: 'seckillList', title: '限时抢购' }
        ]
      }
    ]
  },
  {
    name: 'page',
    title: '页面设置',
    children: [
      {
        name: 'pcDecoration',
        title: 'PC装修',
        children: [
          { name: 'pcThemeManage', title: '模板管理' },
          { name: 'pcFloorManage', title: '楼层管理' },
          { name: 'pcFocusManage', title: '焦点图管理' }
        ]
      },
      {
        name: 'mobileDecoration',
        title: '移动端装修',
        children: [
          { name: 'mobileThemeManage', title: '模板管理' },
          { name: 'mobileFloorManage', title: '楼层管理' },
          { name: 'mobileFocusManage', title: '焦点图管理' }
        ]
      },
      {
        name: 'pageSetting',
        title: '页面设置',
        children: [
          { name: 'pcSiteMenu', title: 'PC导航菜单' },
          { name: 'mobileSiteMenu', title: '移动端导航菜单' },
          { name: 'hotKeyword', title: '热门关键字' },
          { name: 'helpCenter', title: '帮助中心' },
          { name: 'mallAnnouncement', title: '商城公告' },
          { name: 'contactMall', title: '联系商城' }
        ]
      }
    ]
  },
  {
    name: 'statistics',
    title: '统计分析',
    children: [
      {
        name: 'memberAnalysis',
        title: '会员分析',
        children: [
          { name: 'orderAmount', title: '会员下单量' },
          { name: 'addedMmeber', title: '新增会员统计' }
        ]
      },
      {
        name: 'goodsStatistics',
        title: '商品统计',
        children: [
          { name: 'priceSales', title: '价格销量' },
          { name: 'hotGoods', title: '热卖商品统计' },
          { name: 'goodsSalesDetails', title: '商品销售明细' },
          { name: 'goodsCollect', title: '商品收藏统计' }
        ]
      },
      {
        name: 'industryAnalysis',
        title: '行业分析',
        children: [
          { name: 'industryScale', title: '行业规模' },
          { name: 'generalityOverview', title: '概括总览' }
        ]
      },
      {
        name: 'trafficAnalysis',
        title: '流量分析',
        children: [
          { name: 'indexTrafficAnalysis', title: '流量分析' },
          { name: 'goodsTrafficAnalysis', title: '商品流量分析' }
        ]
      },
      {
        name: 'otherStatistics',
        title: '其它统计',
        children: [
          { name: 'orderStatistics', title: '订单统计' },
          { name: 'salesRevenueStatistics', title: '销售收入统计' },
          { name: 'regionalAnalysis', title: '区域分析' },
          { name: 'customerPriceDistribution', title: '客单价分布图' },
          { name: 'refundStatistics', title: '退款统计' }
        ]
      },
      {
        name: 'logManage',
        title: '日志管理'
      }
    ]
  },
  {
    name: 'setting',
    title: '设置管理',
    children: [
      {
        name: 'shopSettings',
        title: '网店设置',
        children: [
          { name: 'systemSettings', title: '系统设置' },
          { name: 'smtpSettings', title: 'SMTP设置' },
          { name: 'smsGatewaySettings', title: '短信网关设置' },
          { name: 'expressPlatformSettings', title: '快递平台设置' },
          { name: 'receiptContentSettings', title: '发票内容设置' },
          { name: 'electronicrEceiptSettings', title: '电子面单' },
          { name: 'storageSolutionSettings', title: '储存方案' },
          { name: 'staticPageSettings', title: '静态页' },
          { name: 'goodsIndexSettings', title: '商品索引' },
          { name: 'trustLoginSettings', title: '信任登录' },
          { name: 'cacheManageSettings', title: '缓存管理' }
        ]
      },
      {
        name: 'messageSettings',
        title: '消息设置',
        children: [
          { name: 'shopMessageSettings', title: '店铺消息' },
          { name: 'memberMessageSettings', title: '会员消息' },
          { name: 'otherMessageSettings', title: '其它消息' }
        ]
      },
      {
        name: 'paymentAndDelivery',
        title: '支付和配送',
        children: [
          { name: 'paymentSettings', title: '支付方式' },
          { name: 'expressCompanySettings', title: '配送方式' },
          { name: 'regionalManagementSettings', title: '区域管理' }
        ]
      },
      {
        name: 'authSettings',
        title: '权限管理',
        children: [
          { name: 'administratorManage', title: '管理员管理' },
          { name: 'roleManage', title: '角色管理' },
          { name: 'authManage', title: '权限点管理' }
        ]
      }
    ]
  },
  {
    name: 'development',
    title: '开发管理',
    disabled: true,
    children: [
      {
        name: 'toolManage',
        title: '工具',
        disabled: true,
        children: [
          { name: 'urlMapping', title: 'URL映射' },
          { name: 'menuManage', title: '菜单管理', disabled: true },
          { name: 'dataOutput', title: '数据导出' },
          { name: 'clearExampleData', title: '清除示例数据' }
        ]
      },
      {
        name: 'articleManage',
        title: '文章管理',
        children: [
          { name: 'articleModel', title: '文章模型' },
          { name: 'articleList', title: '文章列表' }
        ]
      },
      {
        name: 'componentManage',
        title: '组件管理',
        children: [
          { name: 'componentList', title: '组件列表' }
        ]
      }
    ]
  }
]
