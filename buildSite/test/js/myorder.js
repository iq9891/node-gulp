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
			$('#scrollwrap').css({"height":$(window).height() - 90});//localStorage.viewHeight
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
		var sHtmlAll = '',
			sHtmlWill = '',
			sHtmlCancel = '',
			sHtmlPass = '',
			sHtmlIng = '',
			loading = "<div style='width:100%;padding:10px 0;text-align: center;' id='loading'><img src='imgs/loading2.gif' width='20' >加载中...</div>";

		$('.scroll').append(loading);

		$.ajax({
			type: 'GET',
			url: config.Rurl+'api/v1/register/order/list/'+localStorage.getItem("userId")+'?pavoid='+localStorage.getItem("pavoid"),
			dataType:'json',
			contentType: 'application/json',
			success: function(data){
				if(data.code == 1){
					var iLen = data.results.length,
						i = 0;
					if(iLen !=0){
						for (i=0; i<iLen; i++) {
							if(data.results[i].status == 2){	//待就医
								sHtmlWill += '<div class="additem willitem" regrecordid="'+data.results[i].regRecordId +'">'+
												'<div class="willitemhead clearfix">'+
													'<h3><p>'+ data.results[i].hospName +'</p></h3>'+
													'<p class="clearfix"><span>'+ data.results[i].departmentName +'</span><strong class="fr">￥'+ data.results[i].expenseText +'</strong></p>'+
												'</div>'+
												'<div class="willitembody">'+
													'<h4><p>就诊日期：'+ data.results[i].diagnosisDateText +'</p></h4>'+
													'<h5 class="clearfix"><p class="fl">就诊人：'+ data.results[i].patientName +'</p><span class="fr"><em class="willcircle"></em>待就医</span></h5>'+
												'</div>'+
											'</div>';
							}else if(data.results[i].status == 3){ //已取消
								sHtmlCancel += '<div class="additem cancelitem" regrecordid="'+data.results[i].regRecordId +'">'+
													'<div class="cancelitemhead">'+
														'<h3><p>'+ data.results[i].hospName +'</p></h3>'+
														'<p class="clearfix"><span>'+ data.results[i].departmentName +'</span><strong class="fr">￥'+ data.results[i].expenseText +'</strong></p>'+
													'</div>'+
													'<div class="cancelitembody">'+
														'<h4><p>就诊日期：'+ data.results[i].diagnosisDateText +'</p></h4>'+
														'<h5 class="clearfix"><p class="fl">就诊人：'+ data.results[i].patientName +'</p><span class="fr"><em class="cancelcircle"></em>已取消</span></h5>'+
													'</div>'+
												'</div>';
							}else if(data.results[i].status == 4){ //已就医
								sHtmlPass += '<div class="additem passitem" regrecordid="'+data.results[i].regRecordId +'">'+
												'<div class="passitemhead">'+
													'<h3><p>'+ data.results[i].hospName +'</p></h3>'+
													'<p class="clearfix"><span>'+ data.results[i].departmentName +'</span><strong class="fr">￥'+ data.results[i].expenseText +'</strong></p>'+
												'</div>'+
												'<div class="passitembody">'+
													'<h4><p>就诊日期：'+ data.results[i].diagnosisDateText +'</p></h4>'+
													'<h5 class="clearfix"><p class="fl">就诊人：'+ data.results[i].patientName +'</p><span class="fr"><em class="passcircle"></em>已就医</span></h5>'+
												'</div>'+
											'</div>';
							}else if(data.results[i].status == 5){ //预约中
								sHtmlIng += '<div class="additem appingitem" regrecordid="'+data.results[i].regRecordId +'">'+
												'<div class="passitemhead">'+
													'<h3><p>'+ data.results[i].hospName +'</p></h3>'+
													'<p class="clearfix"><span>'+ data.results[i].departmentName +'</span><strong class="fr">￥'+ data.results[i].expenseText +'</strong></p>'+
												'</div>'+
												'<div class="appingbody">'+
													'<h4><p>就诊日期：'+ data.results[i].diagnosisDateText +'</p></h4>'+
													'<h5 class="clearfix"><p class="fl">就诊人：'+ data.results[i].patientName +'</p><span class="fr"><em class="ingcircle"></em>预约中</span></h5>'+
												'</div>'+
											'</div>';
							}
							sHtmlAll = sHtmlWill+sHtmlCancel+sHtmlPass+sHtmlIng;
						}
						$('#alllist').append(sHtmlAll);
						$('#willlist').append(sHtmlWill);
						$('#cancellist').append(sHtmlCancel);
						$('#passlist').append(sHtmlPass);
					}else{
						promptTips("暂无相关内容！");
					}
					$('#loading').remove();
					scroll.refresh();
				}else{
                    if(data.code == 100){
						localStorage.unloginUrl = "myorder.html";
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
		
		//添加切换事件
		var $nav = $('.nav'),
			$box = $('.box');
		$nav.on('tap', function(){
			var iNow = $(this).index();
			$nav.removeClass('on').eq(iNow).addClass('on');
			$box.hide().eq(iNow).show();
			scroll.refresh();
		});

		//添加跳转事件
		$('.additem').live('tap', function(){
			localStorage.setItem("regrecordid",$(this).attr('regrecordid'));
			window.location.href = 'myorderall.html';
		});

    });
})()