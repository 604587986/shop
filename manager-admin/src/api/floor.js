/**
 * Created by andste.cc@gmail.com on 2018/5/16.
 */

import request from '@/utils/request'

/**
 * 获取模板列表
 * @param type
 */
export function getTplList(type) {
  const url = type === 'mobile'
    ? 'http://localhost:9090/javashop/cms/admin/panel-tpl/mobile.do'
    : ''
  return request({
    url,
    method: 'get'
  })
}

/**
 * 获取楼层数据
 * @param type
 */
export function getFloorList(type) {
  const url = type === 'mobile'
    ? 'http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/floor/mobile'
    : ''
  return request({
    url,
    method: 'get'
  })
}
