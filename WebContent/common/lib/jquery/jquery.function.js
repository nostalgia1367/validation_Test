jQuery.fun={
	json_encode:function(data){
		try{
			data=$.parseJSON(data.replace(/\&\#034\;/,'"').replace(/\'/gi,'"'));
		}catch(e){
			data={
				"result":0
			};
		}
		return data;
	},
	json_decode:function(data){
		return $.toJSON(data);
	},
	phone_format:function(str){
		return str.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
	},
	compNo_format:function(str){
		return str.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{5})/,"$1-$2-$3");
	},
	upper:function(str){
		return str.toUpperCase();
	},
	unescape:function(str){
		return unescape(str);
	},
	escape:function(str){
		return escape(str);
	},
	encodeURI:function(){
		return encodeURIComponent(str);
	},
	decodeURI:function(){
		return decodeURIComponent(str);
	},
	NVL:function(object,def){
		return object?object:def;
	},
	parseInt:function(str){
		if(isNaN(str)) return 0;
		return parseInt(str,10)>0?parseInt(str,10):0;
	},
	parseFloat:function(str,len){
		try{
			return len?parseFloat(str).toFixed(len):parseFloat(str);
		}catch(e){}
		return 0;
	},
	unescapeHtml:function(values){
		values=values.replace(/&lt;/gi,"<");
		values=values.replace(/&gt;/gi,">");
		values=values.replace(/&amp;/gi,"&");
		values=values.replace(/&#38;/gi,"&");
		values=values.replace(/&quot;/gi,"\"");
		values=values.replace(/&#34;/gi,"\"");
		values=values.replace(/&#39;/gi,"'");
		values=values.replace(/&#36;/gi,"\\$");
		values=values.replace(/<base/gi,"<span");
		return values;
	},
	trim:function(str){
		return jQuery.trim(str);
	},
	getTime:function(append){
		return append?append+new Date().getTime().toString():new Date().getTime().toString();
	},
	encodeURI:function(str){
		return encodeURIComponent(str);
	},
	layout:function(conf){
		conf.id=conf.id?conf.id:'fn_js_layout';
		var buttons;
		var buttons1={
			"닫기":function(){
				alert(1);
				$(this).dialog('destroy').remove();
				alert(1);
				if(conf.closeAction){
					alert(1);
					conf.closeAction();
				}
			},
			"확인":function(){
				if(conf.action()){
					$(this).dialog('destroy').remove();
				}
			}
		};
		var buttons2={
			"닫기":function(){
				$(this).dialog('destroy').remove();
				if(conf.closeAction){
					conf.closeAction();
				}
			}
		};
		var buttons3={
			"삭제":function(){
				if(conf.deleteAction()){
					$(this).dialog('destroy').remove();
				}
			},
			"닫기":function(){
				$(this).dialog('destroy').remove();
				if(conf.closeAction){
					conf.closeAction();
				}
			},
			"확인":function(){
				if(conf.action()){
					$(this).dialog('destroy').remove();
				}
			}
		};
		buttons=conf.buttons?conf.buttons:conf.action?conf.deleteAction?buttons3:buttons1:buttons2;
		if(!$("#"+conf.id).length) $(conf.appendTo?conf.appendTo:"body").append($("<div>").attr("id",conf.id));
		$("#"+conf.id).html(conf.content);
		$("#"+conf.id).css({
			"overflow":"visible"
		});
		$("#"+conf.id).dialog({
			width:conf.width,
			open:function(event,ui){
				common.init($("#"+conf.id));
			},
			height:conf.height?conf.height:'auto',
			title:conf.title,
			modal:conf.modal?conf.modal:true,
			position:conf.position?conf.position:"center",
			buttons:buttons,
			zIndex:99999999,
			dialogClass:'SYWORKS_POP_LAYOUT',
			resizable:false,
			appendTo:conf.appendTo?conf.appendTo:"body",
			close:function(){
				if(conf.closeAction){
					conf.closeAction();
				}
				$(this).dialog('destroy').remove();
			}
		});
	},
	confirm:function(conf){
		this.layout({
			id:"fn_js_confirm",
			title:conf.title?conf.title:'정보확인',
			content:conf.content,
			width:conf.width,
			action:conf.action,
			closeAction:conf.closeAction
		});
	},
	alert:function(conf){
		this.layout({
			id:conf.id,
			title:conf.title?conf.title:'메세지',
			position:conf.position?conf.position:'center',
			content:conf.content,
			width:conf.width?conf.width:400,
			closeAction:conf.action,
			buttons:conf.buttons
		});
	},
	closeLayout:function(object){
		$(object).remove();
	},
	ajax:function(option){
		$.fun.layout({
			id:"ajax_loding",
			title:'Loading..',
			content:"<div style='text-align:center;padding:20px 0px;'>잠시만 기다려주세요...<div>",
			width:400,
			buttons:{}
		});
		$.ajax(option);
	},
	number_format:function(vals){ // 숫자형에 콤마삽입
		var input=String(vals);
		var reg=/(\-?\d+)(\d{3})($|\.\d+)/;
		if(reg.test(input)){
			return input.replace(reg,function(str,p1,p2,p3){
				return $.fun.number_format(p1)+","+p2+""+p3;
			});
		}else{
			return input;
		}
	},
	ajaxSubmit:function(conf){
		try{
			conf.action=conf.action?conf.action:common.callBack;
			conf.paramType=conf.paramType?conf.paramType:"text";
			var options={
				success:conf.action,
				contentType:"application/x-www-form-urlencoded;charset=UTF-8",
				dataType:conf.paramType // xml, json, script, or html
				,
				complete:function(){
					if($("#ajax_loding").length>0) $("#ajax_loding").dialog('destroy').remove();
				}
			};
			$(conf.form).attr("method","post");
			$.fun.layout({
				id:"ajax_loding",
				title:'Loading..',
				content:"<div style='text-align:center;padding:20px 0px;'>잠시만 기다려주세요...<div>",
				width:400,
				buttons:{}
			});
			$(conf.form).ajaxSubmit(options);
		}catch(e){
			alert(e);
		}
		return false;
	},
	rand:function(){
		var chars='0123456789abcdef'.split('');
		var uuid=[],rnd=Math.random,r;
		uuid[8]=uuid[13]=uuid[18]=uuid[23]='-';
		uuid[14]='4';
		for( var i=0;i<36;i++){
			if(!uuid[i]){
				r=0|rnd()*16;
				uuid[i]=chars[(i==19)?(r&0x3)|0x8:r&0xf];
			}
		}
		return 'uuid'+uuid.join('').replace(/\-/gi,"");
	},
	byteSize:function(str){
		var tcount=0;
		var tmpStr=new String(str);
		var temp=tmpStr.length;
		var onechar;
		for( var k=0;k<temp;k++){
			onechar=tmpStr.charAt(k);
			if(escape(onechar).length>4){
				tcount+=2;
			}else{
				tcount+=1;
			}
		}
		return tcount;
	},
	classAttrJsonVal:function(object){
		return $.fun.json_encode($(object).attr("class").replace(/(.+)?(\{.+\})(.+)?/,"$2"));
	},
	checked:function(name,checked){
		var checkbox=document.getElementsByName(name);
		for( var i=0;i<checkbox.length;i++){
			if(checkbox[i].disabled) continue;
			checkbox[i].checked=checked;
			if($(checkbox[i]).get(0).onclick) $(checkbox[i]).get(0).onclick();
		}
	},
	checkboxInfo:function(name){
		var returnInfo={
			checked:0,
			firstChecked:null,
			lastChecked:null,
			firstNode:null,
			lastNode:null,
			checkedList:Array(),
			checkedListObject:Array()
		};
		var checkbox=document.getElementsByName(name);
		if(checkbox.length>0){
			returnInfo.firstNode=checkbox[0];
			returnInfo.lastNode=checkbox[checkbox.length];
			for( var i=0;i<checkbox.length;i++){
				if(checkbox[i].checked){
					returnInfo.checkedListObject.push(checkbox[i]);
					returnInfo.checkedList.push(checkbox[i].value);
					returnInfo.checked++;
					returnInfo.lastChecked=checkbox[i];
					if(returnInfo.firstChecked==null) returnInfo.firstChecked=checkbox[i];
				}
			}
		}
		return returnInfo;
	}
};
$.ajaxSetup({
	type:"post",
	dataType:"text",
	contentType:"application/x-www-form-urlencoded; charset=UTF-8",
	global:true,
	complete:function(){
		if($("#ajax_loding").length>0) $("#ajax_loding").dialog('destroy').remove();
	}
});
if(navigator.userAgent.indexOf("WebKit")==-1) var console={
	log:function(){}
};
