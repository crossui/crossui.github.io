/* ========================================================================
 * table
 * ======================================================================== */
+function ($) {
    $.fn.tbHover = function (options,hoverBack){
        var defaultsettings= {
        };
        var opts=$.extend(defaultsettings, options);
        return this.each(function(){
            var _this=$(this),el=this;
            _this.on("mouseenter","td",function () {
                $(this).parent().addClass("hover");
            }).on("mouseleave","td",function () {
                $(this).parent().removeClass("hover");
            });
            return this;
        });
    };

    $(document).on('mouseenter', '[data-toggle="tbHover"]', function (e) {
        if($(this).data('mouseenter')) return false;
        $(this).data('mouseenter',true);
        $(this).tbHover();
    });

}(jQuery);