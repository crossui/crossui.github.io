!function(e){"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(t){return e(t,window,document)}):"object"==typeof exports?module.exports=function(t,l){return t||(t=window),l&&l.fn.dataTable||(l=require("datatables.net")(t,l).$),e(l,t,t.document)}:e(jQuery,window,document)}(function(e,t,l,s){"use strict";function c(e,t,l){var s,c,n,a=function(t,l){if(t>l){var s=l;l=t,t=s}var c=!1;return e.columns(":visible").indexes().filter(function(e){return e===t&&(c=!0),e===l?(c=!1,!0):c})},o=function(t,l){var s=e.rows({search:"applied"}).indexes();if(s.indexOf(t)>s.indexOf(l)){var c=l;l=t,t=c}var n=!1;return s.filter(function(e){return e===t&&(n=!0),e===l?(n=!1,!0):n})};e.cells({selected:!0}).any()||l?(c=a(l.column,t.column),n=o(l.row,t.row)):(c=a(0,t.column),n=o(0,t.row)),s=e.cells(n,c).flatten(),e.cells(t,{selected:!0}).any()?e.cells(s).deselect():e.cells(s).select()}function n(t){var l=t.settings()[0],s=l._select.selector;e(t.table().container()).off("mousedown.dtSelect",s).off("mouseup.dtSelect",s).off("click.dtSelect",s),e("body").off("click.dtSelect")}function a(l){var s=e(l.table().container()),c=l.settings()[0],n=c._select.selector;s.on("mousedown.dtSelect",n,function(e){(e.shiftKey||e.metaKey||e.ctrlKey)&&s.css("-moz-user-select","none").one("selectstart.dtSelect",n,function(){return!1})}).on("mouseup.dtSelect",n,function(){s.css("-moz-user-select","")}).on("click.dtSelect",n,function(s){var c,n=l.select.items();if(!t.getSelection||!t.getSelection().toString()){var a=l.settings()[0];if(e(s.target).closest("div.dataTables_wrapper")[0]==l.table().container()){var i=l.cell(e(s.target).closest("td, th"));if(i.any()){var r=e.Event("user-select.dt");if(o(l,r,[n,i,s]),!r.isDefaultPrevented()){var u=i.index();"row"===n?(c=u.row,f(s,l,a,"row",c)):"column"===n?(c=i.index().column,f(s,l,a,"column",c)):"cell"===n&&(c=i.index(),f(s,l,a,"cell",c)),a._select_lastCell=u}}}}}),e("body").on("click.dtSelect",function(t){if(c._select.blurable){if(e(t.target).parents().filter(l.table().container()).length)return;if(e(t.target).parents("div.DTE").length)return;d(c,!0)}})}function o(t,l,s,c){c&&!t.flatten().length||("string"==typeof l&&(l+=".dt"),s.unshift(t),e(t.table().node()).triggerHandler(l,s))}function i(t){var l=t.settings()[0];if(l._select.info&&l.aanFeatures.i){var s=e('<span class="select-info"/>'),c=function(l,c){s.append(e('<span class="select-item"/>').append(t.i18n("select."+l+"s",{_:"%d "+l+"s selected",0:"",1:"1 "+l+" selected"},c)))};c("row",t.rows({selected:!0}).flatten().length),c("column",t.columns({selected:!0}).flatten().length),c("cell",t.cells({selected:!0}).flatten().length),e.each(l.aanFeatures.i,function(t,l){l=e(l);var c=l.children("span.select-info");c.length&&c.remove(),""!==s.text()&&l.append(s)})}}function r(t){var l=new h.Api(t);t.aoRowCreatedCallback.push({fn:function(l,s,c){var n,a,o=t.aoData[c];for(o._select_selected&&e(l).addClass(t._select.className),n=0,a=t.aoColumns.length;n<a;n++)(t.aoColumns[n]._select_selected||o._selected_cells&&o._selected_cells[n])&&e(o.anCells[n]).addClass(t._select.className)},sName:"select-deferRender"}),l.on("preXhr.dt.dtSelect",function(){var e=l.rows({selected:!0}).ids(!0).filter(function(e){return e!==s}),t=l.cells({selected:!0}).eq(0).map(function(e){var t=l.row(e.row).id(!0);return t?{row:t,column:e.column}:s}).filter(function(e){return e!==s});l.one("draw.dt.dtSelect",function(){l.rows(e).select(),t.any()&&t.each(function(e){l.cells(e.row,e.column).select()})})}),l.on("draw.dtSelect.dt select.dtSelect.dt deselect.dtSelect.dt info.dt",function(){i(l)}),l.on("destroy.dtSelect",function(){n(l),l.off(".dtSelect")})}function u(t,l,s,c){var n=t[l+"s"]({search:"applied"}).indexes(),a=e.inArray(c,n),o=e.inArray(s,n);if(t[l+"s"]({selected:!0}).any()||a!==-1){if(a>o){var i=o;o=a,a=i}n.splice(o+1,n.length),n.splice(0,a)}else n.splice(e.inArray(s,n)+1,n.length);t[l](s,{selected:!0}).any()?(n.splice(e.inArray(s,n),1),t[l+"s"](n).deselect()):t[l+"s"](n).select()}function d(e,t){if(t||"single"===e._select.style){var l=new h.Api(e);l.rows({selected:!0}).deselect(),l.columns({selected:!0}).deselect(),l.cells({selected:!0}).deselect()}}function f(e,t,l,s,n){var a=t.select.style(),o=t[s](n,{selected:!0}).any();if("os"===a)if(e.ctrlKey||e.metaKey)t[s](n).select(!o);else if(e.shiftKey)"cell"===s?c(t,n,l._select_lastCell||null):u(t,s,n,l._select_lastCell?l._select_lastCell[s]:null);else{var i=t[s+"s"]({selected:!0});o&&1===i.flatten().length?t[s](n).deselect():(i.deselect(),t[s](n).select())}else"multi+shift"==a&&e.shiftKey?"cell"===s?c(t,n,l._select_lastCell||null):u(t,s,n,l._select_lastCell?l._select_lastCell[s]:null):t[s](n).select(!o)}function m(e,t){return function(l){return l.i18n("buttons."+e,t)}}function _(e){var t=e._eventNamespace;return"draw.dt.DT"+t+" select.dt.DT"+t+" deselect.dt.DT"+t}var h=e.fn.dataTable;h.select={},h.select.version="1.2.1-dev",h.select.init=function(t){var l=t.settings()[0],c=l.oInit.select,n=h.defaults.select,a=c===s?n:c,o="row",i="api",r=!1,u=!0,d="td, th",f="selected",m=!1;l._select={},a===!0?(i="os",m=!0):"string"==typeof a?(i=a,m=!0):e.isPlainObject(a)&&(a.blurable!==s&&(r=a.blurable),a.info!==s&&(u=a.info),a.items!==s&&(o=a.items),a.style!==s&&(i=a.style,m=!0),a.selector!==s&&(d=a.selector),a.className!==s&&(f=a.className)),t.select.selector(d),t.select.items(o),t.select.style(i),t.select.blurable(r),t.select.info(u),l._select.className=f,e.fn.dataTable.ext.order["select-checkbox"]=function(t,l){return this.api().column(l,{order:"index"}).nodes().map(function(l){return"row"===t._select.items?e(l).parent().hasClass(t._select.className):"cell"===t._select.items&&e(l).hasClass(t._select.className)})},!m&&e(t.table().node()).hasClass("selectable")&&t.select.style("os")},e.each([{type:"row",prop:"aoData"},{type:"column",prop:"aoColumns"}],function(e,t){h.ext.selector[t.type].push(function(e,l,c){var n,a=l.selected,o=[];if(a===s)return c;for(var i=0,r=c.length;i<r;i++)n=e[t.prop][c[i]],(a===!0&&n._select_selected===!0||a===!1&&!n._select_selected)&&o.push(c[i]);return o})}),h.ext.selector.cell.push(function(e,t,l){var c,n=t.selected,a=[];if(n===s)return l;for(var o=0,i=l.length;o<i;o++)c=e.aoData[l[o].row],(n===!0&&c._selected_cells&&c._selected_cells[l[o].column]===!0||n===!1&&(!c._selected_cells||!c._selected_cells[l[o].column]))&&a.push(l[o]);return a});var v=h.Api.register,p=h.Api.registerPlural;v("select()",function(){return this.iterator("table",function(e){h.select.init(new h.Api(e))})}),v("select.blurable()",function(e){return e===s?this.context[0]._select.blurable:this.iterator("table",function(t){t._select.blurable=e})}),v("select.info()",function(e){return i===s?this.context[0]._select.info:this.iterator("table",function(t){t._select.info=e})}),v("select.items()",function(e){return e===s?this.context[0]._select.items:this.iterator("table",function(t){t._select.items=e,o(new h.Api(t),"selectItems",[e])})}),v("select.style()",function(e){return e===s?this.context[0]._select.style:this.iterator("table",function(t){t._select.style=e,t._select_init||r(t);var l=new h.Api(t);n(l),"api"!==e&&a(l),o(new h.Api(t),"selectStyle",[e])})}),v("select.selector()",function(e){return e===s?this.context[0]._select.selector:this.iterator("table",function(t){n(new h.Api(t)),t._select.selector=e,"api"!==t._select.style&&a(new h.Api(t))})}),p("rows().select()","row().select()",function(t){var l=this;return t===!1?this.deselect():(this.iterator("row",function(t,l){d(t),t.aoData[l]._select_selected=!0,e(t.aoData[l].nTr).addClass(t._select.className)}),this.iterator("table",function(e,t){o(l,"select",["row",l[t]],!0)}),this)}),p("columns().select()","column().select()",function(t){var l=this;return t===!1?this.deselect():(this.iterator("column",function(t,l){d(t),t.aoColumns[l]._select_selected=!0;var s=new h.Api(t).column(l);e(s.header()).addClass(t._select.className),e(s.footer()).addClass(t._select.className),s.nodes().to$().addClass(t._select.className)}),this.iterator("table",function(e,t){o(l,"select",["column",l[t]],!0)}),this)}),p("cells().select()","cell().select()",function(t){var l=this;return t===!1?this.deselect():(this.iterator("cell",function(t,l,c){d(t);var n=t.aoData[l];n._selected_cells===s&&(n._selected_cells=[]),n._selected_cells[c]=!0,n.anCells&&e(n.anCells[c]).addClass(t._select.className)}),this.iterator("table",function(e,t){o(l,"select",["cell",l[t]],!0)}),this)}),p("rows().deselect()","row().deselect()",function(){var t=this;return this.iterator("row",function(t,l){t.aoData[l]._select_selected=!1,e(t.aoData[l].nTr).removeClass(t._select.className)}),this.iterator("table",function(e,l){o(t,"deselect",["row",t[l]],!0)}),this}),p("columns().deselect()","column().deselect()",function(){var t=this;return this.iterator("column",function(t,l){t.aoColumns[l]._select_selected=!1;var s=new h.Api(t),c=s.column(l);e(c.header()).removeClass(t._select.className),e(c.footer()).removeClass(t._select.className),s.cells(null,l).indexes().each(function(l){var s=t.aoData[l.row],c=s._selected_cells;!s.anCells||c&&c[l.column]||e(s.anCells[l.column]).removeClass(t._select.className)})}),this.iterator("table",function(e,l){o(t,"deselect",["column",t[l]],!0)}),this}),p("cells().deselect()","cell().deselect()",function(){var t=this;return this.iterator("cell",function(t,l,s){var c=t.aoData[l];c._selected_cells[s]=!1,c.anCells&&!t.aoColumns[s]._select_selected&&e(c.anCells[s]).removeClass(t._select.className)}),this.iterator("table",function(e,l){o(t,"deselect",["cell",t[l]],!0)}),this});var b=0;return e.extend(h.ext.buttons,{selected:{text:m("selected","Selected"),className:"buttons-selected",init:function(e,t,l){var s=this;l._eventNamespace=".select"+b++,e.on(_(l),function(){var e=s.rows({selected:!0}).any()||s.columns({selected:!0}).any()||s.cells({selected:!0}).any();s.enable(e)}),this.disable()},destroy:function(e,t,l){e.off(l._eventNamespace)}},selectedSingle:{text:m("selectedSingle","Selected single"),className:"buttons-selected-single",init:function(e,t,l){var s=this;l._eventNamespace=".select"+b++,e.on(_(l),function(){var t=e.rows({selected:!0}).flatten().length+e.columns({selected:!0}).flatten().length+e.cells({selected:!0}).flatten().length;s.enable(1===t)}),this.disable()},destroy:function(e,t,l){e.off(l._eventNamespace)}},selectAll:{text:m("selectAll","Select all"),className:"buttons-select-all",action:function(){this[this.select.items()+"s"]().select()}},selectNone:{text:m("selectNone","Deselect all"),className:"buttons-select-none",action:function(){d(this.settings()[0],!0)},init:function(e,t,l){var s=this;l._eventNamespace=".select"+b++,e.on(_(l),function(){var t=e.rows({selected:!0}).flatten().length+e.columns({selected:!0}).flatten().length+e.cells({selected:!0}).flatten().length;s.enable(t>0)}),this.disable()},destroy:function(e,t,l){e.off(l._eventNamespace)}}}),e.each(["Row","Column","Cell"],function(e,t){var l=t.toLowerCase();h.ext.buttons["select"+t+"s"]={text:m("select"+t+"s","Select "+l+"s"),className:"buttons-select-"+l+"s",action:function(){this.select.items(l)},init:function(e){var t=this;e.on("selectItems.dt.DT",function(e,s,c){t.active(c===l)})}}}),e(l).on("preInit.dt.dtSelect",function(e,t){"dt"===e.namespace&&h.select.init(new h.Api(t))}),h.select});