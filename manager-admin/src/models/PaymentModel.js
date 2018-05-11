/**
 * 支付方式模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class PaymentModel extends DataModel {
  /** 支付方式配置项 【各个客户端配置】 */
  @ServerName('enable_client')
  enable_client

  /** 支付方式图片 */
  @ServerName('image')
  image

  /** 是否可原路退回 */
  @ServerName('is_retrace')
  is_retrace

  /** 支付方式名称 */
  @ServerName('method_name')
  name

  /** 支付方式代码 */
  @ServerName('plugin_id')
  code
}
