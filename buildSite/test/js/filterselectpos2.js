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

        var subAreasIdsArr=localStorage.subAreasIds.trim().split(" ");
        var subNamesArr=localStorage.subAreasNames.trim().split(" ");
        //console.log(subAreasIdsArr,subNamesArr);
        for(var i=0;i<subAreasIdsArr.length;i++){
            $('ul.area-info-list').append('<li  filterareaId="'+subAreasIdsArr[i]+'"><span class="area-info-list-l">'+subNamesArr[i]+'</span><span class="area-info-list-r font-icon textright hide">A</span></li>');
        }
        scroll.refresh();
        $(".area-info .area-info-other-color").eq(0).text(localStorage.areaNameFir);

        $(".area-info .area-info-other-color.area-info-r").on('tap',function(){
            localStorage.removeItem("subAreasIds");
            localStorage.removeItem("subAreasNames");
            location.href = 'filterselectpos.html';
        })
        $('ul.area-info-list > li').on('tap',function(){
            if($(this).find("span.area-info-list-l").text()!="不限"){
                localStorage.filterareaId = $(this).attr('filterareaId');
            }
            localStorage.areaNameSec = $(this).find("span.area-info-list-l").text();
            localStorage.filterflag=2;
            location.href = 'filter.html';
        });
    })
})()
