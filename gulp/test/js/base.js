//基础的js文件

//为了确保localStorage.viewHeight存在，所以加此判断
(function(){
    localStorage.viewHeight = !!localStorage.viewHeight ? localStorage.viewHeight : document.documentElement.clientHeight;
})();
//touch事件的兼容
function fnTouches(e){
    if(!e.touches){
        e.touches = e.originalEvent.touches;
    }
}
//转屏后触发一个全局事件
function updateOrientation(e){
	$(document.body).trigger('orientat');
};
//更新fontsize
function updateFontsize(){
    document.querySelector('html').style.fontSize = document.body.clientWidth/360*16+'px';
};
//根据prevUrl进行页面跳转,nextUrl可以指定跳转栈的位置，noReturn赋true，会跳转到最近的一个有noReturn的地址
var prevUrlJump = function(nextUrl,noReturn){
    if(!!localStorage.prevUrl){
        var urlJump;
        var temp = localStorage.prevUrl.split(',');
        if(!!nextUrl){
            while(!!(urlJump=temp.pop())){
                if(nextUrl == urlJump){
                    break;
                }
            }
        }else if(!noReturn){
            while(!!(urlJump=temp.pop())){
                if(!(/noReturn/.test(urlJump))){
                    break;
                }
            }
        }else{
            while(!!(urlJump=temp.pop())){
                if(!!(/noReturn/.test(urlJump))){
                    break;
                }
            }
        }      
        localStorage.prevUrl = temp.join(',');
        location.href= urlJump ? urlJump : 'index.html';
    }else{
        location.href = 'index.html';
    }   
}
$('body').on('tap','.returnicon',function(){
    prevUrlJump();
});
//信息提示框
function promptTips(textMes,callback,noHide,element){
    var element = !!element ? element : $('body');
    if(!!element.find('#codetip').length) return false;
    $("<p id='codetip'></p>").text(textMes).css({'color':'#ffffff','width':"80%",'line-height':"16px;",'padding':'16px 0','background-color':"#7b7e7d",'position':"fixed",'left':"50%",'top':"50%",'margin-left':"-40%",'margin-top':"-25px",'text-align':"center",'font-size':"12px","border-radius":"5px",'opacity':'.8','z-index':15}).appendTo(element);
    if(!noHide){
        setTimeout(function(){
            $('#codetip').remove();
            !!callback && callback();
        },5000);
    }
}
//保存跳转地址，以便操作完成后完成对应跳转
function recordAction(value) {
    localStorage.setItem('recordAction',value);
}

//判断对象是否为空
function isOwnEmpty(obj){
    for(var name in obj)
    {
        if(obj.hasOwnProperty(name))
        {
            return false;
        }
    }
    return true;
};

//取回url中query部分特定name的名字，如...?a=bbbbb,getUrlParam(a),返回值为b
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
//去掉url参数中的指定参数
function delUrlParam(url,delParam){
    var reg = new RegExp("[\?&]"+delParam+"=[^&]*&?$",'g'); //构造一个含有目标参数的正则表达式对象
    return url.replace(reg,'');
}
//根据安卓取回来的照片插入预览
var  onUploadImgEnd = function(imgUrl){
    $(window).trigger('onUploadImgEnd',[imgUrl]);
}
//展示loading效果
var showLoading = function () {
    if ($('#loading').length < 1) {
        $('body').append('<div id="loading" style="display: none;"><div class="lbk"></div><div class="cont">' +
            '<img src="img/loading.gif" alt="loading...">正在加载...</div>' +
                '<div class="d-mask"></div></div>');
    }
    $('#loading').show();
}
//关闭loading效果
var closeLoading = function(){
    $('#loading').remove();
}
//是否登陆判断
var checkLogin = function(callback){
    if(!!localStorage.pavoid ){
        var url = config.Rurl + 'api/v1/myhome/?pavoid='+localStorage.pavoid;
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            contentType: "application/json",
            success: function(data){
                callback(data);
            },
            error: function(xhr, type){
                //promptTips('请求提交失败，请重试');
            }
        });
    }else{
        var data = { 'code' : 0};
        callback(data);
        return false;
    } 
}
// 阻止默认事件
document.addEventListener("touchmove", function(event) { 
  event.preventDefault();
},false);

//ajax的进一步整理
/*var ajaxFunction = function (url,opts) {
    var defaultopts= {
        type: 'POST',
        timeout: 1000 * 30,
        dataType:'json',
        successCallback : function(){},
        errorCallback : function(){}
    }
    $.extend(defaultopts,opts);
    $.ajax({
        type: defaultopts.type,
        url: url,
        timeout:defaultopts.timeout,
        dataType: defaultopts.dataType,
        beforeSend: function () {
            showLoading();
        },
        success: function (data) {
            successCallback(data);
        },
        error: function (e) {
            errorCallback();
        },
        complete:function(){
            closeLoading();
        }
    });
}*/