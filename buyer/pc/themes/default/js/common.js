// 公共脚本
;!function () {
	/** 将layui的laytpl模块挂载到jquery */
	$.extend({
		laytpl: function (tpl, view) {
			return {
				render: function (data, fn) {
					layui.laytpl($(tpl).html()).render(data, function (html) {
						$(view).html(html)
						$(tpl).remove()
						typeof fn === 'function' && fn(data)
					})
				}
			}
		}
	})
	
	/**
	 * 基础UI扩展
	 */
	$.extend({
		/**
		 * alert
		 * @param message
		 * @param fn
		 */
		alert: function (message, fn) {
			return window.layer.alert(message || '', function (index) {
				typeof (fn) === 'function' && fn(index);
				window.layer.close(index);
			});
		},
		
		/**
		 * confirm
		 * @param message
		 * @param fn
		 */
		confirm: function (message, fn) {
			return window.layer.confirm(message || '确认这个操作吗？', {
				icon: 3,
				title: '提示'
			}, function (index) {
				typeof (fn) === 'function' && fn(index);
				window.layer.close(index);
			});
		},
		
		/**
		 * message
		 */
		message: {
			/**
			 * success
			 * @param message
			 * @param opts
			 * @param fn
			 */
			success: function (message, opts, fn) {
				fn = typeof fn === 'function' ? fn : opts;
				opts = typeof opts === 'object' ? opts : {};
				return window.layer.msg(message || '成功提示', $.extend({
					icon: 1,
					skin: 'layer-skin-custom-msg',
					offset: '10px',
					time: 3000
				}, opts), fn);
			},
			
			/**
			 * error
			 * @param message
			 * @param opts
			 * @param fn
			 */
			error: function (message, opts, fn) {
				fn = typeof fn === 'function' ? fn : opts;
				opts = typeof opts === 'object' ? opts : {};
				return window.layer.msg(message || '错误提示', $.extend({
					icon: 2,
					skin: 'layer-skin-custom-msg',
					offset: '10px',
					time: 3000
				}, opts), fn);
			}
		}
	})
	
	/***
	 * 配置ajax全局拦截
	 * @type {string}
	 */
	window.baseUrl = 'http://www.easy-mock.com/mock/5a0a50c8b31e3216824d5a6e/buyer/'
	var _ajax = $.ajax;
	$.ajax = function (opts) {
		/** 配置基础url */
		if(!/^http(s*)/.test(opts.url)){
			opts.url = opts.url.replace(/(\/*)/, window.baseUrl)
		}
		
		/** 配置默认dataType */
		opts.dataType = opts.dataType || 'json'
		
		/** 配置默认error */
		opts.error = opts.error || function (error) {
			error.responseJSON && $.message.error(error.responseJSON.error_message)
		}
		_ajax(opts)
	}
	
	/**
	 * 监听ajax发起与停止
	 * 用于自动禁用按钮
	 */
	$(document).on('ajaxStart ajaxStop', function (event) {
		var _type = event.type;
		var _activeElement = event.currentTarget.activeElement;
		if(_type === 'ajaxStart') {
			window.__btn_disabled__ && (window.__btn_disabled__.disabled = false)
			_activeElement.disabled = true;
			window.__btn_disabled__ = _activeElement
		}else {
			window.__btn_disabled__.disabled = false
			window.__btn_disabled__ = undefined
		}
	})
	
	/** 将登录状态作为全局变量给window */
	!function () {
		var isLogin = window.localStorage.getItem('isLogin');
		window.isLogin = isLogin === 'true';
	}()
}();