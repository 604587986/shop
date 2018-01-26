/**
 * 店铺模板相关API
 */

import request from '@/utils/request'
import ShopThemeModel from '@/models/ShopThemeModel'

/**
 * 获取店铺模板列表
 * @param params
 * @returns {Promise<any>}
 */
export function getShopThemeList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/store-themes/list-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new ShopThemeModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}
