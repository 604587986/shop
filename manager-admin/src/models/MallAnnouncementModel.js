/**
 * 商城公告模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class MallAnnouncementModel extends DataModel {
  /** 添加时间 */
  @ServerName('add_time')
  create_time

  /** 分类ID */
  @ServerName('cat_id')
  category_id

  /** 分类名称 */
  @ServerName('cat_name')
  category_name

  /** 公告内容 */
  @ServerName('content')
  content

  /**  公告ID */
  @ServerName('id')
  id

  /** 公告图片 */
  @ServerName('image')
  image

  /** 上次修改时间 */
  @ServerName('lastmodified')
  last_modified

  /** 页面标题 */
  @ServerName('page_title')
  page_title

  /** 排序 */
  @ServerName('sort')
  sort

  /** 公告标题 */
  @ServerName('title')
  title
}
