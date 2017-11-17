$(function () {
	/** 渲染个人概览 */
	var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
	$.laytpl($('#overview-member-tpl'), $('#overview-member-view')).render(userInfo);
})