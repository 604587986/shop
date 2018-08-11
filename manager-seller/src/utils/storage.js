/**
 * Created by Andste on 2018/5/3.
 */

import Cookies from 'js-cookie'

export default {
  setItem: (key, value, options = {}) => {
    Cookies.set(key, value, options)
  },
  getItem: (key) => {
    return Cookies.get(key)
  },
  removeItem: (key, options) => {
    Cookies.remove(key, options)
  }
}
