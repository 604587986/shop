/**
 * 首页仪表盘API
 */
import request from '@/utils/request'

import GoodsModel from '@/models/GoodsModel'
import MemberModel from '@/models/MemberModel'

export function getDashboardData() {
  return new Promise((resolve, reject) => {
    request({
      url: 'dashboard',
      method: 'get',
      loading: false
    }).then(response => {
      const _response = { ...response.data }
      _response.goodsList = new GoodsModel().map(_response.goodsList)
      _response.memberList = new MemberModel().map(_response.memberList)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

