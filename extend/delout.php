<?php
    /*
     * 删除过期的行为记录分析 只保存近5天
     * ****/
    require_once('config.php');
    require_once('PDO.class.php');
    $db = MyPDO::getInstance(HOST, USERNAME, PASSWORD, DBNAME, 'utf8');

?>