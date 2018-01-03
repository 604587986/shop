import request from '@/utils/request'

import GoodsListModel from '../models/GoodsListModel'
import MemberInfoModel from '../models/MemberInfoModel'

export function getDashboardData() {
  return new Promise((resolve, reject) => {
    request({
      url: 'dashboard',
      method: 'get',
      loading: false
    })
      .then(response => {
        const _response = { ...response.data }
        _response.goodsList = new GoodsListModel().map(_response.goodsList)
        _response.memberList = new MemberInfoModel().map(_response.memberList)
        resolve(_response)
      })
      .catch(error => reject(error))
  })
}

