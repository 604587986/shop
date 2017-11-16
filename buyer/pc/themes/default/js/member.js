$(function () {
	/** 渲染个人概览 */
	var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
	userInfo.mobile = $.Foundation.secrecyMobile(userInfo.mobile)
	$.laytpl($('#overview-member-tpl'), $('#overview-member-view')).render(userInfo);
})