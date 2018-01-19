/**
 * 商品审核API
 */
import request from '@/utils/request'
import GoodsAuditModel from '@/models/GoodsAuditModel'

/**
 * 获取待审核商品列表
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsAuditList(params) {
  params.seller_name = params.shop_name
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/goods/auth/list.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new GoodsAuditModel().map(response.data)
      resolve(_response)
    }).catch(error => console.log(error))
  })
}

/**
 * 和商品
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function goodsAudit(id, params) {
  const _params = {
    goodsId: id,
    pass: params.passed ? 1 : 2, // 1 --> 1, 0 --> 2,
    message: params.remark
  }
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/goods/auth/pass.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
