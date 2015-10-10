(function(){
    $(function(){
		/*阻止默认事件*/
        document.body.addEventListener("touchstart", function(event) { 
          event.preventDefault();
        },false);
        document.body.addEventListener("touchmove", function(event) { 
          event.preventDefault();
        },false);
		
		/*scroll start*/
		function resetFn(){
			$('#scrollwrap').css({"height":$(window).height() - 36});//localStorage.viewHeight
		};
        var scroll;
        function loaded() {
			resetFn();
            scroll  =  new IScroll('#scrollwrap', {freeScroll: true, checkDOMChanges: true });
        }
		
		function hengshuping(){
			if(window.orientation==180||window.orientation==0){
				setTimeout(function(){resetFn();scroll.refresh();},100);
			};
			if(window.orientation==90||window.orientation==-90){
				setTimeout(function(){resetFn();scroll.refresh();},100);
			}
		}
		window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
        loaded();
		/*scroll end*/
		
		//获取预约单列表
		$.ajax({
			type: 'GET',
			url: config.Rurl+'api/v1/register/order/info/'+localStorage.getItem("userId")+'?pavoid='+localStorage.getItem("pavoid")+ '&orderId='+localStorage.getItem("regrecordid"),
			dataType:'json',
			contentType: 'application/json',
			success: function(data){
				
				if(data.code == 1){
					$('#cate-content').html(data.results.hospName);
					$('#part').html(data.results.departmentName);
					$('#doc').html(data.results.doctorName);
					$('#outdepCont').html(data.results.resourceTpyeText);
					$('#money').html('￥'+data.results.expenseText);
					$('#date').html('￥'+data.results.diagnosisDateText);
					$('#geordateCont').html(data.results.retrieveTime);
					$('#hosportCont').html(data.results.retrieveAddress);
					$('#depposCont').html(data.results.diagnosisAddress);
					$('#patientName').html(data.results.patientName);
					$('#id').html(data.results.idCard);
					$('#tel').html(data.results.phone);
					if(data.results.status == 2){
						$('.textcenter').html('待就医');
						$('#btnsubmit').show();
					}else if(data.results.status == 3){
						$('.textcenter').html('已取消');
					}else if(data.results.status == 4){
						$('.textcenter').html('已就医');
					}else if(data.results.status == 5){
						$('.textcenter').html('预约中');
					}
					scroll.refresh();
				}else{
                    if(data.code == 100){
						localStorage.unloginUrl = "myorderall.html";
                        location.href = 'login.html';
                    }
                }
			},
			error: function(xhr){
				if(localStorage.getItem("ajaxError")){
					promptTips("请求超时，请刷新页面！");
				}else{
					localStorage.setItem("ajaxError",true);
					location.reload(true);
				}
			}
		});
	
		//取消预约
		$('#btnsubmit').on('tap', function(){
			
			 ikangalert(0, '取消预约', '确定取消本次预约', fnsuccess);
			 function fnsuccess(){
				 $.ajax({
					type:'GET',
					url: config.Rurl+'api/v1/register/order/deregistration/'+localStorage.getItem("userId")+'?orderId='+localStorage.getItem("regrecordid")+'&pavoid='+localStorage.getItem("pavoid"),
					dataType: 'json',
					contentType: "application/json",
					success: function(data){
						if(data.code == 0){
							promptTips("取消预约失败");
						}else{
							if(data.code == 1){
								location.href = 'myorder.html';
							}else{
								if(data.code == 204){
									promptTips("您本月已取消预约单5次，无法进行取消，如您爽约3次，您的帐号会被封停");
								}else{
									if(data.code ==301){
										promptTips("已过最晚取消时间");
									}
								}
							}
						}
					},
					error: function(xhr){
						if(xhr.status == 0){
							promptTips("服务器异常！");
						}
					}
				});
			 };
		});

    });
})()
