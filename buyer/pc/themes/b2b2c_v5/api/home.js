/**
 * Created by andste.cc@gmail.com on 2018/6/6.
 */

import request, { Method } from '@/utils/request'

/**
 * 获取焦点图
 * @param client_type
 */
export function getFocusPictures(client_type = 'PC') {
  return request({
    url: 'focus-pictures',
    method: Method.GET,
    loading: false,
    params: { client_type }
  })
}

/**
 * 获取导航列表
 */
export function getNav() {
  return request({
    url: 'http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/nav/list',
    method: Method.GET,
    loading: false
  })
}

/**
 * 获取首页商品分类
 * @param parent_id
 */
export function getCategory(parent_id = 0) {
  return request({
    url: `goods/categories/${parent_id}/children`,
    method: Method.GET,
    loading: false
  })
}
