(function(){
	$(function(){
		/*根据登陆页存入的localStorage.checkNext判断是重置修改密码的验证，还是注册时*/
		if(localStorage.checkNext == 'reged.html'){
			var url = config.Rurl + "api/v1/account/register/";
		}else{
			$('.head').text('忘记密码');
			var url = config.Rurl + "api/v1/account/reset/";
			$('.polcode .pol').html('');
		}

		if(!!localStorage.temPhone){
			$('.ph-num').val(localStorage.temPhone);
			localStorage.removeItem('temPhone');
		}

		if(!!localStorage.checkNum){
			$('.check-nmu').val(localStorage.checkNum);
			localStorage.removeItem('checkNum');
		}
		//判断是否请求过手机验证码
		var getCodeEnd = false;

		$('.code').on('tap',function(){
			//防止多次触发
			var setCode = $(this);
			if(setCode.data('taped')=="true") return false;

			//手机格式验证
			if(!!$('.ph-num').val()){
				if(!validator.mobile($('.ph-num').val())){
					promptTips("请输入正确的手机号码");
					return false;
				}
			}else{
				promptTips("请输入您的手机号");
				return false;
			}
			setCode.data('taped',true);
			$.ajax({
				type: 'GET',
				url:  url + 'getCaptcha/' + $('.ph-num').val()+'?random='+Math.round(Math.random()*1000000),
				dataType: 'json',
				timeout: '15000',
				beforeSend: function(){
					//showLoading();
				},
				success: function(data){
					//数据返回结果处理
					if(data.code == 1){
						var second = 60;
						$('.textcenter').addClass('graybg');
						$('.code').html('获取验证码('+second+')');
						var timer = setInterval(function(){
							if((second--)>0){
								$('.code').html('获取验证码('+second+')');
							}else{
								clearInterval(timer);
								$('.textcenter').removeClass('graybg').html("重发验证码");
								//解除绑定
								setCode.data('taped',false);
							}
						},1000);
						localStorage.phone = $('.ph-num').val();
						promptTips('已向'+$('.ph-num').val().replace(/(\d{3})\d{8}/, '$1********')+'发送验证码短信');
						//增加获取验证码后手机修改提示标识
						getCodeEnd = true;
						$('.ph-num').data('getCode',true);
					}else{
						promptTips(data.message);
						$('.textcenter').removeClass('graybg').html("重发验证码");
						setCode.data('taped',false);
						return false;
					}
				},
				error: function(xhr, type){
					//数据返回结果处理
					setCode.data('taped',false);
					if(localStorage.getItem("ajaxError")){
						promptTips("请求超时，请刷新页面！");
					}else{
						localStorage.setItem("ajaxError",true);
						location.reload(true);
					}
				},
				complete:function(){
					//closeLoading();
				}
			});

		});


		$('.btnsubmit').tap(function(e){
			//手机格式验证
			if(!!$('.ph-num').val()){
				if(!validator.mobile($('.ph-num').val())){
					promptTips("请输入正确的手机号码");
					return false;
				}else if((localStorage.phone != $('.ph-num').val()) && !!getCodeEnd){
					promptTips("当前手机号与获取验证码手机号不一致");
					return false;
				}
			}else{
				promptTips("请输入您的手机号");
				return false;
			}
			if(!!$('.check-nmu').val()){
				if(!validator.verificationCode($('.check-nmu').val())){
					promptTips("请输入正确的手机验证码");
					return false;
				}
			}else{
				promptTips("请输入手机验证码");
				return false;
			}
			if((localStorage.checkNext == 'reged.html') && ($('.policon').html() != 'q')){
				promptTips("请认证阅读使用条款和隐私政策并勾选");
				return false;
			}
			$.ajax({
				type: 'GET',
				url: url + "validateCaptcha/" + $('.ph-num').val(),
				dataType: 'json',
				data: { 'phone': $('.ph-num').val(),'captcha' : $('.check-nmu').val()},
				success: function(data){
					//数据请求正确
					if(data.code === 1){
						localStorage.token = data.results.token;
						localStorage.removeItem('temPhone');
						localStorage.removeItem('checkNum');
						location.replace(localStorage.checkNext);
						return true;
					}
					promptTips(data.message);
					return false;
				},
				error: function(xhr, type){
					promptTips('请求提交失败，请重试');
				}
			});
		});

		$('.policon').on('tap',function(){
			var $this = $(this);
			if($this.html() == 'q'){
				ikangalert(false,'提醒','亲 真心要放弃注册吗？好遗憾！',function(){
					$this.html('L');
				});
			}else{
				$this.html('q');
			}
		});
		$('.poltext').on('tap',function(){
			if(!!$('.ph-num').val()){
				localStorage.temPhone = $('.ph-num').val();
			}
			if(!!$('.check-nmu').val()){
				localStorage.checkNum = $('.check-nmu').val();
			}
			//localStorage.prevUrl +=',reg.html';
			location.href="userProtocol.html";
		});


	})
})()