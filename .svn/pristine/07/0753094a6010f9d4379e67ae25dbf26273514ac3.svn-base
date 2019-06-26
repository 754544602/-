var isSecondDev = true; //是否有两个canvas显示视频

var camidMain = 0;
var camidSub = 0;
var imgNum = 0;
var imgCheckArray = new Array();
var imgPathArray = new Array();
//必需
if(!window.WebSocket) {
	alert("WebSocket not supported by this browser!");
}
//必需---关闭浏览器时同时关闭设备
window.onbeforeunload = function(event) {
	sendMsgCloseVideo();
	sendMsgCloseVideoSecond();
}

function onload() {
	
}

//必需重写--断开提示
function Disconnect(type) {
	if(type == 0) {
		alert("意外断开");
	} else {
		alert("sdk未启动失败");
	}
}

//必需重写---获取设备数量
function GetDevCount(camNum) {
	var obj = document.getElementById("TextArea1");
	var text = "摄像头数量: " + camNum + "\r\n";
	obj.value = text + obj.value;
}

//必需重写---获取设备名称
function GetDevFriendName(num, strUsbNamr) {
//	var obj = document.getElementById("DeviceName");
//	obj.options.length = 0;
//	for(var i = 0; i < num; i++) {
//		var objOption = document.createElement("option");
//		objOption.text = strUsbNamr[i];
//		objOption.value = i;
//		obj.options.add(objOption);
//	}
//	obj.options[camidMain].selected = true;
//	if(num > 1) {
//		if(isSecondDev) {
//			var obj2 = document.getElementById("DeviceNameSecond");
//
//			obj2.options.length = 0;
//			for(var i = 0; i < num; i++) {
//				var objOption = document.createElement("option");
//				objOption.text = strUsbNamr[i];
//				objOption.value = i;
//				obj2.options.add(objOption);
//			}
//			obj2.options[camidSub].selected = true;
//			sendMsgGetResolutionSecond(camidSub);
//		}
//	}

	//StartVideo();
}

//必需重写---获取分辨率
function GetDeviceResolution(data) {
//	var obj = document.getElementById("Resolution");
//	var max = 0;
//	var maxIndex = 0;
//	obj.options.length = 0;
//	for(var i = 0; i < data.length / 2; i++) {
//		var objOption = document.createElement("option");
//		var ww = data[i * 2];
//		var hh = data[i * 2 + 1];
//		objOption.text = "" + ww + "*" + hh;
//		objOption.value = i;
//		obj.options.add(objOption);
//		if(max < ww) {
//			max = ww;
//			maxIndex = i;
//		}
//	}
//	obj.options[maxIndex].selected = true;

	// StartVideo();
}

//必需重写---获取分辨率(副头)
function GetDeviceResolutionSecond(data) {
	var obj = document.getElementById("ResolutionSecond");
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

//必需重写---亮度的范围
function GetBrightnessRange(min, max) {

	document.getElementById("resultBrightness").innerHTML = "范围:" + min + "至" + max;

}
//必需重写---获取曝光范围
function GetExposureRange(min, max) {
	document.getElementById("resultExposure").innerHTML = "范围:" + min + "至" + max;

}

//刷新扫描设备
function RefreshDev() {
	sendMsgCloseVideo();
	sendMsgRefreshDev();
}

//重新设置参数
function initParameter() {
	sendMsgSetCutType(0);
	sendMsgSetImageColorMode(0);
	sendMsgSetJiubianModel(0);
	sendMsgSetFileType(0);
	sendMsgChangeOrientation(0);
	sendMsgSetConntinousShotModel(0);
	sendMsgSetFileNameModelTime();
	canvasOrignalSize();
	sednMsgBubaiType(0);

}

function StartVideo() {
//	var devObj = document.getElementById("DeviceName");
//	var resObj = document.getElementById("Resolution");
//	var camId = devObj.selectedIndex;
//	var restr = resObj[resObj.selectedIndex].text;
//	var pos = restr.lastIndexOf("*");
//	var width = parseInt(restr.substring(0, pos));
//	var height = parseInt(restr.substring(pos + 1, restr.length));
	//设置设备数量及默认分辨率
	//sendMsgStartVideo(camId, width, height);
	sendMsgStartVideo(0, 3264, 2448);
	initParameter();
}

function StartVideo2() {

	var devObj = document.getElementById("DeviceNameSecond");
	var resObj = document.getElementById("ResolutionSecond");
	var camId = devObj.selectedIndex;
	var restr = resObj[resObj.selectedIndex].text;
	var pos = restr.lastIndexOf("*");
	var width = parseInt(restr.substring(0, pos));
	var height = parseInt(restr.substring(pos + 1, restr.length));
	sendMsgStartVideo2(camId, width, height);
}

//捕抓画面
function Capture() {
	//不裁边
		var type = 0;
		sendMsgCapture(type);
//	if(document.getElementById("Radio1").checked) {
//		//不裁边
//		var type = 0;
//		sendMsgCapture(type);
//	} else if(document.getElementById("Radio2").checked) {
//		//自动裁边
//		var type = 1;
//		sendMsgCapture(type);
//	} else if(document.getElementById("Radio3").checked) {
//		//手动裁边
//		var type = 2;
//		sendMsgCapture(type);
//
//	}

}

function Zoomout() {
	//放大
	sendMsgZoom(1);
}

function Zoomin() {
	//缩小
	sendMsgZoom(0);
}

function fitSize() {
	canvasX = 0;
	canvasY = 0;
	//合适尺寸
	sendMsgZoom(2);
}

function realSize() {
	canvasX = 0;
	canvasY = 0;
	//1:1
	sendMsgZoom(3);
}
//设置画面显示方向
function changeOrientation() {
	if(document.getElementById("Radio6").checked) {
		//水平方向
		sendMsgChangeOrientation(0);
	} else if(document.getElementById("Radio7").checked) {
		//90
		sendMsgChangeOrientation(1);
	} else if(document.getElementById("Radio8").checked) {
		//180
		sendMsgChangeOrientation(2);
	} else if(document.getElementById("Radio9").checked) {
		//270
		sendMsgChangeOrientation(3);
	}
}

//设置图片颜色
function SetImageColorMode() {
	if(document.getElementById("Radio10").checked) {
		//彩色
		sendMsgSetImageColorMode(0);
	} else if(document.getElementById("Radio11").checked) {
		//灰色
		sendMsgSetImageColorMode(1);
	} else if(document.getElementById("Radio12").checked) {
		//黑白
		sendMsgSetImageColorMode(2);
	}
}

//修改分辨率
function changeResolution() {
	sendMsgCloseVideo();
	var devObj = document.getElementById("DeviceName");
	var resObj = document.getElementById("Resolution");
	var camId = devObj.selectedIndex;
	var restr = resObj[resObj.selectedIndex].text;
	var pos = restr.lastIndexOf("*");
	var width = parseInt(restr.substring(0, pos));
	var height = parseInt(restr.substring(pos + 1, restr.length));
	sendMsgChangeResolution(camId, width, height);
}

//修改分辨率(副头)
function changeResolutionSecond() {
	sendMsgCloseVideoSecond();
	var devObj = document.getElementById("DeviceNameSecond");
	var resObj = document.getElementById("ResolutionSecond");
	var camId = devObj.selectedIndex;
	var restr = resObj[resObj.selectedIndex].text;
	var pos = restr.lastIndexOf("*");
	var width = parseInt(restr.substring(0, pos));
	var height = parseInt(restr.substring(pos + 1, restr.length));
	sendMsgStartVideo2(camId, width, height);
}

//设置裁边模式
function SetCutType() {
	canvasX = 0;
	canvasY = 0;
	if(document.getElementById("Radio1").checked) {
		//不裁边
		sendMsgSetCutType(0);
	} else if(document.getElementById("Radio2").checked) {
		//自动裁边
		sendMsgSetCutType(1);
	} else if(document.getElementById("Radio3").checked) {
		//手动裁边
		sendMsgSetCutType(2);
	}
}

//设置自动裁边的数量
function SetJiubianModel() {
	if(document.getElementById("Radio4").checked) {
		//单图
		sendMsgSetJiubianModel(0);
	} else if(document.getElementById("Radio5").checked) {
		//多图
		sendMsgSetJiubianModel(1);
	}
}

//设置文件路径
function setFilePath() {
	var path = "C:";
	sendMsgSetFilePath(path);
}

//设置文件保存的格式
function SetFileType() {
	if(document.getElementById("Radio13").checked) {
		//jpg
		sendMsgSetFileType(0);
	} else if(document.getElementById("Radio14").checked) {
		//png
		sendMsgSetFileType(1);
	} else if(document.getElementById("Radio15").checked) {
		//bmp
		sendMsgSetFileType(2);
	} else if(document.getElementById("Radio30").checked) {
		//pdf
		sendMsgSetFileType(3);
	} else if(document.getElementById("Radio31").checked) {
		//gif
		sendMsgSetFileType(4);
	} else if(document.getElementById("Radio32").checked) {
		//tif
		sendMsgSetFileType(5);
	}
}

//连拍模式
function SetConntinousShotModel() {
	if(document.getElementById("Radio16").checked) {
		//关闭
		sendMsgSetConntinousShotModel(0);
	} else if(document.getElementById("Radio17").checked) {
		//智能连拍
		sendMsgSetConntinousShotModel(1);
	} else if(document.getElementById("Radio18").checked) {
		//定时连拍
		sendMsgSetConntinousShotModelTime(500);
	}
}

//文件命名
function setFileNameModel() {
	if(document.getElementById("Radio19").checked) {
		//自定义
		var num = 1;
		var name = "IMGAAA";
		sendMsgSetFileNameModelCustom(num, name)
	} else if(document.getElementById("Radio20").checked) {
		//时间
		sendMsgSetFileNameModelTime();
	} else if(document.getElementById("Radio21").checked) {
		//固定
		var name = "固定";
		sendMsgSetFileNameModelFixed(name);
	} else if(document.getElementById("Radio22").checked) {
		sendMsgSetFileNameModelBarcode();
	}

}

function savePDF() {
	var path = "d:\\保存的pdf文档.pdf";
	sednMsgSavePDF(path);
}

function addPDF() {
	var path = "d:\\1.jpg";
	sednMsgAddPDF(path);
	var path2 = "d:\\2啊.jpg";
	sednMsgAddPDF(path2);
}

//水平合并
function combineImageH() {
	var path1 = "d:\\1.jpg";
	var path2 = "d:\\2.jpg";
	var path3 = "d:\\水平合并.jpg";

	sendMsgCombineTwoImage(path1, path2, path3, 0);
}
//垂直合并
function combineImageV() {
	var path1 = "d:\\1.jpg";
	var path2 = "d:\\2.jpg";
	var path3 = "d:\\垂直合并.jpg";

	sendMsgCombineTwoImage(path1, path2, path3, 1);
}

function canvasOrignalSize() {
	sendMsgSetCanvasOriginalSize(600, 600);
}

function canvasOrignalSize2() {
	sendMsgSetCanvasOriginalSize(2500, 2000);
}

function canvasSecondOrignalSize(w, h) {
	sendMsgSetCanvasSecondOriginalSize(w, h);
}

function changeDevice() {
	sendMsgCloseVideo();
	var devObj = document.getElementById("DeviceName");
	var camId = devObj.selectedIndex;
	sendMsgGetResolution(camId);
}

function changeDeviceSecond() {
	sendMsgCloseVideoSecond();
	var devObj = document.getElementById("DeviceNameSecond");
	var camId = devObj.selectedIndex;
	sendMsgGetResolutionSecond(camId);
}

//上传文件
function uploadFile(filename) {
	//http://localhost:19890/WebSite1/WebService.asmx/HelloWorld?cmd1=cmd1
	var port = 19890;
	var uploadSerHead = "localhost";
	var uploadSerLast = "/WebSite1/WebService.asmx/HelloWorld?cmd1=cmd1";
	sendMsgUploadFilePort(port, uploadSerHead, uploadSerLast, filename);

}

//启动水印
function openWaterMark() {
	var text = "水印测试"; //内容
	var fontSize = 40; //字体大小
	var fontStyleIndex = 0; //字体样式(0宋体, 1黑体 2幼圆 3楷体 4新宋体)
	var r = 255; //颜色r
	var g = 255; //颜色g
	var b = 0; //颜色b
	var xoffset = 100; //x轴偏移(0-100)
	var yoffset = 0; //y轴偏移(0-100)
	sednMsgWaterMarkOpen(text, fontSize, fontStyleIndex, r, g, b, xoffset, yoffset);
}

//关闭水印
function closeWaterMark() {
	sednMsgWaterMarkClose();
}

//黑边补白
function SetBubaiType() {
	if(document.getElementById("Radio33").checked) {
		//启动
		sednMsgBubaiType(1);
	} else if(document.getElementById("Radio34").checked) {
		//关闭
		sednMsgBubaiType(0);
	}
}

function OpenAutoExposure() {
	sendMsgSetAutoExposure(1);

}

function CloseAutoExposure() {
	sendMsgSetAutoExposure(0);

}

function SetBrightness() {
	var temp = parseInt(document.getElementById("TextAreaBrightness").value);
	sendMsgSetBrightness(temp);
}

function SetExposure() {
	var temp = parseInt(document.getElementById("TextAreaExposure").value);
	sendMsgSetExposure(temp);
}

function SetQuqudiseType() {
	if(document.getElementById("Radio35").checked) {
		//启动
		sednMsgQuqudiseType(1);
	} else if(document.getElementById("Radio36").checked) {
		//关闭
		sednMsgQuqudiseType(0);
	}
}

function GetBase64() {
	var filename = "D:\\2.jpg";
	sednMsgGetBase64(filename);
}

function DeleteFile() {
	var filename = "D:\\1.jpg";
	sendMsgDeleteFile(filename);
}

function QrCode() {
	var filename = "D:\\2.jpg";
	sendMsgQrcode(filename);
}

function GetICValues() {
	for(var i = 0; i < 10; i++) {
		sendMsgGetICValues(i);
	}
}

function InfoCallback(op) {
	var obj = document.getElementById("TextArea1");
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
		//text = "此设备属于本公司\r\n";
	} else if(op == 0x16) {
		//text = "此设备不属于本公司\r\n";
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
	} else if(op == 0xa0) {
		text = "没有对应分辨率\r\n";
	} else if(op == 0xa1) {
		text = "pdf没有添加任何文件\r\n";
	} else if(op == 0xa2) {
		text = "文件不存在\r\n";
	} else if(op == 0xa3) {
		text = "意外断开\r\n";
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
	}
	$yt_alert_Model.prompt(text);
	//obj.value = text + obj.value;
}

function InfoTextCallback(type, str) {
	var obj = document.getElementById("TextArea1");
	var text = "";
	if(type == 0) {
		text = "图片路径:" + str + "\r\n";
		addPic(str);
		//uploadFile(str);
	} else if(type == 1) {
		text = "默认路径:    " + str + "\r\n";

	} else if(type == 2) {
		text = "条码:    " + str + "\r\n";

	} else if(type == 3) {
		text = "文件上传服务器成功:" + str + "\r\n";

	} else if(type == 4) {
		text = "文件上传服务器失败:" + str + "\r\n";

	} else if(type == 5) {
		// text = "base64编码成功\r\n";
		text = "base64编码:" + "data:;base64," + str + "\r\n";

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
		var imgobj1 = document.getElementById("img1");
		imgobj1.src = "data:;base64," + str;
	}
	obj.value = text + obj.value;
}

function addPic(path) {
	debugger;

	//var d1 = document.getElementById("image_container");

	var str = "img" + imgNum;
	imgPathArray[imgNum] = path;
	if(!isIE()) {
		path = "file:\\" + path;
	}

	var img = document.createElement("img");
	img.setAttribute("id", str);
	img.setAttribute("style", "margin-left: 6px; margin-top: 6px;");

	img.src = path;
	img.height = 120;
	img.width = 200;

	img.onclick = function(event) {
		event = event ? event : window.event;
		var obj = event.srcElement ? event.srcElement : event.target;
		// var path = obj.href; 
		var path;
		if(!isIE()) {
			path = obj.currentSrc;
		} else path = obj.href;
		window.open(path, 'newwindow', 'height=600,width=800,top=0,left=0,toolbar=no,menubar=no,scrollbars=yes, resizable=yes,location=no, status=no')

	}

	var checkBox = document.createElement("input");
	checkBox.setAttribute("type", "checkbox");
	checkBox.setAttribute("value", imgNum);
	checkBox.onclick = function(event) {
		event = event ? event : window.event;
		var obj = event.srcElement ? event.srcElement : event.target;
		if(obj.checked) {
			imgCheckArray[obj.value] = 1;
		} else imgCheckArray[obj.value] = 0;
	}

	//d1.appendChild(img);
	//d1.appendChild(checkBox);

	imgNum++;

}

function clearimgPathArray() {
	document.getElementById('image_container').innerHTML = '';
	for(var i = 0; i < imgNum; i++) {
		imgCheckArray[i] = 0;
	}
	imgNum = 0;
}

function uploadFileCheck() {
	for(var i = 0; i < imgNum; i++) {
		if(imgCheckArray[i] == 1) {
			uploadFile(imgPathArray[i]);
		}
	}
}