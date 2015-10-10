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
        var newsdetails_scroll;
        function loaded() {
            var scrollHeight = document.documentElement.clientHeight -96 + 'px';
            $('#scrollwarp').css({'height':scrollHeight});
            newsdetails_scroll  =  new IScroll('#scrollwarp', {freeScroll: true, checkDOMChanges: true });
        }
        loaded();
        var imgWidth = document.documentElement.clientWidth -36;

        $.ajax({
            type:'GET',
            url: config.Rurl+'/api/v1/news/getNews/'+localStorage.newsId,
            dataType: 'json',
            contentType: "application/json",
            success: function(data){
                //console.log(data)
                if(data.code == 1){
                    $('.news-details-title-text').html(data.results.title);

                    $('.news-details-title-time').html(data.results.createTime);

                    var detailstring = "<img src=\""+data.results.conImgUrl+"\" width=\""+imgWidth+"\" style=\""+"margin-bottom:20px"+"\">"+data.results.content;

                    $('#scrollconent').append(detailstring);

                    $('#scrollconent img').css({"width":imgWidth});

                    /*图片加载问题*/
                    var t_img;
                    var isLoad = true;
                    function isImgLoad(ele,callback){
                        ele.each(function(){
                            if(this.height === 0){
                                isLoad = false;
                                return false;
                            }
                        });

                        if(isLoad){
                            clearTimeout(t_img);
                            callback();
                        }else{
                            isLoad = true;
                            t_img = setTimeout(function(){
                                isImgLoad(ele,callback);
                            },500);
                        }
                    }


                    isImgLoad($('#scrollconent img'),function(){
                        newsdetails_scroll.refresh();
                    });

                 };
            }
        });
    });
















})()
