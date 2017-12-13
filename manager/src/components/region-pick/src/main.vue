<template>
  <el-cascader
    :options="options"
    @active-item-change="handleItemChange"
    @change="handleValueChange"
    :props="props"
    separator="-"
    size="medium"
  ></el-cascader>
</template>

<script>
  export default {
    name: 'EnRegionPick',
    data() {
      return {
        options: [],
        props: {
          value: 'region_id',
          label: 'local_name',
          children: 'children',
          disabled: 'disabled'
        }
      }
    },
    props: {
      /** 默认地区的key */
      region_names: {
        type: Array,
        default: () => ['province', 'city', 'region', 'town']
      },
      /** 最大级数 */
      maxLevel: {
        type: Number,
        default: 4
      }
    },
    mounted() {
      this.GET_RegionData()
    },
    methods: {
      GET_RegionData(region_ids = []) {
        const _region_id = region_ids[region_ids.length - 1] || 0
        this.$jsonp(`http://v64.javamall.com.cn/api/base/region/get-children.do?regionid=${_region_id}`)
          .then(response => {
            if (!response || !response[0]) return
            if (response[0].region_grade !== 1) {
              this.findRegios(region_ids, response)
              return
            }
            this.options = response.map(item => {
              if (item.childnum > 0) {
                item.children = [{
                  local_name: '加载中...',
                  disabled: true,
                  region_id: -1
                }]
              }
              return item
            })
          })
      },
      /** 选中项发生改变 */
      handleItemChange(val) {
        this.GET_RegionData(val)
      },
      /** 绑定值发生改变 */
      handleValueChange(val) {
        const selected = this.findRegios(val)
        let _data = {}

        this.region_names.forEach((name, index) => {
          _data[`${name}`] = selected[index] || {}
        })
        this.$emit('changed', _data)
      },
      /** 找出对应的地区 */
      findRegios(region_ids, response) {
        let _data = { children: this.options }
        const _datas = []
        region_ids.forEach((item, index) => {
          _data.children && _data.children.forEach(_item => {
            if (_item.region_id === region_ids[index]) {
              _data = _item
              _datas.push(_item)
            }
          })
        })
        // 如果有传入地区数据，说明是在异步加载
        if (response) {
          _data.children = response.map(item => {
            if (region_ids.length + 1 < this.maxLevel && item.childnum > 0) {
              item.children = [{
                local_name: '加载中...',
                disabled: true,
                region_id: -1
              }]
            }
            return item
          })
        }
        return _datas
      }
    }
  }
</script>
