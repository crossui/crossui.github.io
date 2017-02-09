/* ========================================================================
 * tabs
 * ======================================================================== */
+(function($){
    $.fn.tabs = function(options){
        if(this.length == 0) return this;

        if(this.length > 1){
            this.each(function(){$(this).tabs(options)});
            return this;
        }
        if($(this).data('binds')=='yes') return false;
        $(this).data('binds','yes');
        var defaults={
            "hdChildren":'a',
            "bdChildren":'div.tabs-bd-box',
            "events":'click'
        };
        var opts=$.extend(defaults,options || {});
        var $this=$(this),
            el=this,
            $hd=$this.children('div.tabs-hd').children(opts.hdChildren),
            $bd=$this.children('div.tabs-bd').children(opts.bdChildren);
        if($this.data('toggle-tabs')){
            $hd.on(opts.events,function(){
                var $el=$(this),
                    index=$el.index();
                $el.addClass('curr').siblings().removeClass('curr');
                $bd.eq(0).find('iframe').attr('src',$el.data('src'));
                if(opts.callback){
                    opts.callback(index,$this);
                }
            });
        }else{
            $hd.on(opts.events,function(){
                var $el=$(this),
                    index=$el.index();
                $el.addClass('curr').siblings().removeClass('curr');
                $bd.eq(index).addClass('curr').siblings().removeClass('curr');
                if(opts.callback){
                    opts.callback(index,$this);
                }
            });
        }


        el.goTo = function (index,toOpts){
            $hd.eq(index).addClass('curr').siblings().removeClass('curr');
            $bd.eq(index).addClass('curr').siblings().removeClass('curr');

        };
        return this;
    };
    $(document).on('mouseenter', '[data-toggle="tabs"]', function (e) {
        $(this).tabs();
    });
})(jQuery);