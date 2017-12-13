<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,height=device-height,inital-scale=1.0,maximum-scale=1.0,user-scalable=no;" />
<title>专题栏目-中国新三板股权投资平台_三个贝壳</title>
<link rel="stylesheet" href="{xiao:$site_template}/images/top.css">
<link rel="stylesheet" href="{xiao:$site_template}/images/zhuan.css">
<script type="text/javascript" src="{xiao:$site_template}/images/jquery-1.11.1.min.js"></script>
</head>
<body>
<!-- 头部开始-->
<div class="top">
  <div class="topic"><a href="http://www.touzitop.com/"><img src="{xiao:$site_template}/images/main_logo.png" alt=""></a></div>
  <form action="/index.php?c=index&a=search" method="post" style="display: -webkit-box;-webkit-box-flex: 1;">
  <div class="sou">
    <input type="hidden" name="mid" value="17" />
    <input type="hidden" name="dopost" value="search" />
    <input type="text" placeholder="请输入项目关键词"  name="q">
    <div class="spic"><button style="border:none;"><img src="{xiao:$site_template}/images/sou.png" alt=""></button></div>
  </div>
  </form>
</div>
<!-- 头部结束-->
<div class="content">
  <div class="hnav"><a  class="on1" href="list.php?tid=5">全部专题</a>  <a href="list.php?tid=42">项目专题</a>  <a href="list.php?tid=17">问答专题</a>  </div>
  <!-- 热门话题开始 -->
  <div class="hot1">
    <div class="hlist1">
      <div class="hitem1"> <a href="view.php?aid=4063"> <img src="{xiao:$site_template}/images/1-1f9121640540-l.jpg" alt="">
        <p>财富浪潮来袭，新三板独领风骚</p>
        <div class="ht"><span class="hlt">问答专题</span><span>2017-09-19</span></div>
        </a> </div><div class="hitem1"> <a href="view.php?aid=4036"> <img src="{xiao:$site_template}/images/1-1fz91434310-l.jpg" alt="">
        <p>转板暴利模式开启，抢占股权财富高地</p>
        <div class="ht"><span class="hlt">问答专题</span><span>2017-09-09</span></div>
        </a> </div><div class="hitem1"> <a href="view.php?aid=4010"> <img src="{xiao:$site_template}/images/1-1fzg339530-l.jpg" alt="">
        <p>新三板股权直投</p>
        <div class="ht"><span class="hlt">问答专题</span><span>2017-09-07</span></div>
        </a> </div><div class="hitem1"> <a href="view.php?aid=1362"> <img src="{xiao:$site_template}/images/1-1f401105ua19.jpg" alt="">
        <p>个人怎样购买新三板股权</p>
        <div class="ht"><span class="hlt">问答专题</span><span>2017-08-30</span></div>
        </a> </div><div class="hitem1"> <a href="view.php?aid=1785"> <img src="{xiao:$site_template}/images/1-1f412103s5351.jpg" alt="">
        <p>狙击新三板企业Pre-IPO</p>
        <div class="ht"><span class="hlt">问答专题</span><span>2017-08-30</span></div>
        </a> </div><div class="hitem1"> <a href="view.php?aid=1918"> <img src="{xiao:$site_template}/images/1-1f411163t30-l.jpg" alt="">
        <p>股权黄金时代来临</p>
        <div class="ht"><span class="hlt">问答专题</span><span>2017-08-30</span></div>
        </a> </div><div class="hitem1"> <a href="view.php?aid=2256"> <img src="{xiao:$site_template}/images/1-1f4191a5200-l.jpg" alt="">
        <p>股权投资铸就亿万富翁</p>
        <div class="ht"><span class="hlt">问答专题</span><span>2017-08-30</span></div>
        </a> </div><div class="hitem1"> <a href="view.php?aid=2916"> <img src="{xiao:$site_template}/images/1-1f60q545500-l.jpg" alt="">
        <p>得三板者得天下</p>
        <div class="ht"><span class="hlt">问答专题</span><span>2017-08-30</span></div>
        </a> </div>
    </div>
  </div>
  <!-- 热门话题结束 -->
  <!--翻页开始-->
  <div class="ye"><span class="ye_item">首页</span>
<span class="ye_item ser">1</span>
<span class="ye_item"><a href='/m/list.php?tid=5&TotalResult=24&PageNo=2'>2</a></span>
<span class="ye_item"><a href='/m/list.php?tid=5&TotalResult=24&PageNo=3'>3</a></span>
<span class="ye_item"><a href='/m/list.php?tid=5&TotalResult=24&PageNo=2'>下一页</a></span>
<span class="ye_item"><a href='/m/list.php?tid=5&TotalResult=24&PageNo=3'>末页</a></span>
</div>
  <!--翻页开始-->
</div>
<div class="footspace"></div>
{xiao:template footer.html}


<script>
$(document).ready(function()
   {
    //验证
    $('#light').submit(function ()
    {
        if($('#name').val()==""){
            $('#name').focus();
            alert("用户名不能为空！");
            return false;
        }
        if($('#phone').val()=="")
        {
            $('#phone').focus();
            alert("联系电话不能为空！");
            return false;
        }
		var myreg = /^1[34578]\d{9}$/;
		if(!myreg.test($("#phone").val()))
		{
   			alert('请输入有效的手机号码！');
    		return false;
		}
    })
});

window.onload = function(){

    var nowDate = new Date();

    var str = nowDate.getFullYear()+"-"+(nowDate.getMonth() + 1)+"-"+nowDate.getDate()+" "+nowDate.getHours()+":"+nowDate.getMinutes()+":"+nowDate.getSeconds();

    document.getElementById("time").value=str;

}

</script>

<link rel="stylesheet" href="{xiao:$site_template}/images/demo.css">
<div class="theme-popover" style="margin:0 0 0 0; left:0; width:100%;" id="light">
  <div class="theme-poptit"> <a href="javascript:void(0)" class="close" style="float:right;" onClick="document.getElementById('light').style.display='none';document.getElementById('fade').style.display='none'"> ×</a>
    <h3>在线预约</h3>
  </div>
  <div class="theme-popbod dform">
<form action="/plus/diy.php" enctype="multipart/form-data" method="post" class="theme-signin" name="loginform" id="complain">

      <input type="hidden" name="action" value="post" />

      <input type="hidden" name="diyid" value="1" />

      <input type="hidden" name="do" value="2" />

<input type="hidden" name="dede_fields" value="name,text;phone,text;time,text;source,text" />

<input type="hidden" name="dede_fieldshash" value="380d8623c254b3480204696bd657af73" />

<input type='hidden' name='source' id='source' style='width:250px'  class='intxt' value='' />

	<input type="hidden" name="time" id="time" value="">

      <ol>

        <li><strong>用户姓名：</strong>

          <input class="ipt" type="text" name='name' id='name'  size="20" placeholder="用户姓名" />

        </li>

        <li><strong>手机号码：</strong>

          <input class="ipt"  type='text' name='phone' id='phone' size="20" placeholder="手机号码" />

        </li>

        <li>

          <input class="btn btn-primary" type="submit" name="submit" value=" 提 交 " />

        </li>

      </ol>

    </form>
  </div>
</div>
<div id="fade"></div>



<script type="text/javascript" src="{xiao:$site_template}/images/yxmobileslider.js"></script>

<script>

    $(".slider").yxMobileSlider({width:640,height:320,during:3000})

  </script>



<script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1259857141'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s11.cnzz.com/z_stat.php%3Fid%3D1259857141%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));</script>

<script>
var _hmt = _hmt || []; (function() { var hm = document.createElement("script"); hm.src = "https://hm.baidu.com/hm.js?ea36b830b739c6ade4155fea78a729a9"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hm, s); })(); </script>
<script type="text/javascript" charset="utf-8" async src="{xiao:$site_template}/images/lxb.js"></script>


<script type='text/javascript'>
      var _vds = _vds || [];
      window._vds = _vds;
      (function(){
        _vds.push(['setAccountId', '82ed4b03f463ab9c']);
        (function() {
          var vds = document.createElement('script');
          vds.type='text/javascript';
          vds.async = true;
          vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(vds, s);
        })();
      })();
  </script>
</body>
</html>
