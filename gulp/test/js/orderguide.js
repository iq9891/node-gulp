(function(){
	$(function(){
		//链接跳转
		$('.to_depart_guide').on('tap', function(){
			window.location.href = $(this).attr('_href');
		});
	});
})();