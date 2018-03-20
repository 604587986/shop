import Vue from 'vue'

const _layer = {
  /** 将原生属性挂载进来，然后再扩展属性 */
  ...window.layer,
  /**
   * 普通alert弹框
   * @param message
   * @param fn
   * @returns {*|void}
   */
  alert: function (message, fn) {
    return window.layer.alert(message || '', {
      scrollbar: false
    }, function (index) {
      let __ = true
      typeof (fn) === 'function' && (__ = fn(index))
      __ !== false && window.layer.close(index)
    })
  },

  /**
   * 操作确认
   * @param message
   * @param fn
   * @returns {*|boolean}
   */
  confirm: function (message, fn) {
    return window.layer.confirm(message || '确认这个操作吗？', {
      icon: 3,
      title: '提示',
      scrollbar: false
    }, function (index) {
      let __ = true
      typeof (fn) === 'function' && (__ = fn(index))
      __ !== false && window.layer.close(index)
    });
  }
}

const _message = {
  /**
   * 成功提示
   * @param message
   * @param opts
   * @param fn
   * @returns {*}
   */
  success: function (message, opts, fn) {
    fn = typeof fn === 'function' ? fn : opts
    opts = typeof opts === 'object' ? opts : {}
    return window.layer.msg(message || '成功！', {
      icon: 1,
      skin: 'layer-skin-custom-msg',
      offset: '10px',
      time: 3000,
      ...opts
    }, fn)
  },

  /**
   * 错误提示
   * @param message
   * @param opts
   * @param fn
   * @returns {*}
   */
  error: function (message, opts, fn) {
    fn = typeof fn === 'function' ? fn : opts
    opts = typeof opts === 'object' ? opts : {}
    return window.layer.msg(message || '出错！', {
      icon: 2,
      skin: 'layer-skin-custom-msg',
      offset: '10px',
      time: 3000,
      ...opts
    }, fn)
  }
}

// 注册到Vue原型链上
Vue.prototype.$layer = _layer
Vue.prototype.$message = _message
