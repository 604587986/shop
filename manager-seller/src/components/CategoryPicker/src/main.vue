<template>
  <el-cascader
    :options="options"
    change-on-select
    @change="handleItemChange"
    :clearable="clearable"
    :props="props"
    separator="/"
    size="medium"
  ></el-cascader>
</template>

<script>
  import * as API_goodsCategory from '@/api/goodsCategory'
  export default {
    name: 'EnCategoryPicker',
    props: {
      /** 最大级数 */
      maxLevel: {
        type: Number,
        default: 4
      },
      /** 是否可以清空 */
      clearable: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        options: [],
        datafirst: [],
        props: {
          value: 'shop_cat_id',
          label: 'shop_cat_name',
          children: 'children',
          disabled: 'disabled'
        }
      }
    },
    mounted() {
      this.GET_RegionData()
    },
    methods: {
      GET_RegionData(category_ids = []) {
        /** 此处为商品分组的调用接口 */
        API_goodsCategory.getGoodsCategoryList(this.params).then(response => {
          this.loading = false
          if (!response || !response.data) return
          this.options = response.data
          // 为分组增加等级标识
          this.options.forEach(key => {
            const _level = key.shop_cat_pid === 0 ? 1 : 2
            this.$set(key, 'level', _level)
          })
          // 平行结构数据转换树形结构数据
          this.options = this.transData(this.options)
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      },

      /** 选中项发生改变 */
      handleItemChange(val) {
        this.$emit('changed', val[val.length - 1])
      },

      /** 找出对应的地区 */
      findRegios(category_ids, response) {
        let _data = { children: this.options }
        category_ids.forEach((item, index) => {
          _data.children && _data.children.forEach(_item => {
            if (_item.category_id === category_ids[index]) {
              _data = _item
            }
          })
        })
        // 如果有传入地区数据，说明是在异步加载
        if (response) {
          _data.children = response.map(item => {
            if (category_ids.length + 1 < this.maxLevel && item.hasChildren) {
              item.children = [{
                name: '加载中...',
                disabled: true,
                category_id: -1
              }]
            }
            return item
          })
        }
        return _data
      },

      /** 平行结构转树形结构数据 */
      transData(data) {
        const _datafirst = this.datafirst = data.filter(key => { return key.level === 1 })
        const _dataseconed = data.filter(key => { return key.level === 2 })
        _datafirst.forEach(key => {
          this.$set(key, 'children', [])
          _dataseconed.forEach(item => {
            if (item.shop_cat_pid === key.shop_cat_id) {
              key.children.push(item)
            }
          })
        })
        return _datafirst
      }
    }
  }
</script>
