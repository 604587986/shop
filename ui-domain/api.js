/**
 * Created by Andste on 2018/7/2.
 * base    : 基础业务API
 * buyer   : 买家API
 * seller  : 商家中心API
 * admin   ：后台管理API
 */

module.exports = {
  // 开发环境
  dev: {
    base    : 'http://127.0.0.1:7000',
    buyer   : 'http://127.0.0.1:7002',
    seller  : 'http://127.0.0.1:7003',
    admin   : 'http://127.0.0.1:7004'
  },
  // 生产环境
  pro: {
    base    : 'http://api.base.javamall.com.cn',
    buyer   : 'http://api.buyer.javamall.com.cn',
    seller  : 'http://api.seller.javamall.com.cn',
    admin   : 'http://api.admin.javamall.com.cn'
  }
}
