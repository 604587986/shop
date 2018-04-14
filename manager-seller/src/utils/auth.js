import Cookies from 'js-cookie'

const TokenKey = 'eyJhbGciOiJIUzUxMiJ9.eyJzZWxmT3BlcmF0ZWQiOm51bGwsInVpZCI6MTAwLCJzdWIiOiJTRUxMRVIiLCJzZWxsZXJJZCI6MTAwLCJyb2xlcyI6WyJCVVlFUiIsIlNFTExFUiJdLCJzZWxsZXJOYW1lIjoi5rWL6K-V5bqX6ZO6IiwiZXhwIjoxNTI0MzY5MjQxLCJ1c2VybmFtZSI6ImNlc2hpZGlhbnB1In0.vuYe8yYT1TnSOrZZ6KjDdEaGbiBot0CQFLyFwlZ82PU0dKBDg41pUKPHEENbimOr7-SxJqt_zJP6yDBnGuGShQ'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
