/**
 * Created by Andste on 2018/5/3.
 */

import Cookies from 'js-cookie'

export default {
  setItem: (key, value, options) => {
    options = options || {}
    if (!options.path) options.path = '/'
    Cookies.set(key, value, options)
  },
  getItem: (key) => {
    return Cookies.get(key)
  },
  removeItem: (key) => {
    Cookies.remove(key)
  }
}
