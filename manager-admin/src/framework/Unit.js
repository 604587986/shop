import { Foundation } from './'

export default (_type_) => (target, name, descriptor) => {
  let value = descriptor.initializer && descriptor.initializer.call(this)
  if (!target.constructor.__units__) {
    Object.defineProperty(target.constructor, '__units__', {
      value: {},
      enumerable: false,
      writeable: true,
      configurable: true
    })
  }
  target.constructor.__units__[name] = _type_
  return descriptor
}

/**
 * 导出工具方法
 * @param type
 * @param value
 * @returns {*}
 * @constructor
 */
export const UnitFun = (type, value) => {
  switch (type) {
    /** 货币单位转换 */
    case UnitTypes.PRICE_UNIT:
      return Foundation.formatPrice(value)
    /** 货币单位转换【带单位】 */
    case UnitTypes.PRICE_UNIT_Y:
      return `￥${Foundation.formatPrice(value)}`
    /** 布尔转换为数值 */
    case UnitTypes.TRANSFORM_TO_NUMBER:
      return value ? 1 : 0
    /** 数值转换为布尔 */
    case UnitTypes.TRANSFORM_TO_BOOLEAN:
      return !!value
    default:
      return value
  }
}

export const UnitTypes = {
  /** 货币相关 */
  // 普通千进制
  PRICE_UNIT: 'PRICE_UNIT',
  // 带单位[￥]的千进制
  PRICE_UNIT_Y: 'PRICE_UNIT_Y',

  /** 数据转换 */
  // 布尔转换为数值
  TRANSFORM_TO_NUMBER: 'TRANSFORM_TO_NUMBER',
  // 数值转换为布尔
  TRANSFORM_TO_BOOLEAN: 'TRANSFORM_TO_BOOLEAN'
}
