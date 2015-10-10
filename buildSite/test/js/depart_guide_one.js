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
			$('#scrollwrap').css({"height":$(window).height()-18});//localStorage.viewHeight
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
			loading = "<div style='width:100%;padding:10px 0;text-align: center;' id='loading'><img src='imgs/loading2.gif' width='20' >加载中...</div>";

		$('.warp').prepend(loading);

		$.ajax({
			type: 'GET',
			url: config.Rurl+'api/v1/base/standardDepartment/list',
			dataType:'json',
			async:false,
			contentType: 'application/json',
			success: function(data){
				if(data.code == 1){
					var iLen = data.results.length,
						i = 0;
					//添加数据
					for (i=0; i<iLen; i++) {
						sHtml += '<li class="hospital-info-list-l-link"><span class="hospital-info-list-l">'+ data.results[i].departmentName +'</span><span class="hospital-info-list-r font-icon">n</span></li>'
					}
					$hospitalInfoList.append(sHtml);
					scroll.refresh();
					$('#loading').remove();
					$('.hospital-info-list-l-link').on('tap', function(){
						localStorage.setItem("depart_guide_one_name",$(this).find('.hospital-info-list-l').html());
						localStorage.setItem("depart_guide_one_index",$(this).closest('li').index());
						location.href="depart_guide_two.html";
					});
				
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

	});
})();