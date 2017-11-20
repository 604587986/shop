$(function () {
    // 鼠标点击左侧默认排序出现背景白色
    $('.default').on('click', 'li', function () {
        var $this = $(this);
        $this.addClass('active').siblings().removeClass('active');
    });
    // 鼠标移出左侧li里， 字体变红色
    $('.list-text').on('mouseenter mouseleave', 'a', function (event) {
        var $this = $(this),
            mouseenter = event.type === 'mouseenter';
        mouseenter ? (function () {
            $this.addClass('a-color');
        })() : (function () {
            $this.removeClass('a-color');
        })()
    });
    // 鼠标移入左侧店铺类型处，让其显示和隐藏
    $('.shop-type').on('mouseenter mouseleave', '.shop-type-con', function (event) {
        var $this = $(this),
            mouseenter = event.type === 'mouseenter';
        mouseenter ? (function () {
            $this.addClass('active');
            $this.next('.shop-type-none').css('display','block');
            $this.find('i').removeClass('ea-icon-arrow-down').addClass('ea-icon-arrow-up');
          
        })() : (function () {
            $this.removeClass('active');
            $this.next('.shop-type-none').css('display','none');
            $this.find('i').removeClass('ea-icon-arrow-up').addClass('ea-icon-arrow-down');
        })()
    });
    $('.shop-type').on('mouseenter mouseleave', '.shop-type-none', function (event) {
        var $this = $(this),
            mouseenter = event.type === 'mouseenter';
        mouseenter ? (function () {
            $this.prev('.shop-type-con').addClass('active');
            $this.css('display','block');
        })() : (function () {
            $this.prev('.shop-type-con').removeClass('active');
            $this.css('display','none');
        })()
    });
    // 鼠标移入右侧li，显示灰色背景。
    $('.shop-right').on('mouseenter mouseleave', 'li', function (event) {
        var $this = $(this),
            mouseenter = event.type === 'mouseenter';
        mouseenter ? (function () {
            $this.addClass('hover');
        })() : (function () {
            $this.removeClass('hover');
        })()
    });
    // 鼠标移出右侧li里， 字体变红色
    $('.treasurer-text').on('mouseenter mouseleave', 'a', function (event) {
        var $this = $(this),
            mouseenter = event.type === 'mouseenter';
        mouseenter ? (function () {
            $this.addClass('a-color');
        })() : (function () {
            $this.removeClass('a-color');
        })()
    });
})