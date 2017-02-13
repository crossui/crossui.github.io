/**
 * chooseperson --选择人员--
 * @param htmlId
 * @param parmOrgData 组织POST data
 * @param artDialogTitle 弹出窗标题
 * @param initDataId 初始选中人员id
 * @param initDataName 初始选中人员name
 * @param ztreeJsonUrl 组织json ajax 地址
 * @param searchJsonUrl 查询json ajax 地址
 * @param checkType 0无 1单选 2 多选
 * @param selectNumber checkType为2时 最多选择几个 默认10个
 * @param selectPrompt checkType为2时 提示语 默认提示“最多只能选择”
 * @param async 是否异步加载ZTREE
 * @param ztreeFun 三个函数 {Check:function(){},AsyncSuccess:function(){},Click:function(){}}
 * @param callBack 回调函数
 */
var chooseperson = function(options){
	chooseperson.init(options);
};
//----------chooseperson 默认参数
chooseperson.defaults = {
	htmlId:'',
	parmOrgData:{},
	artDialogTitle:'\u8bf7\u9009\u62e9\u7ba1\u7406\u4eba',
	initDataId:null,
	initDataName:null,
	ztreeJsonUrl:'',
	searchJsonUrl:'',
	checkType:2,
	selectNumber:10,
	selectPrompt:'\u6700\u591a\u53ea\u80fd\u9009\u62e9\uff1a',
	async:false,
	ztreeFun:{
		Check:null,
		AsyncSuccess:null,
		Click:null
	},
	callBack:null
};
//----------入口 带参数
chooseperson.init = function(options){
	chooseperson.opts=$.extend(this.defaults,options || {});
	if(chooseperson.opts.async){
		chooseperson.asyncInit=true;
	}
	chooseperson.initHtmlWrap();
	chooseperson.artDialog.init();
	chooseperson.search();
	chooseperson.ztreeFun = chooseperson.opts.ztreeFun;
	chooseperson.ztree(chooseperson.ztreeSetting());
};
//----------ztree 初始化
chooseperson.ztree = function(setting){
	if(chooseperson.opts.async){
		$.fn.zTree.init($("#choosepersonTree"), setting);
	}else{
		chooseperson.ztreeNodes(setting);
	}
};
//----------ztree 一次性读取JSON
chooseperson.ztreeNodes=function(setting){
	$.ajax({
		dataType: "json",
		type: "POST",
		data:chooseperson.opts.parmOrgData,
		cache:false,
		url: chooseperson.opts.ztreeJsonUrl,
		success: function(data){
			$.fn.zTree.init($("#choosepersonTree"), setting,data);
			$('#ztreeLoadingTips').hide();
			chooseperson.ztreeCheckNode(chooseperson.opts.initDataId,false,chooseperson.opts.initDataName);
		}
	});
};
//----------ztree checkbok readio 被选中后的回调
chooseperson.ztreeOnCheck = function(event,treeId, treeNode){

};
//----------ztree 异步请求数据时的回调
chooseperson.ztreeOnAsyncSuccess = function(event,treeId, treeNode, msg){
	$('#ztreeLoadingTips').hide();

	if(chooseperson.asyncInit){
		chooseperson.asyncInit=false;
		chooseperson.ztreeCheckNode(chooseperson.opts.initDataId,false,chooseperson.opts.initDataName);
	}else{
		chooseperson.ztreeCheckNode('',false,'');
	}

};
//----------ztree 某节点单击后的回调
chooseperson.ztreeOnClick = function(event,treeId, treeNode, msg){

};
//----------ztree 异步请求
chooseperson.ztreeFilter = function (treeId, parentNode, responseData) {
	return responseData;
};
//----------选中的人员超出提示
chooseperson.orerunDialog = function(){
	dialog({
		lock: true,
		artIcon:'error',
		opacity:0.4,
		width: 250,
		title:'报错',
		content: chooseperson.opts.selectPrompt + chooseperson.opts.selectNumber,
		ok: function () {}
	});
};
//----------勾选的值动态生成
chooseperson.ztreeCheckNode = function(idData,Checked,nameData){
	if(idData && idData!=''){
		var treeObj = $.fn.zTree.getZTreeObj("choosepersonTree");
		var	nodes_array = treeObj.transformToArray (treeObj.getNodes()[0].children);
		var listHtml='',listArray=new Array(),sdata={};
		if(idData.indexOf(",")>0){
			idData=idData.split(",");
			nameData=nameData.split(",");
			if($('#selecteBox>li').length+$(idData).length>chooseperson.opts.selectNumber){
				chooseperson.orerunDialog();
				return false;
			}
			$(idData).each(function(k,v){
				listArray=chooseperson.makeArray(v,nameData[k],listArray);
			});
			for(var i=0;i<nodes_array.length;i++){
				$(idData).each(function(k,v){
					if(v==nodes_array[i].id){
						funChecked(i);
					}
				});
			}
		}else{
			if(idData!=''){
				if($('#selecteBox>li').length+1>chooseperson.opts.selectNumber){
					chooseperson.orerunDialog();
					return false;
				}
				listArray=chooseperson.makeArray(idData,nameData,listArray);
				for(var i=0;i<nodes_array.length;i++){
					if(idData==nodes_array[i].id){
						funChecked(i);
					}
				}
			}

		}

		for(var n=0;n<listArray.length;n++) {
			if($('#selecteBox>li').length>0){
				var oldList=true;
				for(var s=0;s<$('#selecteBox>li').length;s++){
					if(listArray[n].rid==$('#selecteBox>li').eq(s).data('rid')){
						oldList=false;
					}
				}
				if(oldList){
					listHtml+='<li data-rid="'+listArray[n].rid+'" data-name="'+listArray[n].name+'"><a href="javascript:;" class="alinks-line alinks-black" onclick="chooseperson.delAdminer(this)">'+listArray[n].name+'</a></li>';
				}
			}else{
				listHtml+='<li data-rid="'+listArray[n].rid+'" data-name="'+listArray[n].name+'"><a href="javascript:;" class="alinks-line alinks-black" onclick="chooseperson.delAdminer(this)">'+listArray[n].name+'</a></li>';
			}
		}
		$('#selecteBox').append(listHtml);
	}
	function funChecked(ii){
		if(Checked){
			treeObj.checkNode(nodes_array[ii], true, true);
		}else{
			treeObj.checkNode(nodes_array[ii], false, true);
		}
	}
};
//----------ztree checkType 类型
chooseperson.ztreeSetting = function(){
	var callbackFun= {
		onCheck: function onCheck(event, treeId, treeNode){
			if(chooseperson.ztreeFun.Check){
				eval("chooseperson.ztreeFun.Check(event,treeId, treeNode)");
			}else{
				eval("chooseperson.ztreeOnCheck(event,treeId, treeNode)");
			}
		},
		onAsyncSuccess:function onAsyncSuccess(event, treeId, treeNode, msg){
			if(chooseperson.ztreeFun.AsyncSuccess){
				eval("chooseperson.ztreeFun.AsyncSuccess(event,treeId, treeNode, msg)");
			}else{
				eval("chooseperson.ztreeOnAsyncSuccess(event,treeId, treeNode, msg)");
			}
		},
		onClick:function onClick(event, treeId, treeNode, msg){
			if(chooseperson.ztreeFun.Click){
				eval("chooseperson.ztreeFun.Click(event,treeId, treeNode, msg)");
			}else{
				eval("chooseperson.ztreeOnClick(event,treeId, treeNode, msg)");
			}
		}
	};
	if(chooseperson.opts.async){
		if(chooseperson.opts.checkType==1){
			var _ztreeSettingVal = {
				async: {
					enable: true,
					url:chooseperson.opts.ztreeJsonUrl,
					autoParam: ["id"],
					otherParam:chooseperson.opts.parmOrgData,
					dataFilter: chooseperson.ztreeFilter,
					type: "post"
				},
				check: {
					enable: true,
					chkStyle: "radio",
					radioType: "all"
				},
				callback:callbackFun
			};
		}else if(chooseperson.opts.checkType==2){
			var _ztreeSettingVal = {
				async: {
					enable: true,
					url:chooseperson.opts.ztreeJsonUrl,
					autoParam: ["id"],
					otherParam:chooseperson.opts.parmOrgData,
					dataFilter: chooseperson.ztreeFilter,
					type: "post"
				},
				check: {
					enable: true
				},
				callback: callbackFun
			};
		}else{
			var _ztreeSettingVal = {
				async: {
					enable: true,
					url:chooseperson.opts.ztreeJsonUrl,
					autoParam: ["id"],
					otherParam:chooseperson.opts.parmOrgData,
					dataFilter: chooseperson.ztreeFilter,
					type: "post"
				},
				callback:callbackFun
			};
		}
	}else{
		if(chooseperson.opts.checkType==1){
			var _ztreeSettingVal = {
				check: {
					enable: true,
					chkStyle: "radio",
					radioType: "all"
				},
				callback:callbackFun
			};
		}else if(chooseperson.opts.checkType==2){
			var _ztreeSettingVal = {
				check: {
					enable: true
				},
				callback: callbackFun
			};
		}else{
			var _ztreeSettingVal = {
				callback:callbackFun
			};
		}
	}
	return _ztreeSettingVal;
};
//----------搜索
chooseperson.search = function(){
	//输入框架焦点 focus 、 blur
	$('#popMangChoo').on('focus','.list-search-input',function(){
		$(this).parent().find('.list-search-clear').show();
		if(!$(this).parent().next('.search-overlay').is(':visible')) {
			$(this).parent().next('.search-overlay').show();
		}
	}).on('blur','.list-search-input',function(){
		var $this=$(this);
		if($this.val()=='' && $('#adminSearchTbody>tr').length<=0){
			$this.parent().find('.list-search-clear').hide();
			$(this).parent().next('.search-overlay').hide();
		}
	}).on('keyup','.list-search-input',function(e){
		var ev = document.all ? window.event : e;
		if(ev.keyCode==13) {
			searchAjax($('#popMangChoo').find('input.list-search-input'));
		}
	});
	//搜索button
	$('#popMangChoo').on('click','.list-search-icon',function(){
		searchAjax($('#popMangChoo').find('input.list-search-input'));
	});
	//搜索AJAX
	function searchAjax(dom){
        $('#searchLoadingTips').show();
		var _val= $.trim(dom.val());
		if(_val=='') return false;
		chooseperson.opts.parmOrgData.userName=_val;
		$.ajax({
			dataType: "json",
			type: "POST",
			data:chooseperson.opts.parmOrgData,
			cache:false,
			url: chooseperson.opts.searchJsonUrl,
			success: function(data){
				var Html='';
				for(var i=0; i<data.Result.length; i++){
					if(chooseperson.opts.checkType==1){
						Html+='<tr><td><label><input type="radio" class="radio person-search-radio" data-name="'+data.Result[i].CNAME+'" data-rid="'+data.Result[i].USERID+'"></label></td><td class="c-t-center"><span class="c-nowrap">'+data.Result[i].CNAME+'</span></td><td><span class="c-nowrap">'+data.Result[i].JOBNUMBER+'</span></td><td><span class="c-nowrap">'+data.Result[i].ORGNAME+'</span></td></tr>';
					}else{
						Html+='<tr><td><label><input type="checkbox" class="checkbox person-search-checkbox" data-name="'+data.Result[i].CNAME+'" data-rid="'+data.Result[i].USERID+'"></label></td><td class="c-t-center"><span class="c-nowrap">'+data.Result[i].CNAME+'</span></td><td><span class="c-nowrap">'+data.Result[i].JOBNUMBER+'</span></td><td><span class="c-nowrap">'+data.Result[i].ORGNAME+'</span></td></tr>';
					}
				}
				$('#adminSearchTbody').html(Html);
                $('#searchLoadingTips').hide();
			}
		});
	}
	//清空搜索内容
	$('#popMangChoo').on('click','.list-search-clear',function(){
		$(this).parent().find('input.list-search-input').val('').blur();
		$(this).parent().next('.search-overlay').hide();
		$('#adminSearchTbody').html('');
	});
	//全选
	$('#popMangChoo').on('click','#searchCheckboxAll',function(){
		if($(this).is(':checked')){
			$('#adminSearchTbody').find('input[type="checkbox"]').attr("checked",'true');
		}else{
			$('#adminSearchTbody').find('input[type="checkbox"]').removeAttr("checked");
		}
	});
	//单选
	$('#popMangChoo').on('click','.person-search-checkbox',function(){
		var allCheckbox=true;
		$('.person-search-checkbox').each(function(){
			if(!($(this).is(':checked'))){
				$('#searchCheckboxAll').removeAttr('checked');
				allCheckbox=false;
			}
		});
		if(allCheckbox){
			$('#searchCheckboxAll').attr("checked",'true');
		}
	});
};
//----------弹出框内容HTML
chooseperson.htmlWrap = '' +
'<div id="popMangChoo" class="c-hide">'+
	'<div class="c-main auth-org-w">'+
		'<div class="clearfix">'+
			'<div class="fl w420 bgc-fff">'+
				'<div class="c-border list">'+
					'<div class="fs6 c-shallowblack c-border-b c-position-r">'+
						'<div class="list-search c-position-r searchuser pr-big">'+
							'<input type="text" placeholder="搜索部门人名或用户凭证..." class="c-input list-search-input">'+
							'<i class="iconfont list-search-clear c-hide icon-clear c-shallowgray" title="清空"></i>'+
							'<i class="iconfont list-search-icon icon-search c-shallowgray" title="搜索"></i>'+
						'</div>'+
						'<div class="search-overlay">'+
							'<div class="">'+
								'<table class="tb c-100">'+
									'<thead>'+
										'<tr>'+
											'<th><label><input type="checkbox" class="checkbox" id="searchCheckboxAll"></label></th>'+
											'<th>姓名</th>'+
											'<th>工号</th>'+
											'<th>组织名称</th>'+
										'</tr>'+
									'</thead>'+
									'<tbody id="adminSearchTbody"></tbody>'+
								'</table>'+
                                '<div class="pt-giant c-t-center c-shallowgray fs6 c-hide" id="searchLoadingTips">数据正在加载中。。。</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
					'<div class="ptb-small" style="height:280px; overflow:auto;">'+
						'<div class="pt-giant c-t-center c-shallowgray fs6" id="ztreeLoadingTips">数据正在加载中。。。</div>'+
						'<ul id="choosepersonTree" class="ztree ztree-slack ztree-slack-arrow"></ul>'+
					'</div>'+
				'</div>'+
			'</div>'+
			'<div class="fl add-del-w">'+
				'<a class="button button-primary button-rounded button-tiny" href="javascript:;" onclick="chooseperson.rightShift()">选择右移<em class="c-simsun ml5">&gt;</em></a>'+
			'</div>'+
			'<div class="fl w420 bgc-fff">'+
				'<div class="c-border list">'+
					'<div class="p-mini fs6 c-darkgray c-border-b">选择人员信息</div>'+
					'<div class="ptb10" style="height:280px; overflow:auto;">'+
						'<ul class="selectedorg c-shallowblack" id="selecteBox"></ul>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>'+
	'</div>'+
'</div>';
//----------右移
chooseperson.rightShift=function(){
	var _value=chooseperson.choosedPersonVal(),
		_id='',_name='';
	$(_value).each(function(i,v){
		_id += v.rid + ',';
		_name += v.name + ',';
	});
	_id=_id.substring(0,_id.length-1);
	_name=_name.substring(0,_name.length-1);
	chooseperson.ztreeCheckNode(_id,false,_name);
};
//----------删除选择人员
chooseperson.delAdminer=function(dom) {
	var treeObj = $.fn.zTree.getZTreeObj("choosepersonTree");
	var	nodes_array = treeObj.transformToArray (treeObj.getNodes()[0].children);
	idData=$(dom).parent().data("rid");
	for(var i=0;i<nodes_array.length;i++){
		if(idData==nodes_array[i].id){
			treeObj.checkNode(nodes_array[i], false, true);
		}
	}
	$(dom).parent().remove();
};
//----------生成选中人员 数组
chooseperson.makeArray=function (Rid,Name,personArray){
	var repeated=true;
	if(personArray.length>0){
		$(personArray).each(function(i,v){
			if(Rid == v.rid){repeated=false;}
		});
	}
	if(repeated){
		var	valArray=new Array();
		valArray['rid']=Rid;
		valArray['name']=Name;
		personArray.push(valArray);
	}
	return personArray;
};

//----------取选中的人员ID、NAME
chooseperson.choosedPersonVal=function(){
	var personArray=new Array();

	$('#adminSearchTbody').find('input[type="checkbox"]').each(function(){
		if($(this).is(':checked')){
			personArray=chooseperson.makeArray($(this).data('rid'),$(this).data('name'),personArray);
		}
	});

	var treeObj = $.fn.zTree.getZTreeObj("choosepersonTree");

	if(chooseperson.opts.checkType==1 || chooseperson.opts.checkType==2){
		var checked = treeObj.getCheckedNodes(true);
		if(checked.length>chooseperson.opts.selectNumber && chooseperson.opts.checkType==2){
			chooseperson.orerunDialog();
			return false;
		}
		for(var i=0;i<checked.length;i++){
			if(!(checked[i].isParent)){
				personArray=chooseperson.makeArray(checked[i].id,checked[i].name,personArray);
			}
		}
	}else{
		var nodes = treeObj.getSelectedNodes();
		if(nodes.length>0 && !(checked[i].isParent)){
			personArray=chooseperson.makeArray(nodes[0].id,nodes[0].name,personArray);
		}
	}
	return personArray;
};
//----------返回选中的管理人员
chooseperson.selectAdminer=function(){
	var personArray=new Array(),$li=$('#selecteBox>li');
	for(var i=0; i<$li.length;i++){
		personArray=chooseperson.makeArray($li.eq(i).data('rid'),$li.eq(i).data('name'),personArray);
	}
	return personArray;
};
//----------构造弹出框
chooseperson.artDialog = {
	init : function (){
		this.obj = dialog({
			title:chooseperson.opts.artDialogTitle,
			content: $('#popMangChoo').get(0),
			ok: function(){
				if(chooseperson.opts.callBack){
					if($('#selecteBox>li').length>0){
						var _value=chooseperson.selectAdminer();
					}
					chooseperson.opts.callBack(_value);
				}

				chooseperson.dialogClose();
			},
			cancel:function(){
				chooseperson.dialogClose();
			}
		}).showModal();
	},
	obj : null
};
//----------弹出框关闭回调
chooseperson.dialogClose = function(){
	setTimeout(function(){
		$('#selecteBox').html('');
		$('#popMangChoo').find('input.list-search-input').val('').blur();
		$('#popMangChoo').find('.search-overlay').hide();
		$('#adminSearchTbody').html('');
	},300);
};
//----------构造弹出框内容
chooseperson.initHtmlWrap = function () {
	if($('#popMangChoo').length<=0){
		$('body').append(this.htmlWrap);
	}
};
//----------删除弹出框内容
chooseperson.removeHtmlWrap = function () {
	if($('#popMangChoo').length){
		$('#popMangChoo').remove();
	}
};