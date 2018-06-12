/**
 * 促销相关API
 */

import request from '@/utils/request'

/**
 * 获取积分分类下级
 * @param parent_id
 */
export function getExchangeCatsChildren(parent_id = 0) {
  return request({
    url: `promotion/exchange-cats/${parent_id}/children`,
    method: 'get'
  })
}

/**
 * 添加积分兑换分类
 * @param params
 */
export function addExchangeCat(params) {
  return request({
    url: 'promotion/exchange-cats',
    method: 'post',
    data: params
  })
}

/**
 * 获取积分兑换分类详情
 * @param id
 */
export function getExchangeCatsDetail(id) {
  return request({
    url: `promotion/exchange-cats/${id}`,
    method: 'get'
  })
}

/**
 * 编辑积分兑换分类
 * @param id
 * @param params
 */
export function editExhcangeCat(id, params) {
  return request({
    url: `promotion/exchange-cats/${id}`,
    method: 'put',
    data: params
  })
}

/**
 * 删除积分兑换分类
 * @param id
 */
export function deleteExchangeCat(id) {
  return request({
    url: `promotion/exchange-cats/${id}`,
    method: 'delete'
  })
}

/**
 * 获取积分商品列表
 * @param params
 */
export function getExchangeGoods(params) {
  return request({
    url: 'promotion/exchange-goods',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取团购活动列表
 * @param params
 */
export function getGroupBuyActives(params) {
  return request({
    url: 'promotion/group-buy-actives',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 添加团购活动
 * @param params
 */
export function addGrouBuyActivity(params) {
  return request({
    url: 'promotion/group-buy-actives',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: params
  })
}

/**
 * 获取团购活动详情
 * @param id
 */
export function getGroupBuyActivityDetail(id) {
  return request({
    url: `promotion/group-buy-actives/${id}`,
    method: 'get'
  })
}

/**
 * 编辑团购活动
 * @param id
 * @param params
 */
export function editGroupBuyActivity(id, params) {
  return request({
    url: `promotion/group-buy-actives/${id}`,
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data: params
  })
}

/**
 * 删除团购活动
 * @param id
 */
export function deleteGroupBuyActivity(id) {
  return request({
    url: `promotion/group-buy-actives/${id}`,
    method: 'delete'
  })
}

/**
 * 审核团购商品
 * @param id
 * @param params
 */
export function reviewGroupBuyGoods(id, params) {
  return request({
    url: `promotion/group-buy-actives/review/${id}`,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: params
  })
}

export function getGroupBuyGoodsList(params) {
  return request({
    url: `promotion/group-buy-goods`
  })
}

/**
 * 获取团购分类列表
 * @param params
 */
export function getGroupBuyCategory(params) {
  return request({
    url: 'promotion/group-buy-cats',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 添加团购分类
 * @param params
 */
export function addGroupBuyCategory(params) {
  return request({
    url: 'promotion/group-buy-cats',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: params
  })
}

/**
 * 获取团购详情
 * @param id
 */
export function getGroupBuyCategoryDetail(id) {
  return request({
    url: `promotion/group-buy-cats/${id}`,
    method: 'get'
  })
}

/**
 * 编辑团购分类
 * @param id
 * @param params
 */
export function editGroupBuyCategory(id, params) {
  return request({
    url: `promotion/group-buy-cats/${id}`,
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data: params
  })
}

/**
 * 删除团购分类
 * @param id
 */
export function deleteGroupBuyCategory(id) {
  return request({
    url: `promotion/group-buy-cats/${id}`,
    method: 'delete'
  })
}

/**
 * 获取限时抢购列表
 * @param params
 */
export function getSeckillList(params) {
  return request({
    url: 'promotion/seckills',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 增加限时抢购
 * @param params
 */
export function addSeckill(params) {
  return request({
    url: 'promotion/seckills',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: params
  })
}

/**
 * 获取限时抢购详情
 * @param id
 */
export function getSeckillDetail(id) {
  return request({
    url: `promotion/seckills/${id}`,
    method: 'get'
  })
}

/**
 * 修改限时抢购
 * @param id
 * @param params
 */
export function editSeckill(id, params) {
  return request({
    url: `promotion/seckills/${id}`,
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data: params
  })
}

/**
 * 删除限时抢购
 * @param id
 */
export function deleteSeckill(id) {
  return request({
    url: `promotion/seckills/${id}`,
    method: 'delete'
  })
}

/**
 * 发布限时抢购
 * @param id
 * @param params
 */
export function releaseSeckill(id, params) {
  return request({
    url: `promotion/seckills/${id}/release`,
    method: 'post'
  })
}

/**
 * 审核商品
 * @param apply_id
 * @param params
 */
export function reviewSeckill(apply_id, params) {
  return request({
    url: `promotion/seckills/review/${apply_id}`,
    method: 'post'
  })
}
