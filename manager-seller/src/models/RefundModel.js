/**
 * 退款/货单模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export class Refund extends DataModel {
  /** 退款/货 单编号 */
  @ServerName('sn')
  sn

  /** 订单编号 */
  @ServerName('order_sn')
  order_sn

  /** 申请时间 */
  @ServerName('create_time')
  create_time

  /** 会员名称 */
  @ServerName('member_name')
  member_name

  /** 状态 */
  @ServerName('refund_status_text')
  refund_status_text

  /** 退款/货类型  */
  @ServerName('refuse_type')
  refuse_type
}

export class RefundGoods extends DataModel {
  /** 商品id */
  @ServerName('goods_id')
  goods_id

  /** 商品图片 */
  @ServerName('goods_image')
  goods_image

  /** 商品名称 */
  @ServerName('goods_name')
  goods_name

  /** 商品编号 */
  @ServerName('goods_sn')
  goods_sn

  /** 商品价格 */
  @ServerName('price')
  price

  /** 退货数量  */
  @ServerName('return_num')
  return_num

  /** 购买数量  */
  @ServerName('ship_num')
  ship_num
}

