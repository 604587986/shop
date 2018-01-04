// 2017-9-6-陈小博: 商品规格sku的动态筛选
import axios from 'axios'
;(function($) {
  // ---------------------------------全局作用域下的变量-------------------------------------
  let skuRender = {
    DOM: undefined, // skuRender作用域内的DOM
    refresh: null //存储用户传进来的回调函数的引用
  }
  // ------------源数据------------
  // skuList数据
  let specListData
  // let specListData = [{ "price": 23, "weight": 13, "quantity": 0, "cost": 1, "sn": 123, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "黄色", "spec_value_id": 41, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "XXS", "spec_value_id": 10, "spec_type": 0, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "16GB", "spec_value_id": 62, "spec_type": 0, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 0, "spec_image": "http" }], "sku_id": 1 }, { "price": 23, "weight": 23, "quantity": 0, "cost": 2, "sn": 23, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "黄色", "spec_value_id": 41, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "XXS", "spec_value_id": 10, "spec_type": 0, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "2GB", "spec_value_id": 59, "spec_type": 0, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 0, "spec_image": "http" }], "sku_id": 2 }, { "price": 23, "weight": 23, "quantity": 0, "cost": 3, "sn": 23, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "黄色", "spec_value_id": 41, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "S", "spec_value_id": 12, "spec_type": 0, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "16GB", "spec_value_id": 62, "spec_type": 0, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 0, "spec_image": "http" }], "sku_id": 3 }, { "price": 23, "weight": 23, "quantity": 0, "cost": 4, "sn": 23, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "黄色", "spec_value_id": 41, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "S", "spec_value_id": 12, "spec_type": 0, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "2GB", "spec_value_id": 59, "spec_type": 0, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 0, "spec_image": "http" }], "sku_id": 4 }, { "price": 23, "weight": 23, "quantity": 0, "cost": 5, "sn": 23, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "黄色", "spec_value_id": 41, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "M", "spec_value_id": 13, "spec_type": 0, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "16GB", "spec_value_id": 62, "spec_type": 0, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 0, "spec_image": "http" }], "sku_id": 5 }, { "price": 23, "weight": 23, "quantity": 0, "cost": 6, "sn": 23, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "黄色", "spec_value_id": 41, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "M", "spec_value_id": 13, "spec_type": 0, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "2GB", "spec_value_id": 59, "spec_type": 0, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 0, "spec_image": "http" }], "sku_id": 6 }, { "price": 23, "weight": 23, "quantity": 0, "cost": 734, "sn": 23, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "黄色", "spec_value_id": 41, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "XS", "spec_value_id": 11, "spec_type": 0, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "16GB", "spec_value_id": 62, "spec_type": 0, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 0, "spec_image": "http" }], "sku_id": 7 }, { "price": 23, "weight": 23, "quantity": 0, "cost": 52314, "sn": 23, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "黄色", "spec_value_id": 41, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "XS", "spec_value_id": 11, "spec_type": 0, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "2GB", "spec_value_id": 59, "spec_type": 0, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 0, "spec_image": "http" }], "sku_id": 8 }, { "price": 23, "weight": 23, "quantity": 0, "cost": 23, "sn": 23, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "绿色", "spec_value_id": 42, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "XXS", "spec_value_id": 10, "spec_type": 0, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "16GB", "spec_value_id": 62, "spec_type": 0, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 0, "spec_image": "http" }], "sku_id": 9 }, { "price": 23, "weight": 23, "quantity": 0, "cost": 34, "sn": 23, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "绿色", "spec_value_id": 42, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "XXS", "spec_value_id": 10, "spec_type": 0, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "2GB", "spec_value_id": 59, "spec_type": 0, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 0, "spec_image": "http" }], "sku_id": 10 }, { "price": 23, "weight": 23, "quantity": 0, "cost": 45, "sn": 23, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "绿色", "spec_value_id": 42, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "S", "spec_value_id": 12, "spec_type": 0, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "16GB", "spec_value_id": 62, "spec_type": 0, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 0, "spec_image": "http" }], "sku_id": 11 }, { "price": 23, "weight": 23, "quantity": 0, "cost": 23, "sn": 23, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "绿色", "spec_value_id": 42, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "S", "spec_value_id": 12, "spec_type": 0, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "2GB", "spec_value_id": 59, "spec_type": 0, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 0, "spec_image": "http" }], "sku_id": 12 }, { "price": 1, "weight": 4, "quantity": 0, "cost": 1, "sn": 2, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "绿色", "spec_value_id": 42, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "M", "spec_value_id": 13, "spec_type": 0, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "16GB", "spec_value_id": 62, "spec_type": 0, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 0, "spec_image": "http" }], "sku_id": 13 }, { "price": 2, "weight": 3, "quantity": 0, "cost": 2, "sn": 3, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "绿色", "spec_value_id": 42, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "M", "spec_value_id": 13, "spec_type": 0, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "2GB", "spec_value_id": 59, "spec_type": 0, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 0, "spec_image": "http" }], "sku_id": 14 }, { "price": 4, "weight": 3, "quantity": 0, "cost": 3, "sn": 2, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "绿色", "spec_value_id": 42, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "XS", "spec_value_id": 11, "spec_type": 0, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "16GB", "spec_value_id": 62, "spec_type": 0, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 0, "spec_image": "http" }], "sku_id": 15 }, { "price": 5, "weight": 2, "quantity": 0, "cost": 6, "sn": 1, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "绿色", "spec_value_id": 42, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "XS", "spec_value_id": 11, "spec_type": 0, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "2GB", "spec_value_id": 59, "spec_type": 0, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 0, "spec_image": "http" }], "sku_id": 16 }];
  // specListData = [{ "price": 23, "weight": 13, "quantity": 2, "cost": 1, "sn": 123, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "黄色", "spec_value_id": 41, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "XXS", "spec_value_id": 12, "spec_type": 2, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "16GB", "spec_value_id": 62, "spec_type": 2, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 2, "spec_image": "http" }], "sku_id": 1 }, { "price": 23, "weight": 23, "quantity": 2, "cost": 2, "sn": 23, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "黄色", "spec_value_id": 41, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "XXS", "spec_value_id": 12, "spec_type": 2, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "2GB", "spec_value_id": 59, "spec_type": 2, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 2, "spec_image": "http" }], "sku_id": 2 }, { "price": 23, "weight": 23, "quantity": 2, "cost": 3, "sn": 23, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "黄色", "spec_value_id": 41, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "S", "spec_value_id": 12, "spec_type": 2, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "16GB", "spec_value_id": 62, "spec_type": 2, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 2, "spec_image": "http" }], "sku_id": 3 }, { "price": 23, "weight": 23, "quantity": 2, "cost": 4, "sn": 23, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "黄色", "spec_value_id": 41, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "S", "spec_value_id": 12, "spec_type": 2, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "2GB", "spec_value_id": 59, "spec_type": 2, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 2, "spec_image": "http" }], "sku_id": 4 }, { "price": 23, "weight": 23, "quantity": 2, "cost": 5, "sn": 23, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "黄色", "spec_value_id": 41, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "M", "spec_value_id": 13, "spec_type": 2, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "16GB", "spec_value_id": 62, "spec_type": 2, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 2, "spec_image": "http" }], "sku_id": 5 }, { "price": 23, "weight": 23, "quantity": 2, "cost": 6, "sn": 23, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "黄色", "spec_value_id": 41, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "M", "spec_value_id": 13, "spec_type": 2, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "2GB", "spec_value_id": 59, "spec_type": 2, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 2, "spec_image": "http" }], "sku_id": 6 }, { "price": 23, "weight": 23, "quantity": 2, "cost": 734, "sn": 23, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "黄色", "spec_value_id": 41, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "XS", "spec_value_id": 11, "spec_type": 2, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "16GB", "spec_value_id": 62, "spec_type": 2, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 2, "spec_image": "http" }], "sku_id": 7 }, { "price": 23, "weight": 23, "quantity": 2, "cost": 52314, "sn": 23, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "黄色", "spec_value_id": 41, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "XS", "spec_value_id": 11, "spec_type": 2, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "2GB", "spec_value_id": 59, "spec_type": 2, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 2, "spec_image": "http" }], "sku_id": 8 }, { "price": 23, "weight": 23, "quantity": 2, "cost": 23, "sn": 23, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "绿色", "spec_value_id": 42, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "XXS", "spec_value_id": 12, "spec_type": 2, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "16GB", "spec_value_id": 62, "spec_type": 2, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 2, "spec_image": "http" }], "sku_id": 9 }, { "price": 23, "weight": 23, "quantity": 2, "cost": 34, "sn": 23, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "绿色", "spec_value_id": 42, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "XXS", "spec_value_id": 12, "spec_type": 2, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "2GB", "spec_value_id": 59, "spec_type": 2, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 2, "spec_image": "http" }], "sku_id": 10 }, { "price": 23, "weight": 23, "quantity": 2, "cost": 45, "sn": 23, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "绿色", "spec_value_id": 42, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "S", "spec_value_id": 12, "spec_type": 2, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "16GB", "spec_value_id": 62, "spec_type": 2, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 2, "spec_image": "http" }], "sku_id": 11 }, { "price": 23, "weight": 23, "quantity": 2, "cost": 23, "sn": 23, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "绿色", "spec_value_id": 42, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "S", "spec_value_id": 12, "spec_type": 2, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "2GB", "spec_value_id": 59, "spec_type": 2, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 2, "spec_image": "http" }], "sku_id": 12 }, { "price": 1, "weight": 4, "quantity": 2, "cost": 1, "sn": 2, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "绿色", "spec_value_id": 42, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "M", "spec_value_id": 13, "spec_type": 2, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "16GB", "spec_value_id": 62, "spec_type": 2, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 2, "spec_image": "http" }], "sku_id": 13 }, { "price": 2, "weight": 3, "quantity": 2, "cost": 2, "sn": 3, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "绿色", "spec_value_id": 42, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "M", "spec_value_id": 13, "spec_type": 2, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "2GB", "spec_value_id": 59, "spec_type": 2, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 2, "spec_image": "http" }], "sku_id": 14 }, { "price": 4, "weight": 3, "quantity": 2, "cost": 3, "sn": 2, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "绿色", "spec_value_id": 42, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "XS", "spec_value_id": 11, "spec_type": 2, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "16GB", "spec_value_id": 62, "spec_type": 2, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 2, "spec_image": "http" }], "sku_id": 15 }, { "price": 5, "weight": 2, "quantity": 2, "cost": 6, "sn": 1, "specList": [{ "spec_name": "颜色", "spec_id": 1, "spec_value": "绿色", "spec_value_id": 42, "spec_type": 1, "spec_image": "http" }, { "spec_name": "尺寸", "spec_id": 2, "spec_value": "XS", "spec_value_id": 11, "spec_type": 2, "spec_image": "http" }, { "spec_name": "容量", "spec_id": 3, "spec_value": "2GB", "spec_value_id": 59, "spec_type": 2, "spec_image": "http" }, { "spec_name": "选择尺码", "spec_id": 4, "spec_value": "36", "spec_value_id": 67, "spec_type": 2, "spec_image": "http" }], "sku_id": 16 }];

  // ------------END-----------

  // 商品可选规格数据
  // let list = [
  //     {
  //         spec_name: "颜色",
  //         item_list:
  //         [
  //             {
  //                 item_name: "绿色", item_id: 1
  //             },
  //             {
  //                 item_name: "黄色", item_id: 2
  //             }
  //         ]
  //     }
  // ];
  let list
  let skuHTML =
    '<!-- 商品规格部分 -->\
        <div class="pro-list goods-sku">\
            <div class="goods-sku-model" style="display: none;">\
                <!-- 规格模板 -->\
                <div>\
                    <span class="goods-spec-name">规格名模板</span>\
                    <div class="sku-value-container">\
                        <span class="sku" attr_id="绿色模板">规格值模板</span>\
                    </div>\
                </div>\
            </div>\
            <div class="sku-body">\
            </div>\
        </div>'

  let skuDOM = $(skuHTML)
  // 根据数据源产生的数据
  // let keys = [
  //     ['黄色', '绿色'],
  //     ['XXS', 'XS', 'S'],
  //     ['36'],
  //     ['4GB', '16GB']
  // ]
  let keys
  // 数据对象. 重要! 只在初始化时生成一次,后面用户选取不用的规格值时,直接查询就ok
  let dataObj = {}
  // 把DOM的引用传出去.
  skuRender.DOM = skuDOM
  //保存最后的组合结果信息
  let SKUResult = {}
  let goodsID

  // ----------------------------数据转换方法----------------------------
  // 获取skuList数据
  let getRemoteData = function(data) {
    // 如果data存在则说明: 不需要高大上的选择功能,
    // 只要展示sku的功能
    // 不需要点击的功能了.
    if (data) {
      specListData = data
      list = transformDefaultData(specListData)
      keys = generateKey(list)
      fillUpDataObj()
      generateSkuHTML(list)

      initSKU()
      bindClickEvent()
    } else {
      axios.get('/shop/goods/skus?goods_id=' + goodsID).then(response => {
        // 只有一条数据且不存在skuList数据的话,
        // 把得来的数据返回回去.
        // return;
        response = response.data
        
        if (response.length === 1 && !response[0].specList) {
          skuRender.refresh({
            sku_id: response[0].sku_id,
            price: response[0].price,
            enable_quantity: response[0].enable_quantity
          })
          return
        }

        // 遍历检测数据的有效性.
        // 如果不存在有效的specList. 从源数据中删除掉
        response.forEach(function(skuObj, index) {
          // 不存在或者为空数组
          if (!skuObj.specList || skuObj.specList.length === 0) {
            response.splice(index, 1)
          }
        })

        specListData = response
        list = transformDefaultData(specListData)
        keys = generateKey(list)
        fillUpDataObj()
        generateSkuHTML(list)

        initSKU()
        bindClickEvent()

        // 开始初始化
        setDefaultSku()
      })
    }
  }

  // 把skuList结构的数据,转换成规格向的数据
  let transformDefaultData = function(data) {
    let specDataObj = {}
    let tempObj
    data.forEach(function(skuObj) {
      skuObj.specList.forEach(function(spec) {
        if (specDataObj.hasOwnProperty(spec.spec_name)) {
          if (!specDataObj[spec.spec_name].hasOwnProperty(spec.spec_value)) {
            specDataObj[spec.spec_name][spec.spec_value] = spec.spec_value_id
          }
        } else {
          tempObj = {}
          tempObj[spec.spec_value] = spec.spec_value_id
          specDataObj[spec.spec_name] = tempObj
        }
      })
    })

    // 继续转换数据成最终需要
    let transformDataAgain = function(data) {
      let tempArray = []
      for (let specName in data) {
        if (!specName) {
          continue
        }
        let tempObj = {
          spec_name: specName,
          item_list: []
        }
        let specObj
        for (let specValue in data[specName]) {
          if (!specValue) {
            continue
          }
          specObj = {
            item_name: specValue,
            item_id: data[specName][specValue]
          }
          tempObj.item_list.push(specObj)
        }
        tempArray.push(tempObj)
      }
      return tempArray
    }

    return transformDataAgain(specDataObj)
  }

  // 根据list数据生成keys数据
  let generateKey = function(data) {
    let keyArray = []
    let tempArray
    data.forEach(function(tempObj) {
      tempArray = []
      tempObj.item_list.forEach(function(specObj) {
        tempArray.push(specObj.item_name)
      })
      keyArray.push(tempArray)
    })
    return keyArray
  }

  // -------------------------END----------------------

  //根据数据源 产生 sku算法需要的数据结构
  // 填充dataObj
  let fillUpDataObj = function() {
    specListData.forEach(function(item) {
      let key = item.specList
        .map(function(sku) {
          return sku.spec_value
        })
        .join(';')

      dataObj[key] = {
        price: item.price,
        count: item.enable_quantity
      }
    })
  }

  // 根据源数据动态生成商品的 sku HTML,并插入对应位置
  let generateSkuHTML = function(data) {
    let clonedSkuDom
    data.forEach(function(goodsSku) {
      clonedSkuDom = skuDOM.find('.goods-sku-model > div').clone(true)
      clonedSkuDom.find('.goods-spec-name').text(goodsSku.spec_name)
      let clonedSku
      goodsSku.item_list.forEach(function(value) {
        clonedSku = $(clonedSkuDom.find('.sku')[0]).clone(true)
        clonedSku.text(value.item_name)
        clonedSku.attr('attr_id', value.item_name)
        clonedSku.attr('id', value.item_id)
        clonedSku.append($("<i class='right'></i>"))
        clonedSkuDom.find('.sku-value-container').append(clonedSku)
      })
      // 最后把模板span移除
      $(clonedSkuDom.find('.sku')[0]).remove()
      // 添加
      skuDOM.find('.sku-body').append(clonedSkuDom)
    })

    // 在HTML插入到页面中之后，遍历源sku数据，进行规格图片的初始化(如果存在规格图片的话)
    if (!specListData || specListData.length === 0) {
      return
    }
    specListData.forEach(function(sku) {
      if (!sku || !sku.specList || sku.specList.length === 0) {
        return
      }
      sku.specList.forEach(function(specObj) {
        if (!specObj.spec_image) {
          return
        }
        // 从所有的规格span中找到当前的这个
        skuDOM.find('.sku-value-container span.sku').each(function() {
          let $this = $(this)
          if ($this.attr('attr_id') === specObj.spec_value) {
            // 增加规格图片专有Class
            $this.addClass('sku-image')
            // 清掉文字，只留图标元素
            $this.html('<i class="right"></i>')
            $this.css('background', 'url(' + specObj.spec_image + ')')
            // 把规格对象数据存到元素身上
            $this.data('specObj', specObj)
            // 在规格图片被填完到页面规格中之后，
            // 设置Hover显示规格值名字的效果
            $this.attr({
              'data-toggle': 'tooltip',
              'data-placement': 'right',
              title: specObj.spec_value
            })
          }
        })
      })
    })
  }

  //获得对象的key
  let getObjKeys = function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object')
    let keys = []
    for (let key in obj)
      if (Object.prototype.hasOwnProperty.call(obj, key))
        keys[keys.length] = key
    return keys
  }

  //把组合的key放入结果集SKUResult
  let add2SKUResult = function(combArrItem, sku) {
    let key = combArrItem.join(';')
    if (SKUResult[key]) {
      //SKU信息key属性·
      SKUResult[key].count += sku.count
      SKUResult[key].prices.push(sku.price)
    } else {
      SKUResult[key] = {
        count: sku.count,
        prices: [sku.price]
      }
    }
  }

  //初始化得到结果集
  let initSKU = function() {
    let i,
      j,
      skuKeys = getObjKeys(dataObj)
    for (i = 0; i < skuKeys.length; i++) {
      let skuKey = skuKeys[i] //一条SKU信息key
      let sku = dataObj[skuKey] //一条SKU信息value
      let skuKeyAttrs = skuKey.split(';') //SKU信息key属性值数组
      let len = skuKeyAttrs.length

      //对每个SKU信息key属性值进行拆分组合
      let combArr = arrayCombine(skuKeyAttrs)
      for (j = 0; j < combArr.length; j++) {
        add2SKUResult(combArr[j], sku)
      }

      //结果集接放入SKUResult
      SKUResult[skuKey] = {
        count: sku.count,
        prices: [sku.price]
      }
    }
  }

  /**
   * 从数组中生成指定长度的组合
   */
  let arrayCombine = function(targetArr) {
    if (!targetArr || !targetArr.length) {
      return []
    }

    let len = targetArr.length
    let resultArrs = []

    // 所有组合
    for (let n = 1; n < len; n++) {
      let flagArrs = getFlagArrs(len, n)
      while (flagArrs.length) {
        let flagArr = flagArrs.shift()
        let combArr = []
        for (let i = 0; i < len; i++) {
          flagArr[i] && combArr.push(targetArr[i])
        }
        resultArrs.push(combArr)
      }
    }
    return resultArrs
  }

  /**
   * 获得从m中取n的所有组合
   */
  let getFlagArrs = function(m, n) {
    if (!n || n < 1) {
      return []
    }

    let resultArrs = [],
      flagArr = [],
      isEnd = false,
      i,
      j,
      leftCnt

    for (i = 0; i < m; i++) {
      flagArr[i] = i < n ? 1 : 0
    }

    resultArrs.push(flagArr.concat())

    while (!isEnd) {
      leftCnt = 0
      for (i = 0; i < m - 1; i++) {
        if (flagArr[i] == 1 && flagArr[i + 1] == 0) {
          for (j = 0; j < i; j++) {
            flagArr[j] = j < leftCnt ? 1 : 0
          }
          flagArr[i] = 0
          flagArr[i + 1] = 1
          let aTmp = flagArr.concat()
          resultArrs.push(aTmp)
          if (
            aTmp
              .slice(-n)
              .join('')
              .indexOf('0') == -1
          ) {
            isEnd = true
          }
          break
        }
        flagArr[i] == 1 && leftCnt++
      }
    }
    return resultArrs
  }

  //初始化用户选择事件
  let bindClickEvent = function() {
    skuDOM
      .find('.sku-body .sku')
      .each(function() {
        let self = $(this)
        let attr_id = self.attr('attr_id')

        if (!SKUResult[attr_id]) {
          self.addClass('disabled')
        }
      })
      .click(function() {
        let self = $(this)
        //|| self.hasClass('goods-selected')
        if (
          (self.hasClass('disabled') && !self.hasClass('default-function')) ||
          self.hasClass('goods-selected')
        ) {
          // 如果点击了disabled或者已经选择了的按钮,return
          return
        }

        //选中自己，兄弟节点取消选中
        self
          .toggleClass('goods-selected')
          .siblings()
          .removeClass('goods-selected')

        //已经选择的节点
        let selectedObjs = skuDOM.find('.sku-body .goods-selected')

        if (selectedObjs.length) {
          let getIndex = function(item) {
            let tempIndex
            keys.forEach(function(items, index) {
              if (items.indexOf(item) >= 0) {
                tempIndex = index
              }
            })
            return tempIndex
          }

          //获得组合key价格
          let selectedIds = []
          selectedObjs.each(function() {
            selectedIds.push($(this).attr('attr_id'))
          })
          selectedIds.sort(function(pre, cur) {
            return getIndex(pre) - getIndex(cur)
          })
          let len = selectedIds.length
          let prices = SKUResult[selectedIds.join(';')].prices
          let maxPrice = Math.max.apply(Math, prices)
          let minPrice = Math.min.apply(Math, prices)
          let enable_quantity = SKUResult[selectedIds.join(';')].count
          // $('.Dprice').text(maxPrice > minPrice ? minPrice + "-" + maxPrice : maxPrice);

          //用已选中的节点验证待测试节点 underTestObjs
          skuDOM
            .find('.sku-body .sku')
            .not(selectedObjs)
            .not(self)
            .each(function() {
              let siblingsSelectedObj = $(this).siblings(
                '.goods-sku .goods-selected'
              )
              let testAttrIds = [] //从选中节点中去掉选中的兄弟节点
              if (siblingsSelectedObj.length) {
                let siblingsSelectedObjId = siblingsSelectedObj.attr('attr_id')
                for (let i = 0; i < len; i++) {
                  selectedIds[i] != siblingsSelectedObjId &&
                    testAttrIds.push(selectedIds[i])
                }
              } else {
                testAttrIds = selectedIds.concat()
              }
              testAttrIds = testAttrIds.concat($(this).attr('attr_id'))
              // 给预备好的数据排序

              testAttrIds.sort(function(pre, cur) {
                return getIndex(pre) - getIndex(cur)
              })
              if (
                !SKUResult[testAttrIds.join(';')] ||
                SKUResult[testAttrIds.join(';')].count == 0
              ) {
                $(this)
                  .addClass('disabled')
                  .removeClass('goods-selected')
              } else {
                $(this).removeClass('disabled')
              }
            })

          // 执行回调
          callRefresh(
            1,
            enable_quantity,
            maxPrice > minPrice ? [minPrice, maxPrice] : maxPrice,
            self.data('specObj')
          )
        } else {
          //设置属性状态
          skuDOM.find('.sku').each(function() {
            SKUResult[$(this).attr('attr_id')]
              ? $(this).removeClass('disabled')
              : $(this)
                  .addClass('disabled')
                  .removeClass('goods-selected')
          })
        }
      })
  }

  // 执行回调函数.
  // caller === 0, 则调用者是初始化函数.
  // caller === 1, 则调用者是点击事件.
  // 区别是 等于0话,传入回调参数的价格要用这个函数里面生成的skuPrice.因为此时priceArray为undefined
  // 新增参数4： 带图片的规格对象（如果用户点击的是带图片的规格的话）
  let callRefresh = function(caller, enable_quantity, priceArray, specObj) {
    if (!skuRender.refresh) {
      return
    }
    let specIDArray = getSelectedSpecID()
    // match: 用户选择的这组规格,能匹配当前sku吗 ?
    let match
    // 遍历搜寻完成?
    let done = false
    let skuID
    let skuPrice

    //遍历数据源, 根据规格值id查找所属sku的id
    specListData.forEach(function(skuObj) {
      if (!done) {
        // 默认假设它能匹配
        match = true
        skuObj.specList.forEach(function(specObj) {
          // 如果发现有一个规格不匹配.
          if (specIDArray.indexOf(specObj.spec_value_id) < 0) {
            match = false
          }
        })
        // 当前sku对象的遍历搜寻完成.
        // 如果match为true,则找到了匹配的sku对象
        if (match) {
          // 完成
          done = true
          skuID = skuObj.sku_id
          // PS: 这里可以获取到这对sku的价格信息.
          // 所以可以不从外部传入.
          skuPrice = skuObj.price
        }
      }
    })

    // 执行回调函数
    skuRender.refresh({
      sku_id: skuID,
      price: caller === 1 ? priceArray : skuPrice,
      enable_quantity: enable_quantity,
      specObj: specObj
    })
  }

  // -----------------------初始化选择项-----------------------
  // 可以选择这个选项 ?
  // 需要判断: 如果选择了该项,后面每行必须有至少一个可选择项.
  let canChooseTheOptopn = function(which) {
    if (which.hasClass('disabled')) {
      return false
    }
    // 后面的行至少有一个可选项
    let haveLeastOneOptionAfterThis = function(diletray) {
      let ok = true
      diletray.each(function() {
        // 遍历每个sku元素,判断是否有disabled类
        if (
          $(this).children('.sku.disabled').length ==
          $(this).children('.sku').length
        ) {
          ok = false
        }
      })
      return ok
    }
    if (!haveLeastOneOptionAfterThis(which.parent().nextAll())) {
      return false
    }

    return true
  }

  //页面加载时 默认设置选中一个sku,即一组规格
  let setDefaultSku = function() {
    skuDOM.find('.sku-body >div').each(function() {
      // 遍历判断规格值,返回所有没有disabled属性的规格值
      // 触发第一个的点击事件
      $(
        $(this)
          .find('.sku')
          .filter(function() {
            return canChooseTheOptopn($(this))
          })[0]
      ).trigger('click')
    })

    // 遍历检测
    // 如果根据模拟用户点击进行初始化操作之后, 仍然没有完成'选中一组sku'.(即有一个行规格值的库存为0), 这时强行选择这行规格的第一个规格值.
    skuDOM.find('.sku-body div.sku-value-container').each(function() {
      let self = $(this)

      // 如果某行规格值皆为不可选状态(disabled)
      if (
        self.children('.sku.disabled').length === self.children('.sku').length
      ) {
        // 强行选择第一个. 然后设置特殊标记的class: default-function
        $(self.children('.sku')[0])
          .addClass('default-function goods-selected')
          .removeClass('disabled')

        callRefresh(0, 0)
      }
    })
  }

  // ---------------------------END---------------------------

  // 遍历获取用户选择的所有的规格的id数组
  let getSelectedSpecID = function() {
    let specValueIDArray = []
    skuDOM.find('.sku-body > div').each(function() {
      specValueIDArray.push(
        Number(
          $(this)
            .find('.sku.goods-selected')
            .attr('id')
        )
      )
    })
    return specValueIDArray
  }

  $.fn.skuRender = function(options) {
    // 提前设置goodID
    goodsID = options.goodsID

    // 把回调引用传递到全局变量中.供IIFE中的其他方法调用
    skuRender.refresh = options.refresh

    // 获取远程数据,然后执行进行一系列函数.
    getRemoteData(options.setData)

    // 把DOM渲染到页面中
    $(this).html(skuRender.DOM)
  }
})(jQuery)
