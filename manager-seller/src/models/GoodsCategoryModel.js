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

/** 分组管理*/
export class GoodsCategory extends DataModel {
  /** 商品分组父ID */
  @ServerName('shop_cat_pid')
  shop_cat_pid

  /** 商品分组ID*/
  @ServerName('shop_cat_id')
  shop_cat_id

  /** 店铺ID */
  @ServerName('shop_id')
  shop_id

  /** 商品分组路径 */
  @ServerName('cat_path')
  cat_path

  /** 商品分组名称 */
  @ServerName('shop_cat_name')
  shop_cat_name

  /** 商品分组排序 */
  @ServerName('sort')
  sort

  /** 商品分组显示 1显示 0不显示*/
  @ServerName('disable')
  is_show
}

/** 发布商品分级查询*/
export class GoodsCategoryLevel extends DataModel {
  /** 商品分类ID */
  @ServerName('category_id')
  category_id

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

  /** 分类路径 */
  @ServerName('category_path')
  category_path
}
