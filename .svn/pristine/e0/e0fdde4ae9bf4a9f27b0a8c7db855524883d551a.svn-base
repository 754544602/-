var homePage = {
	init: function() {
		homePage.getDataList();
		$('.model-list ul').on('click', '.to-page', function() {
			var u = $(this).attr('menuurl');
			$yt_common.parentAction({
				url: $yt_option.parent_action_path, //父级中转地址,固定配置项,只有统一修改处理。  
				funName: 'locationToMenu', //指定方法名，定位到菜单方法  
				data: {
					url: u //要跳转的页面路径  
				}
			});
		});
		//点击问题反馈表
		$(".problem-link").click(function(){
			var fileUrl ='document/problem.xlsx';
			var  downLoadUrl = encodeURI($yt_option.websit_path+fileUrl);
			 if (myBrowser()==="IE" || myBrowser()==="Edge"){
	            var oPop = window.open(downLoadUrl,"","width=1, height=1, top=5000, left=5000");
	            for(; oPop.document.readyState != "complete"; )
	            {
	                if (oPop.document.readyState == "complete")break;
	            }
	            oPop.document.execCommand("SaveAs");
	            oPop.close();
	        }else{
	            this.href=downLoadUrl;
	            this.download="问题反馈表.xlsx";
	        }
		 });
		 
		 //点击下载框架安装包图片
		 $(".frame-a").click(function(){
		 	var fileUrl ='document/webFrame.zip';
			var  downLoadUrl = encodeURI($yt_option.websit_path+fileUrl);
			 if (myBrowser()==="IE" || myBrowser()==="Edge"){
	            var oPop = window.open(downLoadUrl,"","width=1, height=1, top=5000, left=5000");
	            for(; oPop.document.readyState != "complete"; )
	            {
	                if (oPop.document.readyState == "complete")break;
	            }
	            oPop.document.execCommand("SaveAs");
	            oPop.close();
	        }else{
	            this.href=downLoadUrl;
	            this.download="webFrame.zip";
	        }
		 });
		 //点击下载UE原型
		 $(".ue-a").click(function(){
		 	var fileUrl ='document/ue_demoV1.1.2.rplib';
			var  downLoadUrl = encodeURI($yt_option.websit_path+fileUrl);
			 if (myBrowser()==="IE" || myBrowser()==="Edge"){
	            var oPop = window.open(downLoadUrl,"","width=1, height=1, top=5000, left=5000");
	            for(; oPop.document.readyState != "complete"; )
	            {
	                if (oPop.document.readyState == "complete")break;
	            }
	            oPop.document.execCommand("SaveAs");
	            oPop.close();
	        }else{
	            this.href=downLoadUrl;
	            this.download="UE原型设计元件库V1.1.2.rplib";
	        }
		 });
	},
	getDataList: function() {
		$.ajax({
			type: "post",
			url: $yt_option.menu_path,
			async: true,
			success: function(data) {
				if(data.flag == 0) {
					var list = data.data;
					$.each(list.children, function(i, n) {
					if(i<=3){
						$.each(n.children, function(j, m) {
							
								if(i == 0) {
									$('.model-ul-b').append('<li><div class="to-page yt-text-overflow" menuurl="' + m.menuUrl + '">' + m.menuName + '</div></li>')
								} else if(i == 1) {
									$('.model-ul-c').append('<li><div class="to-page yt-text-overflow" menuurl="' + m.menuUrl + '">' + m.menuName + '</div></li>')
								} else if(i == 3) {
									$('.model-ul-cb').append('<li><div class="to-page yt-text-overflow" menuurl="' + m.menuUrl + '">' + m.menuName + '</div></li>')
								}
						});
					}
					});
				}
			}
		});
	},
	toPage: function(local) {
		
	}
};

$(function() {
	homePage.init();
	var num = 20;
	function goLeft() {
		if(num == -120) { //120是根据你给的尺寸，可变的
			num = 20;
		}
		num -= 1;
		$(".yt-text-roll").css({
			left: num
		})
	}
	//滚动速度
	//var timer = setInterval(goLeft, 50);
	//鼠标经过时滚动停止
	$(".yt-text-overflow").hover(function() {
			clearInterval(timer);
		},
		function() {
			timer = setInterval(goLeft, 50);
		})
});
/**
 * 
 * 
 * 文件下载判断浏览器
 * 
 */
function myBrowser(){
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1;
        if (isOpera) {
            return "Opera"
        }; //判断是否Opera浏览器
        if (userAgent.indexOf("Firefox") > -1) {
            return "FF";
        } //判断是否Firefox浏览器
        if (userAgent.indexOf("Chrome") > -1){
            return "Chrome";
        }
        if (userAgent.indexOf("Safari") > -1) {
            return "Safari";
        } //判断是否Safari浏览器
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
            return "IE";
        }; //判断是否IE浏览器
        if (userAgent.indexOf("Trident") > -1) {
            return "Edge";
        } //判断是否Edge浏览器
    }
