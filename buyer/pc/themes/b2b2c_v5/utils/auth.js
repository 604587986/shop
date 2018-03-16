const TokenKey = 'User-Token'

/**
 * 获取Token
 * @returns {string | null}
 */
export function getToken() {
  return window.localStorage.getItem(TokenKey)
}

/**
 * 设置Token
 * @param token
 */
export function setToken(token) {
  return window.localStorage.setItem(TokenKey, token)
}

/**
 * 移除Token
 */
export function removeToken() {
  return window.localStorage.removeItem(TokenKey)
}
