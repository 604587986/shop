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
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return request({
    url: 'core/admin/admin-user/login.do',
    method: 'post',
    loading: false,
    data: _formData
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
    url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/user',
    method: 'get',
    params: { token }
  })
}

