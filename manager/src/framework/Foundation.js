const Foundation = {}

/**
 * 参数序列化
 * @type {{get: (function(*=)), post: (function(*))}}
 */
Foundation.sequence = {
  /**
   * 用于get的参数序列化
   * @param object
   * @returns {string}
   */
  get: (object) => {
    let url = ''
    typeof object === 'object' && (() => {
      for (let key in object) {
        if (object.hasOwnProperty(key)) {
          let _object = object[key]
          _object !== null && _object !== undefined && (url += '&' + key + '=' + _object)
        }
      }
      url = '?' + url.substring(1)
    })()
    return url
  },
  /**
   * 用于post的参数序列化
   * @param params
   * @returns {string}
   */
  post: (params) => {
    let formDara = new FormData()
    Object.keys(params).forEach(key => {
      let _value = params[key]
      Array.isArray(_value)
        ? _value.forEach(item => {
          (item !== null && item !== undefined) && formDara.append(key, item)
        })
        : (_value !== null && _value !== undefined) && formDara.append(key, _value)
    })
    return formDara
  }
}

/**
 * 处理数字 1000 -> 1k
 * @param number
 * @returns {*|number}
 */
Foundation.handleNumber = number => {
  let __fun = (size, str) => {
    let __ = (number / size).toFixed(2)
    if (__.substr(__.length - 2, 2) === '00') {
      return __.substr(0, __.length - 3) + str
    }
    return __ + str
  }
  let _num = number || 0
  _num > 1000 && (_num = __fun(1000, 'k'))
  return _num
}

/**
 * 处理unix时间戳，转换为可阅读时间格式
 * @param unix
 * @param format
 * @returns {*|string}
 */
Foundation.unixToDate = (unix, format) => {
  let _format = format || 'yyyy-MM-dd hh:mm:ss'
  let d = new Date(unix * 1000)
  let o = {
    'M+': d.getMonth() + 1,
    'd+': d.getDate(),
    'h+': d.getHours(),
    'm+': d.getMinutes(),
    's+': d.getSeconds(),
    'q+': Math.floor((d.getMonth() + 3) / 3),
    S: d.getMilliseconds()
  }
  if (/(y+)/.test(_format)) _format = _format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o) if (new RegExp('(' + k + ')').test(_format)) _format = _format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  return _format
}

/**
 * 把date转为秒为单位的unix时间戳
 * @param date YYY-MM-DD
 */
Foundation.dateToUnix = date => {
  let newStr = date.replace(/:/g, '-')
  newStr = newStr.replace(/ /g, '-')
  let arr = newStr.split('-')
  let datum = new Date(Date.UTC(
    arr[0],
    arr[1] - 1,
    arr[2],
    arr[3] - 8 || -8,
    arr[4] || 0,
    arr[5] || 0
  ))
  return datum.getTime() / 1000
}

/**
 * 深拷贝一个对象或数组
 * @param object
 * @returns {*}
 */
Foundation.deepClone = object => {
  let str
  let newobj = object.constructor === Array ? [] : {}
  if (typeof object !== 'object') {
    return object
  } else if (window.JSON) {
    str = JSON.stringify(object)
    newobj = JSON.parse(str)
  } else {
    for (let i in object) {
      if (object.hasOwnProperty(i)) {
        newobj[i] = typeof object[i] === 'object' ? Foundation.deepClone(object[i]) : object[i]
      }
    }
  }
  return newobj
}

/**
 * 货币格式化
 * @param price
 * @returns {XML|string|*|void}
 */
Foundation.formatPrice = price => {
  return String(Number(price).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 手机号隐私保护
 * @param mobile
 * @returns {*}
 */
Foundation.secrecyMobile = mobile => {
  mobile = String(mobile)
  if (!/\d{11}/.test(mobile)) {
    return mobile
  }
  return mobile.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')
}

export default Foundation
