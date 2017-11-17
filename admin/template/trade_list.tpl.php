<?php include $this->admin_tpl('header');?>

<script type="text/javascript">

    top.document.getElementById('position').innerHTML = '会员列表';

</script>



<div class="subnav">

    <div class="content-menu">



    </div>

    <div class="bk10"></div>

    <form action="" method="post" name="myform" id="myform">

        <input name="status" id="list_form" type="hidden" value="">

        <table width="100%"  class="m-table">

            <thead class="table-thead">

            <tr>

                <th width="25" align="left"><input name="deletec" id="deletec" type="checkbox" onclick="setC()"></th>

                <th width="30" align="left">ID </th>

                <th align="left">用户名</th>

                <th width="100" align="left">URL</th>

                <th width="150" align="left">访问IP</th>

                <th width="120" align="left">刷新时间</th>

                <th  width="150" align="left">次数</th>

            </tr>

            </thead>

            <tbody >

            <?php if (is_array($list)) {foreach ($list as $t) {  ?>

                <tr >

                    <td ><input name="member[]" value="<?php echo $t['id']; ?>"  type="checkbox" class="deletec"></td>

                    <td align="left"><?php echo $t['id']; ?></td>
                    <td align="left"><?php echo $t['userid']; ?></td>

                    <td align="left"><a  target="_blank" href="<?php echo 'http://'.$t['url'];?>"><?php echo $t['url'];?></a></td>

                    <td align="left"><?php echo $t['ip']; ?></td>

                    <td align="left"><?php echo date('Y-m-d H:i:s', $t['time']); ?></td>

                    <td align="left"><?php echo $t['countNum'];?></td>

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