(function(){
    $(function(){
        /*��ֹĬ���¼�*/
        document.body.addEventListener("touchstart", function(event) {
            event.preventDefault();
        },false);
        document.body.addEventListener("touchmove", function(event) {
            event.preventDefault();
        },false);

        $('.hospital-name h3').html(localStorage.hospName);
        $('#departmentName').html(localStorage.firstdepartmentName);

        //��ȡһ���˵�ҳ�洫�����Ķ����˵����� JSON��ʽ
        var data =  JSON.parse(localStorage.subDepartments);
        var html = '';
        for(var i=0;i<data.length;i++){
            html += '<li departmentId="'+data[i].departmentId+'"><span  class="hospital-info-list-l">'+data[i].departmentName+'</span><span class="hospital-info-list-r font-icon">n</span></li>';
        }
        $(".hospital-info-list").html(html);

        //����ѡ��
        $("#reselect").on('tap',function(){
            location.href = 'hospital-info-one.html';
        })

        //��ת��doclist.html
        $(".hospital-info-list li").on('tap',function(){
            localStorage.departmentId = $(this).attr("departmentId");
            localStorage.departmentName = $(this).find('.hospital-info-list-l').text();
            location.href = 'doclist.html';
        })


        /*scroll*/
        var indexscroll;
        function loaded() {
            var testheight = localStorage.viewHeight - $(".hospital-name").height() + 'px';
            $('#hospital-info-content').css({'height':testheight});
            indexscroll  =  new IScroll('#hospital-info-content', {freeScroll: true, checkDOMChanges: true });
        }
        loaded();
    });
/*end*/
})();



