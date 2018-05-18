import request from '@/utils/request'

/**
 * 登录
 * @param username
 * @param password
 * @param validcode
 * @returns {*}
 */
export function loginByUsername(username, password, validcode) {
  const _params = {
    username,
    password,
    valid_code: validcode
  }
  return request({
    url: 'http://localhost:9090/javashop/core/admin/admin-user/login.do',
    method: 'post',
    loading: false,
    data: _params
  })
}

/**
 * 退出账户
 * @returns {*}
 */
export function logout() {
  return request({
    url: 'core/admin/admin-user/logout.do',
    method: 'post'
  })
}

/**
 * 获取用户信息
 * @param token
 * @returns {*}
 */
export function getUserInfo(token) {
  return request({
    url: 'http://www.andste.cc/mock/5aa72c250d9d060b4b99b466/admin/user',
    method: 'get',
    params: { token }
  })
}

/**
 * 获取用户角色权限
 * @param token
 * @returns {*}
 */
export function getUserRolesPermissions(token) {
  return request({
    url: 'http://www.andste.cc/mock/5aa72c250d9d060b4b99b466/admin/permission/menus',
    method: 'get'
  })
}
