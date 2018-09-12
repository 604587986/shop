/**
 * Created by Andste on 2018/5/3.
 */

import Cookies from 'js-cookie'
const psl = require('psl')

export default {
  setItem: (key, value, options = {}) => {
    if (process.client) {
      options = { domain: psl.parse(document.domain).domain, ...options }
    }
    Cookies.set(key, value, options)
  },
  getItem: (key) => {
    return Cookies.get(key)
  },
  removeItem: (key, options = {}) => {
    if (process.client) {
      options = { domain: psl.parse(document.domain).domain, ...options }
    }
    Cookies.remove(key, options)
  }
}
