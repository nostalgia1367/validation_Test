<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 
<!DOCTYPE html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>JSP</title>
<link rel="stylesheet" href="./common/css/common.css">
<script type="text/javascript" src="./common/lib/jquery/jquery-1.12.3.js"></script>
<script type="text/javascript" src="./common/lib/jquery/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="./common/lib/jquery/jquery.function.js"></script>
<script type="text/javascript" src="./common/lib/jquery/jquery.validate.js"></script>
<script type="text/javascript" src="./common/js/common.js"></script>
<script type="text/javascript" src="./common/lib/smartEditor/js/HuskyEZCreator.js"></script>
<link rel="stylesheet" href="./common/lib/jquery/jquery-ui-1.10.custom.min.css">


</head>
<body>
<script>
	var program ={
		"statusUpdate":function(){//처리 상태 값 변경
			var frm = document.resultFrm;
// 			$.fun.confirm({content:"변경에 실패하였습니다."});
// 			$.fun.alert({content:"변경에 실패하였습니다."});

			if($(frm).validate()){
	 			$.fun.alert({content:"정상적으로 등록 되었습니다.",action:function(){
				}});
			}
		}
	}
</script>
<body>
	<form name="resultFrm" id="resultFrm" method="get">	
		<table class="TABLESTYLE5" style="width:70%; text-align:both; align:center;">
			<tr>
				<th>제목</th>
				<td>
					<input title="제목" class='{"required":true,"minlength": 10,"maxlength": 50} INPUTSTYLE1 W100' type="text" name="program_name" value=""/>
				</td>
			</tr>
			<tr>
				<th>기간설정</th>
				<td>
					<input title="기간설정(시작일)" class='{"required":true,"maxlength": 10,"ime":"date(10)"} INPUTSTYLE1 COMMON_CALENDAR' type="text" name="start_date" value="" readonly="readonly"/>
<!-- 					<input title="기간설정(종료일)" class='{"required":true,"maxlength": 10,"ime":"date(10)"} INPUTSTYLE1 COMMON_CALENDAR' type="text" name="end_date" value=""/> 까지 -->
				</td>
			</tr>
			<tr>
				<th>전화</th>
				<td><input title="전화" class='{"ime":"tel"} INPUTSTYLE1' type="text" name="ppon" 7></td>
			</tr>
			<tr>
				<th>핸드폰</th>
				<td><input title="핸드폰" class='{"ime":"tel","equals":"input[name=ppon]"} INPUTSTYLE1' type="text" name="mphon" /></td>
			</tr>
			<tr>
				<th>이메일</th>
				<td colspan="3"><input class='INPUTSTYLE1 W50' type="text" name="email" /></td>
			</tr>
			<tr>
			<th>하고싶은말</th>
			<td>
				<textarea class="W100 H100PX" name="email_contents" id="SMART_EDITOR_SWING"></textarea>
			</td>
			</tr>
			<tr>
				<th>버튼</th>
				<td>
					<input type="button" onclick="program.statusUpdate();" value="버튼1">
				</td>
			</tr>
		</table>
	</form>

<textarea class="W100 H100PX" name="email_contents" id="SMART_EDITOR_SWING2"></textarea>
 
</body>
</html>