import { checkFun } from './Check'

export default class DataModel {
  map(json) {
    if (!json) return this
    const alias = this.constructor.__serverName__
    const checkers = this.constructor.__checkers__
    const _isArray = Array.isArray(json)

    // 如果json不是数组 将它封装为数组
    json = !_isArray ? [json] : json
    json.map(item => {
      for (let i in this) {
        if (!this.hasOwnProperty(i)) return item
        let realValue = this[i]
        // 首先检查别名数据，并做映射
        const _alias = alias[i]
        if (alias && typeof _alias !== 'undefined') {
          const value = item[_alias]
          if (value !== undefined) {
            realValue = item[_alias]
            delete item[_alias]
          }
        } else if (item[i] !== undefined && item[i] !== null) {
          realValue = item[i]
        }
        // 然后针对数据检查类型
        if (checkers && checkers[i]) {
          const value = realValue
          const type = checkers[i]
          const valueType = typeof (value)
          if (!checkFun(type, value)) throw new Error(`要检查的数据类型${type}未通过！`)
        }
        // 赋值
        item[i] = realValue
      }
      return item
    })
    return _isArray ? json : json[0]
  }
}
