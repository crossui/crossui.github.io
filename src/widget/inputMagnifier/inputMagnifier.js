
 function inputMagnifier(options) {
	 this.config = {
         inputElem          :     '.inputElem',     // 输入框目标元素
         parentCls          :     '.parentCls',     // 目标元素的父类
         align              :     'right',            // 对齐方式有 ['top','bottom','left','right']四种 默认为top
         splitType          :     [3,4,4],          // 拆分规则
         delimiter          :     '-'                // 分隔符可自定义
	 };

	 this.cache = {
		  isFlag  :  false
	 };
	 this.init(options);
 }

 inputMagnifier.prototype = {
	 
	 constructor: inputMagnifier,

	 init: function(options) {
		this.config = $.extend(this.config,options || {});
		var self = this,
			_config = self.config,
			_cache = self.cache;
		
		self._bindEnv();
		
		
	 },

	 _appendHTML: function($this,value) {
		 var self = this,
			 _config = self.config,
			 _cache = self.cache;

		 var html = '',
			 $parent = $($this).closest(_config.parentCls);

			 if($('.js-max-input',$parent).length == 0) {
				html += '<div class="js-max-input"></div>';
				$($parent).append(html);
			 	$('.js-max-input').css({
					'border': "solid 1px #ffd2b2",
					'position':"relative",
					'background': "#fffae5",
					'padding': "0 10px 0 10px",
					'font-size':"20px",
					'color': "#ff4400",
					'z-index': 1111,
					'word-break': "break-all",
					'width': "auto"
				});
			 }
			 var value = self._formatStr(value);
			 $('.js-max-input',$parent).html(value);
	 },
	 _position: function(target){
		var self = this,
			_config = self.config;
		var elemWidth = $(target).outerWidth(),
			elemHeight = $(target).outerHeight(),
			elemParent = $(target).closest(_config.parentCls),
			containerHeight = $('.js-max-input',elemParent).outerHeight(); 
		
		$(elemParent).css({"position":'relative'});
		
		switch(true){
			
			case _config.align == 'top':
				
				$('.js-max-input',elemParent).css({'position':'absolute','top' :-elemHeight - containerHeight/2,'left':0});
				break;
			
			case _config.align == 'left':

				$('.js-max-input',elemParent).css({'position':'absolute','top' :0,'left':0});
				break;
			
			case _config.align == 'bottom':

				$('.js-max-input',elemParent).css({'position':'absolute','top' :elemHeight + 4 + 'px','left':0});
				break;
			
			case _config.align == 'right':

				$('.js-max-input',elemParent).css({'position':'absolute','top' :0,'left':elemWidth + 2 + 'px'});
				break;
		}
	 },
	 _bindEnv: function(){
		var self = this,
			_config = self.config,
			_cache = self.cache;

		// ʵʱ���������ֵ�ı仯
		$(_config.inputElem).each(function(index,item){

			$(item).keyup(function(e){
				var value = $.trim(e.target.value),
					parent = $(this).closest(_config.parentCls);
				if(value == '') {
					self._hide(parent);
				}else {

					var html = $.trim($('.js-max-input',parent).html());

					if(html != '') {
						self._show(parent);
					}
				}
				self._appendHTML($(this),value);
				self._position($(this));
			});

			$(item).unbind('focusin');
			$(item).bind('focusin',function(){
				var parent = $(this).closest(_config.parentCls),
					html = $.trim($('.js-max-input',parent).html());

				if(html != '') {
					self._show(parent);
				}
			});

			$(item).unbind('focusout');
			$(item).bind('focusout',function(){
				var parent = $(this).closest(_config.parentCls);
				self._hide(parent);
			});
		});
	 },
	 _formatStr: function(str){
		var self = this,
			_config = self.config,
			_cache = self.cache;
		var count = 0,
			output = [];
		for(var i = 0, ilen = _config.splitType.length; i < ilen; i++){
			var s = str.substr(count,_config.splitType[i]);
			if(s.length > 0){
				output.push(s);
			}
			count+= _config.splitType[i];
		}
		return output.join(_config.delimiter);
	 },
	 _show: function(parent) {
		var self = this,
			_config = self.config,
			_cache = self.cache;
		if(!_cache.isFlag) {
			$('.js-max-input',parent).show();
			_cache.isFlag = true;
		}
	 },
	 _hide: function(parent) {
		var self = this,
			_config = self.config,
			_cache = self.cache;
		if(_cache.isFlag) {
			$('.js-max-input',parent).hide();
			_cache.isFlag = false;
		}
	 }
 };
