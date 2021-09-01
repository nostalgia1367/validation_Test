var programs = {
	"msg01":function(){
		$.fun.alert({"content":"신청기간이 아닙니다."});
	},"save":function(){
		var frm = document.joinFrm;
		frm.action="/program/inc/insert.jsp";
		frm.submit();
		return;
		if($(frm).validate()){
			$.ajax({
				type:'post',
				url: "/program/inc/insert.jsp",
				dataType: "text",
				data:$(frm).serialize(),
				success: function(data) {
					try{data = jQuery.parseJSON(data.trim());}catch (e) {data = {"result":0};}
					if(data["result"] =="1"){
						$.fun.alert({content:"정상적으로 등록 되었습니다.",action:function(){
							location.href="/program/?group_code="+frm.group_code.value;
						}});
					}else if(data["result"] =="-1"){
						$.fun.alert({content:"이미 등록한 프로그램입니다.",action:function(){
							location.href="/program/?group_code="+frm.group_code.value;
						}});
					}else if(data["result"] =="-1"){
						$.fun.alert({content:"온라인 입사지원서 클리닉은 학기당 2번만 지원 가능합니다.",action:function(){
							location.href="/program/?group_code="+frm.group_code.value;
						}});
					}else if(data["result"] =="-3"){
						$.fun.alert({content:"신청기간이 아닙니다..",action:function(){
							location.href="/program/?group_code="+frm.group_code.value;
						}});
					}else{
						$.fun.alert({content:"등록에 실패하였습니다."});
					}
				}
			});
		}
	},"addFamily":function(object){
		var tr = "<tr>";
		tr 		 +="	<td><input type=\"text\" name=\"ans_8_1\" class='' size=\"25\"/></td>";
		tr 		 +="	<td><input type=\"text\" name=\"ans_8_2\" class='' size=\"25\"/></td>";
		tr 		 +="	<td><input type=\"text\" name=\"ans_8_3\" class='' size=\"12\"/></td>";
		tr 		 +="	<td>";
		tr 		 +="		<select name=\"ans_8_4\" class='SELECTSTYLE1'>";
		tr 		 +="			<option value=\"\">선택</option>";
		tr 		 +="			<option value=\"1\">초졸</option>";
		tr 		 +="			<option value=\"2\">중졸</option>";
		tr 		 +="			<option value=\"3\">고졸</option>";
		tr 		 +="			<option value=\"4\">초대졸</option>";
		tr 		 +="			<option value=\"5\">대졸</option>";
		tr 		 +="			<option value=\"6\">석사</option>";
		tr 		 +="			<option value=\"7\">박사이상</option>";
		tr 		 +="		</select>";
		tr 		 +="	</td>";
		tr 		 +="	<td class=\"last\">";
		tr 		 +="		<input type=\"text\" name=\"ans_8_5\" class='' size=\"40\"/>";
		tr 		 +="		<a onclick=\"programs.deleteFamily($(this));\"> [삭제]</a>";
		tr 		 +="	</td>";
		tr 		 +="</tr>";
		$("#p_tbl TBODY").append(tr);
	},"deleteFamily":function(object){
		$(object).parent().parent().remove();
	},"addFile":function(){
		var li =   "<div class=\"ad_file\">";
		li 		 +=" <input type=\"file\" name=\"upfile_"+($("#fileList LI input[type='file']").length+1)+"\"/> ";
		li 		 +=" <span class=\"del\" onclick=\"programs.removeFile($(this));\"><a >[삭제]</a></span> ";
		li 		 +="</div>";
		$("#fileList").append(li);
	},"removeFile":function(object){
		$(object).parent().remove();
	}

};