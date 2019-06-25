var dictionaryTree = {
	dictingaryTreeDate:[],//弹窗下拉框数据
	//初始化
	init: function() {
		//初始化下拉列表
		$("select").niceSelect();
		//设置子页面的高度
		$("#dictionaryTree").css("min-height", $(window).height() - 55 + "px");
		dictionaryTree.events();
		dictionaryTree.getBudgetDataInfo();
	},
	//事件绑定
	events: function() {
		//新增字典按钮事件绑定
		$("#addDictionary").on("click", function() {
			dictionaryTree.showAddPop();
		});
		//编辑字典按钮事件绑定
		$("#editDictionary").on("click", function() {
			var thisTr = $(".datagrid-view2 .datagrid-row.datagrid-row-checked");
			var selTrLen = $(".datagrid-view2 .datagrid-row.datagrid-row-checked").length;
			if(selTrLen > 0) {
				dictionaryTree.showAddPop(thisTr);
			} else {
				$yt_alert_Model.prompt("请选择一行数据进行操作");
			}
		});
		//行点击时修改启用按钮事件
		$("#dictionaryTree").off().on("click", ".datagrid-row", function() {
			var thisObj = $(this);
			var trState = thisObj.find(".datagrid-cell-c2-status .status-span").text();
			if(trState == "启用") {
				$("#blockUpBtn").text("停用");
			} else {
				$("#blockUpBtn").text("启用");
			}
		});
		//展开切换按钮事件
		$("#switchoverBtn").on("click", function() {
			var thisBtn=$(this);
			if(thisBtn.text()=='展开'){
				//展开全部
				$('#budgetTab').treegrid("expandAll");
				thisBtn.text("折叠");
			}else{
				//关闭
				$('#budgetTab').treegrid('collapseAll');
				thisBtn.text("展开")
			}
		});
	},
	//带有顶部标题栏的弹出框  
	showAddPop: function(thisTr) {
		//编辑时执行代码
		if(thisTr) {
			$('#dictionaryPop .serv-btn').show();
			$('#dictionaryPop .sure-btn').hide();
			//取值
			var widgetCode = thisTr.find(".datagrid-cell-c2-widgetCode .dict-type-code").text();
			var widgetName = thisTr.find(".datagrid-cell-c2-widgetName .dis-value").text();
			var parentInput = thisTr.find("input.parent-type-code").val();
			var parentArr = parentInput.split(',');
			//赋值
			$("#widgetCode").val(widgetCode).attr("disabled",true);
			$("#widgetName").val(widgetName);
			$("#parentTree").val(parentArr[1]);
			$("#parentCode").val(parentArr[0]);
		} else {
			$('#dictionaryPop .serv-btn').hide();
			$('#dictionaryPop .sure-btn').show();
		}
		/** 
		 * 显示编辑弹出框和显示顶部隐藏蒙层 
		 */
		$("#dictionaryPop,#heard-nav-bak").show();
		/** 
		 * 调用算取div显示位置方法 
		 */
		$yt_alert_Model.getDivPosition($("#dictionaryPop"));
		/*保存按钮事件绑定*/
		$('#dictionaryPop .serv-btn').off().on("click", function() {
			//验证弹窗字段
			var isTrue = $yt_valid.validForm($("#dictionaryPop"));
			if(isTrue) {
				//取值
				var widgetCode = $("#widgetCode").val();
				var widgetName = $("#widgetName").val();
				var parentTree = $("#parentTree").val();
				var parTypeCode=$("#parentCode").val();
				//执行修改操作
				$.ajax({
					type: "post",
					url: "widget/main/updateWidgetMain",
					async: true,
					data: {
						widgetCode:widgetCode,
						widgetName:widgetName,
						parentCode:parTypeCode,
					},
					success: function(data) {
						if(data.flag == 0) {
							$yt_alert_Model.prompt(data.message);
							//清空弹窗数据
							$("#parentTree,#widgetName,#widgetCode").val("").removeClass("valid-hint");
							$("#widgetCode").attr("disabled",false);
							$(".valid-font").text("");
							$("#parentTree").click(function(){
								var thisBtn=$(this);
								thisBtn.toggleClass("open");
							});
							//隐藏页面中自定义的表单内容  
							$("#dictionaryPop,#heard-nav-bak").hide();
							//隐藏蒙层  
							$("#pop-modle-alert").hide();
							//调用查询数据字典列表方法
							dictionaryTree.getBudgetDataInfo();
						} else {
							$yt_alert_Model.prompt(data.message);
						}
					}
				});
				
			}
		});
		//确定按钮事件绑定
		$('#dictionaryPop .sure-btn').off().on("click", function() {
			//验证弹窗字段
			var isTrue = $yt_valid.validForm($("#dictionaryPop"));
			if(isTrue) {
				//取值
				var widgetCode = $("#widgetCode").val();
				var widgetName = $("#widgetName").val();
				var parentTree = $("#parentTree").val();
				var parTypeCode=$("#parentCode").val();
				//执行添加操作
				$.ajax({
					type: "post",
					url: "widget/main/addWidgetMain",
					async: true,
					data: {
						widgetCode:widgetCode,
						widgetName:widgetName,
						parentCode:parTypeCode,
					},
					success: function(data) {
						if(data.flag == 0) {
							$yt_alert_Model.prompt(data.message);
							//清空弹窗数据
							$("#parentTree,#widgetName,#widgetCode").val("").removeClass("valid-hint");
							$(".valid-font").text("");
							$("#parentTree").click(function(){
								var thisBtn=$(this);
								thisBtn.toggleClass("open");
							});
							//隐藏页面中自定义的表单内容  
							$("#dictionaryPop,#heard-nav-bak").hide();
							//隐藏蒙层  
							$("#pop-modle-alert").hide();
							//调用查询数据字典列表方法
							dictionaryTree.getBudgetDataInfo();
						} else {
							$yt_alert_Model.prompt(data.message);
						}
					}
				});
			}
		});

		/** 
		 * 点击取消方法 
		 */
		$('#dictionaryPop .yt-model-canel-btn').off().on("click", function() {
			//清空弹窗数据
			$("#parentTree,#widgetName,#widgetCode").val("").removeClass("valid-hint");
			$("#widgetCode").attr("disabled",false);
			$(".valid-font").text("");
			//隐藏页面中自定义的表单内容  
			$("#dictionaryPop,#heard-nav-bak").hide();
			//隐藏蒙层  
			$("#pop-modle-alert").hide();
		});
	},

	createTreeData:function(){
		$('#parentTree').removeClass("tree-input");
		$('#parentTree').removeClass("open");
		$('#treeDiv').remove();
		$('#parentTree').createTree({
			controlId: 'treeDiv', // 必选 弹出的树列表控件ID，默认: $(this).attr("id") + "Tree"  
			dataList: dictionaryTree.dictingaryTreeDate, // 必选 对象数组 树列表数据  
			rootConfig: { //必选 设置根目录的 默认信息  
				id: "0", //根目录ID  
				pid: "-1", // 根目录上一级ID 固定值为-1  
				name: "数据字典" //根目录名称  
			},
			listConfig: { // 必选 树列表节点参数名称 设置为传入的数据对象参数名称  
				id: 'widgetCode', //参数ID名称  
				pid: 'parentCode', //上一级ID名称  
				name: 'widgetName' //参数名称  
			},
			speed: 0, // 可选 下拉树列表显示速度 参数"slow","normal","fast"，或毫秒数值，默认：200      
			//readonly: true, //可选 目标对象是否设为只读，默认：true  
			//checked: false,//可选 是否显示多选框 默认：false  
			hide: true, //设置单击节点立即隐藏 默认：false  
			callback: {
				onClick: dictionaryTree.getNode //可选 点击树列表节点触发的事件  
			}
		});
	},
	/** 
	 * 点击树列表节点触发事件 
	 * @param {Object} obj 点击的对象 
	 * @param {Number} id 点击对象的ID 
	 * @param {String} name 点击对象的名称 
	 */
	getNode: function(obj, id, name) {
		$('#parentTree').val(name);
		$('#parentCode').val(id);
	},
	/**
	 * 获取数据字典列表数据
	 * @param {Object} yearVal 预算年度
	 */
	getBudgetDataInfo: function() {
		$.ajax({
			type: "post",
			url: "widget/main/getWidgetMainListByParams",
			async: true,
			data: {},
			success: function(data) {
				if(data.flag == 0) {
					var datas = dictionaryTree.getTreeData(data.data, '0', "widgetCode", "parentCode");
					$('#budgetTab').treegrid("loadData", datas);
					var thisArr=data.data;
					dictionaryTree.dictingaryTreeDate=thisArr;
					dictionaryTree.createTreeData();
				} else {
					$yt_alert_Model.prompt(data.message);
				}
			}
		});

	},
	/**
	 * 属性返回数据转换
	 * @param {Object} data 返回数据集
	 * @param {Object} parentId 父级ID
	 */
	getTreeData: function(data, parentId, code, parentCode) {
		code = code ? code : 'id';
		parentCode = parentCode ? parentCode : 'parentId';
		var me = this;
		var result = [],
			temp;
		for(var i in data) {
			if(data[i][parentCode] == parentId) {
				result.push(data[i]);
				temp = me.getTreeData(data, data[i][code], code, parentCode);
				if(temp.length > 0) {
					data[i].children = temp;
				}
			}
		}
		return result;
	},
	/**
	 * 
	 * 事件初始化
	 * 
	 */
	eventInit: function() {}
}
$(function() {
	//调用初始化方法
	dictionaryTree.init();
	$('#budgetTab').treegrid({
		idField: 'widgetCode',
		treeField: 'widgetCode',
		columns: [
			[{
					title: 'CODE',
					field: 'widgetCode',
					width: '50%',
					align: 'center',
					formatter: function(value, row, index, num) {
						return '<input type="hidden" class="parent-type-code" value="' + (row.parentCode ==0 ? '0,数据字典' : (row.parentCode + ',' + row.parentCodeName)) + '"/><span class="dict-type-code">' + value + '</span>';
					}
				},
				{
					title: '名称',
					field: 'widgetName',
					width: '51%',
					align: 'center',
					formatter: function(value, row, index, num) {
						return '<span class="dis-value">' + value + '</span>';
					}
				}/*,
				{
					title: '状态',
					field: 'status',
					width: '20%',
					align: 'center',
					formatter: function(value, row, index, num) {
						return  (value == "1" ? "<span class='status-span font-color-green'>启用" : "<span class='status-span font-color-red'>停用") + '</span>';
					}
				},
				{
					title: '排序',
					field: 'sort',
					width: '21%',
					align: 'center',
				}*/
			]
		]
	});
});