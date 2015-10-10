//(function(){
    $(function(){


        /*搜索按钮*/
        $('.btnsubmit').on('tap',function(){
            if($('#searchinput').val() != ''){
                localStorage.searchKeyWord = $('#searchinput').val();
                if(!!localStorage.searchKeylist){
                    localStorage.searchKeylist += (','+$('#searchinput').val());
                }else{
                    localStorage.searchKeylist = $('#searchinput').val();
                }
                $('#searchinput').val("");

                location.href = 'searchlist.html';
            }else{
                promptTips("请输入搜索关键词");
            }
        });

        //如果存在searchType,保留，不存在赋值为1
        if(!!localStorage.searchType){
            if(localStorage.searchType == 2){
                $('.doctor span').html("x");
                $('.hospital span').html("y");
                $('.doctor').removeClass("checked").addClass("nochecked");
                $(".hospital").removeClass("nochecked").addClass("checked");

            }
        }else{
            localStorage.searchType = 1;
        }

        /*1 医生 2 医院 */
        /*切换 搜索类型 选择 医生*/
        $('.doctor').on('tap',function(){
            $(this).find('span').html("y");
            $(this).removeClass("nochecked").addClass("checked");
            $('.hospital span').html("x");
            $('.hospital').removeClass("checked").addClass("nochecked");
            localStorage.searchType = '1';
        });

        /*切换 搜索类型 选择 医院*/
        $('.hospital').on('tap',function(){
            $(this).find('span').html("y");
            $(this).removeClass("nochecked").addClass("checked");
            $('.doctor span').html("x");
            $('.doctor').removeClass("checked").addClass("nochecked");
            localStorage.searchType = '2';
        });

        /*清空搜索记录*/
        /*version*/
        $('.historydelect').on('tap',function(){
            $('.historylist').html("");
            promptTips("搜索记录已清空");
            localStorage.searchKeylist = '';
        });
        /*生成搜索历史*/
        if(!!localStorage.searchKeylist){
            var arrList = localStorage.searchKeylist.split(',');
            var length = arrList.length;
            for(var i = length,j =0; j<5 && !!arrList[--i] ;j++){
                $('.historylist').append("<li class=\"fl ellipsis\" data-keywords='"+arrList[i]+"'>"+arrList[i]+"<span class=\"font-icon\">n</span></li>");
            }
            $('.historylist li').on('tap',function(e){
                localStorage.searchKeyWord = $(this).data('keywords');
                location.href = 'searchlist.html';
            });
        };
    });
//})();