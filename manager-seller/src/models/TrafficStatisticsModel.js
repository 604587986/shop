/**
 * 流量统计商品统计模板模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class TrafficStatisticsModel extends DataModel {
  /** 商品ID */
  @ServerName('goods_id')
  goods_id

  /** 商品名称 */
  @ServerName('goods_name')
  name

  /** 访问量 */
  @ServerName('visit_num')
  value
}
