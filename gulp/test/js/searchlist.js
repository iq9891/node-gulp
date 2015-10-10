(function(){
    $(function(){
        /*输入框获得焦点*/
        $('.head input').on('tap',function(){
            this.focus();
        });
        /*将search.html带到searchlist.html*/
        if(localStorage.searchKeyWord){
            $('.head input').val(localStorage.searchKeyWord);
        }
        /*判断搜索类型*/
        if(localStorage.searchType === '2'){
            $('.condition-l .condition-val').html("搜医院");
            $(".tapseldoc").find(".font-icon").addClass("hide");
            $(".tapselhos").find(".font-icon").removeClass("hide");
        }

        /*显示与隐藏*/
        $('.searchitem').on('tap',function(){
            $('.tapseldocwrap').removeClass('hide');
        });

        /*scroll*/
        var scroll;
        function loaded () {
            var testheight =  document.body.clientHeight - 45 - 37 + 'px';
            $('#scrollwrap').css({'height':testheight});
            scroll =  new IScroll('#scrollwrap',{freeScroll: true ,checkDOMChanges: true });
        }
        loaded();
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        setTimeout(function(){
            loaded();
        },500);
        /*选择医生与医院 data-value：1 医生 2 医院*/
        /*1 医生*/

        $('.tapseldoc').on('tap',function(){

            if($('.head input').val()==""){
                promptTips("请输入搜索关键词");
                $('.hospital').html('');
                $('.doctor').html('');
                return;
            }
            localStorage.searchKeyWord=$('.head input').val();
            localStorage.searchType = '1';
            $('.searchitem').data('value','1');
            $('.tapseldocwrap').addClass('hide');
            $('.condition-l .condition-val').text('搜医生');
            $(".tapselhos").find(".font-icon").addClass("hide");
            $(".tapseldoc").find(".font-icon").removeClass("hide");
            $('.hospital').html('');
            $('.hospital').addClass('hide');
            /*再搜索*/
            /*医生*/
            $.ajax({
                type:'GET',
                url: config.Rurl+'api/v1/search/query/doctor?key='+encodeURIComponent(localStorage.searchKeyWord),
                dataType: 'json',
                success: function(data){
                    //console.log(data)
                    if(data.code){
                        $('.doctor').removeClass('hide');
                        $('.doctor').html('');
//alert("12")
                        if(data.results.length == 0){
                            promptTips("当前搜索无结果");
                        }

                        $.each(data.results,function(index,item){
                            switch (item.regType){
                                case 1:
                                    /*可预约*/
                                    $('.doctor').append('<div class="doclist clearfix" hospId="'+item.hospId+'" departmentId="'+item.departmentId+'" doctorId="'+item.doctorId+'"><div class="doclist-l fl clearfix"><div class="docImg fl"><img src="'+item.doctorHeadImage+'" alt=""/></div><div class="docDetail fl"><p class="docName fs16"><span class="colortwo docname">'+item.doctorName+'</span><span class="colorone">'+item.doctorGrade+'</span></p><p class="doc fs14 colorone">'+item.hospName+'-'+item.departmentName+'</p><p class="doc fs14"><span class="colortwo">擅长：</span><span class="colorone">'+item.specialtydesc+'</span></p></div></div><div class="doclist-r fr textright"><span class="textcenter radius5 fs16 order">预约</span></div></div>');
                                    break;
                                case 2:
                                    /*约满*/
                                    $('.doctor').append('<div class="doclist clearfix" hospId="'+item.hospId+'" departmentId="'+item.departmentId+'" doctorId="'+item.doctorId+'"><div class="doclist-l fl clearfix"><div class="docImg fl"><img src="'+item.doctorHeadImage+'" alt=""/></div><div class="docDetail fl"><p class="docName fs16"><span class="colortwo docname">'+item.doctorName+'</span><span class="colorone">'+item.doctorGrade+'</span></p><p class="doc fs14 colorone">'+item.hospName+'-'+item.departmentName+'</p><p class="doc fs14"><span class="colortwo">擅长：</span><span class="colorone">'+item.specialtydesc+'</span></p></div></div><div class="doclist-r fr textright"><span class="textcenter radius5 fs16 full">约满</span></div></div>');
                                    break;
                                case 3:
                                    /*停诊*/
                                    $('.doctor').append('<div class="doclist clearfix" hospId="'+item.hospId+'" departmentId="'+item.departmentId+'" doctorId="'+item.doctorId+'"><div class="doclist-l fl clearfix"><div class="docImg fl"><img src="'+item.doctorHeadImage+'"alt=""/></div><div class="docDetail fl"><p class="docName fs16"><span class="colortwo docname">'+item.doctorName+'</span><span class="colorone">'+item.doctorGrade+'</span></p><p class="doc fs14 colorone">'+item.hospName+'-'+item.departmentName+'</p><p class="doc fs14"><span class="colortwo">擅长：</span><span class="colorone">'+item.specialtydesc+'</span></p></div></div><div class="doclist-r fr textright"><span class="textcenter radius5 fs16 full">停诊</span></div></div>');
                                    break;
                            };
                        });

                        scroll.refresh();

                        $('.docImg img').on('error',function(){
                            $(this).attr({"src":"imgs/defaultdoctor.jpg"});
                        });


                        //约满或者点击其他地方跳转医生详情
                        $(".doctor div").on('tap',function(e){
//                            if(!$(e.target).hasClass("order")){//防止tap冒泡
                                localStorage.hospId       = $(this).attr('hospId');
                                localStorage.departmentId = $(this).attr('departmentId');
                                localStorage.doctorId     = $(this).attr('doctorId');
                                location.href = 'docdetail.html';
//                            }
                        })
                        //预约 跳转预约页面
//                        $(".order").on('tap',function(){
//                            alert(1)
//
//                            //location.href = 'docdetail.html';
//                        })


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
        });
        /*2 医院*/

        $('.tapselhos').on('tap',function(){

            if($('.head input').val()==""){
                promptTips("请输入搜索关键词");
                $('.doctor').html('');
                $('.hospital').html('');
                return;
            }
            localStorage.searchKeyWord=$('.head input').val();
            localStorage.searchType = '2';
            $('.searchitem').data('value','2');
            $('.tapseldocwrap').addClass('hide');
            $('.condition-l .condition-val').text('搜医院');
            $(".tapseldoc").find(".font-icon").addClass("hide");
            $(".tapselhos").find(".font-icon").removeClass("hide");
            $('.doctor').html('');
            $('.doctor').addClass('hide');

            /*再搜索*/
            $.ajax({
                type:'GET',
                url: config.Rurl+'api/v1/search/query/hospital?key='+encodeURIComponent(localStorage.searchKeyWord),
                dataType: 'json',
                success: function(data){
                    //console.log(data);
                    if(data.code){

                        $('.hospital').removeClass('hide');
                        $('.hospital').html('');

                        if(data.results.length == 0){
                            promptTips("当前搜索无结果");
                        }

                        $.each(data.results,function(index,item){
                            $('.hospital').append('<div class="sectionlist clearfix" hospId="'+item.hospId+'"><div class="sectionlist-l fl clearfix"><div class="sectionImg fl"><img src="'+item.hospImage+'" alt=""/></div><div class="sectionDetail fl"><p class="sectionName fs16"><span class="colortwo sectionname">'+item.hospName+'</span></p><p class="section"><span class="level radius3 fs12 textcenter">'+item.hospGraded+'</span></p></div></div><div class="sectionlist-r fr textright"><span class="font-icon textcenter radius5 fs12">n</span></div></div>');
                        });
                        scroll.refresh();


                        $('.sectionImg img').on('error',function(){
                            $(this).attr({'src':'imgs/defaulthospital.jpg'});
                        });

                        $('.hospital > div').on('tap',function(){
                            localStorage.hospId = $(this).attr('hospId');
                            localStorage.hospName = $(this).find(".sectionname").text();
                            location.href = 'hospital-info-one.html';
                        });
                    }
                },
                error: function(xhr, type){
                    promptTips('请求提交失败，请重试');
                }
            });
        });

//        /*筛选页面跳转*/
        $('.condition-r').on('tap',function(){
            localStorage.filterflag = 1;
            localStorage.filterflaghospital=0;
            localStorage.filterflaggrade=0
            location.href = 'filter.html';
        });

//        /*搜索*/
        $(".searchlist-r > div").on('tap',function(){
            $('.tapseldocwrap').addClass('hide');
            if($('.head input').val()){
                localStorage.searchKeyWord = $('.head input').val()
                $('.doctor').html("");
                if(!$('.doctor').hasClass('hide')){
                    $('.doctor').addClass('hide');
                };
                $('.hospital').html("");
                if(!$('.hospital').hasClass('hide')){
                    $('.hospital').addClass('hide');
                };

                if(localStorage.searchType === '1'){
                    /*医生*/
                    $.ajax({
                        type:'GET',
                        url: config.Rurl+'api/v1/search/query/doctor?key='+encodeURIComponent(localStorage.searchKeyWord),
                        dataType: 'json',
                        success: function(data){
                            if(data.code){
                                //console.log(data);
                                $('.doctor').removeClass('hide');
                                $('.doctor').html('');

                                if(data.results.length == 0){
                                    promptTips("当前搜索无结果");
                                }

                                $.each(data.results,function(index,item){
                                    switch (item.regType){
                                        case 1:
                                            /*可预约*/
                                            $('.doctor').append('<div class="doclist clearfix" hospId="'+item.hospId+'" departmentId="'+item.departmentId+'" doctorId="'+item.doctorId+'"><div class="doclist-l fl clearfix"><div class="docImg fl"><img src="'+item.doctorHeadImage+'" alt=""/></div><div class="docDetail fl"><p class="docName fs16"><span class="colortwo docname">'+item.doctorName+'</span><span class="colorone">'+item.doctorGrade+'</span></p><p class="doc fs14 colorone">'+item.hospName+'-'+item.departmentName+'</p><p class="doc fs14"><span class="colortwo">擅长：</span><span class="colorone">'+item.specialtydesc+'</span></p></div></div><div class="doclist-r fr textright"><span class="textcenter radius5 fs16 order">预约</span></div></div>');
                                            break;
                                        case 2:
                                            /*约满*/
                                            $('.doctor').append('<div class="doclist clearfix" hospId="'+item.hospId+'" departmentId="'+item.departmentId+'" doctorId="'+item.doctorId+'"><div class="doclist-l fl clearfix"><div class="docImg fl"><img src="'+item.doctorHeadImage+'" alt=""/></div><div class="docDetail fl"><p class="docName fs16"><span class="colortwo docname">'+item.doctorName+'</span><span class="colorone">'+item.doctorGrade+'</span></p><p class="doc fs14 colorone">'+item.hospName+'-'+item.departmentName+'</p><p class="doc fs14"><span class="colortwo">擅长：</span><span class="colorone">'+item.specialtydesc+'</span></p></div></div><div class="doclist-r fr textright"><span class="textcenter radius5 fs16 full">约满</span></div></div>');
                                            break;
                                        case 3:
                                            /*停诊*/
                                            $('.doctor').append('<div class="doclist clearfix" hospId="'+item.hospId+'" departmentId="'+item.departmentId+'" doctorId="'+item.doctorId+'"><div class="doclist-l fl clearfix"><div class="docImg fl"><img src="'+item.doctorHeadImage+'"alt=""/></div><div class="docDetail fl"><p class="docName fs16"><span class="colortwo docname">'+item.doctorName+'</span><span class="colorone">'+item.doctorGrade+'</span></p><p class="doc fs14 colorone">'+item.hospName+'-'+item.departmentName+'</p><p class="doc fs14"><span class="colortwo">擅长：</span><span class="colorone">'+item.specialtydesc+'</span></p></div></div><div class="doclist-r fr textright"><span class="textcenter radius5 fs16 full">停诊</span></div></div>');
                                            break;
                                    };
                                });
                                scroll.refresh();

                                $('.docImg img').on('error',function(){
                                    $(this).attr({"src":"imgs/defaultdoctor.jpg"});
                                });


                                //约满或者点击其他地方跳转医生详情
                                $(".doctor div").on('tap',function(e){
//                                    if(!$(e.target).hasClass("order")){//防止tap冒泡
                                        localStorage.hospId       = $(this).attr('hospId');
                                        localStorage.departmentId = $(this).attr('departmentId');
                                        localStorage.doctorId     = $(this).attr('doctorId');
                                        location.href = 'docdetail.html';
//                                    }
                                })
                                //预约 跳转预约页面
//                                $(".order").on('tap',function(){
//                                    alert(1)
//
//                                    //location.href = 'docdetail.html';
//                                })
                            }
                        },
                        error: function(xhr, type){
                            promptTips('请求提交失败，请重试');
                        }
                    });
                }else{
                    /*医院*/
                    $.ajax({
                        type:'GET',
                        url: config.Rurl+'api/v1/search/query/hospital?key='+encodeURIComponent(localStorage.searchKeyWord),
                        dataType: 'json',
                        success: function(data){
                            if(data.code){
                                //console.log(data);
                                $('.hospital').removeClass('hide');
                                $('.hospital').html('');
                                $('.doctor').addClass('hide');

                                if(data.results.length == 0){
                                    promptTips("当前搜索无结果");
                                }

                                $.each(data.results,function(index,item){
                                    $('.hospital').append('<div class="sectionlist clearfix" hospId="'+item.hospId+'"><div class="sectionlist-l fl clearfix"><div class="sectionImg fl"><img src="'+item.hospImage+'" alt=""/></div><div class="sectionDetail fl"><p class="sectionName fs16"><span class="colortwo sectionname">'+item.hospName+'</span></p><p class="section"><span class="level radius3 fs12 textcenter">'+item.hospGraded+'</span></p></div></div><div class="sectionlist-r fr textright"><span class="font-icon textcenter radius5 fs12">n</span></div></div>');
                                });
                                scroll.refresh();

                                $('.sectionImg img').on('error',function(){
                                    $(this).attr({'src':'imgs/defaulthospital.jpg'});
                                });

                                $('.hospital > div').on('tap',function(){
                                    localStorage.hospId = $(this).attr('hospId');
                                    localStorage.hospName = $(this).find(".sectionname").text();
                                    location.href = 'hospital-info-one.html';
                                });
                            }
                        },
                        error: function(xhr, type){
                            promptTips('请求提交失败，请重试');
                        }
                    });
                }
            }else{
                promptTips("请输入搜索关键词");
            }
        });


//        /*有筛选条件*/
        if(localStorage.filterswitch === '1'){
            localStorage.filterswitch=0;
            /*医生*/
            if(localStorage.searchType==='1'){
                localStorage.filterareaId = !!localStorage.filterareaId ? localStorage.filterareaId : '';
                localStorage.filterhospId = !!localStorage.filterhospId ? localStorage.filterhospId : '';
                $.ajax({
                    type:'GET',
                    url: config.Rurl+'api/v1/search/query/doctor?key='+encodeURIComponent(localStorage.searchKeyWord)+'&areaId='+localStorage.filterareaId+'&hospId='+localStorage.filterhospId,
                    dataType: 'json',
                    success: function(data){
                        if(data.code){
                            $('.doctor').removeClass('hide');
                            $('.doctor').html('');
                            //console.log(data);
                            if(data.results.length == 0){
                                promptTips("当前搜索无结果");
                            }
//                            localStorage.removeItem(filterareaId);
//                            localStorage.removeItem(filterhospId);
                            $.each(data.results,function(index,item){
                                switch (item.regType){
                                    case 1:
                                        /*可预约*/
                                        $('.doctor').append('<div class="doclist clearfix" hospId="'+item.hospId+'" departmentId="'+item.departmentId+'" doctorId="'+item.doctorId+'"><div class="doclist-l fl clearfix"><div class="docImg fl"><img src="'+item.doctorHeadImage+'" alt=""/></div><div class="docDetail fl"><p class="docName fs16"><span class="colortwo docname">'+item.doctorName+'</span><span class="colorone">'+item.doctorGrade+'</span></p><p class="doc fs14 colorone">'+item.hospName+'-'+item.departmentName+'</p><p class="doc fs14"><span class="colortwo">擅长：</span><span class="colorone">'+item.specialtydesc+'</span></p></div></div><div class="doclist-r fr textright"><span class="textcenter radius5 fs16 order">预约</span></div></div>');
                                        break;
                                    case 2:
                                        /*约满*/
                                        $('.doctor').append('<div class="doclist clearfix" hospId="'+item.hospId+'" departmentId="'+item.departmentId+'" doctorId="'+item.doctorId+'"><div class="doclist-l fl clearfix"><div class="docImg fl"><img src="'+item.doctorHeadImage+'" alt=""/></div><div class="docDetail fl"><p class="docName fs16"><span class="colortwo docname">'+item.doctorName+'</span><span class="colorone">'+item.doctorGrade+'</span></p><p class="doc fs14 colorone">'+item.hospName+'-'+item.departmentName+'</p><p class="doc fs14"><span class="colortwo">擅长：</span><span class="colorone">'+item.specialtydesc+'</span></p></div></div><div class="doclist-r fr textright"><span class="textcenter radius5 fs16 full">约满</span></div></div>');
                                        break;
                                    case 3:
                                        /*停诊*/
                                        $('.doctor').append('<div class="doclist clearfix" hospId="'+item.hospId+'" departmentId="'+item.departmentId+'" doctorId="'+item.doctorId+'"><div class="doclist-l fl clearfix"><div class="docImg fl"><img src="'+item.doctorHeadImage+'"alt=""/></div><div class="docDetail fl"><p class="docName fs16"><span class="colortwo docname">'+item.doctorName+'</span><span class="colorone">'+item.doctorGrade+'</span></p><p class="doc fs14 colorone">'+item.hospName+'-'+item.departmentName+'</p><p class="doc fs14"><span class="colortwo">擅长：</span><span class="colorone">'+item.specialtydesc+'</span></p></div></div><div class="doclist-r fr textright"><span class="textcenter radius5 fs16 full">停诊</span></div></div>');
                                        break;
                                };
                            });
                            scroll.refresh();

                            $('.docImg img').on('error',function(){
                                $(this).attr({"src":"imgs/defaultdoctor.jpg"});
                            });



                            //约满或者点击其他地方跳转医生详情
                            $(".doctor div").on('tap',function(e){
//                                if(!$(e.target).hasClass("order")){//防止tap冒泡
                                    localStorage.hospId       = $(this).attr('hospId');
                                    localStorage.departmentId = $(this).attr('departmentId');
                                    localStorage.doctorId     = $(this).attr('doctorId');
                                    location.href = 'docdetail.html';
//                                }
                            })
                            //预约 跳转预约页面
//                            $(".order").on('tap',function(){
//                                alert(1)
//
//                                //location.href = 'docdetail.html';
//                            })
                        }
                    },
                    error: function(xhr, type){
                        promptTips('请求提交失败，请重试');
                    }
                });
            }else{
            /*医院*/
                localStorage.filterareaId = !!localStorage.filterareaId ? localStorage.filterareaId : '';
                localStorage.filtergradedId = !!localStorage.filtergradedId ? localStorage.filtergradedId : '';
                $.ajax({
                    type:'GET',
                    url: config.Rurl+'api/v1/search/query/hospital?key='+encodeURIComponent(localStorage.searchKeyWord)+'&areaId='+encodeURIComponent(localStorage.filterareaId)+'&gradedId='+encodeURIComponent(localStorage.filtergradedId),
                    dataType: 'json',
                    success: function(data){
                        if(data.code){
                            //console.log(data);
                            $('.hospital').removeClass('hide');
                            $('.hospital').html('');
                            $('.doctor').addClass('hide');

                            if(data.results.length == 0){
                                promptTips("当前搜索无结果");
                            }
//                            localStorage.removeItem(filterareaId);
//                            localStorage.removeItem(filtergradedId);
                            $.each(data.results,function(index,item){
                                $('.hospital').append('<div class="sectionlist clearfix" hospId="'+item.hospId+'"><div class="sectionlist-l fl clearfix"><div class="sectionImg fl"><img src="'+item.hospImage+'" alt=""/></div><div class="sectionDetail fl"><p class="sectionName fs16"><span class="colortwo sectionname">'+item.hospName+'</span></p><p class="section"><span class="level radius3 fs12 textcenter">'+item.hospGraded+'</span></p></div></div><div class="sectionlist-r fr textright"><span class="font-icon textcenter radius5 fs12">n</span></div></div>');
                            });
                            scroll.refresh();

                            $('.sectionImg img').on('error',function(){
                                $(this).attr({'src':'imgs/defaulthospital.jpg'});
                            });

                            $('.hospital > div').on('tap',function(){
                                localStorage.hospId = $(this).attr('hospId');
                                localStorage.hospName = $(this).find(".sectionname").text();
                                location.href = 'hospital-info-one.html';
                            });
                        }
                    },
                    error: function(xhr, type){
                        promptTips('请求提交失败，请重试');
                    }
                });
            }

        }else{
            /*search跳转*/
            $(".searchlist-r > div").trigger("tap");
        }

    });
})();