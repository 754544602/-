var photoAll = {
	init: function() {
		//使用拍照设备上传附件
		$(".file-upload-img-btn").on('click', function() {
			//获取需要拼接图片的地方
			photoAll.fileClickObj = $('.file-img-div');
			//开始初始化设备
			photoAll.startVideo();
		});

		$("#camCan").on('click', function() {
			//执行设备拍照
			Capture();
		});
		$("#camCen").on('click', function() {
			//关闭弹框及设备
			photoAll.closeCam();
		});

		//附件名称修改
		$('.file-img-div').on('blur', '.file-name', function() {
			var id = $(this).parent().attr('id');
			var name = $(this).val();
			$.ajax({
				type: "post",
				url: $yt_option.base_path + "fileUpDownload/updateFileName",
				async: true,
				data: {
					fileName: name,
					fileId: id
				},
				success: function(data) {
					if(data.falg == 0) {

					}
					$yt_alert_Model.prompt(data.message);
				}
			});
		});

		//下载高拍仪sdk
		$('.active-sdk').on('click', function() {
			/*var url = 'https://share.weiyun.com/50xdaPR';
			if(typeof(downloadIframe) == "undefined") {
				var iframe = document.createElement("iframe");
				downloadIframe = iframe;
				document.body.appendChild(downloadIframe);
			}
			downloadIframe.src = url;
			downloadIframe.style.display = "none";*/
			window.open('https://share.weiyun.com/50xdaPR');
		});
	},
	/**
	 * 启动高拍仪
	 */
	startVideo: function() {
		if(photoAll.isExitsFunction('StartVideo')) {
			console.log(hdCamidMain);
			//启动并配置分辨率
			StartVideo(hdCamidMain, 3264, 2448);
		}
		//显示预览框
//		$yt_alert_Model.getDivPosition($('.active-div'));
//		$('.active-div').show();
//		$('#pop-modle-alert').show();
		sysCommon.showModel($('.active-div'));
	},
	/**
	 * 关闭拍照设备
	 */
	closeCam: function() {
		if(photoAll.isExitsFunction('CloseCam')) {
			CloseCam();
		}
		sysCommon.closeModel($('.active-div'));
		//隐藏预览框
		/*$('.active-div').hide();
		$('#pop-modle-alert').hide();*/
	},
	/**
	 * 判断函数是否存在
	 * @param {Object} funcName
	 */
	isExitsFunction: function(funcName) {  
		try {    
			if(typeof(eval(funcName)) == "function") {      
				return true;    
			}  
		} catch(e) {}  
		return false;
	},
	/**
	 * 根据base64编码上传附件
	 * @param {Object} str
	 */
	setFileUpLoadDom: function(str) {
		//启动loading
		//$yt_baseElement.showLoading();
		//获取当前点击附件区域
		var ithisParent = photoAll.fileClickObj;
		var imgUlr = '';
		$.ajax({
			type: 'post',
			url: $yt_option.base_path + "/fileUpDownload/uploadSDK?modelCode=PHOTO_APP",
			data: {
				sdk: str
			},
			success: function(data) {
				//关闭loading
				//$yt_baseElement.hideLoading();
				if(data.flag == 0) {
					//拼接图片
					photoAll.appendImg(data.data.pkId,data.data.fileName,ithisParent);
				} else {
					$yt_alert_Model.prompt(data.msg);
				}

			},
			error: function(data) {
				//关闭loading
				//$yt_baseElement.hideLoading();
			}
		});
	},
	/**
	 * 拼接图片
	 * @param {Object} data.data.pkId
	 * @param {Object} data.data.fileName
	 * @param {Object} ithisParent
	 */
	appendImg: function(pkId,fileName,ithisParent) {
		imgUlr = $yt_option.base_path + 'fileUpDownload/download?pkId=' + pkId + '&isDownload=false';
		var cla = photoAll.isImgFormat(fileName) ? 'file-preview' : 'no-img';
		var attaElement = $('<div id="' + pkId + '" class="file-lable" fid="' + pkId + '"><img class="file-img ' + cla + '" src="' + imgUlr + '"><label class="file-del"></label><input type="text" class="file-name" value="' + fileName + '"><div class="file-name-bg"></div></div>');
		//附件删除按钮
		attaElement.find(".file-del").click(function() {
			var me = $(this);
			$yt_alert_Model.alertOne({
				alertMsg: "确认删除吗?",
				confirmFunction: function() {
					me.parent('.file-lable').remove();
				}
			});
		});
		//非图片预览提示
		attaElement.find('.no-img').click(function() {
			$yt_alert_Model.prompt('非图片文件，无法预览', 2000);
		});
		ithisParent.append(attaElement);
		$('.file-img-div .file-preview').showImg();
	},
	/**
	 * 拼接图片详情用
	 * @param {Object} data.data.pkId
	 * @param {Object} data.data.fileName
	 * @param {Object} ithisParent
	 */
	appendImgDetail: function(pkId,fileName,ithisParent) {
		imgUlr = $yt_option.base_path + 'fileUpDownload/download?pkId=' + pkId + '&isDownload=false';
		var cla = photoAll.isImgFormat(fileName) ? 'file-preview' : 'no-img';
		var attaElement = $('<div id="' + pkId + '" class="file-lable" fid="' + pkId + '"><img class="file-img ' + cla + '" src="' + imgUlr + '"><div class="file-down-bg">下载</div><div class="text-overflow-photo" title="' + fileName + '">' + fileName + '</div></div>');
		//附件下载按钮
		attaElement.find(".file-down-bg").off().on('click',function() {
			window.location.href = $yt_option.base_path + 'fileUpDownload/download?pkId=' + pkId + '&isDownload=true';
		});
		//非图片预览提示
		attaElement.find('.no-img').click(function() {
			$yt_alert_Model.prompt('非图片文件，无法预览', 2000);
		});
		ithisParent.append(attaElement);
		$('.file-img-div .file-preview').showImg();
	},
	/**
	 * 高拍仪附件上传
	 * @param {Object} str
	 */
	fileUpDataConfig: function(str) {
		if(photoAll.fileClickObj) {
			//给保存的file input赋值文件路径并触发事件
			GetBase64FromFile(str);
		}
	},
	/**
	 * 判断附件是否是图片格式
	 * @param {Object} name
	 */
	isImgFormat: function(name) {
		if(name) {
			//获取文件后缀名
			var format = name.split('.')[1];
			if(format == 'jpg' || format == 'png') {
				return true;
			}
		}
		return false;
	},
}
$(function() {
	//初始化高拍仪参数
	if(photoAll.isExitsFunction('loadActiveX')) {
		loadActiveX();
	}
	photoAll.init();
})