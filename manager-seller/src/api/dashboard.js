/**
 * 首页商家商城基本信息API
 */

import request from '@/utils/request'

export function getDashboardData() {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/dashboard',
      method: 'get',
      loading: false
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

