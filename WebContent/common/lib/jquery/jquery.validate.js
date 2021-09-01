;(function($) {
$.fn.validate = function(){
	var result = true;
	var getMessage = function(object){
		var msg = null;
		if(object.get(0).type.match(/radio|select|checkbox/)){
			msg = "["+$this.attr("title")+"]항목을 선택해주세요.";
		}else{
			msg = "["+$this.attr("title")+"]항목을 입력해주세요.";
		}
		return msg;
	};
	if($(this).find("[class*=\\{][class*=\\}]").length){
		$(this).find("[class*=\\{][class*=\\}]").each(function(){
			if($(this).get(0).disabled) return true;
			$this = $(this);
			var info = $.fun.json_encode($this.attr("class").replace(/(.+)?(\{.+\})(.+)?/,"$2"));
			if(info.required && $this.get(0).type.match(/select/) && $this.find("option").length <=1){
				return true;
			}
			if(info.required && $this.get(0).type.match(/radio|checkbox/) && !$($this.get(0).form).find("input[name='"+$this.attr("name")+"']:checked").length){

				$.fun.alert({content:info.msg ? info.msg :getMessage($this),action:function(){
					$this.focus();

				}});
				result = false;
				return false;
			}else if(info.required && info.minlength && $this.get(0).type.match(/radio|checkbox/) && $($this.get(0).form).find("input[name='"+$this.attr("name")+"']:checked").length <info.minlength){
				$.fun.alert({content:"["+$this.attr("title")+"]항목을 "+info.minlength+"개 이상 선택해주세요.",action:function(){
					$this.focus();

				}});
				result = false;
				return false;
			}else if(info.required && info.minlength && $this.get(0).type.match(/radio|checkbox/) && $($this.get(0).form).find("input[name='"+$this.attr("name")+"']:checked").length > info.maxlength){
				$.fun.alert({content:"["+$this.attr("title")+"]항목을 "+info.maxlength+"개 이하로 선택해주세요.",action:function(){
					$this.focus();

				}});
				result = false;
				return false;
			}else if(info.required && !$this.get(0).type.match(/radio|checkbox/)){
				if(!$this.val()){

					$.fun.alert({content:info.msg ? info.msg :getMessage($this),action:function(){
						if(info.focusTarget =="htmlEditor"){
							oEditors[0].exec("FOCUS",[]);
						}else{
							$this.focus();
						}
					}});
					result = false;
					return false;
				}else if($this.val().length < info.minlength){
					$.fun.alert({content:"["+$this.attr("title")+"]항목을 "+info.minlength+"자 이상 입력해주세요.",action:function(){
						if(info.focusTarget =="htmlEditor"){
							oEditors[0].exec("FOCUS",[]);
						}else{
							$this.focus();
						}
					}});
					result = false;
					return false;
				}
			}
			if(info.maxlength*2 < $.fun.byteSize($this.val())){
				$.fun.alert({content:"["+$this.attr("title")+"]항목을 "+info.maxlength+"자 이내로 입력해주세요.",action:function(){
					$this.focus();
				}});
				result = false;
				return false;
			}
			if(info.equals){
				if($this.val() != $(info.equals).val()){
					$.fun.alert({content:"["+$(info.equals).attr("title")+"]항목의 값과 동일하지 않습니다.",action:function(){
						$this.focus();
					}});
					result = false;
					return false;
				}
			}
			if(info.ime && $this.val()){

				var mat = null;
				var imeMsg = null;
				if(info.ime=="kor2eng"){
					mat = /[\uAC00-\uD7A3a-zA-Z]+$/;
					imeMsg = "["+$this.attr("title")+"]항목은 한글/영문만 입력이 가능합니다.";
				}else if(info.ime=="kor2engn2um"){
					mat = /[\uAC00-\uD7A3a-zA-Z0-9]+$/;
					imeMsg = "["+$this.attr("title")+"]항목은 한글/영문/숫자만 입력가능합니다.";
				}else if(info.ime=="eng2num"){
					mat = /^[a-zA-Z0-9]+$/;
					imeMsg = "["+$this.attr("title")+"]항목은 영문/숫자만 입력가능합니다.";
				}else if(info.ime=="eng"){
					mat = /^[a-zA-Z]+$/;
					imeMsg = "["+$this.attr("title")+"]항목은 영문만 입력가능합니다.";
				}else if(info.ime=="kor"){
					mat = /^[\uAC00-\uD7A3]+$/;
					imeMsg = "["+$this.attr("title")+"]항목은 한글만 입력가능합니다.";
				}else if(info.ime=="kor2num"){
					mat = /[\uAC00-\uD7A30-9]+$/;
					imeMsg = "["+$this.attr("title")+"]항목은 한글/숫자만 입력가능합니다.";
				}else if(info.ime=="float"){
					mat = /^[0-9.]+$/;
					imeMsg = "["+$this.attr("title")+"]항목은 숫자만 입력가능합니다.";
				}else if(info.ime=="num"){
					mat = /^[0-9]+$/;
					imeMsg = "["+$this.attr("title")+"]항목은 숫자만 입력가능합니다.";
				}else if(info.ime=="compNo"){
					mat = /^([0-9]{3})-([0-9]{2})-([0-9]{5})/g;
					imeMsg = "["+$this.attr("title")+"]항목은 사업자번호(000-00-00000) 형식으로 입력해주세요.";
				}else if(info.ime=="commonCode"){
					mat = /^[a-zA-Z0-9\_]+$/;
					imeMsg = "["+$this.attr("title")+"]항목은 영문/숫자와 특수문자(_)만 입력가능합니다.";
				}else if(info.ime=="time(4)"){
					mat = /^([0-9]{2})([0-9]{2})/g;
					imeMsg = "["+$this.attr("title")+"]항목은 시간형식(1010)으로 입력해주세요.";
				}else if(info.ime=="date(4)"){
					mat = /^([0-9]{4})/g;
					imeMsg = "["+$this.attr("title")+"]항목은 날자형식(2012)으로 입력해주세요.";
				}else if(info.ime=="date(8)"){
					mat = /^([0-9]{4})([0-9]{2})([0-9]{2})/g;
					imeMsg = "["+$this.attr("title")+"]항목은 날자형식(20121010)으로 입력해주세요.";
				}else if(info.ime=="date(10)"){
					mat = /^([0-9]{4})-([0-9]{2})-([0-9]{2})/g;
					imeMsg = "["+$this.attr("title")+"]항목은 날자형식(2012-10-10)으로 입력해주세요.";
				}else if(info.ime=="eng2num"){
					mat = /^[a-zA-Z0-9]+$/;
					imeMsg = "["+$this.attr("title")+"]항목은 영문/숫자만 입력가능합니다.";
				}else if(info.ime=="domain2"){
					mat = /^[^((http(s?))\:\/\/)]([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/;
					imeMsg = "["+$this.attr("title")+"]항목은 도메인 형식으로 작성해 주세요. http:// 또는 https://의 빼고 입력해 주세요.";
				}else if(info.ime=="domain3"){
					mat = /^((http(s?))\:\/\/)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/;
					imeMsg = "["+$this.attr("title")+"]항목은 도메인 형식으로 작성해 주세요. http:// 또는 https:// 를 포함한 도메인 주소를 입력해 주세요.";
				}else if(info.ime=="domain4"){
					mat = /^([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/;
					imeMsg = "["+$this.attr("title")+"]항목은 도메인 형식으로 작성해 주세요. http:// 또는 https:// 를 포함한 도메인 주소를 입력해 주세요.";
				}else if(info.ime=="domain"){
					mat = /^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/;
					imeMsg = "["+$this.attr("title")+"]항목은 홈페이지 주소 형식으로 작성해 주세요. http:// 또는 https:// 를 포함한 도메인 주소를 입력해 주세요.";
				}else if(info.ime=="tel"){
					mat = /^([0-9]{2,3}-[0-9]{3,4}-[0-9]{4}|[0-9]{4}-[0-9]{4})$/;
					imeMsg = "["+$this.attr("title")+"]항목은 전화번호 형식으로 작성해 주세요.(02-1234-1234,1688-0000)";
				}else if(info.ime=="email"){
					mat = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-zA-Z]{2,6}(?:\.[a-zA-Z]{2})?)$/;
					imeMsg = "["+$this.attr("title")+"]항목은 이메일 형식으로 입력해주세요.";
				}else if(info.ime=="json"){
					mat = /^\{\"(.+)\"\:(.+)\}$/;
					imeMsg = "["+$this.attr("title")+"]항목에 데이터 형식이 잘못되엇습니다.";
				}else if(info.ime=="date"){
					mat = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
					imeMsg = "["+$this.attr("title")+"]항목 형식이 잘못되엇습니다.(1999-09-09)";
				}
				if(!$this.val().match(mat)){
					$.fun.alert({content:imeMsg,action:function(){
						if(info.focusTarget =="htmlEditor"){
							oEditors[0].exec("FOCUS",[]);
						}else{
							$this.focus();
						}
					}});
					result = false;
					return result;
				}
			}
		});
	}
	return result;
};
})(jQuery);