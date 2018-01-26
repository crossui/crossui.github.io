/* ========================================================================
 * nav
 * ======================================================================== */
+function ($) {
    $.fn.nav = function (){
        var $this = $(this),
            $sidebar = $this.parent(),
            $navicon = $('#navicon'),
            $container = $sidebar.parent(),
            $closedWrap = $('<div class="sidebar-closed-wrap"></div>').appendTo($sidebar),
            $closedBox = $('<div class="sidebar-closed-box"></div>').appendTo($closedWrap);

        $closedBox.niceScroll({cursorborder:"",cursorcolor:"#dbdbdb"});
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

        $this.on('mouseenter', '.c-nav-li', function (e) {
            if($this.is('.sidebar-closed')){
                var $lis = $(this);
                if($lis.find('.sub-ul').length>0){
                    $closedBox.html($lis.children('.sub-ul').clone());
                }else {
                    $closedBox.html($lis.html());
                }
                $closedWrap.show().css('top',$lis.offset().top+2);
            }
        });
        $sidebar.on('mouseleave', function (e) {
            $closedWrap.hide();
        });

        $closedWrap.on('click','a',function(){
            if($(this).data('src')){
                $this.find('a[data-src="'+$(this).data('src')+'"]').click();
            }else{
                return;
            }
        });

        $navicon.on('click',function(){
            $(this).toggleClass('indent');
            if($container.hasClass('closed')){
                $this.removeClass('sidebar-closed');
                $container.removeClass('closed');
            }else{
                $this.addClass('sidebar-closed');
                $container.addClass('closed');
            }
        });

        return this;
    };
    $('div[data-nav="collapse"]').nav();
}(jQuery);