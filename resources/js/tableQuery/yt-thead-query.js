  $(function(){
			  	/**
			  	 * 调用表头点击方法
			  	 */
			  	theadEvent();
			  	/**
			  	 * 查询条件div中的ulli点击效果方法
			  	 */
			  	checkBoxQueryEvent();
			  	/**
			  	 * 点击查询区域的清除查询
			  	 */
			  	$(".yt-suspension-model").find(".yt-clear-query").off().on("click",function(){
			  		/**
					 * 取消选中,调用清除方法
					 */
				    clearQueryEvent($(this));
			  	});
			  	 /**
			      * 单选查询点击事件
			      */
			    radioQueryEvent();
			    /**
			     * 调用日期查询方法
			     */
			    dataQueryEvent();
			    /**
			     * 调用模糊查询方法
			     */
			    vagueQueryEvent();
			    /**
			     * 调用数字查询方法
			     */
			    numberQueryEvent();
			    /**
			     * 调用生成滚动条的方法
			     */
			    $(".yt-suspension-model").mCustomScrollbar({
						autoHideScrollbar:true,
						theme:"square"
					});
					/**
					 * 查询框悬浮事件
					 */
			    queryModelHover();
			  });
			  /**
			   * 
			   * 查询框悬浮事件
			   * 
			   */
			  function queryModelHover(){
			  	 $(".yt-suspension-model:not(.data-query)").mouseleave(function(){
			  	 	  $(this).prev().removeClass("check");
			  	 	  $(this).hide();
			  	 });
			  }
			  /**
			   * 
			   * 表头点击事件
			   * 
			   */
			  function  theadEvent(){
			  	$(".yt-screen-thead th .yt-screen-font").off().on("click",function(){
			  		/**
			  		 * 判断是否选中
			  		 */
			  		if($(this).hasClass("check")){
			  			/*$(".yt-screen-thead th .yt-screen-font").removeClass("th-font-change");
			  			$(".yt-screen-thead th .yt-screen-font").find("img").attr("src","../../resources/images/icons/white-down.png");*/
							//隐藏所有的
			  			$(".yt-suspension-model").hide();
			  			$(".yt-screen-thead th .yt-screen-font").removeClass("check");
			  		}else{
			  			/*$(".yt-screen-thead th .yt-screen-font").removeClass("th-font-change");
			  			$(".yt-screen-thead th .yt-screen-font").find("img").attr("src","../../resources/images/icons/white-down.png");
			  			$(this).addClass("th-font-change");
			  			$(this).find("img").attr("src","../../resources/images/icons/lou-dou.png");*/
			  			//隐藏所有的
			  			$(".yt-suspension-model").hide();
			  			$(".yt-screen-thead th .yt-screen-font").removeClass("check");
			  			$(this).addClass("check");
			  			//显示当前的
			  			$(this).next().show();
			  		}
			  	});
			  }
			  /**
			   * 多选查询条件div中的ulli点击效果
			   */
			  function　checkBoxQueryEvent(){
			  	//复选框改变事件
			  	$(".yt-suspension-model.checobox-query ul li label input").off().on("change",function(){
			  		var checkNum=$(".yt-suspension-model.checobox-query ul li label input:checked").length;
			  		if($(this).is(":checked")){
			  			$(this).parent().parent().addClass("li-check");
			  		}else{
			  			$(this).parent().parent().removeClass("li-check");
			  		}
			  		/**
			  		 * 判断选中的条数
			  		 */
			  		if(checkNum>0){
			  			//改变当前表头字体样式和图标
			  			$(this).parents(".checobox-query").prev().addClass("th-font-change");
			  			$(this).parents(".checobox-query").prev().find("img").attr("src","../../resources/images/icons/lou-dou.png");
			  			$(".yt-suspension-model.checobox-query .yt-clear-query").show();
			  		}else{
			  			$(".yt-suspension-model.checobox-query .yt-clear-query").hide();
			  			//改变当前表头字体样式和图标
			  			$(this).parents(".checobox-query").prev().removeClass("th-font-change");
			  			$(this).parents(".checobox-query").prev().find("img").attr("src","../../resources/images/icons/white-down.png");
			  		}
			  	});
			  }
			  /**
			   * 单选查询点击事件
			   */
			  function radioQueryEvent(){
			  	//单选按钮改变事件
			  	 $(".yt-suspension-model.radio-query ul li label input").off().on("change",function(){
			  	 	if($(".yt-suspension-model.radio-query ul li").hasClass("li-check")){
			  			$(".yt-suspension-model.radio-query ul li").removeClass("li-check");
			  			//改变当前表头字体样式和图标
			  			$(this).parents(".radio-query").prev().removeClass("th-font-change");
			  			$(this).parents(".radio-query").prev().find("img").attr("src","../../resources/images/icons/white-down.png");
			  		}
			  	 	$(this).parent().parent().addClass("li-check");
			  	 	$(this).parents(".yt-suspension-model").find(".yt-clear-query").show();
			  	 	//改变当前表头字体样式和图标
		  			$(this).parents(".radio-query").prev().addClass("th-font-change");
		  			$(this).parents(".radio-query").prev().find("img").attr("src","../../resources/images/icons/lou-dou.png");
			  	 	
			  	 });
			  }
			  /**
			   * 
			   * 模糊查询
			   * 
			   */
			  function vagueQueryEvent(){
			  	/**
			  	 * 调用输入关键字模糊查询数据方法
			  	 */
			  	byKeywordQuery();
			  	 /**
			  	  * 点击清除事件
			  	  */
			  	 $(".vague-query .clear-span").off().on("click",function(){
				  	 	//清空文本框内容
				  	 	$(this).prev().val("");
				  	 	$(".vague-query .query-list ul").empty();
				  	 	//改变当前表头字体样式和图标
			  			$(".vague-query").prev().removeClass("th-font-change");
			  			$(".vague-query").prev().find("img").attr("src","../../resources/images/icons/white-down.png");
			  	 });
			  	 
			  }
			  /**
			   * 根据关键字查询
			   */
			  function byKeywordQuery()
			  {    
			  	    /**
			  	     * 测试数据
			  	     */
			  	    var vagueData=[{"name":"张三"},
			  	 	{"name":"张晓"},
			  	 	{"name":"张明"},
			  	 	{"name":"李四"},
			  	 	{"name":"李军"},
			  	 	{"name":"徐来"}
			  	 	]
			  	    /**
			  	     * 关键字输入框失去键盘抬起
			  	     */
			  	    $(".vague-query input.key-word").off().on("keyup",function(){
				  	    	var keyWord= $(this).val();
				  	    	var liStr="";
				  	    	if(keyWord!=""){
				  	    		$(".vague-query .query-list ul").empty();
					  	    	$.each(vagueData, function(i,n) {
					  	    		if(n.name.indexOf(keyWord)!=-1){
					  	    			liStr='<li>'+n.name+'</li>';
					  	    			$(".vague-query .query-list ul").append(liStr);
					  	    		}
					  	    	});
					  	    	/**
							  	  * li标签选中事件
							  	  */
							  	 $(".vague-query ul li").off().on("click",function(){
								  	 	$(".vague-query ul li").removeClass("li-check");
								  	 	$(this).addClass("li-check");
								  	 	//改变当前表头字体样式和图标
							  			$(".vague-query").prev().addClass("th-font-change");
							  			$(".vague-query").prev().find("img").attr("src","../../resources/images/icons/lou-dou.png");
							  	 });
				  	    	}else{
				  	    		  $(".vague-query .query-list ul").empty();
				  	    			//改变当前表头字体样式和图标
							  			$(".vague-query").prev().removeClass("th-font-change");
							  			$(".vague-query").prev().find("img").attr("src","../../resources/images/icons/white-down.png");
				  	    	}
				  	    	
			  	    });
			  	     
			  }
			  /**
			   * 
			   * 日期查询点击事件
			   * 
			   */
			  function  dataQueryEvent(){
			  	 /**
			  	  * 切换事件
			  	  */
			  	 $(".data-query ul li label input").off().on("change",function(){
			  	 	var checkNum=$(".data-query ul li label input:checked").length;
			  	 	 if($(this).is(":checked")){
			  	 	 	$(this).parent().parent().addClass("li-check");
			  	 	 }else{
			  	 	 	$(this).parent().parent().removeClass("li-check");
			  	 	 }
			  	 	 if(checkNum>0){
		  	 	 		//改变当前表头字体样式和图标
			  			$(".data-query").prev().addClass("th-font-change");
			  			$(".data-query").prev().find("img").attr("src","../../resources/images/icons/lou-dou.png");
			  			//显示清除查询
			  	 	 	$(".data-query .yt-clear-query").show();
			  	 	 }else{
			  	 	 	//隐藏清除查询
			  	 	 	$(".data-query .yt-clear-query").hide();
			  	 	 	//改变当前表头字体样式和图标
			  			$(".data-query").prev().removeClass("th-font-change");
			  			$(".data-query").prev().find("img").attr("src","../../resources/images/icons/white-down.png");
			  	 	 }
			  	 });
			  	 /**
			  	  * 鼠标悬浮事件
			  	  */
			  	  $(".data-query ul li").off().on("mouseover",function(){
				  	  	  if($(this).find("label input").val()=="start"){
				  	  	  		 $("#start-time").click();	
				  	  	  		 //显示开始日期控件
				  	  	  		 $("#startDate").show();
				  	  	  		 //隐藏结束的日期控件
				  	  	  		 $("#endDate").hide();
				  	  	  	
				  	  	  }
				  	  	  if($(this).find("label input").val()=="end"){
				  	  	  		$("#end-time").click();
				  	  	  		//隐藏开始的日期控件
				  	  	  		$("#startDate").hide();
				  	  	  		//显示结束的日期控件
				  	  	  		$("#endDate").show();
				  	 			}
				  	  	  
				  	  	  /*
				  	  	   * 日期控件悬浮离开时隐藏当前控件
				  	  	   */
									$(".calendar").off().mouseleave(function(){
										  $(this).hide();
										  //隐藏当前日期查询块
										  $(".data-query").hide();
										  //删除th中选中样式
										  $(".yt-screen-thead  thead th .yt-screen-font").removeClass("check");
									});
			  	  });
			  	  
			  	  /**
			  	   * 日期控件调用初始化方法
			  	   */
			  	  $("#start-time").calendar({
						controlId: "startDate",
						nowData:false,
						callback: function() {
							//控制复选框选中
							$("#start-time").prev().find("input").setCheckBoxState("check");
							//设置结束时间的复选框未选中
							$("#end-time").prev().find("input").setCheckBoxState("uncheck");
							$("#start-time").prev().parent().addClass("li-check");
							$("#end-time").prev().parent().removeClass("li-check");
							$(".data-query .yt-clear-query").show();
						},
						upperLimit:$("#end-time") //开始日期最大为结束日期
					});
					$("#end-time").calendar({
					 	controlId: "endDate",
					 	nowData:false,
					 	callback:function(){
			        	//控制复选框选中
			        	$("#end-time").prev().find("input").setCheckBoxState("check");
			        	//设置开始时间的复选框,取消选中
			        	$("#start-time").prev().find("input").setCheckBoxState("uncheck");
			        	$("#start-time").prev().parent().removeClass("li-check");
								$("#end-time").prev().parent().addClass("li-check");
								$(".data-query .yt-clear-query").show();
			       },
						lowerLimit:$("#start-time") //结束日期最小为开始日期
					});
			  }
			  /**
			   * 
			   * 数字查询
			   * 
			   */
			  function numberQueryEvent(){
			  	/**  
	             * 调用数字输入框方法  
	             */  
	            $(".number-query .yt-numberInput-box").each(function(){
	            	//调用数字框方法
	            	 $yt_baseElement.numberInput($(this)); 
	            });
	            /**
	             * 数字框获取焦点事件
	             */
	            $(".number-query .yt-numberInput-box input").on("focus",function(){
	            	$(".number-query .yt-clear-query").show();
	            	$(".number-query .yt-numberInput-box").css("background-color","#fff");
	            	$(this).parent().css("background-color","#e1ecf6");
	            });
	            /**
	             * 数字框失去焦点事件
	             */
	            $(".number-query .yt-numberInput-box input").on("blur",function(){
	            	$(".number-query .yt-numberInput-box").css("background-color","#fff");
	            });
	             $(".number-query .yt-numberInput-box input").on("keyup",function(){
	            	if($(this).val()>0){
	            		//改变当前表头字体样式和图标
					  			$(".number-query").prev().addClass("th-font-change");
					  			$(".number-query").prev().find("img").attr("src","../../resources/images/icons/lou-dou.png");
	            	}else{
	            		//改变当前表头字体样式和图标
					  			$(".number-query").prev().removeClass("th-font-change");
					  			$(".number-query").prev().find("img").attr("src","../../resources/images/icons/white-down.png");
	            	}
	            	 	
	            });
							$(".yt-numberInput-box .yt-spin-up,.yt-numberInput-box .yt-spin-down").click(function(){
									var inputVal = $(this).parents(".number-query").find(".yt-numberInput");
									var inputVal1 = inputVal[0].value;
									var inputVal2 = inputVal[1].value;
									var inputVal3 = inputVal[2].value;
									var sum = Number(inputVal1)+ Number(inputVal2)+ Number(inputVal3);
									if(sum>0){
										//改变当前表头字体样式和图标
						  			$(".number-query").prev().addClass("th-font-change");
						  			$(".number-query").prev().find("img").attr("src","../../resources/images/icons/lou-dou.png");
						  			$(".number-query .yt-clear-query").show();
									}else{
										//改变当前表头字体样式和图标
						  			$(".number-query").prev().removeClass("th-font-change");
						  			$(".number-query").prev().find("img").attr("src","../../resources/images/icons/white-down.png");
						  			$(".number-query .yt-clear-query").hide();
									}
							});
				/**
				 * 数字查询中的清除查询
				 */
				 $(".number-query .yt-clear-query").off().on("click",function(){
					 	$(".number-query input[type='text']").val("0");
					 	$(this).hide();
					 	//改变当前表头字体样式和图标
		  			$(".number-query").prev().removeClass("th-font-change");
		  			$(".number-query").prev().find("img").attr("src","../../resources/images/icons/white-down.png");
				 });
			  }
			  /**
			   * 
			   * 清除查询数据
			   * 
			   */
			  function clearQueryEvent(obj){
			  	//清除所有单选,多选,li标签选中样式
			  	if($(".yt-suspension-model ul li label.yt-radio input:checked").length>0){
			  		$(".yt-suspension-model ul li label.yt-radio input:checked").setRadioState("uncheck");
			  	}
			    if($(".yt-suspension-model ul li label.yt-checkbox input:checked").length>0){
			    	$(".yt-suspension-model ul li label.yt-checkbox input:checked").setCheckBoxState("uncheck");
			    }
			  	$(".yt-suspension-model ul li").removeClass("li-check");
			  	//清除输入框内容
			  	$(".yt-suspension-model ul li input[type='text']").val("");
			  	//隐藏清除查询按钮
			  	$(".yt-suspension-model").find(".yt-clear-query").hide();
			  	
			  	//改变当前表头字体样式和图标
	  			$(obj).parents(".yt-suspension-model").prev().removeClass("th-font-change");
	  			$(obj).parents(".yt-suspension-model").prev().find("img").attr("src","../../resources/images/icons/white-down.png");
			  }
			 