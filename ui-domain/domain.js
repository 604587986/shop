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
    buyer_pc : 'http://192.168.2.105:3000',
    buyer_wap: 'http://192.168.2.105:3001',
    seller   : 'http://192.168.2.105:3002',
    admin    : 'http://192.168.2.105:3003',
  },
  // 生产环境
  pro: {
    buyer_pc : 'http://www.javashop7.s1.natapp.cc',
    buyer_wap: 'http://m.javashop7.s1.natapp.cc',
    seller   : 'http://seller.javashop7.s1.natapp.cc',
    admin    : 'http://admin.javashop7.s1.natapp.cc',
  }
}
