<template>
  <div class="dashboard-container" v-loading="loading">
    <!--商家基本信息-->
    <el-row :gutter="20" type="flex" justify="space-around" v-if="shop_info">
      <el-col  :span="24">
        <div class="grid-content bg-purple-light">
          <!--logo-->
          <div class="logo">
            <div class="shop-img-icon">
              <img  :src="shop_info.shop_logo">
              <span class="to-change-shop-icon" @click="toChangeShopIcon">更改图标</span>
            </div>
            <el-upload
              class="upload-demo"
              style="display: none;"
              action="https://jsonplaceholder.typicode.com/posts/"
              :limit="1"
              :file-list="fileList"
              :on-success="uploaded">
              <button style="visibility: hidden;" ref="uploadBtn"></button>
            </el-upload>
          </div>
          <!--文字信息-->
          <div class="shop-info">
            <div class="shop-info-basic">
              <span>{{dashBoardData.shop_info.shop_name}}</span>
              <span>（用户名：{{dashBoardData.shop_info.seller_name}}）</span>
            </div>
            <div class="shop-info-credit">
              <span>
                卖家信用：{{dashBoardData.shop_info.shop_credit}}
              </span>
              <div class="shop-icon">
                <img src="/javashop/themes/b2b2cv4/images/cert_autonym.gif" alt="">
                <img src="/javashop/themes/b2b2cv4/images/cert_material.gif" alt="">
              </div>
              <span>店铺地址：{{dashBoardData.shop_info.shop_address}}</span>
            </div>
          </div>
          <!--动态评分-->
          <div class="score">
            <p>店铺动态评分</p>
            <div class="active-score">
              <div>
                <span>描述</span>
                <span>{{dashBoardData.shop_score.describe}}分</span>
              </div>
              <div>
                <span>服务</span>
                <span>{{dashBoardData.shop_score.service}}分</span>
              </div>
              <div>
                <span>发货</span>
                <span>{{dashBoardData.shop_score.delivery}}分</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" type="flex" justify="space-around">
      <!--店铺 商品提示-->
      <el-col  :span="12" v-if="shop_prompt">
        <el-card class="box-card">
          <div>
            <h1>店铺及商品提示</h1>
            <h2>您需要关注的店铺信息以及待处理事项</h2>
          </div>
          <div class="store-index-content">
            <p class="store-rompt" @click="toGoodsManager(0)">出售中的商品：
              <span style="color: red;">{{shop_prompt.selling_num}}</span>
            </p>
            <div>
              <el-tag type="success" @click.native="toGoodsManager(1)">仓库待上架货品  {{shop_prompt.wait_shelves}}</el-tag>
              <el-tag type="success" @click.native="toConsumerMsg">买家留言  {{shop_prompt.buyer_consulting}}</el-tag>
            </div>
          </div>
        </el-card>
      </el-col>
      <!--商城公告-->
      <el-col :span="12"  v-if="shop_announcement">
        <el-card class="box-card">
          <div>
            <h1>商城公告</h1>
            <h2>您可以关注商城公告，以便能更快的了解商城的信息</h2>
          </div>
          <p class="store-bulletin" v-for="item in shop_announcement">》
            <a target="_blank"
               :href="`/javashop/help-${item.article_id}.html`"
               :title="item.content">{{item.title}}</a>
          </p>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" type="flex" justify="space-around">
      <!--交易提示-->
      <el-col  :span="12" v-if="trading_prompt">
        <el-card class="box-card">
          <div>
            <h1>交易提示</h1>
            <h2>您需要立即处理的交易订单</h2>
          </div>
          <div class="store-index-content">
            <p class="store-rompt" @click="toOrderList(0)">所有的订单：<span style="color: red;">{{trading_prompt.all_order_num}}</span></p>
            <div>
              <el-tag type="success" @click.native="toOrderList(1)">待付款  {{trading_prompt.wait_pay}}</el-tag>
              <el-tag type="success" @click.native="toOrderList(2)">待发货  {{trading_prompt.wait_ship}}</el-tag>
              <el-tag type="success" @click.native="toOrderList(3)">待收货  {{trading_prompt.wait_rog}}</el-tag>
              <el-tag type="success" @click.native="toRefundOrderList()">申请售后  {{trading_prompt.after_sales}}</el-tag>
            </div>
          </div>
        </el-card>
      </el-col>
      <!--平台联系方式-->
      <el-col :span="12">
        <el-card class="box-card">
          <div>
            <h1>平台联系方式</h1>
            <h2>可以致电平台联系电话或将建议、问题提交到平台邮箱中</h2>
          </div>
          <div> </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as API_Dashboard from '@/api/dashboard'

export default {
  name: 'dashboard',
  mounted() {
    window.onresize = this.countTableHeight
  },
  data() {
    return {
      /** 加载中*/
      loading: false,

      /** 首页数据*/
      dashBoardData: [],

      /** 商家信息*/
      shop_info: null,

      /** 店铺 商品提示*/
      shop_prompt: null,

      /** 商城公告*/
      shop_announcement: [],

      /** 交易订单提示*/
      trading_prompt: null,

      /** 平台联系方式*/
      concat: null,

      /** 商家图标*/
      fileList: [],

      /** 视图高度*/
      tableHeight: (document.body.clientHeight - 84 - 80 - 80 - 20 - 20 - 4) / 2
    }
  },
  created() {
    this.GET_DashBoard()
  },
  methods: {
    /** 窗口缩放时计算table高度 */
    countTableHeight() {
      this.tableHeight = (document.body.clientHeight - 84 - 80 - 80 - 20 - 20 - 4) / 2
    },

    /** 获得首页信息*/
    GET_DashBoard() {
      this.loading = true
      API_Dashboard.getDashboardData().then(response => {
        this.loading = false
        this.dashBoardData = response
        this.shop_info = response.shop_info
        this.shop_prompt = response.shop_prompt
        this.shop_announcement = response.shop_announcement
        this.trading_prompt = response.trading_prompt
        this.concat = response.concat
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },

    /** 去上传*/
    toChangeShopIcon() {
      this.$refs.uploadBtn.click()
    },

    /** 上传成功后的钩子*/
    uploaded(response, file, fileList) {
      // 更换图片 置空存储数组
      this.shop_info.shop_logo = file.url
      this.fileList = []
    },

    /** 跳转商品列表*/
    toGoodsManager(goodsStatus) {
      this.$router.push({ path: '/goods/goods-list', query: { goodsStatus }})
    },

    /** 跳转买家留言*/
    toConsumerMsg() {
      this.$router.push({ path: '/goods/goods-list' })
    },

    /** 跳转订单列表*/
    toOrderList(orderStatus) {
      this.$router.push({ path: '/order/order-list', query: { orderStatus }})
    },

    /** 跳转维权订单*/
    toRefundOrderList() {
      this.$router.push({ path: '/order/refund-list' })
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .dashboard-container {
    height: 100%;
    background-color: #ffffff;
    /deep/ .el-card__body {
      min-height: 300px;
      padding: 10px;
    }
  }
  .el-tag {
    cursor: pointer;
  }
  /deep/ .el-row {
    position: relative;
    margin: 0 3px 20px 3px !important;
  }
  .el-col {
    border-radius: 4px;
  }

  /*商家基本信息*/
  div.grid-content {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: stretch;

    /*logo*/
    .logo {
      flex-grow: 1;
      padding: 15px;
      position: relative;
      box-sizing: content-box;
      div.shop-img-icon {
        width: 200px;
        span.to-change-shop-icon {
          display: none;
          position: absolute;
          left: 16px;
          bottom: 20px;
          z-index: 10;
          width: 200px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          font-size: 12px;
          font-weight: normal;
          background: rgba(33, 33, 33, .6);
          color: #fff;
          cursor: pointer;
        }
        img {
          width: 200px;
          height: 80px;
          cursor: pointer;
          border: 1px solid #999;
        }
      }
      div.shop-img-icon:hover span.to-change-shop-icon {
        display: block ;
      }
    }

    /*商家信息*/
    .shop-info {
      flex-grow: 40;
      padding-top: 30px;
      /*商家主营信息*/
      .shop-info-basic {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        span:first-child {
          color: #333;
          font: 18px/36px "microsoft yahei";
          letter-spacing: normal;
          vertical-align: bottom;
          word-spacing: normal;
        }
        span:last-child {
          color: #999;
          font-size: 12px;
          letter-spacing: normal;
          line-height: 28px;
          margin-left: 12px;
          vertical-align: bottom;
          word-spacing: normal;
        }
      }
      /*卖家信用*/
      .shop-info-credit {
        flex-grow: 1;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        /deep/ span {
          display: inline-block;
          margin-left:0 !important;
          color: #999;
          font-size: 12px;
          letter-spacing: normal;
          line-height: 28px;
          margin-left: 12px;
          vertical-align: bottom;
          word-spacing: normal;
        }
        .shop-icon {
          margin:0 40px;
        }
      }
    }

    /*动态评分*/
    .score {
      flex-grow: 2.5;
      text-align: right;
      padding:5px 20px;
      p {
        margin: 0;
        text-align: left;
        border-bottom: 1px dotted #e7e7e7;
        font-size: 14px;
        color: #999;
        line-height: 25px;
        line-height: 20px;
        padding-bottom: 5px;
      }
      div.active-score {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content:space-around;
        align-items: center;
        margin-top: 5px;
        div {
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          justify-content:space-around;
          align-items: center;
          span:first-child {
            color: #333;
            display: inline-block;
            font-size: 14px;
            text-align: center;
            padding: 5px 0px;
            font-weight: bold;
          }
          span:last-child {
            display: inline-block;
            font-size: 14px;
            text-align: center;
            padding: 5px 0px;
            color: #da542e;
          }
        }
      }
    }
  }
  /*商城信息*/
  /*标题*/
  h1 {
    border-left: 3px solid #28b779;
    font: 16px/18px "microsoft yahei";
    height: 18px;
    margin-bottom: 4px;
    padding-left: 6px;
  }

  /*副标题*/
  h2 {
    color: #aaa;
    font: 12px/16px "microsoft yahei";
    margin-left: 8px;
  }

  /*内容*/
  .store-index-content {
    margin: 20px 0;
    overflow: hidden;
    .store-rompt {
      clear: both;
      display: block;
      overflow: hidden;
      padding: 10px;
      background-color: #fcf8e3;
      border: 1px solid #fbeed5;
      cursor: pointer;
    }
  }
  /*商城公告*/
  .store-bulletin {
    color: #aaa;
    cursor: pointer;
    font: 12px/16px "microsoft yahei";
  }
  .store-bulletin:hover a {
    color: #337ab7;
  }
</style>
