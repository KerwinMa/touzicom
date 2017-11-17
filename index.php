<?php

/**

 * XiaoCms企业建站版

 * 官方网站:http://www.xiaocms.com

 */
 
define('XIAOCMS_PATH',   dirname(__FILE__) . DIRECTORY_SEPARATOR);
include XIAOCMS_PATH . 'core/xiaocms.php';
require_once('./extend/CountUser.class.php');
$CM = new CountUser();
xiaocms::run();
 