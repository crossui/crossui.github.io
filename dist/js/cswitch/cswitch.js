(function(){var t=[].slice;!function(e,i){"use strict";var s;s=function(){function t(t,i){null==i&&(i={}),this.$element=e(t),this.options=e.extend({},e.fn.cswitch.defaults,{state:this.$element.is(":checked"),size:this.$element.data("size"),animate:this.$element.data("animate"),disabled:this.$element.is(":disabled"),readonly:this.$element.is("[readonly]"),indeterminate:this.$element.data("indeterminate"),inverse:this.$element.data("inverse"),radioAllOff:this.$element.data("radio-all-off"),onColor:this.$element.data("on-color"),offColor:this.$element.data("off-color"),onText:this.$element.data("on-text"),offText:this.$element.data("off-text"),labelText:this.$element.data("label-text"),handleWidth:this.$element.data("handle-width"),labelWidth:this.$element.data("label-width"),baseClass:this.$element.data("base-class"),wrapperClass:this.$element.data("wrapper-class")},i),this.prevOptions={},this.$wrapper=e("<div>",{class:function(t){return function(){var e;return(e=[""+t.options.baseClass].concat(t._getClasses(t.options.wrapperClass))).push(t.options.state?t.options.baseClass+"-on":t.options.baseClass+"-off"),null!=t.options.size&&e.push(t.options.baseClass+"-"+t.options.size),t.options.disabled&&e.push(t.options.baseClass+"-disabled"),t.options.readonly&&e.push(t.options.baseClass+"-readonly"),t.options.indeterminate&&e.push(t.options.baseClass+"-indeterminate"),t.options.inverse&&e.push(t.options.baseClass+"-inverse"),t.$element.attr("id")&&e.push(t.options.baseClass+"-id-"+t.$element.attr("id")),e.join(" ")}}(this)()}),this.$container=e("<div>",{class:this.options.baseClass+"-container"}),this.$on=e("<span>",{html:this.options.onText,class:this.options.baseClass+"-handle-on "+this.options.baseClass+"-"+this.options.onColor}),this.$off=e("<span>",{html:this.options.offText,class:this.options.baseClass+"-handle-off "+this.options.baseClass+"-"+this.options.offColor}),this.$label=e("<span>",{html:this.options.labelText,class:this.options.baseClass+"-label"}),this.$element.on("init.cswitch",function(e){return function(){return e.options.onInit.apply(t,arguments)}}(this)),this.$element.on("switchChange.cswitch",function(i){return function(s){if(!1===i.options.onSwitchChange.apply(t,arguments))return i.$element.is(":radio")?e("[name='"+i.$element.attr("name")+"']").trigger("previousState.cswitch",!0):i.$element.trigger("previousState.cswitch",!0)}}(this)),this.$container=this.$element.wrap(this.$container).parent(),this.$wrapper=this.$container.wrap(this.$wrapper).parent(),this.$element.before(this.options.inverse?this.$off:this.$on).before(this.$label).before(this.options.inverse?this.$on:this.$off),this.options.indeterminate&&this.$element.prop("indeterminate",!0),this._init(),this._elementHandlers(),this._handleHandlers(),this._labelHandlers(),this._formHandler(),this._externalLabelHandler(),this.$element.trigger("init.cswitch",this.options.state)}return t.prototype._constructor=t,t.prototype.setPrevOptions=function(){return this.prevOptions=e.extend(!0,{},this.options)},t.prototype.state=function(t,i){return void 0===t?this.options.state:this.options.disabled||this.options.readonly?this.$element:this.options.state&&!this.options.radioAllOff&&this.$element.is(":radio")?this.$element:(this.$element.is(":radio")?e("[name='"+this.$element.attr("name")+"']").trigger("setPreviousOptions.cswitch"):this.$element.trigger("setPreviousOptions.cswitch"),this.options.indeterminate&&this.indeterminate(!1),t=!!t,this.$element.prop("checked",t).trigger("change.cswitch",i),this.$element)},t.prototype.toggleState=function(t){return this.options.disabled||this.options.readonly?this.$element:this.options.indeterminate?(this.indeterminate(!1),this.state(!0)):this.$element.prop("checked",!this.options.state).trigger("change.cswitch",t)},t.prototype.size=function(t){return void 0===t?this.options.size:(null!=this.options.size&&this.$wrapper.removeClass(this.options.baseClass+"-"+this.options.size),t&&this.$wrapper.addClass(this.options.baseClass+"-"+t),this._width(),this._containerPosition(),this.options.size=t,this.$element)},t.prototype.animate=function(t){return void 0===t?this.options.animate:(t=!!t)===this.options.animate?this.$element:this.toggleAnimate()},t.prototype.toggleAnimate=function(){return this.options.animate=!this.options.animate,this.$wrapper.toggleClass(this.options.baseClass+"-animate"),this.$element},t.prototype.disabled=function(t){return void 0===t?this.options.disabled:(t=!!t)===this.options.disabled?this.$element:this.toggleDisabled()},t.prototype.toggleDisabled=function(){return this.options.disabled=!this.options.disabled,this.$element.prop("disabled",this.options.disabled),this.$wrapper.toggleClass(this.options.baseClass+"-disabled"),this.$element},t.prototype.readonly=function(t){return void 0===t?this.options.readonly:(t=!!t)===this.options.readonly?this.$element:this.toggleReadonly()},t.prototype.toggleReadonly=function(){return this.options.readonly=!this.options.readonly,this.$element.prop("readonly",this.options.readonly),this.$wrapper.toggleClass(this.options.baseClass+"-readonly"),this.$element},t.prototype.indeterminate=function(t){return void 0===t?this.options.indeterminate:(t=!!t)===this.options.indeterminate?this.$element:this.toggleIndeterminate()},t.prototype.toggleIndeterminate=function(){return this.options.indeterminate=!this.options.indeterminate,this.$element.prop("indeterminate",this.options.indeterminate),this.$wrapper.toggleClass(this.options.baseClass+"-indeterminate"),this._containerPosition(),this.$element},t.prototype.inverse=function(t){return void 0===t?this.options.inverse:(t=!!t)===this.options.inverse?this.$element:this.toggleInverse()},t.prototype.toggleInverse=function(){var t,e;return this.$wrapper.toggleClass(this.options.baseClass+"-inverse"),e=this.$on.clone(!0),t=this.$off.clone(!0),this.$on.replaceWith(t),this.$off.replaceWith(e),this.$on=t,this.$off=e,this.options.inverse=!this.options.inverse,this.$element},t.prototype.onColor=function(t){var e;return e=this.options.onColor,void 0===t?e:(null!=e&&this.$on.removeClass(this.options.baseClass+"-"+e),this.$on.addClass(this.options.baseClass+"-"+t),this.options.onColor=t,this.$element)},t.prototype.offColor=function(t){var e;return e=this.options.offColor,void 0===t?e:(null!=e&&this.$off.removeClass(this.options.baseClass+"-"+e),this.$off.addClass(this.options.baseClass+"-"+t),this.options.offColor=t,this.$element)},t.prototype.onText=function(t){return void 0===t?this.options.onText:(this.$on.html(t),this._width(),this._containerPosition(),this.options.onText=t,this.$element)},t.prototype.offText=function(t){return void 0===t?this.options.offText:(this.$off.html(t),this._width(),this._containerPosition(),this.options.offText=t,this.$element)},t.prototype.labelText=function(t){return void 0===t?this.options.labelText:(this.$label.html(t),this._width(),this.options.labelText=t,this.$element)},t.prototype.handleWidth=function(t){return void 0===t?this.options.handleWidth:(this.options.handleWidth=t,this._width(),this._containerPosition(),this.$element)},t.prototype.labelWidth=function(t){return void 0===t?this.options.labelWidth:(this.options.labelWidth=t,this._width(),this._containerPosition(),this.$element)},t.prototype.baseClass=function(t){return this.options.baseClass},t.prototype.wrapperClass=function(t){return void 0===t?this.options.wrapperClass:(t||(t=e.fn.cswitch.defaults.wrapperClass),this.$wrapper.removeClass(this._getClasses(this.options.wrapperClass).join(" ")),this.$wrapper.addClass(this._getClasses(t).join(" ")),this.options.wrapperClass=t,this.$element)},t.prototype.radioAllOff=function(t){return void 0===t?this.options.radioAllOff:(t=!!t)===this.options.radioAllOff?this.$element:(this.options.radioAllOff=t,this.$element)},t.prototype.onInit=function(t){return void 0===t?this.options.onInit:(t||(t=e.fn.cswitch.defaults.onInit),this.options.onInit=t,this.$element)},t.prototype.onSwitchChange=function(t){return void 0===t?this.options.onSwitchChange:(t||(t=e.fn.cswitch.defaults.onSwitchChange),this.options.onSwitchChange=t,this.$element)},t.prototype.destroy=function(){var t;return(t=this.$element.closest("form")).length&&t.off("reset.cswitch").removeData("c-switch"),this.$container.children().not(this.$element).remove(),this.$element.unwrap().unwrap().off(".cswitch").removeData("c-switch"),this.$element},t.prototype._width=function(){var t,e;return(t=this.$on.add(this.$off)).add(this.$label).css("width",""),e="auto"===this.options.handleWidth?Math.max(this.$on.width(),this.$off.width()):this.options.handleWidth,t.width(e),this.$label.width(function(t){return function(i,s){return"auto"!==t.options.labelWidth?t.options.labelWidth:s<e?e:s}}(this)),this._handleWidth=this.$on.outerWidth(),this._labelWidth=this.$label.outerWidth(),this.$container.width(2*this._handleWidth+this._labelWidth),this.$wrapper.width(this._handleWidth+this._labelWidth)},t.prototype._containerPosition=function(t,e){if(null==t&&(t=this.options.state),this.$container.css("margin-left",function(e){return function(){var i;return i=[0,"-"+e._handleWidth+"px"],e.options.indeterminate?"-"+e._handleWidth/2+"px":t?e.options.inverse?i[1]:i[0]:e.options.inverse?i[0]:i[1]}}(this)),e)return setTimeout(function(){return e()},50)},t.prototype._init=function(){var t,e;return t=function(t){return function(){return t.setPrevOptions(),t._width(),t._containerPosition(null,function(){if(t.options.animate)return t.$wrapper.addClass(t.options.baseClass+"-animate")})}}(this),this.$wrapper.is(":visible")?t():e=i.setInterval(function(s){return function(){if(s.$wrapper.is(":visible"))return t(),i.clearInterval(e)}}(this),50)},t.prototype._elementHandlers=function(){return this.$element.on({"setPreviousOptions.cswitch":function(t){return function(e){return t.setPrevOptions()}}(this),"previousState.cswitch":function(t){return function(e){return t.options=t.prevOptions,t.options.indeterminate&&t.$wrapper.addClass(t.options.baseClass+"-indeterminate"),t.$element.prop("checked",t.options.state).trigger("change.cswitch",!0)}}(this),"change.cswitch":function(t){return function(i,s){var n;if(i.preventDefault(),i.stopImmediatePropagation(),n=t.$element.is(":checked"),t._containerPosition(n),n!==t.options.state)return t.options.state=n,t.$wrapper.toggleClass(t.options.baseClass+"-off").toggleClass(t.options.baseClass+"-on"),s?void 0:(t.$element.is(":radio")&&e("[name='"+t.$element.attr("name")+"']").not(t.$element).prop("checked",!1).trigger("change.cswitch",!0),t.$element.trigger("switchChange.cswitch",[n]))}}(this),"focus.cswitch":function(t){return function(e){return e.preventDefault(),t.$wrapper.addClass(t.options.baseClass+"-focused")}}(this),"blur.cswitch":function(t){return function(e){return e.preventDefault(),t.$wrapper.removeClass(t.options.baseClass+"-focused")}}(this),"keydown.cswitch":function(t){return function(e){if(e.which&&!t.options.disabled&&!t.options.readonly)switch(e.which){case 37:return e.preventDefault(),e.stopImmediatePropagation(),t.state(!1);case 39:return e.preventDefault(),e.stopImmediatePropagation(),t.state(!0)}}}(this)})},t.prototype._handleHandlers=function(){return this.$on.on("click.cswitch",function(t){return function(e){return e.preventDefault(),e.stopPropagation(),t.state(!1),t.$element.trigger("focus.cswitch")}}(this)),this.$off.on("click.cswitch",function(t){return function(e){return e.preventDefault(),e.stopPropagation(),t.state(!0),t.$element.trigger("focus.cswitch")}}(this))},t.prototype._labelHandlers=function(){return this.$label.on({click:function(t){return t.stopPropagation()},"mousedown.cswitch touchstart.cswitch":function(t){return function(e){if(!(t._dragStart||t.options.disabled||t.options.readonly))return e.preventDefault(),e.stopPropagation(),t._dragStart=(e.pageX||e.originalEvent.touches[0].pageX)-parseInt(t.$container.css("margin-left"),10),t.options.animate&&t.$wrapper.removeClass(t.options.baseClass+"-animate"),t.$element.trigger("focus.cswitch")}}(this),"mousemove.cswitch touchmove.cswitch":function(t){return function(e){var i;if(null!=t._dragStart&&(e.preventDefault(),!((i=(e.pageX||e.originalEvent.touches[0].pageX)-t._dragStart)<-t._handleWidth||i>0)))return t._dragEnd=i,t.$container.css("margin-left",t._dragEnd+"px")}}(this),"mouseup.cswitch touchend.cswitch":function(t){return function(e){var i;if(t._dragStart)return e.preventDefault(),t.options.animate&&t.$wrapper.addClass(t.options.baseClass+"-animate"),t._dragEnd?(i=t._dragEnd>-t._handleWidth/2,t._dragEnd=!1,t.state(t.options.inverse?!i:i)):t.state(!t.options.state),t._dragStart=!1}}(this),"mouseleave.cswitch":function(t){return function(e){return t.$label.trigger("mouseup.cswitch")}}(this)})},t.prototype._externalLabelHandler=function(){var t;return(t=this.$element.closest("label")).on("click",function(e){return function(i){if(i.preventDefault(),i.stopImmediatePropagation(),i.target===t[0])return e.toggleState()}}(this))},t.prototype._formHandler=function(){var t;if(!(t=this.$element.closest("form")).data("c-switch"))return t.on("reset.cswitch",function(){return i.setTimeout(function(){return t.find("input").filter(function(){return e(this).data("c-switch")}).each(function(){return e(this).cswitch("state",this.checked)})},1)}).data("c-switch",!0)},t.prototype._getClasses=function(t){var i,s,n,o;if(!e.isArray(t))return[this.options.baseClass+"-"+t];for(s=[],n=0,o=t.length;n<o;n++)i=t[n],s.push(this.options.baseClass+"-"+i);return s},t}(),e.fn.cswitch=function(){var i,n,o;return n=arguments[0],i=2<=arguments.length?t.call(arguments,1):[],o=this,this.each(function(){var t,a;if(t=e(this),(a=t.data("c-switch"))||t.data("c-switch",a=new s(this,n)),"string"==typeof n)return o=a[n].apply(a,i)}),o},e.fn.cswitch.Constructor=s,e.fn.cswitch.defaults={state:!0,size:null,animate:!0,disabled:!1,readonly:!1,indeterminate:!1,inverse:!1,radioAllOff:!1,onColor:"primary",offColor:"default",onText:"ON",offText:"OFF",labelText:"&nbsp;",handleWidth:"auto",labelWidth:"auto",baseClass:"c-switch",wrapperClass:"wrapper",onInit:function(){},onSwitchChange:function(){}}}(window.jQuery,window)}).call(this);