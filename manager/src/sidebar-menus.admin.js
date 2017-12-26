//  概况
const Home = () => import('./views/admin/Home.vue')

//  商品管理
const GoodsList = () => import('./views/admin/goods/GoodsList.vue')
const Classify = () => import('./views/admin/goods/Classfiy.vue')
const TagList = () => import('./views/admin/goods/TagList.vue')
const GooodsAudit = () => import('./views/admin/goods/GoodsAudit.vue')

//  开发文档
const Doc = () => import('./views/doc/Index.vue')

export default [
  {
    title: '首页',
    type: 'menu-item',
    icon: 'el-icon-info',
    component: Home
  },
  {
    title: '商品',
    type: 'submenu',
    icon: 'el-icon-enation-goods-manager',
    children: [
      {
        title: '商品管理',
        type: 'submenu',
        children: [
          {
            title: '商品列表',
            type: 'menu-item',
            component: GoodsList
          }
        ]
      },
      {
        title: '商品设置',
        type: 'submenu',
        children: [
          {
            title: '分类列表',
            type: 'menu-item'
          },
          {
            title: '品牌列表',
            type: 'menu-item',
            component: Classify
          },
          {
            title: '规格列表',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '商品审核',
        type: 'submenu',
        children: [
          {
            title: '商品审核',
            type: 'menu-item'
          }
        ]
      }
    ]
  },
  {
    title: '订单',
    type: 'submenu',
    icon: 'el-icon-enation-order-manager',
    children: [
      {
        title: '订单管理',
        type: 'submenu',
        children: [
          {
            title: '订单列表',
            type: 'menu-item'
          },
          {
            title: '待结算订单',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '单据管理',
        type: 'submenu',
        children: [
          {
            title: '收款单',
            type: 'menu-item'
          },
          {
            title: '维权订单',
            type: 'menu-item'
          },
          {
            title: '发货单',
            type: 'menu-item'
          },
          {
            title: '退款单',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '发票管理',
        type: 'submenu',
        children: [
          {
            title: '历史发票',
            type: 'menu-item'
          }
        ]
      }
    ]
  },
  {
    title: '会员',
    type: 'submenu',
    icon: 'el-icon-enation-member-manager',
    children: [
      {
        title: '会员管理',
        type: 'submenu',
        children: [
          {
            title: '会员列表',
            type: 'menu-item'
          },
          {
            title: '会员回收站',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '商品评论',
        type: 'submenu',
        children: [
          {
            title: '商品评论列表',
            type: 'menu-item'
          },
          {
            title: '购买咨询列表',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '会员短消息',
        type: 'submenu',
        children: [
          {
            title: '历史消息',
            type: 'menu-item'
          }
        ]
      }
    ]
  },
  {
    title: '店铺',
    type: 'submenu',
    icon: 'el-icon-enation-shop-manager',
    children: [
      {
        title: '店铺管理',
        type: 'submenu',
        children: [
          {
            title: '店铺列表',
            type: 'menu-item'
          },
          {
            title: '审核店铺',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '店铺信息维护',
        type: 'submenu',
        children: [
          {
            title: '商城公告',
            type: 'menu-item'
          },
          {
            title: '联系平台',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '结算管理',
        type: 'submenu',
        children: [
          {
            title: '结算列表',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '店铺模板管理',
        type: 'submenu',
        children: [
          {
            title: '模板列表',
            type: 'menu-item'
          },
          {
            title: 'Wap模板列表',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '店铺等级管理',
        type: 'submenu',
        children: [
          {
            title: '空间设置',
            type: 'menu-item'
          },
          {
            title: '等级申请',
            type: 'menu-item'
          }
        ]
      }
    ]
  },
  {
    title: '促销',
    type: 'submenu',
    icon: 'el-icon-enation-activity-manager',
    children: [
      {
        title: '团购管理',
        type: 'submenu',
        children: [
          {
            title: '团购活动',
            type: 'menu-item'
          },
          {
            title: '团购地区',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '积分商城',
        type: 'submenu',
        children: [
          {
            title: '分类列表',
            type: 'menu-item'
          },
          {
            title: '楼层管理',
            type: 'menu-item'
          }
        ]
      }
    ]
  },
  {
    title: '页面',
    type: 'submenu',
    icon: 'el-icon-enation-page-manager',
    children: [
      {
        title: 'PC装修',
        type: 'submenu',
        children: [
          {
            title: 'PC模板管理',
            type: 'menu-item'
          },
          {
            title: 'PC楼层装修',
            type: 'menu-item'
          },
          {
            title: 'PC焦点图',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '移动端装修',
        type: 'submenu',
        children: [
          {
            title: '模板管理',
            type: 'menu-item'
          },
          {
            title: '楼层装修',
            type: 'menu-item'
          },
          {
            title: '焦点图',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '广告管理',
        type: 'submenu',
        children: [
          {
            title: '广告位',
            type: 'menu-item'
          },
          {
            title: '广告列表',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '页面设置',
        type: 'submenu',
        children: [
          {
            title: '导航栏设置',
            type: 'menu-item'
          },
          {
            title: '热门关键字',
            type: 'menu-item'
          },
          {
            title: '帮助中心',
            type: 'menu-item'
          },
          {
            title: '商城公告',
            type: 'menu-item'
          },
          {
            title: '联系方式',
            type: 'menu-item'
          }
        ]
      }
    ]
  },
  {
    title: '统计',
    type: 'submenu',
    icon: 'el-icon-enation-statistics-manager',
    children: [
      {
        title: '会员分析',
        type: 'submenu',
        children: [
          {
            title: '会员下单量',
            type: 'menu-item'
          },
          {
            title: '新增会员',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '商品统计',
        type: 'submenu',
        children: [
          {
            title: '价格销量',
            type: 'menu-item'
          },
          {
            title: '热卖商品统计',
            type: 'menu-item'
          },
          {
            title: '商品销售明细',
            type: 'menu-item'
          },
          {
            title: '商品收藏统计',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '行业分析',
        type: 'submenu',
        children: [
          {
            title: '行业规模',
            type: 'menu-item'
          },
          {
            title: '概括总览',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '流量分析',
        type: 'submenu',
        children: [
          {
            title: '流量分析',
            type: 'menu-item'
          },
          {
            title: '商品流量分析',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '其它统计',
        type: 'submenu',
        children: [
          {
            title: '订单统计',
            type: 'menu-item'
          },
          {
            title: '销售收入统计',
            type: 'menu-item'
          },
          {
            title: '区域分析',
            type: 'menu-item'
          },
          {
            title: '客单价分布图',
            type: 'menu-item'
          },
          {
            title: '退款统计',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '日志管理',
        type: 'menu-item'
      }
    ]
  },
  {
    title: '设置',
    type: 'submenu',
    icon: 'el-icon-setting',
    children: [
      {
        title: '网店设置',
        type: 'submenu',
        children: [
          {
            title: '系统设置',
            type: 'menu-item'
          },
          {
            title: 'smtp设置',
            type: 'menu-item'
          },
          {
            title: '短信网关设置',
            type: 'menu-item'
          },
          {
            title: '快递平台设置',
            type: 'menu-item'
          },
          {
            title: '发票设置',
            type: 'menu-item'
          },
          {
            title: '电子面单',
            type: 'menu-item'
          },
          {
            title: '储存方案',
            type: 'menu-item'
          },
          {
            title: '静态页',
            type: 'menu-item'
          },
          {
            title: '商品索引',
            type: 'menu-item'
          },
          {
            title: '信任登录',
            type: 'menu-item'
          },
          {
            title: '初始化',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '消息设置',
        type: 'submenu',
        children: [
          {
            title: '店铺消息',
            type: 'menu-item'
          },
          {
            title: '会员消息',
            type: 'menu-item'
          },
          {
            title: '其它消息',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '配送和支付',
        type: 'submenu',
        children: [
          {
            title: '支付方式',
            type: 'menu-item'
          },
          {
            title: '物流公司',
            type: 'menu-item'
          },
          {
            title: '地区管理',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '权限管理',
        type: 'submenu',
        children: [
          {
            title: '管理员管理',
            type: 'menu-item'
          },
          {
            title: '角色管理',
            type: 'menu-item'
          },
          {
            title: '权限点管理',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '模板管理',
        type: 'submenu',
        children: [
          {
            title: '前台模板',
            type: 'menu-item'
          },
          {
            title: '后台模板',
            type: 'menu-item'
          },
          {
            title: '权限点管理',
            type: 'menu-item'
          }
        ]
      }
    ]
  },
  {
    title: '开发',
    type: 'submenu',
    icon: 'el-icon-enation-develop-manager',
    children: [
      {
        title: '工具',
        type: 'submenu',
        children: [
          {
            title: 'URL映射',
            type: 'menu-item'
          },
          {
            title: '菜单管理',
            type: 'menu-item'
          },
          {
            title: '数据导出',
            type: 'menu-item'
          },
          {
            title: '清除示例数据',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '主题管理',
        type: 'submenu',
        children: [
          {
            title: '站点前台主题',
            type: 'menu-item'
          },
          {
            title: '站点后台主题',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '页面管理',
        type: 'submenu',
        children: [
          {
            title: '文章模型',
            type: 'menu-item'
          },
          {
            title: '文章管理',
            type: 'menu-item'
          },
          {
            title: '导航栏管理',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '网店设置',
        type: 'submenu',
        children: [
          {
            title: '系统设置',
            type: 'menu-item'
          },
          {
            title: 'smtp设置',
            type: 'menu-item'
          },
          {
            title: '组件管理',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '权限管理',
        type: 'submenu',
        children: [
          {
            title: '管理员管理',
            type: 'menu-item'
          },
          {
            title: '角色管理',
            type: 'menu-item'
          }
        ]
      }
    ]
  },
  {
    title: '开发文档',
    type: 'menu-item',
    icon: 'el-icon-more',
    component: Doc
  }
]
