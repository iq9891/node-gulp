(function(){
    $(function(){
        /*阻止默认事件*/
        document.body.addEventListener("touchstart", function(event) {
            event.preventDefault();
        },false);
        document.body.addEventListener("touchmove", function(event) {
            event.preventDefault();
        },false);

        /*地区选择*/
        if(localStorage.areaId){
            $('.selectcity').html(localStorage.areaName+'<span class=\"font-icon\">k</span>');
            $('.selectcity').attr({'areaId':localStorage.areaId});
        }else{
            localStorage.prevUrl  = 'index.html';
            localStorage.areaId   = '0';
            localStorage.areaName = '全国';
            localStorage.oldareaName = '全国';
        };

        /*比较area 是否改变*/
        if(localStorage.areaNamechange == 1){
            localStorage.areaNamechange = 0;
            $('.hosnametext').html("请选择医院");
            $('.hosnametext').css({"color":"#b7b7b7"});
            $('.sectionnametext').html("请选择科室");
            $('.sectionnametext').css({"color":"#b7b7b7"});
            
            localStorage.hospName = '';
            localStorage.departmentName = '';
        }


        /*历史医院*/
        if(localStorage.hospName){
            $('.hosnametext').html(localStorage.hospName);
            $('.hosnametext').css({"color":"#14b7c3"});

        }
        /*科室名字*/
        if (localStorage.departmentName) {
            $('.sectionnametext').html(localStorage.departmentName);
            $('.sectionnametext').css({"color":"#15b6c3"});
        };

        /*scroll*/
        var indexscroll;
        function loaded() {
            var testheight = localStorage.viewHeight - 137 + 'px';
            $('#middlewrap').css({'height':testheight});
            indexscroll  =  new IScroll('#middlewrap', {freeScroll: true, checkDOMChanges: true });
        }
        loaded();

        /*跳转到地区选择*/
        $('.selectcity').on('tap',function(){
            localStorage.unloginUrl = "index.html";
            localStorage.oldareaName = localStorage.areaName;
            location.href = 'selectpos-one.html';
        });

        /*跳转到搜索页面*/
        $('.search').on('tap',function(){
            localStorage.filterswitch = 0;
            location.href = 'search.html';
        });

        /*选择医院*/
        $('.selecthos').on('tap',function(){
            location.href = 'section_1.html';
        });


        /*选择科室*/
        $('.selectsection').on('tap',function(){
            if(localStorage.hospName){
                location.href = 'hospital-info-one.html';
            }else{
                location.href = 'section_1.html';
            }
        });

        /*挂号直达*/
        $('.selectbtnsubmit').on('tap',function(){
            if(localStorage.hospName && (localStorage.departmentId == undefined)){
                location.href = 'hospital-info-one.html';
            }else{
                if(localStorage.hospName && localStorage.departmentId){
                    location.href = 'doclist.html';
                }else{
                    location.href = 'section_1.html';
                }
            }
        });

        /*挂号导诊*/
        $('.disguider').on('tap',function(){
            location.href = 'orderguide.html';
        });

        /*我的预约*/
        $('.myorder').on('tap',function(){
            location.href = 'myorder.html';
        });

        
    })
})();
