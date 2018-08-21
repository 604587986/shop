/**
 * Created by Andste on 2018/5/28.
 */

import request from '@/utils/request'
import { domain } from '~/ui-domain'

export default {
  props: {
    // 选择器类型，后台管理：admin，商家中心：seller
    type: {
      type: String,
      default: 'admin'
    },
    // 显示dialog
    show: {
      type: Boolean,
      default: false
    },
    api: {
      type: String,
      default: 'admin/goods'
    },
    // 获取多个商品API
    multipleApi: {
      type: String,
      default: 'admin/goods/@ids/details'
    },
    // 分类API
    categoryApi: {
      type: String,
      default: 'admin/goods/categories/@id/children'
    },
    // 最大可选个数
    limit: {
      type: Number,
      default: 0
    },
    // 默认数据
    defaultData: {
      type: Array,
      default: () => ([])
    },
    // 排除
    excludeData: {
      type: Array,
      default: () => ([])
    },
    // 商品类型 【NORMAL： 普通商品, POINT：积分商品】
    goodsType: {
      type: String,
      default: 'NORMAL'
    }
  },
  data() {
    return {
      params: {
        page_no: 1,
        page_size: 10,
        // 商品分类路径
        category_path: '',
        // 店铺名称
        seller_name: '',
        // 商品类型
        goods_type: '', //this.goodsType
        // 一个或多个商品ids
        goods_ids: ''
      },
      /** 加载状态 */
      loading: false,
      /** 商品列表 */
      goodsList: [],
      /** 已选列表 */
      selectedList: [],
      dialogVisible: this.show,
      // 前台域名
      buyerDomain: domain.buyer_pc
    }
  },
  watch: {
    show(newVal) {
      this.dialogVisible = newVal
      if (this.goodsList.length === 0 && newVal === true) {
        this.GET_GoodsList()
        this.$nextTick(() => {
          this.$selectedList = document.getElementById('goods-picker-selected-' + this._uid)
        })
      }
    },
    dialogVisible(newVal) {
      newVal === false && this.$emit('close')
    },
    'defaultData': 'defaultDataChanged'
  },
  computed: {
    /** 计算已选择个数 */
    selectedNum() {
      return this.selectedList.filter(item => item).length
    }
  },
  filters: {
    formatPrice(price) {
      return '￥' + String(Number(price).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  methods: {
    /** 确认 */
    handleConfirm() {
      this.$emit('confirm', this.selectedList.filter(item => item))
      this.$emit('close')
      this.selectedList = []
    },
    /** 加载更多 */
    handleLoadMore() {
      if (this.loading) return
      this.params.page_no += 1
      this.GET_GoodsList()
    },
    /** 点击商品【可能是选择也可能是取消】 */
    handleClickItem(item, index) {
      let _index = this.selectedList.findIndex(_item => _item.goods_id === item.goods_id)
      if (_index !== -1) {
        this.selectedList.splice(_index, 1)
      } else {
        const { limit } = this
        if (limit > 0 && this.selectedList.filter(item => item).length >= limit) {
          this.$message.error('超过最大可选个数：' + this.limit)
          return
        }
        this.selectedList.push(item)
        this.scrollToBottom()
      }
    },
    /** 从已选商品中移除商品 */
    handleRemoveItem(item, index) {
      this.selectedList.splice(index, 1)
    },
    /** 已选择列表滚动到底部 */
    scrollToBottom() {
      this.$nextTick(() => {
        const $sel = this.$selectedList
        $sel.scrollTop = $sel.scrollHeight
      })
    },
    /** 当默认数据发生改变 */
    defaultDataChanged(newVal) {
      this.selectedList = []
      if (newVal && newVal.length > 0) {
        this.GET_GoodsByGoodsIds(newVal).then(response => this.selectedList.push(...response))
      }
    },
    /** 计算是否已被选 */
    isSelected(goods) {
      return this.selectedList.findIndex(item => item.goods_id === goods.goods_id) !== -1
    },
    /** 查找多个商品 */
    handleSearchMultipleGoods() {
      const { goods_ids } = this.params
      if (goods_ids) {
        this.GET_GoodsByGoodsIds(goods_ids).then(response => this.goodsList = response)
      } else {
        this.GET_GoodsList(true)
      }
    },
    /** 获取商品列表 */
    GET_GoodsList(clean = false) {
      this.loading = true
      !!clean && (this.params.page_no = 1)
      const { params } = this
      const _params = {}
      Object.keys(this.params).forEach(key => {
        if (String(this.params[key])) _params[key] = params[key]
      })
      request({
        url: this.api,
        method: 'get',
        loading: false,
        params: _params
      }).then(response => {
        this.loading = false
        const data = response.data
        data.map(item => {
          item.goods_image = item.thumbnail
          item.goods_price = item.price
          return item
        })
        // 如果clean为true，先清空goodsList
        !!clean && (this.goodsList = [])
        this.goodsList.push(...data)
      })
    },
    /** 根据商品编号获取商品信息 */
    GET_GoodsByGoodsIds(ids) {
      ids = typeof ids === 'string'
        ? ids.replace(/，/g, ',')
        : ids.join(',')
      return new Promise((resolve, reject) => {
        request({
          url: this.multipleApi.replace('@ids', ids),
          method: 'get',
          loading: false
        }).then(response => {
          const data = response.map(item => {
            item.goods_image = item.thumbnail
            item.goods_price = item.price
            return item
          })
          resolve(data)
        }).catch(reject)
      })
    }
  }
}
