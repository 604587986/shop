/**
 * 收藏统计相关模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

/** 收藏统计模型 */
export class CollectionStatistics extends DataModel {
  /** 收藏商品ID */
  @ServerName('goods_id')
  goods_id

  /** 货品名称 */
  @ServerName('goods_name')
  goods_name

  /** 货品价格 */
  @ServerName('goods_price')
  goods_price

  /** 收藏量 */
  @ServerName('collection_num')
  collection_num
}
