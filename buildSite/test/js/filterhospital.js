/**
 * Created by ikang on 15-7-30.
 */
(function(){
    $(function(){
        /*scroll*/
        var scroll;
        function loaded () {
            var testheight = document.body.clientHeight   + 'px';
            $('#scrollwrap').css({'height':testheight});
            scroll =  new IScroll('#scrollwrap',{freeScroll: true ,checkDOMChanges: true });
        }
        loaded();
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        if(!!localStorage.filterareaId){
            var URL=encodeURIComponent(localStorage.searchKeyWord)+"&areaId="+encodeURIComponent(localStorage.filterareaId);
        }else{
            var URL=encodeURIComponent(localStorage.searchKeyWord);
        }
//        console.log(URL)
        $.ajax({
            type:'GET',
            url: config.Rurl+'api/v1/search/query/filterGraded/doctor?key='+URL,
            dataType: 'json',
            success: function(data){
                //console.log(data);
                if(data.code){

                    if(data.results.length == 0){
                        promptTips("当前搜索无结果");
                    }

                    $.each(data.results,function(index,item){
                        $('.warp').append('<div class="sectionlist clearfix" filterhospId="'+item.hospId+'"><div class="sectionlist-l fl clearfix"><div class="sectionImg fl"><img src="'+item.hospImage+'" alt=""></div><div class="sectionDetail fl"><p class="sectionName fs16"><span class="colortwo sectionname">'+item.hospName+'</span></p><p class="section"><span class="level radius3 fs12 textcenter">'+item.hospGraded+'</span></p></div></div><div class="sectionlist-r fr textright"><span class="font-icon textcenter radius5 fs12">n</span></div></div>');
                    });
                    scroll.refresh();
                    $(".sectionImg img").on("error",function(){
                        $(this).attr("src","imgs/defaulthospital.jpg")
                    })

                    $('div.warp > div').on('tap',function(){
                        localStorage.filterflaghospital=1;
                        localStorage.filterhospId = $(this).attr('filterhospId');
                        localStorage.hospName = $(this).find("span.sectionname").text();
                        location.href = 'filter.html';
                    });
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

    })
})()
