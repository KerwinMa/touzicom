<?php include $this->admin_tpl('header');?>

<script type="text/javascript">

    top.document.getElementById('position').innerHTML = '会员列表';

</script>

<style>
    .m-table td{
        width: 200px;
    }
</style>

<div class="subnav">

    <div class="content-menu">

        <a href=""   class="add" target="_blank"><em>项目访问报表</em></a>

        <?php if($this->menu('models-index')) { ;?>

            <a href="<?php echo url('member'); ?>"  class="on"><em>会员首页</em></a>

        <?php } ?>
        <select class="select" name="" id="" onchange="jump(options[selectedIndex].value)">
            <option value="0" <?php if(isset($d) && $d=='0'){echo 'selected';}?>>选择时间</option>
            <option value="1" <?php if(isset($d) && $d=='1'){echo 'selected';}?>>近1天</option>
            <option value="3" <?php if(isset($d) && $d=='3'){echo 'selected';}?>>近3天</option>
            <option value="5" <?php if(isset($d) && $d=='5'){echo 'selected';}?>>近5天</option>
        </select>



    </div>

    <div class="bk10"></div>

    <form action="" method="post" name="myform" id="myform">

        <input name="status" id="list_form" type="hidden" value="">

        <table width="100%"  class="m-table">

            <thead class="table-thead">

            <tr>

<!--                <td  align="left"><input name="deletec" id="deletec" type="checkbox" onclick="setC()"></td>-->

                <td align="left">ID </td>

                <td  align="left">项目名称</td>

                <td  align="left">URL</td>

                <td align="left">访问人次</td>



            </tr>

            </thead>

            <tbody >

            <?php if (is_array($list)) {foreach ($list as $t) {  ?>

                <tr >

<!--                    <td ><input name="member[]" value="--><?php //echo $t['id']; ?><!--"  type="checkbox" class="deletec"></td>-->

                    <td align="left"><?php echo $t['userid']; ?></td>
                    <td align="left"><?php echo $t['desc']; ?></td>

                    <td align="left"><a  target="_blank" href="<?php echo 'http://'.$t['url'];?>">详情链接</a></td>



                    <td align="left"><?php echo $t['seeNum'];?> <a href="<?php echo url('member/whosee',array('cid'=>$t['cid'])); ?>">详细</a>  </td>

                </tr>

            <?php } } ?>

            <tr >

                <td colspan="7" align="left" style="border-bottom:0px;">

                    <div class="pageleft">


                    </div>

                    <div class="pageright"><?php echo  $pagelist; ?></div>



                </td>

            </tr>

            </tbody>

        </table>

    </form>

</div>



</body>
<script>
    function jump(en){
        self.location='/admin/index.php?c=member&a=usertrade&d='+en;
    }
</script>

</html>