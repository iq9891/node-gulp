(function(){
    $(function(){
        /*阻止默认事件*/
        document.body.addEventListener("touchstart", function(event) {
            event.preventDefault();
        },false);
        document.body.addEventListener("touchmove", function(event) {
            event.preventDefault();
        },false);

        /*scroll*/
        var news_scroll;
        function loaded() {
            var scrollHeight = document.documentElement.clientHeight + 'px';
            $('#scrollwrap').css({'height':scrollHeight});
            news_scroll  =  new IScroll('#scrollwrap', {freeScroll: true, checkDOMChanges: true });
        }
        loaded();

        /*add news*/
        var newslistdata;
        var pageSize = 10;
        var pageno = 1;
        //var loading = "<div class='hide' style='width:100%;padding:10px 0;text-align: center;' id='loading'><img src='imgs/loading2.gif' width='20' >加载中...</div>";
        $.ajax({
            type:'GET',
            url: config.Rurl+'/api/v1/news/list/all',
            dataType: 'json',
            contentType: "application/json",
            success: function(data){
                newslistdata = data.results;
                if(data.code == 1){
                    $.each(data.results,function(index,val){
                        if(index<pageSize){
                            $('#scrollcontent').append("<div class=\"news-item-warp\" newsId=\""+val.newsId+"\"><div class=\"news-item-contain lr-mar-36 clearfix \"><div class=\"news-item-img fl\"> <img src=\""+val.imageurl+"\" alt=\"导医通\" width=\"70\" height=\"54\"/> </div> <div class=\"news-item-text\"> <div class=\"news-item-title ellipsis\">"+val.title+"</div> <div class=\"news-item-abbreviation\">"+val.abstracts+"</div></div> </div> </div>")
                        }else{
                            return false;
                        }
                    });
                    //$('#scrollcontent').append(loading);
                    news_scroll.refresh();
                    $('body').on('tap','.news-item-warp',function(){
                        localStorage.newsId = $(this).attr('newsId');
                        location.href = 'news-details.html'
                    });
                };
            }
        });

        var Timeout = true;
        var scrollcontent = document.getElementById("scrollcontent");
        var fun = function(event) {
            var dataLength = newslistdata.length;
            var totalPage = Math.ceil(dataLength / pageSize);
            if (pageno <= totalPage) {
                //$("#loading").show();
                var reg = /\-?[0-9]+/g;
                var translate = this.style.transform.match(reg);
                var translateY = translate[1];
                if (parseInt(-(translateY)) > (parseInt(this.clientHeight) - document.body.clientHeight)) {
                    if(Timeout){
                        pageno++;
                        Timeout = false;
                        setTimeout(ShowNextPagelist,2000);
                    }
                }
            } else {
                //$("#loading").remove();
                scrollcontent.removeEventListener("touchmove",fun);
                $('#scrollcontent').append("<div style='width:100%;padding:10px 0;text-align: center;' >页面全部加载完成</div>");
            }
        }
        scrollcontent.addEventListener("touchmove",fun);

        function ShowNextPagelist(){
            var dataLength = newslistdata.length;
            var totalPage = Math.ceil(dataLength/pageSize);
            var initNum = pageSize*(pageno-1);
            var endNum = pageSize+initNum;
            if(pageno>=totalPage){
                endNum = dataLength;
            }
            for(var i = initNum;i<endNum;i++){
                $('#scrollcontent').append("<div class=\"news-item-warp\" newsId=\""+newslistdata[i].newsId+"\"><div class=\"news-item-contain lr-mar-36 clearfix \"><div class=\"news-item-img fl\"> <img src=\""+newslistdata[i].imageurl+"\" alt=\"导医通\" width=\"70\" height=\"54\"/> </div> <div class=\"news-item-text\"> <div class=\"news-item-title ellipsis\">"+newslistdata[i].title+"</div> <div class=\"news-item-abbreviation\">"+newslistdata[i].abstracts+"</div></div> </div> </div>");
            }
            //$("#loading").remove();
            news_scroll.refresh();
            //$('#scrollcontent').append(loading);
            Timeout = true;
        }


    });
})()