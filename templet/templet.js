/**
 * 
 * 创建当前业务对象
 * 当前给出的是示例，研发中根据自己的业务进行创建
 * 命名规范:驼峰命名，首字母小写，后面加上Obj结束
 */
var loanApplyObj = {
	/**
	 * 
	 * 初始化方法(方法名不可变更)
	 * 
	 */
	init:function(){
		
		/**
		 * 
		 * 此方法里可写对数据的初始化获取显示等操作
		 * 	
		 * 如：
		 * //初始化页面select控件
		 * $("select").niceSelect();
		 * 
		 */
		
	},
	/**
	 * 
	 * 操作事件方法(方法名不可变更)
	 * 
	 */
	events:function(){
		/**
		 * 
		 * 此方法里写页面里一些操作按钮的点击事件等其他事件的操作
		 * 
		 * 如：
		 * 
		 * $("button.save-btn").click(function(){});
		 *
		 * 
		 */
	}
}
$(function(){
	//调用初始化方法
	loanApplyObj.init();
	//调用操作事件方法
	loanApplyObj.events();
});
