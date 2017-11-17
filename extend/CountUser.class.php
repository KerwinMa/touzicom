<?php
require_once('config.php');
require_once('PDO.class.php');
/*
 * 用户行为分析
 * to  xiaomiCms
 * ***/
class CountUser{
    private $db;
    public function __construct(){
        $this->db = MyPDO::getInstance(HOST, USERNAME, PASSWORD, DBNAME, 'utf8');
        self::doExcelUrl();
    }

    /*
     *解析url
     * param $url
     */
    public function doExcelUrl($model = 'home'){
        $string = isset($_SERVER['QUERY_STRING']) && $_SERVER['QUERY_STRING'] ? $_SERVER['QUERY_STRING'] : $_SERVER['REQUEST_URI'];

        parse_str($string, $array);

        $controllerName = (isset($array['c']) && $array['c']) ? self::_safe($array['c']) : 'index';

        $actionName = (isset($array['a']) && $array['a']) ? self::_safe($array['a']) : 'index';

        if($controllerName == 'api' && $actionName='user'){
            return;
        }
        $_GET             = array_merge($_GET, $array);

        $userInfo = $this->checkUserStatus();
        if(!$userInfo['userid']){
            return;
        }
        $url = $_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING'];
        $add = array(
            'userid'=>$userInfo['userid'],
            'ip'=>$userInfo['ip'],
            'url'=>$url,
            'controller'=>$controllerName,
            'action'=>$actionName,
            'model'=>$model,
            'desc'=>'',
            'time'=>time(),
        );
        $userid = $userInfo['userid']?$userInfo['userid']:0;
        $ip = $userInfo['ip'];
        $where  = "(userid = {$userid} or ip= '{$ip}')";
        $res = $this->db->query("select id,countNum from xiao_user_count where url='".$url."' AND ".$where);
        if($res && !empty($res)){
            $map = array(
                'countNum' => $res[0]['countNum']+1,
                'time' => time(),
            );
            $result = $this->db->update('xiao_user_count',$map,"id=".$res[0]['id']);
            return;

        }
        if($this->get('id')){

            $result = $this->db->query('select * from xiao_content where id='.$this->get('id'));
            if($result) {
                $add['desc'] = $result[0]['title'];
                $add['model'] = '项目';
            }
            $add['cid'] = $this->get('id');//具体项目id
        }

        if($this->get('catid')){
            $result = $this->db->query('select * from xiao_category where catid='.$this->get('catid'));
            if($result){
                $add['desc'] = $result[0]['catname'];
                $add['model'] = '导航栏目';
            }
        }

        $result = $this->db->insert('xiao_user_count',$add);
    }

    //查询用户userid/ip
    public function checkUserStatus(){
        $userid = $_COOKIE['xiaocms_member_id'];
        $ip = $_SERVER["REMOTE_ADDR"];
        return array('userid'=>$userid,'ip'=>$ip);
    }

    /**

     * 安全处理函数controller

     */

    private static function _safe($str) {

        $str = trim(strtolower($str));

        return str_replace(array('/', '.'), '', $str);

    }

    public static function get($string)
    {
        if (!isset($_GET[$string])) return null;
        if (!is_array($_GET[$string])) return htmlspecialchars(trim($_GET[$string]));
        return null;
    }
}
?>