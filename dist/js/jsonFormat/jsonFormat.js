function $id(e){return document.getElementById(e)}function IsArray(e){return e&&"object"==typeof e&&"number"==typeof e.length&&!e.propertyIsEnumerable("length")}function Process(jsondata,jsonWrap){SetTab(),window.IsCollapsible=!0;var json=jsondata,html="";try{""==json&&(json='""');var obj=eval("["+json+"]");html=ProcessObject(obj[0],0,!1,!1,!1),$id(jsonWrap).innerHTML="<PRE class='CodeContainer'>"+html+"</PRE>"}catch(e){alert("JSON数据格式不正确:\n"+e.message),$id(jsonWrap).innerHTML=""}}function ProcessObject(e,n,o,i,t){var s="",a=o?"<span class='Comma'>,</span> ":"",l=typeof e,r="";if(IsArray(e))if(0==e.length)s+=GetRow(n,"<span class='ArrayBrace'>[ ]</span>"+a,t);else{r=window.IsCollapsible?'<span><img src="'+window.ImgExpanded+'" onClick="ExpImgClicked(this)" /></span><span class=\'collapsible\'>':"",s+=GetRow(n,"<span class='ArrayBrace'>[</span>"+r,t);for(var c=0;c<e.length;c++)s+=ProcessObject(e[c],n+1,c<e.length-1,!0,!1);r=window.IsCollapsible?"</span>":"",s+=GetRow(n,r+"<span class='ArrayBrace'>]</span>"+a)}else if("object"==l)if(null==e)s+=FormatLiteral("null","",a,n,i,"Null");else if(e.constructor==window._dateObj.constructor)s+=FormatLiteral("new Date("+e.getTime()+") /*"+e.toLocaleString()+"*/","",a,n,i,"Date");else if(e.constructor==window._regexpObj.constructor)s+=FormatLiteral("new RegExp("+e+")","",a,n,i,"RegExp");else{var d=0;for(var p in e)d++;if(0==d)s+=GetRow(n,"<span class='ObjectBrace'>{ }</span>"+a,t);else{r=window.IsCollapsible?'<span><img src="'+window.ImgExpanded+'" onClick="ExpImgClicked(this)" /></span><span class=\'collapsible\'>':"",s+=GetRow(n,"<span class='ObjectBrace'>{</span>"+r,t);var u=0;for(var p in e){var w=window.QuoteKeys?'"':"";s+=GetRow(n+1,"<span class='PropertyName'>"+w+p+w+"</span>: "+ProcessObject(e[p],n+1,++u<d,!1,!0))}r=window.IsCollapsible?"</span>":"",s+=GetRow(n,r+"<span class='ObjectBrace'>}</span>"+a)}}else"number"==l?s+=FormatLiteral(e,"",a,n,i,"Number"):"boolean"==l?s+=FormatLiteral(e,"",a,n,i,"Boolean"):"function"==l?e.constructor==window._regexpObj.constructor?s+=FormatLiteral("new RegExp("+e+")","",a,n,i,"RegExp"):(e=FormatFunction(n,e),s+=FormatLiteral(e,"",a,n,i,"Function")):s+="undefined"==l?FormatLiteral("undefined","",a,n,i,"Null"):FormatLiteral(e.toString().split("\\").join("\\\\").split('"').join('\\"'),'"',a,n,i,"String");return s}function FormatLiteral(e,n,o,i,t,s){"string"==typeof e&&(e=e.split("<").join("&lt;").split(">").join("&gt;"));var a="<span class='"+s+"'>"+n+e+n+o+"</span>";return t&&(a=GetRow(i,a)),a}function FormatFunction(e,n){for(var o="",i=0;i<e;i++)o+=window.TAB;for(var t=n.toString().split("\n"),s="",i=0;i<t.length;i++)s+=(0==i?"":o)+t[i]+"\n";return s}function GetRow(e,n,o){for(var i="",t=0;t<e&&!o;t++)i+=window.TAB;return null!=n&&n.length>0&&"\n"!=n.charAt(n.length-1)&&(n+="\n"),i+n}function CollapsibleViewClicked(){$id("CollapsibleViewDetail").style.visibility=$id("CollapsibleView").checked?"visible":"hidden",Process()}function QuoteKeysClicked(){window.QuoteKeys=$id("QuoteKeys").checked,Process()}function CollapseAllClicked(){EnsureIsPopulated(),TraverseChildren($id(jsonWrap),function(e){"collapsible"==e.className&&MakeContentVisible(e,!1)},0)}function ExpandAllClicked(){EnsureIsPopulated(),TraverseChildren($id(jsonWrap),function(e){"collapsible"==e.className&&MakeContentVisible(e,!0)},0)}function MakeContentVisible(e,n){var o=e.previousSibling.firstChild;o.tagName&&"img"==o.tagName.toLowerCase()&&(e.style.display=n?"inline":"none",e.previousSibling.firstChild.src=n?window.ImgExpanded:window.ImgCollapsed)}function TraverseChildren(e,n,o){for(var i=0;i<e.childNodes.length;i++)TraverseChildren(e.childNodes[i],n,o+1);n(e,o)}function ExpImgClicked(e){var n=e.parentNode.nextSibling;if(n){var o="none",i=window.ImgCollapsed;"none"==n.style.display&&(o="inline",i=window.ImgExpanded),n.style.display=o,e.src=i}}function CollapseLevel(e){EnsureIsPopulated(),TraverseChildren($id(jsonWrap),function(n,o){"collapsible"==n.className&&(o>=e?MakeContentVisible(n,!1):MakeContentVisible(n,!0))},0)}function SetTab(){window.TAB=MultiplyString(2,window.SINGLE_TAB)}function EnsureIsPopulated(){!$id(jsonWrap).innerHTML&&$id("RawJson").value&&Process()}function MultiplyString(e,n){for(var o=[],i=0;i<e;i++)o.push(n);return o.join("")}function SelectAllClicked(){if(document.selection&&document.selection.empty)document.selection.empty();else if(window.getSelection){var e=window.getSelection();e.removeAllRanges&&window.getSelection().removeAllRanges()}var n=document.body&&document.body.createTextRange?document.body.createTextRange():document.createRange();n.selectNode?n.selectNode($id(jsonWrap)):n.moveToElementText&&n.moveToElementText($id(jsonWrap)),n.select?n.select($id(jsonWrap)):window.getSelection().addRange(n)}function LinkToJson(){var e=$id("RawJson").value;e=escape(e.split("/n").join(" ").split("/r").join(" ")),$id("InvisibleLinkUrl").value=e,$id("InvisibleLink").submit()}window.SINGLE_TAB="  ",window.ImgCollapsed="../images/Collapsed.gif",window.ImgExpanded="../images/Expanded.gif",window.QuoteKeys=!0,window._dateObj=new Date,window._regexpObj=new RegExp;