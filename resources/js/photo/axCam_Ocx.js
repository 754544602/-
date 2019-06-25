 if(type==0){
    //视频开始显示
  }else if(type==1){
    //拍照的路径
    InfoTextCallback(0,str);
    
  }else if(type==4){
    //摄像头数量变化时
    var camNum = parseInt(str);
    GetDevCount(camNum);
  }else if(type==2){

   //ShowInfo("智能连拍数量 = "+str+"\r\n"); 
 }else if(type==3){
  // ShowInfo("定时连拍数量 = "+str+"\r\n"); 
 }else if(type==5){
    //图片保存失败
    InfoTextCallback(8,str);
 }else if(type==6){

  var strsMessage= new Array(); 
  strsMessage = str.split("**");
  for(var i=0;i<strsMessage.length ;i++){
   var num = 9+i;
   InfoTextCallback(num,strsMessage[i]);
 }
 var picBase64 = axCam_Ocx.GetICPicture();
 InfoTextCallback(19,picBase64);

}else if(type==7){
 //未发现身份证模块
 InfoCallback(0x1e);
}else if(type==8){
    //base64
    InfoTextCallback(5,str);
}else if(type==9){
    //base64
    LoadOver();
}