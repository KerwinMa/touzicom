window.onfocus = function (e) {
	ajaxGetMinDate();
}
var ktvalue=0;
var startValue=50;//默认图形缩进条起始位置
var maxVale=200;//默认riK线X轴显示的最大数据

//路径配置  
require.config({
	paths : {
		echarts : 'http://www.neeq.com.cn/template/1/bluewise/_files/echar'// 相对路径
	}
});

$(function() {
	ajaxGetMinDate();
	ajaxGetNeeqList();
	ajaxGetgSbzsWeight();
	$("#minline").click(function(){
		ajaxGetMinDate();
	});
	$("#dayKline").click(function(){
		var divIdK = "canvasDiv2";
		var divIdBar = "canvasDiv3";
		ajaxGetKLine("dayKline",divIdK,divIdBar);
	});
	$("#weekKline").click(function(){
		var divIdK = "canvasDiv4";
		var divIdBar = "canvasDiv5";
		ajaxGetKLine("weekKline",divIdK,divIdBar);
	});
	$("#monthKline").click(function(){
		var divIdK = "canvasDiv6";
		var divIdBar = "canvasDiv7";
		ajaxGetKLine("monthKline",divIdK,divIdBar);
	});
	$("#yearKline").click(function(){
		var divIdK = "canvasDiv8";
		var divIdBar = "canvasDiv9";
		ajaxGetKLine("yearKline",divIdK,divIdBar);
	});
	KLIntTypeGetUpdate();
	sortOrder();
});

function KLIntTypeGetUpdate() {
	setInterval("ajaxGetMinDateAll()", 60000);
}

function ajaxGetMinDateAll() {
	ajaxGetMinDate();
	ajaxGetNeeqList();
	ajaxGetgSbzsWeight();
}

function getPageSelect1(cruPage){
	$("#pageId1").val(cruPage);
	return ajaxGetgSbzsWeight();
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
		 ajaxGetgSbzsWeight();
	}));
	$("#zxj").live('click',(function(){
		$("#sfield").val(2);
		var sortFlag = $("#sflag").val();
		if(sortFlag==0){
			$("#sflag").val(1)
		}else{
			$("#sflag").val(0)
		}
		ajaxGetgSbzsWeight();
	}));
	$("#zd").live('click',(function(){
		$("#sfield").val(3);
		var sortFlag = $("#sflag").val();
		if(sortFlag==0){
			$("#sflag").val(1)
		}else{
			$("#sflag").val(0)
		}
		ajaxGetgSbzsWeight();
	}));
	$("#zdf").live('click',(function(){
		$("#sfield").val(0);
		var sortFlag = $("#sflag").val();
		if(sortFlag==0){
			$("#sflag").val(1)
		}else{
			$("#sflag").val(0)
		}
		ajaxGetgSbzsWeight();
	}));
}

function ajaxGetgSbzsWeight(){
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
			type:"2",
			sortField:sortField,
			sortFlag:sortFlag
		},
		dataType : 'jsonp',
		success : function(result) {
			$("#weight_list").empty();
			var divSource = "<tr class='store'><th id='zqdm' style='cursor:pointer'><a>股权代码"+zqdmDiv+"</a></th><th class='tc'>股权名称</th>" +
					"<th class='tc' id='zxj' style='cursor:pointer'><a>当前价"+zxjDiv+"</a></th>" +
					"<th class='tc' id='zd' style='cursor:pointer'><a>涨跌额"+zdDiv+"</a></th>" +
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
					divSource += "<tr><td class='aunderline'><a target='_blank' href='/detailcompany.html?companyCode="+result[0].pageList.content[i].hqzqdm+"&typename=G'>"+result[0].pageList.content[i].hqzqdm+"</a></td>";
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

}



function ajaxGetMinDate() {
	var xMinuteKline = [];
	var yMinuteKlines = [];// 最新价
	var yMinuteKlines1 = [];// 昨日收盘
	var yMinuteKlines2 = [];// 成交量
	var yMinuteKlines2_2 = [];// 成交量
	var yMinuteKlines3 = [];// 成交额
	var min=0;
	var max=0;
	var chen=0;
	var mincount=0;
	var datatime = [ "9:30", "9:31", "9:32", "9:33", "9:34", "9:35", "9:36",
			"9:37", "9:38", "9:39", "9:40", "9:41", "9:42", "9:43", "9:44",
			"9:45", "9:46", "9:47", "9:48", "9:49", "9:50", "9:51", "9:52",
			"9:53", "9:54", "9:55", "9:56", "9:57", "9:58", "9:59", "10:00",
			"10:01", "10:02", "10:03", "10:04", "10:05", "10:06", "10:07",
			"10:08", "10:09", "10:10", "10:11", "10:12", "10:13", "10:14",
			"10:15", "10:16", "10:17", "10:18", "10:19", "10:20", "10:21",
			"10:22", "10:23", "10:24", "10:25", "10:26", "10:27", "10:28",
			"10:29", "10:30", "10:31", "10:32", "10:33", "10:34", "10:35",
			"10:36", "10:37", "10:38", "10:39", "10:40", "10:41", "10:42",
			"10:43", "10:44", "10:45", "10:46", "10:47", "10:48", "10:49",
			"10:50", "10:51", "10:52", "10:53", "10:54", "10:55", "10:56",
			"10:57", "10:58", "10:59", "11:00", "11:01", "11:02", "11:03",
			"11:04", "11:05", "11:06", "11:07", "11:08", "11:09", "11:10",
			"11:11", "11:12", "11:13", "11:14", "11:15", "11:16", "11:17",
			"11:18", "11:19", "11:20", "11:21", "11:22", "11:23", "11:24",
			"11:25", "11:26", "11:27", "11:28", "11:29", "11:30", "13:00",
			"13:01", "13:02", "13:03", "13:04", "13:05", "13:06", "13:07",
			"13:08", "13:09", "13:10", "13:11", "13:12", "13:13", "13:14",
			"13:15", "13:16", "13:17", "13:18", "13:19", "13:20", "13:21",
			"13:22", "13:23", "13:24", "13:25", "13:26", "13:27", "13:28",
			"13:29", "13:30", "13:31", "13:32", "13:33", "13:34", "13:35",
			"13:36", "13:37", "13:38", "13:39", "13:40", "13:41", "13:42",
			"13:43", "13:44", "13:45", "13:46", "13:47", "13:48", "13:49",
			"13:50", "13:51", "13:52", "13:53", "13:54", "13:55", "13:56",
			"13:57", "13:58", "13:59", "14:00", "14:01", "14:02", "14:03",
			"14:04", "14:05", "14:06", "14:07", "14:08", "14:09", "14:10",
			"14:11", "14:12", "14:13", "14:14", "14:15", "14:16", "14:17",
			"14:18", "14:19", "14:20", "14:21", "14:22", "14:23", "14:24",
			"14:25", "14:26", "14:27", "14:28", "14:29", "14:30", "14:31",
			"14:32", "14:33", "14:34", "14:35", "14:36", "14:37", "14:38",
			"14:39", "14:40", "14:41", "14:42", "14:43", "14:44", "14:45",
			"14:46", "14:47", "14:48", "14:49", "14:50", "14:51", "14:52",
			"14:53", "14:54", "14:55", "14:56", "14:57", "14:58", "14:59",
			"15:00" ];
	$.ajax({
		url : 'http://www.neeq.com.cn/neeqController/getMinu.do',
		type : 'POST',
		dataType : 'jsonp',
		success : function(object) {
			var objArr = eval(object);
			if (objArr.length > 0) {
				for(var i=0;i<objArr.length;i++){
					var lastPrice;
					if(objArr[i]==null||objArr[i]==""){
						xMinuteKline[i] =objArr[0].JSRQ;
						//yMinuteKlines1 = objArr[0].zsp;
						yMinuteKlines2[i] = 0;
						yMinuteKlines2_2[i] = 0;
						yMinuteKlines3[i] = 0;
						yMinuteKlines[i] = lastPrice;
					}else{
						xMinuteKline[i]= objArr[0].JSRQ;
						//yMinuteKlines1 = objArr[0].zsp;
						yMinuteKlines2[i] = objArr[i].CJL==null?0:objArr[i].CJL;
						yMinuteKlines2_2[i] = objArr[i].CJL==null?0:Math.round(objArr[i].CJL/10000*10000)/10000;
						yMinuteKlines3[i] = objArr[i].CJJE==null?0:objArr[i].CJJE;
						yMinuteKlines[i] = objArr[i].SSZS==null?objArr[0].ZRSP:objArr[i].SSZS;
						lastPrice = yMinuteKlines[i];
					}
				}
//				alert(yMinuteKlines2);
				mincount=yMinuteKlines.length;
				//y轴最大最小值
				max=Math.max.apply(null, yMinuteKlines);
				if(yMinuteKlines.length>1)
				{
					min=Math.min.apply(null, yMinuteKlines);
				}
				
				//**********************保证昨日收盘不为null**********************
				for(var i=0;i<datatime.length;i++){
					if(objArr[0].ZRSP==null){
						yMinuteKlines1[i]=max*0.9;
					}else{
						yMinuteKlines1[i] = objArr[0].ZRSP;
					}
				}
				//**********************保证昨日收盘不为null**********************
				
				var tempchen1=max-yMinuteKlines1[0];
				var tempchen2=yMinuteKlines1[0]-min;
				if(tempchen1>tempchen2)
				{
					chen=tempchen1;
				}
				else
				{
					chen=tempchen2;
				}
				var linmin=yMinuteKlines1[0]-1.1*chen;
				var linmax=	yMinuteKlines1[0]+1.1*chen;
				if(mincount<=0)
				{
					linmin=yMinuteKlines1[0]- yMinuteKlines1[0]*0.1;
					linmax=yMinuteKlines1[0]+ yMinuteKlines1[0]*0.1;
				}
				
				while(linmin<=0)
				{
					
					linmax=linmax- yMinuteKlines1[0]*0.1;
					linmin=linmin+ yMinuteKlines1[0]*0.1;
				}
				
				// 使用柱状图就加载bar模块，按需加载
				require(['echarts', 'echarts/chart/line', 'echarts/chart/bar'],
				function(ec) {
					var myChartMin1 = ec.init(document.getElementById('canvasDiv'));
					var option1 = {
						tooltip : {// 提示框，鼠标悬浮交互时的信息提示
							trigger : 'axis',
							showDelay : 0, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
							formatter : function(a) {
								var res = xMinuteKline[0] + " "
										+ a[0][1];// 拼接字符串
								if (isNaN(yMinuteKlines[a[0].dataIndex])) {
									res += "<br>最新价：0"
								} else {
									res += "<br>最新价:"
											+getNameLength(Math.round(yMinuteKlines[a[0].dataIndex]*100)/100) 
								}
								if (yMinuteKlines1[0] == undefined) {
									res += "<br>昨日收盘: 0"
								} else {
									res += "<br>昨日收盘:"
											+getNameLength(Math.round(yMinuteKlines1[0]*100)/100)  
								}

								var cknanresult = true;
								if (isNaN(yMinuteKlines3[a[0].dataIndex])) {
									cknanresult = false;
								}
								if (cknanresult) {
									res += "</br>成交量:"
											+getNameLength(Math.round(yMinuteKlines2[a[0].dataIndex]/10000*100)/100) 
											+ "(万股)";
									res += "</br>成交额:"
											+getNameLength(Math.round(yMinuteKlines3[a[0].dataIndex]/10000*100)/100)  
											+ "(万元)";
								} else {
									res += "</br>成交量:-(万股)"
									res += "</br>成交额:-(万元)"
								}
								return res;
							}
						},
						grid : {// 控制图形位置及大小
							width : 750,
							height : 330,
							y : 25,
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
						xAxis : [ {
							type : 'category',
							scale : true,
							splitNumber : 5,
							boundaryGap : true,// 类目起始和结束两端空白策略
							axisTick : {
								onGap : true
							},// x轴分割点
							splitLine : {
								show : true
							},// 网格线
							data : datatime,
							splitArea : {// 网格加深
								show : true
							},
							axisLabel : {
								interval : 59,// x轴区间间隔
								formatter : function(v, b, c) {
									if (v == "9:30") {
										return "9:30";
									} else if (v == "10:30") {
										return "";
									} else if (v == "11:30") {
										return "11:30/13:00";
									} else if (v == "14:59") {
										return "15:00";
									} else {
										return "";
									}
								}
							}
						} ],
						yAxis : [ {
							type : 'value',
							scale : true,// 脱离0值比例，放大聚焦到最终_min，_max区间
							splitNumber : 6,// y轴分割段数
							splitArea : {// 分割区域显示，默认显示
								show : true
							},
							min : linmin,
							max : linmax,
							axisLabel : {
								boundaryGap : true,
								formatter : function(v, b, c) {
									return parseInt(v);// y轴分割后分割点取整数
								}
							}
						},
						{
				            type : 'value',
				            scale:true,
				            splitNumber: 6,
				            min:linmin,
							max:linmax,
				            axisLabel: {
				                formatter: function (v) {
					                	var num=(v-yMinuteKlines1[0])/yMinuteKlines1[0]*100;
					                    return getNameLength(Math.round(num*100)/100)+"%";
				                }
				            }
				        }
						],
						series : [ {
							name : "最新价",
							type : 'line',
							symbol : 'none',// 是否显示点
							itemStyle : {
								normal : {
									lineStyle : {
										color : 'red'
									}
								}
							},
							data : yMinuteKlines
						},{
		                       name:"昨日收盘",//根据需求是一条加粗的直线
		                       type:"line",
		                       symbol : 'none',
		                       itemStyle : {
		   						normal : {
		   							lineStyle : {
		   								color : 'grey',
		   								width:2
		   							}
		   						}
		   					},
		                       data: yMinuteKlines1
		                   },
		                   {
		                       name:"成交量",
		                       type:"line",
		                       symbol : 'none',
		                       itemStyle: {
		   		                normal: {
		   		                  lineStyle:{
		   		                    width:0
		   		                  }
		   		                }
		   		  			},
		                       data: [] //yMinuteKlines2
		                   },
		                   {
		                       name:"成交额",
		                       type:"line",
		                       symbol : 'none',
		                       itemStyle: {
		   		                normal: {
		   		                  lineStyle:{
		   		                    width:0
		   		                  }
		   		                }
		   		  			},
		                       data: [] //yMinuteKlines3
		                   } 
						
						]
					};
					// 为echarts对象加载数据
					myChartMin1.setOption(option1);
					
					// 使用柱状图就加载bar模块，按需加载
					var myChartMin2 = ec.init(document.getElementById('canvasDiv1'));
					var option2 = {
						grid : {// 控制图形位置及大小
							width : 780,
							height : 80,
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
						xAxis : [ {
							type : 'category',
							scale : true,
							splitNumber : 5,
							boundaryGap : true,// 类目起始和结束两端空白策略
							axisTick : {
								onGap : true
							},// x轴分割点
							splitLine : {
								show : true
							},// 网格线
							data : datatime,
							splitArea : {// 网格加深
								show : true
							},
							axisLabel : {
								interval : 59,// x轴区间间隔
								formatter : function(v, b, c) {
									if (v == "9:30") {
										return "9:30";
									} else if (v == "10:30") {
										return "";
									} else if (v == "11:30") {
										return "11:30/13:00";
									} else if (v == "14:59") {
										return "15:00";
									} else {
										return "";
									}
								}
							}
						} ],
						yAxis : [ {
							type : 'value',
							scale : true,// 脱离0值比例，放大聚焦到最终_min，_max区间
							splitNumber : 1,// y轴分割段数
							splitArea : {// 分割区域显示，默认显示
								show : true
							},
							min : 0,
							axisLabel : {
								boundaryGap : true,
								formatter : function(v, b, c) {
									return parseInt(v*100/100)+"万";// y轴分割后分割点取整数
								}
							}
						}
						],
						series : [ {
							name : "成交量",
							type : "bar",
							symbol : 'none',// 是否显示点
							itemStyle : {
								normal : {
										color : 'red'
								}
							},
							data : yMinuteKlines2_2
						}
						]
					};
					// 为echarts对象加载数据
					myChartMin2.setOption(option2);
					
					myChartMin1.connect([ myChartMin2]);
					myChartMin2.connect([ myChartMin1]);
				});
			}
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
		if(type==2){
			if(date.length<6){
				return date;
			}else{
				strY = date.substring(0,4);
				strM = date.substring(4,6);
				return strY+"-"+strM;
			}
		}else{
			return date;
		}
	}else{
		if(type==1){
			strM = date.substring(4,6);
			strD = date.substring(6,8);
			return strM+"月"+strD+"号";
		}
		if(type==2){
			strY = date.substring(0,4);
			strM = date.substring(4,6);
			strD = date.substring(6,8);
			return strY+"-"+strM+"-"+strD;
		}
	}
}

