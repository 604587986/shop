$(function () {
  var mobileContent = $('.mobile-content'),
      userInfoContent = $('.user-info-content'),
		  regSuccessContent = $('.reg-success-content');
  
  var mobile, sms_code;
  
  /** 发送短信验证码 */
  mobileContent.on('click', '.send-sms-btn', function () {
  	var $this = $(this);
    var _mobile = $('#mobile').val();
    if(!$.RegExp.mobile.test(_mobile)) {
    	$.message.error('手机号码格式有误！')
		}else {
    	$.ajax({type: 'post', url: '/send-sms-code',
				data: {
    			type: 'register',
					mobile: _mobile
    		},
				success: function (data) {
					mobile = _mobile;
    			$.message.success('短信发送成功，请注意查收！');
					$.Foundation.countDown($this);
				}
    	})
		}
	})
	
	/** 下一步【手机验证码】 */
	mobileContent.on('click', '.next-button', function () {
		var $this = $(this);
		var _sms_code = $('#sms-code').val();
		if(_sms_code.length !== 6) {
			$.message.error('短信验证码格式有误！')
		}else {
			$.ajax({type: 'post', url: '/verify-sms-code',
				data: {
					type: 'register',
					sms_code: _sms_code
				},
				success: function (response) {
					sms_code = _sms_code;
					mobileContent.hide();
					userInfoContent.show().find('.mobile-username').html(mobile);
					$('.steps').find('li').eq(1).addClass('active').siblings().removeClass('active');
				}
			})
		}
	})
	
	/** 跳转到邮箱注册 */
	mobileContent.on('click', '.email-button', function () {
		window.location.href = '/login/email-register.html'
	})
	
	/** 提交注册 */
	userInfoContent.on('click', '.submit-button', function () {
		var $this = $(this);
		var _password = $('#password').val(),
			  _repassword = $('#repassword').val(),
			  _username = $('#username').val();
		
		if(!$.RegExp.password.test(_password)){
			$.message.error('密码长度为6-20位，不包含特殊字符！');
		} else if (_password !== _repassword) {
			$.message.error('两次输入密码不一致！');
		} else if (_username.length < 1 || _username.length > 20) {
			$.message.error('账户名长度为2-20位，不包含特殊字符！')
		} else {
			$.ajax({type: 'post', url: '/register-by-mobile',
				data: {
					mobile: mobile,
					password: _password,
					username: _username
				},
				success: function (response) {
					window.localStorage.setItem('isLogin', true);
					window.localStorage.setItem('userInfo', JSON.stringify(response.data));
					$('.steps').find('li').eq(2).addClass('active').siblings().removeClass('active');
					userInfoContent.hide();
					regSuccessContent.show().find('.user-name').html(response.data.username);
					regSuccessContent.find('.user-mobile').html(response.data.mobile + '（用户接收短信验证码）');
					window.refreshShortcut();
				}
			})
		}
	})
})