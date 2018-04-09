/**
 * 库存预警数模板
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class StockWarningNum extends DataModel {
  /** 库存预警数 */
  @ServerName('stock_warning_num')
  stock_warning_num
}
