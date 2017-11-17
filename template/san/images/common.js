$(function(){
	var ht=$(window).height();
	$("#nav li").click(function(){
		$(this).addClass("selected").siblings().removeClass("selected");
		var link=$(this).attr("link");
		setTimeout(function(){
			location=link;
		},300);	
	});
	var href=window.location;
	href=href+"";
	if(href.indexOf("index")>0){
		$(".navBar li").eq(3).addClass("choose");
	}else if(href.indexOf("category-OV")>0){
		$(".navBar li").eq(1).addClass("choose");
	}else if(href.indexOf("category-IN")>0){
		$(".navBar li").eq(2).addClass("choose");
	}else if(href.indexOf("category-FMS")>0){
		$(".navBar li").eq(0).addClass("choose");
	}
	var lodingHtml="<p id='loding'><span></span><i></i></p><p id='loding-h5'><span></span><i></i></p>";
	$("body").append(lodingHtml);
	window.onbeforeunload = lodingshow;
	window.onunload = lodingshowx;
	function lodingshow(){
		if($(window).width()<800){
			$("#loding-h5").show();
		}else{
			$("#loding").show();
		}
		setTimeout(function()
		{
			$("#loding").hide();
		},3000);
	}
	function lodingshowx(){
		if($(window).width()<800){
			$("#loding-h5").show();
		}else{
			$("#loding").show();
		}
		setTimeout(function()
		{
			$("#loding").hide();
		},3000);
	}
	var on=Geturlkye("on");
	if(on){
		if(on=="app"){
			$("#logoBar .logo,#footer,#headNav").hide();
			$(".main").css({"padding-top":"0.4rem"});
			$(".sel-title").css({"top":"0.4rem"});
			$(".detailmain").css({"padding-top":"0"});
			$("#loding-h5 span").css({"top":"0"});
			/*$("#ArticleType").click(function(){
				return false;
			});*/
			$("#loding-h5").remove();
		}	
	}
	setTimeout(function(){
		/*$("#loding-h5,#loding-h5 span").animate({top:ht,opacity:0},500);
		$("#loding-h5 i").animate({top:ht*1.5+"px",opacity:0},500);	*/
		$("#loding-h5,#loding-h5 span").fadeOut(500);
		$("#loding-h5 i").fadeOut(500);
	},500);
	
	setTimeout(function(){
		$("#loding-h5").hide();
	},900);
	
});

function Geturlkye(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
function ellipsis(val,number){
	var maxwidth=number;  
	var text=val;
	if(text.length>maxwidth)
	{   
		text=text.substring(0,maxwidth);
		text=text+'...';  
	} 
	return text;
}

/*公用翻页HTML*/
function pageHtml(MaxLength,PageLength,Epage,Fn){ //MaxLength = 最大条目数，PageLength = 每页多少条，Epage = 当前第几页，Fn = 点击后执行的方法
	if(MaxLength>0){
		var pagelist=parseInt(MaxLength/PageLength);
		if(MaxLength%PageLength!=0){
			pagelist=parseInt(pagelist)+1;
		}
		var pageHtml='';
		var pagea='';
		var pageb='';
		var backhtml='';
		var nexthtml='';
		Epage=Number(Epage);
		if(pagelist>0){
			if(Epage>1 && Fn){
				var b=Epage-1;
				var e=Fn+'('+b+')';
				backhtml="<span onclick='"+e+"'>上一页</span>";
			}else{
				backhtml="<em>上一页</em>";
			}
			if(Epage<pagelist && Fn){
				var n=Epage+1;
				var e=Fn+'('+n+')';
				nexthtml="<span onclick='"+e+"'>下一页</span>";
			}else{
				nexthtml="<em>下一页</em>";
			}
			if(pagelist<10){
				if(pagelist==1){
					pagea+="<b>1</b>";
				}else{
					for(var x=1;x<pagelist+1;x++){
						if(x==Epage){
							pagea+="<b>"+x+"</b>";	
						}else if(Fn){
							var e=Fn+'('+x+')';
							pagea+="<a onclick='"+e+"'>"+x+"</a>";
						}else{
							pagea+="<a>"+x+"</a>";	
						}
					}
				}	
			}else{
				if(Epage<6){
					for(var x=1;x<8;x++){
						if(x==Epage){
							pagea+="<b>"+x+"</b>";	
						}else if(Fn){
							var e=Fn+'('+x+')';
							pagea+="<a onclick='"+e+"'>"+x+"</a>";
						}else{
							pagea+="<a>"+x+"</a>";	
						}
					}
					if(Fn){
						var t=Fn+'('+pagelist+')';
						var pagelt="<a>...</a><a onclick='"+t+"'>"+pagelist+"</a>";
					}else{
						var pagelt="<a>...</a><a>"+pagelist+"</a>";
					}
					pagea=pagea+pagelt;
				}else if(pagelist-Epage >= 6){
					var pl=Epage+4;
					var pt=Epage-3;
					for(var x=Epage;x<pl;x++){
						if(x==Epage){
							pagea+="<b>"+x+"</b>";	
						}else if(Fn){
							var e=Fn+'('+x+')';
							pagea+="<a onclick='"+e+"'>"+x+"</a>";
						}else{
							pagea+="<a>"+x+"</a>";
						}
					}
					for(var x=pt;x<Epage;x++){
						if(Fn){
							var e=Fn+'('+x+')';
							pageb+="<a onclick='"+e+"'>"+x+"</a>";
						}else{
							pageb+="<a>"+x+"</a>";
						}
					}
					if(Fn){
						var t=Fn+'('+pagelist+')';
						var pagelt="<a>...</a><a onclick='"+t+"'>"+pagelist+"</a>";
						var w=Fn+'(1)';
						var pagetp="<a onclick='"+w+"'>1</a><a>...</a>";
					}else{
						var pagelt="<a>...</a><a>"+pagelist+"</a>";
						var pagetp="<a>1</a><a>...</a>";
					}
					pagea=pagetp+pageb+pagea+pagelt;
				}else{
					var pt=Epage-3;
					for(var x=pt;x<=pagelist;x++){
						if(x==Epage){
							pagea+="<b>"+x+"</b>";	
						}else if(Fn){
							var e=Fn+'('+x+')';
							pagea+="<a onclick='"+e+"'>"+x+"</a>";
						}else{
							pagea+="<a>"+x+"</a>";
						}
					}
					if(Fn){
						var w=Fn+'(1)';
						var pagetp="<a onclick='"+w+"'>1</a><a>...</a>";
					}else{
						var pagetp="<a>1</a><a>...</a>";
					}
					pagea=pagetp+pagea;
				}
			}
		}
	}else{
		pageHtml='';
	}
	pageHtml=backhtml+pagea+nexthtml;
	return pageHtml;
}
