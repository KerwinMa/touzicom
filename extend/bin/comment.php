<?php
/*
 * 自动评论
 * ****/
require_once('../config.php');
require_once('../PDO.class.php');
$db = MyPDO::getInstance(HOST, USERNAME, PASSWORD, DBNAME, 'utf8');
$comment_list = array(
    '定增票相对来说安全点，第一股权网实力不错',
    '没有账户也可以买吗',
    '价格有点高，网站不错',
    '客服推荐的。，还可以。不错。',
    '不错哦，项目很好，业务员很细心',
    '网站内容很丰富，客服服务很细致确实比较专业就在这买了',
    '讲解细服务专业；谢谢',
    '回报率怎么样',
    '这个还可以',
    '网站资料不错，挺齐全专业的',
);
$id = [];
$res = $db->query("select id from xiao_content where modelid=6 order by id DESC limit 0,100");
foreach($res as $val){
    $id[] = $val['id'];
}
$key = array_rand($id,50);

foreach($key as $val){
    $cid = $id[$val];
    $comment = array(
        'cid'=>$cid,
        'pinglunneirong'=>$comment_list[rand(0,9)],
        'userid'=>0,
        'username'=>'访客',
        'status'=>1,
        'time'=>time(),
        'ip'=>'127.0.0.1',
    );
    $res = $db->insert('xiao_form_comment',$comment);
}

?>