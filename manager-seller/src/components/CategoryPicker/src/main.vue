<template>
  <el-cascader
    :options="options"
    change-on-select
    v-model="defaultArr"
    @change="handleItemChange"
    :clearable="clearable"
    :props="props"
    separator="/"
  ></el-cascader>
</template>

<script>
  import request from '@/utils/request'
  export default {
    name: 'EnCategoryPicker',
    props: {
      /** api */
      api: {
        type: String,
        default: 'seller/shops/cats'
      },
      /** 最大级数 */
      maxLevel: {
        type: Number,
        default: 4
      },
      /** 是否可以清空 */
      clearable: {
        type: Boolean,
        default: false
      },

      /** 默认值 */
      defaultVal: {
        type: Number,
        default: -1
      },

      /** 映射属性 */
      props: {
        type: Object,
        default: () => {
          return {
            value: 'shop_cat_id',
            label: 'shop_cat_name',
            children: 'children',
            disabled: 'disabled'
          }
        }
      }
    },
    data() {
      return {
        options: [],
        datafirst: [],
        /** 默认值映射的 数组 */
        defaultArr: []
      }
    },
    watch: {
      defaultVal: function() {
        if (this.defaultVal !== -1) {
          this.findItem()
        }
      }
    },
    mounted() {
      this.GET_RegionData()
    },
    methods: {
      GET_RegionData() {
        request({
          url: this.api,
          method: 'get',
          loading: false
        }).then(response => {
          if (!response || !response[0]) return
          this.options = this.deleteEmptyChild(response)
          if (this.defaultVal !== -1) {
            this.findItem()
          }
        })
      },

      /** 选中项发生改变 */
      handleItemChange(val) {
        this.$emit('changed', val)
      },

      /** 如果chilren的length 为 0 则删除此项 */
      deleteEmptyChild(arr = []) {
        arr.forEach(key => {
          if (key.children && !key.children.length) {
            delete key.children
          } else if (key.children && key.children.length) {
            this.deleteEmptyChild(key.children)
          } else {
            return
          }
        })
        return arr
      },

      /** 存在默认值时 找出对应的选项 */
      findItem() {
        if (!this.options || this.options.length === 0) return
        this.defaultArr = []
        this.options.forEach(key => {
          if (key.shop_cat_id === this.defaultVal) {
            this.defaultArr.push(key.shop_cat_id)
            return
          }
          key.children && key.children.forEach(_item => {
            if (_item.shop_cat_id === this.defaultVal) {
              this.defaultArr.push(key.shop_cat_id)
              this.defaultArr.push(_item.shop_cat_id)
              return
            }
          })
        })
      }
    }
  }
</script>
