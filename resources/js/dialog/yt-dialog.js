/***
 * 
 * 
 * C(12)提示框工具
 * 
 * 
 */
var dialog = {
	width: 0,
	height: 0,
	left: 0,
	popType: "", //代表箭头显示上还是下
	showDialog: function(elem) {
		//鼠标移入事件
		$(elem).on("mouseover",function() {
			//获取当前对象的文本内容
			var testMsg = $(this).text();
			/**
			 * 
			 * 调用创建提示框方法
			 * 
			 */
			dialog.createDialog($(this),testMsg);
		});
		//鼠标移出事件
		$(elem).on("mouseout",function() {
			//删除提示框
			$('#yt-dialog-modle').remove();
		});
	},
	/**
	 * 创建一个提示框
	 * @param {Object} elem 当前对象
	 * @param {Object} msg  文本内容
	 */
	createDialog: function(elem, msg) {
		//debugger;
		//获取当前对象的高度
		this.height = $(elem).height();
		//获取当前对象鼠标指针top值
		var top = $(elem).offset().top;
		if(top - 40 - this.height > 0) {
			this.top = $(elem).offset().top - this.height;
			this.popType = 'help-up';
		} else {
			this.top = top + this.height + 10;
			this.popType = 'help-down';
		}
		//拼接提示框内容
		var html = '<div id="yt-dialog-modle" class="yt-dialog-' + this.popType + '" style="width:276px;">' +
			'<div class="yt-dialog-heard"></div>' +
			'<div class="yt-dialog-content">' + msg + '</div>' +
			'<div class="yt-dialog-bottom"></div>';
		$("body").append(html);
		//给提示框加定位样式
		this.left = $(elem).offset().left + $(elem).width() - 140;
		//top再减去提示框内容div的高
		this.top = this.top - $("#yt-dialog-modle").height()+20;
		$("#yt-dialog-modle").css({
			top: this.top + 'px',
			left: this.left + 'px'
		});
		$("#yt-dialog-modle .yt-dialog-content").css("background","url(./resources/images/dialog/cont.png) repeat-y");
		//判断如果是箭头向下,改变提示框内容的边距
		if(this.popType == "help-up") {
			//$("#yt-dialog-modle .yt-dialog-content").css("padding", "0px 4px 6px 4px");
		}
	}
}