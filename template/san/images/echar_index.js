window.onfocus = function (e) {
	ajaxGetMinDate();

}
var startValue=80;//首页三板成指x轴起始值
//路径配置  
require.config({
	paths : {
		echarts : 'http://www.neeq.com.cn/template/1/bluewise/_files/echar'// 相对路径
	}
});

$(function() {
	ajaxGetMinDate();
	ajaxGetMarketData();
	ajaxGetListingWay();
	$("#sbzs").click(function(){
		ajaxGetMinDate();
	});
	$("#sbcz").click(function(){
		ajaxGetCZDate();
	});
	KLIntTypeGetUpdate();
	//转让意向
	getTransBuy();
	getTransSale();
});

function KLIntTypeGetUpdate() {
	setInterval("ajaxGetMinDateAll()", 60000);
}

function ajaxGetMinDateAll() {
	ajaxGetMinDate();
	ajaxGetMarketData();
}

function ajaxGetMarketData(){
	$.ajax({
		url : 'http://www.neeq.com.cn/nqxxController/getMarketData.do',
		type : 'POST',
		dataType : 'jsonp',
		success : function(object) {
			var objArr = eval(object);
			$("#market_list").empty();
			$("#listingcompany").empty();
			$("#listingcompany1").empty();
			$("#listingcompany2").empty();
			$("#listingcompany3").empty();
			$("#listingcompany4").empty();
			$("#listingcompany5").empty();
			$("#delistcompany").empty();
			var divSource="";
			var divSource1="";
			var divSource2="";
			var divSource3="";
			var divSource4="";
			var divSource5="";
			var divSource6="";
			if(objArr.length>0){
				for(var i=0;i<objArr.length;i++){
					if(objArr[i].xxlx==""){//市场总貌
						divSource +="<li><span class='fr'>"+objArr[i].xxsl+"家</span>证券数量</li>";
						divSource +="<li class='gray_li'><span class='fr'>"+getNameLength(Math.round(objArr[i].xxzgb/100000000*100)/100)+"亿股</span>总股本</li>";
						divSource +="<li><span  class='fr'>"+getNameLength(Math.round(objArr[i].xxfxsgb/100000000*100)/100)+"亿股</span>流通股本</li>";
						divSource +="<li class='gray_li'><span class='fr'>"+getNameLength(Math.round(objArr[i].hqcjsl/10000*100)/100)+"万股</span>成交股数</li>";
						divSource +="<li><span  class='fr'>"+getNameLength(Math.round(objArr[i].hqcjje/10000*100)/100)+"万元</span>成交金额</li>";
					}
					if(objArr[i].xxlx=="T"){//挂牌公司-总体
						divSource1 +="<li><span class='fr'>"+objArr[i].xxsl+"家</span>挂牌公司</li>";
						divSource1 +="<li class='gray_li'><span class='fr'>"+getNameLength(Math.round(objArr[i].xxzgb/100000000*100)/100)+"亿股</span>总股本</li>";
						divSource1 +="<li><span  class='fr'>"+getNameLength(Math.round(objArr[i].xxfxsgb/100000000*100)/100)+"亿股</span>流通股本</li>";
						divSource1 +="<li class='gray_li'><span class='fr'>"+getNameLength(Math.round(objArr[i].hqcjsl/10000*100)/100)+"万股</span>成交股数</li>";
						divSource1 +="<li><span  class='fr'>"+getNameLength(Math.round(objArr[i].hqcjje/10000*100)/100)+"万元</span>成交金额</li>";
					}
					if(objArr[i].xxlx=="TT"){//挂牌公司-协议
						divSource2 +="<li><span class='fr'>"+objArr[i].xxsl+"家</span>挂牌公司</li>";
						divSource2 +="<li class='gray_li'><span class='fr'>"+getNameLength(Math.round(objArr[i].xxzgb/100000000*100)/100)+"亿股</span>总股本</li>";
						divSource2 +="<li><span  class='fr'>"+getNameLength(Math.round(objArr[i].xxfxsgb/100000000*100)/100)+"亿股</span>流通股本</li>";
						divSource2 +="<li class='gray_li'><span class='fr'>"+getNameLength(Math.round(objArr[i].hqcjsl/10000*100)/100)+"万股</span>成交股数</li>";
						divSource2 +="<li><span  class='fr'>"+getNameLength(Math.round(objArr[i].hqcjje/10000*100)/100)+"万元</span>成交金额</li>";
					}
					if(objArr[i].xxlx=="TM"){//挂牌公司-做市
						divSource3 +="<li><span class='fr'>"+objArr[i].xxsl+"家</span>挂牌公司</li>";
						divSource3 +="<li class='gray_li'><span class='fr'>"+getNameLength(Math.round(objArr[i].xxzgb/100000000*100)/100)+"亿股</span>总股本</li>";
						divSource3 +="<li><span  class='fr'>"+getNameLength(Math.round(objArr[i].xxfxsgb/100000000*100)/100)+"亿股</span>流通股本</li>";
						divSource3 +="<li class='gray_li'><span class='fr'>"+getNameLength(Math.round(objArr[i].hqcjsl/10000*100)/100)+"万股</span>成交股数</li>";
						divSource3 +="<li><span  class='fr'>"+getNameLength(Math.round(objArr[i].hqcjje/10000*100)/100)+"万元</span>成交金额</li>";
					}
					if(objArr[i].xxlx=="B"){//两网及退市公司
						divSource4 +="<li><span class='fr'>"+objArr[i].xxsl+"家</span>证券数量</li>";
						divSource4 +="<li class='gray_li'><span class='fr'>"+getNameLength(Math.round(objArr[i].xxzgb/100000000*100)/100)+"亿股</span>总股本</li>";
						divSource4 +="<li><span  class='fr'>"+getNameLength(Math.round(objArr[i].xxfxsgb/100000000*100)/100)+"亿股</span>流通股本</li>";
						divSource4 +="<li class='gray_li'><span class='fr'>"+getNameLength(Math.round(objArr[i].hqcjsl/10000*100)/100)+"万股</span>成交股数</li>";
						divSource4 +="<li><span  class='fr'>"+getNameLength(Math.round(objArr[i].hqcjje/10000*100)/100)+"万元</span>成交金额</li>";
					}
					if(objArr[i].xxlx=="T1"){//挂牌公司-创新层
						divSource5 +="<li><span class='fr'>"+objArr[i].xxsl+"家</span>挂牌公司</li>";
						divSource5 +="<li class='gray_li'><span class='fr'>"+getNameLength(Math.round(objArr[i].xxzgb/100000000*100)/100)+"亿股</span>总股本</li>";
						divSource5 +="<li><span  class='fr'>"+getNameLength(Math.round(objArr[i].xxfxsgb/100000000*100)/100)+"亿股</span>流通股本</li>";
						divSource5 +="<li class='gray_li'><span class='fr'>"+getNameLength(Math.round(objArr[i].hqcjsl/10000*100)/100)+"万股</span>成交股数</li>";
						divSource5 +="<li><span  class='fr'>"+getNameLength(Math.round(objArr[i].hqcjje/10000*100)/100)+"万元</span>成交金额</li>";
					}
					if(objArr[i].xxlx=="T0"){//挂牌公司-基础层
						divSource6 +="<li><span class='fr'>"+objArr[i].xxsl+"家</span>挂牌公司</li>";
						divSource6 +="<li class='gray_li'><span class='fr'>"+getNameLength(Math.round(objArr[i].xxzgb/100000000*100)/100)+"亿股</span>总股本</li>";
						divSource6 +="<li><span  class='fr'>"+getNameLength(Math.round(objArr[i].xxfxsgb/100000000*100)/100)+"亿股</span>流通股本</li>";
						divSource6 +="<li class='gray_li'><span class='fr'>"+getNameLength(Math.round(objArr[i].hqcjsl/10000*100)/100)+"万股</span>成交股数</li>";
						divSource6 +="<li><span  class='fr'>"+getNameLength(Math.round(objArr[i].hqcjje/10000*100)/100)+"万元</span>成交金额</li>";
					}
				}
				$("#market_list").append(divSource);
				$("#listingcompany").append(divSource1);
				$("#listingcompany1").append(divSource2);
				$("#listingcompany2").append(divSource3);
				$("#listingcompany3").append(divSource1);
				$("#listingcompany4").append(divSource5);
				$("#listingcompany5").append(divSource6);
				$("#delistcompany").append(divSource4);
			}
		}
	});
}

function ajaxGetCZDate(){
	var datatime=[];//日期
	var closeData=[];//收盘
	var dealTotalData=[];//成交量
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
					dealMoneyData[i] = objArr[i].cjje;
					updownData[i] = objArr[i].zd;
					upDownLimitData[i] = objArr[i].zdf;
					datakline[i]=[datatime[i],closeData[i]];
				}
			}
			//**********************图上小标题**********************
			var tdzdf=(closeData[closeData.length-1]-closeData[closeData.length-2])/closeData[closeData.length-2]*100;
			var tdhtml="";
			if(tdzdf!=0)
			{
				if(tdzdf>0)
				{
					tdhtml="<sapn style='color:red'>"+getNameLength(Math.round(tdzdf*100)/100)+"%</span>";
				}
				else
				{
					tdhtml="<sapn style='color:green'>"+getNameLength(Math.round(tdzdf*100)/100)+"%</sapn>";
				}
			}
			else
			{
				tdhtml="<sapn>"+getNameLength(Math.round(tdzdf*100)/100)+"%</sapn>";	
			}	
		
			$("#datazuixin1").html(getNameLength(Math.round(closeData[closeData.length-1]* 100) / 100)+"&nbsp;&nbsp;&nbsp;&nbsp;"+tdhtml+"&nbsp;&nbsp;&nbsp;&nbsp;"+"<span  style='color:black' >"+getMounthDay(datatime[datatime.length-1])+"</span>");
			//$("#sbczData").html("<i>"+getNameLength(Math.round(closeData[closeData.length-1]* 100) / 100)+"</i><br>成指<font class='gr'>"+tdhtml+"</font>");
			//**********************图上小标题**********************
			
			// 使用柱状图就加载bar模块，按需加载
			require(['echarts', 'echarts/chart/line', 'echarts/chart/bar'],
			function(ec) {
				var myChart2 = ec.init(document.getElementById('main2'));
				var option = {
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
						width : 220,
						height : 190,
						y : 15,
						x : 35
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
				        show : false,
				        realtime: true,
				        start :startValue,
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
						splitNumber : 0,// y轴分割段数
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
				myChart2.setOption(option);
			});
			
			
		}
	});
	
}

function ajaxGetMinDate() {
	var xMinuteKline = [];
	var yMinuteKlines = [];// 最新价
	var yMinuteKlines1 = [];// 昨日收盘
	var yMinuteKlines2 = [];// 成交量
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
		type : 'get',
		dataType : 'jsonp',
		cache : false,
		success : function(object) {
			var objArr = eval(object);
			if (objArr.length > 0) {
				for(var i=0;i<objArr.length;i++){
					var lastPrice;
					if(objArr[i]==null||objArr[i]==""){
						xMinuteKline[i] =objArr[0].JSRQ;
						//yMinuteKlines1 = objArr[0].zsp;
						yMinuteKlines2[i] = "";
						yMinuteKlines3[i] = "";
						yMinuteKlines[i] = lastPrice;
					}else{
						xMinuteKline[i]= objArr[0].JSRQ;
						//yMinuteKlines1 = objArr[0].zsp;
						yMinuteKlines2[i] = objArr[i].CJL;
						yMinuteKlines3[i] = objArr[i].CJJE;
						yMinuteKlines[i] = objArr[i].SSZS==null?objArr[0].ZRSP:objArr[i].SSZS;
						lastPrice = yMinuteKlines[i];
					}
				}
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
				
				//**********************图上小标题**********************
				var tdzdf=(yMinuteKlines[yMinuteKlines.length-1]-yMinuteKlines1[0])/yMinuteKlines1[0]*100;
				var tdhtml="";
				if(tdzdf!=0)
				{
					if(tdzdf>0)
					{
						tdhtml="<sapn style='color:red'>"+getNameLength(Math.round(tdzdf*100)/100)+"%</span>";
					}
					else
					{
						tdhtml="<sapn style='color:green'>"+getNameLength(Math.round(tdzdf*100)/100)+"%</sapn>";
					}
				}
				else
				{
					tdhtml="<sapn>"+getNameLength(Math.round(tdzdf*100)/100)+"%</sapn>";	
				}	
			
				$("#datazuixin").html(getNameLength(Math.round(yMinuteKlines[yMinuteKlines.length-1]* 100) / 100)+"&nbsp;&nbsp;&nbsp;&nbsp;"+tdhtml+"&nbsp;&nbsp;&nbsp;&nbsp;"+"<span  style='color:black' >"+(xMinuteKline[0])+"</span>");
				//$("#sbzsData").html("<i>"+getNameLength(Math.round(yMinuteKlines[yMinuteKlines.length-1]* 100) / 100)+"</i><br>做市<font class='gr'>"+tdhtml+"</font>");
				//**********************图上小标题**********************
				
				
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
				// 使用柱状图就加载模块，按需加载
				require(['echarts', 'echarts/chart/line', 'echarts/chart/bar'],
				function(ec) {
					var myChart1 = ec.init(document.getElementById('main1'));
					myChart1.setOption({
//					var option = {
						tooltip : {// 提示框，鼠标悬浮交互时的信息提示
							trigger : 'axis',
							showDelay : 0, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
							formatter : function(a) {
								var res = (xMinuteKline[0]) + " "
										+ a[0][1];// 拼接字符串
								if (isNaN(yMinuteKlines[a[0].dataIndex])) {
									res += "<br>最新价：0"
								} else {
									res += "<br>最新价:" 
											+ getNameLength(Math.round(yMinuteKlines[a[0].dataIndex]*100)/100)
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
											+ getNameLength(Math.round(yMinuteKlines2[a[0].dataIndex]/10000*100)/100)
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
							width : 220,
							height : 200,
							y : 15,
							x : 35
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
							splitNumber : 4,// y轴分割段数
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
						} ],
						series : [ {
							name : "最新价",
							type : "line",
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
		                       data: yMinuteKlines1 //数据不能为null
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
		                       data: []
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
		                       data: []
		                   } 
						
						]
					});
					// 为echarts对象加载数据
//					myChart1.setOption(option);
				});
			}
		}
	});
}

function getTransBuy(){
	$.ajax({
		url : 'http://www.neeq.com.cn/transactionController/indexListTrans.do',
		data:{
			transType : '0'
		},
		dataType : 'jsonp',
		success : function(result) {
			$("#buylist").empty();
			var sourceBuy= "";
			sourceBuy += "<table width='100%' border='0' cellspacing='0' cellpadding='0' class='zr_indexlist'>"
			sourceBuy += "<thead class='store'>"
			sourceBuy += "<th width='30%' class='tc'>简称</th>"
			sourceBuy += "<th width='30%' class='tc'>价格(元)</th>"
			sourceBuy += "<th width='40%' class='tc'>数量（股）</a></th>"
			sourceBuy += "</thead>"
			if (result != null && result.length > 0){
				for (var i=0; i<result.length;i++){
					 sourceBuy += "<tr>"
					 sourceBuy += "<td class='tc aunderline'><a href='/auth/detailTrans.do?id="+result[i].id+"' target='_blank'>"+result[i].stockname+"</a></td>"
					 sourceBuy += "<td>"+result[i].price.toFixed(2)+"</td>"
					 sourceBuy += "<td>"+showQuantity(result[i].quantity)+"</td>"
					 sourceBuy += "</tr>"
				}
				
				sourceBuy += "</table>";
			}
			$("#buylist").append(sourceBuy);
		}
	});
}

function getTransSale(){
	$.ajax({
		url : 'http://www.neeq.com.cn/transactionController/indexListTrans.do',
		data:{
			transType : '1'
		},
		dataType : 'jsonp',
		success : function(result) {
			$("#salelist").empty();
			var sourceSale= "";
			sourceSale += "<table width='100%' border='0' cellspacing='0' cellpadding='0' class='zr_indexlist'>"
			sourceSale += "<thead class='store'>"
			sourceSale += "<th width='30%' class='tc'>简称</th>"
			sourceSale += "<th width='30%' class='tc'>价格(元)</th>"
			sourceSale += "<th width='40%' class='tc'>数量（股）</a></th>"
			sourceSale += "</thead>"
			if (result != null && result.length > 0){
				for (var j=0; j<result.length;j++){
					 sourceSale += "<tr>"
					 sourceSale += "<td class='tc aunderline'><a href='/auth/detailTrans.do?id="+result[j].id+"' target='_blank'>"+result[j].stockname+"</a></td>"
					 sourceSale += "<td>"+result[j].price.toFixed(2)+"</td>"
					 sourceSale += "<td>"+showQuantity(result[j].quantity)+"</td>"
					 sourceSale += "</tr>"
				}
				sourceSale+= "</table>";
			}
			$("#salelist").append(sourceSale);
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

function getMounthDay(dateTime){
	if(dateTime==undefined){
		dateTime="";
	}
	var date = dateTime.toString();
	var strM;
	var strD;
	var strY;
	if(date.length<8){
		return date;
	}else{
		strY = date.substring(0,4);
		strM = date.substring(4,6);
		strD = date.substring(6,8);
		return strY+"-"+strM+"-"+strD;
	}
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

function ajaxGetListingWay(){
	var dates=[] ;
	var name = [];
	var qyzs;
	var jcc;
	var cxc;
	$.ajax({
		url : 'http://www.neeq.com.cn/nqxxController/qryCompanyTotal.do',
		type : 'POST',
		dataType : 'jsonp',
		success : function(object) {
			var objArr = eval(object);
			if (objArr.length > 0) {
				 for(var i=0;i<objArr.length;i++){
					 if(objArr[i].xxlx=="TT"||objArr[i].xxlx=="TM"){
						 if(objArr[i].xxlx=="TT"){
							 objArr[i].xxlx="协议方式"
						 }else if(objArr[i].xxlx=="TM"){
							 objArr[i].xxlx="做市方式"
						 }
						 var data = {};
						    data["name"] = objArr[i].xxlx;
						    data["value"] = objArr[i].xxsl;
						    dates.push(data);
						    name.push(objArr[i].xxlx);
						 }else if(objArr[i].xxlx=="T"){
							qyzs = objArr[i].xxsl
						 }else if(objArr[i].xxlx=="T0"){
							 jcc = objArr[i].xxsl
						 }else if(objArr[i].xxlx=="T1"){
							 cxc = objArr[i].xxsl
						 }
					 
				 }
				}
				// 使用柱状图就加载bar模块，按需加载
				require(['echarts', 'echarts/chart/pie'],

						
				function(ec) {
					var myChartMin = ec.init(document.getElementById('container3')); 
					var option = {
						    title : {
						        text:  '',
						        x:'center'
						    },
						    tooltip : {
						        trigger: 'item',
						        //formatter: "{a} <br/>{b} : {c} ({d}%)"
						    },
						    legend: {						    	
						        orient : 'vertical',
						        x : '40%',
						        y : '40%',
						        selectedMode : false,
						        formatter:function(name){
						        	for(var i=0;i<dates.length;i++){
						        		if(dates[i].name == name)
						        			return name + " : "+ dates[i].value;
						        	}
						        },
						        data:name
						    },
						    toolbox: {
						        show : false,
						        feature : {
						            mark : {show: true},
						            dataView : {show: true, readOnly: false},
						            magicType : {
						                show: true, 
						                type: ['pie', 'funnel'],
						                
						                option: {
						                    funnel: {
						                        x: '25%',
						                        width: '50%',
						                        funnelAlign: 'left',
						                        max: 1548
						                    }
						                }
						            },
						            restore : {show: false},
						            saveAsImage : {show: false}
						        }
						    },
						    color:['#5AC3B8','#CE2F24'], 
						    calculable : false,
						    series : [
						        {
						            type:'pie',
						            radius : '80%',
						            center: ['20%', '45%'],
						        	itemStyle : {
										normal : {
											label : {
						                        show : false
						                    },
						                    labelLine : {
						                        show : false
						                    }
										}
									},
									legend :{isSelected:false},
						            data:dates,
						        }]
						};
					// 为echarts对象加载数据
					myChartMin.setOption(option);
					
					$("#qyzs").html(qyzs);
					$("#jcc").html(jcc == null ? "0" : jcc);
					$("#cxc").html(cxc == null ? "0" : cxc);
					
					// 增长动画
					var steps = 100,timeInt = 15;
					var qyzsNum = new CountUp("qyzs",0,qyzs,0,(steps*timeInt / 1000),{
					});
						qyzsNum.start();
					var jccNum = new CountUp("jcc",0,jcc,0,(steps*timeInt / 1000),{
					});
						jccNum.start();
					var cxcNum = new CountUp("cxc",0,cxc,0,(steps*timeInt / 1000),{
					});
						cxcNum.start();
									
				});
			}
	});
}
