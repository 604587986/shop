import Foundation from './Foundation'

/**
 * 金钱单位置换  2999 --> 2,999.00
 * @param val
 * @param unit
 * @returns {*}
 */
export function unitPrice(val, unit) {
  return (unit || '') + Foundation.formatPrice(val)
}

/**
 * 处理unix时间戳，转换为可阅读时间格式
 * @param unix
 * @param format
 * @returns {*|string}
 */
export function unixToDate(unix, format) {
  let _format = format || 'yyyy-MM-dd hh:mm:ss'
  const d = new Date(unix * 1000)
  const o = {
    'M+': d.getMonth() + 1,
    'd+': d.getDate(),
    'h+': d.getHours(),
    'm+': d.getMinutes(),
    's+': d.getSeconds(),
    'q+': Math.floor((d.getMonth() + 3) / 3),
    S: d.getMilliseconds()
  }
  if (/(y+)/.test(_format)) _format = _format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (const k in o) if (new RegExp('(' + k + ')').test(_format)) _format = _format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  return _format
}

/**
 * 根据订单状态码返回订单状态
 * @param status_code
 * @returns {string}
 */
export function unixOrderStatus(status_code) {
  switch (status_code) {
    case 'NEW':
      return '新订单'
    case 'INTODB_ERROR':
      return '入库失败'
    case 'CONFIRM':
      return '已确认'
    case 'PAID_OFF':
      return '已付款'
    case 'SHIPPED':
      return '已发货'
    case 'ROG':
      return '已收货'
    case 'COMPLETE':
      return '已完成'
    case 'CANCELLED':
      return '已取消'
    case 'AFTER_SERVICE':
      return '售后中'
  }
}