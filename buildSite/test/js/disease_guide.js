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

		var sHtml = '',
			loading = "<div style='width:100%;padding:10px 0;text-align: center;' id='loading'><img src='imgs/loading2.gif' width='20' >加载中...</div>";

		$('.scrollwrap').append(loading);

		$.ajax({
			type: 'GET',
			url: config.Rurl+'api/v1/guide/body/list/',
			dataType:'json',
			contentType: 'application/json',
			success: function(data){
				if(data.code ==1){
					var iLen = data.results.length,
						i = 0;
					
					//添加数据
					for (i=0; i<iLen; i++) {
						sHtml += ' <div class="depart" _href="dis_pa_guide.html" _id="'+data.results[i].id+'">'+ data.results[i].cont +'<span class="enterdepart">n</span></div>';
					}
					$('#departList').append(sHtml);
					$('#loading').remove();
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
		
		//页面跳转
		$('.depart').live('tap', function(){
			localStorage.setItem("disease_guide_id",$(this).attr('_id'));
			window.location.href = $(this).attr('_href');
		});

	});
})();