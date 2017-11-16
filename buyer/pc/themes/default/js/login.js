$(function () {
	var loginForm = $('.login-form'), mobile;
	var from = $.Foundation.getQueryString('from');
	/** 如果有from，也要把from加在立即注册的链接上 */
	var registerBtn = $('#register-btn');
	from && (registerBtn.attr('href', registerBtn.attr('href') + '?from=' + from));
	
	// 快捷登录和普通登录的切换
	$(".login-tab").on('click', 'li', function () {
		var $this = $(this);
		$this.find('a').addClass('active');
		$this.siblings().find('a').removeClass('active')
		$(".login-interface").find(".login-show").hide().eq($this.index()).show();
	});
	
	/** input获得焦点 */
	loginForm.on('focus blur', 'input', function (event) {
		var $this = $(this);
		event.type === 'focusin'
			? $this.closest('.item').addClass('focus')
			: $this.closest('.item').removeClass('focus')
	})
	
	/** 获取短信验证码 */
	loginForm.on('click', '.send-sms-btn', function () {
		var $this = $(this), _mobile = $('#mobile').val();
		if(!$.RegExp.mobile.test(_mobile)) {
			$.message.error('手机号码格式有误！')
			return false
		}
		$.ajax({type: 'POST', url: '/send-sms-code',
			data: {
				mobile: _mobile,
				type: 'mobile'
			},
			success: function (response) {
				mobile = _mobile;
				$.Foundation.countDown($this)
				$.message.success('短信发送成功，请注意查收！', {time: 5000})
			}
		})
	})
	
	/** 快速登录 */
	loginForm.on('click', '#login-by-quick', function () {
		var $this = $(this);
		var _sms_code = $('#sms-code').val()
		if (!$.RegExp.mobile.test(mobile)){
			$.message.error('请先获取手机验证码！')
		} else if (!_sms_code) {
			$.message.error('请输入短信验证码！');
		} else {
			$.ajax({type: 'POST', url: '/login-by-mobile',
				data: {
					mobile: mobile,
					sms_code: _sms_code
				},
				success: function (response) {
					loginSuccess(response.data)
				}
			})
		}
	})
	
	// 更换验证码
	loginForm.on('click', '.validcode-img', function () {
		console.log('更换验证码')
	})
	
	// 账号登录
	loginForm.on('click', '#login-by-account', function () {
		var $this = $(this);
		var _username = $('#username').val(),
				_password = $('#password').val(),
				_validcode = $('#validcode').val();
		if (!_username) {
			$.message.error('请输入邮箱/用户名/已验证手机！')
		} else if (!_password) {
			$.message.error('请输入密码！')
		} else if (!_validcode) {
			$.message.error('请输入图片验证码！')
		} else {
			$.ajax({type: 'POST', url: '/login',
				data: {
					username: _username,
					password: _password,
					validcode: _validcode
				},
				success: function (response) {
					loginSuccess(response.data)
				}
			})
		}
	})
	
	/**
	 * 登录成功
	 * @param user
	 */
	function loginSuccess(user) {
		window.localStorage.setItem('userInfo', JSON.stringify(user));
		window.localStorage.setItem('isLogin', true)
		window.location.href = from || '/index.html'
	}
});
