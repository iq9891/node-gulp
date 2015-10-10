(function(){
    $(function(){
        //去注册
        $('.newuser').on('tap',function(){
            localStorage.checkNext = "reged.html";
            location.href = 'reg.html';
        });
        //忘记密码
        $('.forgetpw').on('tap',function(){
            localStorage.checkNext = "reset_password.html";
            location.href = 'reg.html';
        });

        /*马上登陆*/
        $('.btnsubmit').on('tap',function(){

            //防止重复点击
            var currentSubmit = $(this);
            if(!!currentSubmit.data('taped')) return false;
            //表单验证
            if(!!$('#userName').val()){
                //由于手机号的正则包含于用户名之中，所以无法再进行验证
                if(!validator.name($('#userName').val())){
                    promptTips("请正确输入您注册时填写的手机或用户名");
                    return false;
                }
            }else{
                promptTips("请输入您注册时填写的手机或用户名");
                return false;
            }
            if(!!$('#password').val()){
                if(!validator.password($('#password').val())){
                    promptTips("密码以英文开头，长度在6-18之间，只包含英文、数字和下划线");
                    return false;
                }
            }else{
                promptTips("请输入登录密码");
                return false;
            }

            currentSubmit.data('taped',true);
            var setData = {
                'loginName': $('#userName').val(),
                'password': hex_encrypt($('#password').val())
            }
            $.ajax({
                type: 'post',
                url: config.Rurl + 'api/v1/account/login',
                dataType: 'json',
                contentType: "application/json",
                data: JSON.stringify(setData),
                success: function(data){
                    //数据请求错误报错
                    //解除防止重复点击的锁
                    currentSubmit.data('taped',false);
                    if(data.code == 1){
                        var userData = data.results;
                        localStorage.phone = userData.phone;
                        //由于name不一定存在，所以加了判断
                        !!userData.name && (localStorage.name = userData.name);
                        localStorage.username = userData.username;
                        localStorage.pavoid = userData.pavoid;
                        localStorage.userId = userData.userId;

                        if(!!localStorage.unloginUrl){
                            location.href = localStorage.unloginUrl;
                        }else{
                            location.href = 'index.html';
                        }

                    }else{
                        promptTips(data.message);
                    }
                },
                error: function(xhr, type){
                    if(localStorage.getItem("ajaxError")){
						promptTips("请求超时，请刷新页面！");
					}else{
						localStorage.setItem("ajaxError",true);
						location.reload(true);
					}
                    currentSubmit.data('taped',false);
                }
            });
        });

        
    })
})();
