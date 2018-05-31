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
 */
export function getPriceSales(params) {
  return request({
    url: 'statistics/goods/price/sales',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取热卖商品下单金额
 * @param params
 */
export function getHotGoodsPrice(params) {
  return request({
    url: 'statistics/goods/hot/money',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取热卖商品下单金额表格数据
 * @param params
 */
export function getHotGoodsPricePage(params) {
  return request({
    url: 'statistics/goods/hot/money/page',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取热卖商品下单量
 * @param params
 */
export function getHotGoodsNum(params) {
  return request({
    url: 'statistics/goods/hot/num',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取热卖商品下单量表格数据
 * @param params
 */
export function getHotGoodsNumPage(params) {
  return request({
    url: 'statistics/goods/hot/num/page',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取收藏排行
 * @param params
 */
export function getGoodsCollectTop(params) {
  return request({
    url: 'statistics/goods/collect',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取收藏排行表格数据
 * @param params
 */
export function getGoodsCollectTopPage(params) {
  return request({
    url: 'statistics/goods/collect/page',
    method: 'get',
    loading: false,
    params
  })
}

/** 行业分析 */

/**
 * 获取行业规模下单量
 * @param params
 */
export function getIndustryScaleOrder(params) {
  return request({
    url: 'statistics/industry/order/quantity',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取行业规模下单商品数量
 * @param params
 */
export function getIndustryScaleGoods(params) {
  return request({
    url: 'statistics/industry/goods/num',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取行业规模下单金额
 * @param params
 */
export function getIndustryScalePrice(params) {
  return request({
    url: 'statistics/industry/order/money',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取概括总览数据
 * @param params
 */
export function getGeneralityOverviewData(params) {
  return request({
    url: 'statistics/industry/overview',
    method: 'get',
    loading: false,
    params
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
 * 订单统计 - 下单金额
 * @param params
 */
export function getOrderStatisticsPrice(params) {
  return request({
    url: 'statistics/order/order/money',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 订单统计 - 下单量
 * @param params
 */
export function getOrderStatisticsOrder(params) {
  return request({
    url: 'statistics/order/order/num',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 订单统计 - 下单量表格数据
 * @param params
 * @returns {Promise<any>}
 */
export function getOrderStatisticsPage(params) {
  return request({
    url: 'statistics/order/order/page',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取销售收入统计表格数据
 * @param params
 */
export function getSalesRevenueStatisticsPage(params) {
  return request({
    url: 'statistics/order/sales/money',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取销售收入总览
 * @param params
 */
export function getSalesRevenueStatisticsTotal(params) {
  return request({
    url: 'statistics/order/sales/total',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取区域分析表格
 * @param params
 */
export function getRegionalAnalysisTable(params) {
  return request({
    url: 'statistics/order/region/form',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取区域分析下单会员数
 * @param params
 */
export function getRegionalAnalysisMember(params) {
  return request({
    url: 'statistics/order/region/member',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取区域分析下单金额
 * @param params
 */
export function getRegionalAnalysisPrice(params) {
  return request({
    url: 'statistics/order/region/money',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取区域分析下单量
 * @param params
 */
export function getRegionalAnalysisNum(params) {
  return request({
    url: 'statistics/order/region/num',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取客单价分布
 * @param params
 */
export function getOrderPriceDistribution(params) {
  return request({
    url: 'statistics/order/unit/price',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取购买时段分布
 * @param params
 */
export function getBuyTimeDistribution(params) {
  return request({
    url: 'statistics/order/unit/time',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取购买频次数据
 * @param params
 */
export function getBuyFrequency(params) {
  return request({
    url: 'statistics/order/unit/num',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取退款统计
 * @param params
 */
export function getRefundStatistics(params) {
  return request({
    url: 'statistics/order/return/money',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 商品销售明细
 * @param params
 */
export function getGoodsSaleDetail(params) {
  return request({
    url: 'statistics/goods/sale/details',
    method: 'get',
    loading: false,
    params
  })
}
