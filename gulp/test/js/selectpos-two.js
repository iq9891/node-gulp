/**
 * Created by ikang on 15-7-30.
 */
(function(){
    $(function(){
        /*scroll*/
        var scroll;
        function loaded () {
            var testheight = document.body.clientHeight - 36  + 'px';
            $('#areawrap').css({'height':testheight});
            scroll =  new IScroll('#areawrap',{freeScroll: true ,checkDOMChanges: true });
        }
        loaded();
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);


        $(".area-info-other-color").eq(0).text(localStorage.areaName);

        $(".area-info-other-color").eq(1).on('tap',function(){
            localStorage.removeItem("subNames");
            localStorage.removeItem("subAreas");
            localStorage.removeItem("areaId");
            localStorage.removeItem("areaName");
            location.href = 'selectpos-one.html';
        })


        var subAreas=localStorage.subAreas.trim().split(" ");
        var subNames=localStorage.subNames.trim().split(" ");
        //console.log(subAreas,subNames);
        for(var i=0;i<subAreas.length;i++){
            $('ul.area-info-list').append('<li  areaId="'+subAreas[i]+'"><span class="area-info-list-l">'+subNames[i]+'</span><span class="area-info-list-r font-icon textright">n</span></li>');
        }
        scroll.refresh();

        $('ul.area-info-list > li').on('tap',function(){

            if($(this).find("span.area-info-list-l").text()!="不限"){
                localStorage.areaId = $(this).attr('areaId');
                localStorage.areaName = $(this).find("span.area-info-list-l").text();
            }
            if(!!localStorage.unloginUrl){
				localStorage.hospName = '';
				localStorage.departmentName = '';
                location.href = localStorage.unloginUrl;
            }else{
				localStorage.hospName = '';
				localStorage.departmentName = '';
                location.href = 'index.html';
            }

        });



    })
})()
