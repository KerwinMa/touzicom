<!DOCTYPE html>

<html>

<head>

<meta charset="utf-8">

<title>提示信息</title>

<link type="text/css" rel="stylesheet" href="<?php echo SITE_PATH; ?>core/img/message/xiaocms.css"/>
<style> 
.tips_bd p{ width: 200px; margin: 0 auto;}
</style>
</head>

<body>

<div class="box_border" <?php if ($status==1){ ?>id="right" <?php }else{?> id="wrong" <?php } ?>>

  <div class="content">

     <h1><?php echo $msg; ?></h1>

    <p>

	<?php if($url==1){ ?>

	<a href="javascript:history.back();" >如果您的浏览器没有自动跳转，请点击这里</a>

	<script language="javascript">setTimeout(function(){history.back();}, 10000);</script>

	<?php } else{?>

	<a href="<?php echo $url?>">如果您的浏览器没有自动跳转，请点击这里</a>

	<script language="javascript">setTimeout("location.href='<?php echo $url; ?>';", 10000);</script>   

	<?php } ?>

	</p>

  </div>

</div>
<div class="tips_bd"> 

          <em class="arrow"></em> 

          <img class="fl" src="/template/san/images/wx_jfz_zx_d.jpg" alt="" width="150"> 
<p>扫一扫关注<br>
    实时了解新三板<br>

         </div>
</body>

</html>