/**
 * Created by ikang on 15-7-30.
 */
(function(){
    $(function(){

//        localStorage.filterhospId = !!localStorage.filterhospId ? localStorage.filterhospId : '';
//        localStorage.filtergradedId = !!localStorage.filtergradedId ? localStorage.filtergradedId : '';
//        if(localStorage.searchType==='1'){
//            var addr='api/v1/search/query/filter/doctor?key='+encodeURIComponent(localStorage.searchKeyWord)+"&hospId="+encodeURIComponent(localStorage.filterhospId);
//        }else{
//            var addr='api/v1/search/query/filter/hospital?key='+encodeURIComponent(localStorage.searchKeyWord)+"&gradedId="+encodeURIComponent(localStorage.filtergradedId);
//        }
        if(localStorage.searchType==='1'){
            var addr='api/v1/search/query/filter/doctor?key='+encodeURIComponent(localStorage.searchKeyWord);
        }else{
            var addr='api/v1/search/query/filter/hospital?key='+encodeURIComponent(localStorage.searchKeyWord);
        }
        $.ajax({
            type:'GET',
            url: config.Rurl+addr,
            dataType: 'json',
            success: function(data){
                //console.log(data);
                if(data.code){

                    if(data.results.length == 0){
                        promptTips("当前搜索无结果");
                    }

                    $.each(data.results,function(index,item){
                        var subAreas="",subNames="";
                        $.each(item.subAreas,function(index,list){
                            subAreas+=list.areaId+" ";
                            subNames+=list.areaName+" ";
                        })
                        $('ul.area-info-list').append('<li subAreasNames="'+subNames+'" subAreasIds="'+subAreas+'" filterareaId="'+item.areaId+'"><span class="area-info-list-l">'+item.areaName+'</span><span class="area-info-list-r font-icon textright hide">A</span></li>');
                    });


                    $('ul.area-info-list > li').on('tap',function(){
                        localStorage.filterflag=1;
                        localStorage.filterareaId = $(this).attr('filterareaId');
                        localStorage.areaNameFir = $(this).find("span.area-info-list-l").text();
                        localStorage.subAreasIds = $(this).attr('subAreasIds');
                        localStorage.subAreasNames = $(this).attr('subAreasNames');
                        location.href = 'filterselectpos2.html';
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
