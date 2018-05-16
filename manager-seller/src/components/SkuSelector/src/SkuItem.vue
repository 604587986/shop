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
            :select-when-unmatched='true'
            @focus="getActiveSkuItem($index)"
            @blur.naitve="editSkuItem(item, $index)"
            @select="handleSelectSkuItem">
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
              @focus="getActiveSkuValue(index, item)"
              @blur.naitve="editSkuIValue(item, val, $index, index)"
              @select="handleSelectSkuValue">
              <template slot="append">
                <el-button type="danger" size="mini" @click="handleCloseSkuValue($index, index)" icon="el-icon-delete"></el-button>
              </template>
            </el-autocomplete>
            <!--规格值图片 上传列表-->
            <div v-show="$index === 0 && checkedImage">
              <el-upload
                class="avatar-uploader"
                style="text-align: center; margin-top: 10px;"
                :key="index"
                :action="BASE_IMG_URL"
                :show-file-list="false"
                :on-success="getImgUrl"
                :before-upload="beforeImgUpload">
                <img v-if="val.spec_image" :src="val.spec_image" class="avatar sku-image" @click="handleClickImg(index)">
                <i v-else class="el-icon-plus avatar-uploader-icon"  @click="handleClickImg(index)"></i>
              </el-upload>
            </div>
          </div>
          <el-button type="text"  size="mini" style="margin-left: 10px;"  class="add-btn-skuval" @click="addSpec($index, item)">添加规格值</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-button type="primary" size="mini" @click="addSkuItem">添加规格项目</el-button>
  </div>
</template>

<script>
  import * as API_goodsSku from '@/api/goodsSkuInfo'
  export default {
    name: 'SkuItem',
    props: {
      /** 商城分类ID */
      categoryId: {
        type: Number,
        default: 0
      },

      /** 商品规格信息 */
      productSkuInfo: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        /** 图片服务器地址 */
        BASE_IMG_URL: process.env.BASE_IMG_URL,

        /** 表单数据  估计没啥用*/
        skuForm: {},

        /** 请求数据*/
        skuData: [],

        /** 要提交的规格数据*/
        skuInfo: [
          // {
          //   /** 规格描述 */
          //   spec_memo: '',
          //
          //   /** 规格名称 */
          //   spec_name: '',
          //
          //   /** 规格值列表 */
          //   value_list: [
          //     {
          //       /** 规格项id */
          //       spec_id: '',
          //
          //       /** 规格值名字 */
          //       spec_value: '',
          //
          //       /** 规格值id */
          //       spec_value_id: '',
          //
          //       /** 规格值图片 */
          //       spec_image: '',
          //
          //       /** 该规格是否有图片，1 有 0 没有 */
          //       spec_type: 0
          //     }
          //   ]
          // }
        ],

        /** 当前规格项下的规格值列表*/
        specList: [
          // { spec_value_id: '0', spec_value: '' }
        ],

        /** 是否添加规格图片*/
        checkedImage: false,

        /** 当前规格项索引 */
        activeSkuItemIndex: 0,

        /** 当前规格值索引 */
        activeSkuValIndex: 0
      }
    },
    mounted() {
      this.getSkuInfoByCategory()
      this.getSkuInfo()
    },
    watch: {
      productSkuInfo() {
        this.getSkuInfo()
      }
    },
    methods: {
      /** 根据分类id获取规格信息*/
      getSkuInfoByCategory() {
        if (this.categoryId && this.categoryId > 0) {
          API_goodsSku.getCategorySkuList(this.categoryId, {}).then(response => {
            this.skuData = response
          }).catch(error => this.$message.error(error))
        }
      },
      getSkuInfo() {
        /** 下拉列表数据(skuData)存在时 检测productSkuInfo中对应的规格(spec_id)项 并且赋值于skuInfo中对应的规格项信息（描述 + 名称） */
        if (this.categoryId && this.categoryId > 0) {
          API_goodsSku.getCategorySkuList(this.categoryId, {}).then(response => {
            this.skuData = response
            if (this.skuData.length > 0 && Array.isArray(this.productSkuInfo) && this.productSkuInfo.length > 0) {
              this.skuInfo = this.productSkuInfo
              if (this.skuInfo.length > 0) {
                this.skuInfo.forEach(key => {
                  this.skuData.forEach(item => {
                    if (key.spec_id === item.spec_id) {
                      key.spec_name = item.spec_name
                      key.spec_memo = item.spec_memo
                    }
                  })
                })
              }
              /** 触发一次数据转换（规格选择数据=> 规格表格数据） */
              this.$emit('updateSkuInfo', this.skuInfo)
            }
          }).catch(error => this.$message.error(error))
        }
      },

      /** 规格项 */

      /** 添加规格项 */
      addSkuItem() {
        this.skuInfo.push({
          /** 规格描述 */
          spec_memo: '',

          /** 规格名称 */
          spec_name: '',

          /** 规格值列表 */
          value_list: []
        })
      },

      /** 移除当前规格项 进行数据变化*/
      handleCloseSkuItem($index) {
        this.skuInfo.splice($index, 1)
        this.$emit('updateSkuInfo', this.skuInfo)
      },

      /** 获取当前 规格项索引 */
      getActiveSkuItem($index) {
        this.activeSkuItemIndex = $index
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
      handleSelectSkuItem(item) {
        /** 检测当前项是否已选择过 */
        const exited = this.skuInfo.some((key) => {
          return key.spec_name === item.spec_name
        })
        const _skuInfo = this.skuInfo.filter((key) => {
          return key.spec_name === item.spec_name
        })
        if (exited && _skuInfo.length > 1) {
          this.$message.error('当前项已存在，请重新选择或者编辑！')
          /** 置空当前项 */
          this.$set(this.skuInfo[this.activeSkuItemIndex], 'spec_name', '')
          return
        }
        /** 更新skuInfo数据 */
        this.$set(this.skuInfo[this.activeSkuItemIndex], 'spec_memo', item.spec_memo || '')
        this.$set(this.skuInfo[this.activeSkuItemIndex], 'spec_name', item.spec_name || '')
        this.$set(this.skuInfo[this.activeSkuItemIndex], 'spec_id', item.spec_id || '')
        this.$set(this.skuInfo[this.activeSkuItemIndex], 'value_list', [{
          spec_id: item.spec_id
        }])
        /** 设置当前规格值列表 */
        this.skuData.filter(key => {
          if (item.spec_id === key.spec_id) {
            this.specList = key.value_list || []
          }
        })
      },

      /** 编辑规格项结束时触发添加事件 blur */
      editSkuItem(item, $index) {
        // 检测是否为空 检测是否有item.value_list[0].spec_id值 如果有则说明是选择而非编辑的终止方法的执行
        if (!item.spec_name || (item.value_list[0] && item.value_list[0].spec_id)) {
          return
        }
        /** 更新用户自定义规格项  */
        API_goodsSku.saveCustomSkuItem(this.categoryId, { spec_name: item.spec_name }).then(response => {
          this.$message.success('添加自定义规格项成功')
          /** 更新下拉列表规格项数据 */
          this.getSkuInfoByCategory()
          /** 更新skuInfo数据 */
          this.$set(this.skuInfo[$index], 'spec_memo', response.spec_memo || '')
          this.$set(this.skuInfo[$index], 'spec_name', response.spec_name || '')
          this.$set(this.skuInfo[$index], 'spec_id', response.spec_id || '')
          this.$set(this.skuInfo[this.activeSkuItemIndex], 'value_list', [{
            spec_id: response.spec_id
          }])
        }).catch(error => this.$message.error(error))
      },

      /** 选中/不选中 添加规格图片 是否显示上传组件*/
      handleChangeImage(val) {
        this.checkedImage = val
        /** 如果 图片按钮不显示 则置空图片列表中的所有图片数据 并且spec_type设置为0 */
        if (!val) {
          this.skuInfo.forEach(key => {
            key.value_list.forEach(item => {
              item.spec_image = ''
              item.spec_type = 0
            })
          })
        }
      },

      /** 规格值 */

      /** 添加当前规格项的规格值*/
      addSpec($index, item) {
        if (!this.skuInfo[$index] || !this.skuInfo[$index].value_list) {
          this.$message.warning('请选择规格项')
          return
        }
        this.skuInfo[$index].value_list.push({
          /** 规格项id */
          spec_id: item.spec_id,

          /** 规格值名字 */
          spec_value: '',

          /** 规格值id */
          spec_value_id: '',

          /** 规格值图片 */
          spec_image: '',

          /** 该规格是否有图片，1 有 0 没有  默认0*/
          spec_type: 0
        })
      },

      /** 获取当前规格值索引 赋值当前对应规格项的规格值下拉列表*/
      getActiveSkuValue(index, item) {
        this.activeSkuValIndex = index
        /** 设置当前规格值列表 */
        this.skuData.filter(key => {
          if (item.spec_id === key.spec_id) {
            this.specList = key.value_list || []
          }
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
      handleSelectSkuValue(val) {
        /** 检测是否已存在*/
        const exited = this.skuInfo[this.activeSkuItemIndex].value_list.some((key) => {
          return key.spec_value === val.spec_value
        })
        const _value_list = this.skuInfo[this.activeSkuItemIndex].value_list.filter((key) => {
          return key.spec_value === val.spec_value
        })
        if (exited && _value_list.length > 1) {
          this.$message.error('当前项已存在，请重新选择或者编辑！')
          this.$set(this.skuInfo[this.activeSkuItemIndex].value_list[this.activeSkuValIndex], 'spec_value', '')
          return
        }
        /** 更新skuInfo数据 */
        this.skuInfo[this.activeSkuItemIndex].value_list[this.activeSkuValIndex] = val
        this.$emit('updateSkuInfo', this.skuInfo)
      },

      /** 编辑规格值时触发 */
      editSkuIValue(item, val, $index, index) {
        // 检测是否为空 检测是否有spec_value_id值 如果有则说明是选择而非编辑的终止方法的执行
        if (!val.spec_value || val.spec_value_id) {
          return
        }
        /** 更新用户自定义规格值 */
        API_goodsSku.saveCustomSkuValue(val.spec_id, { value_name: val.spec_value }).then(response => {
          this.$message.success('添加自定义规格值成功')
          /** 更新下拉列表规格值数据 */
          this.getSkuInfoByCategory()
          /** 更新skuInfo数据 */
          this.skuInfo[this.activeSkuItemIndex].value_list[this.activeSkuValIndex] = {
            spec_id: response.spec_id,
            spec_value: response.spec_value,
            spec_value_id: response.spec_value_id,
            spec_image: '',
            spec_type: 0
          }
          this.$emit('updateSkuInfo', this.skuInfo)
        }).catch(error => this.$message.error(error))
      },

      /** 图片上传之前的校验  */
      beforeImgUpload(file) {
        const isType = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
        const isLt1M = file.size / 1024 / 1024 < 1

        if (!isType) {
          this.$message.error('上传头像图片只能是 JPG/JPEG/PNG 格式!')
        }
        if (!isLt1M) {
          this.$message.error('上传商品相册图片大小不能超过 1MB!')
        }
        return isType && isLt1M
      },

      /** 点击已上传的图片 或者 i标签 */
      handleClickImg(index) {
        this.activeSkuValIndex = index
      },

      /** 文件上传成功之后的钩子 */
      getImgUrl(response, file, fileList) {
        /** 更新skuInfo数据 */
        this.$set(this.skuInfo[this.activeSkuItemIndex].value_list[this.activeSkuValIndex], 'spec_image', file.url)
        this.$set(this.skuInfo[this.activeSkuItemIndex].value_list[this.activeSkuValIndex], 'spec_type', 1)
        this.$emit('updateSkuInfo', this.skuInfo)
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
        /** 待上传图片 */
        img.sku-image {
          width: 120px;
          height: 120px;
        }
        i.avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 120px;
          height: 120px;
          line-height: 120px;
          text-align: center;
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
        }
        i.avatar-uploader-icon:hover {
          border-color: #409eff;
        }
      }
    }
  }





</style>
