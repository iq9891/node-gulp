(function(){
	$(function(){
		var sHtml = '',
			loading = "<div style='width:100%;padding:10px 0;text-align: center;' id='loading'><img src='imgs/loading2.gif' width='20' >加载中...</div>",
			$dis_guide_step_r = $(".dis_guide_step_r");

		$.ajax({
			type: 'GET',
			url: config.Rurl+'api/v1/guide/guide/getByDiseaseId?diseaseId='+localStorage.getItem("dis_pa_guide"),
			dataType:'json',
			contentType: 'application/json',
			success: function(data){

				if(data.code==1){
                    
            		$(".dis_guide_step_r").html(data.results[0].cont);

            		localStorage.disgudieyes = JSON.stringify(data.results[1]);
            		localStorage.disguideno  = JSON.stringify(data.results[2]);
            		$(".response_yes").on('tap',function(){
						if(localStorage.disguideno == 'undefined'){
							promptTips('暂无相关内容', function(){
								window.location.href = 'index.html';
							});
							return;
						}
            			if(JSON.parse(localStorage.disgudieyes).isleaf){
                            //alert(JSON.parse(localStorage.disgudieyes).depId);

                            localStorage.standdeparmentId = JSON.parse(localStorage.disgudieyes).depId;

            				location.href = "dis_gu_result.html";
            				localStorage.disguideno = "";
            			}else{
            				$.ajax({
            					type:'GET',
            					url: config.Rurl+'api/v1/guide/guide/listByPId?parentId='+JSON.parse(localStorage.disgudieyes).id,
            					dataType: 'json',
            					contentType: "application/json",
            					success: function(data){
            						if (data.code) {
            							$dis_guide_step_r.html(JSON.parse(localStorage.disgudieyes).cont);
            							localStorage.disgudieyes = JSON.stringify(data.results[1]);
            							localStorage.disguideno  = JSON.stringify(data.results[2]);
            						};
            					}
            				});
            			}
            		});

					$(".response_no").on('tap',function(){
						if(localStorage.disguideno == 'undefined'){
							promptTips('暂无相关内容', function(){
								window.location.href = 'index.html';
							});
							return;
						}
            			if(JSON.parse(localStorage.disguideno).isleaf){

                            localStorage.standdeparmentId = JSON.parse(localStorage.disgudieyes).depId;

            				location.href = "dis_gu_result.html";
            				localStorage.disgudieyes = "";
            			}else{
            				$.ajax({
            					type:'GET',
            					url: config.Rurl+'api/v1/guide/guide/listByPId?parentId='+JSON.parse(localStorage.disguideno).id,
            					dataType: 'json',
            					contentType: "application/json",
            					success: function(data){
            						if (data.code) {
										//console.log(localStorage.disguideno);
										if(localStorage.disguideno){
											$dis_guide_step_r.html(JSON.parse(localStorage.disguideno).cont);
											localStorage.disgudieyes = JSON.stringify(data.results[1]);
											localStorage.disguideno  = JSON.stringify(data.results[2]);
										}
            						};
            					},
								error: function(xhr){
									if(xhr.status == 0){
										location.reload(true);
									}
								}
            				});
            			}
            		});
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
		
		//页面跳转
		$('.depart').live('tap', function(){
			window.location.href = 'dis_guide_step.html';
		});

	});
})();