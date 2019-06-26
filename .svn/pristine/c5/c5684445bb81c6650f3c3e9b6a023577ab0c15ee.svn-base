   var runTemplet={
    		base_path:'http://app.project.cn:8020/webCriterion/',//资源路径
    	    /*
    	     * 点击运行按钮操作事件
    	     */
			runCodeEvent:function(){
				//获取左侧边栏代码内容
				var leftCode = $("#coding").val();
				//获取iframe标签
				var resultDoc = runTemplet.getiFrameDocument('applition');
				//将获取到的左侧边栏代码内容写入到iframe中
				resultDoc.write(leftCode);
				//关闭文件操作
				resultDoc.close();
				//给iframe下的body添加样式
				$("iframe").contents().find("body").css({"background":"#fff"});
			},
			/**
			 * 获取iframe文本方法
			 * @param {Object} iframe 
			 */
			getiFrameDocument:function(iframe){
				if(typeof iframe =='string'){
					iframe = document.getElementById(iframe);
				}
				iframe.removeAttribute('src');
				return iframe.contentDocument || (iframe.contentWindow ? iframe.contentWindow.document : iframe.document);
			}
	}
  $(function(){
  	//从cookie中获取存储的代码字符串
   // var codeStr  = getCookie("testCode");
   // $("#coding").val(codeStr);
    //给主体div加高度
    $(".main").css("height",$(window).height()+"px");
    //给左边栏和右边栏加高度
    $("#coding,#applition").css("height",($(window).height()-100)+"px");
    //获取传输的url路径
    var pageUrl = GetQueryString("url");
    console.log(pageUrl);
    //调用加载页面内容方法
    loadXMLDoc(pageUrl);
  });
  /**
   * 截取传输参数
   * @param {Object} name 传输的参数名称
   */
  function GetQueryString(name)
	{
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r!=null)return  unescape(r[2]); return null;
	}
	//显示loading
	$yt_baseElement.showLoading();
	 /**
	  * 加载html页面内容
	  * @param {Object} htmlUrl 页面路径
	  */
	function loadXMLDoc(htmlUrl){
	    $.ajax({
	    	type:"get",
	    	url:htmlUrl,
	    	async:true,
	    	dataType:"text",
	    	success:function(data){
	    		//隐藏loading
	    		$yt_baseElement.hideLoading();
	    		//给左侧边栏赋值代码内容
	    		$('#coding').text(data);
	    		//找到左侧边栏中资源文件路径做出修改
		        $("textarea").each(function(){
					$(this).html($(this).html().replace(/{basePath}/g,runTemplet.base_path));
				});
				//调用运行方法
				runTemplet.runCodeEvent();
				  //调用生成滚动条方法  
		        /*$(".code-info").mCustomScrollbar({  
		            autoHideScrollbar:true,  
		            theme:"square"  
		        });  */
			}
	     });
	}
	/**
	 * 获取cookie
	 * @param {Object} key
	 */
	  function getCookie(key){
			var arr1 = document.cookie.split('; ');
		    for (var i=0; i<arr1.length; i++) {
		        var arr2 = arr1[i].split('=');
		        if ( arr2[0] == key ) {
		            return decodeURIComponent(decodeURI(arr2[1]));
		        }
		    }
		    return null;
		}