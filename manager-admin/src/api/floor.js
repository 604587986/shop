/**
 * Created by andste.cc@gmail.com on 2018/5/16.
 */

import request from '@/utils/request'

/**
 * 获取模板列表
 */
export function getTpllist(type) {
  const url = type === 'mobile'
    ? 'http://localhost:9090/javashop/cms/admin/panel-tpl/mobile.do'
    : ''
  return request({
    url,
    method: 'get'
  })
}
