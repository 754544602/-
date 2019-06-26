var $yt_screen_data = {
	init: function() {
		//调用操作事件方法
		$yt_screen_data.events();
	},
	events: function() {
		//调用获取配置数据项启用中的主数据列表信息
		$yt_screen_data.getAllBudgetSpecialInfoList();
		/**
		 * 点击查询按钮操作事件
		 */
		$("#queryBtn").click(function(){
			//根据查询条件查询数据刷新未选数据框数据
		});
		/**
		 * 点击重置按钮操作事件
		 */
		$("#resetBtn").click(function(){
			//初始化未选框中的数据
			//初始化查询字段
			$(".rela-dept-search").val('');
		});
		/**
		 * 点击保存或取消按钮操作事件
		 */
		$(".yt-relevance-pop .yt-eidt-model-bottom button").click(function(){
			//判断如果是保存按钮
			if($(this).hasClass("save-btn")){
				//获取已选框中的数据进行下一步操作
			}
			//清空关键字输入框值
			$(".rela-dept-search").val('');
			//清空已选栏中的数据
			$('.role-right-ul').empty();
			//调用公用方法关闭数据筛选弹出框
			sysCommon.closeModel($(".yt-relevance-pop"));
		});
		/**
		 * 
		 * 点击逐个插入按钮操作事件
		 * 
		 */
		$(".yt-set-role-button").on("click", ".right", function() {
			//调用向已选框添加数据方法
			$yt_screen_data.addRightData();
		});
		/**
		 * 
		 * 全部插入按钮操作事件
		 * 
		 */
		$(".yt-set-role-button").on("click", ".d-right", function() {
			//获取所有未选中节点
			var uncheckNode = $('#dataItemTree').tree('getChecked', 'unchecked');
			//获取所有选中节点
			var checkNodes = $('#dataItemTree').tree('getChecked');
			//设置树形复选全部勾选
			$.each(uncheckNode, function(i, n) {
				//去除选中状态
				$("#dataItemTree").tree("check", n.target);
			});
			//设置树形复选全部勾选
			$.each(checkNodes, function(i, n) {
				$("#" + n.domId).find("span.tree-title").css("color", "rgb(65, 141, 204)");
			});
			//展开所有节点
			$("#dataItemTree").tree('expandAll', uncheckNode.target);
			//调用向已选框添加数据方法
			$yt_screen_data.addRightData();
		});
		/**
		 * 
		 * 点击逐个移除按钮操作事件
		 * 
		 */
		$(".yt-set-role-button").on("click", ".left", function() {
			//获取所有选中的树形菜单节点
			var childNode = $("#dataItemTree").tree('getChecked');
			//获取父节点
			var parentNode = "";
			//父级的父级
			var parentsNode = "";
			//存储已选的数据集合
			var selDatas = [];
			//遍历已选栏中选中的数据
			$(".role-right-ul li.li-active").each(function(i, n) {
				//存储选中的数据id
				selDatas.push($(n).attr('liid'));
			});
			//遍历树形的子节点
			$.each(childNode, function(i, n) {
				//遍历选中的数据集合
				$.each(selDatas, function(i, s) {
					//比对ID
					if(n.id == selDatas[i]) {
						//去除树形选中状态和样式
						$("#dataItemTree").tree("uncheck", n.target);
						$("#" + n.domId).find("span.tree-title").css("color", "#333");
					}
				});
			});
			//删除已选栏中的选中li标签
			$(".role-right-ul").find('.li-active').remove();
		});
		/**
		 * 
		 * 点击全部移除按钮操作事件
		 * 
		 */
		$(".yt-set-role-button").on("click", ".d-left", function() {
			//获取所有选中的复选框
			var oneright = $("#dataItemTree").tree('getChecked');
			//获取根节点
			var rootNode = $('#dataItemTree').tree('getRoot');
			//折起所有的节点
			$("#dataItemTree").tree('collapseAll', rootNode.target);
			//循环获取所有选中的树形节点复选框
			$.each(oneright, function(i, n) {
				///清空左边的选中
				$('#dataItemTree').tree('uncheck', oneright[i].target);
			});
			//清除所有已选的数据
			$(".role-right-ul").find('li').remove();
		});
		//已选框li点击添加背景色类,再次点击去除	
		$(".role-right-ul").on('click', "li", function() {
			$(this).toggleClass('li-active');
		});
	},
	/**
	 * 
	 * 获取数据
	 * 
	 */
	getAllBudgetSpecialInfoList: function() {
		$.ajax({
			type: "get",//请求json数据为get,请求接口请改为post请求方式
			url: $websit_path + 'resources/js/screenData/specialInfoList.json', //ajax访问路径
			success: function(data) {
				var trStr = "";
				if(data.flag == 0) {
					//存储未选数据集合
					var dataL = data.data.tableKeyList;
					//item.treeAllData = dataL;
					//存储已选数据集合
					var dataR = data.data.rightTableKeyList;
					//创建easyui树形结构
					$("#dataItemTree").tree({
						data: dataL,
						animate: true,
						checkbox: true,
						onClick: function(node) {
							//树形点击操作事件
							if(node.checkState != undefined) {
								if(node.checkState == "checked") {
									$("#dataItemTree").tree("uncheck", $("#" + node.domId));
									$("#" + node.domId).find("span.tree-title").css("color", "#333");
								} else {
									$("#dataItemTree").tree("check", $("#" + node.domId));
									$("#" + node.domId).find("span.tree-title").css("color", "#418dcc");
								}
							}
						},
						onCheck: function(node, checked) {
							//树形选中操作事件
							if(checked) {
								$("#" + node.domId).find("span.tree-title").css("color", "#418dcc");
								$("#" + node.domId).next().find("li span.tree-title").css("color", "#418dcc");
							} else {
								$("#" + node.domId).find("span.tree-title").css("color", "#333");
								$("#" + node.domId).next().find("li span.tree-title").css("color", "#333");
							}
						}
					});
					//去除easyUI左侧文件夹图标
					$(".tree-icon,.tree-file").removeClass("tree-icon tree-file");
					$(".tree-icon,.tree-folder").removeClass("tree-icon tree-folder tree-folder-open tree-folder-closed");
					var liStr = "";
					//已选框对象
					var htmlUl = $(".role-right-ul");
					//判断已选数据是否有值
					if(dataR.length > 0) {
						//清空已选框中的数据
						$(".role-right-ul").find('li').remove();
						//遍历已选数据集合
						$.each(dataR, function(i, n) {
							//拼接已选数据
							liStr += '<li tableDictCode="' + n.tableDictCode + '" liId=' + n.subCode + '>' + n.subName + '</li>';
						});
						htmlUl.append(liStr);
					}
				}
			},
			error: function(data) {}
		});
	},
	/**
	 * 
	 * 
	 * 公用的向右侧添加数据
	 * 
	 */
	addRightData:function(){
		//获取选中的节点
		var checkNode = $('#dataItemTree').tree('getChecked');
		//存储已选框对象
		var ulBody = $(".role-right-ul");
		//定义一个对象
		var checkDict = {};
		//获取所有右边的li
		var liAttr = $(".role-right-ul li");
		//非空判断
		if(liAttr != undefined) {
			//将自定义属性循环添加进字符串
			//用来储存所有的tablecode
			var checkKey = "";
			//用来储存对象里的tablecode字段
			var checkValue = ",";
			//用来储存所有的id
			var getLiVal = "";
			$.each(liAttr, function(i, d) {
				//获取id并进行非空验证
				getLiVal = $(d).attr('liid') == undefined || $(d).attr('liid') == null ? "" : $(d).attr('liid');
				//获取code并进行非空验证
				checkKey = $(d).attr('tableDictCode') == undefined || $(d).attr('tableDictCode') == null ? "" : $(d).attr('tableDictCode');
				//指定对象中的checkKey字段
				checkValue = checkDict[checkKey];
				//如果为空赋值初始值 ，
				if(checkValue == undefined || checkValue == null) {
					checkValue = ",";
				}
				//二次赋值为所有的id
				checkValue = checkValue + (getLiVal == "" ? "" : getLiVal + ",");
				//将所有的id存到对象中的checkKey字段
				checkDict[checkKey] = checkValue;
			});
		}
		//初始化变量
		checkValue = "";
		//声明li字符串
		var liStr = "";
		//循环获取所有选中的复选框
		$.each(checkNode, function(i, n) {
			if(n.sortId) {
				//赋值为对象中的tableDictCode内的所有值也就是之前赋值的此tablecode下的所有所属id
				checkValue = checkDict[n.tableDictCode] == undefined || checkDict[n.tableDictCode] == null ? "" : checkDict[n.tableDictCode];
				//通过获取的所有的所属id进行判断，负一为非相同，正常添加，反之不添加     此比对为一次获取一个tablecode  和之下的所有id，进行tablecode内的比对
				if(checkValue.indexOf("," + n.id + ",") < 0) {
					liStr += '<li tableDictCode="' + n.tableDictCode + '" liid=' + n.id + '>' + n.text + '</li>';
				}
			}
		});
		ulBody.append(liStr);
	}
}
$(function() {
	$yt_screen_data.init();
})