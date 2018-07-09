/**
 * 首页商家商城基本信息API
 */

import request from '@/utils/request'

export function getDashboardData() {
  return new Promise((resolve, reject) => {
    request({
      url: '/statistics/dashboard/shop',
      method: 'get',
      loading: false
    }).then(response => {
      resolve(response)
    })
  })
}

