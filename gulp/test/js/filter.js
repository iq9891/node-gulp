(function(){
    $(function(){

        if(localStorage.filterflag ==='2'){
            if(localStorage.areaNameSec=="不限"){
                $("span.area-names").html(localStorage.areaNameFir);
            }else{
                $("span.area-names").html(localStorage.areaNameFir+"-"+localStorage.areaNameSec);
            }
        }else{
//            删除地区和医院
            if(!!localStorage.filterareaId){
                localStorage.removeItem("filterareaId");
            }

        }
//            搜索医生后筛选医院
        if(localStorage.filterflaghospital ==='1'){
            $("span.hospital-name").html(localStorage.hospName);
        }else{
            localStorage.removeItem("filterflaghospital");
            localStorage.removeItem("hospName");
            localStorage.removeItem("filterhospId");
        }
 //            搜索医院筛选医院等级
        if(localStorage.filterflaggrade==='1'){
            $("span.hospital-name").html(localStorage.gradedName);
        }else{
            localStorage.removeItem("filterflaggrade");
            localStorage.removeItem("gradedName");
            localStorage.removeItem("filtergradedId");
        }

        /*确定筛选按钮*/
        $(".filterBtn").on("tap",function(){
//            localStorage.removeItem("filterflag");
//            localStorage.removeItem("filterflaghospital");
//            localStorage.removeItem("areaNameFir");
//            localStorage.removeItem("areaNameSec");
            localStorage.filterflag=1;

            localStorage.filterflaggrade=0;
            localStorage.filterflaghospital=0;

            localStorage.filterswitch=1;

            location.href='searchlist.html';
        })
        /*选择地区*/
        if(localStorage.searchType === '1'){
            $('.area').on('tap',function(){
                location.href = 'filterselectpos.html';
            });

            /*选择医院*/
            $('.hospital').on('tap',function(){
                location.href = 'filterhospital.html';
            });
        }

        if(localStorage.searchType === '2'){
            $('.area').on('tap',function(){
                location.href = 'filterselectpos.html';
            });
            /*选择医院等级*/
            $('.hospital').on('tap',function(){
//                localStorage.filterswitch = 1;
                location.href = 'grade.html';
            });
        }

    });
})();