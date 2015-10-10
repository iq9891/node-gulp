(function(){
    $(function(){
        /*阻止默认事件*/
//        document.body.addEventListener("touchstart", function(event) {
//            event.preventDefault();
//        },false);
//        document.body.addEventListener("touchmove", function(event) {
//            event.preventDefault();
//        },false);
		

        //加载用户信息
		$.ajax({
			type: 'GET',
			url: config.Rurl+'api/v1/myhome/?pavoid='+localStorage.getItem("pavoid")+'&userId='+localStorage.getItem("userId"),
			dataType:'json',
			contentType: 'application/json',
			success: function(data){
				if(data.code == 1){
					$('#name').html(data.results.name);
					$('#number').html(data.results.phone);
					//console.log(localStorage.getItem("userId"));
				}else{
                    if(data.code == 100){
						localStorage.unloginUrl = "my_accout.html";
                        location.href = 'login.html';
                    }
               }
			},
			error: function(xhr){
				if(localStorage.getItem("ajaxError")){
					promptTips("请求超时，请刷新页面！");
				}else{
					localStorage.setItem("ajaxError",true);
					location.reload(true);
				}
			}
		});
		
        /*常用就诊人*/
		$('.patient').on('tap', function(){
            localStorage.mycountclient = 1;
			window.location.href = 'clients.html';
		});
        /*我的预约单*/
		$('.myorder').on('tap', function(){
			window.location.href = 'myorder.html';
		});

    });
})()