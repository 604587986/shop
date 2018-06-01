/**
 * 进度相关API
 */

import request from '@/utils/request'

/**
 * 查看是否有相同任务正在进行
 * @param id
 * @returns {Promise<any>}
 */
export function hasSameTask(id) {
  return request({
    url: 'progress/has-task',
    method: 'get',
    loading: false,
    params: { progress_id: id }
  })
}

/**
 * 获取进度条
 * @param id
 */
export function getProgressById(id) {
  return request({
    url: 'progress/view',
    method: 'get',
    loading: false,
    params: { progress_id: id }
  })
}
