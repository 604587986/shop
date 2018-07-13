<template>
  <div>
    <en-table-layout
      toolbar
      pagination
      :tableData="tableData"
      :loading="loading">
      <div slot="toolbar" class="inner-toolbar">
        <div class="toolbar-btns">
          <!--商品状态 上架 下架-->
          <div class="conditions">
            <span>商品状态：</span>
            <el-select
              class="choose-machine"
              v-model="params.market_enable"
              placeholder="请选择商品状态"
              @change="changeGoodsStatus"
              clearable>
              <el-option
                v-for="item in goodsStatusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </div>
          <!--商品类型-->
          <div v-if="parseInt(shopInfo.self_operated) === 1" class="conditions">
            <span>商品类型：</span>
            <el-select
              class="choose-machine"
              v-model="goods_type"
              placeholder="请选择商品类型"
              @change="changeGoodsType"
              clearable>
              <el-option key="NORMAL" label="正常商品" value="NORMAL"/>
              <el-option key="POINT" label="积分商品" value="POINT"/>
            </el-select>
          </div>
          <!--商品分组 获取分组列表-->
          <div class="conditions">
            <span>店铺分组：</span>
            <en-category-picker class="choose-machine" size="mini" @changed="changeGoodsCateGory" :clearable='true'/>
          </div>
          <el-button @click="publishGoods" type="primary" >发布商品</el-button>
          <el-button @click="gotoRecycle"  type="primary">回收站</el-button>
        </div>
        <div class="toolbar-search">
          <en-table-search @search="searchEvent" />
        </div>
      </div>
      <template slot="table-columns">
        <el-table-column label="图片" min-width="160">
          <template slot-scope="scope">
            <img :src="scope.row.thumbnail" class="goods-image" />
          </template>
        </el-table-column>
        <el-table-column label="名称" min-width="160">
          <template slot-scope="scope">
            <a :href="`${HTTP_URL}/${scope.row.goods_id}`" target="_blank" style="color: #00a2d4;">{{ scope.row.goods_name }}</a>
          </template>
        </el-table-column>
        <el-table-column label="价格">
          <template slot-scope="scope">{{ scope.row.price | unitPrice('￥') }}</template>
        </el-table-column>
        <el-table-column label="库存">
          <template slot-scope="scope">{{ scope.row.quantity }}件</template>
        </el-table-column>
        <el-table-column label="可用库存">
          <template slot-scope="scope">{{ scope.row.enable_quantity }}件</template>
        </el-table-column>
        <el-table-column label="创建时间" >
          <template slot-scope="scope">{{ scope.row.create_time | unixToDate('yyyy-MM-dd hh:mm') }}</template>
        </el-table-column>
        <el-table-column prop="market_enable" label="状态"  :formatter="marketStatus"/>
        <el-table-column label="操作" min-width="200" style="text-align: left;">
          <template slot-scope="scope">
            <el-button
              type="success"
              @click="handleEditGoods(scope.row)">编辑
            </el-button>
            <el-button
              type="danger"
              :disabled="scope.row.market_enable === 1 "
              @click="handleDeleteGoods(scope.row)">删除
            </el-button>
            <el-button
              type="primary"
              @click="handleStockGoods(scope.row)">库存
            </el-button>
          </template>
        </el-table-column>
      </template>
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
    </en-table-layout>
    <el-dialog title="库存编辑" :visible.sync="goodsStockshow" width="35%" class="pop-sku">
      <div align="center">
        <el-form :model="goodsStockData" v-if="goodsStocknums === 1" style="width: 50%;" label-width="100" :rules="rules">
          <el-form-item label="库存" prop="quantity" >
            <el-input  v-model="goodsStockData.quantity" />
          </el-form-item>
          <el-form-item label="待发货数" >
            <el-input v-model="goodsStockData.deliver_goods_quantity"  disabled />
          </el-form-item>
        </el-form>
        <en-table-layout :tableData="goodsStockData" :loading="loading" v-if="goodsStocknums != 1">
          <template slot="table-columns">
            <el-table-column prop="goods_name" label="商品名称"/>
            <el-table-column label="库存">
              <template slot-scope="scope">
                <el-input v-model="scope.row.quantity" />
              </template>
            </el-table-column>
            <el-table-column  prop="deliver_goods_quantity" label="待发货数" />
          </template>
        </en-table-layout>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="goodsStockshow = false">取 消</el-button>
        <el-button type="primary" @click="reserveStockGoods">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as API_goods from '@/api/goods'
  import { CategoryPicker } from '@/components'
  import { RegExp } from '~/ui-utils'
  export default {
    name: 'goodsList',
    components: {
      [CategoryPicker.name]: CategoryPicker
    },
    data() {
      const checkQuantity = (rule, value, callback) => {
        if (!value && value !== 0) {
          return callback(new Error('库存不能为空'))
        }
        setTimeout(() => {
          if (!RegExp.integer.test(value)) {
            callback(new Error('请输入大于等于0的整数'))
          } else {
            callback()
          }
        }, 500)
      }
      return {
        /** 列表loading状态 */
        loading: false,

        /** 域名配置 */
        HTTP_URL: `${process.env.HTTP_URL}/goods`,

        /** 列表参数 */
        params: {
          page_no: 1,
          page_size: 10,
          ...this.$route.query
        },

        /** 列表数据 */
        tableData: [],

        /** 列表分页数据 */
        pageData: [],

        /** 商品状态列表 */
        goodsStatusList: [
          { value: -1, label: '请选择' },
          { value: 0, label: '未出售（已下架）' },
          { value: 1, label: '出售中（已上架）' }
        ],

        /** 商品类型 NORMAL 正常商品 POINT 积分商品 */
        goods_type: 'NORMAL',

        /** 当前商品分组*/
        categoryId: '',

        /** 当前商品id*/
        goodsId: '',

        /** 商品库存显示*/
        goodsStockshow: false,

        /** 库存商品数量*/
        goodsStocknums: 1,

        /** 商品库存列表数据*/
        goodsStockData: {},

        /** 校验规则 */
        rules: {
          quantity: [
            { validator: checkQuantity, trigger: 'change' }
          ]
        },

        /** 店铺信息 */
        shopInfo: this.$store.getters.shopInfo
      }
    },
    mounted() {
      this.GET_GoodsList()
    },
    beforeRouteUpdate(to, from, next) {
      this.GET_GoodsList()
      next()
    },
    methods: {

      /** 分页大小发生改变 */
      handlePageSizeChange(size) {
        this.params.page_size = size
        this.GET_GoodsList()
      },

      /** 分页页数发生改变 */
      handlePageCurrentChange(page) {
        this.params.page_no = page
        this.GET_GoodsList()
      },

      /** 销售状态格式化 */
      marketStatus(row, column, cellValue) {
        return row.market_enable === 1 ? '售卖中' : '已下架'
      },

      /** 搜索事件触发 */
      searchEvent(data) {
        this.params = {
          ...this.params,
          keyword: data
        }
        this.GET_GoodsList()
      },

      /** 切换上下架状态*/
      changeGoodsStatus(val) {
        delete this.params.market_enable
        if (val !== '' && val !== -1) {
          this.params = {
            ...this.params,
            market_enable: val
          }
        }
        this.GET_GoodsList()
      },

      /** 切换商品类型 */
      changeGoodsType(val) {
        delete this.params.goods_type
        if (val !== '') {
          this.params = {
            ...this.params,
            goods_type: val
          }
        }
        this.GET_GoodsList()
      },

      /** 切换分组*/
      changeGoodsCateGory(data) {
        delete this.params.shop_cat_path
        if (data && Array.isArray(data) && data.length !== 0) {
          this.params = {
            ...this.params,
            shop_cat_path: '0|' + data.join('|') + '|'
          }
        }
        this.GET_GoodsList()
      },

      GET_GoodsList() {
        this.loading = true
        API_goods.getGoodsList(this.params).then(response => {
          this.loading = false
          this.pageData = {
            page_no: response.page_no,
            page_size: response.page_size,
            data_total: response.data_total
          }
          this.tableData = response.data
        })
      },

      /** 发布商品*/
      publishGoods() {
        this.$router.push({ path: '/goods/good-publish' })
      },

      /** 跳转回收站*/
      gotoRecycle() {
        this.$router.push({ path: '/goods/recycle-station' })
      },

      /** 编辑商品 isdraft 商品列表1*/
      handleEditGoods(row) {
        const _goods_id = row.goods_id
        this.$router.push({ path: `/goods/good-publish/${_goods_id}/1` })
      },

      /** 删除商品 */
      handleDeleteGoods(row) {
        this.$confirm('确认删除此商品, 是否继续?', '提示', { type: 'warning' }).then(() => {
          const _ids = [row.goods_id].toString()
          API_goods.deleteGoods(_ids).then(() => {
            this.GET_GoodsList()
            this.$message.success('删除商品成功！')
          })
        })
      },

      /** 库存 */
      handleStockGoods(row) {
        this.goodsId = row.goods_id
        this.goodsStockshow = true
        API_goods.getGoodsStockList(row.goods_id, {}).then((response) => {
          this.goodsStockData = response
          this.goodsStocknums = response.length
          // 构造待发货字段
          if (Array.isArray(response) && response.length > 0) {
            this.goodsStockData.forEach((key) => {
              this.$set(key, 'deliver_goods_quantity', parseInt(key.quantity) - parseInt(key.enable_quantity))
            })
          }
          this.goodsStockData = this.goodsStockData.length > 1 ? this.goodsStockData : this.goodsStockData[0]
        })
      },

      /** 保存库存商品 */
      reserveStockGoods() {
        let _params = []
        if (Array.isArray(this.goodsStockData)) {
          _params = this.goodsStockData.map((elem) => {
            return {
              quantity_count: elem.quantity,
              sku_id: elem.sku_id
            }
          })
        } else {
          _params.push({
            quantity_count: this.goodsStockData.quantity,
            sku_id: this.goodsStockData.sku_id
          })
        }
        const _res = _params.some(key => {
          return !RegExp.integer.test(key.quantity_count)
        })
        if (_res) {
          this.$message.error('库存必须为大于0的正整数')
          return
        }
        API_goods.reserveStockGoods(this.goodsId, _params).then((response) => {
          this.goodsStockshow = false
          this.$message.success('库存商品保存成功')
          this.GET_GoodsList()
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /deep/ div.toolbar {
    height: 70px;
    padding: 20px 0;
  }

  /deep/ .el-table td:not(.is-left) {
    text-align: center;
  }

  .inner-toolbar {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  /deep/ .pop-sku {
    .toolbar {
      display: none;
    }
    .el-dialog__body {
      .el-table {
        border: 1px solid #e5e5e5;
      }
    }
    .el-table__body-wrapper {
      max-height: 400px;
      overflow-y: scroll;
    }
  }


  .toolbar-search {
    margin-right: 10px;
    width: 20%;
  }

  div.toolbar-btns {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    div {
      span {
        display: inline-block;
        font-size: 14px;
        color: #606266;
      }
    }
    .conditions {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      min-width: 24.5%;
      .choose-machine {
        width: 60%;
      }
    }
  }

  .goods-image {
    width: 50px;
    height: 50px;
  }

  /deep/ div.cell {
    overflow:hidden;

    text-overflow:ellipsis;

    display:-webkit-box;

    -webkit-box-orient:vertical;

    -webkit-line-clamp:2;
  }

</style>
