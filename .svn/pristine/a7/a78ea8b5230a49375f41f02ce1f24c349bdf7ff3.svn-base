var isIE = true; //是否IE
var isSecondDev = false; //是否有两个canvas显示视频
var camidMain = 0; //主头ID
var camidSub = 0; //副头ID
var hdCamidMain = 0;

//页面关闭时,停止摄像头,停止身份证读卡
window.onbeforeunload = function(event) {
	StopICWork();
	CloseCam();
	CloseCam2();
}

//加载控件
function loadActiveX() {
	if(navigator.userAgent.indexOf('MSIE') >= 0) {
		isIE = true;
		//IE浏览器加载控件
		document.getElementById("ActiveXDivOne").innerHTML = "<OBJECT id=\"axCam_Ocx\"  classid=\"clsid:D5BD5B4A-4FC0-4869-880B-27EE9869D706\" width=\"500px\" height=\"400px\" ></OBJECT>";
		//document.getElementById("ActiveXDivTwo").innerHTML = "<OBJECT id=\"axCam_Ocx2\"  classid=\"clsid:341014BA-CD4A-4918-A11F-8A33B152915A\" width=\"500px\" height=\"400px\" ></OBJECT>";
		OcxInit();
	} else {
		isIE = false;
		if(!window.WebSocket) {
			alert("WebSocket not supported by this browser!");
		}
		//其他浏览器加载控件
		document.getElementById("ActiveXDivOne").innerHTML = '<canvas id="cameraCanvas" style="width:100%;height:400px;"></canvas>';
		//document.getElementById("ActiveXDivTwo").innerHTML = " <canvas id=\"cameraCanvasSecond\" width=\"500px\" height=\"400px\" style=\"border:1px solid #d3d3d3;\">";
		WsInit(500, 400, 500, 400, true);
	}
}

//必需重写---获取设备名称(num为当前摄像头数量,strUsbNamr为摄像头名字数组)
function GetDevName(num, strUsbNamr) {
//	var obj = document.getElementById("DeviceName");
//	obj.options.length = 0;
//	for(var i = 0; i < num; i++) {
//		var objOption = document.createElement("option");
//		objOption.text = strUsbNamr[i];
//		objOption.value = i;
//		obj.options.add(objOption);
//	}
	for(var i = 0;i < strUsbNamr.length;i++){
		if(strUsbNamr[i] == 'USB2.0Camera'){
			hdCamidMain = i;
		}
	}
	if(num > 0) {
//		obj.options[camidMain].selected = true;
//		var obj2 = document.getElementById("DeviceName2");
//		obj2.options.length = 0;
		if(num > 1) {
			if(isSecondDev) {

//				for(var i = 0; i < num; i++) {
//					var objOption = document.createElement("option");
//					objOption.text = strUsbNamr[i];
//					objOption.value = i;
//					obj2.options.add(objOption);
//				}
//				obj2.options[camidSub].selected = true;
				OcxGetDeviceResolutionSecond();
			}
		}
	}

}

//必需重写---获取分辨率(data为分辨率数组,每2个为一组,宽高)
function GetDeviceResolution(data) {/*
	var obj = document.getElementById("Resolution");
	var max = 0;
	var maxIndex = 0;
	obj.options.length = 0;
	if(data.length > 0) {
		for(var i = 0; i < data.length / 2; i++) {
			var objOption = document.createElement("option");
			var ww = data[i * 2];
			var hh = data[i * 2 + 1];
			objOption.text = "" + ww + "*" + hh;
			objOption.value = i;
			obj.options.add(objOption);
			if(max < ww) {
				max = ww;
				maxIndex = i;
			}
		}
		obj.options[maxIndex].selected = true;

	}
*/}

//必需重写---获取分辨率副头(data为分辨率数组,每2个为一组,宽高)
function GetDeviceResolutionSecond(data) {
	var obj = document.getElementById("Resolution2");
	var max = 0;
	var maxIndex = 0;
	obj.options.length = 0;
	for(var i = 0; i < data.length / 2 - 1; i++) {
		var objOption = document.createElement("option");
		var ww = data[i * 2];
		var hh = data[i * 2 + 1];
		objOption.text = "" + ww + "*" + hh;
		objOption.value = i;
		obj.options.add(objOption);
		if(max < ww) {
			max = ww;
			maxIndex = i;
		}
	}
	obj.options[maxIndex].selected = true;

}

//必需重写---获取设备数量
function GetDevCount(camNum) {
	// CloseCam(); 
	// CloseCam2(); 
	// RefreshDevice();
	alert("摄像头数量:" + camNum);
}

//设备1初始化完成,可以进行相关操作
function LoadOver() {
	//StartVideo();
}

//设备2初始化完成,可以进行相关操作
function LoadOver2() {
	//StartVideo2();
}

//开启摄像头
function StartVideo(camidMain, width, height) {
//	var obj = document.getElementById("Resolution");
//	var restr = obj[obj.selectedIndex].text;
//	var pos = restr.lastIndexOf("*");
//	var width = parseInt(restr.substring(0, pos));
//	var height = parseInt(restr.substring(pos + 1, restr.length));
	//StartCam(camidMain, width, height);
	//默认设备及分辨率
	StartCam(camidMain, width, height);

}

//关闭摄像头
function CloseVideo() {
	CloseCam();
}

//抓图拍照
function Capture() {
	var type = 0;
//	if(document.getElementById("Radio1").checked) {
//		//不裁边
//		type = 0;
//	} else if(document.getElementById("Radio2").checked) {
//		//自动裁边
//		type = 1;
//	} else if(document.getElementById("Radio3").checked) {
//		//手动裁边
//		type = 2;
//	}
	CaptureImage(type);
}

//切换摄像头
function ChangeDevice() {
	CloseCam();
	var devObj = document.getElementById("DeviceName");
	camidMain = devObj.selectedIndex;
	ChangeCamDevice(camidMain);
}

//切换分辨率
function ChangeResolution() {
	CloseCam();
	var obj = document.getElementById("Resolution");
	var restr = obj[obj.selectedIndex].text;
	var pos = restr.lastIndexOf("*");
	var width = parseInt(restr.substring(0, pos));
	var height = parseInt(restr.substring(pos + 1, restr.length));
	StartCam(camidMain, width, height);

}

//设置图片类型
function SetFileType() {
	var type = document.getElementById("FileType").selectedIndex;
	SetImageType(type);
}

//设置图片颜色格式
function SetImageColorMode() {
	var type = document.getElementById("ColourMode").selectedIndex;
	SetColorMode(type);
}

//图像设置窗口
function ShowImageSettingWindow() {
	ShowSettingWindow();
}

//设置是否裁剪
function SetCutType() {
	var type = 0;

	if(document.getElementById("Radio1").checked) {
		type = 0;
	}
	if(document.getElementById("Radio2").checked) {
		type = 1;
	}
	if(document.getElementById("Radio3").checked) {
		type = 2;
	}
	SetCamCutType(type);
}

//设置智能连拍模式
function SetCaptureModel() {
	if(document.getElementById("Radio10").checked) {
		SetWiseCapture(0);
	}
	if(document.getElementById("Radio11").checked) {
		SetWiseCapture(1);
	}
	if(document.getElementById("Radio12").checked) {
		SetTimeCapture(1, 5000);
	}
}

//设置保存的文件路径
function SetFilePath() {
	var path = "C:\\MyIMG"
	SetImagePath(path);
	SetImagePath2(path);

}

//设置拍照时是否只返回base64
function funSetImagebase64() {
	var isCheck = document.getElementById("checkboxBase").checked;
	if(isCheck) {
		SetImagebase64(1);
	} else {
		SetImagebase64(0);
	}

}

//启动身份证模块
function funStartIC() {
	StartIC();
}

//启动身份证自动读卡
function funStartICWork() {
	StartICWork();
}

//关闭身份证自动读卡
function funStopICWork() {
	StopICWork();
}

function funGetOneIC() {
	GetOneIC();
}

function funGetICValues() {
	GetICValues();
}

//条码识别
function funReadBarCode() {
	var imgPath = "C:\\MyIMG\\barcode.jpg";
	ReadBarCode(imgPath);
}

//二维码识别
function funReadQrCode() {
	var imgPath = "C:\\MyIMG\\qrcode.jpg";
	ReadQrCode(imgPath);
}

//合并PDF
function funConvertToPDF() {
	var pat1 = "C:\\MyIMG\\add1.jpg";
	var pat2 = "C:\\MyIMG\\add2.jpg";
	var pat3 = "C:\\MyIMG\\add3.jpg";
	var pdfpath = "C:\\MyIMG\\Convert.pdf";
	AddPDFImageFile(pat1);
	AddPDFImageFile(pat2);
	AddPDFImageFile(pat3);
	SavePDF(pdfpath);

}

//图片合并
function funCombineTwoImage() {
	var dir = 1; // 1->垂直合并  2->水平合并
	if(document.getElementById("Radio4").checked) {
		dir = 1;
	}
	if(document.getElementById("Radio5").checked) {
		dir = 2;
	}

	var combinePath = "C:\\MyIMG\\CombineImg.jpg";
	var ImgPath1 = "C:\\MyIMG\\add1.jpg";
	var ImgPath2 = "C:\\MyIMG\\add2.jpg";
	CombineTwoImage(combinePath, ImgPath1, ImgPath2, dir);

}

//上传图片
function funUpdataFile() {
	UpdataFile("localhost", 19890, "/WebSite1/WebService.asmx/HelloWorld?cmd1=cmd1", "D:\\add1.jpg");
}

//刷新设备
function RefreshDev() {
	CloseCam();
	CloseCam2();
	RefreshDevice();
}

//根据文件路径获取base64
function fungetBase64() {

	var strpath = "D:\\1.jpg";
	GetBase64FromFile(strpath);
}

//设置水印
function SetWaterType() {
	if(document.getElementById("Radio6").checked) {
		CloseWaterMark();
	}
	if(document.getElementById("Radio7").checked) {
		var waterinfo = "我的水印";
		var FontSize = 50;
		var FontSytle = 0;
		var xOff = 100;
		var yOff = 100;
		OpenWaterMark(waterinfo, FontSize, FontSytle, 255, 0, 0, xOff, xOff);
	}
}

//设置自动裁边单图与多图
function funsetJiubianModel() {
	if(document.getElementById("Radio13").checked) {
		SetJiubianModel(0);
		// axCam_Ocx.CusCrop(0);
	} else if(document.getElementById("Radio14").checked) {
		SetJiubianModel(1);
	}
}

//设置四周补白
function funsetBuBai() {
	var isCheck = document.getElementById("checkbox2").checked;
	if(isCheck) {
		SetBuBai(1);
	} else SetBuBai(0);
}

//设置去灰
function funsetQudise() {
	var isCheck = document.getElementById("checkbox1").checked;
	if(isCheck) {
		SetQudise(1);
	} else SetQudise(0);
}

function funSetFileNameModel() {
	if(document.getElementById("Radio19").checked) {
		//自定义
		var num = 1;
		var name = "IMGAAA";
		SetFileNameCustom(name, num);

		var num2 = 10;
		var name2 = "IMGAAAsub";
		SetFileNameCustom2(name2, num2);
	} else if(document.getElementById("Radio20").checked) {
		//时间
		SetFileNameTime();
		SetFileNameTime2();
	} else if(document.getElementById("Radio21").checked) {
		//固定
		var name = "固定";
		SetFileNameFixed(name);

		var name2 = "固定ssss";
		SetFileNameFixed2(name2);
	}
}

function funSetAutoExposure() {
	if(document.getElementById("RadioExopen").checked) {
		SetAutoExposure(1);
	} else if(document.getElementById("RadioExclose").checked) {
		SetAutoExposure(0);
	}
}

function funGetCamParameter() {
	GetCamParameter();
}

function funSetExposure() {
	SetExposure(0);
}

function funSetBrightness() {
	SetBrightness(0);
}

function funGetCamNum() {
	GetCamNum();
}

function funDeleteFile() {
	var filename = "D:\\1.jpg";
	DeleteFile(filename);
}

var hide_show = 0;

function ShowHide() {

	if(hide_show == 0) {
		hide_show = 1;
		if(isIE) {
			document.getElementById("axCam_Ocx").style.visibility = "hidden";
		} else document.getElementById("cameraCanvas").style.visibility = "hidden";
	} else {
		hide_show = 0;
		if(isIE) {
			document.getElementById("axCam_Ocx").style.visibility = "visible";
		} else document.getElementById("cameraCanvas").style.visibility = "visible";
	}

}

function ShowInfo(op) {
	var obj = document.getElementById("TextArea1");
	obj.value = op + obj.value;
}
/*****************************副摄像头操作部分*******************************************

*****************************************************************************************/

//打开副摄像头
function StartVideo2() {
	if(camidSub >= 0) {
		var obj = document.getElementById("Resolution2");
		var restr = obj[obj.selectedIndex].text;
		var pos = restr.lastIndexOf("*");
		var width = parseInt(restr.substring(0, pos));
		var height = parseInt(restr.substring(pos + 1, restr.length));
		StartCam2(camidSub, width, height);
	}

}

//关闭副摄像头
function CloseVideo2() {
	CloseCam2();
}

//切换摄像头
function ChangeDevice2() {
	CloseCam2();
	var devObj = document.getElementById("DeviceName2");
	camidSub = devObj.selectedIndex;
	ChangeCamDevice2(camidSub);
}

//切换分辨率
function ChangeResolution2() {
	CloseCam2();
	var obj = document.getElementById("Resolution2");
	var restr = obj[obj.selectedIndex].text;
	var pos = restr.lastIndexOf("*");
	var width = parseInt(restr.substring(0, pos));
	var height = parseInt(restr.substring(pos + 1, restr.length));
	StartCam2(camidSub, width, height);

}

//副头拍照
function Capture2() {

	CaptureImage2();

}

function InfoCallback(op) {

	var text = "";
	if(op == 0) {
		text = "连接成功\r\n";
	} else if(op == 0x01) {
		text = "断开成功\r\n";
	} else if(op == 0x02) {
		text = "设备已经连接\r\n";
	} else if(op == 0x03) {
		text = "设备已经关闭\r\n";
	} else if(op == 0x04) {
		text = "拍照成功\r\n";
		//关闭弹框及设备
		photoAll.closeCam();
	} else if(op == 0x05) {
		text = "pdf添加文件成功\r\n";
	} else if(op == 0x06) {
		text = "pdf保存成功\r\n";
	} else if(op == 0x07) {
		text = "图片合并成功\r\n";
	} else if(op == 0x08) {
		text = "智能连拍启动\r\n";
	} else if(op == 0x09) {
		text = "定时连拍启动\r\n";
	} else if(op == 0x10) {
		text = "定时连拍成功\r\n";
	} else if(op == 0x11) {
		text = "定时连拍关闭\r\n";
	} else if(op == 0x12) {
		text = "文件上传服务器成功\r\n";
	} else if(op == 0x13) {
		text = "水印开启\r\n";
	} else if(op == 0x14) {
		text = "水印关闭\r\n";
	} else if(op == 0x15) {
		text = "此设备属于本公司\r\n";
	} else if(op == 0x16) {
		text = "此设备不属于本公司\r\n";
	} else if(op == 0x17) {
		text = "自动曝光启动\r\n";
	} else if(op == 0x18) {
		text = "自动曝光关闭\r\n";
	} else if(op == 0x19) {
		text = "身份证功能启动成功\r\n";
	} else if(op == 0x1a) {
		text = "身份证功能启动失败\r\n";
	} else if(op == 0x1b) {
		text = "身份证读卡成功\r\n";
	} else if(op == 0x1c) {
		text = "身份证读卡失败\r\n";
	} else if(op == 0x1d) {
		text = "重新操作\r\n";
	} else if(op == 0x1e) {
		text = "未发现模块\r\n";
	} else if(op == 0x1f) {
		text = "未启动身份证功能\r\n";
	} else if(op == 0x20) {
		text = "启动身份证自动读卡\r\n";
	} else if(op == 0x21) {
		text = "关闭身份证自动读卡\r\n";
	} else if(op == 0x22) {
		text = "启动拍照只生成base64\r\n";
	} else if(op == 0x23) {
		text = "关闭拍照只生成base64\r\n";
	} else if(op == 0xa0) {
		text = "没有对应分辨率\r\n";
	} else if(op == 0xa1) {
		text = "pdf没有添加任何文件\r\n";
	} else if(op == 0xa2) {
		text = "文件不存在\r\n";
	} else if(op == 0xa3) {
		text = "意外断开\r\n";
		//$yt_alert_Model.prompt('高拍仪驱动程序未安装！');
	} else if(op == 0xa4) {
		text = "连接不上\r\n";
	} else if(op == 0xa5) {
		text = "pdf添加文件不是jpg格式\r\n";
	} else if(op == 0xa6) {
		text = "没有发现摄像头\r\n";
	} else if(op == 0xa7) {
		text = "camid无效\r\n";
	} else if(op == 0xa8) {
		text = "图片尺寸太小\r\n";
	} else if(op == 0xa9) {
		text = "文件上传服务器失败\r\n";
	} else if(op == 0xaa) {
		text = "该设备没有副头\r\n";
	} else if(op == 0xab) {
		text = "条码识别失败\r\n";
	} else if(op == 0xac) {
		text = "二维码识别失败\r\n";
	} else if(op == 0xad) {
		text = "图片合并失败\r\n";
	} else if(op == 0xae) {
		text = "设置路径文件不存在\r\n";
	}
	//$yt_alert_Model.prompt(text);
	//var obj = document.getElementById("TextArea1");
	//obj.value = text + obj.value;
}

function InfoTextCallback(type, str) {
	console.log(str);
	var text = "";
	if(type == 0) {
		text = "图片路径:" + str + "\r\n";
		//var imgobj1 = document.getElementById("img1");
		//imgobj1.src = "data:;base64," + str;
		//拍照执行上传附件
		//UpdataFile($yt_option.fileUpIp, $yt_option.fileUpPort, $yt_option.fileUpUrl, str);
		photoAll.fileUpDataConfig(str);
		
	} else if(type == 1) {
		text = "默认路径:    " + str + "\r\n";

	} else if(type == 2) {
		text = "条码:    " + str + "\r\n";

	} else if(type == 3) {
		text = "文件上传服务器成功:" + str + "\r\n";

	} else if(type == 4) {
		text = "文件上传服务器失败:" + str + "\r\n";

	} else if(type == 5) {
		//text = "base64编码成功,请自行处理str\r\n";
		//text ="data:image/jpeg;base64," + str;
		//转换编码后调用接口上传附件
		photoAll.setFileUpLoadDom(str);
	} else if(type == 6) {
		text = "删除文件成功:" + str + "\r\n";
	} else if(type == 7) {
		text = "二维码:" + str + "\r\n";
	} else if(type == 8) {
		text = "拍照失败:" + str + "\r\n";
	} else if(type == 9) {
		text = "身份证名字:" + str + "\r\n";
	} else if(type == 10) {
		text = "身份证号码:" + str + "\r\n";
	} else if(type == 11) {
		text = "身份证性别:" + str + "\r\n";
	} else if(type == 12) {
		text = "身份证民族:" + str + "\r\n";
	} else if(type == 13) {
		text = "身份证生日:" + str + "\r\n";
	} else if(type == 14) {
		text = "身份证地址:" + str + "\r\n";
	} else if(type == 15) {
		text = "身份证签发机关:" + str + "\r\n";
	} else if(type == 16) {
		text = "身份证有效开始日期:" + str + "\r\n";
	} else if(type == 17) {
		text = "身份证有效截至日期:" + str + "\r\n";
	} else if(type == 18) {
		text = "安全模块号:" + str + "\r\n";
	} else if(type == 19) {
		//身份证头像
		var imgobj1 = document.getElementById("img1");
		imgobj1.src = "data:;base64," + str;
	} else if(type == 21) {
		//text = "base64编码成功,请自行处理str(副头)\r\n";
		//text ="data:;base64," +str+"\r\n";
		var imgobj1 = document.getElementById("img2");
		imgobj1.src = "data:;base64," + str;
	} else if(type == 22) {
		text = "曝光范围:" + str + "\r\n";
	} else if(type == 23) {
		text = "亮度范围:" + str + "\r\n";
	}
	
	//$yt_alert_Model.prompt(text);
	//var obj = document.getElementById("TextArea1");
	//obj.value = text + obj.value;
}