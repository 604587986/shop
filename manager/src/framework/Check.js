import RegExp from './RegExp'

export default (_type_) => (target, name, descriptor) => {
  let value = descriptor.initializer && descriptor.initializer.call(this)
  const valueType = typeof (value)
  if (!CheckFun(_type_, value)) throw new Error(`要检查的数据类型${_type_}未通过！`)
  if (!target.constructor.__checkers__) {
    Object.defineProperty(target.constructor, '__checkers__', {
      value: {},
      enumerable: false,
      writeable: true,
      configurable: true
    })
  }
  target.constructor.__checkers__[name] = _type_
  return descriptor
}

/**
 * 导出检查方法
 * @param type
 * @param value
 * @returns {boolean}
 * @private
 */
export const CheckFun = (type, value) => {
  switch (type) {
    /** 检查是否为字符串 */
    case CheckTypes.String:
      return typeof value === 'string'
    /** 检查是否为对象 */
    case CheckTypes.Object:
      return typeof value === 'object'
    /** 检查是否为数字类型 */
    case CheckTypes.Number:
      return typeof value === 'number'
    /** 检查是否为数组类型 */
    case CheckTypes.Array:
      return Array.isArray(value)
    /** 检查是否为函数类型 */
    case CheckTypes.Function:
      return typeof value === 'function'
    /** 检查是否为布尔类型 */
    case CheckTypes.Boolean:
      return typeof value === 'boolean'
    /** 检查是否为undefined */
    case CheckTypes.Undefined:
      return value === undefined
    /** 检查是否为null */
    case CheckTypes.Null:
      return value === null
    /** 检查是否为手机号类型 */
    case CheckTypes.Mobile:
      return RegExp.mobile.test(value)
    /** 检查是否为金额类型 */
    case CheckTypes.Money:
      return RegExp.money.test(value)
    default:
      return true
  }
}

/**
 * 导出检查的类型
 * @type {{String: string, Object: string, Number: string, Array: string, Function: string, Boolean: string, Undefined: string, Null: string, Mobile: string, Money: string}}
 */
export const CheckTypes = {
  /** 常见数据类型 */
  // String
  String: 'string',
  // Object
  Object: 'object',
  // Number
  Number: 'number',
  // Array
  Array: 'array',
  // Function
  Function: 'function',
  // Boolean
  Boolean: 'boolean',
  // Undefined
  Undefined: 'undefined',
  // Null
  Null: 'null',

  /** 常见业务类型 */
  // 手机号
  Mobile: 'mobile',
  // 金额
  Money: 'money'
}
