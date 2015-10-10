(function(){
    $(function(){

		localStorage.unloginUrl = "addclient.html";
		//提交信息
		var $btnsubmit = $('#btnsubmit'),
			iSex = 1;

		//本人添加信息，带入手机号
		if(localStorage.orderbrance == 1 && !!localStorage.phone){
			$('.phone input').val(localStorage.phone).attr('readonly','readonly');
		}

		$btnsubmit.on('tap', function(){
			
			if($('#name').val() == ''){
				promptTips('请输入您的姓名');
				return;
			}
			var nameReg =   /^[\u4E00-\u9FA5a-zA-Z0-9_]{2,20}$/;
			
			if(nameReg.test($('#name').val()) === false){
				promptTips('请输入正确的姓名');
				return;
			}
			if($('#tel').val() == ''){
				promptTips('请输入您的手机号');
				return;
			}
			
			if($('#id').val() == ''){
				promptTips('请输入您的身份证号码');
				return;
			}
			var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
			if(reg.test($('#id').val()) === false){  
				promptTips('请输入正确的身份证号码');
				return;
			}
//			if(iSex == 0){
//				promptTips('请选择性别');
//				return;
//			}

            if($('#verificationCode').val() == ''){
                promptTips('验证码不能为空！');
                return;
            };
			var $telVal = $('#tel').val();
			if($telVal == ''){
				promptTips('请输入您的手机号');
				return;
			}
			
			if (/^1[3|4|5|8][0-9]\d{4,8}$/.test($telVal) === false) {
				promptTips('请输入正确的手机号');
				return;
			}
			/*Email*/
            if($('#email').val() !== ''){
                var emailreg = /^[\w]+[\.\w]*[\w]+@[\w]+\.[\w]+$/;
                if(emailreg.test($('#email').val()) === false){
                    promptTips('请输入正确的email格式');
                    return;
                }
            }
//			console.log($telVal);
//			console.log($('#verificationCode').val());
//			console.log(typeof $telVal);
//			console.log(typeof $('#verificationCode').val());

			//提交数据
			var persondata = {
					"userId"    : localStorage.userId,
					"name"      : $('#name').val(),
					"idNumber"  : $('#id').val(),
					"sex"       : iSex,
					"phone"     : $('#tel').val(),
					"email"     : $('#email').val(),
					"medicareNumber" : $('#socialSecurity').val(),
					"code" : $('#verificationCode').val()
				};

			$.ajax({
				type:'POST',
				url: config.Rurl+'api/v1/register/patient/add/'+localStorage.userId+'?pavoid='+localStorage.pavoid,
				contentType: "application/json",
				data: JSON.stringify(persondata),
				success: function(data){
					//console.log(data);
					if(data.code == 1){
						promptTips(data.message,function(){
							if(localStorage.orderbrance == 1){
								localStorage.orderbrance = 0;
								location.href = 'orderinfo.html';
							}else{
								location.href = 'clients.html';
							}
						});
					}else if(data.code == 21){
						promptTips(data.message);
					}else if(data.code == 24){
						promptTips(data.message);
					}else if(data.code == 100){
						location.href = 'login.html';
					}else{
						if(data.code == 25){
							promptTips(data.message);
						}else{
							if (data.code == 26 ) {
								promptTips(data.message);
							}else{
								promptTips(data.message);
							};
						}
					}
				}, error: function(xhr, type){
					promptTips("请求提交失败，请重试");
				}
			});

		});//提交信息end
		
		//性别
		$('.sexBox').on('tap', function(){
			$('.sexBox').removeClass('checked').find('.font-icon').html('x');
			$(this).addClass('checked').find('.font-icon').html('y');
			iSex = $(this).index()+1;
		});

		//发送验证码
        var reging = 0;
		$('.requserecodetexttype2').on('tap', function(){
			promptTips("请稍后点击按钮");
		});
		$('.requserecodetext').on('tap', function(){
			var $tel = $('#tel').val();
			if($tel == ''){
				promptTips('请输入您的手机号');
				return;
			}
			
			if (/^1[3|4|5|8][0-9]\d{4,8}$/.test($tel) === false) {
				promptTips('请输入正确的手机号');
				return;
			}
			$('.requserecodetexttype2').show();
			$('.requserecodetext').hide();
			/*防止误操作*/
            reging++;
            $(this).attr({"onoff":reging});
            var onoff = $(this).attr("onoff");
            var _this = this ;
            if(onoff == 1){
                var num = 60;
                var timer;
				regTimeFn();
                timer = setInterval(regTimeFn, 1000)
				function regTimeFn(){
                    if(num >= 0){
                        $('#reqSec').html(num);
                        num--;
                    }else{
                        reging = 0;
                        $(_this).attr({"onoff":reging});
                        $('#reqSec').html(60);
						$('.requserecodetexttype2').hide();
						$('.requserecodetext').show();
                        clearInterval(timer);
                    }
                }
            }
			
			//请求
			$.ajax({
                type:'GET',
                url: config.Rurl+'api/v1/register/patient/getCaptcha/'+ $tel +'?pavoid='+localStorage.pavoid,
                dataType: 'json',
                success: function(data){
					//console.log(data);
                    if(data.code == 1){
                        promptTips(data.message);
                    }else{
                        if(data.code == 100){
							localStorage.unloginUrl = "addclient.html";
							location.href="login.html";
                        }else{
                            if (data.code == 0 ) {
                                 promptTips(data.message);
                            }
                        }
                    }
                }, error: function(xhr, type){
					promptTips("请求提交失败，请重试");
				}
            });
		});
		
		
    });
})()