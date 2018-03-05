/**
 * 评论模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class CommentModel extends DataModel {
  /** 评论ID */
  @ServerName('comment_id')
  id

  /** 评论内容 */
  @ServerName('content')
  content

  /** 评论发布时间 */
  @ServerName('create_time')
  create_time

  /** 商品ID */
  @ServerName('goods_id')
  goods_id

  /** 商品名称 */
  @ServerName('goods_name')
  gooods_name

  /** 评分 [好中差评] */
  @ServerName('grade')
  grade

  /** 是否有图 */
  @ServerName('have_image')
  has_image

  /** IP地址 */
  @ServerName('ip')
  ip

  /** 是否置顶 */
  @ServerName('is_top')
  is_top = false

  /** 会员头像 */
  @ServerName('member_face')
  member_face

  /** 会员ID */
  @ServerName('member_id')
  member_id

  /** 会员名 */
  @ServerName('member_name')
  member_name

  /** 订单编号 */
  @ServerName('order_sn')
  order_sn

  /** 商家回复 */
  @ServerName('reply')
  seller_reply

  /** 商家回复状态 */
  @ServerName('replystatus')
  seller_reply_status

  /** 商家回复时间 */
  @ServerName('replytime')
  seller_reply_time

  /** 商家店铺ID */
  @ServerName('shop_id')
  seller_id

  /** 产品ID */
  @ServerName('sku_id')
  sku_id

  /** 规格 */
  @ServerName('specs')
  specs

  /** 评论状态 */
  @ServerName('status')
  status

  /** 类型 [评论、咨询] */
  @ServerName('type')
  type
}
