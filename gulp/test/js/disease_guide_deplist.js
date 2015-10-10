(function(){
	$(function(){
		localStorage.unloginUrl = "disease_guide_deplist.html";
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

		var sHtml = '',
			$hospitalInfoList = $('#hospital-info-list'),
			sPrevName = localStorage.getItem("dis_gu_result_name"),
			iPrevId = localStorage.getItem("dis_gu_result_id"),//医院科室编号
			loading = "<div style='width:100%;padding:10px 0;text-align: center;' id='loading'><img src='imgs/loading2.gif' width='20' >加载中...</div>";;
		
		$('.section-city span').eq(1).html(sPrevName);

		$('.scroll').append(loading);
		localStorage.standdeparmentId = iPrevId;
		$.ajax({
			type: 'GET',
			url: config.Rurl+'api/v1/base/standardDepartment/hospitalList/'+iPrevId,
			dataType:'json',
			contentType: 'application/json',
			success: function(data){

				if(data.code ==1){
					var iLen = data.results.length,
						i = 0;
					if(iLen>0){
						//添加数据
						for (i=0; i<iLen; i++) {
							sHtml += '<div class="sectionlist clearfix" _href="hospital-info-one.html" hospId="'+data.results[i].hospId+'"><div class="sectionlist-l fl clearfix"><div class="sectionImg fl"><img src="'+ data.results[i].hospImage +'" alt="" onerror="this.src= config.hosimgerrorsrc" /></div><div class="sectionDetail fl"><p class="sectionName fs16"><span class="colortwo sectionname">'+ data.results[i].hospName +'</span></p><p class="section"><span class="level radius3 fs12 textcenter">'+ data.results[i].hospGraded +'</span></p><p class="section fs14"><!--<span class="colortwo">成功预约：</span><span class="colorone">'+ data.results[i].orderNum +'人</span>--></p></div></div><div class="sectionlist-r fr textright"><span class="font-icon textcenter radius5 fs12">n</span></div></div>';
						}
						$('.scroll').append(sHtml);
						$('#loading').remove();
						$('.sectionlist').on('tap', function(){
							localStorage.hospId = $(this).attr('hospId');
							localStorage.hospName = $(this).find('.sectionname').html();
							window.location.href = $(this).attr('_href');
						});
					}else{
						promptTips('暂无相关内容！');
						$('#loading').remove();
					}
					scroll.refresh();
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

	});
})();