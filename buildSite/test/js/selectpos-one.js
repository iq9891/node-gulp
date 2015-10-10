/**
 * Created by ikang on 15-7-30.
 */
(function(){
    $(function(){
        $.ajax({
            type:'GET',
            url: config.Rurl+'api/v1/base/area/list',
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

                        $('.area-info-list').append('<li subNames="'+subNames+'" subAreas="'+subAreas+'" areaId="'+item.areaId+'"><span class="area-info-list-l">'+item.areaName+'</span><span class="area-info-list-r font-icon">n</span></li>');
                    });

                    $('ul.area-info-list > li').on('tap',function(){
                        localStorage.filterflaggrade=1;
//                        if(!!$(this).attr('areaId')){
//                            localStorage.areaId = $(this).attr('areaId');
//                        }
                        localStorage.areaId = $(this).attr('areaId');
                        localStorage.areaName = $(this).find("span.area-info-list-l").text();
                        localStorage.subNames = $(this).attr('subNames');
                        localStorage.subAreas = $(this).attr('subAreas');
                        location.href = 'selectpos-two.html';
                    });
                }
            },
            error: function(xhr, type){
                promptTips('请求提交失败，请重试');
            }
        });

    })
})()
