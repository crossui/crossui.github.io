$(function() {
    // 页面初始化
    function pageInit(){
        $('#iframe').height($(window).height()-45);
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