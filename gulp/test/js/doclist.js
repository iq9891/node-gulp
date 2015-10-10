(function(){
    $(function(){
        /*阻止默认滚动事件*/
        document.body.addEventListener("touchstart", function(event) {
            event.preventDefault();
        },false);
        document.body.addEventListener("touchmove", function(event) {
            event.preventDefault();
        },false);

        $('#departmentId').html(localStorage.departmentName);

        /*scroll start*/
		function resetFn(){
			$('#doccontwarptoscroll').css({"height":$(window).height() - 34});//localStorage.viewHeight
		};
        var scroll;
        function loaded() {
			resetFn();
            scroll  =  new IScroll('#doccontwarptoscroll', {freeScroll: true, checkDOMChanges: true });
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

        /*获取科室医生列表*/
        $.ajax({
            type:'GET',
            url: config.Rurl + 'api/v1/base/doctor/list/'+localStorage.departmentId,
            dataType: 'json',
			async:false,
            contentType: "application/json",
            success: function(data){
                if(!data.results||data.results.length==0){
                    promptTips("暂无相关信息");
                    return;
                }
                var html = "";
                for(var i = 0;i<data.results.length;i++){
                    var btn = '';
                    if(data.results[i].regType == 1){//可约
                        btn = '<div class="doclist-r fr textright"><span class="textcenter radius5 fs16 order">预约</span></div>';
                        var doctorHeadImage = data.results[i].doctorHeadImage;
                        //医生擅长去掉空格
                        var specialtydesc = $.trim(data.results[i].specialtydesc);
                        html+='<div class="doclist clearfix" doctorId = "'+data.results[i].doctorId+'"><div class="doclist-l fl clearfix"><div class="docImg fl"><img src="'+doctorHeadImage+'" alt=""/></div> <div class="docDetail fl"><p class="docName fs16"><span class="colortwo docname">'+data.results[i].doctorName+'</span><span class="colorone docGrade">'+data.results[i].doctorGrade+'</span></p><p class="doc fs14"><span class="colortwo">擅长：</span><span class="colorone">'+specialtydesc+'</span></p> </div> </div>'+btn+'</div>';
                    }

                }
                for(var i = 0;i<data.results.length;i++){
                    var btn = '';
                    //if(data.results[i].regType == 1){//可约
                    //    btn = '<div class="doclist-r fr textright"><span class="textcenter radius5 fs16 order">预约</span></div>';
                    //}
                    if(data.results[i].regType == 2){//约满
                        btn = '<div class="doclist-r fr textright"><span class="textcenter radius5 fs16 full">约满</span></div>';
                        var doctorHeadImage = data.results[i].doctorHeadImage;
                        //医生擅长去掉空格
                        var specialtydesc = $.trim(data.results[i].specialtydesc);
                        html+='<div class="doclist clearfix" doctorId = "'+data.results[i].doctorId+'"><div class="doclist-l fl clearfix"><div class="docImg fl"><img src="'+doctorHeadImage+'" alt=""/></div> <div class="docDetail fl"><p class="docName fs16"><span class="colortwo docname">'+data.results[i].doctorName+'</span><span class="colorone docGrade">'+data.results[i].doctorGrade+'</span></p><p class="doc fs14"><span class="colortwo">擅长：</span><span class="colorone">'+specialtydesc+'</span></p> </div> </div>'+btn+'</div>';
                    }else if(data.results[i].regType == 3){//停诊
                        btn = '<div class="doclist-r fr textright"><span class="textcenter radius5 fs16 full">停诊</span></div>';
                        var doctorHeadImage = data.results[i].doctorHeadImage;
                        //医生擅长去掉空格
                        var specialtydesc = $.trim(data.results[i].specialtydesc);
                        html+='<div class="doclist clearfix" doctorId = "'+data.results[i].doctorId+'"><div class="doclist-l fl clearfix"><div class="docImg fl"><img src="'+doctorHeadImage+'" alt=""/></div> <div class="docDetail fl"><p class="docName fs16"><span class="colortwo docname">'+data.results[i].doctorName+'</span><span class="colorone docGrade">'+data.results[i].doctorGrade+'</span></p><p class="doc fs14"><span class="colortwo">擅长：</span><span class="colorone">'+specialtydesc+'</span></p> </div> </div>'+btn+'</div>';
                    }
                }
                $(".doclistcontent").html(html);

                $('.doclist img').on('error',function(){
                    $(this).attr({'src':'imgs/defaultdoctor.jpg'});
                });

                //约满或者点击其他地方跳转医生详情
                $(".doclist").on('tap',function(e){
                    //if(!$(e.target).hasClass("order")){//防止tap冒泡
                        localStorage.doctorId=$(this).attr('doctorId');
                        location.href = 'docdetail.html';
                    //}
                })
                scroll.refresh();
            },
			error: function(xhr, type){
				if(localStorage.getItem("ajaxError")){
					promptTips("请求超时，请刷新页面！");
				}else{
					localStorage.setItem("ajaxError",true);
					location.reload(true);
				}
            }
        });

        //重新选择
        $("#reselect").on('tap',function(){
            location.href = 'hospital-info-two.html';
        })




    });
})();



