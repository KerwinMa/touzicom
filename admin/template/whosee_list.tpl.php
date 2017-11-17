<?php include $this->admin_tpl('header');?>

<script type="text/javascript">

    top.document.getElementById('position').innerHTML = '会员列表';

</script>



<div class="subnav">

    <div class="content-menu">


            <a href="../admin/index.php?c=member&a=usertrade"   class="add" ><em>访问报表</em></a>




    </div>

    <div class="bk10"></div>

    <form action="" method="post" name="myform" id="myform">

        <input name="status" id="list_form" type="hidden" value="">

        <table width="100%"  class="m-table">

            <thead class="table-thead">

            <tr>

                <th width="25" align="left"><input name="deletec" id="deletec" type="checkbox" onclick="setC()"></th>

                <th width="30" align="left">ID </th>

                <th width="100" align="left">项目名称</th>

                <th width="100" align="left">会员姓名</th>
                <th width="100" align="left">联系方式</th>
                <th width="100" align="left">注册时间</th>

                <th width="150" align="left">访问次数</th>
                <th width="150" align="left">刷新时间</th>



            </tr>

            </thead>

            <tbody >

            <?php if (is_array($list)) {foreach ($list as $t) {  ?>

                <tr >

                    <td ><input name="member[]" value="<?php echo $t['id']; ?>"  type="checkbox" class="deletec"></td>

                    <td align="left"><?php echo $t['userid']; ?></td>
                    <td align="left"><?php echo $t['desc']; ?></td>

                    <td align="left"><?php echo $t['username'];?></td>
                    <td align="left"><?php echo $t['tel'];?></td>
                    <td align="left"><?php echo $t['regdate'];?></td>
                    <td align="left"><?php echo $t['countNum'];?></td>
                    <td align="left"><?php echo date('Y-m-d H:i:s',$t['time']);?></td>

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

</html>