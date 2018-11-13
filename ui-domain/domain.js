/**
 * Created by Andste on 2018/7/2.
 * buyer_pc : 买家PC端
 * buyer_wap: 买家WAP端
 * seller   : 商家中心
 * admin    : 后台管理
 */

module.exports = {
  // 开发环境
  dev: {
    buyer_pc : 'http://127.0.0.1:3000',
    buyer_wap: 'http://127.0.0.1:3001',
    seller   : 'http://127.0.0.1:3002',
    admin    : 'http://127.0.0.1:3003',
  },
  // 生产环境
  pro: {
    buyer_pc : 'https://buyer.javamall.com.cn',
    buyer_wap: 'https://wap.javamall.com.cn',
    seller   : 'https://seller.javamall.com.cn',
    admin    : 'https://admin.javamall.com.cn',
  }
}
