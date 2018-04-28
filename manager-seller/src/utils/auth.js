import Cookies from 'js-cookie'

const TokenKey = 'eyJhbGciOiJIUzUxMiJ9.eyJzZWxmT3BlcmF0ZWQiOjAsInVpZCI6Miwic3ViIjoiU0VMTEVSIiwic2VsbGVySWQiOjMsInJvbGVzIjpbIkJVWUVSIiwiU0VMTEVSIl0sInNlbGxlck5hbWUiOiLnjovls7Dlupfpk7oxMTEiLCJ1c2VybmFtZSI6ImtpbmdhcGV4In0.rFV567biYKAgNuw1eA4roV8k2d6YyJRLAmIBhi0MxxKDnq_lGvK-GU1J6RmYjzYWwi3G9TyxhMJuV7klWk5o1Q'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
