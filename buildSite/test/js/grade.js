/**
 * Created by ikang on 15-7-30.
 */
(function(){
    $(function(){
        $.ajax({
            type:'GET',
            url: config.Rurl+'api/v1/search/query/filterGraded/hospital?key='+encodeURIComponent(localStorage.searchKeyWord),
            dataType: 'json',
            success: function(data){
                //console.log(data);
                if(data.code){

                    if(data.results.length == 0){
                        promptTips("当前搜索无结果");
                    }

                    $.each(data.results,function(index,item){
                        if(!!item.gradedName){
                            $('.gradewrap').append('<div filtergradedId="'+item.gradedId+'" gradedName="'+item.gradedName+'">'+item.gradedName+'<span class="font-icon fs18 fr hide">A</span></div>');

                        }
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

        $('div.gradewrap > div').live('tap',function(){
            localStorage.filterflaggrade=1;
            if(!!$(this).attr('filtergradedId')){
                localStorage.filtergradedId = $(this).attr('filtergradedId');
            }
            localStorage.gradedName = $(this).attr('gradedName');
            location.href = 'filter.html';
        });

    })
})()
