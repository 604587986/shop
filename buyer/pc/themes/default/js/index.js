/**
 * 首页脚本
 * 焦点图
 * 分类菜单
 * 楼层
 */
$(function () {
	/** 给分类菜单添加总是展开的class */
	var category = $('#category');
	category.find('.category-layer').addClass('open always')
	
	/** 焦点图模板 */
	var focusImages = [
		{link: '/member/member.html', title: '跨境电商首选：javashop', image: 'http://javashop-statics.oss-cn-beijing.aliyuncs.com/demo/BEC6DE293CEB40769B43984B0C094906.jpg'},
		{link: 'http://v64.javamall.com.cn/', title: '上古神电，javashop', image: 'http://javashop-statics.oss-cn-beijing.aliyuncs.com/demo/068EFE2D3E294D55990FA58B1F66A340.jpg'}
	]
	$.laytpl($('#focus-images-tpl'), $('#focus-images-view')).render(focusImages)
	
	var __current__;
	/** 焦点图滚动插件 */
	var focusSwiper = new Swiper('.focus-swiper-container', {
		autoplay : 3000,
		speed: 800,
		effect: 'fade',
		paginationType: 'custom',
		pagination: '.focus-swiper-pagination',
		paginationCustomRender: function(swiper, current, total) {
			var _btns = '';
			if(current === __current__) return;
			__current__ = current;
			for (var i = 0; i < total; i++) {
				i === total - 1
					? (_btns +=
					'<i class="custom-pagination-btn __last__' + (current === i + 1 ? ' __active__' : '') + '"></i>')
					: (_btns += '<i class="custom-pagination-btn' + (current === i + 1 ? ' __active__' : '') + '"></i>');
			}
			//  修正pagination偏移量
			return (
				'<div class="custom-pagination-inner" style="margin-left: -' + (total * 22 + 6) / 2 + 'px">' + _btns + '</div>'
			);
		},
		autoplayDisableOnInteraction: false
	})
	/** 手动选择焦点图 */
	$('.focus-swiper-container').on('mouseenter', '.custom-pagination-btn', function() {
		focusSwiper.slideTo($(this).index(), 500, false);
	});
	
})