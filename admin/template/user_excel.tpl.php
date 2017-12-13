<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>HTML5 Canvas折线图表和柱形图表DEMO演示</title>

    <script type="text/javascript" src="./jQuery.js"></script>
    <script type="text/javascript" src="./jqplot.js"></script>


</head>
<body>

<div id="chart1"></div>

<div style="text-align:center;clear:both;">
</div>

<div id="chart2"></div>

<script type="text/javascript">

    var data = [[11,6,5,12,11,6,7,5,11]];
    var data_max = 30; //Y轴最大刻度
    var line_title = ["A"]; //曲线名称
    var y_label = "用户数"; //Y轴标题
    var x_label = "日"; //X轴标题
    var x = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]; //定义X轴刻度值
    var title = "这是标题"; //统计图标标题
    j.jqplot.diagram.base("chart1", data, line_title, "这是统计标题", x, x_label, y_label, data_max, 1);
    //	j.jqplot.diagram.base("chart2", data, line_title, "这是统计标题", x, x_label, y_label, data_max, 2);

</script>
</body>
</html>

