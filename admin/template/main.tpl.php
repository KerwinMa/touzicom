<?php include $this->admin_tpl('header');?>

<script type="text/javascript">$(function(){$.getScript("<?php echo $client_url;?>");});</script>

<?php if(!is_file(DATA_DIR . 'cache' . DS."category.cache.php")) echo '<script type="text/javascript">location.href="'. url('index/cache') .'";</script>';?>



<script type="text/javascript">

$(function(){

	$.getScript("http://www.xiaocms.com/index.php?c=index&a=news");

	$.getScript("http://www.xiaocms.com/index.php?c=index&a=help");

}); 

</script>



<div class="subnav">

<div class="lf mr10" style="width:48%">

	<table width="100%"   class="m-table">

	<thead class="table-thead">

	<tr>

		<th align="left">授权信息</th>

	</tr>

	</thead>

	<tbody >

		<tr >

		<td align="left">当前域名：<?php echo $_SERVER['HTTP_HOST']?></td>

		</tr>

		<tr >

		<td align="left">授权信息：标准版</td>

		</tr>

		<tr >

		<td align="left">联系方式：<a href="#" style="cursor:pointer" onclick="javascript:window.open('http://wpa.qq.com/msgrd?v=3&uin=387662124&site=qq&menu=yes', '_blank', 'height=544, width=644,toolbar=no,scrollbars=no,menubar=no,status=no');"><img border="0" src="./img/qq.gif" alt="点击这里给我发消息" title="点击这里给我发消息"/> 387662124</a></td>

		</tr>

		<tr >

		<td align="left" style="border-bottom: 0px;">官方网站：<a target="_blank" href="#">www.touzitop.com</a></td>

		</tr>

		</tbody>

	</table>	

    <div class="bk10"></div>

	<table width="100%"   class="m-table">

	<thead class="table-thead">

	<tr>

		<th align="left">系统信息</th>

	</tr>

	</thead>

	<tbody >

		<tr >

		<td align="left">程序版本：<a href="http://www.shshizhi.com" target="_blank">第一股权网初版</a></td>

		</tr>

		<tr >

		<td align="left">发布日期：<a href="http://www.shshizhi.com" target="_blank">2017.7.1</a></td>

		</tr>

		<tr >

		<td align="left">上传限制：<?php echo $sysinfo['fileupload']?></td>

		</tr>

		<tr >

		<td align="left">运行环境：<?php echo $_SERVER['SERVER_SOFTWARE'];?></td>

		</tr>

		<tr >

		<td align="left" style="border-bottom: 0px;">mysql版本：<?php echo $this->db->getServerVersion()?></td>

		</tr>

		</tbody>

	</table>

</div>

 

</div>

</body>

</html>