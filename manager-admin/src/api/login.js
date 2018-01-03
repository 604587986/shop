import request from '@/utils/request'

export function loginByUsername(username, password, validcode) {
  const data = {
    username,
    password,
    validcode
  }
  return request({
    url: 'login',
    method: 'post',
    loading: false,
    data
  })
}

export function logout() {
  return request({
    url: 'logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: 'user',
    method: 'get',
    params: { token }
  })
}

