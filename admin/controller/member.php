<?php



class member extends Admin {

    

    

    public function __construct() {

		parent::__construct();

		if (!defined('XIAOCMS_MEMBER')) $this->show_message('没有安装会员模块，请去XiaoCms下载安装',2 , 'http://www.xiaocms.com');

	}

    

    public function indexAction() {

		if ($this->post('member') && $this->post('status')=='del') {

	        foreach ($this->post('member') as $id) {

	                $this->delAction($id, 1);

			}

			$this->show_message('删除成功', 1);

	    }elseif ($this->post('member') && $this->post('status')=='1') {

     		foreach ($this->post('member') as $id) {

	            $this->db->setTableName('member')->update(array('status'=>1), 'id=?' , $id);

			}

			$this->show_message('设置成功', 1);

	    }elseif ($this->post('member') && $this->post('status')=='2') {

     		foreach ($this->post('member') as $id) {

	            $this->db->setTableName('member')->update(array('status'=>0), 'id=?' , $id);

			}

			$this->show_message('设置成功', 1);

		}

		$member_model = get_cache('member_model'); 

		$page     = (int)$this->get('page') ? (int)$this->get('page') : 1;

		$modelid  = (int)$this->get('modelid');

	    $pagelist = xiaocms::load_class('pager');

	    $pagesize = empty($this->admin['list_size']) ? 10 : $this->admin['list_size'];

	    $urlparam = array();

	    if ($modelid)   $urlparam['modelid'] = $modelid;

		$urlparam['status'] = $status;

	    if ($modelid) $this->db->where('modelid=?',$modelid);

     /*  $this->db->where('regdate<=?',1504249006);*/

	    $listArr = $this->db->setTableName('member')->page($page, $pagesize,null,'status ASC, id DESC');

	    $list = $listArr['list'];

	    $total = $listArr['total'];



	    $pagelist = $pagelist->total($total)->url(url('member/index', $urlparam) . '&page=[page]')->num($pagesize)->page($page)->output();

	    include $this->admin_tpl('member_list');

    }

	

	/*

	 * 修改资料

	 */

	public function editAction() {

	    $id     = (int)$this->get('id');

		$data = $this->db->setTableName('member')->find($id);

		if (empty($data)) $this->show_message('该会员不存在');

		$member_model = get_cache('member_model');

		if (empty($member_model)) $this->show_message('会员模型不存在');

		$member_model  = $member_model[$data['modelid']];

		$info_data  = $this->db->setTableName($member_model['tablename'])->find($id);

		if ($this->post('submit')) {

		    $data = $this->post('data');

			if ($this->post('password')) $data['password'] = md5(md5($this->post('password')));

			foreach ($data as $i=>$t) {

				if (is_array($t)) $data[$i] = array2string($t);

			}

			$this->db->setTableName('member')->update($data, 'id=?' , $id);

			if ($info_data) {

			    $this->db->setTableName($member_model['tablename'])->update($data, 'id=?' , $id);

			} else {

				$data['id'] = $id;

				$this->db->setTableName($member_model['tablename'])->insert($data);

			}

			$this->show_message('修改成功', 1, url('member/edit', array('id'=>$id)));

		}

		$fields   = $member_model['fields'];

		$data_fields = $this->get_data_fields($fields, $info_data);

        include $this->admin_tpl('member_edit');

	}

	

	/**

	 * 删除会员

	 */

	public function delAction($id=0,$show=0) {

	    $id   = $id ? $id :  (int)$this->get('id');

		$data = $this->db->setTableName('member')->find($id);

	    if (empty($data)) $this->show_message('会员不存在');

		$this->db->setTableName('member')->delete('id=?' , $id);

		$member_model = get_cache('member_model');

		$member_model  = $member_model[$data['modelid']];

		if ($member_model){

		$this->db->setTableName($member_model['tablename'])->delete('id=?' ,$id);

		}

		if (get_cache('form_model')) {

		    foreach (get_cache('form_model') as $t) {

			$this->db->setTableName($t['tablename'])->delete('userid=?' ,$id);

			}

		}

		$path = XIAOCMS_PATH . 'data/upload/member/' . $id . '/';

		if (file_exists($path)) delete_dir($path);

		$show or $this->show_message('删除成功', 1, url('member'));

	}



	/**

	 * Email是否重复检查

	 */

	public function ajaxemailAction() {

	    $email = $this->post('email');

		if (!is_email($email)) exit('<div class="onError">Email格式不正确</div>');

	    $id    = $this->post('id');

	    if (empty($email)) exit('<div class="onError">Email不能为空</div>');

        $data    = $this->db->setTableName('member')->getOne(array('id<>'.$id, 'email=?'), $email );

	    if ($data) exit('<div class="onError">Email已经存在</div>');

	    exit('<div class="onShow">通过</div>');

	}

    /*
     * 追踪用户行踪
     * ***/

    public function tradeAction(){
        $userid = $this->get('id');
        $page     = (int)$this->get('page') ? (int)$this->get('page') : 1;


        $pagelist = xiaocms::load_class('pager');

        $pagesize = empty($this->admin['list_size']) ? 10 : $this->admin['list_size'];

        $urlparam = array('id'=>$userid);
        $listArr = $this->db->setTableName('user_count')->where('userid='.$userid)->page($page, $pagesize,null,'id DESC');
        $list = $listArr['list'];

        $total = $listArr['total'];



        $pagelist = $pagelist->total($total)->url(url('member/index', $urlparam) . '&a=trade&page=[page]')->num($pagesize)->page($page)->output();

        include $this->admin_tpl('trade_list');

    }

    //会员访问报表
    public function usertradeAction(){
        $d = $this->get('d')?$this->get('d'):3;
        $db = $this->db();
        $time = time() - (3600*24*$d);
        $sql = "select *,count(*) as seeNum from xiao_user_count where cid!=0 AND time >= {$time} group by cid order by seeNum desc limit 0,100";
        $sth = $db->query($sql);
        $list = [];
        $data = $sth->fetchAll(PDO::FETCH_ASSOC);
        $list = $data;
        include $this->admin_tpl('usertrade_list');
    }

    //访问项目人数详情
    public function whoseeAction(){
        $cid = $this->get('cid');
        $db = $this->db();
        $sql = "select * from xiao_user_count where cid = {$cid}";
        $sth = $db->query($sql);
        $list = [];
        $data = $sth->fetchAll(PDO::FETCH_ASSOC);
        foreach($data as &$val){
            $res = $this->db->setTableName('member')->find($val['userid']);
            $tel = $this->db->setTableName('member_geren')->find($val['userid']);
            $val['username'] = $res['username'];
            $val['regdate'] = date('Y-m-d H:i:s',$res['regdate']);
            $val['tel'] = $tel?$tel['tel']:$tel['tel'];

        }
        $list = $data;
        include $this->admin_tpl('whosee_list');

    }

    public function db(){
        $dsn = 'mysql:host=116.62.230.27;dbname=top';
        $dbh = new PDO($dsn, 'root', 'Admin200pay');
        $dbh->query("set character set 'utf8'");
        return $dbh;

    }


}