// JavaScript Document

//焦点图切换
function Banner(obj){	
	var oBanner=$(obj);
	var aUl=oBanner.find("ul");
	var aOl=oBanner.find("ol");
	var aPrev=oBanner.find(".prev");
	var aNext=oBanner.find(".next");
	var iNum=0;		
//	var timer=null;
	
	aUl.find("li").hide();
	aUl.find("li:first").show().css("opacity",1);
	aOl.find("li").click(function(){
		iNum = $(this).index();
		Bannertab();
	});
	
	//自动播放
	oBanner.timer=setInterval(function()
	{
		iNum++;
		if(iNum==aOl.find("li").length)
		{
			iNum=0;
		}
		Bannertab();
	},(3000));
	
	
	//左点
	aPrev.click(function(){
		iNum--;
		if(iNum<0){
			iNum=aOl.find("li").length-1;
		}
		Bannertab();
	});
	
	//右点
	aNext.click(function(){
		iNum++;
		if(iNum>=aOl.find("li").length){
			iNum=0;
		}
		Bannertab();
	});
	
	//鼠标移上
	oBanner.mouseover(function(){
		clearInterval(oBanner.timer);
		oBanner.find("p").find("span").stop().fadeIn("slow").show();
	});
	
	//鼠标移开
	oBanner.mouseout(function(){
		oBanner.find("p").find("span").stop().fadeOut("slow").hide();
		oBanner.timer=setInterval(function()
		{
			iNum++;
			if(iNum==aOl.find("li").length)
			{
				iNum=0;
			}
			Bannertab();
		},(3000));
	});
	
	
	function Bannertab(){
		aOl.find("li").removeClass("on");
		aOl.find("li").eq(iNum).addClass("on");
		aUl.find("li").stop().animate({opacity:0},"slow").hide();
		aUl.find("li").eq(iNum).show().stop().animate({opacity:1},"slow");
	}	
}

//图片新闻切换
function Mantle(obj){	
	var oMantle=$(obj);
	var oPrev=oMantle.find(".prev");
	var oNext=oMantle.find(".next");
	var oUl=oMantle.find("ul");
	var oFistLih=oUl.find("li:first").outerWidth(true);
	var oUlh=oFistLih*oUl.find("li").length;
	var onOff = true;
//	var timer=null;
	
	oUl.css("width",oUlh);
	
	//自动播放
	oMantle.timer=setInterval(function(){
		fnScroll(1);
	},3000);
	
	//下一个
	oNext.click(function(){
		if(!onOff)return;
		fnScroll(1);
	});
	
	//上一个
	oPrev.click(function(){	
		if(!onOff)return;
		fnScroll(2);
	});
	
	//鼠标移上停止播放
	oMantle.mouseover(function(){
		clearInterval(oMantle.timer);
	});
	//鼠标移出继续播放
	oMantle.mouseout(function(){
		clearInterval(oMantle.timer);
		oMantle.timer=setInterval(function(){
			fnScroll(1);
		},3000);
	});
	
	function fnScroll(dir){		
		onOff = false;
		if(oUl.find("li").length<=5){
			clearInterval(oMantle.timer);
		}
		if(dir==1){
			oUl.css("left",0).stop().animate({left:-oFistLih+"px"},"slow",function(){
				oUl.find("li:first").appendTo(oUl);
				$(this).css({'left':'0'});
				onOff = true;
			});
		}
		if(dir==2){
			oUl.find("li:last").prependTo(oUl);
			oUl.css("left",-oFistLih).stop().animate({left:0},"slow",function(){onOff = true;});
		}
	}
}

//input获得焦点
$.fn.extend({
	oInput:function(){
		var defaults={
			oInput:".input"
		};
		var options= $.extend(defaults,options);
		this.each(function(){
			var That=$(this);
			var Mantle={
				oInput:That,
				init:function(){
					this.clickfn();
				},
				clickfn:function(){
					var That=this;
					var state=false;
					var oTxt=null;
					That.oInput.bind("focus",function(){
						if(!state){
							oTxt=$(this).val();
							state=true;
						}
						if($(this).val()==oTxt){
							$(this).val("");
							$(this).css("color","#000000");
						}
						$(this).blur(function(){
							if($(this).val()==""){
								$(this).val(oTxt);
								$(this).css("color","#000000");
							}	
						});
					});
				}
			};
			Mantle.init();
		});
	}	
});


//切换
function oTab(obj,oTab,oList){
	var oBj=$(obj);
	var aTab=oBj.find(oTab);
	var aList=oBj.find(oList);
	aList.eq(0).css("display","block");
	
	aTab.find("li").click(function(){
		aTab.find("li").removeClass("cur");
		$(this).addClass("cur");
		aList.css("display","none");
		aList.eq($(this).index()).fadeIn(1);
		//aList.eq($(this).index()).fadeIn("fast");
		aList.eq($(this).index()).css("display","block");
	});
}


//搜索切换
function oSearch(obj,oTab,oList){
	var oBj=$(obj);
	var aTab=oBj.find(oTab);
	var aList=oBj.find(oList);
	aList.eq(0).css("display","block");
	aTab.find("li").click(function(){
		aTab.find("li").removeClass("cur");
		$(this).addClass("cur");
		aList.css("display","none");
		//aList.eq($(this).index()).fadeIn("slow");
		aList.eq($(this).index()).css("display","block");
	});
}

//市场总貌点击切换
function dropDownClick(obj){
	var oSummary=$(obj);
	var oDl=oSummary.find("dl");
	var oDt=oSummary.find("dt");
	var oDD=oSummary.find("dd");

	oDD.each(function (i, item) {
		var aTab = $(item).find('.tab');
		var aList = $(item).find('.cont')
		aTab.find("li").click(function(){
			aTab.find("li").removeClass("cur");
			$(this).addClass("cur");
			aList.css("display","none");
			aList.eq($(this).index()).fadeIn("fast");
			aList.eq($(this).index()).css("display","inline");
		});
		aList.eq(0).css("display","block");
	});
	
	oDD.find(".cont").find("li:odd").addClass("gray");
	oDl.eq(0).css("height","auto");


}

//最新消息
function News(obj){
	/*var Odiv = $(obj);
	//var Oul  = Odiv.find("ul");
	var timer = null;
	var oulW=0;
	var speed=1;
	//Oul.html(Oul.html()+Oul.html())
	//Oul.find("li").each(function(i) {
        oulW+=Oul.find("li").eq(i).width();
    });
	//Oul.css("width",oulW)	
	Oul.timer = setInterval(function(){
		move();
	},30);
	
	Oul.mouseover(function(){
		clearInterval(Oul.timer);
	});
	Oul.mouseout(function(){
		Oul.timer = setInterval(function(){
			move()	
		},30)
	});
	
	function move(){
		Oul.css("left",Oul.position().left-speed+"px");
		if(Oul.position().left<=-Oul.width()/2){
			Oul.css("left","0");
		}	
	}*/
}

//合作银行及服务向上滚动
function coopBank(obj){	
	var oMantle=$(obj);
	var oUl=oMantle.find("ul");
	var oFistLih=oUl.find("li:first").outerHeight(true);
	var oUlh=oFistLih*oUl.find("li").length;
//	var onOff = true;
//	var timer=null;
	
	oUl.css("width",oUlh);
	
	//自动播放
	oMantle.timer=setInterval(function(){
		fnScroll(1);
	},2000);
	
	
	//鼠标移上停止播放
	oMantle.mouseover(function(){
		clearInterval(oMantle.timer);
	});
	//鼠标移出继续播放
	oMantle.mouseout(function(){
		clearInterval(oMantle.timer);
		oMantle.timer=setInterval(function(){
			fnScroll(1);
		},2000);
	});
	
	function fnScroll(dir){		
		onOff = false;
		if(dir==1){
			oUl.css("top",0).stop().animate({top:-oFistLih+"px"},"slow",function(){
				oUl.find("li:first").appendTo(oUl);
				$(this).css({'top':'0'});
				onOff = true;
			});
		}
	}
}

//导航
function Menu(obj){
	var oCh=$(obj);
	var oLi=oCh.children();
	oLi.mouseover(function(){
		oLi.removeClass("cur");
		var subnavH=$(this).find("ul").children().eq(0).height()*$(this).find("ul").children().length;
		$(this).addClass("cur");
		$(this).find("ul").stop().animate({height:subnavH},"fast");		
	});
	oLi.mouseout(function(){
		$(this).removeClass("cur");
		$(this).find("ul").stop().animate({height:0},"fast");
	});
	
}

//悬浮
function FloatMove(obj){
	var oShowBox=$(obj);
	var oShowBoxH=oShowBox.find(".fr_share").outerHeight()+oShowBox.find(".important").outerHeight();
	oShowBox.css("height",oShowBoxH);
	var scrollTop=$(document).scrollTop();
	var t=scrollTop+($(window).height()-oShowBoxH)/2;
	oShowBox.stop().animate({"top":t},0);
}

//重要通知
function Important(obj){
	var oShowBox=$(obj);
	var aImportant= oShowBox.find(".important");
	var aNewnews=oShowBox.find(".newnews");
	var aCont=aNewnews.find(".cont");
	var aClose=aCont.find(".close1");
	var aContW=aCont.outerWidth();
	var aContH=aCont.outerHeight();
	aImportant.click(function(){
		$(this).css("display","none");
		aNewnews.css("height",aContH);
		aNewnews.stop().animate({"width":aContW},"slow");
		setTimeout(function(){
			aNewnews.stop().animate({"width":0},"slow");
			aImportant.css("display","block");
			$("#hie").css("display","");
		},10000);
	});
	aClose.click(function(){
		aNewnews.stop().animate({"width":0},"slow");
		aImportant.css("display","block");
		$("#hie").css("display","block");
	});
}

//重要通知默认展示
function showImportant(){
	var oShowBox=$(".floatmove");
	var aImportant= oShowBox.find(".important");
	var aNewnews=oShowBox.find(".newnews");
	var aCont=aNewnews.find(".cont");
//	var aClose=aCont.find(".close1");
	var aContW=aCont.outerWidth();
	var aContH=aCont.outerHeight();
	$(aImportant).css("display","none");
	$("#hie").css("display","none");
	aNewnews.css("height",aContH);
	aNewnews.stop().animate({"width":aContW},"slow");
	setTimeout(function(){
		aNewnews.stop().animate({"width":0},"slow");
		aImportant.css("display","block");
		$("#hie").css("display","");
	},10000);
}

//悬浮分享
function FengX(obj){
	var oShowBox=$(obj);
	oShowBox.find("li").mouseover(function(){
		oShowBox.find("li").removeClass("cur");
		$(this).addClass("cur");
		//鼠标悬浮的时候，将图片换成分享大图
		var lsrc = $(this).find("img").attr("src");
		lsrc = lsrc.replace("fx1_1.png", "wixin.jpg");
		lsrc = lsrc.replace("fx2_2.png", "weibo.jpg");
		$(this).find("img").attr("src", lsrc);
		$(this).find("img").css("z-index",12);
		$(this).find("img").stop().animate({"width":150,"height":150,"bottom":-50},"fast");
	});
	oShowBox.find("li").mouseout(function(){
		oShowBox.find("li").removeClass("cur");
		var lsrc = $(this).find("img").attr("src");
		lsrc = lsrc.replace("wixin.jpg", "fx1_1.png");
		lsrc = lsrc.replace("weibo.jpg", "fx2_2.png");
		$(this).find("img").attr("src", lsrc);
		$(this).find("img").css("z-index",11);
		$(this).find("img").stop().animate({"width":34,"height":34,"bottom":20},"fast");
	});
}


//模似select下框列表框
$.fn.extend({
	Select:function(options){
		var defaults={
			oSelect:".select",
			oP:"input",
			oUl:"ul"
		};
		
		var options= $.extend(defaults,options);
		this.each(function(){
			var That=$(this);
			var Mantle={
				oSelect:That,
				oP:That.find(options.oP),
				oUl:That.find(options.oUl),
				init:function(){
					this.clickfn();
				},
				clickfn:function(){
					var _This=this;
					_This.oSelect.bind("click",function(){
//						var This=$(this);
						$(options.oSelect).find(options.oUl).css("display","none");
						_This.oUl.css("display","block");
						_This.oUl.find("li").click(function(event){
							var v = $(this).find("option").attr("value");
							_This.oP.html($(this).text());
							$("#typeId").val(v);
							$(options.oSelect).find(options.oUl).css("display","none");
							event.stopPropagation();
						});
						
						$(document).click(function(){
						$(options.oSelect).find(options.oUl).css("display","none");
						//$(document).off();
						});
						return false;
					});
					
				}
			};
			
			Mantle.init();	
		});
	}
});



//弹出层	
$.fn.extend({
	popBox:function(options){
		var defaults={
			oPop:".pop",
			oClose:".close",
			oBtn:".add"
		};
		var options= $.extend(defaults,options);
		this.each(function(){
			var That=$(this);
			var Mantle={
				oPop:That,
				oClose:That.find(options.oClose),
				oBtn:$(options.oBtn),
				
				init:function(){
					this.btnClick();
					this.closeClick();
					this.Position();
					//this.oStartMove();
				},
				btnClick:function(){
					var That = this;
					That.oBtn.bind("click",function(){
						var popbgW=$(document).width()+$(window).scrollLeft();
						var popbgH=$(document).height()+$(window).scrollTop();
						$(".popbg").css({"width":popbgW,"height":popbgH});
						
						That.oPop.css("display","block");
						$(".popbg").css({"display":"block"});
						if(That.oBtn.parents(".modpop")!=null){
							That.oBtn.parents(".modpop").css("display","none");
						}
						That.Position();
					});
				},
				closeClick:function(){
					var That = this;
					That.oClose.bind("click",function(){
						That.oPop.css("display","none");
						$(".popbg").css({"z-index":"98","display":"none"});	
					});
				},
				Position:function(){
					var iw=$(window).width()/2-this.oPop.outerWidth()/2+$(window).scrollLeft();
					var ih=$(window).height()/2-this.oPop.outerHeight()/2+$(window).scrollTop();
					
					if(ih<=0){ih=0;};
					this.oPop.css({top:ih,left:iw});
				},
				oStartMove:function(){
					var That = this;
					That.oPop.bind("mousedown",function(e){	
//						var ih=That.oPop.offset().top;
//						var iw=That.oPop.offset().left;
						var disY = e.pageY -$(this).get(0).offsetTop;
						var disX = e.pageX -$(this).get(0).offsetLeft;
						
//						var pageW=$(window).width()+$(window).scrollLeft();
						var pageH=$(window).height()+$(window).scrollTop();
						
						$(document).mousemove(function(e){
							var T= e.pageY-disY;
							var L= e.pageX-disX;
							if(T<=0){
								T=0;
							}
							if(T>=pageH-That.oPop.outerHeight()){
								T=pageH-That.oPop.outerHeight();
							}
							if(L<=0){
								L=0;	
							}
							if(L>=$(window).width()-That.oPop.outerWidth()){
								L=$(window).width()-That.oPop.outerWidth();
							}
							
							That.oPop.css({top:T,left:L});
						});
						
						$(document).mouseup(function(){
							$(document).off();
						});
						return false;
					});
				}
				

			};
			
			Mantle.init();
			$(window).bind("resize",function(){
				Mantle.Position();
			});
			
		});
	}
	
});

//审核信息公开表格变色
function trChangColor(){
	var oTr = $(".publicinfo").find("tr");
//	var oRemark = $(".publicinfo").find(".remark");
	oTr.on("mouseover",function(){
		oTr.removeClass("cur");
		$(this).addClass("cur");
	});
}

//获取当前的登录状态（此方法已作废）
function getLoginState(service){
	$.ajax({
		url : "/sign/info.do",
		type : "post",
		dataType : 'jsonp',
		async : false,
		success : function(data){
			if(data[0].result == false){
				top.location.href="/login.html?service=" + service;
			}
		}
	});	
}

//获取用户对象（此方法已作废）
function getLoginUser(){
	var result = null;
	$.ajax({
		url : "/sign/info.do",
		type : "post",
		dataType : 'jsonp',
		async : false,
		success : function(data){
			if(data[0].result == true){
				result =  data[0].data;
			}
		}
	});
	return result;
}

function clearInput() {
	$("input").each(function() {
		if ($(this).attr("type") != "hidden") {
			$(this).val("");
		}
	});
}

//获取地址栏中的参数值，提取公共方法
function getQueryString(name) {
	  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	  var param = decodeURI(window.location.search);
	  var r = param.substr(1).match(reg);
	  if (r != null) return unescape(r[2]); return null;
}

//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
function banBackSpace(e){ 
	 var ev = e || window.event;//获取event对象 
	 var obj = ev.target || ev.srcElement;//获取事件源 
	 var t = obj.type || obj.getAttribute('type');//获取事件源类型 
	 //获取作为判断条件的事件类型
	 var vReadOnly = obj.getAttribute('readonly');
	 //处理null值情况
	 vReadOnly = (vReadOnly == "") ? false : vReadOnly;
	 //当敲Backspace键时，事件源类型为密码或单行、多行文本的，
	 //并且readonly属性为true或enabled属性为false的，则退格键失效
	 var flag1=(ev.keyCode == 8 && (t=="text" || t=="textarea")&& vReadOnly=="readonly") ? true : false;
	 //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
	 var flag2=(ev.keyCode == 8 && t != "text" && t != "textarea") ? true : false;  
	 //判断
	 if(flag2){
		 return false;
	 }
	 if(flag1){ 
	     return false; 
	 } 
}

function getQueryParam(){
	var param = decodeURI(window.location.href);
	var r = param.substring(param.lastIndexOf("/")+1,param.lastIndexOf("."));
	return r;
}


//获取当前url的域名和端口号
function getHost(){
	var url = top.location.protocol + "//" + top.location.host;
	return url;
}

//判断值是否为空
function isExsist(key){
	if(key == "" || typeof(key) == "undefined" || key == null){
		return false;
	} else {
		return true;
	}
}

//返回顶部
var ScrollToTop = ScrollToTop || {
	setup:function() {						
		var a = $(window).height()/2;
		$(window).scroll(function(){(window.innerWidth?window.pageYOffset:document.documentElement.scrollTop) >= a
			? $("#ScrollToTop").removeClass("Offscreen"): $("#ScrollToTop").addClass("Offscreen");});
		$("#ScrollToTop").click(function(){
			$("html, body").animate({scrollTop: "0px"}, 400);
			return false;
		});
	}
};
						
				 			   
//打印页面
function printpage() { 
	window.print();
}

// 函数调用-------
$(function(){
	
	//导航
	Menu("#nav");
	
	//焦点图切换
	Banner("#banner");	
	
	//图片新闻切换
	Mantle("#showpic");
	
	//搜索切换
	oSearch(".search",".tab",".cont");
	
	//信息披露切换
	oTab(".reveal",".tab",".list");
	
	//服务专区切换
	oTab(".service",".tab",".picture");
	
	//三板成指切换
	oTab(".thethird",".tab",".cont");
	
	//转让意向
	oTab(".trans",".tab",".cont");

	//友情链接切换
	oTab(".friendlink",".tab",".cont");
	
	//input获得焦点
	$(".input").oInput({
		oInput:".input"
	});	
	
	//市场总貌点击切换
	dropDownClick(".market");
	
	//最新消息
//	News("#news");

	//合作银行及服务向上滚动
//	coopBank("#coopbank");
	
	//悬浮
	FloatMove(".floatmove");
	
	//分享
	FengX(".floatmove");
	Important(".floatmove");
	
	$(window).bind("scroll",function(){
		FloatMove(".floatmove");
	});
	
	//模似select下框列表框
	$(".select").Select({
		oSelect:".select",
		oP:"p",
		oUl:"ul"
	});
	
	//公司公告切换
	oTab(".affiche",".tab",".modlist");
	
	//活动详情（结束后）
	oTab(".affiche",".tab",".eventdel");
	
	//公司资讯
//	oTab(".affiche",".minitab",".list_l");
	
	//弹出层
	$(".pop").popBox({
		oPop:"pop",
		oClose:".close",
		oBtn:".popbtn"
	});
	
});

/**
 * 百度统计
 */
var _hmt = _hmt || [];
(function() {
	var hm = document.createElement("script");
	hm.src = "//hm.baidu.com/hm.js?b58fe8237d8d72ce286e1dbd2fc8308c";
	var s = document.getElementsByTagName("script")[0]; 
	s.parentNode.insertBefore(hm, s);
})();
