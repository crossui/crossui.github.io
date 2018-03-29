$(function() {
    // 页面初始化
    function pageInit(){
        $('#iframe').height($(window).height()-76);
        $('.sidebar').css('height',$(window).height()-45);
        $(".sidebar").niceScroll({cursorborder:"",cursorcolor:"#dbdbdb"});
    }
    pageInit();
    $(window).resize(function(){throttle(pageInit(), 300)});
});

//函数节流
function throttle(fn, delay){
    var timer = null;
    return function(){
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function(){
            fn.apply(context, args);
        }, delay);
    };
}
//用于生成uuid
function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function guid() {
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}