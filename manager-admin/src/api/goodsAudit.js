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
  const _params = {
    keyword: params.keyword,
    page_no: params.page_no,
    page_size: params.page_size
  }
  return new Promise((resolve, reject) => {
    request({
      url: 'http://localhost:9090/javashop/shop/admin/goods/auth/list.do',
      method: 'get',
      loading: false,
      padams: _params
    }).then(response => {
      const _response = response
      _response.data = new GoodsAuditModel().map(response.data)
      resolve(_response)
    }).catch(error => console.log(error))
  })
}

/**
 * 审核和商品
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
      url: 'http://localhost:9090/javashop/shop/admin/goods/auth/pass.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
