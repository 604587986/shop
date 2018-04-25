<template>
  <div class="sku-item-content">
    <el-form  :model="skuForm" >
      <div v-for="(item, $index) in skuInfo" :key="$index">
        <el-form-item label="规格名：" prop="spec_name">
          <el-autocomplete
            style="width: 170px;"
            class="inline-input"
            v-model="item.spec_name"
            value-key="spec_name"
            :fetch-suggestions="querySearchSkuItem"
            placeholder="请输入规格项名称"
            @select="handleSelectSkuItem(item, $index)">
            <!--@blur.naitve="editSkuItem(item, $index)"-->
          </el-autocomplete>
          <el-checkbox v-if="$index === 0 " v-model="checkedImage" @change="handleChangeImage">添加规格图片</el-checkbox>
          <div class="empty"></div>
          <el-button type="danger"   size="mini" @click="handleCloseSkuItem($index)" icon="el-icon-delete"></el-button>
        </el-form-item>
        <el-form-item label="规格值：" prop="spec_value">
          <!--规格值文本列表-->
          <div  v-for="(val, index) in item.value_list" :key="index" style="padding: 10px 10px 10px 0;">
            <el-autocomplete
              class="inline-input"
              style="width: 170px;"
              v-model="val.spec_value"
              :key="index"
              value-key="spec_value"
              :fetch-suggestions="querySearchSkuValue"
              placeholder="请输入规格值名称"
              @select="handleSelectSkuValue(val, $index, index)">
              <!--@blur.naitve="editSkuIValue(val, $index, index)"-->
              <template slot="append">
                <el-button type="danger" size="mini" @click="handleCloseSkuValue($index, index)" icon="el-icon-delete"></el-button>
              </template>
            </el-autocomplete>
            <!--规格值图片 上传列表-->
            <div v-show="$index === 0 && checkedImage">
              我是上传组件
            </div>
          </div>
          <el-button type="text" plain size="mini" style="margin-left: 10px;"  class="add-btn-skuval" @click="addSpec($index)">添加规格值</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-button type="primary" size="mini" @click="addSkuItem">添加规格项目</el-button>
  </div>
</template>

<script>
  export default {
    name: 'SkuItem',
    props: {
      /** 请求数据 */
      skuData: {
        type: Array,
        default: []
      },

      /** 商品id */
      goodsId: {
        type: String,
        default: ''
      },

      /** 分类id*/
      categoryId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        /** 表单数据 */
        skuForm: {},

        /** 要提交的规格数据*/
        skuInfo: [
          {
            /** 规格描述 */
            spec_memo: '',

            /** 规格名称 */
            spec_name: '',

            /** 规格值列表 */
            value_list: [
              {
                /** 规格项id */
                spec_id: '',

                /** 规格值名字 */
                spec_value: '',

                /** 规格值id */
                spec_value_id: ''
              }
            ]
          }
        ],

        /** 当前规格值 */
        currentSkuValue: '',

        /** 当前规格项下的规格值列表*/
        specList: [
          { spec_value_id: '0', spec_value: '' }
        ],

        /** 是否选中 添加规格图片*/
        checkedImage: false,

        /** 是否显示规格值 */
        isShowSkuValue: false,

        /** 当前正在操作的规格值列表 */
        operaSpecsList: []
      }
    },
    methods: {

      /** 添加规格项 */
      addSkuItem() {
        this.skuInfo.push({})
      },

      /** 移除当前规格项 进行数据变化*/
      handleCloseSkuItem($index) {
        this.skuInfo.splice($index, 1)
        this.$emit('updateSkuInfo', this.skuInfo)
      },

      /** 点击查询输入规格项建议*/
      querySearchSkuItem(queryString, cb) {
        const restaurants = this.skuData.map((key) => { return key })
        const results = queryString ? restaurants.filter(this.createFilterSkuItem(queryString)) : restaurants
        cb(results)
      },

      /** 筛选符合输入信息的规格项 */
      createFilterSkuItem(queryString) {
        return (restaurant) => {
          return (restaurant.spec_name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },

      /** 选择规格项时触发  */
      handleSelectSkuItem(item, $index) {
        /** 检测是否已存在*/
        const exited = this.skuInfo.some((key) => {
          return key.spec_name === item.spec_name
        })
        const _skuInfo = this.skuInfo.filter((key) => {
          return key.spec_name === item.spec_name
        })
        if (exited && _skuInfo.length > 1) {
          this.$message.error('当前项已存在，请重新选择或者编辑！')
          this.$set(this.skuInfo[$index], 'spec_name', '')
          return
        }
        /** 更新skuInfo数据 */
        this.$set(this.skuInfo[$index], 'spec_memo', item.spec_memo || '')
        this.$set(this.skuInfo[$index], 'spec_name', item.spec_name || '')
        this.$set(this.skuInfo[$index], 'value_list', item.value_list || [])

        /** 设置当前规格值列表 */
        this.specList = this.skuData[$index].spec_list
      },

      /** 编辑规格项结束时触发添加事件 blur */
      editSkuItem(item, $index) {
        /** 检测是否已存在*/
        // const exited = this.skuInfo.some((key) => {
        //   return key.spec_name === item.spec_name
        // })
        // if (exited) {
        //   this.$message.error('当前项已存在，请重新选择或者编辑！')
        //   return
        // }
        /** 更新提交数据  按道理应该等请求数据回来之后再进行赋值 此处先这么用着等组件大致完结的时候再修正*/
        this.skuInfo[$index] = {
          spec_memo: item.spec_memo || '',
          spec_name: item.spec_name || '',
          value_list: [
            {
              spec_id: '',

              spec_value: '',

              spec_value_id: ''
            }
          ]
        }

        /** 更新下拉列表规格项数据 */
        this.$emit('updateSkuItem', item.value)
      },

      /** 选中/不选中 添加规格图片 是否显示上传组件*/
      handleChangeImage(val) {
        this.checkedImage = val
      },

      /** 规格值 */
      /** 添加当前规格项的规格值*/
      addSpec($index) {
        if (!this.skuInfo[$index] || !this.skuInfo[$index].value_list) {
          this.$message.warning('请选择规格项')
          return
        }
        this.skuInfo[$index].value_list.push({
          /** 规格项id */
          spec_id: '',

          /** 规格值名字 */
          spec_value: '',

          /** 规格值id */
          spec_value_id: ''
        })
      },

      /** 点击查询输入规格值建议*/
      querySearchSkuValue(queryString, cb) {
        const restaurants = this.specList.map((key) => { return key })
        const results = queryString ? restaurants.filter(this.createFilterSkuVal(queryString)) : restaurants
        cb(results)
      },

      /** 筛选符合输入信息的规格值 */
      createFilterSkuVal(queryString) {
        return (restaurant) => {
          return (restaurant.spec_value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },

      /** 移除当前规格值 */
      handleCloseSkuValue($index, index) {
        this.skuInfo[$index].value_list.splice(index, 1)
        this.$emit('updateSkuInfo', this.skuInfo)
      },

      /** 选择规格值时触发 */
      handleSelectSkuValue(val, $index, index) {
        /** 检测是否已存在*/
        const exited = this.skuInfo[$index].value_list.some((key) => {
          return key.spec_value === val.spec_value
        })
        const _value_list = this.skuInfo[$index].value_list.filter((key) => {
          return key.spec_value === val.spec_value
        })
        if (exited && _value_list.length > 1) {
          this.$message.error('当前项已存在，请重新选择或者编辑！')
          this.$set(this.skuInfo[$index].value_list[index], 'spec_value', '')
          return
        }
        /** 更新skuInfo数据 */
        this.skuInfo[$index].value_list[index] = val
        this.$emit('updateSkuInfo', this.skuInfo)
      },

      /** 编辑规格值时触发 */
      editSkuIValue(val, $index, index) {
        /** 更新下拉列表规格项数据 */
        // this.$emit('updateSkuItem', val)

        /** 更新skuInfo数据 */
        this.skuInfo[$index].value_list[index] = val
        console.log(this.skuInfo, 56)
      }
    }
  }
</script>
<style lang="scss" type="scss" scoped>
  .sku-item-content {
    div {
      margin: 0px;
    }
  }

  /** 规格值列表 */
  .sku-value-list {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
  /** 关闭按钮*/
  .close-sku-item {
    cursor: pointer;
  }
  /*表单结构*/
  .el-form {
    border: 1px solid #e5e5e5;
    padding: 10px;
    .el-form-item {
      padding: 5px 10px;
    }
    /** 规格项 */
    .el-form-item:first-child {
      background-color: #f8f8f8;
      cursor: pointer;
      /deep/ .el-form-item__label + div {
        width: 90%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        div {
          flex-grow: 1;
        }
        label {
          flex-grow: 1;
          display: inline-block;
          margin-left: 10px;
        }
        div.empty {
          flex-grow: 200;
        }
        button {
          flex-grow: 1;
        }
      }
    }
    /*规格值*/
    .el-form-item:last-child {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      /deep/ .el-form-item__label + div {
        width: 90%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        button.add-btn-skuval {
          margin-left: 10px;
          outline: none;
        }
      }
    }
  }





</style>
