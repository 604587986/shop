/**
 * Created by Andste on 2018/8/2.
 */

import request, { Method } from '@/utils/request'

/**
 * 获取我的推荐人
 */
export function getMyRefereer() {
  return request({
    url: `http://192.168.2.5:7005/distribution/recommend-me`,
    method: Method.GET,
    needToken: true
  })
}

/**
 * 获取推荐人列表
 */
export function getRefereeList() {
  return request({
    url: `http://192.168.2.5:7005/distribution/lower-list`,
    method: Method.GET,
    needToken: true
  })
}

/**
 * 获取与我相关的结算单信息
 * @param params
 */
export function getRelevantTotal(params) {
  return request({
    url: `http://192.168.2.5:7005/distribution/bill/member`,
    method: Method.GET,
    needToken: true,
    params
  })
}

/**
 * 获取与我相关的订单信息
 * @param params
 */
export function getRelevantList(params) {
  return request({
    url: `http://192.168.2.5:7005/distribution/bill/order-list`,
    method: Method.GET,
    needToken: true,
    params
  })
}

/**
 * 获取与我相关的退款单信息
 * @param params
 */
export function getRelevantRefundList(params) {
  return request({
    url: `http://192.168.2.5:7005/distribution/bill/sellback-order-list`,
    method: Method.GET,
    needToken: true,
    params
  })
}

/**
 * 获取我的历史业绩单
 * @param params
 */
export function getMyHistoryTotal(params) {
  return request({
    url: `http://192.168.2.5:7005/distribution/bill/member/total`,
    method: Method.GET,
    needToken: true,
    params
  })
}

/**
 * 获取我的历史业绩
 * @param params
 */
export function getMyHistoryList(params) {
  return request({
    url: `http://192.168.2.5:7005/distribution/bill/history`,
    method: Method.GET,
    needToken: true,
    params
  })
}

/**
 * 获取提现设置
 */
export function getWithdrawalsParams() {
  return request({
    url: `http://192.168.2.5:7005/distribution/withdraw/params`,
    method: Method.GET,
    needToken: true
  })
}

/**
 * 保存提现设置
 * @param params
 */
export function reserveWithdrawalsParams(params) {
  return request({
    url: `http://192.168.2.5:7005/distribution/withdraw/params`,
    method: Method.PUT,
    needToken: true,
    params
  })
}

/**
 * 申请提现
 * @param params
 */
export function applyWithdrawals(params) {
  return request({
    url: `http://192.168.2.5:7005/distribution/withdraw/apply-withdraw`,
    method: Method.POST,
    needToken: true,
    params
  })
}


/**
 * 获取可提现金额
 */
export function getWithdrawalsCanRebate() {
  return request({
    url: `http://192.168.2.5:7005/distribution/withdraw/can-rebate`,
    method: Method.GET,
    needToken: true
  })
}

/**
 * 获取提现记录
 * @param params
 */
export function getWithdrawalsList(params) {
  return request({
    url: `http://192.168.2.5:7005/distribution/withdraw/apply-history`,
    method: Method.GET,
    needToken: true,
    params
  })
}
