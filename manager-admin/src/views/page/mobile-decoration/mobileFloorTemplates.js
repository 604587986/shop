/**
 * Created by andste.cc@gmail.com on 2018/5/17.
 */

const mixin = {
  props: ['data'],
  data() {
    console.log(this.data)
    return {
      aa: 'bb'
    }
  },
  methods: {}
}

export default {
  // 单列单张大图模块
  23: {
    mixins: [mixin],
    template: `<div class="floor-layout">
                  <div>23</div>
                  <div v-if="data.isEdit" class="mask-floor"><button type="button" class="mask-btn-floor"><svg-icon icon-class="pen-leather"/>编辑</button></div>
               </div>`
  },
  // 左一右二图片模块
  24: {
    mixins: [mixin],
    template: `<div class="floor-layout">24</div>`
  },
  // 左二右一图片模块
  25: {
    mixins: [mixin],
    template: `<div class="floor-layout">25</div>`
  },
  // 三列单行图片模块
  26: {
    mixins: [mixin],
    template: `<div class="floor-layout">26</div>`
  },
  // 五列单行小图模块
  27: {
    mixins: [mixin],
    template: `<div class="floor-layout">27</div>`
  },
  // 焦点广告图模块
  28: {
    mixins: [mixin],
    template: `<div class="floor-layout">28</div>`
  },
  // 四列单行图片模块
  29: {
    mixins: [mixin],
    template: `<div class="floor-layout">29</div>`
  },
  // 标题或间隔性模块
  30: {
    mixins: [mixin],
    template: `<div class="floor-layout">30</div>`
  },
  // 四列单行小图模块
  31: {
    mixins: [mixin],
    template: `<div class="floor-layout">31</div>`
  },
  // 左一右二竖排模板
  32: {
    mixins: [mixin],
    template: `<div class="floor-layout">32</div>`
  },
  // 手动选择商品模块
  37: {
    mixins: [mixin],
    template: `<div class="floor-layout">37</div>`
  },
  // 文本模块
  42: {
    mixins: [mixin],
    template: `<div class="floor-layout">42</div>`
  }
}
