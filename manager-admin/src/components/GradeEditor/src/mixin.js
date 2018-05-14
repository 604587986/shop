/**
 * Created by andste.cc@gmail.com on 2018/5/13.
 * mixin
 */

import axios from 'axios'
export default {
  data() {
    return {
      data: [],
      /** 当前层级 */
      curLevel: 0,
      /** 当前操作的层级 */
      curItem: '',
      /** 最后一级的数据 */
      lastItem: '',
      /** 需要删除的自定义的参数数组，用于返回数据时删除 */
      needDeleteParams: ['$id', '$text', '$active', '$hidden'],
      /** 各个搜索框关键字 */
      searchKeywords: [],
      /** 当前的搜索关键字，用来节流 */
      curSearchKeyword: ''
    }
  },
  props: {
    /**
     * 获取数据API
     * 用@id占位
     */
    api: {
      type: String,
      default: 'http://localhost:9090/javashop/shop/admin/region/list-children.do?parentid=@id'
    },
    /**
     * 主要参数的参数名
     * id: 作为主键
     * text: 要显示的文本
     */
    paramsNames: {
      type: Object,
      default: () => ({
        id: 'id',
        text: 'text'
      })
    },
    /**
     * 最多展示级数
     * 默认展示到3级
     */
    maxLevel: {
      type: Number,
      default: 3
    },
    /**
     * 展示传入的btns
     * 默认展示，即表示可编辑
     */
    showBtns: {
      type: Boolean,
      default: true
    },
    /**
     * 传入的btns
     */
    btns: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    /**
     * 计算列宽度
     * @returns {{width : string}}
     */
    columnWdith() {
      return {
        width: 100 / this.maxLevel + '%'
      }
    },
    /**
     * 占位的层级
     * @returns {*}
     */
    placeLevel() {
      const dataLen = this.data.length
      const { maxLevel } = this
      if (dataLen === 0) return 0
      if (dataLen < maxLevel) return dataLen
      if (dataLen === maxLevel) return null
    }
  },
  mounted() {
    this.GET_ChildrenById(0)
  },
  methods: {
    /**
     * 获取数据
     * 拿到数据后交给数据处理方法处理
     * @param id
     * @constructor
     */
    GET_ChildrenById(id) {
      axios({
        url: this.api.replace(/@id/, id),
        method: 'get'
      }).then(response => {
        const { data } = response
        // 如果有返回数据，且不为数组，抛出错误。
        if (data && !Array.isArray(data)) {
          throw Error('The response is not an array!')
        }
        // 如果有返回数据，或是数组没有第一个值
        // 说明后面没有数据了，这个时候可以直接完成
        if (!data || !data[0]) {
          this.data.splice(this.curLevel, this.maxLevel - this.curLevel)
          this.handleRturnItem()
          return
        }
        const names = this.paramsNames
        // 参数名映射
        data.map(item => {
          item.$id = item[names.id]
          item.$text = item[names.text]
          return item
        })
        this.dataProcessing(response.data)
      })
    },
    /**
     * 数据处理
     */
    dataProcessing(res) {
      const { maxLevel, curLevel, data } = this
      res[0].$active = true
      this.lastItem = res[0]
      res.map(item => {
        item.$level = curLevel
        return item
      })
      data.splice(curLevel, data.length - curLevel, res)
      this.curLevel += 1
      if (this.curLevel < maxLevel) {
        this.GET_ChildrenById(res[0]['$id'])
      } else {
        this.handleRturnItem()
      }
    },
    /**
     * 点击item触发事件
     * @param item
     * @param itemIndex
     * @param columnIndex
     */
    handleClickItem(item, itemIndex, columnIndex) {
      if (item.$active) return
      this.curLevel = columnIndex + 1
      this.$set(this.data, columnIndex, this.data[columnIndex].map(_item => {
        _item.$active = _item === item
        return _item
      }))
      this.lastItem = item
      if (columnIndex < this.maxLevel - 1) {
        this.GET_ChildrenById(item.$id)
      } else {
        this.handleRturnItem()
      }
    },
    /**
     * 点击自定义btn触发事件
     * 将item作为参数回调回去
     * @param item
     * @param btn
     * @param btnIndex
     * @param columnIndex
     */
    handleClickItemBtn(item, btn, btnIndex, columnIndex) {
      const { onClick } = this.btns[btnIndex]
      this.curItem = item
      item = JSON.parse(JSON.stringify(item))
      const parentArray = JSON.parse(JSON.stringify(this.data[columnIndex - 1] || ''))
      const parent = parentArray && JSON.parse(JSON.stringify(parentArray.filter(_item => _item.$active)[0] || ''))
      this.needDeleteParams.forEach(key => {
        delete item[key]
        delete parent[key]
      })
      typeof onClick === 'function' && onClick(item, parent, parentArray)
    },
    /**
     * 触发change事件
     * 最后一级的数据作为参数传递回去
     * 在这之前，删除组件内部自定义的参数
     */
    handleRturnItem() {
      const object = JSON.parse(JSON.stringify(this.lastItem))
      this.needDeleteParams.forEach(key => delete object[key])
      this.$emit('change', object)
    },
    /**
     * 重新获取当前层级数据
     * type为edit，只刷新当前层次
     * type为delete，删除当前层次以及后面的层次
     * @param type 刷新类型【edit, add, delete】
     * @param item
     */
    refresh(type, item) {
      let { data, curItem, paramsNames } = this
      const { $level } = curItem
      // 拿到操作的数据数组的引用
      const levelArray = data[$level]
      // 拿到操作的数据的索引
      const index = levelArray.findIndex(_item => _item.$active)
      if (type === 'edit' && item) {
        const _item = JSON.parse(JSON.stringify(item))
        Object.keys(_item).forEach(key => {
          if (_item[key] === undefined || _item[key] === undefined) delete _item[key]
        })
        item[paramsNames.id] && (_item.$id = item[paramsNames.id])
        item[paramsNames.text] && (_item.$text = item[paramsNames.text])
        const obj = {
          ...curItem,
          ..._item
        }
        this.$set(data[$level], index, obj)
        return
      }
      if (type === 'delete') {
        // 从当前层级数组中删除
        levelArray.splice(index, 1)
        // 从所有数据中删除当前层级数组后面的数组
        data.splice($level + 1, data.length - $level)
        // 设置后一个数据的active为true
        // index不用+1，因为前面删掉了一个
        levelArray[index].$active = true
        // 设置当前层级为操作的层级+1
        this.curLevel = $level + 1
        // 请求数据
        this.GET_ChildrenById(levelArray[index]['$id'])
        return
      }
      let id = 0
      if (data[$level - 1]) {
        id = data[$level - 1].filter(item => item.$active).$id
      }
      this.curLevel = $level + 1
      this.GET_ChildrenById(id)
    },
    /**
     * 搜索关键字发生改变
     * 将与关键字不匹配的$hidden设为true
     * @param columnIndex
     */
    handleSearchKeywordChange(columnIndex) {
      const keyword = this.searchKeywords[columnIndex]
      if (keyword === this.curSearchKeyword) return
      this.curSearchKeyword = keyword
      this.$set(this.data, columnIndex, this.data[columnIndex].map(item => {
        item.$hidden = keyword && item.$text.indexOf(keyword) === -1
        return item
      }))
    },
    /**
     * 点击添加按钮
     * 返回三个参数
     * columnIndex 当前的层级
     * parent 上一级
     * parentArray 上一级的全部数据
     * @param columnIndex
     */
    handleClickAdd(columnIndex) {
      const { data, needDeleteParams } = this
      const parentArray = JSON.parse(JSON.stringify(data[columnIndex - 1] || data[columnIndex]))
      const parent = parentArray.filter(item => item.$active)[0]
      parentArray.map(item => {
        needDeleteParams.forEach(key => delete item[key])
        return item
      })
      this.$emit('add-click', columnIndex, parent, parentArray)
    }
  }
}
