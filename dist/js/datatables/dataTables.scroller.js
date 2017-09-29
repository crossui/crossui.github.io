!function(t){"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(s){return t(s,window,document)}):"object"==typeof exports?module.exports=function(s,o){return s||(s=window),o&&o.fn.dataTable||(o=require("datatables.net")(s,o).$),t(o,s,s.document)}:t(jQuery,window,document)}(function(t,s,o,e){"use strict";var i=t.fn.dataTable,r=function(s,i){this instanceof r?(i===e&&(i={}),this.s={dt:t.fn.dataTable.Api(s).settings()[0],tableTop:0,tableBottom:0,redrawTop:0,redrawBottom:0,autoHeight:!0,viewportRows:0,stateTO:null,drawTO:null,heights:{jump:null,page:null,virtual:null,scroll:null,row:null,viewport:null},topRowFloat:0,scrollDrawDiff:null,loaderVisible:!1},this.s=t.extend(this.s,r.oDefaults,i),this.s.heights.row=this.s.rowHeight,this.dom={force:o.createElement("div"),scroller:null,table:null,loader:null},this.s.dt.oScroller||(this.s.dt.oScroller=this,this._fnConstruct())):alert("Scroller warning: Scroller must be initialised with the 'new' keyword.")};t.extend(r.prototype,{fnRowToPixels:function(t,s,o){var i;if(o)i=this._domain("virtualToPhysical",t*this.s.heights.row);else{var r=t-this.s.baseRowTop;i=this.s.baseScrollTop+r*this.s.heights.row}return s||s===e?parseInt(i,10):i},fnPixelsToRow:function(t,s,o){var i=t-this.s.baseScrollTop,r=o?this._domain("physicalToVirtual",t)/this.s.heights.row:i/this.s.heights.row+this.s.baseRowTop;return s||s===e?parseInt(r,10):r},fnScrollToRow:function(s,o){var e=this,i=!1,r=this.fnRowToPixels(s),l=s-(this.s.displayBuffer-1)/2*this.s.viewportRows;l<0&&(l=0),(r>this.s.redrawBottom||r<this.s.redrawTop)&&this.s.dt._iDisplayStart!==l&&(i=!0,r=this.fnRowToPixels(s,!1,!0)),void 0===o||o?(this.s.ani=i,t(this.dom.scroller).animate({scrollTop:r},function(){setTimeout(function(){e.s.ani=!1},25)})):t(this.dom.scroller).scrollTop(r)},fnMeasure:function(s){this.s.autoHeight&&this._fnCalcRowHeight();var o=this.s.heights;o.row&&(o.viewport=t(this.dom.scroller).height(),this.s.viewportRows=parseInt(o.viewport/o.row,10)+1,this.s.dt._iDisplayLength=this.s.viewportRows*this.s.displayBuffer),(s===e||s)&&this.s.dt.oInstance.fnDraw(!1)},fnPageInfo:function(){var t=this.s.dt,s=this.dom.scroller.scrollTop,o=t.fnRecordsDisplay(),e=Math.ceil(this.fnPixelsToRow(s+this.s.heights.viewport,!1,this.s.ani));return{start:Math.floor(this.fnPixelsToRow(s,!1,this.s.ani)),end:o<e?o-1:e-1}},_fnConstruct:function(){var o=this;if(this.s.dt.oFeatures.bPaginate){this.dom.force.style.position="relative",this.dom.force.style.top="0px",this.dom.force.style.left="0px",this.dom.force.style.width="1px",this.dom.scroller=t("div."+this.s.dt.oClasses.sScrollBody,this.s.dt.nTableWrapper)[0],this.dom.scroller.appendChild(this.dom.force),this.dom.scroller.style.position="relative",this.dom.table=t(">table",this.dom.scroller)[0],this.dom.table.style.position="absolute",this.dom.table.style.top="0px",this.dom.table.style.left="0px",t(this.s.dt.nTableWrapper).addClass("DTS"),this.s.loadingIndicator&&(this.dom.loader=t('<div class="dataTables_processing DTS_Loading">'+this.s.dt.oLanguage.sLoadingRecords+"</div>").css("display","none"),t(this.dom.scroller.parentNode).css("position","relative").append(this.dom.loader)),this.s.heights.row&&"auto"!=this.s.heights.row&&(this.s.autoHeight=!1),this.fnMeasure(!1),this.s.ingnoreScroll=!0,this.s.stateSaveThrottle=this.s.dt.oApi._fnThrottle(function(){o.s.dt.oApi._fnSaveState(o.s.dt)},500),t(this.dom.scroller).on("scroll.DTS",function(t){o._fnScroll.call(o)}),t(this.dom.scroller).on("touchstart.DTS",function(){o._fnScroll.call(o)}),this.s.dt.aoDrawCallback.push({fn:function(){o.s.dt.bInitialised&&o._fnDrawCallback.call(o)},sName:"Scroller"}),t(s).on("resize.DTS",function(){o.fnMeasure(!1),o._fnInfo()});var e=!0;this.s.dt.oApi._fnCallbackReg(this.s.dt,"aoStateSaveParams",function(t,s){e&&o.s.dt.oLoadedState?(s.iScroller=o.s.dt.oLoadedState.iScroller,s.iScrollerTopRow=o.s.dt.oLoadedState.iScrollerTopRow,e=!1):(s.iScroller=o.dom.scroller.scrollTop,s.iScrollerTopRow=o.s.topRowFloat)},"Scroller_State"),this.s.dt.oLoadedState&&(this.s.topRowFloat=this.s.dt.oLoadedState.iScrollerTopRow||0),t(this.s.dt.nTable).one("init.dt",function(){o.fnMeasure()}),this.s.dt.aoDestroyCallback.push({sName:"Scroller",fn:function(){t(s).off("resize.DTS"),t(o.dom.scroller).off("touchstart.DTS scroll.DTS"),t(o.s.dt.nTableWrapper).removeClass("DTS"),t("div.DTS_Loading",o.dom.scroller.parentNode).remove(),t(o.s.dt.nTable).off("init.dt"),o.dom.table.style.position="",o.dom.table.style.top="",o.dom.table.style.left=""}})}else this.s.dt.oApi._fnLog(this.s.dt,0,"Pagination must be enabled for Scroller")},_fnScroll:function(){var s,o=this,e=this.s.heights,i=this.dom.scroller.scrollTop;if(!this.s.skip&&!this.s.ingnoreScroll)if(this.s.dt.bFiltered||this.s.dt.bSorted)this.s.lastScrollTop=0;else{if(this._fnInfo(),clearTimeout(this.s.stateTO),this.s.stateTO=setTimeout(function(){o.s.dt.oApi._fnSaveState(o.s.dt)},250),i<this.s.redrawTop||i>this.s.redrawBottom){var r=Math.ceil((this.s.displayBuffer-1)/2*this.s.viewportRows);if(Math.abs(i-this.s.lastScrollTop)>e.viewport||this.s.ani?(s=parseInt(this._domain("physicalToVirtual",i)/e.row,10)-r,this.s.topRowFloat=this._domain("physicalToVirtual",i)/e.row):(s=this.fnPixelsToRow(i)-r,this.s.topRowFloat=this.fnPixelsToRow(i,!1)),s<=0?s=0:s+this.s.dt._iDisplayLength>this.s.dt.fnRecordsDisplay()?(s=this.s.dt.fnRecordsDisplay()-this.s.dt._iDisplayLength)<0&&(s=0):s%2!=0&&s++,s!=this.s.dt._iDisplayStart){this.s.tableTop=t(this.s.dt.nTable).offset().top,this.s.tableBottom=t(this.s.dt.nTable).height()+this.s.tableTop;var l=function(){null===o.s.scrollDrawReq&&(o.s.scrollDrawReq=i),o.s.dt._iDisplayStart=s,o.s.dt.oApi._fnDraw(o.s.dt)};this.s.dt.oFeatures.bServerSide?(clearTimeout(this.s.drawTO),this.s.drawTO=setTimeout(l,this.s.serverWait)):l(),this.dom.loader&&!this.s.loaderVisible&&(this.dom.loader.css("display","block"),this.s.loaderVisible=!0)}}else this.s.topRowFloat=this._domain("physicalToVirtual",i)/e.row;this.s.lastScrollTop=i,this.s.stateSaveThrottle()}},_domain:function(t,s){var o,e=this.s.heights;if(e.virtual===e.scroll)return s;var i=(e.scroll-e.viewport)/2,r=(e.virtual-e.viewport)/2;return o=r/(i*i),"virtualToPhysical"===t?s<r?Math.pow(s/o,.5):(s=2*r-s)<0?e.scroll:2*i-Math.pow(s/o,.5):"physicalToVirtual"===t?s<i?s*s*o:(s=2*i-s)<0?e.virtual:2*r-s*s*o:void 0},_fnDrawCallback:function(){var s=this,o=this.s.heights,e=this.dom.scroller.scrollTop,i=(o.viewport,t(this.s.dt.nTable).height()),r=this.s.dt._iDisplayStart,l=this.s.dt._iDisplayLength,a=this.s.dt.fnRecordsDisplay();this.s.skip=!0,this._fnScrollForce(),e=0===r?this.s.topRowFloat*o.row:r+l>=a?o.scroll-(a-this.s.topRowFloat)*o.row:this._domain("virtualToPhysical",this.s.topRowFloat*o.row),this.dom.scroller.scrollTop=e,this.s.baseScrollTop=e,this.s.baseRowTop=this.s.topRowFloat;var n=e-(this.s.topRowFloat-r)*o.row;0===r?n=0:r+l>=a&&(n=o.scroll-i),this.dom.table.style.top=n+"px",this.s.tableTop=n,this.s.tableBottom=i+this.s.tableTop;var h=(e-this.s.tableTop)*this.s.boundaryScale;if(this.s.redrawTop=e-h,this.s.redrawBottom=e+h,this.s.skip=!1,this.s.dt.oFeatures.bStateSave&&null!==this.s.dt.oLoadedState&&void 0!==this.s.dt.oLoadedState.iScroller){var d=!(!this.s.dt.sAjaxSource&&!s.s.dt.ajax||this.s.dt.oFeatures.bServerSide);(d&&2==this.s.dt.iDraw||!d&&1==this.s.dt.iDraw)&&setTimeout(function(){t(s.dom.scroller).scrollTop(s.s.dt.oLoadedState.iScroller),s.s.redrawTop=s.s.dt.oLoadedState.iScroller-o.viewport/2,setTimeout(function(){s.s.ingnoreScroll=!1},0)},0)}else s.s.ingnoreScroll=!1;this.s.dt.oFeatures.bInfo&&setTimeout(function(){s._fnInfo.call(s)},0),this.dom.loader&&this.s.loaderVisible&&(this.dom.loader.css("display","none"),this.s.loaderVisible=!1)},_fnScrollForce:function(){var t=this.s.heights;t.virtual=t.row*this.s.dt.fnRecordsDisplay(),t.scroll=t.virtual,t.scroll>1e6&&(t.scroll=1e6),this.dom.force.style.height=t.scroll>this.s.heights.row?t.scroll+"px":this.s.heights.row+"px"},_fnCalcRowHeight:function(){var s=this.s.dt,o=s.nTable,e=o.cloneNode(!1),i=t("<tbody/>").appendTo(e),r=t('<div class="'+s.oClasses.sWrapper+' DTS"><div class="'+s.oClasses.sScrollWrapper+'"><div class="'+s.oClasses.sScrollBody+'"></div></div></div>');for(t("tbody tr:lt(4)",o).clone().appendTo(i);t("tr",i).length<3;)i.append("<tr><td>&nbsp;</td></tr>");t("div."+s.oClasses.sScrollBody,r).append(e);var l=this.s.dt.nHolding||o.parentNode;t(l).is(":visible")||(l="body"),r.appendTo(l),this.s.heights.row=t("tr",i).eq(1).outerHeight(),r.remove()},_fnInfo:function(){if(this.s.dt.oFeatures.bInfo){var s,o=this.s.dt,e=o.oLanguage,i=this.dom.scroller.scrollTop,r=Math.floor(this.fnPixelsToRow(i,!1,this.s.ani)+1),l=o.fnRecordsTotal(),a=o.fnRecordsDisplay(),n=Math.ceil(this.fnPixelsToRow(i+this.s.heights.viewport,!1,this.s.ani)),h=a<n?a:n,d=o.fnFormatNumber(r),c=o.fnFormatNumber(h),f=o.fnFormatNumber(l),p=o.fnFormatNumber(a);s=0===o.fnRecordsDisplay()&&o.fnRecordsDisplay()==o.fnRecordsTotal()?e.sInfoEmpty+e.sInfoPostFix:0===o.fnRecordsDisplay()?e.sInfoEmpty+" "+e.sInfoFiltered.replace("_MAX_",f)+e.sInfoPostFix:o.fnRecordsDisplay()==o.fnRecordsTotal()?e.sInfo.replace("_START_",d).replace("_END_",c).replace("_MAX_",f).replace("_TOTAL_",p)+e.sInfoPostFix:e.sInfo.replace("_START_",d).replace("_END_",c).replace("_MAX_",f).replace("_TOTAL_",p)+" "+e.sInfoFiltered.replace("_MAX_",o.fnFormatNumber(o.fnRecordsTotal()))+e.sInfoPostFix;var u=e.fnInfoCallback;u&&(s=u.call(o.oInstance,o,r,h,l,a,s));var w=o.aanFeatures.i;if(void 0!==w)for(var T=0,S=w.length;T<S;T++)t(w[T]).html(s);t(o.nTable).triggerHandler("info.dt")}}}),r.defaults={trace:!1,rowHeight:"auto",serverWait:200,displayBuffer:9,boundaryScale:.5,loadingIndicator:!1},r.oDefaults=r.defaults,r.version="1.4.2","function"==typeof t.fn.dataTable&&"function"==typeof t.fn.dataTableExt.fnVersionCheck&&t.fn.dataTableExt.fnVersionCheck("1.10.0")?t.fn.dataTableExt.aoFeatures.push({fnInit:function(t){var s=t.oInit,o=s.scroller||s.oScroller||{};new r(t,o)},cFeature:"S",sFeature:"Scroller"}):alert("Warning: Scroller requires DataTables 1.10.0 or greater - www.datatables.net/download"),t(o).on("preInit.dt.dtscroller",function(s,o){if("dt"===s.namespace){var e=o.oInit.scroller,l=i.defaults.scroller;if(e||l){var a=t.extend({},e,l);!1!==e&&new r(o,a)}}}),t.fn.dataTable.Scroller=r,t.fn.DataTable.Scroller=r;var l=t.fn.dataTable.Api;return l.register("scroller()",function(){return this}),l.register("scroller().rowToPixels()",function(t,s,o){var e=this.context;if(e.length&&e[0].oScroller)return e[0].oScroller.fnRowToPixels(t,s,o)}),l.register("scroller().pixelsToRow()",function(t,s,o){var e=this.context;if(e.length&&e[0].oScroller)return e[0].oScroller.fnPixelsToRow(t,s,o)}),l.register("scroller().scrollToRow()",function(t,s){return this.iterator("table",function(o){o.oScroller&&o.oScroller.fnScrollToRow(t,s)}),this}),l.register("row().scrollTo()",function(t){var s=this;return this.iterator("row",function(o,e){if(o.oScroller){var i=s.rows({order:"applied",search:"applied"}).indexes().indexOf(e);o.oScroller.fnScrollToRow(i,t)}}),this}),l.register("scroller.measure()",function(t){return this.iterator("table",function(s){s.oScroller&&s.oScroller.fnMeasure(t)}),this}),l.register("scroller.page()",function(){var t=this.context;if(t.length&&t[0].oScroller)return t[0].oScroller.fnPageInfo()}),r});