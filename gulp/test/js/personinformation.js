(function(){
	$(function(){
		//预约流程进来的取消跳过
		if(localStorage.unloginUrl == "docdetail.html"){
			$('.jump-over').remove();
		}
		$('.jump-over').on('tap',function(){
			if(!!localStorage.unloginUrl){
				location.href = localStorage.unloginUrl;
			}else{
				location.href = "index.html";
			}
		});
		/*从localStorage中取到用户填写的手机号和用户名*/
		$('.phone input').val(localStorage.phone);
		/*select sex*/
		$('.woman').on('tap',function(){
			$(this).html('<span class="font-icon selected" data-sex="female">y</span>女');
			$('.man').html('<span class="font-icon">x</span>男')
		});

		$('.man').on('tap',function(){
			$(this).html('<span class="font-icon selected" data-sex="male">y</span>男');
			$('.woman').html('<span class="font-icon">x</span>女')
		});

		/*submit tap*/
		$('.btnsubmit').on('tap',function(){
			//防止重复点击
			var subTag = $(this);
			if(!!subTag.data('taped')) return false;

			if(!$('.usernamewarp input').val()){
				promptTips("请输入姓名");
				return false;
			}
			if(!!$('.pass input').val()){
				if(!validator.isIdCardNo($('.pass input').val())){
					promptTips("请输入正确的身份证号码");
					return false;
				}
			}else{
				promptTips("请输入您的身份证号码");
				return false;
			}

			if(!!$('.mail input').val()){
				if(!validator.mail($('.mail input').val())){
					promptTips("请输入正确的email格式");
					return false;
				}
			}

			if(!!$('.shebaocard input').val()){
				if(!validator.medicareNumber($('.shebaocard input').val())){
					promptTips("请输入正确的社保卡格式");
					return false;
				}
			}

			subTag.data('taped',true);
			localStorage.name = $('.usernamewarp input').val();
			var url = config.Rurl + 'api/v1/account/register/updateAcountInfo'+'?pavoid='+localStorage.pavoid;
			var setData = {
				'userId':  parseInt(localStorage.userId),
				'name': $('.usernamewarp input').val(),
				'cardNo': $('.pass input').val(),
				'gender': $('.sex .selected').data('sex'),
				'email' : $('.mail input').val(),
				'phone' : $('.phone input').val(),
				'medicareNumber' : $('.shebaocard input').val()
			}
			$.ajax({
				type: 'POST',
				url: url,
				dataType: 'json',
				contentType: "application/json",
				data: JSON.stringify(setData),
				success: function(data){
					//解除绑定
					subTag.data('taped',false);
					//数据请求错误报错
					if(data.code!= 1){
						promptTips(data.message);
						return false;
					}else{
						ikangalert(false,'个人信息','恭喜您的个人信息添加成功',function(){
							//prevUrlJump();
							if(localStorage.unloginUrl!=""||localStorage.unloginUrl!=undefined){
								location.href = localStorage.unloginUrl;
							}else{
								location.href = 'index.html';
							}
						},function(){
							//添加取消后的回调事件
						});

					}

				},
				error: function(xhr, type){
					subTag.data('taped',false);
					promptTips('请求提交失败，请重试');
				}
			});
		});
	});
})()