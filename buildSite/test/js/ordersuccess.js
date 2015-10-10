(function(){
    $(function(){
        /*阻止默认滚动事件*/
        document.body.addEventListener("touchstart", function(event) {
            event.preventDefault();
        },false);
        document.body.addEventListener("touchmove", function(event) {
            event.preventDefault();
        },false);

        var ordersuccessJson = JSON.parse(localStorage.ordersuccess);
        //$(".mobile").html(ordersuccessJson.phone);
        $(".hospName").html(ordersuccessJson.hospName);
        $(".departmentName").html(ordersuccessJson.departmentName);
        $(".doctorName").html(ordersuccessJson.doctorName);
        $(".resourceTpyeText").html(ordersuccessJson.resourceTpyeText);
        $(".expenseText").html("￥"+ordersuccessJson.expenseText);
        $(".diagnosisDateText").html(ordersuccessJson.diagnosisDateText);
        $(".retrieveTime").html(ordersuccessJson.retrieveTime);
        $(".retrieveAddress").html(ordersuccessJson.retrieveAddress);
        $(".diagnosisAddress").html(ordersuccessJson.diagnosisAddress);

        $(".patientName").html(ordersuccessJson.patientName);
        $(".idCard").html(ordersuccessJson.idCard);
        $(".phone").html(ordersuccessJson.phone);

        //预约完成，返回首页
        $(".btnsubmit").on("tap",function(){
            location.href = 'index.html';
        })


        /*滚动*/
        var scroll;
        function loaded () {
            var testheight = localStorage.viewHeight - $(".title").height()+ 'px';
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
