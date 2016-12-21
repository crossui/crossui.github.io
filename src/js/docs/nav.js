/* ========================================================================
 * nav
 * ======================================================================== */
+function ($) {
    $.fn.nav = function (){
        var $this = $(this),
            $sidebartoggler = $('a.sidebar-toggler'),
            $sidebar = $sidebartoggler.parent(),
            $container = $sidebar.parent();

        $this.on('click', 'li > a', function (e) {

            var parentLi = $(this).parents('li.c-nav-li'),
                parentUl = $(this).parent().parent();


            parentUl.children('li.open').children('a').children('.arrow').removeClass('open');
            parentUl.children('li.open').children('.sub-ul').slideUp(200);
            parentUl.children('li.open').removeClass('open');



            var sub = $(this).next();
            if(sub.length){
                if (sub.is(":visible")) {
                    $('.arrow', $(this)).removeClass("open");
                    $(this).parent().removeClass("open");
                    sub.slideUp(200, function () {

                    });
                } else {
                    $('.arrow', $(this)).addClass("open");
                    $(this).parent().addClass("open");
                    sub.slideDown(200, function () {

                    });
                }
            }else{
                $this.find('li.active').find('span.selected').remove()
                                            .end().removeClass('active');
                parentLi.addClass('active').children('a').append('<span class="selected"></span>');
                $(this).parent('li').addClass('active');

                if($(this).data('src')){
                    $('#iframe').find('iframe').attr('src',$(this).data('src'));
                }else{
                    return;
                }
            }

            e.preventDefault();
        });

        $sidebartoggler.on('click',function(){
            if($container.hasClass('closed')){
                $sidebartoggler.html('<i class="iconfont">&#xe673;</i>');
                $this.removeClass('sidebar-closed');
                $container.removeClass('closed');
            }else{
                $sidebartoggler.html('<i class="iconfont">&#xe674;</i>');
                $this.addClass('sidebar-closed');
                $container.addClass('closed');
            }
        });

        return this;
    };
    $('div[data-nav="collapse"]').nav();
}(jQuery);