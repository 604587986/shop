import { CheckFun } from './Check'
import { UnitFun } from './Unit'

export default class DataModel {
  map(json) {
    if (!json) return this
    const alias = this.constructor.__serverName__
    const checkers = this.constructor.__checkers__
    const units = this.constructor.__units__
    const _isArray = Array.isArray(json)

    // 如果json不是数组 将它封装为数组
    json = !_isArray ? [json] : json
    json.map(item => {
      for (let i in this) {
        if (!this.hasOwnProperty(i)) return item
        let realValue = this[i]

        /** 对数据进行字段映射 */
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

        /** 对数据进行类型检查 */
        if (checkers && checkers[i]) {
          const value = realValue
          const type = checkers[i]
          const valueType = typeof (value)
          if (!CheckFun(type, value)) throw new Error(`要检查的数据类型${type}未通过！`)
        }

        /** 对数据进行重铸 */
        if (units && units[i]) {
          const value = realValue
          const type = units[i]
          const _value = UnitFun(type, value)
          realValue = _value
        }
        // 赋值
        item[i] = realValue
      }
      return item
    })
    return _isArray ? json : json[0]
  }

  /**
   * 将参数名反向映射为服务器参数名
   * @param json
   */
  params(json) {
    const alias = this.constructor.__serverName__
    Object.keys(alias).forEach(key => {
      if (alias[key] !== key) {
        json[alias[key]] = json[key]
        delete json[key]
      }
    })
    return json
  }
}
