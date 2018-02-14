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

export default class BrandModel extends DataModel {
  /** 是否已启用APP */
  @ServerName('app_enable')
  app_enable

  /** 支付方式配置项 */
  @ServerName('configItems')
  configItems

  /** 支付方式图片 */
  @ServerName('img_url')
  image

  /** 是否可原路退回 */
  @ServerName('is_retrace')
  is_retrace

  /** 支付方式ID */
  @ServerName('method_id')
  id

  /** 支付方式名称 */
  @ServerName('method_name')
  name

  /** 是否已启用PC */
  @ServerName('pc_enable')
  pc_enable

  /** 支付方式代码 */
  @ServerName('plugin_id')
  code

  /** 是否已启用WAP */
  @ServerName('wap_enable')
  wap_enable
}
