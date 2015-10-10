(function() {
    $(function() {
        /*阻止默认滚动事件*/

        /*返回*/
        // $('.returnicon').on('tap',function(){
        //     //localStorage.mycountclient = 0 ;
        //     var temp = localStorage.prevUrl.split(',');
        //     location.href = temp.pop();
        //     localStorage.prevUrl = temp.join(',');
        // });

        /*阻止默认事件*/
        /*document.body.addEventListener("touchstart", function(event) {
          event.preventDefault();
        },false);
        document.body.addEventListener("touchmove", function(event) {
          event.preventDefault();
        },false);*/

        /*姓名*/
        /*$('.userrealname  input').on('tap',function(){
            $(this).focus();
        });*/

        $('.userrealname  input').on('blur', function() {
            if (!validator.notBlank($(this).val())) {
                promptTips('姓名不能为空');
                return;
            }
        });

        /*身份证*/
        /*$('.userident  input').on('tap',function(){
            $(this).focus();
        });*/

        $('.userident  input').on('blur', function() {
            if (!validator.isIdCardNo($(this).val())) {
                promptTips('您输入的身份证号有误');
                return;
            }
        });

        /*手机号*/
        /*$('.userphone  input').on('tap',function(){
            $(this).focus();
        });*/

        $('.userphone  input').on('blur', function() {
            if (!validator.mobile($(this).val())) {
                promptTips('您输入的手机号有误');
                return;
            }
        });

        /*用户名*/
        /*$('.username  input').on('tap',function(){
            $(this).focus();
        });*/

        $('.username  input').on('blur', function() {
            if (!validator.notBlank($(this).val())) {
                promptTips('用户名不能为空');
                return;
            }
        });

        /*密码*/
        /*$('.userpassword  input').on('tap',function(){
            $(this).focus();
        });*/

        $('.userpassword  input').on('blur', function() {
            if (!validator.notBlank($(this).val())) {
                promptTips('密码不能为空');
                return;
            }
        });

        /*提交*/
        var submitflag = 0;
        

        $('.btnsubmit').on('tap', function() {
            var postdata = {
                name: $('.userrealname  input').val(),
                username: $('.username  input').val(),
                idNumber: $('.userident  input').val(),
                password: $('.userpassword  input').val(),
                phone: $('.userphone  input').val()
            };

            if(!postdata.name) {
                promptTips("请输入姓名");
                return;
            } else {
                if (!postdata.idNumber) {
                    promptTips("请输入身份证号");
                    return;
                } else {
                    if (!postdata.phone) {
                        
                        promptTips("请输入手机号");
                        return;
                    } else {
                        if (!postdata.username) {
                            promptTips("请输入卡号");
                            return;
                        } else {
                            if (!postdata.password) {
                                promptTips("请输入密码");
                                return;
                            } else {
                                if (submitflag == 0) {
                                    submitflag++;
                                    $(this).html("正在为您绑定，请稍后");
                                    $(this).css('background-color', '#7b7e7d');

                                    $.ajax({
                                        type: 'POST',
                                        url: 'http://api.uat.daoyitong.com/api/v1/user/thirdpart/saveThirdPartyAccount?pavoid='+ localStorage.pavoid,
                                        dataType: 'json',
                                        data: JSON.stringify(postdata),
                                        contentType: "application/json",
                                        success: function(data) {
                                            if (data.code == 1) {

                                                location.href = 'orderinfo.html';

                                            } else {
                                                switch (data.code) {
                                                    case 3102:
                                                        promptTips("身份证号或密码错误");
                                                        submitflag = 0;
                                                        $('.btnsubmit').html("立即绑定").css({
                                                            "color": "white",
                                                            "background-color": "#ff6a30"
                                                        });
                                                        break;
                                                    case 3103:
                                                        promptTips("手动绑定失败");
                                                        submitflag = 0;
                                                        $('.btnsubmit').html("立即绑定").css({
                                                            "color": "white",
                                                            "background-color": "#ff6a30"
                                                        });
                                                        break;
                                                    case 3104:
                                                        promptTips("手动绑定失败，用户信息保存异常");
                                                        submitflag = 0;
                                                        $('.btnsubmit').html("立即绑定").css({
                                                            "color": "white",
                                                            "background-color": "#ff6a30"
                                                        });
                                                        break;
                                                    case 3105:
                                                        promptTips("手动绑定失败，用户信息保存异常");
                                                        submitflag = 0;
                                                        $('.btnsubmit').html("立即绑定").css({
                                                            "color": "white",
                                                            "background-color": "#ff6a30"
                                                        });
                                                        break;
                                                    case 100:
                                                        promptTips("绑定失败！");
                                                        location.href = 'index.html';
                                                        break;
                                                    default:
                                                        promptTips("绑定失败");
                                                        submitflag = 0;
                                                        $('.btnsubmit').html("立即绑定").css({
                                                            "color": "white",
                                                            "background-color": "#ff6a30"
                                                        });
                                                        break;
                                                }
                                            }
                                        }

                                    });
                                } else {
                                    promptTips("请不要频繁提交！");
                                }
                            }
                        }
                    }
                }
            }
        });
    })
})()