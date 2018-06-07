<template>
  <div>
    <en-tabel-layout
      toolbar
      pagination
      :tableData="tableData"
      :loading="loading">
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
        </div>
        <div class="toolbar-search">
          <en-table-search
            @search="searchEvent"
            @advancedSearch="advancedSearchEvent"
            advanced
            advancedWidth="465"
            placeholder="请输入订单编号">
            <template slot="advanced-content">
              <el-form ref="advancedForm" :model="advancedForm" label-width="100px">
                <el-form-item label="订单编号">
                  <el-input size="medium" v-model="advancedForm.order_sn" clearable></el-input>
                </el-form-item>
                <el-form-item label="退货(款)单号">
                  <el-input size="medium" v-model="advancedForm.sn" clearable></el-input>
                </el-form-item>
                <el-form-item label="类型">
                  <el-select v-model="advancedForm.refuse_type" placeholder="请选择" clearable>
                    <el-option label="退款" value="RETURN_MONEY"/>
                    <el-option label="退货" value="RETURN_GOODS"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="申请时间">
                  <el-date-picker
                    v-model="advancedForm.refund_time_range"
                    type="daterange"
                    align="center"
                    :editable="false"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </el-form>
            </template>
          </en-table-search>
        </div>
      </div>
      <template slot="table-columns">
        <!--退款、货单号-->
        <el-table-column prop="sn" label="退款、货单号"/>
        <!--订单号-->
        <el-table-column prop="sn" label="订单号"/>
        <!--会员名称-->
        <el-table-column prop="seller_name" label="会员名称"/>
        <!--创建时间-->
        <el-table-column label="申请时间">
          <template slot-scope="scope">{{ scope.row.create_time | unixToDate }}</template>
        </el-table-column>
        <!--类型-->
        <el-table-column prop="refuse_type" label="类型"/>
        <!--状态-->
        <el-table-column prop="refund_status_text" label="状态"/>
        <!--操作-->
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button v-if="scope.row.allow" type="text" @click="handleOperateRefund(scope.row)">查看</el-button>
            <el-button v-if="scope.row.allow" type="text" @click="handleOperateRefund(scope.row)">审核</el-button>
            <el-button v-if="scope.row.allow" type="text" @click="handleOperateRefund(scope.row)">退款</el-button>
            <el-button v-if="scope.row.allow" type="text" @click="handleOperateRefund(scope.row)">入库</el-button>
          </template>
        </el-table-column>
      </template>
      <!--分页-->
      <el-pagination
        slot="pagination"
        v-if="pageData"
        @size-change="handlePageSizeChange"
        @current-change="handlePageCurrentChange"
        :current-page="pageData.page_no"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageData.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.data_total">
      </el-pagination>
    </en-tabel-layout>
    <el-dialog title="退款、退货审核" :visible.sync="goodsRefundshow" width="30%" align="center">
      <div align="center">
        <div class="refund-info">
          <!--订单信息-->
          <div class="order-info">
            <h4>订单信息</h4>
            <div class="order-info-item">
              <span>{{currentType}}单号:</span><span>{{ refundInfo.sn }}</span>
            </div>
            <div class="order-info-item">
              <span>关联订单:</span><span>{{ refundInfo.order_sn }}</span>
            </div>
            <div class="order-info-item">
              <span>支付金额:</span><span>{{ }}</span>
            </div>
            <div class="order-info-item">
              <span>申请退款金额:</span><span>{{ refundInfo.refund_price }}</span>
            </div>
            <div class="order-info-item">
              <span>{{currentType}}人:</span><span>{{  }}</span>
            </div>
            <div class="order-info-item">
              <span>{{currentType}}状态:</span><span>{{  }}</span>
            </div>
          </div>
          <!--退款/货信息-->
          <div class="refund-info-relations">
            <div class="order-info-item">
              <span>申请时间:</span><span>{{ refundInfo.create_time }}</span>
            </div>
            <div class="order-info-item">
              <span>{{currentType}}原因:</span><span>{{ refundInfo.refund_reason }}</span>
            </div>
            <div class="order-info-item">
              <span>详细描述:</span><span>{{  }}</span>
            </div>
            <div class="order-info-item">
              <span>退款金额:</span>
              <el-input v-if="authOpera" v-model="refundMoney"></el-input>元
              <span v-if="authOpera">{{  }}</span>
            </div>
            <div class="order-info-item order-info-remark">
              <span>审核备注:</span>
              <el-input v-if="authOpera" type="textarea" v-model="remark"></el-input>
              <span v-if="authOpera">{{  }}</span>
            </div>
            <!--审核-->
            <div class="order-info-item" v-if="authOpera">
              <span>审核:</span>
              <el-button type="success" size="mini"  @click="handleRefundAuth(1)">通过</el-button>
              <el-button type="danger" size="mini"  @click="handleRefundAuth(0)">不通过</el-button>
            </div>
            <!--退款-->
            <div class="order-info-item" v-if="authOpera">
              <span>退款:</span>
              <el-button type="primary" size="mini"  @click="handleRefund">退款完成</el-button>
            </div>
            <!--入库-->
            <div class="order-info-item" v-if="authOpera">
              <span>入库:</span>
              <el-button type="primary" size="mini"  @click="handleWareHousing">确认入库</el-button>
            </div>
          </div>
        </div>
        <!--退货商品信息-->
        <en-tabel-layout :tableData="refundGoodsData" class="pop-table">
          <template slot="table-columns">
            <el-table-column label="商品图片">
              <template slot-scope="scope">
                <img :src="scope.row.goods_image" alt="">
              </template>
            </el-table-column>
            <el-table-column prop="goods_name" label="商品名称"/>
            <el-table-column  prop="price" label="单价"/>
            <el-table-column  prop="ship_num" label="购买数量"/>
            <el-table-column  prop="return_num" label="退货数量"/>
          </template>
        </en-tabel-layout>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_refund from '@/api/refund'
  import { CategoryPicker } from '@/components'

  export default {
    name: 'refundList',
    components: {
      [CategoryPicker.name]: CategoryPicker
    },
    mounted() {
      this.GET_RefundOrder()
    },
    data() {
      return {
        /** 列表loading状态 */
        loading: false,

        /** 列表参数 */
        params: {
          page_no: 1,
          page_size: 10
        },

        /** 列表数据 */
        tableData: null,

        /** 列表分页数据 */
        pageData: null,

        /** 高级搜索数据 */
        advancedForm: {

          order_sn: '',

          sn: '',

          refuse_type: '',

          refund_time_range: []
        },

        /** 当前退款/货 单号 */
        currentSn: '',

        /** 当前退款/货类型 文本*/
        currentType: '',

        /** 当前操作权限 */
        authOpera: {},

        /** 当前退款/货 信息 */
        refundInfo: {},

        /** 退款金额 */
        refundMoney: '',

        /** 备注 */
        remark: '',

        /** 退款商品列表数据 */
        refundGoodsData: [],

        /** 弹框是否显示 */
        goodsRefundshow: true
      }
    },
    methods: {
      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_RefundOrder()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_RefundOrder()
      },

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          keyword: data
        }
        Object.keys(this.advancedForm).forEach(key => delete this.params[key])
        this.GET_RefundOrder()
      },

      /** 高级搜索事件触发 */
      advancedSearchEvent() {
        this.params = {
          ...this.params,
          ...this.advancedForm
        }
        delete this.params.start_time
        delete this.params.end_time
        if (this.advancedForm.refund_time_range) {
          this.params.start_time = this.advancedForm.refund_time_range[0].getTime() / 1000
          this.params.end_time = this.advancedForm.refund_time_range[1].getTime() / 1000
        }
        delete this.params.keyword
        delete this.params.refund_time_range
        this.GET_RefundOrder()
      },

      /** 四种对应操作 显示不同的弹框内容 */
      handleOperateRefund(row) {
        this.getRefundDetails(row)
      },

      /** 获取退款单列表数据 */
      GET_RefundOrder() {
        this.loading = true
        API_refund.getRefundList(this.params).then(response => {
          this.loading = false
          this.tableData = response.data
          this.pageData = {
            page_no: response.draw,
            page_size: 10,
            data_total: response.recordsTotal
          }
        })
      },

      /** 查看退款/货单详细 */
      getRefundDetails(row) {
        this.currentType = row.refuse_type
        this.currentSn = row.sn
        this.authOpera = row.operate_allowable
        API_refund.getRefundDetails(row.sn).then(response => {
          this.goodsRefundshow = true
          this.refundInfo = response.refund
          this.refundGoodsData = response.refund_goods_do
        })
      },

      /** 卖家审核退款/货 */
      handleRefundAuth(agree) {
        const _params = {
          agree: agree,
          refund_price: this.refundMoney,
          remark: this.remark
        }
        API_refund.refundAuth(this.currentSn, _params).then(() => {
          this.goodsRefundshow = false
        })
      },

      /** 卖家执行退款 */
      handleRefund(row) {
        const _params = {}
        API_refund.toRefund(row.sn, _params).then(() => {
          this.goodsRefundshow = false
        })
      },

      /** 卖家执行入库操作 */
      handleWareHousing(row) {
        const _params = {
          remark: ''
        }
        API_refund.wareHousing(row.sn, _params).then(() => {
          this.goodsRefundshow = false
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ .el-table td:not(.is-left) {
    text-align: center;
  }

  .inner-toolbar {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0 20px;
  }

  .goods-image {
    width: 50px;
    height: 50px;
  }

  /** 退款/货信息 */
  .refund-info {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
    border: 1px solid #f2f2f2;
    div {
      flex-grow: 1;
      width: 50%;
    }
    /* 订单信息 */
    div.order-info {
      height: 100%;
      padding-bottom: 5px;
      h4 {
       text-align: left;
       font-size: 13px;
       color: #333;
       padding: 10px;
       background-color: #f2f2f2 ;
      }
      .order-info-item {
       text-align: left;
       width: 100%;
       margin: 0;
       padding: 8px;
       span {
         font-size: 13px;
       }
      }
    }
  }

  /*弹框表格*/
  /deep/ .pop-table {
    margin-top: 10px;
    border: 1px solid #f2f2f2;
    .toolbar {
      display: none;
    }
  }

  /** 退货信息相关 */
  .refund-info-relations {
    border-left: 1px solid #f2f2f2;
    height: 100%;
    .order-info-item {
      text-align: left;
      width: 100%;
      margin: 0;
      padding: 8px;
      span {
        font-size: 13px;
      }
    }
    .order-info-remark {
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }
  }
</style>
