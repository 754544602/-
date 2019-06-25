var ws;
var canvas;
var context;
var canvasSecond;
var contextSecond;
var canvasX;
var canvasY;
var canvasLastX;
var canvasLastY;
var isDragging = false;
var canvasX_manual = 0;
var canvasY_manual = 0;
var recX_manual = 0;
var recY_manual = 0;
var recW_manual = 0;
var recH_manual = 0;
var rec_ww = 0;
var rec_hh = 0;
var CutType = 0;

function WsInit() {
//	canvas = document.getElementById("cameraCanvas");
//	context = canvas.getContext("2d");
//	if(isSecondDev) {
//		canvasSecond = document.getElementById("cameraCanvasSecond");
//		contextSecond = canvasSecond.getContext("2d");
//	}
//	canvas.onmousedown = canvasClick;
//	canvas.onmouseup = stopDragging;
//	canvas.onmouseout = stopDragging;
//	canvas.onmousemove = canvasMove;
	canvasX = 0;
	canvasY = 0;
	canvasLastX = 0;
	canvasLastY = 0;

	ws = new WebSocket("ws://localhost:9002");
	ws.binaryType = "arraybuffer";
	ws.onmessage = function(event) {

		var aDataArray = new Uint8Array(event.data);
		if(aDataArray.length > 0) {
			if(aDataArray[0] == 0xef && aDataArray[1] == 0x01) {
				// getDeviceName(aDataArray[3]);
				// getResolution(aDataArray,5);
				getUsbCamareMessage(aDataArray, 5)
			} else if(aDataArray[0] == 0xef && aDataArray[1] == 0x17) {
				var camNum = aDataArray[3];
				GetDevCount(camNum);
			} else if(aDataArray[0] == 0xef && aDataArray[1] == 0x19) {
				getResolution(aDataArray, 5);

			} else if(aDataArray[0] == 0xef && aDataArray[1] == 0x23) {
				//getResolution(aDataArray,4);
				var type = aDataArray[3];
				var len = aDataArray[4];
				var data = new Uint8Array(len);
				for(var i = 0; i < len; i++) {
					data[i] = aDataArray[5 + i];
				}
				var str = byteToString(data)
				var text = decodeURIComponent(str);
				InfoTextCallback(type, text);

			} else if(aDataArray[0] == 0xef && aDataArray[1] == 0x05) {
				var ww = aDataArray[3] * 256 + aDataArray[4];
				var hh = aDataArray[5] * 256 + aDataArray[6];
				//context.clearRect(0, 0, canvas.width, canvas.height);
				//sendMsgRefreshCam();
//				var imgData = context.createImageData(ww, hh);
//				var dataNum = 0;
//				for(var i = 0; i < imgData.data.length; i += 4) {
//					imgData.data[i + 0] = aDataArray[dataNum];
//					imgData.data[i + 1] = aDataArray[dataNum + 1];
//					imgData.data[i + 2] = aDataArray[dataNum + 2];
//					imgData.data[i + 3] = 255;
//					dataNum = dataNum + 3;
//				}
//				sendMsgRefreshCam();
//				if(CutType == 2) {
//					rec_ww = ww;
//					rec_hh = hh;
//					context.putImageData(imgData, canvas.width / 2 - ww / 2, canvas.height / 2 - hh / 2);
//					refreshRect();
//				} else context.putImageData(imgData, canvas.width / 2 - ww / 2 + canvasX, canvas.height / 2 - hh / 2 + canvasY);

			} else if(aDataArray[0] == 0xef && aDataArray[1] == 0x0c) {
				var ww = aDataArray[3] * 256 + aDataArray[4];
				var hh = aDataArray[5] * 256 + aDataArray[6];
//				context.clearRect(0, 0, canvas.width, canvas.height);
//				//sendMsgRefreshCam();
//				var imgData = context.createImageData(ww, hh);
//				var dataNum = 0;
//				for(var i = 0; i < imgData.data.length; i += 4) {
//					imgData.data[i + 0] = aDataArray[dataNum];
//					imgData.data[i + 1] = aDataArray[dataNum + 1];
//					imgData.data[i + 2] = aDataArray[dataNum + 2];
//					imgData.data[i + 3] = 255;
//					dataNum = dataNum + 3;
//				}
//				sendMsgRefreshCam();
//				var Xdis = canvas.width / 2 - ww / 2 + canvasX;
//				var Ydis = canvas.height / 2 - hh / 2 + canvasY;
//				context.putImageData(imgData, Xdis, Ydis);
//
//				var lenJiubian = aDataArray[7];
//
//				context.beginPath();
//				context.strokeStyle = "rgb(0,255,0)";
//				context.lineWidth = 2;

				for(var j = 0; j < lenJiubian; j++) {
					for(var i = 0; i < 3; i++) {
						var aa = 1;
						if(aDataArray[8 + i * 6 + j * 24] == 1) {
							aa = -1;
						}
						var bb = 1;
						if(aDataArray[11 + i * 6 + j * 24] == 1) {
							bb = -1;
						}
						var cc = 1;
						if(aDataArray[14 + i * 6 + j * 24] == 1) {
							cc = -1;
						}
						var dd = 1;
						if(aDataArray[17 + i * 6 + j * 24] == 1) {
							dd = -1;
						}
//						context.moveTo(aDataArray[9 + i * 6 + j * 24] * 256 * aa + aDataArray[10 + i * 6 + j * 24] * aa + Xdis, aDataArray[12 + i * 6 + j * 24] * 256 * bb + aDataArray[13 + i * 6 + j * 24] * bb + Ydis);
//						context.lineTo(aDataArray[15 + i * 6 + j * 24] * 256 * cc + aDataArray[16 + i * 6 + j * 24] * cc + Xdis, aDataArray[18 + i * 6 + j * 24] * 256 * dd + aDataArray[19 + i * 6 + j * 24] * dd + Ydis);
//						context.stroke();
					}
					var ee = 1;
					if(aDataArray[26 + j * 24] == 1) {
						ee = -1;
					}
					var ff = 1;
					if(aDataArray[8 + j * 24] == 1) {
						ff = -1;
					}
//					context.moveTo(aDataArray[27 + j * 24] * 256 + aDataArray[28 + j * 24] + Xdis, aDataArray[30 + j * 24] * 256 + aDataArray[31 + j * 24] + Ydis);
//					context.lineTo(aDataArray[9 + j * 24] * 256 + aDataArray[10 + j * 24] + Xdis, aDataArray[12 + j * 24] * 256 + aDataArray[13 + j * 24] + Ydis);
//					context.stroke();
				}
			} else if(aDataArray[0] == 0xef && aDataArray[1] == 0x14) {
				var tmp = aDataArray[3];
				InfoCallback(tmp);
			} else if(aDataArray[0] == 0xef && aDataArray[1] == 0x26) {

				if(isSecondDev) {
					var ww = aDataArray[3] * 256 + aDataArray[4];
					var hh = aDataArray[5] * 256 + aDataArray[6];
					contextSecond.clearRect(0, 0, canvasSecond.width, canvasSecond.height);

					var imgData = contextSecond.createImageData(ww, hh);
					var dataNum = 0;
					for(var i = 0; i < imgData.data.length; i += 4) {
						imgData.data[i + 0] = aDataArray[dataNum];
						imgData.data[i + 1] = aDataArray[dataNum + 1];
						imgData.data[i + 2] = aDataArray[dataNum + 2];
						imgData.data[i + 3] = 255;
						dataNum = dataNum + 3;

					}
					sendMsgRefreshCamSecond();

					contextSecond.putImageData(imgData, canvasSecond.width / 2 - ww / 2, canvasSecond.height / 2 - hh / 2);
				}
			} else if(aDataArray[0] == 0xef && aDataArray[1] == 0x30) {
				var type1 = aDataArray[3];
				var ret = 1;
				if(type1 == 0) {
					ret = -1;
				}
				var min = aDataArray[4] * ret;

				var type2 = aDataArray[5];
				ret = 1;
				if(type2 == 0) {
					ret = -1;
				}
				var max = aDataArray[6] * ret;
				GetBrightnessRange(min, max);
			} else if(aDataArray[0] == 0xef && aDataArray[1] == 0x32) {
				var type1 = aDataArray[3];
				var ret = 1;
				if(type1 == 0) {
					ret = -1;
				}
				var min = aDataArray[4] * ret;

				var type2 = aDataArray[5];
				ret = 1;
				if(type2 == 0) {
					ret = -1;
				}
				var max = aDataArray[6] * ret;
				GetExposureRange(min, max);
			} else if(aDataArray[0] == 0xef && aDataArray[1] == 0x36) {
				var len = aDataArray[3] * 65536 + aDataArray[4] * 256 + aDataArray[5];
				var baseDataArray = new Uint8Array(len);
				for(var i = 0; i < len; i++) {
					baseDataArray[i] = aDataArray[6 + i];
				}
				var str = byteToString(baseDataArray);
				var text = decodeURIComponent(str);

				InfoTextCallback(5, text);
			} else if(aDataArray[0] == 0xef && aDataArray[1] == 0x3b) {
				camidMain = aDataArray[3];
				if(isSecondDev) {
					camidSub = aDataArray[4];
				}
			} else if(aDataArray[0] == 0xef && aDataArray[1] == 0x3e) {
				var len = aDataArray[3] * 65536 + aDataArray[4] * 256 + aDataArray[5];
				var baseDataArray = new Uint8Array(len);
				for(var i = 0; i < len; i++) {
					baseDataArray[i] = aDataArray[6 + i];
				}
				var str = byteToString(baseDataArray);
				var text = decodeURIComponent(str);

				InfoTextCallback(18, text);

			}
		}

	};
	// ´ò¿ªWebSocket 
	ws.onclose = function(event) {
		//WebSocket Status:: Socket Closed
		InfoCallback(0xa3);
		Disconnect(0);
	};
	// ´ò¿ªWebSocket
	ws.onopen = function(event) {
		sendMsgGetMainCameraID();
		sendMsgRefreshDev();

	};
	ws.onerror = function(event) {
		//WebSocket Status:: Error was reported
		InfoCallback(0xa4);
		Disconnect(1);
	};
}

function canvasClick(e) {
	isDragging = true;
}

function stopDragging() {
	isDragging = false;
	canvasLastX = 0;
	canvasLastY = 0;
	canvasX_manual = 0;
	canvasY_manual = 0;
}

function canvasMove(e) {
	if(isDragging == true) {
		if(CutType != 2) {
			if(canvasLastX == 0 && canvasLastY == 0) {
				canvasLastX = e.pageX - canvas.offsetLeft;
				canvasLastY = e.pageY - canvas.offsetTop;

			} else {
				var mx = e.pageX - canvas.offsetLeft;
				var my = e.pageY - canvas.offsetTop;
				canvasX = canvasX + (mx - canvasLastX);
				canvasY = canvasY + (my - canvasLastY);
				canvasLastX = mx;
				canvasLastY = my;
			}
		} else {
			var mx = e.pageX - canvas.offsetLeft;
			var my = e.pageY - canvas.offsetTop;

			if(canvasLastX == 0 && canvasLastY == 0) {

				canvasLastX = mx;
				canvasLastY = my;
				recX_manual = mx;
				recY_manual = my;
			} else {
				canvasX_manual = canvasX_manual + (mx - canvasLastX);
				canvasY_manual = canvasY_manual + (my - canvasLastY);
				canvasLastX = mx;
				canvasLastY = my;
				recW_manual = canvasX_manual;
				recH_manual = canvasY_manual;
			}

		}
	}
}

function getResolution(arrayData, tmpNum) {
	var type = arrayData[3]
	var len = arrayData[4];
	var data = new Int32Array(len * 2);
	var num = 0;
	for(var i = 0; i < len; i++) {
		data[num] = arrayData[tmpNum] * 256 + arrayData[tmpNum + 1];
		num++;
		data[num] = arrayData[tmpNum + 2] * 256 + arrayData[tmpNum + 3];
		num++;
		tmpNum += 4;
	}
	if(type == 0) {
		GetDeviceResolution(data);
	} else {
		if(isSecondDev) {
			GetDeviceResolutionSecond(data);
		}
	}

}

function getUsbCamareMessage(arrayData, tmpNum) {
	var numCam = arrayData[3];
	var len = arrayData[4];
	var data = new Int32Array(len * 2);
	var num = 0;
	for(var i = 0; i < len; i++) {
		data[num] = arrayData[tmpNum] * 256 + arrayData[tmpNum + 1];
		num++;
		data[num] = arrayData[tmpNum + 2] * 256 + arrayData[tmpNum + 3];
		num++;
		tmpNum += 4;
	}
	GetDeviceResolution(data);

	var strUsbNamr = new Array()
	for(var i = 0; i < numCam; i++) {
		var tmpLen = arrayData[tmpNum];
		var tmpData = new Uint8Array(tmpLen);
		tmpNum++;
		for(var j = 0; j < tmpLen; j++) {
			tmpData[j] = arrayData[tmpNum];
			tmpNum++;
		}
		// var arr =       Utf8ToUnicode(tmpData)
		var str = byteToString(tmpData);
		var text = decodeURIComponent(str);
		strUsbNamr[i] = text;
	}
	GetDevFriendName(numCam, strUsbNamr);
}

function sendMsgRefreshCam() {
	var aDataArray = new Uint8Array(3);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x04;
	aDataArray[2] = 0x00;
	ws.send(aDataArray.buffer);
}

function sendMsgStartVideo2(camId, width, height) {

	var aDataArray = new Uint8Array(8);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x25;
	aDataArray[2] = 0x05;
	aDataArray[3] = camId;
	aDataArray[4] = width / 256;
	aDataArray[5] = width % 256;
	aDataArray[6] = height / 256;
	aDataArray[7] = height % 256;
	ws.send(aDataArray.buffer);
}

function sendMsgRefreshCamSecond() {
	var aDataArray = new Uint8Array(3);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x27;
	aDataArray[2] = 0x00;
	ws.send(aDataArray.buffer);
}

function sendMsgSetCanvasOriginalSize(ww, hh) {
	var aDataArray = new Uint8Array(7);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x15;
	aDataArray[2] = 0x04;
	aDataArray[3] = ww / 256;
	aDataArray[4] = ww % 256;
	aDataArray[5] = hh / 256;
	aDataArray[6] = hh % 256;
	ws.send(aDataArray.buffer);
}

function sendMsgSetCanvasSecondOriginalSize(ww, hh) {
	var aDataArray = new Uint8Array(7);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x37;
	aDataArray[2] = 0x04;
	aDataArray[3] = ww / 256;
	aDataArray[4] = ww % 256;
	aDataArray[5] = hh / 256;
	aDataArray[6] = hh % 256;
	ws.send(aDataArray.buffer);
}

function sendMsgRefreshDev() {
	var aDataArray = new Uint8Array(3);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x00;
	aDataArray[2] = 0x00;
	ws.send(aDataArray.buffer);
}

function sendMsgStartVideo(camId, width, height) {

	var aDataArray = new Uint8Array(8);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x02;
	aDataArray[2] = 0x05;
	aDataArray[3] = camId;
	aDataArray[4] = width / 256;
	aDataArray[5] = width % 256;
	aDataArray[6] = height / 256;
	aDataArray[7] = height % 256;
	ws.send(aDataArray.buffer);
}

function sendMsgChangeOrientation(type) {
	var aDataArray = new Uint8Array(4);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x06;
	aDataArray[2] = 0x01;
	aDataArray[3] = type;
	ws.send(aDataArray.buffer);
}

function sendMsgSetImageColorMode(type) {
	var aDataArray2 = new Uint8Array(4);
	aDataArray2[0] = 0xef;
	aDataArray2[1] = 0x07;
	aDataArray2[2] = 0x01;
	aDataArray2[3] = type;
	ws.send(aDataArray2.buffer);
}

function sendMsgCloseVideo() {

	var aDataArray = new Uint8Array(3);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x08;
	aDataArray[2] = 0x00;
	ws.send(aDataArray.buffer);
	//context.clearRect(0, 0, canvas.width, canvas.height);
}

function sendMsgCloseVideoSecond() {

	var aDataArray = new Uint8Array(3);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x28;
	aDataArray[2] = 0x00;
	ws.send(aDataArray.buffer);
	contextSecond.clearRect(0, 0, canvas.width, canvas.height);
}

function sendMsgChangeResolution(camId, width, height) {

	var aDataArray = new Uint8Array(8);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x02;
	aDataArray[2] = 0x05;
	aDataArray[3] = camId;
	aDataArray[4] = width / 256;
	aDataArray[5] = width % 256;
	aDataArray[6] = height / 256;
	aDataArray[7] = height % 256;
	ws.send(aDataArray.buffer);
}

function sendMsgSetFilePath(pathUnicode) {
	var path = encodeURI(pathUnicode);
	var pathdata = stringToByte(path);
	var len = path.length;
	var aDataArray = new Uint8Array(3 + len);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x1c;
	aDataArray[2] = len;
	for(var i = 0; i < len; i++) {
		aDataArray[3 + i] = pathdata[i];
	}
	ws.send(aDataArray.buffer);
}

function sendMsgSetFileNameModelCustom(index, pathUnicode) {
	var path = encodeURI(pathUnicode);
	var pathdata = stringToByte(path);
	var len = path.length;
	var aDataArray = new Uint8Array(6 + len);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x1d;
	aDataArray[2] = len + 3;
	aDataArray[3] = index / 256;
	aDataArray[4] = index % 256;
	aDataArray[5] = len;
	for(var i = 0; i < len; i++) {
		aDataArray[6 + i] = pathdata[i];
	}
	ws.send(aDataArray.buffer);
}

function sendMsgSetFileNameModelFixed(pathUnicode) {
	var path = encodeURI(pathUnicode);
	var pathdata = stringToByte(path);
	var len = path.length;
	var aDataArray = new Uint8Array(3 + len);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x1f;
	aDataArray[2] = len;
	for(var i = 0; i < len; i++) {
		aDataArray[3 + i] = pathdata[i];
	}
	ws.send(aDataArray.buffer);
}

function sendMsgSetFileNameModelTime() {
	var aDataArray = new Uint8Array(3);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x1e;
	aDataArray[2] = 0x00;
	ws.send(aDataArray.buffer);
}

function sendMsgSetFileNameModelBarcode() {
	var aDataArray = new Uint8Array(3);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x2b;
	aDataArray[2] = 0x00;
	ws.send(aDataArray.buffer);
}

function sendMsgSetFileType(type) {
	var aDataArray = new Uint8Array(4);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x20;
	aDataArray[2] = 0x01;
	aDataArray[3] = type;
	ws.send(aDataArray.buffer);
}

function sendMsgSetConntinousShotModel(type) {
	var aDataArray = new Uint8Array(4);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x21;
	aDataArray[2] = 0x01;
	aDataArray[3] = type;
	ws.send(aDataArray.buffer);
}

function sendMsgSetConntinousShotModelTime(len) {
	var aDataArray = new Uint8Array(5);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x22;
	aDataArray[2] = 0x02;
	aDataArray[3] = len / 256;
	aDataArray[4] = len % 256;
	ws.send(aDataArray.buffer);
}

function sendMsgUploadFile(uploadSerHead, uploadSerLast, uploadSerFile) {
	var path = encodeURI(uploadSerHead);
	var pathdata = stringToByte(path);
	var len = path.length;

	var path2 = encodeURI(uploadSerLast);
	var pathdata2 = stringToByte(path2);
	var len2 = path2.length;

	var path3 = encodeURI(uploadSerFile);
	var pathdata3 = stringToByte(path3);
	var len3 = path3.length;

	var aDataArray = new Uint8Array(8 + len + len2 + len3);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x24;
	aDataArray[2] = 5 + len + len2 + len3;
	aDataArray[3] = 0x00;
	aDataArray[4] = 80 % 256;
	aDataArray[5] = len;
	for(var i = 0; i < len; i++) {
		aDataArray[6 + i] = pathdata[i];
	}
	aDataArray[6 + len] = len2;
	for(var i = 0; i < len2; i++) {
		aDataArray[7 + len + i] = pathdata2[i];
	}
	aDataArray[7 + len + len2] = len3;
	for(var i = 0; i < len3; i++) {
		aDataArray[8 + len + len2 + i] = pathdata3[i];
	}
	ws.send(aDataArray.buffer);

}

function sendMsgUploadFilePort(port, uploadSerHead, uploadSerLast, uploadSerFile) {
	var path = encodeURI(uploadSerHead);
	var pathdata = stringToByte(path);
	var len = path.length;

	var path2 = encodeURI(uploadSerLast);
	var pathdata2 = stringToByte(path2);
	var len2 = path2.length;

	var path3 = encodeURI(uploadSerFile);
	var pathdata3 = stringToByte(path3);
	var len3 = path3.length;

	var aDataArray = new Uint8Array(8 + len + len2 + len3);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x24;
	aDataArray[2] = 5 + len + len2 + len3;
	aDataArray[3] = port / 256;
	aDataArray[4] = port % 256;
	aDataArray[5] = len;
	for(var i = 0; i < len; i++) {
		aDataArray[6 + i] = pathdata[i];
	}
	aDataArray[6 + len] = len2;
	for(var i = 0; i < len2; i++) {
		aDataArray[7 + len + i] = pathdata2[i];
	}
	aDataArray[7 + len + len2] = len3;
	for(var i = 0; i < len3; i++) {
		aDataArray[8 + len + len2 + i] = pathdata3[i];
	}
	ws.send(aDataArray.buffer);

}

function sendMsgCapture(type) {
	if(type != 2) {
		var aDataArray = new Uint8Array(4);
		aDataArray[0] = 0xef;
		aDataArray[1] = 0x0a;
		aDataArray[2] = 0x01;
		aDataArray[3] = 0x00;
		ws.send(aDataArray.buffer);
	} else {
		var xsend = recX_manual - (canvas.width / 2 - rec_ww / 2);
		var ysend = recY_manual - (canvas.height / 2 - rec_hh / 2);
		if(xsend < 0) xsend = 0;
		if(ysend < 0) ysend = 0;
		var aDataArray = new Uint8Array(11);
		aDataArray[0] = 0xef;
		aDataArray[1] = 0x0f;
		aDataArray[2] = 0x08;
		aDataArray[3] = xsend / 256;
		aDataArray[4] = xsend % 256;
		aDataArray[5] = ysend / 256;
		aDataArray[6] = ysend % 256;
		aDataArray[7] = recW_manual / 256;
		aDataArray[8] = recW_manual % 256;
		aDataArray[9] = recH_manual / 256;
		aDataArray[10] = recH_manual % 256;
		ws.send(aDataArray.buffer);
	}

}

function sendMsgCaptureSecond() {
	var aDataArray = new Uint8Array(3);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x29;
	aDataArray[2] = 0x00;
	ws.send(aDataArray.buffer);
}

function sendMsgShowImageSettingWindow() {
	var aDataArray = new Uint8Array(3);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x0b;
	aDataArray[2] = 0x00;
	ws.send(aDataArray.buffer);
}

function sendMsgZoom(type) {
	var aDataArray = new Uint8Array(4);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x0d;
	aDataArray[2] = 0x01;
	aDataArray[3] = type;
	ws.send(aDataArray.buffer);
}

function sendMsgSetCutType(type) {
	CutType = type;
	var aDataArray = new Uint8Array(4);

	aDataArray[0] = 0xef;
	aDataArray[1] = 0x0e;
	aDataArray[2] = 0x01;
	aDataArray[3] = type;
	ws.send(aDataArray.buffer);

}

function sendMsgSetJiubianModel(type) {
	var aDataArray = new Uint8Array(4);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x10;
	aDataArray[2] = 0x01;
	aDataArray[3] = type;
	ws.send(aDataArray.buffer);

}

function sendMsgGetCamNum() {
	var aDataArray = new Uint8Array(3);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x16;
	aDataArray[2] = 0x00;
	ws.send(aDataArray.buffer);

}

function sendMsgGetResolution(camid) {
	var aDataArray = new Uint8Array(5);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x18;
	aDataArray[2] = 0x02;
	aDataArray[3] = 0x00;
	aDataArray[4] = camid;
	ws.send(aDataArray.buffer);
}

function sendMsgGetResolutionSecond(camid) {
	var aDataArray = new Uint8Array(5);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x18;
	aDataArray[2] = 0x02;
	aDataArray[3] = 0x01;
	aDataArray[4] = camid;
	ws.send(aDataArray.buffer);
}

function sednMsgSavePDF(pathUnicode) {
	var path = encodeURI(pathUnicode);
	var pathdata = stringToByte(path);
	var len = path.length;
	var aDataArray = new Uint8Array(3 + len);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x11;
	aDataArray[2] = len;
	for(var i = 0; i < len; i++) {
		aDataArray[3 + i] = pathdata[i];
	}
	ws.send(aDataArray.buffer);
}

function sednMsgAddPDF(pathUnicode) {
	var path = encodeURI(pathUnicode);
	var pathdata = stringToByte(path);
	var len = path.length;
	var aDataArray = new Uint8Array(3 + len);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x12;
	aDataArray[2] = len;
	for(var i = 0; i < len; i++) {
		aDataArray[3 + i] = pathdata[i];
	}
	ws.send(aDataArray.buffer);
}

function sednMsgWaterMarkOpen(pathUnicode, fontSize, fontStyleIndex, r, g, b, xoffset, yoffset) {
	var path = encodeURI(pathUnicode);
	var pathdata = stringToByte(path);
	var len = path.length;

	var aDataArray = new Uint8Array(11 + len);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x1a;
	aDataArray[2] = 8 + len;
	aDataArray[3] = fontSize;
	aDataArray[4] = fontStyleIndex;
	aDataArray[5] = r;
	aDataArray[6] = g;
	aDataArray[7] = b;
	aDataArray[8] = xoffset;
	aDataArray[9] = yoffset;
	aDataArray[10] = len;
	for(var i = 0; i < len; i++) {
		aDataArray[11 + i] = pathdata[i];
	}
	ws.send(aDataArray.buffer);
}

function sednMsgWaterMarkClose() {
	var aDataArray = new Uint8Array(3);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x1b;
	aDataArray[2] = 0x00;
	ws.send(aDataArray.buffer);
}

function sednMsgBubaiType(type) {
	var aDataArray = new Uint8Array(4);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x2c;
	aDataArray[2] = 0x01;
	aDataArray[3] = type;
	ws.send(aDataArray.buffer);
}

function sednMsgQuqudiseType(type) {
	var aDataArray = new Uint8Array(4);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x34;
	aDataArray[2] = 0x01;
	aDataArray[3] = type;
	ws.send(aDataArray.buffer);
}

function sendMsgCombineTwoImage(path1Unicode, path2Unicode, path3Unicode, type) {
	var path1 = encodeURI(path1Unicode);
	var pathdata1 = stringToByte(path1);
	var len1 = path1.length;

	var path2 = encodeURI(path2Unicode);
	var pathdata2 = stringToByte(path2);
	var len2 = path2.length;

	var path3 = encodeURI(path3Unicode);
	var pathdata3 = stringToByte(path3);
	var len3 = path3.length;

	var aDataArray = new Uint8Array(7 + len1 + len2 + len3);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x13;
	aDataArray[2] = len1 + len2 + len3 + 4;
	aDataArray[3] = type;
	aDataArray[4] = len1;
	for(var i = 0; i < len1; i++) {
		aDataArray[5 + i] = pathdata1[i];
	}
	aDataArray[5 + len1] = len2;
	for(var i = 0; i < len2; i++) {
		aDataArray[6 + len1 + i] = pathdata2[i];
	}

	aDataArray[6 + len1 + len2] = len3;
	for(var i = 0; i < len3; i++) {
		aDataArray[7 + len1 + len2 + i] = pathdata3[i];
	}
	ws.send(aDataArray.buffer);
}

function sendMsgSetAutoExposure(type) {
	var aDataArray = new Uint8Array(4);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x2d;
	aDataArray[2] = 0x01;
	aDataArray[3] = type;
	ws.send(aDataArray.buffer);
}

function sendMsgGetExposureRange() {
	var aDataArray = new Uint8Array(3);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x31;
	aDataArray[2] = 0x00;
	ws.send(aDataArray.buffer);
}

function sendMsgGetBrightnessRange() {
	var aDataArray = new Uint8Array(3);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x2e;
	aDataArray[2] = 0x00;
	ws.send(aDataArray.buffer);
}

function sendMsgSetBrightness(temp) {
	var type;
	if(temp < 0) {
		type = 0;
	} else {
		type = 1;
	}
	temp = Math.abs(temp);
	var aDataArray = new Uint8Array(5);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x2f;
	aDataArray[2] = 0x02;
	aDataArray[3] = type;
	aDataArray[4] = temp;
	ws.send(aDataArray.buffer);
}

function sendMsgSetExposure(temp) {
	var type;
	if(temp < 0) {
		type = 0;
	} else {
		type = 1;
	}
	temp = Math.abs(temp);
	var aDataArray = new Uint8Array(5);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x33;
	aDataArray[2] = 0x02;
	aDataArray[3] = type;
	aDataArray[4] = temp;
	ws.send(aDataArray.buffer);
}

function sednMsgGetBase64(filename) {
	var path = encodeURI(filename);
	var pathdata = stringToByte(path);
	var len = path.length;
	var aDataArray = new Uint8Array(3 + len);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x35;
	aDataArray[2] = len;
	for(var i = 0; i < len; i++) {
		aDataArray[3 + i] = pathdata[i];
	}
	ws.send(aDataArray.buffer);
}

function sendMsgDeleteFile(pathUnicode) {
	var path = encodeURI(pathUnicode);
	var pathdata = stringToByte(path);
	var len = path.length;
	var aDataArray = new Uint8Array(3 + len);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x38;
	aDataArray[2] = len;
	for(var i = 0; i < len; i++) {
		aDataArray[3 + i] = pathdata[i];
	}
	ws.send(aDataArray.buffer);
}

function sendMsgQrcode(pathUnicode) {
	var path = encodeURI(pathUnicode);
	var pathdata = stringToByte(path);
	var len = path.length;
	var aDataArray = new Uint8Array(3 + len);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x39;
	aDataArray[2] = len;
	for(var i = 0; i < len; i++) {
		aDataArray[3 + i] = pathdata[i];
	}
	ws.send(aDataArray.buffer);
}

function sendMsgGetMainCameraID() {
	var aDataArray = new Uint8Array(4);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x3a;
	aDataArray[2] = 0x01;
	aDataArray[3] = 0x01;
	ws.send(aDataArray.buffer);
}

function sendMsgStartIDCard() {
	var aDataArray = new Uint8Array(4);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x3c;
	aDataArray[2] = 0x01;
	aDataArray[3] = 0x00;
	ws.send(aDataArray.buffer);
}

function sendMsgGetOneIC() {
	var aDataArray = new Uint8Array(4);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x3c;
	aDataArray[2] = 0x01;
	aDataArray[3] = 0x01;
	ws.send(aDataArray.buffer);
}

function sendMsgGetICValues(type) {
	var aDataArray = new Uint8Array(4);
	aDataArray[0] = 0xef;
	aDataArray[1] = 0x3d;
	aDataArray[2] = 0x01;
	aDataArray[3] = type;
	ws.send(aDataArray.buffer);
}

//手动裁边时的长方形
function refreshRect() {
	context.beginPath();
	context.rect(recX_manual, recY_manual, recW_manual, recH_manual);
	context.lineWidth = 2;
	context.strokeStyle = "#0000ff";
	context.stroke();
}

function stringToByte(str) {
	var bytes = new Array();
	var len, c;
	len = str.length;
	for(var i = 0; i < len; i++) {
		c = str.charCodeAt(i);
		if(c >= 0x010000 && c <= 0x10FFFF) {
			bytes.push(((c >> 18) & 0x07) | 0xF0);
			bytes.push(((c >> 12) & 0x3F) | 0x80);
			bytes.push(((c >> 6) & 0x3F) | 0x80);
			bytes.push((c & 0x3F) | 0x80);
		} else if(c >= 0x000800 && c <= 0x00FFFF) {
			bytes.push(((c >> 12) & 0x0F) | 0xE0);
			bytes.push(((c >> 6) & 0x3F) | 0x80);
			bytes.push((c & 0x3F) | 0x80);
		} else if(c >= 0x000080 && c <= 0x0007FF) {
			bytes.push(((c >> 6) & 0x1F) | 0xC0);
			bytes.push((c & 0x3F) | 0x80);
		} else {
			bytes.push(c & 0xFF);
		}
	}
	return bytes;
}

function byteToString(arr) {
	if(typeof arr === 'string') {
		return arr;
	}
	var str = '',
		_arr = arr;
	for(var i = 0; i < _arr.length; i++) {
		var one = _arr[i].toString(2),
			v = one.match(/^1+?(?=0)/);
		if(v && one.length == 8) {
			var bytesLength = v[0].length;
			var store = _arr[i].toString(2).slice(7 - bytesLength);
			for(var st = 1; st < bytesLength; st++) {
				store += _arr[st + i].toString(2).slice(2);
			}
			str += String.fromCharCode(parseInt(store, 2));
			i += bytesLength - 1;
		} else {
			str += String.fromCharCode(_arr[i]);
		}
	}
	return str;
}

function base64Encode(input) {
	var rv;
	rv = encodeURIComponent(input);
	rv = unescape(rv);
	rv = window.btoa(rv);
	return rv;
}

function isIE() { //ie?
	if(!!window.ActiveXObject || "ActiveXObject" in window)
		return true;
	else
		return false;
}