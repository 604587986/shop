//  概况
const Home = () => import('./views/seller/Home.vue')

//  商品管理
const GoodsList = () => import('./views/seller/goods/GoodsList.vue')
const Classify = () => import('./views/seller/goods/Classfiy.vue')
const TagList = () => import('./views/seller/goods/TagList.vue')

//  开发文档
const Doc = () => import('./views/doc/Index.vue')

export default [
  {
    title: '概况',
    type: 'menu-item',
    icon: 'el-icon-info',
    component: Home
  },
  {
    title: '商品管理',
    type: 'submenu',
    icon: 'el-icon-menu',
    children: [
      {
        title: '商品发布',
        type: 'submenu',
        children: [
          {
            title: '商品发布1',
            type: 'menu-item'
          },
          {
            title: '商品发布2',
            type: 'menu-item'
          }
        ]
      },
      {
        title: '商品列表',
        type: 'menu-item',
        component: GoodsList
      },
      {
        title: '分类管理',
        type: 'menu-item',
        component: Classify
      },
      {
        title: '标签管理',
        type: 'menu-item',
        component: TagList
      },
      {
        title: '回收站',
        type: 'menu-item'
      },
      {
        title: '预警货品',
        type: 'menu-item'
      }
    ]
  },
  {
    title: '交易管理',
    type: 'submenu',
    icon: 'el-icon-upload',
    children: [
      {
        title: '所有订单',
        type: 'menu-item'
      },
      {
        title: '待发货订单',
        type: 'menu-item'
      },
      {
        title: '维权订单',
        type: 'menu-item'
      },
      {
        title: '物流管理',
        type: 'menu-item'
      },
      {
        title: '评价管理',
        type: 'menu-item'
      },
      {
        title: '结算管理',
        type: 'menu-item'
      },
      {
        title: '发票历史',
        type: 'menu-item'
      }
    ]
  },
  {
    title: '促销管理',
    type: 'submenu',
    icon: 'el-icon-time',
    children: [
      {
        title: '购满优惠',
        type: 'menu-item'
      },
      {
        title: '单品立减',
        type: 'menu-item'
      },
      {
        title: '第二件半价',
        type: 'menu-item'
      },
      {
        title: '优惠券管理',
        type: 'menu-item'
      },
      {
        title: '赠品管理',
        type: 'menu-item'
      },
      {
        title: '团购管理',
        type: 'menu-item'
      }
    ]
  },
  {
    title: '店铺管理',
    type: 'submenu',
    icon: 'el-icon-date',
    children: [
      {
        title: '店铺设置',
        type: 'menu-item'
      },
      {
        title: '店铺模板',
        type: 'menu-item'
      },
      {
        title: 'Wap店铺模板',
        type: 'menu-item'
      },
      {
        title: '店铺幻灯片',
        type: 'menu-item'
      },
      {
        title: '店铺导航',
        type: 'menu-item'
      },
      {
        title: '货品预警',
        type: 'menu-item'
      },
      {
        title: '等级申请',
        type: 'menu-item'
      }
    ]
  },
  {
    title: '统计分析',
    type: 'submenu',
    icon: 'el-icon-d-caret',
    children: [
      {
        title: '店铺概况',
        type: 'menu-item'
      },
      {
        title: '店铺分析',
        type: 'menu-item'
      },
      {
        title: '运营报告',
        type: 'menu-item'
      },
      {
        title: '流量统计',
        type: 'menu-item'
      },
      {
        title: '收藏统计',
        type: 'menu-item'
      },
      {
        title: '日志管理',
        type: 'menu-item'
      }
    ]
  },
  {
    title: '客服管理',
    type: 'submenu',
    icon: 'el-icon-d-caret',
    children: [
      {
        title: '咨询管理',
        type: 'menu-item'
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
