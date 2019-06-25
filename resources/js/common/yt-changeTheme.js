var $change_theme = {
	/**
	 * 存储cookie
	 * @param {Object} name
	 * @param {Object} value
	 */
	saveCookie:function(name, value) { 
			var Days = 1; //此 cookie 将被保存 1 天
			var exp = new Date(); //new Date
			exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
			document.cookie = name + "=" + escape(value == undefined || value == null ? "" : value) + ";expires=" + exp.toGMTString() + ";path=/";
	},
	/**
	 * 获取cookie
	 * @param {Object} name
	 */
	getCookie:function(name) { 
			var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
			if(arr != null) return unescape(arr[2]);
			return null;
	},
	/**
	 * 切换主题方法
	 * @param {Object} themeColor 主题文件路径
	 */
    changeThemes:function(themeFileUrl) { 
			//判断页面是否有父级页面
			if(window.parent == window){
				//显示主体内容
				$(".yt-main-model").hide();
				//先隐藏页面内容，加上loading
				$yt_baseElement.showLoading();
			}
			//将点击事件存放在浏览器的cookie记录里
			$change_theme.saveCookie("THEMEURL", themeFileUrl); 
			//读取cookies记录
			var themeId = $change_theme.getCookie('THEMEURL');
			if(themeId != "undefined"  && themeId != ""){
				themeFileUrl = themeId;
			}else{
				//判断传入的主题颜色是否为空,是则给出默认样式文件路径
				if(themeFileUrl  == undefined || themeFileUrl =="" || themeFileUrl ==""){
					themeFileUrl = 'resources/css/common/yt-common.min.css';
				}
			}
			//先清除原有拼接的主题颜色link标签
			$("html head link.theme-sty").remove();
			//找到head下面最后一个meta标签
			var lastMetaObj = $("html head meta:eq(0)");
			//拼接link引用样式标签
			var linkStr = '<link rel="stylesheet" class="theme-sty" href="'+$websit_path+themeFileUrl+'"/>';
			//追加在head中meta的最后一个标签后面
			lastMetaObj.after(linkStr);
			//判断是否包含iframe
			if(window.frames.length>0){
				//获取iframes对象
				var frameObj = $("#rightMain").contents();
				//先清除原有拼接的主题颜色link标签
				$(frameObj).find("head link.theme-sty").remove();
				//找到head下面最后一个meta标签
				var lastMetaObj = $(frameObj).find("head meta:eq(0)");
				//拼接link引用样式标签
				var linkStr = '<link rel="stylesheet" class="theme-sty" href="'+$websit_path+themeFileUrl+'"/>';
				//追加在head中meta的最后一个标签后面
				lastMetaObj.after(linkStr);
			}
			//判断页面是否引用公用样式
			if($(document).find(".theme-sty").length>0){
				setTimeout(function(){
						//显示主体页面内容
						$(".yt-main-model").show();
						//显示子页面内容
						$(window.parent.document.getElementById("frame-right-model")).css("display","block");
						//显示页面内容，隐藏loading
						$yt_baseElement.hideLoading();
				},500);
			}
		}
}
$(function(){
	//读取cookies记录
	var themeUrl = $change_theme.getCookie('THEMEURL');
	if(themeUrl !=undefined && themeUrl !=""){
		//调用换肤操作方法
		$change_theme.changeThemes(themeUrl);
	}else{
		//调用换肤操作方法
		$change_theme.changeThemes(themeUrl);
	}
});
