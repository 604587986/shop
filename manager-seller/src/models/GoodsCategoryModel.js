/**
 * 商品分类模型
 */
import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

/** 分类管理*/
export class GoodsCategory extends DataModel {
  /** 商品分类D */
  @ServerName('category_id')
  category_id

  /** 商品分类名称 */
  @ServerName('category_name')
  category_name

  /** 商品分类排序 */
  @ServerName('sort')
  sort

  /** 商品分类显示 */
  @ServerName('is_show')
  is_show
}

/** 发布商品分级查询*/
export class GoodsCategoryLevel extends DataModel {
  /** 商品分类排序 */
  @ServerName('category_order')
  category_order

  /** 商品分类图标 */
  @ServerName('image')
  category_image

  /** 分类名称 */
  @ServerName('name')
  category_name

  /** 分类父id */
  @ServerName('parent_id')
  category_parent_id
}
