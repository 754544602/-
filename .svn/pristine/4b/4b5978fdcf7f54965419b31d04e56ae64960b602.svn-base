(function($) {
	//定义人员信息全局变量
	var USERS_LIST = "";
	var thisUserObj = "";
	var usersControl = {
		init: function(obj, opt) {
			var me = this;
			usersControl.thisUserObj = obj;
			//配置DOM
			me.setHtml(obj, opt);
			//配置事件
			me.setEvent(obj, opt);
		},
		setHtml: function(obj, opt) {
			//接收控件类名
			var controlClass = opt.controlClass || '';
			var html = $('<div class="yt-users-control '+controlClass+'"><div class="yt-users-model"><input type="text" class="yt-input yt-user-input" placeholder="请输入姓名" /></div>'
			         +'<div class="yt-users-list"><label class="yt-read-text" style="margin-left: 5px;">请选择人员：</label>'
			         +'<ul></ul></div></div>'
			       );
			return obj.html(html);
		},
		setEvent: function(obj, opt) {
			var me = this;
			//调用获取数据方法
			me.getUsersDatas(obj, opt);
			//调用控件操作事件方法
			me.events(obj, opt);
		},
		events: function(obj, opt) {
			//清除已选人员的右键菜单
			obj.find(".yt-users-model .user-obj").on('contextmenu', function(e) {
				 e.preventDefault();
				//return false;
			});
			//已选人员右键操作
			obj.find('.yt-users-model .user-obj').mousedown(function(e){ 
				//清除冒泡
				$yt_baseElement.eventStopPageaction();
				//添加选中样式
				obj.find(".yt-users-model .user-obj").removeClass("check-users");
				$(this).addClass("check-users");
				var thisObj = $(this);
				if(e.which == 3){
					//调用拼接右键菜单方法
					usersControl.setInteractive(obj,opt,thisObj);
					//显示右键菜单
			 		usersControl.rightButConPosition(e);
			 		obj.find("#rightButCon").show();
			 		//点击删除
					obj.find(".right-button-context .del-only").click(function(){
						//去除冒泡
						$yt_baseElement.eventStopPageaction();
						//遍历人员列表信息删除对应人员选中
					  	obj.find(".yt-users-list li:not(.more-data)").each(function(i,n){
					  		if($(thisObj).data("userData")){
					  			if($(n).data("userData").userItcode == $(thisObj).data("userData").userItcode){
						  			$(n).removeClass("user-check-li");
						  			return false;
						  		}
					  		}
					  	});
						//删除当前选中的人员
						$(thisObj).remove();
					});
					//点击右键菜单清除全部
					obj.find(".right-button-context .del-all").click(function(){
						//去除冒泡
						$yt_baseElement.eventStopPageaction();
						//清除所有选中的人员
						obj.find('.yt-users-model .user-obj').remove();
						obj.find(".yt-users-list li").removeClass("user-check-li");
					});
					//点击右键菜单取消
					obj.find(".right-button-context .canel-li").click(function(){
						//去除冒泡
						$yt_baseElement.eventStopPageaction();
						//删除右键菜单
						$(".right-button-context").remove();
					});
				}
			}) 
		    //点击人员列表事件
		    obj.find(".yt-users-list li:not(.more-data)").off().on("click",function(){
		    	//调用冒泡方法
			    $yt_baseElement.eventStopPageaction();
		    	//判断是否选中,去重操作
				if($(this).hasClass("user-check-li")){
					//删除已选中样式
					$(this).removeClass("user-check-li");
					//对应删除已选择的人员
					//获取选中的人员code
					var userItcode = $(this).data("userData").userItcode;
					obj.find(".yt-users-model .user-obj").each(function(i,n){
						//比对人员code值
						if(userItcode == $(n).data("userData").userItcode){
							$(n).remove();
							return false;
						}
					})
					return;
				}else{
					//添加选中样式
		    		$(this).addClass("user-check-li");
		    		//获取选中的人员数据对象
		    		var userData = $(this).data("userData");
		    		//拼接已选择的人员
		    		obj.find(".yt-users-model .yt-user-input").before($('<span class="user-obj">'+userData.userName+'、</span>').data("userData",userData));
		    		//调用点击事件
		    		usersControl.events(obj,opt);
				}
		    });
		    //输入框获取焦点事件
		    obj.find(".yt-users-model .yt-user-input").on("focus",function(){
			    //先判断是否有已选中的人员
		    	if(obj.find(".yt-users-model .user-obj").length > 0){
		    		var  usersCode = ",";
		    		//遍历所有的人员信息,存储人员code
		    		obj.find(".yt-users-model .user-obj").each(function(i,n){
						usersCode +=$(n).data("userData").userItcode+",";
					});
					//遍历人员列表信息
				    obj.find(".yt-users-list li:not(.more-data)").each(function(i,n){
				    	var Itcode = ","+$(n).data("userData").userItcode+",";
				    	//比对人员信息
						if(usersCode.indexOf(Itcode) >= 0){
							//加上选中样式
		    				$(n).addClass("user-check-li");
						}
				    });
		    	}
			    //显示人员列表
			    obj.find(".yt-users-list").show();
		    });
		     //输入框失去焦点事件
		    obj.find(".yt-users-model .yt-user-input").on("blur",function(){
			    $(this).val('');
		    });
		    //人员输入键盘松开事件
			obj.find(".yt-users-model .yt-user-input").off("keyup").on("keyup", function() {
				//调用模糊查询人员信息方法
				usersControl.searchUserInfo(obj,opt,$(this).val());
			});
		},
		/**
		 * 调用接口获取人员数据
		 * @param {Object} obj 区域对象
		 * @param {Object} opt 参数对象
		 */
		getUsersDatas: function(obj, opt) {
			$.ajax({
				type: 'get',
				url: opt.dataUrl,
				async: false,
				data:{
					params: '',
					pageIndex: 1,
					pageNum: 99999 //每页显示条数
				},
				success: function(data) {
					//判断请求是否成功
					if(data.flag == 0){
						//判断数据长度
						if(data.data.rows.length > 0){
							//给人员信息全局变量赋值
							USERS_LIST = data.data.rows;
							//调用加载更多数据方法
							usersControl.getMoreData(obj,opt,USERS_LIST);
						}
					}
				},error:function(e){}
			});
		},
		/**
		 * 模糊查询
		 * @param {Object} obj 人员对象
		 * @param {Object} opt 参数对象
		 * @param {Object} keyword 关键字值
		 */
		searchUserInfo:function(obj,opt,keyword){
			//接收人员字符串
			var liStr = "";
			//清空人员列表
			obj.find(".yt-users-list ul").empty();
			//检索标识
			var selNum = 0;
			var userList = [];
			//遍历人员信息集合
			$.each(USERS_LIST, function(i,n) {
				//判断是否有关键字
				if(keyword !=undefined){
					//检索匹配人员
					if(n.userName.indexOf(keyword) >= 0){
						selNum+=1;
						//存储检索到的数据
						userList.push(n);
					}
				}else{
					selNum+=1;
				}
			});
			//判断检索存储的集合数据是否有值
			if(userList !="" && userList.length > 0){
				//调用加载更多数据方法
				usersControl.getMoreData(obj,opt,userList);
			}
			//让输入框获取焦点
			obj.find(".yt-users-model .yt-user-input").focus();
			//调用弹出框中操作事件方法
			usersControl.events(obj,opt);
			//未检索到数据拼接无数据
			if(selNum == 0){
				obj.find(".yt-users-list ul").append('<li style="text-align: center;">暂无数据</li>');
			}
		},
		/**
		 * 加载更多数据
		 * @param {Object} obj 当前对象
		 * @param {Object} opt 参数对象
		 * @param {Object} datas 数据集
		 */
		getMoreData:function(obj,opt,datas){
			//每页显示条数
		    var loadPageNum = 20;
		    //当前页码
		    var pageNum = 1;
			//人员列表对象
			var usersUl = $(".yt-users-list ul");
			//先清空
			obj.find(".yt-users-list ul").empty();
			var liStr = "";
			$.each(datas,function(i,n){
				//初始只显示前20条数据
				if(i < loadPageNum){
					liStr += '<li>' + n.userName + '/' + n.deptName + '</li>';
					//存储当前出差人的数据对象
					liStr = $(liStr).data("userData",n);
					$(usersUl).append(liStr);
				}else{
					liStr += '<li class="more-data" style="text-align: center;color: #417095;border-bottom:0px;">加载更多...</li>';
					liStr = $(liStr);
					//存储当前出差人的数据对象
					$(usersUl).append(liStr);
					return false;
				}
			});
			//点击加载更多
			//记录显示总条数
			var dataPageTotal = 0;
			obj.find(".yt-users-list ul li.more-data").off().on("click",function(){
				//判断显示总条数是否有值
				if(dataPageTotal == 0){
					dataPageTotal = (loadPageNum+1);
				}else{
					dataPageTotal +=20;
				}
				dataPageTotal = parseInt(dataPageTotal);
				//计算共有多少页
				var pageTotal = parseInt(datas.length/loadPageNum);
				//当前页加1
				pageNum +=1;
				//加载出其他的人员信息,20个以后的
				var liStr = "";
				for(var i = dataPageTotal;i < (dataPageTotal+20);i++) {
					if(datas[i] !=undefined){
						liStr += '<li>' + datas[i].userName + '/' +datas[i].deptName + '</li>';
						//存储当前出差人的数据数据对象
						liStr = $(liStr).data("userData", datas[i]);
						$(".yt-users-list ul li.more-data").before(liStr);
					}else{
						//设置加载更多文字灰色,去除点击事件
						$(this).text("已全部加载").css("color","#D0D0D0").off("click");
						return;
					}
				}
				//调用操作事件
				usersControl.events(obj,opt);
			});
			//调用操作事件
			usersControl.events(obj,opt);
		},
		/**
		 * 添加右键菜单方法
		 * @param {Object} obj 人员对象
		 * @param {Object} opt 参数对象
		 * @param {Object} thisObj 当前添加右键菜单对象
		 */
		setInteractive:function(obj,opt,thisObj){
			//先清除其他的右键菜单
			obj.find(".yt-users-model #rightButCon").remove();
			var html = '<div id="rightButCon" class="right-button-context"><div><div class="li-div del-only">清除</div><div class="li-div del-all">清除全部</div><div class="li-div canel-li">取消</div><div></div>';
			$(thisObj).append(html);
		},
		/**
		 * 设置右键菜单的显示位置
		 * @param {Object} e
		 */
		rightButConPosition:function(e){
			var left = e.clientX;
			var top = e.clientY;
			//弹出框对象
			var rightButCon = $('#rightButCon');
			//宽度
			var width = rightButCon.width();
			//高度
			var height = rightButCon.height();
			//获取页面的宽高
			var w = $(window);
			var winWidth = w.width();
			var winHeight = w.height();
			//计算超出定位的显示方式
			left = width + left > 　winWidth ? left - width : left;
			top = height + top > winHeight ? top - height : top;
			rightButCon.show().css({
				left: left,
				top: top
			});
		}
	};
	$.fn.extend({
		usersControl: function(opt) {
			var defaults = {
				controlClass:'',//控件类名
				dataUrl:'',//数据请求路径,接口访问路径,json文件访问路径
				callback: function() {}
			}
			// opt.controlClass 控件类名
			// opt.callback 回调函数
			// opt.dataUrl  数据请求路径,接口访问路径,json文件访问路径
			//整合参数配置
			var options = $.extend(defaults, opt);
			this.ytUsersControl = usersControl;
			this.ytUsersControl.init($(this), options);
			return $(this);
		},
		setUsersChoose:function(opt){
			//遍历人员集合
			$.each(USERS_LIST, function(i,n) {
				var Itcode = ","+n.userItcode+",";
				if(opt !=undefined && opt !=null && opt!="" && opt.indexOf(Itcode) >= 0){
					//拼接已选择的人员
    				usersControl.thisUserObj.find(".yt-users-model .yt-user-input").before($('<span class="user-obj">'+n.userName+'、</span>').data("userData",n));
				}
			});
		}
	});
	$(function(){
		//点击页面其他地方隐藏
		$(document).click(function (e) {
		   if(!$(e.target).hasClass("yt-users-list") && !$(e.target).hasClass("yt-user-input") && !$(e.target).hasClass("more-data") && !$(e.target).hasClass("user-obj")){
			  //隐藏人员列表和选中人员框
		　　　　  $(".yt-users-list").hide();
		      //调用加载更多数据方法
			  usersControl.getMoreData(usersControl.thisUserObj,'',USERS_LIST);
		　　}
		});
		//监听键盘事件
		$(document).keydown(function(event){
		  var  userItcode = "";
		  //判断人员输入框是否获取焦点
	      if($(".yt-users-model .yt-user-input").is(":focus")){
	      	//BackSpace
		      if(event.keyCode == 8){
		      	 //找到已选中的最后一个人进行删除
		      	 if($(".yt-users-model span.user-obj").length>0){
		      	 	userItcode = $('.yt-users-model span.user-obj:eq('+($(".yt-users-model span.user-obj").length-1)+')').data("userData").userItcode;
		      		$('.yt-users-model span.user-obj:eq('+($(".yt-users-model span.user-obj").length-1)+')').remove();
		      	 }
		      }
	      }
	    //遍历人员列表信息删除对应人员选中
	    if(userItcode !=undefined && userItcode !=""){
	    	$(".yt-users-list li:not(.more-data)").each(function(i,n){
		  		if($(n).data("userData").userItcode == userItcode){
		  			$(n).removeClass("user-check-li");
		  			return false;
		  		}
		  	});
	    }
	});
	
	});
})(jQuery);
