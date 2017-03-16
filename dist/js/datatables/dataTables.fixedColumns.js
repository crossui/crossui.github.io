!function(t){"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(e){return t(e,window,document)}):"object"==typeof exports?module.exports=function(e,i){return e||(e=window),i&&i.fn.dataTable||(i=require("datatables.net")(e,i).$),t(i,e,e.document)}:t(jQuery,window,document)}(function(t,e,i,o){"use strict";var n,l=t.fn.dataTable,s=function(e,i){var n=this;if(!(this instanceof s))return void alert("FixedColumns warning: FixedColumns must be initialised with the 'new' keyword.");i!==o&&i!==!0||(i={});var l=t.fn.dataTable.camelToHungarian;l&&(l(s.defaults,s.defaults,!0),l(s.defaults,i));var r=new t.fn.dataTable.Api(e).settings()[0];if(this.s={dt:r,iTableColumns:r.aoColumns.length,aiOuterWidths:[],aiInnerWidths:[],rtl:"rtl"===t(r.nTable).css("direction")},this.dom={scroller:null,header:null,body:null,footer:null,grid:{wrapper:null,dt:null,left:{wrapper:null,head:null,body:null,foot:null},right:{wrapper:null,head:null,body:null,foot:null}},clone:{left:{header:null,body:null,footer:null},right:{header:null,body:null,footer:null}}},r._oFixedColumns)throw"FixedColumns already initialised on this table";r._oFixedColumns=this,r._bInitComplete?this._fnConstruct(i):r.oApi._fnCallbackReg(r,"aoInitComplete",function(){n._fnConstruct(i)},"FixedColumns")};return t.extend(s.prototype,{fnUpdate:function(){this._fnDraw(!0)},fnRedrawLayout:function(){this._fnColCalc(),this._fnGridLayout(),this.fnUpdate()},fnRecalculateHeight:function(t){delete t._DTTC_iHeight,t.style.height="auto"},fnSetRowHeight:function(t,e){t.style.height=e+"px"},fnGetPosition:function(e){var i,o=this.s.dt.oInstance;if(t(e).parents(".DTFC_Cloned").length){if("tr"===e.nodeName.toLowerCase())return i=t(e).index(),o.fnGetPosition(t("tr",this.s.dt.nTBody)[i]);var n=t(e).index();i=t(e.parentNode).index();return[o.fnGetPosition(t("tr",this.s.dt.nTBody)[i]),n,o.oApi._fnVisibleToColumnIndex(this.s.dt,n)]}return o.fnGetPosition(e)},_fnConstruct:function(n){var l=this;if("function"!=typeof this.s.dt.oInstance.fnVersionCheck||this.s.dt.oInstance.fnVersionCheck("1.8.0")!==!0)return void alert("FixedColumns "+s.VERSION+" required DataTables 1.8.0 or later. Please upgrade your DataTables installation");if(""===this.s.dt.oScroll.sX)return void this.s.dt.oInstance.oApi._fnLog(this.s.dt,1,"FixedColumns is not needed (no x-scrolling in DataTables enabled), so no action will be taken. Use 'FixedHeader' for column fixing when scrolling is not enabled");this.s=t.extend(!0,this.s,s.defaults,n);var r=this.s.dt.oClasses;this.dom.grid.dt=t(this.s.dt.nTable).parents("div."+r.sScrollWrapper)[0],this.dom.scroller=t("div."+r.sScrollBody,this.dom.grid.dt)[0],this._fnColCalc(),this._fnGridSetup();var d,a=!1;t(this.s.dt.nTableWrapper).on("mousedown.DTFC",function(){a=!0,t(i).one("mouseup",function(){a=!1})}),t(this.dom.scroller).on("mouseover.DTFC touchstart.DTFC",function(){a||(d="main")}).on("scroll.DTFC",function(t){!d&&t.originalEvent&&(d="main"),"main"===d&&(l.s.iLeftColumns>0&&(l.dom.grid.left.liner.scrollTop=l.dom.scroller.scrollTop),l.s.iRightColumns>0&&(l.dom.grid.right.liner.scrollTop=l.dom.scroller.scrollTop))});var h="onwheel"in i.createElement("div")?"wheel.DTFC":"mousewheel.DTFC";l.s.iLeftColumns>0&&t(l.dom.grid.left.liner).on("mouseover.DTFC touchstart.DTFC",function(){a||(d="left")}).on("scroll.DTFC",function(t){!d&&t.originalEvent&&(d="left"),"left"===d&&(l.dom.scroller.scrollTop=l.dom.grid.left.liner.scrollTop,l.s.iRightColumns>0&&(l.dom.grid.right.liner.scrollTop=l.dom.grid.left.liner.scrollTop))}).on(h,function(t){var e="wheel"===t.type?-t.originalEvent.deltaX:t.originalEvent.wheelDeltaX;l.dom.scroller.scrollLeft-=e}),l.s.iRightColumns>0&&t(l.dom.grid.right.liner).on("mouseover.DTFC touchstart.DTFC",function(){a||(d="right")}).on("scroll.DTFC",function(t){!d&&t.originalEvent&&(d="right"),"right"===d&&(l.dom.scroller.scrollTop=l.dom.grid.right.liner.scrollTop,l.s.iLeftColumns>0&&(l.dom.grid.left.liner.scrollTop=l.dom.grid.right.liner.scrollTop))}).on(h,function(t){var e="wheel"===t.type?-t.originalEvent.deltaX:t.originalEvent.wheelDeltaX;l.dom.scroller.scrollLeft-=e}),t(e).on("resize.DTFC",function(){l._fnGridLayout.call(l)});var f=!0,u=t(this.s.dt.nTable);u.on("draw.dt.DTFC",function(){l._fnColCalc(),l._fnDraw.call(l,f),f=!1}).on("column-sizing.dt.DTFC",function(){l._fnColCalc(),l._fnGridLayout(l)}).on("column-visibility.dt.DTFC",function(t,e,i,n,s){(s===o||s)&&(l._fnColCalc(),l._fnGridLayout(l),l._fnDraw(!0))}).on("select.dt.DTFC deselect.dt.DTFC",function(t,e,i,o){"dt"===t.namespace&&l._fnDraw(!1)}).on("destroy.dt.DTFC",function(){u.off(".DTFC"),t(l.dom.scroller).off(".DTFC"),t(e).off(".DTFC"),t(l.s.dt.nTableWrapper).off(".DTFC"),t(l.dom.grid.left.liner).off(".DTFC "+h),t(l.dom.grid.left.wrapper).remove(),t(l.dom.grid.right.liner).off(".DTFC "+h),t(l.dom.grid.right.wrapper).remove()}),this._fnGridLayout(),this.s.dt.oInstance.fnDraw(!1)},_fnColCalc:function(){var e=this,i=0,o=0;this.s.aiInnerWidths=[],this.s.aiOuterWidths=[],t.each(this.s.dt.aoColumns,function(n,l){var s,r=t(l.nTh);if(r.filter(":visible").length){var d=r.outerWidth();0===e.s.aiOuterWidths.length&&(s=t(e.s.dt.nTable).css("border-left-width"),d+="string"==typeof s?1:parseInt(s,10)),e.s.aiOuterWidths.length===e.s.dt.aoColumns.length-1&&(s=t(e.s.dt.nTable).css("border-right-width"),d+="string"==typeof s?1:parseInt(s,10)),e.s.aiOuterWidths.push(d),e.s.aiInnerWidths.push(r.width()),n<e.s.iLeftColumns&&(i+=d),e.s.iTableColumns-e.s.iRightColumns<=n&&(o+=d)}else e.s.aiInnerWidths.push(0),e.s.aiOuterWidths.push(0)}),this.s.iLeftWidth=i,this.s.iRightWidth=o},_fnGridSetup:function(){var e,i=this._fnDTOverflow();this.dom.body=this.s.dt.nTable,this.dom.header=this.s.dt.nTHead.parentNode,this.dom.header.parentNode.parentNode.style.position="relative";var o=t('<div class="DTFC_ScrollWrapper" style="position:relative; clear:both;"><div class="DTFC_LeftWrapper" style="position:absolute; top:0; left:0;"><div class="DTFC_LeftHeadWrapper" style="position:relative; top:0; left:0; overflow:hidden;"></div><div class="DTFC_LeftBodyWrapper" style="position:relative; top:0; left:0; overflow:hidden;"><div class="DTFC_LeftBodyLiner" style="position:relative; top:0; left:0; overflow-y:scroll;"></div></div><div class="DTFC_LeftFootWrapper" style="position:relative; top:0; left:0; overflow:hidden;"></div></div><div class="DTFC_RightWrapper" style="position:absolute; top:0; right:0;"><div class="DTFC_RightHeadWrapper" style="position:relative; top:0; left:0;"><div class="DTFC_RightHeadBlocker DTFC_Blocker" style="position:absolute; top:0; bottom:0;"></div></div><div class="DTFC_RightBodyWrapper" style="position:relative; top:0; left:0; overflow:hidden;"><div class="DTFC_RightBodyLiner" style="position:relative; top:0; left:0; overflow-y:scroll;"></div></div><div class="DTFC_RightFootWrapper" style="position:relative; top:0; left:0;"><div class="DTFC_RightFootBlocker DTFC_Blocker" style="position:absolute; top:0; bottom:0;"></div></div></div></div>')[0],n=o.childNodes[0],l=o.childNodes[1];this.dom.grid.dt.parentNode.insertBefore(o,this.dom.grid.dt),o.appendChild(this.dom.grid.dt),this.dom.grid.wrapper=o,this.s.iLeftColumns>0&&(this.dom.grid.left.wrapper=n,this.dom.grid.left.head=n.childNodes[0],this.dom.grid.left.body=n.childNodes[1],this.dom.grid.left.liner=t("div.DTFC_LeftBodyLiner",o)[0],o.appendChild(n)),this.s.iRightColumns>0&&(this.dom.grid.right.wrapper=l,this.dom.grid.right.head=l.childNodes[0],this.dom.grid.right.body=l.childNodes[1],this.dom.grid.right.liner=t("div.DTFC_RightBodyLiner",o)[0],l.style.right=i.bar+"px",e=t("div.DTFC_RightHeadBlocker",o)[0],e.style.width=i.bar+"px",e.style.right=-i.bar+"px",this.dom.grid.right.headBlock=e,e=t("div.DTFC_RightFootBlocker",o)[0],e.style.width=i.bar+"px",e.style.right=-i.bar+"px",this.dom.grid.right.footBlock=e,o.appendChild(l)),this.s.dt.nTFoot&&(this.dom.footer=this.s.dt.nTFoot.parentNode,this.s.iLeftColumns>0&&(this.dom.grid.left.foot=n.childNodes[2]),this.s.iRightColumns>0&&(this.dom.grid.right.foot=l.childNodes[2])),this.s.rtl&&t("div.DTFC_RightHeadBlocker",o).css({left:-i.bar+"px",right:""})},_fnGridLayout:function(){var e,i=this,o=this.dom.grid,n=(t(o.wrapper).width(),t(this.s.dt.nTable.parentNode).outerHeight()),l=t(this.s.dt.nTable.parentNode.parentNode).outerHeight(),s=this._fnDTOverflow(),r=this.s.iLeftWidth,d=this.s.iRightWidth,a="rtl"===t(this.dom.body).css("direction"),h=function(e,o){s.bar?i._firefoxScrollError()?t(e).height()>34&&(e.style.width=o+s.bar+"px"):e.style.width=o+s.bar+"px":(e.style.width=o+20+"px",e.style.paddingRight="20px",e.style.boxSizing="border-box")};s.x&&(n-=s.bar),o.wrapper.style.height=l+"px",this.s.iLeftColumns>0&&(e=o.left.wrapper,e.style.width=r+"px",e.style.height="1px",a?(e.style.left="",e.style.right=0):(e.style.left=0,e.style.right=""),o.left.body.style.height=n+"px",o.left.foot&&(o.left.foot.style.top=(s.x?s.bar:0)+"px"),h(o.left.liner,r),o.left.liner.style.height=n+"px"),this.s.iRightColumns>0&&(e=o.right.wrapper,e.style.width=d+"px",e.style.height="1px",this.s.rtl?(e.style.left=s.y?s.bar+"px":0,e.style.right=""):(e.style.left="",e.style.right=s.y?s.bar+"px":0),o.right.body.style.height=n+"px",o.right.foot&&(o.right.foot.style.top=(s.x?s.bar:0)+"px"),h(o.right.liner,d),o.right.liner.style.height=n+"px",o.right.headBlock.style.display=s.y?"block":"none",o.right.footBlock.style.display=s.y?"block":"none")},_fnDTOverflow:function(){var t=this.s.dt.nTable,e=t.parentNode,i={x:!1,y:!1,bar:this.s.dt.oScroll.iBarWidth};return t.offsetWidth>e.clientWidth&&(i.x=!0),t.offsetHeight>e.clientHeight&&(i.y=!0),i},_fnDraw:function(e){this._fnGridLayout(),this._fnCloneLeft(e),this._fnCloneRight(e),null!==this.s.fnDrawCallback&&this.s.fnDrawCallback.call(this,this.dom.clone.left,this.dom.clone.right),t(this).trigger("draw.dtfc",{leftClone:this.dom.clone.left,rightClone:this.dom.clone.right})},_fnCloneRight:function(t){if(!(this.s.iRightColumns<=0)){var e,i=[];for(e=this.s.iTableColumns-this.s.iRightColumns;e<this.s.iTableColumns;e++)this.s.dt.aoColumns[e].bVisible&&i.push(e);this._fnClone(this.dom.clone.right,this.dom.grid.right,i,t)}},_fnCloneLeft:function(t){if(!(this.s.iLeftColumns<=0)){var e,i=[];for(e=0;e<this.s.iLeftColumns;e++)this.s.dt.aoColumns[e].bVisible&&i.push(e);this._fnClone(this.dom.clone.left,this.dom.grid.left,i,t)}},_fnCopyLayout:function(e,i,o){for(var n=[],l=[],s=[],r=0,d=e.length;r<d;r++){var a=[];a.nTr=t(e[r].nTr).clone(o,!1)[0];for(var h=0,f=this.s.iTableColumns;h<f;h++)if(t.inArray(h,i)!==-1){var u=t.inArray(e[r][h].cell,s);if(u===-1){var c=t(e[r][h].cell).clone(o,!1)[0];l.push(c),s.push(e[r][h].cell),a.push({cell:c,unique:e[r][h].unique})}else a.push({cell:l[u],unique:e[r][h].unique})}n.push(a)}return n},_fnClone:function(e,i,n,l){var s,r,d,a,h,f,u,c,p,g,m=this,C=this.s.dt;if(l){for(t(e.header).remove(),e.header=t(this.dom.header).clone(!0,!1)[0],e.header.className+=" DTFC_Cloned",e.header.style.width="100%",i.head.appendChild(e.header),c=this._fnCopyLayout(C.aoHeader,n,!0),p=t(">thead",e.header),p.empty(),s=0,r=c.length;s<r;s++)p[0].appendChild(c[s].nTr);C.oApi._fnDrawHead(C,c,!0)}else for(c=this._fnCopyLayout(C.aoHeader,n,!1),g=[],C.oApi._fnDetectHeader(g,t(">thead",e.header)[0]),s=0,r=c.length;s<r;s++)for(d=0,a=c[s].length;d<a;d++)g[s][d].cell.className=c[s][d].cell.className,t("span.DataTables_sort_icon",g[s][d].cell).each(function(){this.className=t("span.DataTables_sort_icon",c[s][d].cell)[0].className});this._fnEqualiseHeights("thead",this.dom.header,e.header),"auto"==this.s.sHeightMatch&&t(">tbody>tr",m.dom.body).css("height","auto"),null!==e.body&&(t(e.body).remove(),e.body=null),e.body=t(this.dom.body).clone(!0)[0],e.body.className+=" DTFC_Cloned",e.body.style.paddingBottom=C.oScroll.iBarWidth+"px",e.body.style.marginBottom=2*C.oScroll.iBarWidth+"px",null!==e.body.getAttribute("id")&&e.body.removeAttribute("id"),t(">thead>tr",e.body).empty(),t(">tfoot",e.body).remove();var y=t("tbody",e.body)[0];if(t(y).empty(),C.aiDisplay.length>0){var b=t(">thead>tr",e.body)[0];for(u=0;u<n.length;u++){h=n[u],f=t(C.aoColumns[h].nTh).clone(!0)[0],f.innerHTML="";var T=f.style;T.paddingTop="0",T.paddingBottom="0",T.borderTopWidth="0",T.borderBottomWidth="0",T.height=0,T.width=m.s.aiInnerWidths[h]+"px",b.appendChild(f)}t(">tbody>tr",m.dom.body).each(function(e){var i=m.s.dt.oFeatures.bServerSide===!1?m.s.dt.aiDisplay[m.s.dt._iDisplayStart+e]:e,o=m.s.dt.aoData[i].anCells||t(this).children("td, th"),l=this.cloneNode(!1);for(l.removeAttribute("id"),l.setAttribute("data-dt-row",i),u=0;u<n.length;u++)h=n[u],o.length>0&&(f=t(o[h]).clone(!0,!0)[0],f.setAttribute("data-dt-row",i),f.setAttribute("data-dt-column",h),l.appendChild(f));y.appendChild(l)})}else t(">tbody>tr",m.dom.body).each(function(e){f=this.cloneNode(!0),f.className+=" DTFC_NoData",t("td",f).html(""),y.appendChild(f)});if(e.body.style.width="100%",e.body.style.margin="0",e.body.style.padding="0",C.oScroller!==o){var v=C.oScroller.dom.force;i.forcer?i.forcer.style.height=v.style.height:(i.forcer=v.cloneNode(!0),i.liner.appendChild(i.forcer))}if(i.liner.appendChild(e.body),this._fnEqualiseHeights("tbody",m.dom.body,e.body),null!==C.nTFoot){if(l){null!==e.footer&&e.footer.parentNode.removeChild(e.footer),e.footer=t(this.dom.footer).clone(!0,!0)[0],e.footer.className+=" DTFC_Cloned",e.footer.style.width="100%",i.foot.appendChild(e.footer),c=this._fnCopyLayout(C.aoFooter,n,!0);var _=t(">tfoot",e.footer);for(_.empty(),s=0,r=c.length;s<r;s++)_[0].appendChild(c[s].nTr);C.oApi._fnDrawHead(C,c,!0)}else{c=this._fnCopyLayout(C.aoFooter,n,!1);var w=[];for(C.oApi._fnDetectHeader(w,t(">tfoot",e.footer)[0]),s=0,r=c.length;s<r;s++)for(d=0,a=c[s].length;d<a;d++)w[s][d].cell.className=c[s][d].cell.className}this._fnEqualiseHeights("tfoot",this.dom.footer,e.footer)}var x=C.oApi._fnGetUniqueThs(C,t(">thead",e.header)[0]);t(x).each(function(t){h=n[t],this.style.width=m.s.aiInnerWidths[h]+"px"}),null!==m.s.dt.nTFoot&&(x=C.oApi._fnGetUniqueThs(C,t(">tfoot",e.footer)[0]),t(x).each(function(t){h=n[t],this.style.width=m.s.aiInnerWidths[h]+"px"}))},_fnGetTrNodes:function(t){for(var e=[],i=0,o=t.childNodes.length;i<o;i++)"TR"==t.childNodes[i].nodeName.toUpperCase()&&e.push(t.childNodes[i]);return e},_fnEqualiseHeights:function(e,i,o){if("none"!=this.s.sHeightMatch||"thead"===e||"tfoot"===e){var n,l,s,r,d,a=i.getElementsByTagName(e)[0],h=o.getElementsByTagName(e)[0],f=t(">"+e+">tr:eq(0)",i).children(":first"),u=(f.outerHeight(),f.height(),this._fnGetTrNodes(a)),c=this._fnGetTrNodes(h),p=[];for(n=0,l=c.length;n<l;n++)r=u[n].offsetHeight,d=c[n].offsetHeight,s=d>r?d:r,"semiauto"==this.s.sHeightMatch&&(u[n]._DTTC_iHeight=s),p.push(s);for(n=0,l=c.length;n<l;n++)c[n].style.height=p[n]+"px",u[n].style.height=p[n]+"px"}},_firefoxScrollError:function(){if(n===o){var e=t("<div/>").css({position:"absolute",top:0,left:0,height:10,width:50,overflow:"scroll"}).appendTo("body");n=e[0].clientWidth===e[0].offsetWidth&&0!==this._fnDTOverflow().bar,e.remove()}return n}}),s.defaults={iLeftColumns:1,iRightColumns:0,fnDrawCallback:null,sHeightMatch:"semiauto"},s.version="3.2.2",l.Api.register("fixedColumns()",function(){return this}),l.Api.register("fixedColumns().update()",function(){return this.iterator("table",function(t){t._oFixedColumns&&t._oFixedColumns.fnUpdate()})}),l.Api.register("fixedColumns().relayout()",function(){return this.iterator("table",function(t){t._oFixedColumns&&t._oFixedColumns.fnRedrawLayout()})}),l.Api.register("rows().recalcHeight()",function(){return this.iterator("row",function(t,e){t._oFixedColumns&&t._oFixedColumns.fnRecalculateHeight(this.row(e).node())})}),l.Api.register("fixedColumns().rowIndex()",function(e){return e=t(e),e.parents(".DTFC_Cloned").length?this.rows({page:"current"}).indexes()[e.index()]:this.row(e).index()}),l.Api.register("fixedColumns().cellIndex()",function(e){if(e=t(e),e.parents(".DTFC_Cloned").length){var i,o=e.parent().index(),n=this.rows({page:"current"}).indexes()[o];if(e.parents(".DTFC_LeftWrapper").length)i=e.index();else{i=this.columns().flatten().length-this.context[0]._oFixedColumns.s.iRightColumns+e.index()}return{row:n,column:this.column.index("toData",i),columnVisible:i}}return this.cell(e).index()}),t(i).on("init.dt.fixedColumns",function(e,i){if("dt"===e.namespace){var o=i.oInit.fixedColumns,n=l.defaults.fixedColumns;if(o||n){var r=t.extend({},o,n);o!==!1&&new s(i,r)}}}),t.fn.dataTable.FixedColumns=s,t.fn.DataTable.FixedColumns=s,s});