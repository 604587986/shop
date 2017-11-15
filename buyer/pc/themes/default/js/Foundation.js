/** 增加一些基本方法 */
;!function () {
	var _Foundation_ = {
		/**
		 * 处理unix时间戳，转换为可阅读时间格式
		 * @param unix
		 * @param format
		 * @returns {*|string}
		 */
		unixToDate: function (unix, format) {
			let _format = format || 'yyyy-MM-dd hh:mm:ss'
			let d = new Date(unix * 1000)
			let o = {
				'M+': d.getMonth() + 1,
				'd+': d.getDate(),
				'h+': d.getHours(),
				'm+': d.getMinutes(),
				's+': d.getSeconds(),
				'q+': Math.floor((d.getMonth() + 3) / 3),
				S: d.getMilliseconds()
			}
			if (/(y+)/.test(_format)) _format = _format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
			for (let k in o) if (new RegExp('(' + k + ')').test(_format)) _format = _format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
			return _format
		},
		
		/**
		 * 把date转为秒为单位的unix时间戳
		 * @param date YYY-MM-DD
		 */
		dateToUnix: function (date) {
			let newStr = date.replace(/:/g, '-')
			newStr = newStr.replace(/ /g, '-')
			let arr = newStr.split('-')
			let datum = new Date(Date.UTC(
				arr[0],
				arr[1] - 1,
				arr[2],
				arr[3] - 8 || -8,
				arr[4] || 0,
				arr[5] || 0
			))
			return datum.getTime() / 1000
		},
		
		/**
		 * 货币格式化
		 * @param price
		 * @returns {XML|string|*|void}
		 */
		formatPrice: function (price) {
			return String(Number(price).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		},
		
		/**
		 * 手机号隐私保护
		 * @param mobile
		 * @returns {*}
		 */
		secrecyMobile: function (mobile) {
			if (!/^0?(13[0-9]|15[0-9]|18[0-9]|14[0-9]|17[0-9])[0-9]{8}$/.test(mobile)) {
				return mobile
			}
			return mobile.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')
		},
		
		/***
		 * 倒计时模块
		 * @param ele
		 * @param opts
		 */
		countDown: function (ele, opts) {
			ele = ele.style ? ele : ele[0];
			opts = opts || {};
			var count = opts.count || 10,
				beforeStr = opts.beforeStr || '已发送',
				afterStr = opts.afterStr || '秒',
				complete = opts.complete || '重新发送';
			
			var tagName = ele.tagName;
			
			var timer = setInterval(function () {
				if (count === 1) {
					clearTimeout(timer);
					ele.disabled = false;
					ele.style.cursor = 'pointer';
					tagName === 'BUTTON'
						? ele.innerHTML = complete
						: ele.value = complete
				} else {
					count -= 1;
					ele.disabled = true;
					var _str = beforeStr + count + afterStr
					tagName === 'BUTTON'
						? ele.innerHTML = _str
						: ele.value = _str
					ele.style.cursor = 'not-allowed';
				}
			}, 1000)
		},
		
		/**
		 * 获取URL中的传参
		 * @param str
		 * @returns {string}
		 */
		getQueryString: function (str) {
			var reg = new RegExp("(^|&)" + str + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r !== null) context = r[2];
			reg = null;
			r = null;
			return context === null || context === '' || context === 'undefined' ? '' : window.decodeURI(context);
		}
	}
	jQuery.extend({ Foundation: _Foundation_ })
}();
