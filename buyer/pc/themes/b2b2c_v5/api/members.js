/**
 * Created by andste.cc@gmail.com on 2018/6/8.
 */

import request, { Method } from '@/utils/request'

/**
 * 获取优惠券列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getCoupons(params) {
  return request({
    url: 'http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/coupons',
    method: Method.GET,
    needToken: true,
    params
  })
}

/**
 * 获取当前会员积分
 * @returns {*}
 */

export function getPoints() {
  return request({
    url: 'members/points/current',
    method: Method.GET,
    needToken: true
  })
}

/**
 * 获取积分明细数据
 * @param params
 * @returns {AxiosPromise}
 */
export function getPointsData(params) {
  return request({
    url: 'members/points',
    method: Method.GET,
    needToken: true,
    params
  })
}

/**
 * 获取我的评论列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getComments(params) {
  return request({
    url: 'member/comments',
    method: Method.GET,
    needToken: true,
    params
  })
}

/**
 * 订单评论
 * @param params
 */
export function commentsOrder(params) {
  return request({
    url: 'member/comments',
    method: Method.POST,
    needToken: true,
    data: params
  })
}

/**
 * 获取我的咨询列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getConsultations(params) {
  return request({
    url: 'member/asks',
    method: Method.GET,
    needToken: true,
    params
  })
}

/**
 * 商品咨询
 * @param goods_id
 * @param ask_content
 */
export function consultating(goods_id, ask_content) {
  return request({
    url: 'member/asks',
    method: Method.POST,
    needToken: true,
    data: {
      goods_id,
      ask_content
    }
  })
}

/**
 * 获取商品收藏
 * @param params
 * @returns {AxiosPromise}
 */
export function getGoodsCollection(params) {
  return request({
    url: 'members/collection/goods',
    method: Method.GET,
    loading: false,
    message: false,
    params
  })
}

/**
 * 收藏商品
 * @param goods_id 商品ID
 * @returns {AxiosPromise}
 */
export function collectionGoods(goods_id) {
  return request({
    url: 'members/collection/goods',
    method: Method.POST,
    data: { goods_id }
  })
}

/**
 * 删除商品收藏
 * @param ids 收藏ID【集合或单个商品ID】
 * @returns {AxiosPromise}
 */
export function deleteGoodsCollection(ids) {
  if (Array.isArray(ids)) ids = ids.join(',')
  return request({
    url: `members/collection/goods/${ids}`,
    method: Method.DELETE,
    needToken: true
  })
}

/**
 * 获取店铺收藏
 * @param params
 * @returns {AxiosPromise}
 */
export function getShopCollection(params) {
  return request({
    url: 'members/collection/shops',
    method: Method.GET,
    needToken: true,
    params
  })
}

/**
 * 收藏店铺
 * @param shop_id 店铺ID
 * @returns {AxiosPromise}
 */
export function collectionShop(shop_id) {
  return request({
    url: 'members/collection/shop',
    method: Method.POST,
    needToken: true,
    data: { shop_id }
  })
}

/**
 * 删除店铺收藏
 * @param id
 */
export function deleteShopCollection(id) {
  return request({
    url: `members/collection/shop/${id}`,
    method: Method.DELETE,
    needToken: true
  })
}

/**
 * 获取当前登录的用户信息
 * @returns {AxiosPromise}
 */
export function getUserInfo() {
  return request({
    url: `members`,
    method: Method.GET,
    needToken: true
  })
}

/**
 * 保存用户信息
 * @param params
 * @returns {AxiosPromise}
 */
export function saveUserInfo(params) {
  return request({
    url: 'members',
    method: Method.PUT,
    needToken: true,
    data: params
  })
}

/**
 * 登出
 * @returns {AxiosPromise}
 */
export function logout() {
  return request({
    url: `members/logout`,
    method: Method.POST,
    needToken: true
  })
}
