(function(){

	var rUrl = config.Rurl + 'api/v1/account/register/checkUsername/'
	$('#userName').blur(function(){
		if(!!!$(this).val()){return false;}
		var url = rUrl + $(this).val();
		$.ajax({
			type:'GET',
			url: url,
			dataType: 'json',
			data: {'token':localStorage.token},
			success: function(data){
				//数据请求错误报错
				if(!data.code){
					promptTips('用户名已存在，请重新输入');
					return false;
				}else{
					localStorage.userName = $('#userName').val();
				}
			},
			error: function(xhr, type){
				promptTips('请求提交失败，请重试');
			}
		});
	});

	$('.btnsubmit').tap(function(){
		//防止重复点击
		var subTag = $(this);
		if(!!subTag.data('taped')) return false;
		//表单验证
		if(!!$('#userName').val()){
			if(!validator.name($('#userName').val())){
				promptTips("用户名由中英文、数字、下划线组成，长度在2-20之间");
				return false;
			}
		}else{
			promptTips("请输入用户名");
			return false;
		}

		if(!!$('#password').val()){
			if(!validator.password($('#password').val())){
				promptTips("密码以英文开头，长度在6-18之间，只包含英文、数字和下划线");
				return false;
			}
		}else{
			promptTips("请输入密码");
			return false;
		}

		if(!!$('#conPassword').val()){
			if(!validator.password($('#conPassword').val())){
				promptTips("密码以英文开头，长度在6-18之间，只包含英文、数字和下划线");
				return false;
			}
		}else{
			promptTips('请输入确认密码');
			return false;
		}

		if($('#password').val() != $('#conPassword').val()){
			promptTips('两次密码输入不一致');
			return false;
		}
		subTag.data('taped',true);
		var setData = {
			'username' : $('#userName').val(),
			'password' : hex_encrypt($('#password').val()),
			'token' : localStorage.token,
			'phone' : localStorage.phone
		};
		$.ajax({
			type:'POST',
			url: config.Rurl + 'api/v1/account/register/saveAccountInfo',
			dataType: 'json',
			contentType: "application/json",
			data: JSON.stringify(setData),
			success: function(data){
				//解除绑定
				subTag.data('taped',false);
				//数据请求错误报错
				if(data.code == 1){
					localStorage.userId = data.results.userId;
					localStorage.pavoid = data.results.pavoid;
					/*localStorage.prevUrl += ',reged.html'; */
					localStorage.iszhuce = 1;
					location.replace("personinformation.html");
				}else{
					promptTips(data.message);
					return false;
				}
			},
			error: function(xhr, type){
				subTag.data('taped',false);
				promptTips('请求提交失败，请重试');
			}
		});
	});
})();