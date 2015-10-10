(function(){
    $(function(){

        ///*阻止默认滚动事件*/
        //document.body.addEventListener("touchstart", function(event) {
        //    event.preventDefault();
        //},false);
        document.body.addEventListener("touchmove", function(event) {
            event.preventDefault();
        },false);

        var orderinfo = JSON.parse(localStorage.orderresinfo);
        //填充预约数据
        $("#hospName").html(orderinfo.hospName);
        $("#doctorName").html(orderinfo.doctorName);
        $("#resourceDateView").html(orderinfo.resourceDateView +' ' + (orderinfo.timespanDesc?orderinfo.timespanDesc:''));
        $("#resourceTpyeText").html(orderinfo.resourceTpyeText);
        $("#expenseText").html(orderinfo.expenseText);
        //切换初诊复诊
        $("span[name=isFirstVisit]").on("tap",function(){
            $(this).find(".font-icon").html("y");
            $(this).addClass("checked");
            $(this).siblings().find(".font-icon").html("x");
            $(this).siblings().removeClass("checked");
        })

        //之前填写过社保卡号就用之前的
        var medicareNumber = !!localStorage.medicareNumber ? localStorage.medicareNumber : '';
        //切换就诊类型
        $("span[name=medicareNumber]").on("tap",function(){
            $(this).find(".font-icon").html("y");
            $(this).addClass("checked");
            $(this).siblings().find(".font-icon").html("x");
            $(this).siblings().removeClass("checked");
            if($(this).attr("val")== 1){
                $("#medicareNumber input").attr("placeholder","请输入社保卡号").val(medicareNumber).removeAttr("readonly");
                $('#medicareNumber input')[0].focus();
            }else if($(this).attr("val")== 2){
                $("#medicareNumber input").attr("placeholder","请输入就诊卡号").val("").removeAttr("readonly");
                $('#medicareNumber input')[0].focus();
            }else if($(this).attr("val")== 3){
                $("#medicareNumber input").attr("placeholder","自费出诊，无法使用医保卡取号。").val("").attr("readonly","readonly");
            }
        })

        /*社保卡获取焦点*/
        $('#medicareNumber input').on('tap',function(){
            this.focused=true;
        });

        /*判断是否需要填写第三方信息*/
        var thirdparty = {}
        var thirdCardNumber = '';
        var thirdCardPassword ='';
        if(orderinfo.hospConfig){
            $('.thirdparty').removeClass('hide');
            thirdparty = JSON.parse(orderinfo.hospConfig);

            //console.log(thirdparty.NotNull.length);

            if(thirdparty.NotNull.length == 1){
                $('.thirdpartynumberwarp').css({"display":"block"});
                /*卡号*/
                $('.thirdpartynumberwarp').on('tap',function(){
                    $('.thirdpartynumberwarp input').focus();
                });

                $('.thirdpartynumberwarp input').on('blur',function(){
                    if($(this).val() == ''){
                        promptTips("卡号不能为空");
                        $(this).focus();
                    }else{
                        thirdCardNumber = $(this).val();
                    }
                });

            }else{

                $('.thirdpartynumberwarp').css({"display":"block"});
                $('.thirdpartypasswarp').css({"display":"block"});

                /*卡号*/
                $('.thirdpartynumberwarp').on('tap',function(){
                    $('.thirdpartynumberwarp input').focus();
                });

                $('.thirdpartynumberwarp input').on('blur',function(){
                    if($(this).val() == ''){
                        promptTips("卡号不能为空");
                        $(this).focus();
                    }else{
                        thirdCardNumber = $(this).val();
                    }
                });

                /*密码*/
                $('.thirdpartypasswarp').on('tap',function(){
                    $('.thirdpartypasswarp input').focus();
                });

                $('.thirdpartypasswarp input').on('blur',function(){
                    if($(this).val() == ''){
                        promptTips("密码不能为空");
                        $(this).focus();
                    }else{

                        thirdCardPassword = $(this).val();
                    }
                });
            }

        }








        /*就诊人*/
        if(localStorage.cilentswitch){
            $('#patientName').html(localStorage.patientName+"<span class='font-icon fr goto textright fs12'>n</span>");
            $('#medicareNumber input').val(medicareNumber);
            $('.patientName').on('tap',function(){
                location.href = 'clients.html';
            });
            localStorage.cilentswitch =  0;
        }else{
            /*获取自己就诊人*/
            $.ajax({
                type:'GET',
                url: config.Rurl+'api/v1/register/patient/getSelf/'+localStorage.userId,
                headers:{"pavoid":localStorage.pavoid},
                dataType: 'json',
                contentType: "application/json",
                success: function(data){
                    if(data.code == 1){
                        /*console.log(data)*/
                        medicareNumber = !!data.results.medicareNumber ? data.results.medicareNumber : '';
                        $('#patientName').html(data.results.name+"<span class='font-icon fr goto textright fs12'>n</span>");
                        $('#medicareNumber input').val(medicareNumber);
                        localStorage.patientId = data.results.patientId;
                        $('.patientName').on('tap',function(){
                            location.href = 'clients.html';
                        });
                    }else{
                        if(data.code == 100){
                            localStorage.unloginUrl = "orderinfo.html";
                            location.href = 'login.html';
                        };
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
        }


        /*真正提交预约*/
        // 避免多次提交
        var realsubmit = 0;

        $('.btnsubmit').on('tap',function(){
            if(realsubmit == 0){
                /*补充提交订单需要信息*/
                var medicareCardType = 1 ;
                var medicareNumber   = '';
                var isFirstVisit     = 1 ;
                var sendEmail        = 0 ;
                var email            = '';
                var patientId        = localStorage.patientId;

                /*判断卡的类型*/
                medicareCardType = $("span[name=medicareNumber].checked").attr("val");
                medicareNumber = $("#medicareNumber input").val();

                /*判断初复诊*/
                isFirstVisit = $("span[name=isFirstVisit].checked").attr("val");



                var Jsonorderresinfo = JSON.parse(localStorage.orderresinfo);
                Jsonorderresinfo["isFirstVisit"]     = isFirstVisit;
                Jsonorderresinfo["patientId"]        = localStorage.patientId;
                Jsonorderresinfo["medicareCardType"] = medicareCardType;
                Jsonorderresinfo["medicareNumber"]   = medicareNumber;
                Jsonorderresinfo["diagnosisDate"]    =Jsonorderresinfo["resourceDate"];

                /*第三方平台卡号 密码*/
                Jsonorderresinfo["thirdCardNumber"]  = thirdCardNumber;
                Jsonorderresinfo["thirdCardPassword"]= thirdCardPassword;

                realsubmit++;
                $('.btnsubmit').html("正在为您预约，请稍后");
                $('.btnsubmit').css('background-color', '#7b7e7d');

                /*申请预约*/
                $.ajax({
                    type:'POST',
                    url: config.Rurl+'api/v1/register/order/registration/'+localStorage.userId,
                    headers:{"pavoid":localStorage.pavoid},
                    dataType: 'json',
                    data:JSON.stringify(Jsonorderresinfo),
                    contentType: "application/json",
                    success: function(data){
                        if(data.code == 1){
                            localStorage.ordersuccess = JSON.stringify(data.results);
                            location.href = 'ordersuccess.html';
                        }else{
                            if(data.code == 201){
                                promptTips(data.message);
                                $('.btnsubmit').html("确认预约");
                                $('.btnsubmit').css({"background-color":"#ff6a30","color":"#ffffff"});
                            }else{
                                if(data.code == 202){
                                    promptTips(data.message);
                                    $('.btnsubmit').html("确认预约");
                                    $('.btnsubmit').css({"background-color":"#ff6a30","color":"#ffffff"});
                                }else{
                                    if(data.code == 203){
                                        promptTips(data.message);
                                        $('.btnsubmit').html("确认预约");
                                        $('.btnsubmit').css({"background-color":"#ff6a30","color":"#ffffff"});
                                    }else{
                                        if(data.code == 204){
                                            promptTips(data.message);
                                            $('.btnsubmit').html("确认预约");
                                            $('.btnsubmit').css({"background-color":"#ff6a30","color":"#ffffff"});
                                        }else{
                                            if (data.code == 205) {
                                                promptTips(data.message);
                                                $('.btnsubmit').html("确认预约");
                                                $('.btnsubmit').css({"background-color":"#ff6a30","color":"#ffffff"});
                                            }else{
                                                if (data.code == 301 ) {
                                                    promptTips(data.message);


                                                }else{
                                                    if(data.code == 206){
                                                        promptTips(data.message);
                                                        $('.btnsubmit').html("确认预约");
                                                        $('.btnsubmit').css({"background-color":"#ff6a30","color":"#ffffff"});
                                                    }else{
                                                        if(data.code == 3001 || data.code == 3000){
                                                            var locationpage = data.message.match(/\/\w+.html$/)[0].substring(1);
                                                            location.href = locationpage;
                                                        }else{
                                                            promptTips(data.message);
                                                            $('.btnsubmit').html("确认预约");
                                                            ('.btnsubmit').css({"background-color":"#ff6a30","color":"#ffffff"});
                                                        }
                                                    }
                                                };
                                            };
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
            }else{
                promptTips("请不要频繁提交！");
            }
        });

        /*滚动*/
        var scroll;
        function loaded () {
            var testheight = localStorage.viewHeight - $(".orderinfo-f").height()+ 'px';
            $('#scrollwrap').css({'height':testheight});
            scroll =  new IScroll('#scrollwrap',{freeScroll: true ,checkDOMChanges: true });
        }
        loaded();
        //加延迟是为了避免body计算错误
        setTimeout(function(){
            loaded();
        },500);


    });
/*end*/
})();



