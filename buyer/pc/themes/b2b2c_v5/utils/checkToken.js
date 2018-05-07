/**
 * Created by laiyu on 2018/5/7.
 */

import Vue from 'vue'
import Storage from './storage'

export default function () {
  // 访问Token
  const accessToken = Storage.getItem('accessToken')
  // 刷新Token
  const refreshToken = Storage.getItem('refreshToken')
  // 访问Token失效时间【毫秒】
  const accessTokenExpires = Number(Storage.getItem('accessTokenExpires') || 0)
  // 刷新Token失效时间【毫秒】
  const refreshTokenExpires = Number(Storage.getItem('refreshTokenExpires') || 0)
  // 现在时间，时间戳【毫秒】
  const nowTime = new Date().getTime()
  
  return new Promise((resolve, reject) => {
  
  })
}
