/**
 * 赠品管理API
 */

import request from '@/utils/request'
import * as GiftModel from '@/models/GiftModel'

/**
 * 获取赠品品列表
 * @param params
 * @returns {Promise<any>}
 */
export function getGiftsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/promotion/full-discount-gifts',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new GiftModel.Gift().map(_response.data)
      resolve(_response)
    })
  })
}

/**
 * 删除赠品
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function deleteGifts(ids) {
  return new Promise((resolve, reject) => {
    request({
      url: `/promotion/full-discount-gifts/${ids}`,
      method: 'delete',
      loading: false
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 保存赠品更新
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function saveGifts(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/promotion/full-discount-gifts/${ids}`,
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      loading: false,
      data: new GiftModel.Gift().params(params)
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 新增赠品
 * @param params
 * @returns {Promise<any>}
 */
export function addGifts(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/promotion/full-discount-gifts',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      loading: false,
      data: new GiftModel.Gift().params(params)
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 查询一个赠品详情
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function getGiftDetails(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/promotion/full-discount-gifts/${id}`,
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = new GiftModel.Gift().map(response)
      resolve(_response)
    })
  })
}
