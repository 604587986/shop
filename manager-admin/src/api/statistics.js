/**
 * 统计相关API
 */

import request from '@/utils/request'

/** 会员分析 */

/**
 * 会员下单量
 * @param params
 * @returns {Promise<any>}
 */
export function memberOrderNum(params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  _formData.append('store_id', params.shop_id)
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/memberStatistics/get-order-num-top.do',
      method: 'post',
      loading: false,
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 会员订单商品量
 * @param params
 * @returns {Promise<any>}
 */
export function memberGoodsNum(params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  _formData.append('store_id', params.shop_id)
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/memberStatistics/get-goods-num-top.do',
      method: 'post',
      loading: false,
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 会员订单金额
 * @param params
 * @returns {Promise<any>}
 */
export function memberPriceNum(params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  _formData.append('store_id', params.shop_id)
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/memberStatistics/get-order-price-top.do',
      method: 'post',
      loading: false,
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 新增会员统计
 * @param params
 * @returns {Promise<any>}
 */
export function addMemberStatistics(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/memberStatistics/get-add-member-num.do',
      method: 'get',
      loading: false,
      params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/** 商品统计 */

/**
 * 价格销量
 * @param params
 * @returns {Promise<any>}
 */
export function getPriceSales(params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  _formData.append('store_id', params.shop_id)
  _formData.append('cycle_type', params.type)
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/goodsStatis/get-price-sales-json.do',
      method: 'post',
      loading: false,
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 获取热卖商品下单金额
 * @param params
 * @returns {Promise<any>}
 */
export function hotGoodsPrice(params) {
  params.store_id = params.shop_id
  params.cycle_type = params.type
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/goodsStatis/get-hot-goods-money-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = response.data.chartsjson.map(item => {
        item.price = item.y
        return item
      })
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 获取热卖商品下单量
 * @param params
 * @returns {Promise<any>}
 */
export function hotGoodsNum(params) {
  params.store_id = params.shop_id
  params.cycle_type = params.type
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/goodsStatis/get-hot-goods-num-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = response.data.chartsjson.map(item => {
        item.num = item.y
        return item
      })
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 获取收藏排行
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsCollectTop(params) {
  params.shopId = params.shop_id
  return new Promise((resolve, reject) => {
    request({
      url: '/b2b2c/admin/goodsStatis/get-collect-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = response.data.map(item => {
        item.num = item.y
        item.name = item.goods_name
        return item
      })
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/** 行业分析 */

/**
 * 获取行业规模下单量
 * @param params
 * @returns {Promise<any>}
 */
export function getIndustryScaleOrder(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/industryStatistics/industry-order.do',
      method: 'get',
      loading: false,
      params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 获取行业规模下单商品数量
 * @param params
 * @returns {Promise<any>}
 */
export function getIndustryScaleGoods(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/industryStatistics/industry-order.do',
      method: 'get',
      loading: false,
      params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 获取行业规模下单金额
 * @param params
 * @returns {Promise<any>}
 */
export function getIndustryScalePrice(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/industryStatistics/industry-order.do',
      method: 'get',
      loading: false,
      params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 获取概括总览数据
 * @param params
 * @returns {Promise<any>}
 */
export function getGeneralityOverviewData(params) {
  params.category_id = params.cat_id
  params.store_id = params.shop_id
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/industryStatistics/collect-data.do',
      method: 'get',
      loading: false,
      params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/** 流量分析 */
/**
 * 获取流量分析数据
 * @param params
 * @returns {Promise<any>}
 */
export function getTrafficAnalysisData(params) {
  params.statistics_type = params.type
  params.store_id = params.shop_id
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/flowStatistics/get-flow-statistics.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = response.data.map(item => {
        item.date = item.day_num
        return item
      })
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 获取商品流量数据
 * @param params
 * @returns {Promise<any>}
 */
export function getTrafficAnalysisGoodsData(params) {
  params.top_num = 10
  params.store_id = params.shop_id
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/flowStatistics/get-goods-flow-statistics.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = response.data.map(item => {
        item.name = item.goods_name
        return item
      })
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/** 其它统计 */
/**
 * 下单金额
 * @param params
 * @returns {Promise<any>}
 */
export function getOrderStatisticsPrice(params) {
  params.store_id = params.shop_id
  params.cycle_type = params.type
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/salesStatis/get-sale-money-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 下单金额表格数据
 * @param params
 * @returns {Promise<any>}
 */
export function getOrderStatisticsPrideTable(params) {
  params.store_id = params.shop_id
  params.ststus = params.order_status
  params.cycle_type = params.type
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/salesStatis/list-json.do',
      method: 'post',
      loading: false,
      params
    }).then(resposne => resolve(resposne)).catch(error => reject(error))
  })
}

/**
 * 下单量
 * @param params
 * @returns {Promise<any>}
 */
export function getOrderStatisticsOrder(params) {
  params.store_id = params.shop_id
  params.cycle_type = params.type
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/salesStatis/get-sale-num-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 获取销售收入统计
 * @param params
 * @returns {Promise<any>}
 */
export function getSalesRevenueStatistics(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/salesStatis/sale-income-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

