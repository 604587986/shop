import Cookies from 'js-cookie'

const TokenKey = 'eyJhbGciOiJIUzUxMiJ9.eyJzZWxmT3BlcmF0ZWQiOjAsInVpZCI6MTAwLCJzdWIiOiJTRUxMRVIiLCJzZWxsZXJJZCI6MTczMiwicm9sZXMiOlsiQlVZRVIiLCJTRUxMRVIiXSwic2VsbGVyTmFtZSI6Iua1i-ivleW6l-mTuiIsInVzZXJuYW1lIjoid29zaGljZXNoaSJ9.cLVAOdWk3hiltbYcN3hTs7az2y6U7FQdjYwLEPcMgeES50O4ahgG4joT_rOAB2XvjS4ZR2R-_AgEMeScpXNW3g'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
