<template>
  <div class="sku-item-content">
    <div v-for="(item, $index) in skuInfo" :key="$index">
      <div class="sku-item-first">
        <!--规格项列表select-->
        <el-select
          v-model="currentSkuItem"
          filterable
          allow-create
          default-first-option
          @change="handleChangeSkuItem">
          <el-option
            v-for="(elem, index) in skuData" :key="index"
            :label="elem.spec_name"
            :value="elem.spec_memo">
          </el-option>
        </el-select>
        <!--添加规格图片-->
        <el-checkbox v-if="$index === 0 " v-model="checkedImage" @change="handleChangeImage">添加规格图片</el-checkbox>
        <i class="el-icon-error close-sku-item" @click="handleCloseSku($index)" ></i>
      </div>
      <div class="sku-value-list">
        <!--规格值文本列表-->
        <div v-for="(spec, index) in specList" :key="index" >
          <el-tag  closable @close="delTag(spec)">
            {{spec.spec_value}}
          </el-tag>
          <!--规格值图片 上传列表-->
          <div v-show="index === 0 && checkedImage">
            sdfioada
          </div>
        </div>
        <el-button type="text" plain @click="addSpec">+添加</el-button>
      </div>
      <!--规格值列表 select-->
      <div v-show="isShowSkuValue">
        <el-select
          v-model="currentSkuValue"
          multiple
          filterable
          allow-create
          default-first-option
          @change="handleChangeSkuValue">
          <el-option
            v-for="(spec, _index) in specList"
            :key="_index"
            :label="spec.spec_value"
            :value="spec.spec_value_id">
          </el-option>
        </el-select>
        <el-button type="primary" @click="confirmSku" size="mini">确认</el-button>
        <el-button type="primary" @click="cancelSku" size="mini">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'SkuItem',
    computed: {
      ...mapGetters([
        'skuData', 'skuInfo'
      ])
    },
    data() {
      return {

        /** 当前规格项*/
        currentSkuItem: '',

        /** 当前规格值 */
        currentSkuValue: '',

        /** 是否可添加规格图片 取决条件：是否是第一项 */
        isShowImgage: false,

        /** 当前规格项下的规格值列表*/
        specList: [
          { spec_value_id: '0', spec_value: '你好大蛇阿比' }
        ],

        /** 是否选中 添加规格图片*/
        checkedImage: false,

        /** 是否显示规格值选择select */
        isShowSkuValue: false,

        /** 当前正在操作的规格值列表 */
        operaSpecsList: []
      }
    },
    mounted() {
      console.log(this.skuData, 666)
    },
    methods: {
      /** 移除规格值标签 同步数据*/
      delTag(target) {
        console.log(target)
        this.skuData.forEach((elem) => {
          if (elem.spec_list[0].spec_id === target.spec_id) {
            elem.spec_list.forEach((key, index) => {
              if (key.spec_value_id === target.spec_value_id) {
                elem.spec_list.splice(index, 1)
              }
            })
          }
        })
        this.$store.dispatch('updateSkuData', this.skuData)
      },

      /** 当前规格项发生改变时触发*/
      handleChangeSkuItem(val) {
        console.log(val, 5896)
        this.specList = val.value_list
      },

      /** 当前规格值发生改变时触发 */
      handleChangeSkuValue(val) {
        console.log(val, 36363)
        this.operaSpecsList.push(val)
      },

      /** 添加规格项的值*/
      addSpec() {
        this.isShowSkuValue = true
      },

      /** 选中/不选中 添加规格图片*/
      handleChangeImage(val) {
        this.checkedImage = val
      },

      /** 添加规格值确认 执行异步操作 提交当前添加的当前规格项下的规格值 并根据返回值进行数据修补*/
      confirmSku() {
        this.isShowSkuValue = false
      },

      /** 取消*/
      cancelSku() {
        this.isShowSkuValue = false
      },

      /** 移除当前规格项 同步数据*/
      handleCloseSku(index) {
        this.skuData.splice(index, 1)
        // this.$store.dispatch('updateSkuData', this.skuData)
      }
    }
  }
</script>
<style lang="scss" type="scss" scoped>
  .sku-item-content {
    div {
      margin: 10px;
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

  /** 第一行 */
  .sku-item-first {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
</style>
