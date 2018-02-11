/**
 * 装修相关模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

/**
 * 模板模型
 */
export class Template extends DataModel {
  /** 客户端类型 */
  @ServerName('client_type')
  client_type

  /** 模板内容 */
  @ServerName('tpl_content')
  tpl_content

  /** 模板ID */
  @ServerName('tpl_id')
  tpl_id

  /** 模板名称 */
  @ServerName('tpl_name')
  tpl_name

  /** 模板类型 */
  @ServerName('tpl_type')
  tpl_type
}

/**
 * 楼层模型
 */
export class Floor extends DataModel {
  /** 描点URL */
  @ServerName('anchor_url')
  anchor_url

  /** 描点关键字 */
  @ServerName('anchor_words')
  anchor_words

  /** 客户端类型 */
  @ServerName('client_type')
  client_type

  /** 楼层颜色 */
  @ServerName('floor_color')
  floor_color

  /** 楼层ID */
  @ServerName('id')
  floor_id

  /** 是否可见 */
  @ServerName('is_display')
  visible

  /** 楼层名称 */
  @ServerName('name')
  floor_name

  /** 楼层排序 */
  @ServerName('sort')
  floor_sort

  /** 模板ID */
  @ServerName('tpl_id')
  tpl_id
}

/**
 * 楼层焦点图模型
 */
export class Focus extends DataModel {
  /** 客户端类型 */
  @ServerName('client_type')
  client_type

  /** 焦点图ID */
  @ServerName('id')
  focus_id

  /** 操作参数 */
  @ServerName('operation_param')
  opt_param

  /** 操作类型 */
  @ServerName('operation_type')
  opt_type

  /** 操作URL */
  @ServerName('operation_url')
  opt_url

  /** 焦点图图片 */
  @ServerName('pic_url')
  focus_image
}
