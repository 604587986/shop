/** 增加浏览器识别 */
;!function () {
	var _sys_ = {};
	var ua = navigator.userAgent.toLowerCase();
	var s;
	(s = ua.match(/msie ([\d.]+)/)) ? _sys_.ie = s[1]
		: (s = ua.match(/firefox\/([\d.]+)/)) ? _sys_.firefox = s[1]
		: (s = ua.match(/chrome\/([\d.]+)/)) ? _sys_.chrome = s[1]
			: (s = ua.match(/opera.([\d.]+)/)) ? _sys_.opera = s[1]
				: (s = ua.match(/version\/([\d.]+).*safari/)) ? _sys_.safari = s[1] : 0;
	if (Object.hasOwnProperty.call(window, "ActiveXObject") && !window.ActiveXObject) {
		_sys_.ie = 11.0
	};
	jQuery.extend({ Browser: _sys_ })
}();