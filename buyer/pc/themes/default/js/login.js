$(function () {
	var loginForm = $('.login-form');
	// 快捷登录和普通登录的切换
	$(".login-tab").on('click', 'li', function () {
		var $this = $(this);
		$this.find('a').addClass('active');
		$this.siblings().find('a').removeClass('active')
		$(".login-interface").find(".login-show").hide().eq($this.index()).show();
	});
	
	// input获得焦点
	loginForm.on('focus blur', 'input', function (event) {
		var $this = $(this);
		event.type === 'focusin'
			? $this.closest('.item').addClass('focus')
			: $this.closest('.item').removeClass('focus')
	})
	
	// 获取短信验证码
	loginForm.on('click', '.send-sms-btn', function () {
		var _mobile = 1888888888;
		$.ajax({type: 'POST', url: '/send-sms-code',
			data: {
				mobile: _mobile,
				type: 'login'
			},
			success: function (data) {
				$.message.success('短信发送成功，请注意查收！', {time: 5000})
			}
		})
	})
	// 快速登录
	loginForm.on('click', '#login-by-quick', function () {
		console.log('快速登录')
	})
	
	// 更换验证码
	loginForm.on('click', '.validcode-img', function () {
		console.log('更换验证码')
	})
	
	// 账号登录
	loginForm.on('click', '#login-by-account', function () {
		console.log('账号登录')
	})
});
