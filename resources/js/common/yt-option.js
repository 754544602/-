/**
 * 项目运行配置文件
 */
/**
 * base_path : 接口访问路径
 * 
 * websit_path : 前端服务路径
 * 
 * 
 * menu_data:一级菜单 数据
 * 
 * 
 * menu_data_two:二级菜单数据
 * 
 * 
 * is_origin:是否是跨域访问 true/false
 * 
 */
//接口访问路径
var $websit_path = 'http://localhost:8020/webCriterion/website/';
//切换主题jscss路径
var $yt_themeJs_path = 'http://192.168.1.63:8020/webCriterion/website/resources/js/common/yt-changeTheme.min.js?YTVERSIONCODE=2018011101';
var $yt_themeCss_path = 'http://192.168.1.63:8020/webCriterion/website/';
var $yt_option = {
	base_path:'http://192.168.1.63:8020/webCriterion/',
	websit_path:'http://localhost:8020/webCriterion/website/',//前台文件路径
	//前端首页
	websit_index: $websit_path + 'index.html',
	logoutUrl: 'http://192.168.1.63:8020/webCriterion/login/toLogout?logoutUrl=http://192.168.1.166:6060/yitian-cas/logout?service=http://192.168.1.63:8020/webCriterion/website/index.html',
	//menu_path:'http://192.168.1.50:8080/coso/website/resources/js/common/menuDataTest.json',//左侧菜单数据配置参数json为静态资源数据,可改为接口
	menu_path: 'http://192.168.1.63:8020/webCriterion/index/getChildMenusByUserToTreeMap',
	//menu_path: 'http://192.168.1.63:5656/coso/index/getChildMenusByUserToTreeMap',
	parent_action_path: $yt_themeCss_path + 'parentAction.html',
	systemCode:'dF24N8Oz1B',//系统code
	is_origin: true
}