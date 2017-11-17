/**
 * 补全为两位小数
 * @param name
 * @returns
 */
function changeLength(name) {
	var data = name.toString();
	if (data.indexOf(".") == -1) {
		data = data + ".00";
	} else {
		var attr = data.split(".");

		if (attr[attr.length - 1].length < 2) {
			data = data + "0";
		}
	}
	return data;
}

/**
 * 变色
 * @param value
 */
function changeColor(value){
	if (value < 0){
		return "<b style='color:green'>"+value+"";
	}else if(value > 0){
		return "<b style='color:red'>"+value+"";
	}else{
		return "<b>"+value+""
	}
}

/**
 * 用 年-月-日 方式显示
 * @param date
 * @returns {String}
 */
function getDate(date){
	var hqjsrq = "";
	if (date != null && date.length == 8){
		hqjsrq = date.substring(0,4) + "年" + date.substring(4,6) +"月" + date.substring(6,8) + "日";
	}
	return hqjsrq;
}

//日期格式化
function formatDate(timeStape) {
	var now = new Date(timeStape);
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var date = now.getDate();
	return year + "-" + add0(month) + "-" + add0(date);
}
function add0(m) {
	return m < 10 ? '0' + m : m
}

/**
 * 行情列表标题赋值
 */
function setTitle(obj, typename){
	var title = "交易行情";
	if (typename == "ALL"){
		title = "交易行情";
	}else if (typename == "G"){
		title = "挂牌公司";
	}else if (typename == "X"){
		title = "协议方式";
	}else if (typename == "Z"){
		title = "做市方式";
	}else if (typename == "J"){
		title = "竞价方式";
	}else if (typename == "L"){
		title = "两网及退市公司";
	}else if (typename == "A"){
		title = "A股";
	}else if (typename == "B"){
		title = "B股";
	}else if (typename == "JC"){
		title = "基础层";
	}else if (typename == "CX"){
		title = "创新层";
	}
	obj.html(title);
	
}

function dealWith(data){
	if (data == undefined || data == null || data == 'null' || data == ""){
		data = "";
	}
	return data;
}

function showQuantity(value){
	if (value != null && value > 0){
		if (value >= 10000){
			return (value/10000) + "万";
		}else{
			return value;
		}
	}
}

function dealGender(value){
	if (value != null && value != ""){
		if (value == '1'){
			return "男";
		}else if(value == '0'){
			return "女";
		}
	}else{
		return "";
	}
}

function dealIdType(value){
	if (value != null && value != ""){
		if (value == '1'){
			return "身份证";
		}else if(value == '2'){
			return "护照";
		}else if(value == '3'){
			return "军官证";
		}
	}else{
		return "";
	}
}

//报名状态
function dealExamStatus(value){
	if (value != null && value != ""){
		if (value == '0'){
			return "待审核";
		}else if (value == '1'){
			return "报名成功";
		}else if(value == '2'){
			return "审核不通过";
		}else if(value == '3'){
			return "已取消";
		}
	}else{
		return "未报名";
	}
}

//格式化日期（不含时间）
function formatterDate(date){
	alert(date.getFullYear());
	var datetime = date.getFullYear()
    + "-"
    + ((date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1))
    + "-"
    + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
	return datetime;
}


//格式化日期（含时间）
function formatterDateTime(date){
	 var datetime = date.getFullYear()
     + "-"
     + ((date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1))
     + "-"
     + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
     + " "
     + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours())
     + ":"
     + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
     + ":"
     + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
	 return datetime;
}

function jsonDateFormat(jsonDate) {//json日期格式转换为正常格式
    try {
        var date = new Date(parseInt(jsonDate.replace("/Date(", "").replace(")/", ""), 10));
        alert(date);
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var milliseconds = date.getMilliseconds();
        return date.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    } catch (ex) {
        return "";
    }
}

function DateDiff(strDateStart, strDateEnd){
	   var strSeparator = "-"; //日期分隔符
	   var oDate1;
	   var oDate2;
	   var iDays;
	   oDate1 = strDateStart.split(strSeparator);
	   oDate2 = strDateEnd.split(strSeparator);
	   var strDateS = new Date(oDate1[0] + "-" + oDate1[1] + "-" + oDate1[2]);
	   var strDateE = new Date(oDate2[0] + "-" + oDate2[1] + "-" + oDate2[2]);
	   iDays = parseInt(Math.abs(strDateS - strDateE ) /1000/60/60/24)//把相差的毫秒数转换为天数 
	   return iDays ;
	}
