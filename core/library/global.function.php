<?php

//decode by QQ:270656184 http://www.yunlu99.com/
if (!defined('IN_XIAOCMS')) {
    exit;
}
function keyword_link($content)
{
    $keylink = get_cache('keylink');
    if ($keylink) {
        foreach ($keylink as $v) {
            $regEx = '/(?!<[^>]*)' . $v['name'] . '(?![^<]*>)/i';
            $url = '<a href="' . $v['link'] . '">' . $v['name'] . '</a>';
            $content = preg_replace($regEx, $url, $content, 1);
        }
    }
    return $content;
}
function hidtel($phone)
{
    $IsWhat = preg_match('/(0[0-9]{2,3}[\-]?[2-9][0-9]{6,7}[\-]?[0-9]?)/i', $phone);
    if ($IsWhat == 1) {
        return preg_replace('/(0[0-9]{2,3}[\-]?[2-9])[0-9]{3,4}([0-9]{3}[\-]?[0-9]?)/i', '$1****$2', $phone);
    } else {
        return preg_replace('/(1[3578]{1}[0-9])[0-9]{4}([0-9]{4})/i', '$1****$2', $phone);
    }
}
function food()
{
    $db = xiaocms::load_class('Model');
    $sql = "select tel from xiao_member_geren where tel<>'18362532958' ";
    $result1 = $db->query($sql)->fetchAll();
    $sql2 = "select tel from xiao_member_qiye where tel<>'18362532958'";
    $result2 = $db->query($sql2)->fetchAll();
    $a1 = array();
    foreach ($result1 as $k1 => $v1) {
        $a1[$k1] = hidtel($v1['tel']);
    }
    $a2 = array();
    foreach ($result2 as $k2 => $v2) {
        $a2[$k2] = hidtel($v2['tel']);
    }
    $a3 = array_merge($a1, $a2);
    return $a3;
}
function image($url)
{
    if (empty($url) || strlen($url) < 4) {
        return SITE_PATH . 'data/upload/nopic.gif';
    }
    if (substr($url, 0, 7) == 'http://') {
        return $url;
    }
    if (strpos($url, SITE_PATH) !== false && SITE_PATH != '/') {
        return $url;
    }
    if (substr($url, 0, 1) == '/') {
        $url = substr($url, 1);
    }
    return SITE_PATH . $url;
}
function thumb($img, $width = 200, $height = 200)
{
    if (empty($img) || strlen($img) < 4) {
        return SITE_PATH . 'data/upload/nopic.gif';
    }
    if (file_exists(XIAOCMS_PATH . $img)) {
        $ext = fileext($img);
        $thumb = $img . '.thumb.' . $width . 'x' . $height . '.' . $ext;
        if (!file_exists(XIAOCMS_PATH . $thumb)) {
            $image = xiaocms::load_class('image');
            $image->thumb(XIAOCMS_PATH . $img, XIAOCMS_PATH . $thumb, $width, $height);
        }
        return $thumb;
    }
    return $img;
}
function strcut($string, $length, $dot = '')
{
    if (strlen($string) <= $length) {
        return $string;
    }
    $string = str_replace(array('&amp;', '&quot;', '&lt;', '&gt;'), array('&', '"', '<', '>'), $string);
    $strcut = '';
    $n = $tn = $noc = 0;
    while ($n < strlen($string)) {
        $t = ord($string[$n]);
        if ($t == 9 || $t == 10 || 32 <= $t && $t <= 126) {
            $tn = 1;
            $n++;
            $noc++;
        } elseif (194 <= $t && $t <= 223) {
            $tn = 2;
            $n += 2;
            $noc += 2;
        } elseif (224 <= $t && $t <= 239) {
            $tn = 3;
            $n += 3;
            $noc += 2;
        } elseif (240 <= $t && $t <= 247) {
            $tn = 4;
            $n += 4;
            $noc += 2;
        } elseif (248 <= $t && $t <= 251) {
            $tn = 5;
            $n += 5;
            $noc += 2;
        } elseif ($t == 252 || $t == 253) {
            $tn = 6;
            $n += 6;
            $noc += 2;
        } else {
            $n++;
        }
        if ($noc >= $length) {
            break;
        }
    }
    if ($noc > $length) {
        $n -= $tn;
    }
    $strcut = substr($string, 0, $n);
    $strcut = str_replace(array('&', '"', '<', '>'), array('&amp;', '&quot;', '&lt;', '&gt;'), $strcut);
    return $strcut . $dot;
}
function fileext($filename)
{
    return pathinfo($filename, PATHINFO_EXTENSION);
}
function is_email($email)
{
    return strlen($email) > 6 && strlen($email) <= 32 && preg_match("/^([A-Za-z0-9\-_.+]+)@([A-Za-z0-9\-]+[.][A-Za-z0-9\-.]+)$/", $email);
}
function position($catid, $symbol = ' > ')
{
    if (empty($catid)) {
        return false;
    }
    $cats = get_cache('category');
    $catids = parentids($catid, $cats);
    $catids = array_filter(explode(',', $catids));
    krsort($catids);
    $html = '';
    foreach ($catids as $t) {
        $html .= "<a href=\"" . $cats[$t]['url'] . "\" title=\"" . $cats[$t]['catname'] . "\">" . $cats[$t]['catname'] . "</a>";
        if ($catid != $t) {
            $html .= $symbol;
        }
    }
    return $html;
}
function parentids($catid, $cats)
{
    if (empty($catid)) {
        return false;
    }
    $catids = $catid . ',';
    if ($cats[$catid]['parentid']) {
        $catids .= parentids($cats[$catid]['parentid'], $cats);
    }
    return $catids;
}
function get_top_cat($catid)
{
    $cats = get_cache('category');
    $cat = $cats[$catid];
    if ($cat['parentid']) {
        $cat = get_top_cat($cat['parentid']);
    }
    return $cat;
}
function runtime()
{
    $temptime = explode(' ', SYS_START_TIME);
    $time = $temptime[1] + $temptime[0];
    $temptime = explode(' ', microtime());
    $now = $temptime[1] + $temptime[0];
    return number_format($now - $time, 6);
}
function new_stripslashes($string)
{
    if (!is_array($string)) {
        return stripslashes($string);
    }
    foreach ($string as $key => $val) {
        $string[$key] = new_stripslashes($val);
    }
    return $string;
}
function string2array($data)
{
    if ($data == '') {
        return array();
    }
    return unserialize($data);
}
function array2string($data, $isformdata = 1)
{
    if ($data == '') {
        return '';
    }
    if ($isformdata) {
        $data = new_stripslashes($data);
    }
    return serialize($data);
}
function file_size_count($size, $dec = 2)
{
    $a = array("B", "KB", "MB", "GB", "TB", "PB");
    $pos = 0;
    while ($size >= 1024) {
        $size /= 1024;
        $pos++;
    }
    return round($size, $dec) . " " . $a[$pos];
}
function word2pinyin($word)
{
    if (empty($word)) {
        return '';
    }
    $pin = xiaocms::load_class('pinyin');
    return str_replace('/', '', $pin->output($word));
}
function is_mobile()
{
    static $is_mobile;
    if (isset($is_mobile)) {
        return $is_mobile;
    }
    if (empty($_SERVER['HTTP_USER_AGENT'])) {
        $is_mobile = false;
    } elseif (strpos($_SERVER['HTTP_USER_AGENT'], 'Mobile') !== false || strpos($_SERVER['HTTP_USER_AGENT'], 'Android') !== false || strpos($_SERVER['HTTP_USER_AGENT'], 'Silk/') !== false || strpos($_SERVER['HTTP_USER_AGENT'], 'Kindle') !== false || strpos($_SERVER['HTTP_USER_AGENT'], 'BlackBerry') !== false || strpos($_SERVER['HTTP_USER_AGENT'], 'Opera Mini') !== false || strpos($_SERVER['HTTP_USER_AGENT'], 'Opera Mobi') !== false) {
        $is_mobile = true;
    } else {
        $is_mobile = false;
    }
    return $is_mobile;
}
function dir_path($path)
{
    $path = str_replace('\\', '/', $path);
    if (substr($path, -1) != '/') {
        $path = $path . '/';
    }
    return $path;
}
function mkdirs($dir)
{
    if (empty($dir)) {
        return false;
    }
    if (!is_dir($dir)) {
        mkdirs(dirname($dir));
        mkdir($dir);
    }
}
function delete_dir($dir)
{
    $dir = dir_path($dir);
    if (!is_dir($dir)) {
        return FALSE;
    }
    $list = glob($dir . '*');
    foreach ($list as $v) {
        is_dir($v) ? delete_dir($v) : @unlink($v);
    }
    return @rmdir($dir);
}
function set_cache($cache_file, $value)
{
    if (!$cache_file) {
        return false;
    }
    $cache_file = DATA_DIR . 'cache' . DS . $cache_file . '.cache.php';
    $value = !is_array($value) ? serialize(trim($value)) : serialize($value);
    if (!is_dir(DATA_DIR . 'cache' . DS)) {
        mkdirs(DATA_DIR . 'cache' . DS);
    }
    return file_put_contents($cache_file, $value, LOCK_EX) ? true : false;
}
function get_cache($cache_file)
{
    if (!$cache_file) {
        return false;
    }
    static $cacheid = array();
    if (!isset($cacheid[$cache_file])) {
        $file = DATA_DIR . 'cache' . DS . $cache_file . '.cache.php';
        if (is_file($file)) {
            $cacheid[$cache_file] = unserialize(file_get_contents($file));
        } else {
            return false;
        }
    }
    return $cacheid[$cache_file];
}
function delete_cache($cache_file)
{
    if (!$cache_file) {
        return true;
    }
    $cache_file = DATA_DIR . 'cache' . DS . $cache_file . '.cache.php';
    return is_file($cache_file) ? unlink($cache_file) : true;
}
function url($route, $params = null)
{
    if (!$route) {
        return false;
    }
    $arr = explode('/', $route);
    $arr = array_diff($arr, array(''));
    $url = 'index.php';
    if (isset($arr[0]) && $arr[0]) {
        $url .= '?c=' . strtolower($arr[0]);
        if (isset($arr[1]) && $arr[1] && $arr[1] != 'index') {
            $url .= '&a=' . strtolower($arr[1]);
        }
    }
    if (!is_null($params) && is_array($params)) {
        $params_url = array();
        foreach ($params as $key => $value) {
            $params_url[] = trim($key) . '=' . trim($value);
        }
        $url .= '&' . implode('&', $params_url);
    }
    $url = str_replace('//', '/', $url);
    return Base::get_base_url() . $url;
}