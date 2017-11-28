<?php
$redis = new redis();
$redis->connect('127.0.0.1', 6379);
$res = $redis->hGet('user_location',192);
var_dump($res);
$res = $redis->hSet('user_location',192,time());
var_dump($res);
?>