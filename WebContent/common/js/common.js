var oEditors = [];
var oEditors2 = [];
var common = {
	"init":function(object){
		$(object).find(".COMMON_FILEUPLOAD").each(function(){
			editor=new FileUpload($(this).attr("id"));
		});
		$(object).find(".COMMON_CALENDAR").datepicker({
			monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			dayNames: ['일','월','화','수','목','금','토'],
			dayNamesShort: ['일','월','화','수','목','금','토'],
			dayNamesMin: ['일','월','화','수','목','금','토'],
			dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
			dateFormat: 'yy-mm-dd',
			showMonthAfterYear:true,
			buttonImageOnly: true,
			buttonText: "달력",
			yearSuffix: '년',
			autoSize: true,
			showOn: 'both',
			changeYear: true,
			yearRange: 'c-10:c+2',
			showAnim : '',
			buttonImage: './common/css/images/ico/ico_calendar.gif'

		});
		if($(object).find("#SMART_EDITOR_SWING").length){
			//작성하기 화면에서 스마트에디터 등록.
			nhn.husky.EZCreator.createInIFrame({
				oAppRef: oEditors,
				elPlaceHolder: "SMART_EDITOR_SWING",
				sSkinURI: "/validation_Test/common/lib/smartEditor/SmartEditor2Skin.html",
				htParams : {
					bUseToolbar : true,	//툴바 사용여부
					bUseVerticalResizer : true,	//입력창 크기 조절바 사용여부
					bUseModeChanger : true,	//모드탭(Editor|HTML|TEXT)
					fOnBeforeUnload : function(){}
				},
				fOnAppLoad : function(){},
				fCreator: "createSEditor2"
			});
		}
		if($(object).find("#SMART_EDITOR_SWING2").length){
			//작성하기 화면에서 스마트에디터 등록.
			nhn.husky.EZCreator.createInIFrame({
				oAppRef: oEditors2,
				elPlaceHolder: "SMART_EDITOR_SWING2",
				sSkinURI: "/validation_Test/common/lib/smartEditor/SmartEditor2Skin.html",
				htParams : {
					bUseToolbar : true,
					bUseVerticalResizer : true,
					bUseModeChanger : true,
					fOnBeforeUnload : function(){}
				},
				fOnAppLoad : function(){},
				fCreator: "createSEditor2"
			});
		}
		$(object).find(".COMMON_CALENDAR_BIRTH").datepicker({
			monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			dayNames: ['일','월','화','수','목','금','토'],
			dayNamesShort: ['일','월','화','수','목','금','토'],
			dayNamesMin: ['일','월','화','수','목','금','토'],
			dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
			dateFormat: 'yymmdd',
			showMonthAfterYear:true,
			buttonImageOnly: true,
			buttonText: "달력",
			yearSuffix: '년',
			autoSize: true,
			showOn: 'both',
			changeYear: true,
			yearRange: 'c-100:c+0',
			showAnim : '',
			buttonImage: '/common/css/images/ico/ico_calendar.gif'

		});
	},checked:function(name,checked){
		var checkbox = document.getElementsByName(name);
		for(var i = 0 ; i < checkbox.length ; i++){
			if(checkbox[i].disabled) continue;
			checkbox[i].checked = checked;
			if($(checkbox[i]).get(0).onclick) $(checkbox[i]).get(0).onclick();
		}
	},checkboxInfo:function(name){
		var returnInfo = {checked:0,firstChecked:null,lastChecked:null,firstNode:null,lastNode:null,checkedList:Array()};
		var checkbox = document.getElementsByName(name);
		if(checkbox.length > 0){
			returnInfo.firstNode = checkbox[0];
			returnInfo.lastNode = checkbox[checkbox.length];
			for(var i = 0 ; i < checkbox.length ; i++){
				if(checkbox[i].checked) {
					returnInfo.checkedList.push(checkbox[i].value);
					returnInfo.checked++;
					returnInfo.lastChecked = checkbox[i];
					if(returnInfo.firstChecked == null) returnInfo.firstChecked = checkbox[i];
				}
			}
		}
		return returnInfo;
	},"imageDetail":function(fileSn){
		$.fun.layout({"id":"COMMON_IMAGE_VIEW","title":"이미지 확대보기","width":500,"content":'<div style="margin:50px;text-align:center;"><img src="/common/file_download.do?fileSn='+fileSn+'"/><div>'});
	},"imageDetailEn":function(fileSn){
		$.fun.layout({"id":"COMMON_IMAGE_VIEW","title":"View Image","width":500,"content":'<div style="margin:50px;text-align:center;"><img src="/common/file_download.do?fileSn='+fileSn+'"/><div>'});
	}
};
$(document).ready(function() {
	common.init($("BODY"));
});