(function(){
    $(function(){
//		/*阻止默认滚动事件*/
//        document.body.addEventListener("touchstart", function(event) { 
//          event.preventDefault();
//        },false);
//        document.body.addEventListener("touchmove", function(event) { 
//          event.preventDefault();
//        },false);
//
		/*scroll start*/
//		function resetFn(){
//			$('#scrollwrap').css({"height":$(window).height() - 50});//localStorage.viewHeight
//		};
//        var scroll;
//        function loaded() {
//			resetFn();
//            scroll  =  new IScroll('#scrollwrap', {freeScroll: true, checkDOMChanges: true });
//        }
//		
//		function hengshuping(){
//			if(window.orientation==180||window.orientation==0){
//				setTimeout(function(){resetFn();scroll.refresh();},100);
//			};
//			if(window.orientation==90||window.orientation==-90){
//				setTimeout(function(){resetFn();scroll.refresh();},100);
//			}
//		}
//		window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
//        loaded();
		/*scroll end*/
		
		//获取账户所有的就诊人
		var sHtml = '',
			loading = "<div style='width:100%;padding:10px 0;text-align: center;' id='loading'><img src='imgs/loading2.gif' width='20' >加载中...</div>";

		$('#clientsBox').append(loading);

		$.ajax({
			type: 'GET',
			url: config.Rurl+'api/v1/register/patient/list/'+localStorage.getItem("userId")+'?pavoid='+localStorage.getItem("pavoid"),
			dataType:'json',
			contentType: 'application/json',
			success: function(data){
				
				if(data.code==1){
					var iLen = data.results.length,
						i = 0;
					for (i=0; i<iLen; i++) {
						if(data.results[i].isSelf == 1){//如果是本人
							sHtml += '<div class="clients" patientId="'+ data.results[i].patientId +'" patientName="'+ data.results[i].name +'" medicareNumber="'+ data.results[i].medicareNumber +'">'+
									'<div class="clients-l" >'+
										'<div class="fs18 clients-title">'+ data.results[i].name +'</div>'+
										'<div class="fs16 clients-txt">性别：'+ data.results[i].sexText +'</div>'+
										'<div class="fs16 clients-txt">身份证：'+ data.results[i].idNumber +'</div>'+
										'<div class="fs16 clients-txt">手机：'+ data.results[i].phone +'</div>'+
									'</div><div class="clients-r textright"><span class="clients-r-myself fs16 radius5 textcenter">本人</span></div></div>';
						}else{
							sHtml += '<div class="clients"  patientId="'+ data.results[i].patientId +'" patientName="'+ data.results[i].name +'" medicareNumber="'+ data.results[i].medicareNumber +'" >'+
									'<div class="clients-l">'+
										'<div class="fs18 clients-title">'+ data.results[i].name +'</div>'+
										'<div class="fs16 clients-txt">性别：'+ data.results[i].sexText +'</div>'+
										'<div class="fs16 clients-txt">身份证：'+ data.results[i].idNumber +'</div>'+
										'<div class="fs16 clients-txt">手机：'+ data.results[i].phone +'</div>'+
									'</div><div class="clients-r textright"><span class="font-icon fs18 del-client" patientId="'+ data.results[i].patientId +'">w</span></div></div>';
						}
					}
					$('#clientsBox').append(sHtml);
					$('#loading').remove();
					//scroll.refresh();


                    /*选就诊人*/
                    $('.clients').on('tap',function(e) {
						if(!$(e.target).hasClass("del-client")){//防止tap冒泡
							if (localStorage.mycountclient == 1) {
								return;
							} else {
								localStorage.cilentswitch = 1;
								localStorage.patientId = $(this).attr("patientId");
								localStorage.patientName = $(this).attr("patientName");
								localStorage.medicareNumber = !!$(this).attr("medicareNumber") ? $(this).attr("medicareNumber") : '';
								localStorage.mycountclient = 0;
								location.href = 'orderinfo.html';
							}
						}
                    });
				}else{
                    if(data.code == 100){
						localStorage.unloginUrl = "clients.html";
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
		
		//删除
		$('.del-client').live('tap', function(){
			var self = this;
			ikangalert(0,"删除提示","您确定要删除吗？",function(){
				$.ajax({
					type:'GET',
					url: config.Rurl+'api/v1/register/patient/del/'+localStorage.userId+'?patientId='+$(self).attr('patientId')+'&pavoid='+localStorage.pavoid,
					dataType: 'json',
					contentType: "application/json",
					success: function(data){
						if(data.code == 1){
							location.reload(true);
						}else{
							if(data.code == 205){
								promptTips(data.message);
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
			},function(){
				return ;
			});
		});
		
		//添加就诊人
		$('#btnsubmit').on('tap', function(){
			if($('#clientsBox > div').length < 5){
				if($('.clients').eq(0).find('.clients-r-myself')){
					localStorage.orderbrance = 0;
				}else{
					localStorage.orderbrance = 1;
				}
				location.href = 'addclient.html';
			}else{
				promptTips('您的就诊人已经超过4位');
			}
		});
		


    });
})()