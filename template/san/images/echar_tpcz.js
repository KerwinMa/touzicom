window.onfocus = function (e) {
	ajaxGetCZDate();
}
var ktvalue=0;
var startValue=50;//默认图形缩进条起始位置
var maxVale=200;//默认成指X轴显示的最多数据

//路径配置  
require.config({
	paths : {
		echarts : 'http://www.neeq.com.cn/template/1/bluewise/_files/echar'// 相对路径
	}
});

$(function() {
	ajaxGetCZDate();
	ajaxGetNeeqList();
	ajaxGetgSbczWeight()
	KLIntTypeGetUpdate();
	sortOrder();
});

function KLIntTypeGetUpdate() {
	setInterval("ajaxGetMinDateAll()", 60000);//一小时刷新一次
}

function ajaxGetMinDateAll() {
	ajaxGetCZDate();
	ajaxGetNeeqList();
	ajaxGetgSbczWeight();
}

function getPageSelect1(cruPage){
	$("#pageId1").val(cruPage);
	return ajaxGetgSbczWeight();
}
function sortOrder(){
	$("#zqdm").live('click',(function(){
		$("#sfield").val(1);
		var sortFlag = $("#sflag").val();
		if(sortFlag==0){
			$("#sflag").val(1)
		}else{
			$("#sflag").val(0)
		}
		ajaxGetgSbczWeight();
	}));
	$("#zxj").live('click',(function(){
		$("#sfield").val(2);
		var sortFlag = $("#sflag").val();
		if(sortFlag==0){
			$("#sflag").val(1)
		}else{
			$("#sflag").val(0)
		}
		ajaxGetgSbczWeight();
	}));
	$("#zd").live('click',(function(){
		$("#sfield").val(3);
		var sortFlag = $("#sflag").val();
		if(sortFlag==0){
			$("#sflag").val(1)
		}else{
			$("#sflag").val(0)
		}
		ajaxGetgSbczWeight();
	}));
	$("#zdf").live('click',(function(){
		$("#sfield").val(0);
		var sortFlag = $("#sflag").val();
		if(sortFlag==0){
			$("#sflag").val(1)
		}else{
			$("#sflag").val(0)
		}
		ajaxGetgSbczWeight();
	}));
}

function ajaxGetgSbczWeight(){
	var sortField = $("#sfield").val();
	var sortFlag = $("#sflag").val();
	var zxjDiv="";
	var zqdmDiv="";
	var zdDiv="";
	var zdfjDiv="";
	if(sortField=="1" && sortFlag =="0"){
		zqdmDiv ="<em><img src='http://www.neeq.com.cn/template/1/bluewise/_files/images/icon-change-up.png'></em>";
	}else if(sortField=="1" && sortFlag =="1"){
		zqdmDiv ="<em><img src='http://www.neeq.com.cn/template/1/bluewise/_files/images/icon-change-down.png'></em>"
	} 
	if(sortField=="2" && sortFlag =="0"){
		zxjDiv ="<em><img src='http://www.neeq.com.cn/template/1/bluewise/_files/images/icon-change-up.png'></em>";
	}else if(sortField=="2" && sortFlag =="1"){
		zxjDiv ="<em><img src='http://www.neeq.com.cn/template/1/bluewise/_files/images/icon-change-down.png'></em>"
	} 
	if(sortField=="3" && sortFlag =="0"){
		zdDiv ="<em><img src='http://www.neeq.com.cn/template/1/bluewise/_files/images/icon-change-up.png'></em>";
	}else if(sortField=="3" && sortFlag =="1"){
		zdDiv ="<em><img src='http://www.neeq.com.cn/template/1/bluewise/_files/images/icon-change-down.png'></em>"
	} 
	if(sortField=="0" && sortFlag =="0"){
		zdfjDiv ="<em><img src='http://www.neeq.com.cn/template/1/bluewise/_files/images/icon-change-up.png'></em>";
	}else if(sortField=="0" && sortFlag =="1"){
		zdfjDiv ="<em><img src='http://www.neeq.com.cn/template/1/bluewise/_files/images/icon-change-down.png'></em>"
	} 
	
	$.ajax({
		url : 'http://www.neeq.com.cn/nqhqController/getWeightList.do',
		type : 'POST',
		data : {
			page : $("#pageId1").val(),
			pageSize:4,
			type:"1",
			sortField:sortField,
			sortFlag:sortFlag
		},
		dataType : 'jsonp',
		success : function(result) {
			$("#weight_list").empty();
			var divSource = "<tr class='store'><th id='zqdm' style='cursor:pointer'><a>代码"+zqdmDiv+"</a></th><th class='tc'>名称</th>" +
					"<th class='tc' id='zxj' style='cursor:pointer'><a>最新价"+zxjDiv+"</a></th>" +
					"<th class='tc' id='zd' style='cursor:pointer'><a>涨跌"+zdDiv+"</a></th>" +
					"<th id='zdf' style='cursor:pointer'><a>涨跌幅"+zdfjDiv+"</a></th></tr>";
			if(result[0].pageList!=null){
				for(var i=0;i<result[0].pageList.content.length;i++){
					var strZDF;
					if(result[0].pageList.content[i].hqzdf>0){
						strZDF = "<p style='color:red'>";
					}else if(result[0].pageList.content[i].hqzdf<0){
						strZDF = "<p style='color:green'>";
					}else{
						strZDF = "<p style='color:grey'>";
					}
					divSource += "<tr><td class='aunderline'><a target='_blank' href='detailcompany.html?companyCode="+result[0].pageList.content[i].hqzqdm+"&typename=G'>"+result[0].pageList.content[i].hqzqdm+"</a></td>";
					divSource += "<td class='tc'>"+result[0].pageList.content[i].hqzqjc+"</td>";
					divSource += "<td class='tc'>"+result[0].pageList.content[i].hqzjcj.toFixed(2)+"</td>";
					divSource += "<td class='tc'>"+strZDF+result[0].pageList.content[i].hqzd.toFixed(2)+"</p></td>";
					divSource += "<td>"+strZDF+result[0].pageList.content[i].hqzdf.toFixed(2)+"%</p></td></tr>";
				}
				$("#Pagination1").pagination(result[0].pageList.totalElements, {
					current_page : result[0].pageList.number,
					items_per_page: result[0].pageList.size,
					num_edge_entries : 2,
					num_display_entries : 5,
					ellipse_text : "...",
					callback : getPageSelect1// 回调
				});
			}else{
				$("#Pagination1").empty();
			}
			
			$("#weight_list").append(divSource);
		}
	});
}

function ajaxGetNeeqList(){
	$.ajax({
		url : 'http://www.neeq.com.cn/neeqController/getNeeqList.do',
		type : 'POST',
		dataType : 'jsonp',
		success : function(object) {
			var objArr = eval(object);
			$("#neeq_list").empty();
			$("#neeq_fix").empty();
			$("#neeq_notes").empty();
			var divSource = "<tr><th>代码</th><th class='tc'>名称</th><th class='tc'>最新价</th><th class='tc'>涨跌</th><th>涨跌幅</th></tr>";
			var divSource1="";
//			var divSource2="";
			if(objArr.length>0){
				for(var i=0;i<objArr.length;i++){
					var strZD;
					var strUrl;
					if(objArr[i].ZD<0){
						strZD = "<b style='color:green'>";
					}else{
						strZD = "<b style='color:red'>";
					}
					if(objArr[i].ZSDM=='899001'){
						strUrl ="sbcz.html";
					}else{
						strUrl ="sbzs.html";
					}
					divSource +="<tr><td class='aunderline'><a href='"+strUrl+"'>"+objArr[i].ZSDM+"</a></td>";
					divSource +="<td class='tc'>"+objArr[i].JC+"</td>";
					divSource +="<td class='tc'>"+getNameLength(Math.round(objArr[i].DRZX*100)/100)+"</td>";
					divSource +="<td class='tc'>"+strZD+getNameLength(Math.round(objArr[i].ZD*100)/100)+"</b></td>";
					if(objArr[i].ZSDM=='899001'){
						divSource +="<td >"+strZD+getNameLength(Math.round(objArr[i].ZDF*100)/100)+"%</b></td></tr>";
					}else{
						divSource +="<td >"+strZD+getNameLength(Math.round(objArr[i].ZDF*10000)/100)+"%</b></td></tr>";
					}
					if(objArr[i].ZSDM=='899001'){
						var strEm;
						if(objArr[i].ZD<0){
							strEm="<em class='green_line'>↓</em><span style='color: green;'>";
						}else{
							strEm="<em>↑</em><span style='color: red;'>";
						}
						divSource1 +="<div class='time'>"+getMounthDay(objArr[i].JSRQ,1)+"</div>";
						divSource1 +="<div class='rose'>"+strZD+getNameLength(Math.round(objArr[i].DRZX*100)/100)+"</b>"+strEm+objArr[i].ZD+"</span></div>";
						divSource1 +="<div class='info'><p><span>涨幅：</span>"+strZD+getNameLength(Math.round(objArr[i].ZDF*100)/100)+"%</b></p>";
						divSource1 +="<p><span>成交量：</span>"+getNameLength(Math.round(objArr[i].CJL/10000*100)/100)+"（万股）</p>";
						divSource1 +="<p><span>成交额：</span>"+getNameLength(Math.round(objArr[i].CJJE/10000*100)/100)+"（万元）</p><div>";
						
//						divSource2 +="<span>今开："+getNameLength(Math.round(objArr[i].DRKP*100)/100)+"</sapn>";
//						divSource2 +="<span>昨收："+getNameLength(Math.round(objArr[i].DRSP*100)/100)+"</sapn>";
//						divSource2 +="<span>最高："+getNameLength(Math.round(objArr[i].DRZD*100)/100)+"</sapn>";
//						divSource2 +="<span>最低："+getNameLength(Math.round(objArr[i].DRZX*100)/100)+"</sapn>";
//						divSource2 +="<span>振幅："+getNameLength(Math.round(((objArr[i].DRZD-objArr[i].DRZX)/objArr[i].DRZX)*10000)/100)+"%</sapn>";
					}
				}
				$("#neeq_list").append(divSource);
				$("#neeq_fix").append(divSource1);
//				$("#neeq_notes").append(divSource2);
			}
			}
		});
}


function ajaxGetCZDate(){
	var datatime=[];//日期
	var closeData=[];//收盘
	var dealTotalData=[];//成交量
	var dealTotalData1=[];//成交量
	var dealMoneyData=[];//成交额
	var updownData=[];//涨跌
	var upDownLimitData=[];//涨跌幅
	var datakline=[];
	$.ajax({
		url : 'http://www.neeq.com.cn/neeqController/getSBCZ.do',
		type : 'POST',
		dataType : 'jsonp',
		success : function(object) {
			var objArr = eval(object);
			if(objArr.length > 0){
				for(var i=0;i<objArr.length;i++){
					datatime[i] = objArr[i].jsrq;
					closeData[i] = objArr[i].drsp;
					dealTotalData[i] = objArr[i].cjl;
					dealTotalData1[i] = Math.round(objArr[i].cjl/10000*10000)/10000 ;
					dealMoneyData[i] = objArr[i].cjje;
					updownData[i] = objArr[i].zd;
					upDownLimitData[i] = objArr[i].zdf;
					datakline[i] = [datatime[i],closeData[i]];
				}
			}
			
			var datalen= datatime.length;
			if(datalen<=maxVale)
			{
				ktvalue=0;	
			}
			else
			{
				ktvalue=startValue;	
			}
			
			// 使用柱状图就加载bar模块，按需加载
			require(['echarts', 'echarts/chart/line', 'echarts/chart/bar'],
			function(ec) {
				var myChart1 = ec.init(document.getElementById('canvasDiv1'));
				var option1 = {
					tooltip : {// 提示框，鼠标悬浮交互时的信息提示
						trigger : 'axis',
						showDelay : 0, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
						formatter : function(a) {
							var time=a[0][1];
							var res = getMounthDay(time,2) ;
							 $.grep( datakline, function(n,i){
								  if(n[0]==time)
								  {
									  dataIndex=i;
								  }
								  return ;
								}, true);
							
							
							var strSP=closeData[dataIndex];
							var strCJL=dealTotalData[dataIndex];
							var strCJE=dealMoneyData[dataIndex];
							var strZD=updownData[dataIndex];
							var strZDF=upDownLimitData[dataIndex];
							
							
							if (isNaN(strSP)) {
								res += "<br>收盘：0"
							} else {
								res += "<br>收盘:"
										+ getNameLength(Math.round(strSP*100)/100)
							}
							if (isNaN(strCJL)) {
								res += "<br>成交量: 0"
							} else {
								res += "<br>成交量:"
										+getNameLength(Math.round(strCJL/10000*100)/100)+"(万股)" 
							}
							if (isNaN(strCJE)) {
								res += "<br>成交额: 0"
							} else {
								res += "<br>成交额:"
									+ getNameLength(Math.round(strCJE/10000*100)/100)+"(万元)"  
							}
							if (isNaN(strZD)) {
								res += "<br>涨跌: 0"
							} else {
								res += "<br>涨跌:"
									+ getNameLength(Math.round(strZD*100)/100)
							}
							if (isNaN(strZDF)) {
								res += "<br>涨跌幅: 0"
							} else {
								res += "<br>涨跌幅:"
									+ getNameLength(Math.round(strZDF*100)/100) + "%"
							}
							return res;
						}
					},
					grid : {// 控制图形位置及大小
						width : 750,
						height : 330,
						y : 5,
						x : 55
					},
					toolbox : {// 右上角小工具
						show : false
					},
					calculable : true,
					legend : {
						y : -30,
						data : [ '最新价', '成交量' ]
					},
					dataZoom : { //底部tabBar提示
				        show : true,
				        realtime: true,
				        start :ktvalue,
				        end :100
				    },
					xAxis : [ {
						type : 'category',
						scale : true,
						splitNumber : 1,
						boundaryGap : true,// 类目起始和结束两端空白策略
						axisTick : {
							onGap : true
						},// x轴分割点
						splitLine : {
							show : false
						},// 网格线
						data : datatime,
						splitArea : {// 网格加深
							show : false
						}
					} ],
					yAxis : [ {
						type : 'value',
						scale : true,// 脱离0值比例，放大聚焦到最终_min，_max区间
						splitNumber : 5,// y轴分割段数
						splitArea : {// 分割区域显示，默认显示
							show : true
						},
						axisLabel : {
							boundaryGap : true,
							formatter : function(v, b, c) {
								return parseInt(v);// y轴分割后分割点取整数
							}
						}
					} ],
					series : [ {
						name : "收盘",
						type : "line",
						symbol : 'none',// 是否显示点
						itemStyle : {
							normal : {
								lineStyle : {
									color : 'red'
								}
							}
						},
						data : closeData
					}
					]
				};
				// 为echarts对象加载数据
				myChart1.setOption(option1);
				
				var myChart2 = ec.init(document.getElementById('canvasDiv2'));
				var option2 = {
					grid : {// 控制图形位置及大小
						width : 440,
						height : 250,
						y : 5,
						x : 55
					},
					toolbox : {// 右上角小工具
						show : false
					},
					calculable : true,
					legend : {
						y : -30,
						data : [ '最新价', '成交量' ]
					},
					dataZoom : { 
				        realtime: true,
				        start :ktvalue,
				        end :100
				    },
					xAxis : [ {
						type : 'category',
						scale : true,
						splitNumber : 1,
						boundaryGap : true,// 类目起始和结束两端空白策略
						axisTick : {
							onGap : true
						},// x轴分割点
						splitLine : {
							show : false
						},// 网格线
						data : datatime,
						splitArea : {// 网格加深
							show : false
						}
					} ],
					yAxis : [ {
						type : 'value',
						min : 0,
						scale : true,// 脱离0值比例，放大聚焦到最终_min，_max区间
						splitNumber : 5,// y轴分割段数
						splitArea : {// 分割区域显示，默认显示
							show : true
						},
						axisLabel : {
							boundaryGap : true,
							formatter : function(v, b, c) {
								return parseInt(v)+"万";// y轴分割后分割点取整数
							}
						}
					} ],
					series : [ {
						name : "成交量",
						type : "bar",
						barMaxWidth:50,
						symbol : '',// 是否显示点
						itemStyle : {
							normal : {
								color : 'red'
							}
						},
						data : dealTotalData1
					}
					]
				};
				// 为echarts对象加载数据
				myChart2.setOption(option2);
				
				myChart1.connect([ myChart2]);
				myChart2.connect([ myChart1]);
			});
		}
	});
}

function getNameLength(name) {
	var date = name.toString();
	if (date.indexOf(".") == -1) {
		date = date + ".00";
	} else {
		var attr = date.split(".");

		if (attr[attr.length - 1].length < 2) {
			date = date + "0";
		}
	}
	return date;
}
function getMounthDay(dateTime,type){
	var date = dateTime.toString();
	var strM;
	var strD;
	var strY;
	if(date.length<8){
		return date;
	}else{
		if(type==1){
			strM = date.substring(4,6);
			strD = date.substring(6,8);
			return strM+"月"+strD+"号";
		}
		if(type==2){
			strY = date.substring(0,4)
			strM = date.substring(4,6);
			strD = date.substring(6,8);
			return strY+"-"+strM+"-"+strD;
		}
	}
}