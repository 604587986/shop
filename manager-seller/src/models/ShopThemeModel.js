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
  @ServerName('id')
  themes_id

  /** 模板名称 */
  @ServerName('name')
  theme_name

  /** 模板目录 */
  @ServerName('path')
  theme_path

  /** 模板图片路径 */
  @ServerName('preview_base_path')
  theme_image

  /** 当前是否使用 1 是 0 否 */
  @ServerName('current_use')
  current_use

  /** 是否为默认 1为默认 反之为0 后台用的 */
  @ServerName('is_default')
  is_default

  /** 模版类型 PC WAP */
  @ServerName('type')
  theme_type
}
