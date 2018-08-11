/**
 * Created by Andste on 2018/7/2.
 * buyer_pc : 买家PC端
 * buyer_wap: 买家WAP端
 * seller   : 商家中心
 * admin    : 后台管理
 * cookie   : 设置cookie的domain，用于cookie共享
 */

module.exports = {
  // 开发环境
  dev: {
    buyer_pc : 'http://127.0.0.1:3000',
    buyer_wap: 'http://127.0.0.1:3001',
    seller   : 'http://127.0.0.1:3002',
    admin    : 'http://127.0.0.1:3003',
    cookie   : '127.0.0.1'
  },
  // 生产环境
  pro: {
    buyer_pc : 'http://www.yiqisi.s1.natapp.cc',
    buyer_wap: 'http://m.yiqisi.s1.natapp.cc',
    seller   : 'http://seller.yiqisi.s1.natapp.cc',
    admin    : 'http://admin.yiqisi.s1.natapp.cc',
    cookie   : 'yiqisi.s1.natapp.cc'
  }
}
