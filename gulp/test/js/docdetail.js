(function(){
    $(function(){

        localStorage.unloginUrl = "docdetail.html";
        /*阻止默认滚动事件*/
        document.body.addEventListener("touchstart", function(event) {
            event.preventDefault();
        },false);
        document.body.addEventListener("touchmove", function(event) {
            event.preventDefault();
        },false);
		
		//弹框重置
		//alert($(window).height());
		$('.select-time').css({
			height:330 - $('.btnsubmit').height(),
			marginTop:($(window).height()-400)/2
		});

        //医生简介和预约挂号切换
        $('.docdetail-tab-l').on('tap',function(){
            getdocTime();
            $(this).css({'background-color':"#ffffff",'color':"#15b6c3"});
            $('.docdetail-tab-r').css({'background-color':"#15b6c3",'color':"#ffffff"});
            $(".docdetail-register").hide();
            $(".docdetail-introduce").show();

        });

        $('.docdetail-tab-r').on('tap',function(){
            getdocdetail();
            $(this).css({'background-color':"#ffffff",'color':"#15b6c3"});
            $('.docdetail-tab-l').css({'background-color':"#15b6c3",'color':"#ffffff"});
            $(".docdetail-introduce").hide();
            $(".docdetail-register").show();

        });

        /*scroll */
        var scrolltop;
        function loaded() {
            var testheight = localStorage.viewHeight - 57 - 138 + 'px';
            $('#scrollwarp').css({'height':testheight});
            scrolltop =  new IScroll('#scrollwarp',{"checkDOMChanges": true });
        }
        loaded();
        //setTimeout(function(){
        //    loaded();
        //},500);

        function getdocTime(){
            /*获取医生出诊时间列表*/
            $.ajax({
                type:'GET',
                url: config.Rurl + 'api/v1/register/resource/list/'+localStorage.doctorId+'?departmentId='+localStorage.departmentId,
                dataType: 'json',
                contentType: "application/json",
                success: function(data){
					
                    if(data.results.length==0){
                        $(".docdetail-register").html('<div class="nothing-work textcenter fs18">暂无排班！</div>');
                        scrolltop.refresh();
                        return;
                    }

                    var html = "";
                    for(var i = 0;i<data.results.length;i++){
                        var btn = '';
                        if(data.results[i].resourceStatus == 1){//可约
                            html+= '<div class="docdetail-list register-ok" ><div class="docdetail-list-l fl"><h3><span>'+data.results[i].resourceDateView+'</span></h3> <p class="fs14">'+data.results[i].resourceTpyeText+' '+data.results[i].expenseText+'</p> </div><div index="'+i+'" class="docdetail-list-r fr textcenter radius5 fs16">预约</div></div>';
                        }else if(data.results[i].resourceStatus == 2){//约满
                            html+= '<div class="docdetail-list register-no-ok"><div class="docdetail-list-l fl"><h3><span>'+data.results[i].resourceDateView+'</span></h3> <p class="fs14">'+data.results[i].resourceTpyeText+' '+data.results[i].expenseText+'</p> </div><div class="docdetail-list-r fr textcenter radius5 fs16">约满</div></div>';
                        }else if(data.results[i].resourceStatus == 3){//停诊
                            html+= '<div class="docdetail-list register-stop"><div class="docdetail-list-l fl"><h3><span>'+data.results[i].resourceDateView+'</span></h3> <p class="fs14">'+data.results[i].resourceTpyeText+' '+data.results[i].expenseText+'</p> </div><div class="docdetail-list-r fr textcenter radius5 fs16">停诊</div></div>';
                        }
                    }
                    $(".docdetail-register").html(html);
                    scrolltop.refresh();
                    //点击预约
                    $(".register-ok .textcenter").on("tap",function(){

                        var index = $(this).attr("index");
                        var tempstr = JSON.stringify(data.results[index]);
                        localStorage.orderresinfo = tempstr;
                        //获取医生出诊分时间段出诊列表
                        $.ajax({
                            type:'POST',
                            url: config.Rurl+'api/v1/register/resource/list/times/'+localStorage.doctorId+'?departmentId='+localStorage.departmentId,
                            dataType: 'json',
                            headers:{"pavoid":localStorage.pavoid},
                            contentType: "application/json",
                            data: tempstr,
                            success: function(data){
								
                                if(data.code == 1){//获取医生出诊分时间段出诊列表 成功
                                    var arrtimeinfo = [];
                                    if(data.results.length == 0){//无时间段
                                        $.ajax({
                                            type:'GET',
                                            url: config.Rurl+'/api/v1/register/patient/getSelf/'+localStorage.userId,
                                            headers:{"pavoid":localStorage.pavoid},
                                            dataType: 'json',
                                            contentType: "application/json",
                                            success: function(data){
                                                //console.log(data)
                                                if(data.code == 1 ){
                                                    location.href = 'orderinfo.html';
                                                }else{
                                                    if (data.code == 100) {
                                                        location.href = 'login.html';
                                                    }else{
                                                        if(data.code == 20 ){
                                                            localStorage.orderbrance = 1;
                                                            location.href = 'addclient.html';
                                                        }
                                                    };
                                                }
                                            }
                                        });
                                    }else{//有时间段
                                        var arrtime = [];
                                        //$(".mask").removeClass("hide");
                                        $.each(data.results,function(index,item){
											if(item.timespanDesc != 'null-null'){
												//console.log(item.timespanDesc);
												arrtimeinfo.push(item);
												item.times =	item.times.replace(/\s/g,'');
												arrtime.push(item.times);
											}
                                        });
                                        //arrtime.push("&nbsp;&nbsp;");
                                        $('.time-list').html("");
										if(!arrtime.length){
											location.href = 'orderinfo.html';
											return;
										}
                                        $.each(arrtime, function(index,item) {
											if(!$.trim(item)){
												location.href = 'orderinfo.html';
												return;
											}
                                            if(index === 0){
                                                $('.time-list').append("<div class='fl center textcenter select' index='"+index+"'>"+ $.trim(item)+"</div>");
                                            }else{
                                                $('.time-list').append("<div class='fl center textcenter' index='"+index+"'>"+$.trim(item)+"</div>");
                                            }
											$(".select-time-shade").removeClass("hide");
                                        });
                                        //$('.time-list').append("<div class='fl center textcenter' index=''>w3r5235</div>");

                                        $(".time-list div").on("tap",function(){
                                            $(this).addClass("select").siblings().removeClass("select");
                                        });



                                        $('.btnsubmit').on('tap',function(){
                                            var number = $(".time-list .select").attr("index");
                                            localStorage.orderresinfo = JSON.stringify(arrtimeinfo[number]);
											//console.log(arrtimeinfo[number]);
                                            //console.log(arrtimeinfo[number]);

                                            /*判断是否有就诊人*/
                                            $.ajax({
                                                type:'GET',
                                                url: config.Rurl+'/api/v1/register/patient/getSelf/'+localStorage.userId,
                                                headers:{"pavoid":localStorage.pavoid},
                                                dataType: 'json',
                                                contentType: "application/json",
                                                success: function(data){
                                                    if(data.code == 1 ){
                                                        location.href = 'orderinfo.html';
                                                    }else{
                                                        if (data.code == 100) {
                                                            location.href = 'login.html';
                                                        }else{
                                                            if(data.code == 20 ){
                                                                localStorage.orderbrance = 1;
                                                                location.href = 'addclient.html';
                                                            }
                                                        };
                                                    }
                                                }
                                            });
                                        });

                                        $('.close').on('tap',function(){
                                            $(".select-time-shade").addClass("hide");
                                        });
                                        /*scroll */
                                        $('#time-list').css({'height':330 - $('.btnsubmit').height()-25});
                                        var scrolltop2 =  new IScroll('#time-list',{"checkDOMChanges": true });

                                    }
                                }else{
                                    if(data.code == 301){
                                        promptTips("此号源已约满");
                                    }
                                }
                            }
                        })
                    })
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
        }

        getdocTime();


        function getdocdetail(){

            /*获取医生详情*/
            $.ajax({
                type:'GET',
                url: config.Rurl + 'api/v1/base/doctor/info/'+localStorage.doctorId+'?departmentId='+localStorage.departmentId,
                dataType: 'json',
                contentType: "application/json",
                success: function(data){

                    $("#doctorName").html(data.results.doctorName);
                    $("#doctorHeadImage").attr('src',data.results.doctorHeadImage);
                    $("#doctorGrade").html(data.results.doctorGrade);
                    $("#hospName").html(data.results.hospName);
                    $("#departmentName").html(data.results.departmentName);

                    if($.trim(data.results.specialtydesc) !== ""){
                        $("#specialtydesc").html(data.results.specialtydesc);
                    }

                    if($.trim(data.results.doctorDesc) !== ""){
                        $("#doctorDesc").html(data.results.doctorDesc);
                    }


                    $('#doctorHeadImage').on('error',function(){
                        $(this).attr({'src':'imgs/defaultdoctor.jpg'});
                    });

                    scrolltop.refresh();
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
        }

        getdocdetail();




    });
})();



