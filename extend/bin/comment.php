<?php
/*
 * 自动评论
 * ****/
require_once('config.php');
require_once('PDO.class.php');
$db = MyPDO::getInstance(HOST, USERNAME, PASSWORD, DBNAME, 'utf8');
?>