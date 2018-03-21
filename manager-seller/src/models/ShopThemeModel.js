/**
 * 店铺模板模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class ShopThemeModel extends DataModel {
  /** 模板ID */
  @ServerName('theme_id')
  theme_id

  /** 模板名称 */
  @ServerName('theme_name')
  theme_name

  /** 是否选中 */
  @ServerName('selected')
  selected

  /** 模板图片 */
  @ServerName('theme_image')
  theme_image
}
