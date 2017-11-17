<?php



class register extends Member {

    

    public function __construct() {

		parent::__construct();

	}

	

	/**

	 * 注册

	 */

	public function indexAction() {
	    if (!$this->site_config['member_register']) $this->show_message('系统未开放会员注册功能');

	    if ($this->member_info)  $this->show_message('您已经登录了，不能再次注册。',1, url('index/'));

	    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if($this->isMobile()){
                $device = 'mobile';
            }else{
                $device = 'pc';

            }
		    $data = $this->post('data');

	        unset($data['id']);

			if ($this->site_config['member_regcode'] && !$this->checkCode($this->post('code'))) $this->show_message('验证码不正确', 2,1);

	        if (empty($data['username'])) $this->show_message('请填写会员名', 2,1);

			if (!$this->is_username($data['username'])) $this->show_message('会员名称不符合规则', 2,1);

    		if (empty($data['password'])) $this->show_message('密码不能为空', 2,1);

    		if (strlen($data['password'])<6) $this->show_message('密码不能少于6位数', 2,1);

    		if ($data['password'] != $data['password2']) $this->show_message('两次输入密码不一致', 2,1);

	    /*	if (!is_email($data['email'])) $this->show_message('邮箱格式不正确', 2,1);

	    	if ($this->db->setTableName('member')->getOne('email=?', $data['email'], 'id')) $this->show_message('邮箱已经存在，请重新选择邮箱', 2,1);
*/
	    	if ($this->db->setTableName('member')->getOne('username=?', $data['username'], 'id')) $this->show_message('该会员名称已经存在，请重新选择', 2,1);


	    	$data['regdate']  = time(); 

	    	$data['regip']    = $this->get_user_ip();

	    	$data['status']	  = $this->site_config['member_status']  ? 0 : 1;

	    	$data['modelid']  = (!isset($data['modelid']) || empty($data['modelid'])) ? $this->site_config['member_modelid'] : $data['modelid'];

            if (!isset($this->member_model[$data['modelid']])) $this->show_message('会员模型不存在',2,1);

	    	$data['password'] = md5(md5($data['password']));
	    	$data['id'] = $this->db->setTableName('member')->insert($data,true);
            $db = $this->db();
            $sql = "update xiao_member set device = '{$device}' where id=".$data['id'];
            $sth = $db->query($sql);
	    	if ($data['id']) {

	    	    $this->db->setTableName($this->member_model[$data['modelid']]['tablename'])->insert($data);

	    	}else {

	         	$this->show_message('注册失败',2,1);

	    	}

			cookie::set('member_id', $data['id']);

			cookie::set('member_code', substr(md5($this->site_config['rand_code'] . $data['id']), 5, 20));

			$this->show_message('注册成功',1, url('index'));

		}

		$modelid	= (int)$this->get('modelid') ? (int)$this->get('modelid') : (int)$this->site_config['member_modelid'];

		$this->view->assign(array(

			'fields'	=> $this->get_data_fields($this->member_model[$modelid]['fields']),

		    'config' => $this->site_config,

			'site_title'  => '会员注册 - ' . $this->site_config['site_name'],

			'site_keywords'    => $this->site_config['site_keywords'], 

			'site_description' => $this->site_config['site_description'],

			'member_model' => $this->member_model,

			'member_default_modelid' => $this->site_config['member_modelid'],

		));

		$this->view->display('member/register.html');

	}



	/**

	 * 检查会员名是否符合规定

	 */

	private function is_username($username) {

		$strlen = strlen($username);

		if(!preg_match('/^[a-zA-Z0-9_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]+$/', $username)){

			return false;

		} elseif ( 20 < $strlen || $strlen < 2 ) {

			return false;

		}

		return true;

    }

    private function isMobile() {
        // 如果有HTTP_X_WAP_PROFILE则一定是移动设备
        if (isset($_SERVER['HTTP_X_WAP_PROFILE'])) {
            return true;
        }
        // 如果via信息含有wap则一定是移动设备,部分服务商会屏蔽该信息
        if (isset($_SERVER['HTTP_VIA'])) {
            // 找不到为flase,否则为true
            return stristr($_SERVER['HTTP_VIA'], "wap") ? true : false;
        }
        // 脑残法，判断手机发送的客户端标志,兼容性有待提高。其中'MicroMessenger'是电脑微信
        if (isset($_SERVER['HTTP_USER_AGENT'])) {
            $clientkeywords = array('nokia','sony','ericsson','mot','samsung','htc','sgh','lg','sharp','sie-','philips','panasonic','alcatel','lenovo','iphone','ipod','blackberry','meizu','android','netfront','symbian','ucweb','windowsce','palm','operamini','operamobi','openwave','nexusone','cldc','midp','wap','mobile','MicroMessenger');
            // 从HTTP_USER_AGENT中查找手机浏览器的关键字
            if (preg_match("/(" . implode('|', $clientkeywords) . ")/i", strtolower($_SERVER['HTTP_USER_AGENT']))) {
                return true;
            }
        }
        // 协议法，因为有可能不准确，放到最后判断
        if (isset ($_SERVER['HTTP_ACCEPT'])) {
            // 如果只支持wml并且不支持html那一定是移动设备
            // 如果支持wml和html但是wml在html之前则是移动设备
            if ((strpos($_SERVER['HTTP_ACCEPT'], 'vnd.wap.wml') !== false) && (strpos($_SERVER['HTTP_ACCEPT'], 'text/html') === false || (strpos($_SERVER['HTTP_ACCEPT'], 'vnd.wap.wml') < strpos($_SERVER['HTTP_ACCEPT'], 'text/html')))) {
                return true;
            }
        }
        return false;
    }

    public function db(){
        $dsn = 'mysql:host=116.62.230.27;dbname=top';
        $dbh = new PDO($dsn, 'root', 'Admin200pay');
        $dbh->query("set character set 'utf8'");
        return $dbh;

    }

	

}