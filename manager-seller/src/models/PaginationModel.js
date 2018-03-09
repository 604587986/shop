/**
 * 分页模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class PaginationModel extends DataModel {
  /** 当前页数 */
  @ServerName('page_no')
  page_no

  /** 分页大小 */
  @ServerName('page_size')
  page_size

  /** 数据总条数 */
  @ServerName('data_total')
  data_total
}
