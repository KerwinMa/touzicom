$(function(){
	getNeeqInfo();
	getNeeqFile();
});

function getPageSelect(cruPage){
	$("#pageId").val(cruPage);
	return getNeeqInfo();
}

function getPublishDate(dateTime){
	var date = dateTime.toString();
	var strY;
	if(date.length<10){
		return date;
	}else{
		strY = date.substring(0,10);
		return strY;
	}
}

function getNeeqInfo(){
	$.ajax({
		type : 'post',
		url : 'http://www.neeq.com.cn/neeqController/getNeeqInfoList.do',
		data : {
			page : $("#pageId").val(),
			pageSize:5,
			type:0//做市
		},
		dataType : 'jsonp',
		success : function(result) {
			$("#infoListDetail").empty();
			var divSource="";
			if(result[0].pageList!=null){
				for(var i = 0;i<result[0].pageList.content.length;i++){
					divSource +="<li>";
					divSource +="<a target='_blank' href='"+result[0].pageList.content[i].htmlUrl+"'>";
					divSource +="<em>"+result[0].pageList.content[i].title+"</em>";
					divSource +="<span>"+getPublishDate(result[0].pageList.content[i].publishDate)+"</span></a>";
					divSource +="</li>";
				}
				$("#Pagination").pagination(result[0].pageList.totalElements, {
					current_page : result[0].pageList.number,
					items_per_page: result[0].pageList.size,
					num_edge_entries : 2,
					num_display_entries : 5,
					ellipse_text : "...",
					callback : getPageSelect// 回调
				});
			}else{
				$("#Pagination").empty();
			}
				$("#infoListDetail").append(divSource);
		}
	});
}

function getNeeqFile(){
	$.ajax({
		type : 'post',
		url : 'http://www.neeq.com.cn/neeqController/getNeeqFile.do',
		data : {
			type:1//做市
		},
		dataType : 'jsonp',
		success : function(result) {
			$("#infoFile").empty();
			var divSource="";
			for(var i = 0;i<result[0].listInfo.length;i++){
				divSource +="<li><a href='"+result[0].listInfo[i].fileUrl+"'>";
				divSource +=result[0].listInfo[i].title+"</a></li>";
			}
			$("#infoFile").append(divSource);
		}
	});	
};
 