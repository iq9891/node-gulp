(function(){
	$(function(){
		/*阻止默认事件*/
        document.body.addEventListener("touchstart", function(event) { 
          event.preventDefault();
        },false);
        document.body.addEventListener("touchmove", function(event) { 
          event.preventDefault();
        },false);

        /*scroll*/
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

		var sHtml = '',
			$hospitalInfoList = $('#hospital-info-list'),
			sPrevName = localStorage.getItem("depart_guide_one_name"),
			iPrevIndex = localStorage.getItem("depart_guide_one_index"),
			loading = "<div style='width:100%;padding:10px 0;text-align: center;' id='loading'><img src='imgs/loading2.gif' width='20' >加载中...</div>";;
		
		$('#hospital-info-name').html(sPrevName);

		$('.scrollwrap').prepend(loading);

		$.ajax({
			type: 'GET',
			url: config.Rurl+'api/v1/base/standardDepartment/list',
			dataType:'json',
			async:false,
			contentType: 'application/json',
			success: function(data){
				//console.log(data.results);
				if(data.code ==1){
					var iLen = data.results[iPrevIndex].departments.length,
						i = 0;
					
					if(iLen){
						//添加数据
						for (i=0; i<iLen; i++) {
							sHtml += '<li><a class="show hospital-info-list-l-link" _id="'+ data.results[iPrevIndex].departments[i].departmentId +'"><span class="hospital-info-list-l">'+ data.results[iPrevIndex].departments[i].departmentName +'</span><span class="hospital-info-list-r font-icon">n</span></a></li>'
						}
						$hospitalInfoList.append(sHtml);
						$('#loading').remove();
						$('.hospital-info-list-l-link').on('tap', function(){
							localStorage.setItem("depart_guide_two_name",$(this).find('.hospital-info-list-l').html());
							localStorage.setItem("depart_guide_two_id",$(this).attr('_id'));
							localStorage.standdeparmentId = $(this).attr('_id');
							location.href = 'depart_list.html';
						});
					
					}else{
						promptTips('暂无相关内容！');
						$('#loading').remove();
					}
					scroll.refresh();
				}
			},
			error: function(xhr,type,error){
				if(localStorage.getItem("ajaxError")){
					promptTips("请求超时，请刷新页面！");
				}else{
					localStorage.setItem("ajaxError",true);
					location.reload(true);
				}
			}
		});

		//重新选择
		$('.hospital-info-r').on('tap', function(){
			window.location.href = 'depart_guide_one.html';	
		});

	});
})();