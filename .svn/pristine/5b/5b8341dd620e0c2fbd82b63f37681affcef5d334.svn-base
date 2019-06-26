var SupportFormat; //设备支持的视频格式代号：1->MJPG; 2->YUY2 
var OpenFormat; //打开格式：0->YUY；1->MJPG
var SupportFormat2; //设备支持的视频格式代号：1->MJPG; 2->YUY2 
var OpenFormat2; //打开格式：0->YUY；1->MJPG

function OcxInit() {
	var strUsbNamr = new Array();
	var numCam = axCam_Ocx.GetDevCount();
	for(var i = 0; i < numCam; i++) {
		strUsbNamr[i] = axCam_Ocx.GetDevFriendName(i);
	}
	camidMain = axCam_Ocx.GetMainCameraID(1);
	camidSub = axCam_Ocx.GetSecondCameraID();
	GetDevName(numCam, strUsbNamr);

	var FormatSum = axCam_Ocx.GetFormatCount(camidMain);
	switch(FormatSum) {
		case 1: //（设备只支持MJPG格式）
			OpenFormat = 1; //打开格式为MJPG
			SupportFormat = 1;
			break;
		case 2: //（设备只支持YUY2格式）
			OpenFormat = 0; //打开格式为YUY
			SupportFormat = 2;
			break;
		case 3: //（设备支持MJPG与YUY2两种格式）
			OpenFormat = 1; //默认打开格式为MJPG
			SupportFormat = 1;
			break;

	}

	OcxGetDeviceResolution();
}

//获取分辨率
function OcxGetDeviceResolution() {
	var resCount = axCam_Ocx.GetResolutionCount(camidMain, SupportFormat);
	var dataResolution = new Array();
	var num = 0;
	for(var i = 0; i < resCount; i++) {
		var restr = axCam_Ocx.GetResolution(i);
		var pos = restr.lastIndexOf("*");
		var width = parseInt(restr.substring(0, pos));
		var height = parseInt(restr.substring(pos + 1, restr.length));
		dataResolution[num] = width;
		num++;
		dataResolution[num] = height;
		num++;
	}
	GetDeviceResolution(dataResolution);
}

function OcxGetDeviceResolutionSecond() {
	if(isIE) {
		//camidSub = axCam_Ocx.GetSecondCameraID();
		if(camidSub >= 0) {
			var FormatSum = axCam_Ocx2.GetFormatCount(camidSub);
			switch(FormatSum) {
				case 1: //（设备只支持MJPG格式）
					OpenFormat2 = 1; //打开格式为MJPG
					SupportFormat2 = 1;
					break;
				case 2: //（设备只支持YUY2格式）
					OpenFormat2 = 0; //打开格式为YUY
					SupportFormat2 = 2;
					break;
				case 3: //（设备支持MJPG与YUY2两种格式）
					OpenFormat2 = 1; //默认打开格式为MJPG
					SupportFormat2 = 1;
					break;

			}

			var resCount = axCam_Ocx2.GetResolutionCount(camidSub, SupportFormat2);
			var dataResolution = new Array();
			var num = 0;
			for(var i = 0; i < resCount; i++) {
				var restr = axCam_Ocx2.GetResolution(i);
				var pos = restr.lastIndexOf("*");
				var width = parseInt(restr.substring(0, pos));
				var height = parseInt(restr.substring(pos + 1, restr.length));
				dataResolution[num] = width;
				num++;
				dataResolution[num] = height;
				num++;
			}
			GetDeviceResolutionSecond(dataResolution);
		}

	} else {
		sendMsgGetResolutionSecond(camidSub);
	}
}

//
function StartCam(CamID, width, height) {
	if(isIE) {
		var i = axCam_Ocx.CAM_Open(CamID, OpenFormat, width, height);
		if(i == 0) InfoCallback(0x00);
		else if(i == -1) InfoCallback(0x16);
		else InfoCallback(0x02);
	} else {
		sendMsgStartVideo(CamID, width, height);
	}
}

function StartCam2(CamID, width, height) {
	if(isIE) {
		var i = axCam_Ocx2.CAM_Open(CamID, OpenFormat2, width, height);
		if(i == 0) InfoCallback(0x00);
		else if(i == -1) InfoCallback(0x16);
		else InfoCallback(0x02);
	} else {
		sendMsgStartVideo2(CamID, width, height);
	}
}

function CloseCam() {
	if(isIE) {
		axCam_Ocx.CAM_Close();
		InfoCallback(0x01);
	} else sendMsgCloseVideo();
}

function CloseCam2() {
	if(isIE) {
		axCam_Ocx2.CAM_Close();
		InfoCallback(0x01);
	} else sendMsgCloseVideoSecond();
}

function CaptureImage(type) {
	if(isIE) {
		axCam_Ocx.CaptureImage();
	} else {
		sendMsgCapture(type);
	}
}

function CaptureImage2() {
	if(isIE) {
		axCam_Ocx2.CaptureImage();
	} else {
		sendMsgCaptureSecond();
	}
}

function ChangeCamDevice(CamID) {

	if(isIE) {
		var FormatSum = axCam_Ocx.GetFormatCount(CamID);
		switch(FormatSum) {
			case 1: //（设备只支持MJPG格式）
				OpenFormat = 1; //打开格式为MJPG
				SupportFormat = 1;
				break;
			case 2: //（设备只支持YUY2格式）
				OpenFormat = 0; //打开格式为YUY
				SupportFormat = 2;
				break;
			case 3: //（设备支持MJPG与YUY2两种格式）
				OpenFormat = 1; //默认打开格式为MJPG
				SupportFormat = 1;
				break;

		}
		OcxGetDeviceResolution();
	} else {
		sendMsgGetResolution(CamID);
	}
}

function ChangeCamDevice2(CamID) {

	if(isIE) {
		var FormatSum = axCam_Ocx2.GetFormatCount(CamID);
		switch(FormatSum) {
			case 1: //（设备只支持MJPG格式）
				OpenFormat = 1; //打开格式为MJPG
				SupportFormat = 1;
				break;
			case 2: //（设备只支持YUY2格式）
				OpenFormat = 0; //打开格式为YUY
				SupportFormat = 2;
				break;
			case 3: //（设备支持MJPG与YUY2两种格式）
				OpenFormat = 1; //默认打开格式为MJPG
				SupportFormat = 1;
				break;

		}
		OcxGetDeviceResolutionSecond();
	} else {
		sendMsgGetResolutionSecond(CamID);
	}
}

function SetColorMode(type) {
	if(isIE) {
		axCam_Ocx.SetImageColorMode(type);
	} else {
		sendMsgSetImageColorMode(type);
	}
}

function ShowSettingWindow() {
	if(isIE) {
		axCam_Ocx.ShowImageSettingWindow();
	} else {
		sendMsgShowImageSettingWindow();
	}
}

function SetCamCutType(type) {
	if(isIE) {
		if(type == 2) {
			axCam_Ocx.CusCrop(1);
		} else axCam_Ocx.SetAutoCut(type);
	} else sendMsgSetCutType(type);

}

function SetImageType(type) {
	if(isIE) {
		axCam_Ocx.SetFileType(type);
	} else {
		if(type > 2) type++;
		sendMsgSetFileType(type);
	}
}

//放大
function ZoomOut() {
	if(isIE) {
		axCam_Ocx.CAM_ZoomOut();
	} else sendMsgZoom(1);
}

//缩小
function ZoomIn() {
	if(isIE) {
		axCam_Ocx.CAM_ZoomIn();
	}
	sendMsgZoom(0);
}

//左旋
function RoateL() {
	if(isIE) {
		axCam_Ocx.CAM_RotateL();
	} else sendMsgRotateL();

}

//右旋
function RoateR() {
	if(isIE) {
		axCam_Ocx.CAM_RotateR();
	} else sendMsgRotateR();
}

//适合大小
function BestSize() {
	if(isIE) {
		axCam_Ocx.BestSize();
	} else {
		sendMsgBestSize();
	}
}

//实际大小
function TrueSize() {
	if(isIE) {
		axCam_Ocx.TrueSize();
	} else {
		sendMsgTrueSize();
	}
}

function SetWiseCapture(type) {
	if(isIE) {
		axCam_Ocx.WiseCapture(type);

	} else {
		sendMsgSetConntinousShotModel(type);
	}
}

function SetTimeCapture(type, time) {
	if(isIE) {
		axCam_Ocx.TimeCapture(type, time);
	} else {
		time = time / 10;
		sendMsgSetConntinousShotModelTime(time);
	}
}

function SetImagePath(path) {
	if(isIE) {
		var ret = axCam_Ocx.setFilePath(path);
		if(ret == 0) {
			InfoTextCallback(1, path);
		} else InfoCallback(0xae);
	} else {
		sendMsgSetFilePath(path);
	}
}

function SetImagePath2(path) {
	if(isIE) {
		var ret = axCam_Ocx2.setFilePath(path);
		if(ret == 0) {
			InfoTextCallback(1, path);
		} else InfoCallback(0xae);
	}
}

function RefreshDevice() {
	if(isIE) {
		OcxInit();
	} else {

		sendMsgRefreshDev();
	}
}

function SetImagebase64(type) {
	if(isIE) {
		axCam_Ocx.IsImageBase64(type);
		axCam_Ocx2.IsImageBase64(type);
	} else {
		sendMsgShotBase64(type);
	}
}

function StartIC() {
	if(isIE) {
		axCam_Ocx.StartIDCard();
		InfoCallback(0x19);
	} else {
		sendMsgStartIDCard();
	}
}

function StartICWork() {
	if(isIE) {
		var ret = axCam_Ocx.WorkIDCard(1);
		if(ret == 0) {
			InfoCallback(0x20);
		} else if(ret == -2) {
			InfoCallback(0x1f);
		}
	} else {
		sendMsgWorkIDCard();
	}
}

function StopICWork() {
	if(isIE) {
		var ret = axCam_Ocx.WorkIDCard(0);
		if(ret == 0) {
			InfoCallback(0x21);
		} else if(ret == -2) {
			InfoCallback(0x1f);
		}
	} else {
		sendMsgStopWorkIDCard();
	}
}

function GetOneIC() {
	if(isIE) {
		var ret = axCam_Ocx.GetOneIC();
		if(ret == 0) {
			InfoCallback(0x1b);
		} else if(ret == -1) {
			InfoCallback(0x1d);
		} else if(ret == -2) {
			InfoCallback(0x1c);
		} else if(ret == -3) {
			InfoCallback(0x1e);
		} else if(ret == -4) {
			InfoCallback(0x1f);
		}
	} else {
		sendMsgGetOneIC();
	}
}

function GetICValues() {
	if(isIE) {
		var name = axCam_Ocx.GetICValues("NAME");
		if(name.length > 0) {
			InfoTextCallback(9, name);

			var IC = axCam_Ocx.GetICValues("IC");
			InfoTextCallback(10, IC);

			var SEX = axCam_Ocx.GetICValues("SEX");
			InfoTextCallback(11, SEX);

			var NATION = axCam_Ocx.GetICValues("NATION");
			InfoTextCallback(12, NATION);

			var BIRTHDAY = axCam_Ocx.GetICValues("BIRTHDAY");
			InfoTextCallback(13, BIRTHDAY);

			var ADDRESS = axCam_Ocx.GetICValues("ADDRESS");
			InfoTextCallback(14, ADDRESS);

			var SIGNDEPT = axCam_Ocx.GetICValues("SIGNDEPT");
			InfoTextCallback(15, SIGNDEPT);

			var VALIDSTARTDATE = axCam_Ocx.GetICValues("VALIDSTARTDATE");
			InfoTextCallback(16, VALIDSTARTDATE);

			var VALIDENDDATE = axCam_Ocx.GetICValues("VALIDENDDATE");
			InfoTextCallback(17, VALIDENDDATE);

			var SAMID = axCam_Ocx.GetICValues("SAMID");
			InfoTextCallback(18, SAMID);

			var picBase64 = axCam_Ocx.GetICPicture();
			InfoTextCallback(19, picBase64);
		}

	} else {
		for(var i = 0; i < 11; i++) {
			sendMsgGetICValues(i);
		}
	}
}

function ReadBarCode(imgPath) {
	if(isIE) {
		var CodeStr = axCam_Ocx.GetBarcodeContent(imgPath);
		if(CodeStr.length > 0) {
			InfoTextCallback(2, CodeStr);
		} else {
			InfoCallback(0xab);
		}
	} else {
		sendMsgBarcode(imgPath);
	}

}

function ReadQrCode(imgPath) {
	if(isIE) {
		var CodeStr = axCam_Ocx.GetQRcodeContent(imgPath);
		InfoTextCallback(7, CodeStr);
	} else {
		sendMsgQrcode(imgPath);
	}
}

function AddPDFImageFile(imgPath) {
	if(isIE) {
		var ret = axCam_Ocx.AddPDFImageFile(imgPath, "", 0);
		if(ret == 0) {
			InfoCallback(0x05);
		} else if(ret == -1) {
			InfoCallback(0xa5);
		}
	} else {
		sednMsgAddPDF(imgPath);
	}
}

function SavePDF(path) {
	if(isIE) {
		var ret = axCam_Ocx.Convert2PDF(path);
		if(ret == 0) {
			InfoCallback(0x06);
		} else if(ret == -1) {
			InfoCallback(0xa1);
		}
	} else {
		sednMsgSavePDF(path);
	}
}

function CombineTwoImage(combinePath, ImgPath1, ImgPath2, dir) {
	if(isIE) {
		var ret = axCam_Ocx.CombineTwoImage(combinePath, ImgPath1, ImgPath2, dir);
		if(ret == 0) {
			InfoCallback(0x07);
		} else {
			InfoCallback(0xad);
		}
	} else {
		if(dir != 1) dir = 0;
		sendMsgCombineTwoImage(ImgPath1, ImgPath2, combinePath, dir);
	}
}

function UpdataFile(ip, port, method, imgPath) {
	if(isIE) {
		var ret = axCam_Ocx.UpdataFile(ip, port, method, imgPath);
		if(ret == 0) {
			InfoCallback(0x12);
		} else {
			InfoCallback(0xa9);
		}
	} else {
		sendMsgUploadFilePort(port, ip, method, imgPath);
	}
}

function GetBase64FromFile(path) {
	if(isIE) {
		var basestr = axCam_Ocx.GetBase64FromFile(path);
		InfoTextCallback(5, basestr);
	} else {
		sednMsgGetBase64(path);
	}
}

function CloseWaterMark() {
	if(isIE) {
		axCam_Ocx.SetAddMark(0);
	} else {
		sednMsgWaterMarkClose();
	}
}

function OpenWaterMark(waterinfo, FontSize, FontSytle, r, g, b, xOff, xOff) {
	if(isIE) {
		axCam_Ocx.SetAddMark(1);
		axCam_Ocx.SetWaterMark(waterinfo, FontSize, FontSytle, r, g, b, xOff, xOff);
	} else {
		sednMsgWaterMarkOpen(waterinfo, FontSize, FontSytle, r, g, b, xOff, xOff);
	}
}

function SetJiubianModel(type) {
	if(isIE) {
		axCam_Ocx.setJiubianModel(type);
	} else {
		sendMsgSetJiubianModel(type);
	}
}

function SetBuBai(type) {
	if(isIE) {
		axCam_Ocx.setBuBai(type);
	} else {
		sednMsgBubaiType(type);
	}
}

function SetQudise(type) {
	if(isIE) {
		axCam_Ocx.setQudise(type);
	} else {
		sednMsgQuqudiseType(type);
	}
}

function SetFileNameCustom(str, index) {

	if(isIE) {
		axCam_Ocx.setFileNameCustom(str, index);
	} else {
		sendMsgSetFileNameModelCustom(index, str);
	}

}

function SetFileNameCustom2(str, index) {

	if(isIE) {
		axCam_Ocx2.setFileNameCustom(str, index);
	} else {
		sendMsgSetFileNameModelCustomSecond(index, str);
	}

}

function SetFileNameFixed(str) {
	if(isIE) {
		axCam_Ocx.setFileNameFixed(str);
	} else {
		sendMsgSetFileNameModelFixed(str);
	}

}

function SetFileNameFixed2(str) {
	if(isIE) {
		axCam_Ocx2.setFileNameFixed(str);
	} else {
		sendMsgSetFileNameModelFixedSecond(str);
	}

}

function SetFileNameTime() {
	if(isIE) {
		axCam_Ocx.setFileNameTime();
	} else {
		sendMsgSetFileNameModelTime();
	}
}

function SetFileNameTime2() {
	if(isIE) {
		axCam_Ocx2.setFileNameTime();
	} else {
		sendMsgSetFileNameModelTimeSecond();
	}
}

function SetAutoExposure(type) {

	if(isIE) {
		axCam_Ocx.SetAutoExposure(type);
		if(type == 1) {
			InfoCallback(0x17);

		} else if(type == 0) {
			InfoCallback(0x18);
		}
	} else {
		sendMsgSetAutoExposure(type);
	}

}

function GetCamParameter() {
	if(isIE) {
		var brightnessValue = axCam_Ocx.GetBrightnessRange();
		InfoTextCallback(23, brightnessValue);
		var exposureValue = axCam_Ocx.GetExposureRange();
		InfoTextCallback(22, exposureValue);

	} else {
		sendMsgGetExposureRange();
		sendMsgGetBrightnessRange();

	}
}

function SetExposure(value) {
	if(isIE) {
		axCam_Ocx.SetExposure(value);
	} else {
		sendMsgSetExposure(value);
	}

}

function SetBrightness(value) {
	if(isIE) {
		axCam_Ocx.SetBrightness(value)
	} else {
		sendMsgSetBrightness(value);
	}

}

function GetCamNum() {
	if(isIE) {
		var num = axCam_Ocx.GetDevCount();
		GetDevCount(num);
	} else {
		sendMsgGetCamNum();
	}
}

function DeleteFile(path) {
	if(isIE) {
		var ret = axCam_Ocx.DeleteFileImage(path);
		if(ret == 1) {
			InfoTextCallback(6, path);
		} else {
			InfoCallback(0xa2);

		}
	} else {
		sendMsgDeleteFile(path);
	}
}