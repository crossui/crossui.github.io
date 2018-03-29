/* ========================================================================
 * nav
 * ======================================================================== */
+function ($) {
    $.fn.nav = function (){
        var $this = $(this),
            $iframe = $('#iframe').find('iframe'),
            $sidebar = $this.parent(),
            $navicon = $('#navicon'),
            $container = $sidebar.parent(),
            $closedWrap = $('<div class="sidebar-closed-wrap"></div>').appendTo($sidebar),
            $closedBox = $('<div class="sidebar-closed-box"></div>').appendTo($closedWrap);


        if($('.iframe-menu-list').length){
            var iframeMenu = true,
                liwidth = 100,
                $iframeMenu = $('.iframe-menu-list'),
                $iframeUl = $iframeMenu.children('ul'),
                $iframeWrap = $('.iframe-menu'),
                $iframePrevBtn = $('.iframe-menu-left_scroll'),
                $iframeNextBtn = $('.iframe-menu-right_scroll');


            iframemenuFun();

            $iframeUl.on('click','li>a',function () {
                var _id = $(this).data('id');
                if(_id){
                    $this.find('a[data-id="'+_id+'"]').click();
                }else{
                    $iframe.attr('src',$(this).data('src'));
                    iframeMenuCurr($(this).parent('li').index());
                    $this.find('li.active').removeClass('active');
                }
            }).on('click','.icon-clear',function (e){
                var $li = $(this).parents('li'),
                    $a = $li.children('a');
                if($a.is('.curr')){
                    if($li.next().length>0){
                        $li.next().children('a').click();
                    }else if($li.prev().length>0){
                        $li.prev().children('a').click();
                    }
                }
                $li.remove();
                $this.find('a[data-id="'+$a.data('id')+'"]').removeAttr('data-id');
                e.stopPropagation();
                e.preventDefault();
            })
        }
        function iframemenuScroll(val) {

        }
        function iframemenuFun() {
            var _left = $iframeUl.find('li').length * liwidth;
            if(_left > $iframeWrap.outerWidth()){
                $iframeMenu.css('width', _left);
                $iframePrevBtn.show();
                $iframeNextBtn.show();
            }else {
                $iframeMenu.css('width', "100%");
                $iframePrevBtn.hide();
                $iframeNextBtn.hide();
            }
        }
        function iframeMenuCurr(index) {
            $iframeUl.find('a.curr').removeClass('curr');
            $iframeUl.find('li').eq(index).find('a').addClass('curr');
        }

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
                    var src = $(this).data("src");
                    $iframe.attr('src',src);
                    if(iframeMenu){
                        if(!($(this).data('id'))){
                            var title = $(this).find('.title').text(),
                                _guid = guid();
                            $iframeUl.append('<li><a href="javascript:;" title="'+title+'" data-id="'+_guid+'" data-src="'+src+'"><span class="c-nowrap">'+title+'</span><i class="iconfont icon-clear"></i></a></li>');
                            $(this).attr('data-id',_guid);
                            iframemenuFun();
                            iframeMenuCurr($iframeUl.find('li').length-1);
                        }else{
                            var _a = $iframeUl.find('a[data-id="'+$(this).data("id")+'"]');
console.info($(this).data("id"));
                            iframeMenuCurr(_a.parent().index());
                        }
                    }
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
                    $closedBox.find('.sub-ul').removeAttr('style');
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
            iframemenuFun();
        });

        return this;
    };
    $('div[data-nav="collapse"]').nav();
}(jQuery);