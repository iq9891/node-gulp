(function(){
	$(function(){
		localStorage.unloginUrl = "dis_gu_result.html";
		/*阻止默认滚动事件*/
        document.body.addEventListener("touchstart", function(event) { 
          event.preventDefault();
        },false);
        document.body.addEventListener("touchmove", function(event) { 
          event.preventDefault();
        },false);

		var $result = $(".dis_gu_result_type .result");

        /*解决导诊问题存在叶子节点的depid=null*/
        if(localStorage.disgudieyes){
            if(JSON.parse(localStorage.disgudieyes).depId == 0){
                $(".dis_gu_result p").eq(1).html(JSON.parse(localStorage.disgudieyes).cont);
				localStorage.standdeparmentId = JSON.parse(localStorage.disgudieyes).depId;
                $result.html("返回首页");
                $('.dis_gu_result_type').on('tap',function(){
                    location.href = 'index.html';
                });
                //$(".dis_gu_result").addClass('hide');
                return false;
            }
        }else{
            if(JSON.parse(localStorage.disguideno).depId == 0){
                $(".dis_gu_result p").eq(1).html(JSON.parse(localStorage.disguideno).cont);
				localStorage.standdeparmentId = JSON.parse(localStorage.disguideno).depId;
                $result.html("返回首页");
                $('.dis_gu_result_type').on('tap',function(){
                    location.href = 'index.html';
                });
                //$(".dis_gu_result").addClass('hide');
                return false;
            }
        }
		/*scroll start*/
		function resetFn(){
			$('#scrollwrap').css({"height":$(window).height() - $('.dis_gu_result').height() - $('.dis_gu_result_type').height() - 54});//localStorage.viewHeight
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

		/*科室显示*/
        if(localStorage.disgudieyes){
        	$result.html(JSON.parse(localStorage.disgudieyes).depName).attr('_id', JSON.parse(localStorage.disgudieyes).depId);
        }else{
        	$(".dis_gu_result p").eq(1).html(JSON.parse(localStorage.disguideno).cont);
			localStorage.standdeparmentId = JSON.parse(localStorage.disguideno).depId;
			$result.html("返回首页");
			$('.dis_gu_result_type').on('tap',function(){
				location.href = 'index.html';
			});
			//$(".dis_gu_result").addClass('hide');
			return false;
        }

        if(localStorage.disgudieyes){
            localStorage.standdeparmentId = JSON.parse(localStorage.disgudieyes).depId;
            localStorage.disguidedepartmentName = JSON.parse(localStorage.disgudieyes).depName;
        
        }else{
            localStorage.standdeparmentId = JSON.parse(localStorage.disguideno).depId;
            localStorage.disguidedepartmentName = JSON.parse(localStorage.disguideno).depName;
        }
        $(".dis_gu_result_type").on('tap',function(){
			localStorage.setItem("dis_gu_result_name",$result.html());
			localStorage.setItem("dis_gu_result_id",$result.attr('_id'));
        	location.href = "disease_guide_deplist.html";
        });

		/*显示*/
		if(localStorage.disgudieyes){
			$(".dis_gu_result p").eq(1).html(JSON.parse(localStorage.disgudieyes).cont);
			$.ajax({
				type:'GET',
            	url: config.Rurl+'api/v1/base/standardDepartment/hospitalList/'+JSON.parse(localStorage.disgudieyes).depId+'? aredId='+localStorage.areaId,
            	dataType: 'json',
            	contentType: "application/json",
            	success: function(data){
            		if(data.code){
                        if(data.results.length > 0){
                            var hosptialList = '';
                            var hosptialItem = data.results;
                            var listLength = Math.min(hosptialItem.length,5);
                            for(var i = 0 ;i < listLength; i++){
								hosptialList += '<div class="sectionlist clearfix">'+
									'<div class="sectionlist-l fl clearfix" hospId="'+hosptialItem[i].hospId+'" hospName="'+hosptialItem[i].hospName+'">'+
										'<div class="sectionImg fl"><img src="'+ hosptialItem[i].hospImage +'" alt=""/></div>'+
										'<div class="sectionDetail fl">'+
											'<p class="sectionName fs16"><span class="colortwo sectionname">'+ hosptialItem[i].hospName +'</span></p>'+
											'<p class="section"><span class="level radius3 fs12 textcenter">'+ hosptialItem[i].hospGraded +'</span></p>'+
											//'<p class="section fs14"><span class="colortwo">成功预约：</span><span class="colorone">'+ hosptialItem[i].orderNum +'</span></p>'+
										'</div>'+
									'</div>'+
									'<div class="sectionlist-r fr textright"><span class="font-icon textcenter radius5 fs12">n</span></div>'+
								'</div>';
                            }

                            $(".hosptialList").append(hosptialList).find('img').on('error',function(){
                                $(this).attr({'src':'imgs/defaulthospital.jpg'});
                            });
							scroll.refresh();

                            $(".sectionlist").on('tap',function(){
                                localStorage.hospName = $(this).find('.sectionlist-l').attr("hospName");
                                localStorage.hospId   = $(this).find('.sectionlist-l').attr("hospId");
								location.href = "hospital-info-one.html";
                            });
                        }
            		}
            	},
				error: function(){
					promptTips("请求超时，请刷新页面！");
				}
			});
	
    	}else{
    		$(".dis_gu_result p").eq(1).html(JSON.parse(localStorage.disguideno).cont);
    		$.ajax({
    			type:'GET',
            	url: config.Rurl+'api/v1/base/standardDepartment/hospitalList/'+JSON.parse(localStorage.disguideno).depId+'? aredId='+localStorage.areaId,
            	dataType: 'json',
            	contentType: "application/json",
            	success: function(data){
            		if(data.code){
                        if(data.results.length > 0){
                            var hosptialList = '';
                            var hosptialItem = data.results;
                            var listLength = Math.min(hosptialItem.length,5);
                            for(var i = 0 ;i < listLength; i++){
								hosptialList += '<div class="sectionlist clearfix">'+
									'<div class="sectionlist-l fl clearfix" hospId="'+hosptialItem[i].hospId+'" hospName="'+hosptialItem[i].hospName+'">'+
										'<div class="sectionImg fl"><img src="'+ hosptialItem[i].hospImage +'" alt=""/></div>'+
										'<div class="sectionDetail fl">'+
											'<p class="sectionName fs16"><span class="colortwo sectionname">'+ hosptialItem[i].hospName +'</span></p>'+
											'<p class="section"><span class="level radius3 fs12 textcenter">'+ hosptialItem[i].hospGraded +'</span></p>'+
											'<p class="section fs14"><span class="colortwo">成功预约：</span><span class="colorone">'+ hosptialItem[i].orderNum +'</span></p>'+
										'</div>'+
									'</div>'+
									'<div class="sectionlist-r fr textright"><span class="font-icon textcenter radius5 fs12">n</span></div>'+
								'</div>';
                            }
						
                            $(".hosptialList").append(hosptialList).find('img').on('error',function(){
                                $(this).attr({'src':'imgs/defaulthospital.jpg'});
                            });
							scroll.refresh();

                            $(".sectionlist").on('tap',function(){
                                localStorage.hospName = $(this).find('.sectionlist-l').attr("hospName");
                                localStorage.hospId   = $(this).find('.sectionlist-l').attr("hospId");
								location.href = "doclist.html";
                            });
                        }      
            		}
            	},
				error: function(){
					promptTips("请求超时，请刷新页面！");
				}
    		});
    	}
	});
})()