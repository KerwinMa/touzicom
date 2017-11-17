
<!DOCTYPE html>
<html>
<head>
    <meta charset="gbk">
    <title>新三板 行情图</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="stylesheet" href="http://s.thsi.cn/cb?css/xsb/v2/css/;hq_charts.min.css&151204">
</head>
<body>
    <div class="main-content">

        <div class="hexm-price-box">
            <div class="hexm-left hexm-normal-box" id="hexm_curPrice_color">
                <p style="text-align: left;">
                    <span style="color: #191919" id="hexm_code_name">--</span>
                    <span id="hexm_curPrice" class="mar-l-6">--</span>
                    <span id="hexm_float_price" class="mar-l-6">--</span>
                    <span id="hexm_float_rate" class="mar-l-6">--%</span>
                </p>
            </div>

            <div class="hexm-suspension-box hexm-left" style="display:none">
                <p>停牌</p>
            </div>

        </div>

        <div class="hexm-hq-box" style="overflow: hidden;">
            <div style="position: absolute; top: -99px;" class="hexm-hq-tab">
                <ul>
                    <li class="active">
                        <a id="tj_fs" class='fsView' href="javascript:;">分时</a>
                    </li>
                    <li>
                        <a id="tj_dayK" class='klView' href="javascript:;" data-type='0'>日线</a>
                    </li>
                    <li>
                        <a id="tj_weekK" class='klView' href="javascript:;" data-type='1'>周线</a>
                    </li>
                    <li>
                        <a id="tj_monthK" class='klView' href="javascript:;" data-type='2'>月线</a>
                    </li>
                </ul>
            </div>
            <div id="hexmHqTable" class="hexm-hq-table">
                <div class="canvas-btn-box" style="display:none;">
                    <ul>
                        <li><a href="javascript:;" id="preEvent" style="display:none"></a></li>
                        <li><a href="javascript:;" id="nextEvent" style="display:none" ></a></li>
                        <li><a href="javascript:;" id="zoomInEvent" class="canvas-zoom-in"></a></li>
                        <li><a href="javascript:;" id="zoomOutEvent" class="canvas-zoom-out"></a></li>
                    </ul>
                </div>
                <div class="hexm-time-td">
                    <div id="canvasPanel" class="hexm-hq-canvas" style="overflow:visible;-webkit-transform: translateZ(0);width: 100%; height: 220px; position: relative;">
                        <canvas id="tcanvas" height="220"></canvas>
                    </div>
                </div>
                <div id="pkBox" class="hexm-tab-td">
                    <div class="hexm-wudang-wrap">
                        <ul class="hexm-tab-wudang">
                            <li class="active"><a href="javascript:;">五档</a></li>
                            <li><a style="border-right:none 0;" href="javascript:;">明细</a></li>
                        </ul>
                        <div class="hexm-tab-wudang-box-1">
                        </div>
                        <div class="hexm-tab-wudang-box-2">
                        </div>
                    </div>
                </div>
            </div>

            <!-- k线 -->
            <div class="hexm-hq-table" style="border:1px solid #ccc;height:212px;display:none;">

            </div>
        </div>


    </div>
    <script type="text/javascript" src="http://s.thsi.cn/cb?js/;jquery-1.11.3.min.js;xsb/v2/1.0.3/wapa.js;webHQ/resources/excanvas.min.js&160118" charset="utf-8"></script>
    <script type="text/javascript">
        window.onerror = function() {
            return true;
        }
        function checkVar(name, callback) {
            var timer = setInterval(function() {
                if (window[name]) {
                    clearInterval(timer);
                    callback();
                };
            }, 30);
        }
        function getQueryVariable(variable) {
            var url = window.location.href,
                tempArr,
                query = window.location.hash.substring(1),
                result = {};

            var vars = query.split("&");
            for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                result[pair[0]] = pair[1];
            }

            return result[variable];
        }

        var code = getQueryVariable('code');
        var type = getQueryVariable('type');
        checkVar('hx_hq_canvas', function() {
            hx_hq_canvas.initShow({
                code: code,
                drawType: type ||'kl'
            });
        });

    </script>

</body>
</html>
