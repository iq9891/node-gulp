(function(){
    $(function(){
        /*阻止默认事件*/
        document.body.addEventListener("touchstart", function(event) {
            event.preventDefault();
        },false);
        document.body.addEventListener("touchmove", function(event) {
            event.preventDefault();
        },false);

        $('#hoslistwrap').css({"height":document.body.clientHeight - 50 +'px'});
        /*从index.html跳转过来 地区信息*/
        var nowareaId =localStorage.areaId;
        
        $('.sectionname').html(localStorage.areaName+'<span class=\"font-icon arrow\">k</span>');
        $('.sectionname').attr({'areaId':localStorage.areaId});

        var pagescroll;
        function loaded () {
            pagescroll =  new IScroll('#hoslistwrap',{freeScroll: true ,checkDOMChanges: true });
        }
        loaded();

        /*从index.html调转初始化页面*/
        /*清空内容*/
        $('.concernhoslist').html("");
        /*从首页地区信息添加医院*/
        $.ajax({
                type:'GET',
                url: config.Rurl + 'api/v1/base/hospital/list/'+localStorage.areaId,
                dataType: 'json',
                contentType: "application/json",
                success: function(data){
                    /*清空内容*/
                    $('.concernhoslist').html("");
                    if(data.code){
                        if(data.results.length == 0){
                            promptTips("暂时没有找到相关信息");
                        }
                        for (var i = 0; i < data.results.length; i++) {
                           $('.concernhoslist').append('<div class="sectionlist clearfix concernhositem" hospId="'+data.results[i].hospId+'"><div class="sectionlist-l fl clearfix"><div class="sectionImg fl"><img src="'+data.results[i].hospImage+'" alt=""/></div><div class="sectionDetail fl"><p class="sectionName fs16"><span class="colortwo">'+data.results[i].hospName+'</span></p><p class="section"><span class="level radius3 fs12 textcenter">'+data.results[i].hospGraded+'</span></p></div></div><div class="sectionlist-r fr textright"><span class="font-icon textcenter radius5 fs12">n</span></div></div>');
                        };

                        $('img').on('error',function(){
                            $(this).attr({'src':'imgs/defaulthospital.jpg'});
                        });
                        
                        $(".concernhositem").on('tap',function(){
                            localStorage.hospId = $(this).attr("hospId");
                            localStorage.hospName = $(this).find('.sectionName .colortwo').text();
                            location.href = 'hospital-info-one.html';
                        });

                        pagescroll.refresh();
                    }
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

        /*在本页中再次选择地区*/
        /*再选择地区信息*/
        $('.sectionname').on('tap',function(){
            localStorage.unloginUrl = "section_1.html";
            location.href = 'selectpos-one.html';
        });

        
        
    
    });
/*end*/
})();



