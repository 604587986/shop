$(function () {
    var goodsList = $('.goods-list'),
    brandList = $('.brand-list'),
    otherFilter = $('.other-filter');
    //  商品列表鼠标悬浮
    goodsList.on('mouseenter mouseleave', '.item-product', function (event) {
        var $this = $(this),
            mouseenter = event.type === 'mouseenter';

        mouseenter ? (function () {
            $this.addClass('hover');
        })() : (function () {
            $this.removeClass('hover');
        })()
    });
    //  筛选结果展开
    goodsList.on('click', '.control a', function () {
        var $this = $(this),
            isOpen = $this.is('.open');
        $this.css('display', 'none').siblings().css('display', 'inline-block');
        isOpen ? otherFilter.addClass('show') : otherFilter.removeClass('show')
    });

    //  导航鼠标悬浮
    goodsList.on('mouseenter mouseleave', '.gl-bar-trigger', function (event) {
        var $this = $(this),
            mouseenter = event.type === 'mouseenter';
        mouseenter ? (function () {
            $this.addClass('trig-act').next('.gl-bar-cont').addClass('show');
        })() : (function () {
            $this.removeClass('trig-act').next('.gl-bar-cont').removeClass('show');
        })();
    });
    goodsList.on('mouseenter mouseleave', '.gl-bar-cont', function (event) {
        var $this = $(this), mouseenter = event.type === 'mouseenter';
        mouseenter ? (function () {
            $this.addClass('show').prev('.gl-bar-trigger').addClass('trig-act');
        })() : (function () {
            $this.removeClass('show').prev('.gl-bar-trigger').removeClass('trig-act');
        })();
    });

    //  更多【展开】
    goodsList.on('click', '.choice', function () {
        var $this = $(this),
            isMore = $this.is('.choice-on'),
            isBrand = $this.is('.brand-choice');
        isMore ? ($this.removeClass('choice-on') && $this.html('更多')) : ($this.addClass('choice-on') && $this.html('收起'));
        isBrand && (isMore ? brandList.removeClass('show-more') : brandList.addClass('show-more'));
    });
})