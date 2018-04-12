import request from '@/utils/request'

/**
 * 获取购买分析列表
 * @param params
 * @returns {Promise<any>}
 */
export function getbuyAnyalysisList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/buy/Anyalysis/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}
