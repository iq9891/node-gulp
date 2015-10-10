(function(){
    $(function(){
        var taped=false;
        $("#submit").on("tap",function(){
            if(!!taped) return false;
            if(!!$("#nPassword").val()){
                if(!validator.password($("#nPassword").val())){
                    promptTips("密码以英文开头，长度在6-18之间，不含特殊字符");
                    return false;
                }
            }else{
                promptTips("请输入密码");
                return false;
            }
            if(!!$("#conPassword").val()){
                if(!validator.password($("#conPassword").val())){
                    promptTips("密码以英文开头，长度在6-18之间，不含特殊字符");
                    return false;
                }else if($("#conPassword").val() != $("#nPassword").val() ){
                    promptTips("密码输入不一致");
                    return false;
                }
            }else{
                promptTips("请输入确认密码");
                return false;
            }
            var url=config.Rurl + '/api/v1/account/updateForgetPassword/'+localStorage.phone;
            var data={
                "password" : hex_encrypt($('#nPassword').val()),
                "token":localStorage.token
            }
            $.ajax({
                type: 'POST',
                url:   url,
                data:JSON.stringify(data),
                dataType: 'json',
                contentType: "application/json",
                success: function(data){
                    //数据返回结果处理
                    //console.log(data);
                    if(data.code == 1){
                        promptTips(data.message,function(){localStorage.removeItem("token");location.href="login.html";});
                    }
                    taped=false;

                },
                error: function(xhr, type){
                    //数据返回结果处理
                    if(localStorage.getItem("ajaxError")){
						promptTips("请求超时，请刷新页面！");
					}else{
						localStorage.setItem("ajaxError",true);
						location.reload(true);
					}
                    taped=false;
                    return false;
                }
            });
        })



    })
})()