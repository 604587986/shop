<template>
  <div class="floor-layout tpl-1">
    <div class="layout-title" :style="colors.title">
      <h3 class="layout-item bz-tit">
        <floor-mask @click="onClickMask(0)"/>
        全球购
      </h3>
      <div class="bz-tags">
      </div>
    </div>
    <div class="layout-main">
      <div class="lo-bz lo-bz-1">
        <div class="bz-cover">
          <div class="layout-item">
            <floor-mask @click="onClickMask(0)"/>
            <a href="http://java.bizpower.com/web/store/31" target="_blank">
              <img class="bz-cover-img" src="http://uploadjava.bizpower.com/image/12/2c/122c192d95abbf96480e6f2f32f8e4e6.png">
            </a>
          </div>
        </div>
        <div class="bz-mt bz-mt-4">
          <div class="layout-item bz-mt-item">
            <floor-mask @click="onClickMask(0)"/>
            <a href="http://java.bizpower.com/web/goods/415" target="_blank" title="iPhone X">
              <p class="bz-mt-tit" :style="colors.color(0)">iPhone X</p>
              <p class="bz-mt-des">新机抢鲜抢</p>
              <img src="http://uploadjava.bizpower.com/image/ea/d9/ead9e8cd280114a24e0bd4daf0cee5e0.png">
            </a>
          </div>
          <div class="layout-item bz-mt-item">
            <floor-mask @click="onClickMask(0)"/>
            <a href="http://java.bizpower.com/web/search?cat=424" target="_blank" title="VR眼镜">
              <p class="bz-mt-tit" :style="colors.color(0)">VR眼镜</p>
              <p class="bz-mt-des">虚拟现实头戴设备</p>
              <img src="http://uploadjava.bizpower.com/image/a1/f5/a1f5ad90830afbbb258aee1edfbf6790.png">
            </a>
          </div>
          <div class="layout-item bz-mt-item">
            <floor-mask @click="onClickMask(0)"/>
            <a href="http://java.bizpower.com/web/goods/425" target="_blank" title="摄影摄像">
              <p class="bz-mt-tit" :style="colors.color(0)">摄影摄像</p>
              <p class="bz-mt-des">这一刻更清晰</p>
              <img src="http://uploadjava.bizpower.com/image/a4/a0/a4a074a08f32736c230d3af5ec86a943.png">
            </a>
          </div>
          <div class="layout-item bz-mt-item">
            <floor-mask @click="onClickMask(0)"/>
            <a href="http://java.bizpower.com/web/goods/421" target="_blank" title="苹果许愿日">
              <p class="bz-mt-tit" :style="colors.color(0)">苹果许愿日</p>
              <p class="bz-mt-des">直降300元</p>
              <img src="http://uploadjava.bizpower.com/image/60/6d/606d53fd526076ecb0f6b083aaf19746.png">
            </a>
          </div>
        </div>
        <div class="bz-more">
          <div class="layout-item bz-bm-item">
            <floor-mask @click="onClickMask(0)"/>
            <a href="http://java.bizpower.com/web/goods/446" target="_blank">
              <img src="http://uploadjava.bizpower.com/image/5c/4c/5c4c233fd136fa5bc52c882e6da56044.png">
            </a>
          </div>
          <div class="layout-item bz-bm-item">
            <floor-mask @click="onClickMask(0)"/>
            <a href="http://java.bizpower.com/web/goods/430" target="_blank">
              <img src="http://uploadjava.bizpower.com/image/bc/e5/bce5293bbcd18796b7a138284d0ec004.png">
            </a>
          </div>
          <div class="layout-item bz-bm-item">
            <floor-mask @click="onClickMask(0)"/>
            <a href="http://java.bizpower.com/web/goods/387" target="_blank">
              <img src="http://uploadjava.bizpower.com/image/56/11/5611071c0c764db85b27926c9d45ae5a.png">
            </a>
          </div>
        </div>
      </div>
      <div class="lo-bz lo-bz-2">
        <div class="bz-cover">
          <div class="layout-item">
            <floor-mask @click="onClickMask(0)"/>
            <a href="http://java.bizpower.com/web/store/31" target="_blank">
              <img class="bz-cover-img" src="http://uploadjava.bizpower.com/image/a4/f8/a4f879dad1b2f3fdc7dc27d8c2bcb839.png">
            </a>
          </div>
        </div>
        <div class="bz-cover">
          <div class="layout-item">
            <floor-mask @click="onClickMask(0)"/>
            <a href="http://java.bizpower.com/web/store/31" target="_blank">
              <img class="bz-cover-img" src="http://uploadjava.bizpower.com/image/53/5d/535d0bbc001bbf89b25ac3af379cc6d4.png">
            </a>
          </div>
        </div>
        <div class="bz-mt bz-mt-2">
          <div class="layout-item bz-mt-item">
            <floor-mask @click="onClickMask(0)"/>
            <a href="http://java.bizpower.com/web/goods/415" target="_blank" title="iPhone X">
              <p class="bz-mt-tit" :style="colors.color(1)">iPhone X</p>
              <p class="bz-mt-des">新机抢鲜抢</p>
              <img src="http://uploadjava.bizpower.com/image/ea/d9/ead9e8cd280114a24e0bd4daf0cee5e0.png">
            </a>
          </div>
          <div class="layout-item bz-mt-item">
            <floor-mask @click="onClickMask(0)"/>
            <a href="http://java.bizpower.com/web/search?cat=424" target="_blank" title="VR眼镜">
              <p class="bz-mt-tit" :style="colors.color(1)">VR眼镜</p>
              <p class="bz-mt-des">虚拟现实头戴设备</p>
              <img src="http://uploadjava.bizpower.com/image/a1/f5/a1f5ad90830afbbb258aee1edfbf6790.png">
            </a>
          </div>
        </div>
        <div class="bz-more">
          <div class="layout-item bz-bm-item">
            <floor-mask @click="onClickMask(0)"/>
            <a href="http://java.bizpower.com/web/goods/446" target="_blank">
              <img src="http://uploadjava.bizpower.com/image/46/c3/46c3afe65ad404ce1d65da2f72ae2a08.png">
            </a>
          </div>
          <div class="layout-item bz-bm-item">
            <floor-mask @click="onClickMask(0)"/>
            <a href="http://java.bizpower.com/web/goods/430" target="_blank">
              <img src="http://uploadjava.bizpower.com/image/56/c5/56c560033a549382fb9c8a53ae403580.png">
            </a>
          </div>
          <div class="layout-item bz-bm-item">
            <floor-mask @click="onClickMask(0)"/>
            <a href="http://java.bizpower.com/web/goods/387" target="_blank">
              <img src="http://uploadjava.bizpower.com/image/f6/52/f6523baa7aedf628a27abce6e45e9c33.png">
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from '../mixin'

  export default {
    name: 'tpl-3',
    mixins: [mixin],
    title: '模块1',
    dataTpl: {
      tpl_id: 3,
      tpl_type: 'ADV',
      blockList: [
        {
          title: '全球购',
          titleColors: ['#333377', '#488bad'],
          keywords: ['空气净化器', '时尚名包', '蓝牙耳机', '顶尖好货', '音箱', '扫地机器人', '照相机', '名酒'],
          dataList: [...new Array(15)].map(() => {
            return {
              image: '',
              opt_type: 'NONE',
              opt_value: ''
            }
          })
        }
      ]
    },
    computed: {
      // 颜色
      colors() {
        const _colors = this.data.blockList[0].titleColors
        return {
          title: `background-color: ${_colors[0]}; background-image: linear-gradient(90deg, ${_colors.join(',')});`,
          color: (colorIndex = 0) => `color: ${_colors[colorIndex]}`
        }
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .layout-main {
    height: 420px;
  }
  .layout-title {
    .bz-tit .mask-floor {
      width: calc(100% + 20px);
      height: calc(100% + 8px);
      top: -4px;
      left: -10px;
    }
    .bz-tags {
      max-width: 1000px;
      .mask-floor {
        width: 200px;
      }
    }
  }
  .lo-bz {
    float: left;
    width: 580px;
    &.lo-bz-2 {
      width: 579px;
      margin-left: 15px;
      padding-left: 15px;
      border-left: 1px solid #E6E6E6;
    }
  }
</style>
