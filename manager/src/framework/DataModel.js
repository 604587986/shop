import { checkFun } from './Check'

export default class DataModel {
  map(json) {
    if (!json) return this
    const alias = this.constructor.__serverName__
    const checkers = this.constructor.__checkers__
    for (let i in this) {
      if (!this.hasOwnProperty(i)) return
      let realValue = this[i]
      // 首先检查别名数据，并做映射
      if (alias && typeof alias[i] !== 'undefined') {
        const value = json[alias[i]]
        if (value !== undefined) realValue = json[alias[i]]
      } else if (json[i] !== undefined && json[i] !== null) {
        realValue = json[i]
      }
      // 然后针对数据检查类型
      if (checkers && checkers[i]) {
        const value = realValue
        const type = checkers[i]
        const valueType = typeof (value)
        if (!checkFun(type, value)) throw new Error(`要检查的数据类型${type}未通过！`)
      }
      // 赋值
      this[i] = realValue
    }
    return this
  }
}
