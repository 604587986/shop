<template>
  <div id="seckill" class="seckill-container">
    <div class="seckill-title">
      <h1>限时抢购</h1>
    </div>
    <div :class="['seckill-timeline', timeline_fixed && 'fixed']">
      <div class="inner-timeline w">
        <ul class="timeline-list">
          <li
            v-for="(timeLine, index) in timeLines"
            :key="index"
            :class="['timeline-item', , timeLine.active && 'active']"
            @click="handleClickTimeLine(index, timeLine)"
          >
            <a href="javascript:;" class="main-timeline-item">
              <div class="timeline-wrap">
                <div class="line-timeline"><i>{{ timeLine.time_text }}:00</i></div>
                <div class="next-timeline"><i>即将开始</i></div>
                <div class="time-timeline">
                  <b class="b-text">{{ index === 0 ? '正在抢购' : '即将开始' }}</b>
                  <b class="b-time">{{ index === 0 ? '距结束' : '距开始' }}<i>{{ timesText[index].hours }}</i>:<i>{{ timesText[index].minutes }}</i>:<i>{{ timesText[index].seconds }}</i></b>
                </div>
              </div>
            </a>
          </li>
          <template v-if="timeLines.length < 5">
            <li
              v-for="i in (5 - timeLines.length)"
              :key="i + '_pla'"
              class="timeline-item"
            >
              <a href="javascript:;" class="main-timeline-item">
                <div class="timeline-wrap">
                  <div class="line-timeline"></div>
                  <div class="next-timeline"></div>
                  <div class="time-timeline">
                    <b class="b-text"></b>
                    <b class="b-time"></b>
                  </div>
                </div>
              </a>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div v-if="timeline_fixed" class="seckill-timeline-place"></div>
    <div class="seckill-goods">
      <ul class="seckill-list w">
        <li v-for="i in 40" :key="i" class="goods-item">
          <a href="javascript:;" class="link-goods-item">
            <img class="goods-img" src="//img11.360buyimg.com/mobilecms/s250x250_jfs/t19564/83/2399750212/215147/d3928910/5af2cd17Nf5c51553.jpg" alt="">
            <h4 class="goods-name">纽曼（Newman） P10 全网通4G 老人智能手机 移动联通电信 双卡双待 军绿色 3G+32G三网通</h4>
          </a>
          <div :class="['info-goods-item', false && 'no-start']">
            <div class="goods-price">
              <span class="price">
                <em>￥</em>19.90
              </span>
              <span class="progress">
                <i class="progress-txt">已售27%</i>
                <i class="progress-inner">
                  <b class="progress-completed" style="width:38%"></b>
                </i>
              </span>
              <span v-if="false" class="tip">限时抢购 抢先提醒</span>
            </div>
            <a href="javascript:;" class="buy-btn" target="_blank">立即抢购</a>
            <!--<a href="javascript:;" class="buy-btn">即将开始</a>-->
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import * as API_Promotions from '@/api/promotions'
  import { Foundation } from '~/ui-utils'
  export default {
    name: 'seckill',
    data() {
      return {
        timeline_fixed: false,
        timeLines: '',
        times: [],
        timesText: [],
        goodsList: []
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.timeLineFixedStatus()
        window.addEventListener('scroll', this.timeLineFixedStatus)
      })
      this.GET_TimeLine()
    },
    methods: {
      /** 时间段盒子是否浮动 */
      timeLineFixedStatus() {
        // 获取滚动条当前位置
        const bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop
        // 是否固定到顶部
        this.timeline_fixed = bodyScrollTop >= 31 + 140 + 90
      },
      /** 时间段被选中 */
      handleClickTimeLine(timeLineIndex, timeLine) {
        const { timeLines } = this
        this.MixinScrollToTop(31 + 140 + 90)
        timeLines.map((item, index) => {
          item.active = index === timeLineIndex
          return item
        })
        this.GET_TimeLineGoods(timeLineIndex, timeLine.time_text)
      },
      /** 开始倒计时 */
      startCountDown() {
        this.interval = setInterval(() => {
          const { times, timesText } = this
          for (let i = 0; i < times.length; i ++) {
            if (!times[i]) continue
            times[i] -= 1
            const timeText = Foundation.countTimeDown(times[i])
            this.$set(this.timesText, i, Foundation.countTimeDown(times[i]))
          }
          this.$set(this, 'times', times)
        }, 1000)
      },
      /** 获取时间线 */
      GET_TimeLine() {
        API_Promotions.getSeckillTimeLine().then(response => {
          if (response && response.length) {
            response = response.sort((x, y) => (Number(x.time_text) > Number(y.time_text)))
            const times = []
            const timesText = []
            response.map((item, index) => {
              item.active = index === 0
              if (index === 0) {
                times.push(Foundation.theNextDayTime())
              } else {
                times.push(item.distance_time)
              }
              timesText.push({ hours: '00', minutes: '00', seconds: '00' })
              return item
            })
            this.times = times
            this.timesText = timesText
            this.timeLines = response
            this.startCountDown()
          }
        })
      },
      /** 获取对应时刻的商品 */
      GET_TimeLineGoods(timeIndex, range_time) {
        const params = {
          page_no: 1,
          page_size: 20,
          range_time
        }
        API_Promotions.getSeckillTimeGoods(params).then(response => {
          console.log(response)
        })
      }
    },
    destroyed() {
      window.removeEventListener('scroll', this.timeLineFixedStatus)
      if (this.interval) clearInterval(this.interval)
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../assets/styles/color";
  .seckill-container {
    background-color: #f6f6f6;
    position: relative;
    overflow: hidden;
  }
  .seckill-title {
    position: absolute;
    top: 0;
    width: 100%;
    height: 300px;
    line-height: 90px;
    background: url("../assets/images/background-seckill-header.png") no-repeat top;
    text-align: center;
    h1 {
      font-size: 60px;
      font-family: cursive;
    }
  }
  .seckill-timeline {
    width: 100%;
    height: 60px;
    margin-top: 90px;
    margin-bottom: 10px;
    &.fixed {
      position: fixed;
      z-index: 99;
      top: 0;
      margin-top: 0;
      .inner-timeline {
        box-shadow: 0 5px 20px -8px #4e4e4e;
      }
      .timeline-list {
        margin-left: 0;
      }
      .timeline-item.active .main-timeline-item {
        width: 274px;
      }
      .main-timeline-item {
        width: 234px;
        margin-left: 0;
        &::before, &::after {
          content: none;
        }
        .timeline-wrap {
          margin: 0;
        }
      }
    }
    .inner-timeline {
      height: 100%;
    }
    .timeline-list {
      width: 1252px;
      margin-left: 60px;
      height: 60px;
      transition: all .3s;
    }
    .timeline-item {
      float: left;
      line-height: 60px;
      text-align: center;
      font-size: 18px;
      &:hover:not(.active) .line-timeline { color: $color-main }
    }
    .timeline-item.active .main-timeline-item {
      width: 354px;
      &::before {
        border-color: transparent transparent $color-main;
      }
      &::after {
        border-color: $color-main transparent transparent;
      }
      .timeline-wrap {
        color: #fff;
        background-color: $color-main;
      }
    }
    @mixin before_after {
      display: block;
      content: "";
      width: 0;
      height: 0;
      border-style: solid;
      position: absolute;
      top: 0;
      zoom: 1;
    }
    .main-timeline-item {
      position: relative;
      display: block;
      overflow: hidden;
      color: #000;
      width: 289px;
      height: 60px;
      margin-left: -60px;
      transition: all .3s;
      outline: none;
      &::before, &::after {
        @include before_after;
      }
      &::before {
        left: 0;
        border-width: 0 0 60px 60px;
        border-color: transparent transparent #fff;
      }
      &::after {
        right: 0;
        border-width: 60px 60px 0 0;
        border-color: #fff transparent transparent;
      }
    }
    .timeline-wrap {
      background: #fff;
      margin: 0 60px;
      height: 60px;
      overflow: hidden;
      text-align: center;
      font-size: 0;
    }
    .line-timeline {
      height: 60px;
      margin-right: 10px;
      overflow: hidden;
      display: inline-block;
      i {
        vertical-align: middle;
        font-weight: 700;
        font-size: 14px;
        margin-left: 10px;
      }
    }
    .next-timeline {
      overflow: hidden;
      display: inline-block;
      i {
        border: 1px solid #666;
        padding: 0 14px;
        vertical-align: middle;
        height: 26px;
        line-height: 25px;
        color: #666;
        -moz-border-radius: 22px;
        border-radius: 22px;
        font-size: 12px;
        display: inline-block;
      }
    }
    .timeline-item.active {
      .line-timeline i { font-size: 20px }
      .next-timeline { display: none }
      .time-timeline {
        display: inline-block;
      }
    }
    .time-timeline {
      font-size: 14px;
      display: none;
      height: 60px;
      overflow: hidden;
      text-align: left;
      .b-text {
        display: block;
        margin-top: 15px;
        line-height: 1;
      }
      .b-time {
        display: block;
        margin-top: 5px;
        line-height: 1;
      }
    }
  }
  .seckill-timeline-place {
    display: block;
    height: 60px;
    margin-top: 100px;
  }
  .seckill-list {
    min-height: 1200px;
  }
  .goods-item {
    float: left;
    margin-bottom: 20px;
    margin-right: 10px;
    height: 390px;
    position: relative;
    background: #fff;
    &:nth-child(4n) {
      margin-right: 0;
    }
    .link-goods-item {
      display: block;
      position: relative;
      width: 235px;
      padding: 20px 30px 0;
      background: #fff;
      text-decoration: none;
      overflow: hidden;
      text-align: center;
      &:hover .goods-img { transform: translateY(-13px) }
      .goods-img {
        width: 100%;
        height: 230px;
        transition: transform .3s;
      }
      .goods-name {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        height: 40px;
        color: #333;
        font-size: 14px;
        margin: 20px 0;
        font-weight: 400;
        text-align: left;
        line-height: 20px;
        overflow: hidden;
      }
    }
    .info-goods-item {
      display: block;
      position: absolute;
      width: 293px;
      height: 60px;
      overflow: hidden;
      text-align: left;
      border: 1px solid $color-main;
      bottom: 0;
      left: 0;
      .goods-price {
        padding: 12px 0 0 11px;
        display: block;
        position: relative;
        line-height: 1;
        .price {
          font-size: 24px;
          font-family: arial;
          margin-right: 2px;
          line-height: 1;
          display: inline-block;
          min-width: 50px;
          em {
            font-size: 12px;
          }
        }
        .progress {
          display: block;
          margin-top: 5px;
          .progress-inner {
            width: 88px;
            height: 8px;
            background: #b8b8b8;
            display: inline-block;
            position: relative;
            overflow: hidden;
            margin-left: 5px;
          }
          .progress-completed {
            background: $color-main;
            width: 0;
            position: absolute;
            left: 0;
            top: 0;
            height: 11px;
          }
        }
        .tip {
          display: block;
          margin-top: 5px;
          width: 150px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #999
        }
      }
      .buy-btn {
        color: #fff;
        line-height: 62px;
        font-size: 16px;
        display: block;
        top: 0;
        right: 0;
        width: 89px;
        text-align: center;
        position: absolute;
        background: $color-main;
      }
      &.no-start {
        border-color: #443630;
        .buy-btn { background: #443630 }
      }
    }
  }
</style>
