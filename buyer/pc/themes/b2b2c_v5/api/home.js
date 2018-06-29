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
export function getSiteMenu(client_type = 'PC') {
  return request({
    url: 'pages/site-navigations',
    method: Method.GET,
    loading: false,
    params: { client_type }
  })
}

/**
 * 获取热门关键词
 * @param num
 */
export function getHotKeywords(num = 7) {
  return request({
    url: 'pages/hot-keywords',
    method: Method.GET,
    loading: false,
    params: { num }
  })
}

/**
 * 获取楼层数据
 * @param client_type
 * @param page_type
 */
export function getFloorData(client_type = 'PC', page_type = 'INDEX') {
  return request({
    url: `pages/${client_type}/${page_type}`,
    method: 'get'
  })
}
