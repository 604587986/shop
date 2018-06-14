/**
 * 首页仪表盘API
 */

import request from '@/utils/request'

export function getDashboardData() {
  const nowDate = new Date()
  const year = nowDate.getFullYear()
  const month = nowDate.getMonth() + 1
  const urls = [
    `b2b2c/admin/salesStatis/sale-income-totle-json.do?year=${year}&month=${month}`,
    'shop/admin/member/member-list-json.do',
    '/goods'
  ]
  const alls = []
  urls.forEach((url, index) => {
    alls.push(request({ url, method: 'get', loading: false })
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error)))
  })
  return new Promise((resolve, reject) => {
    Promise.all(alls).then(values => resolve({
      incomeStatistics: values[0].data,
      memberList: values[1].data,
      goodsList: values[2].data
    })).catch(error => reject(error))
  })
}

