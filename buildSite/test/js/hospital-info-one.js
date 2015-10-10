(function(){
    $(function(){
        /*阻止默认事件*/
        document.body.addEventListener("touchstart", function(event) {
            event.preventDefault();
        },false);
        document.body.addEventListener("touchmove", function(event) {
            event.preventDefault();
        },false);

        $('.hospital-name h3').html(localStorage.hospName);


        /*scroll*/
        var indexscroll;
        function loaded() {
            var testheight = localStorage.viewHeight - $(".hospital-name").height() + 'px';
            $('#hospital-info-content').css({'height':testheight});
            indexscroll  =  new IScroll('#hospital-info-content', {freeScroll: true, checkDOMChanges: true });
        }
        loaded();


        if(localStorage.unloginUrl == "disease_guide_deplist.html"||localStorage.unloginUrl == "dis_gu_result.html"||localStorage.unloginUrl == "depart_list.html"){
            /*获取科室列表*/
            $.ajax({
                type:'GET',
                url: config.Rurl + 'api/v1/base/department/list/'+localStorage.hospId+'?standardDepartmentId='+localStorage.standdeparmentId,
                dataType: 'json',
				async:false,
                contentType: "application/json",
                success: function(data){
                    var html = '';
					
					if(data.results.length){
						for(var i=0;i<data.results.length;i++){
							html += '<li departmentId="'+data.results[i].departmentId+'" idx="'+i+'"><span class="hospital-info-list-l">'+data.results[i].departmentName+'</span><span class="hospital-info-list-r font-icon">n</span></li>';
						}
						$(".hospital-info-list").html(html);
					}else{
						promptTips('暂无相关信息');
						return;
					}

                    indexscroll.refresh();
                    $(".hospital-info-list li").on('tap',function(){
                        var idx = $(this).attr('idx');
                        localStorage.firstdepartmentId  = $(this).attr('departmentId');
                        localStorage.firstdepartmentName = $(this).find('.hospital-info-list-l').text();
                        // console.log(data.results[idx].subDepartments);
                        if(data.results[idx].subDepartments.length===0){
                            promptTips('此科室没有二级科室');
                            return;
                        }
                        localStorage.subDepartments = JSON.stringify(data.results[idx].subDepartments);
                        location.href = 'hospital-info-two.html';
                    });

                },error: function(xhr, type,error){
					if(localStorage.getItem("ajaxError")){
						promptTips("请求超时，请刷新页面！");
					}else{
						localStorage.setItem("ajaxError",true);
						location.reload(true);
					}
                }
            });



        }else{
            /*获取科室列表*/
            $.ajax({
                    type:'GET',
                    url: config.Rurl + 'api/v1/base/department/list/'+localStorage.hospId,
                    dataType: 'json',
					async:false,
                    contentType: "application/json",
                    success: function(data){
                        var html = '';
                        for(var i=0;i<data.results.length;i++){
                            html += '<li departmentId="'+data.results[i].departmentId+'" idx="'+i+'"><span class="hospital-info-list-l">'+data.results[i].departmentName+'</span><span class="hospital-info-list-r font-icon">n</span></li>';
                        }
                        $(".hospital-info-list").html(html);

                        indexscroll.refresh();
                        $(".hospital-info-list li").on('tap',function(){
                            var idx = $(this).attr('idx');
                            localStorage.firstdepartmentId  = $(this).attr('departmentId');
                            localStorage.firstdepartmentName = $(this).find('.hospital-info-list-l').text();
                            // console.log(data.results[idx].subDepartments);
                            if(data.results[idx].subDepartments.length===0){
                                promptTips('此科室没有二级科室');
                                return;
                            }
                            localStorage.subDepartments = JSON.stringify(data.results[idx].subDepartments);
                            location.href = 'hospital-info-two.html';
                        });

                    },error: function(xhr, type){
						if(localStorage.getItem("ajaxError")){
							promptTips("请求超时，请刷新页面！");
						}else{
							localStorage.setItem("ajaxError",true);
							location.reload(true);
						}
                    }
            });
        }
    });
/*end*/
})();



