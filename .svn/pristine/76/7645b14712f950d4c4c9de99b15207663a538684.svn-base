/**
 * 
 * 创建当前业务对象
 * 当前给出的是示例，研发中根据自己的业务进行创建
 * 命名规范:驼峰命名，首字母小写，后面加上Obj结束
 */
var loanApplyObj = {
	/**
	 * 
	 * 初始化方法(方法名不可变更)
	 * 
	 */
	init: function() {
		//给当前页面设置最小高度
		$(".main-model").css("min-height", $(window).height() - 12);
		//初始化下拉列表,在调用方法初始化时要注意,出去可输入的下拉列表  
		$("select").niceSelect();
		loanApplyObj.selectChangeFun(); //初始化父下拉框
		//loanApplyObj.setAddziselect();
		loanApplyObj.setAddsafselect(); //初始化人员下拉框
		loanApplyObj.dataInit(); //初始化日期
		loanApplyObj.getBrowseRecordListByParams(); //调用查询明细方法
		/**
		 * 
		 * 此方法里可写对数据的初始化获取显示等操作
		 * 	
		 * 如：
		 * //初始化页面select控件
		 * $("select").niceSelect();
		 * 
		 */

	},
	events: function() {
		/**
		 * 
		 * 此方法里写页面里一些操作按钮的点击事件等其他事件的操作
		 * 
		 * 如：
		 * 
		 * $("button.save-btn").click(function(){});
		 *
		 * 
		 */
		//查詢按鈕
		$('.query-btn').click(function() {
			//调用查询方法
			loanApplyObj.getBrowseRecordListByParams();
		});
		//重置按钮
		$('.assist-btn').click(function() {
			//初始化日期控件
			$("#txtDate1,#txtDate2").val('');
			//初始化下拉列表
			$("select.select-safe option:eq(0),select.select-code option:eq(0)").attr("selected", "selected");
			$('select.select-name').html('<option value="" selected="selected">全部</option>');
			$("select").niceSelect();
			//调用查询方法
			loanApplyObj.getBrowseRecordListByParams();
		});
	},
	//日期格式化
	dataInit: function() {
		$("#txtDate1").calendar({
			speed: 0, //日期列表展开显示速度, 参数"slow","normal","fast"，或毫秒数值，默认：200     
			complement: true, // 是否显示日期或年空白处的前后月的补充,默认：true     
			readonly: true, // 目标对象是否设为只读，默认：true     
			lowerLimit: "2010/01/01", // 日期下限，默认：NaN(不限制)      
			nowData: false, //默认选中当前时间,默认true  
			dateFmt: "yyyy-MM",
			callback: function() { // 点击选择日期后的回调函数  
				//alert("您选择的日期是：" + $("#txtDate").val());  
			}
		});
		$("#txtDate2").calendar({
			speed: 0, //日期列表展开显示速度, 参数"slow","normal","fast"，或毫秒数值，默认：200     
			complement: true, // 是否显示日期或年空白处的前后月的补充,默认：true     
			readonly: true, // 目标对象是否设为只读，默认：true     
			lowerLimit: "2010/01/01", // 日期下限，默认：NaN(不限制)    
			nowData: false, //默认选中当前时间,默认true  
			dateFmt: "yyyy-MM",
			callback: function() { // 点击选择日期后的回调函数  
				//alert("您选择的日期是：" + $("#txtDate").val());  
			}
		});
	},
	/**
	 * 
	 * 操作事件方法(方法名不可变更)
	 * 浏览量汇总查询
	 */
	getBrowseRecordListByParams: function() {
		//取值
		var parentCode = $('.select-code').val() == null ? "" : $('.select-code').val();
		var chilCode = $('.select-name').val() == null ? "" : $('.select-name').val();
		if(parentCode != "" && chilCode != "") {
			parentCode = "." + parentCode + "." + chilCode + ".";
		} else if(parentCode != "") {
			parentCode = "." + parentCode + ".";
		}
		var widgetItem = parentCode; //控件Code
		var browseStaff = $('.select-safe').val(); //人员
		var startDate = $("#txtDate1").val(); //开始日期
		var endDate = $('#txtDate2').val(); //结束日期
		var pageIndex = 1;
		var pageNum = 15;
		/** 
		 * 调用分页方法 
		 */
		$('.table-page').pageInfo({
			pageIndex: 1,
			pageNum: 15, //每页显示条数    
			pageSize: 10, //显示...的规律    
			type: "post", //访问方式,默认post,静态数据json是get请求,动态数据请求改为post  
			async: false, //访问类型,默认false  
			url: "widget/browse/getBrowseRecordListByParams", //ajax访问路径    
			data: {
				widgetItem: widgetItem,
				browseStaff: browseStaff,
				startDate: startDate,
				endDate: endDate,
				pageIndex: pageIndex,
				pageNum: pageNum
			}, //ajax查询访问参数  
			objName: 'data', //指获取数据的对象名称    
			success: function(data) {
				if(data.flag == 0) {
					$(".payment-table tbody").empty();
					var trStr = "";
					if(data.data.rows.length > 0) {
						$(".table-page").show();
						$.each(data.data.rows, function(i, n) {
							trStr += '<tr>' +
								'<td style="text-align: left;">' + "(" + n.widgetCode + ")" + n.widgetName + '</td>' +
								'<td>' + n.browseStaff + '</td>' +
								'<td>' + n.browsingTime + '</td>' +
								'</tr>';
						});
						$(".payment-table tbody").append(trStr);
					} else {
						//添加暂无数据
						$(".table-page").hide();
						$(".payment-table tbody").append(sysCommon.noDataTrStr(3));
					}
				}
			}, //回调函数 匿名函数返回查询结果    
			isSelPageNum: true //是否显示选择条数列表默认false    
		});
	},
	selectChangeFun: function() {
		//		$('select.select-code').on('change', function() {
		//			var parentCode = $(this).find('option:selected').val();
		//			if(parentCode) {
		//				$('select.select-name').val('loanApplyObj.setAddselect(parentCode)');
		//			}
		//		})
		var me = this;
		me.setAddselect($('select.select-code'), '', function(list) {
			var code = $('select.select-code').find('option:selected').val();
			if (code) {
				me.setAddselect($('select.select-name'), code);
			}
		})
		$('select.select-code').on('change',function(){
			var code = $(this).find('option:selected').val();
			if(code){
				me.setAddselect($('select.select-name'), code);
			}
		})
	},
	//获取下拉框数据
	setAddselect: function(obj, parentCode, fun) {
		$.ajax({
			type: "post",
			url: "widget/browse/getWidgetMainListByParams",
			async: true,
			data: {
				parentCode: parentCode
			},
			success: function(data) {
				var list = data.data;
				obj.empty();
				obj.html('<option value="" selected="selected">全部</option>');
				//1.遍历数据,给select赋值 
				var selected = '';
				$.each(list, function(i, n) {
					/*if(i == 0) {
						selected = 'selected="selected"';
					}else{
						selected = '';
					}*/
					obj.append('<option value="' + n.widgetCode + '" ' + selected + '>' + n.widgetName + '(' + n.widgetCode + ')</option>');

				});
				obj.niceSelect();
				//				$('.select-code').change(function() {
				//					loanApplyObj.setAddziselect($(this).val());
				//				})
				if(fun) {
					fun(list);
				}
			}
		});
	},
	//获取子下拉框数据
	//	setAddziselect: function(parentCode) {
	//		//var parentCode = $('.select-code').val();
	//		$.ajax({
	//			type: "post",
	//			data: {
	//				parentCode: parentCode
	//			},
	//			url: "widget/browse/getWidgetMainListByParams",
	//			async: true,
	//			success: function(data) {
	//				var datas = data.data;
	//				$('.select-name').html('<option value="" selected="selected">全部</option>');
	//				//1.遍历数据,给select赋值 
	//				var selected = '';
	//				$.each(datas, function(i, n) {
	//					selected = '';
	//					//					selected = 'selected="selected"';
	//					$('.select-name').append('<option value="' + n.widgetCode + '">' + n.widgetName + '(' + n.widgetCode + ')</option>');
	//				});
	//				$(".select-name").niceSelect();
	//			}
	//		});
	//	},
	//获取人员下拉框数据
	setAddsafselect: function() {
		$.ajax({
			type: "post",
			url: "widget/browse/getBrowseStaffListByParams",
			async: true,
			success: function(data) {
				var datas = data.data;
				//1.遍历数据,给select赋值 
				var selected = '';
				$.each(datas, function(i, n) {
					selected = '';
					//					selected = 'selected="selected"';
					if(n.parentCode == '0') {
						$('.select-safe').append('<option value="' + n.borwseSaffCode + '" ' + selected + '>' + n.borwseSaff + '</option>');
					} else {
						$('.select-safe').append('<option value="' + n.borwseSaffCode + '">' + n.borwseSaff + '</option>');
					}
				});
				$(".select-safe").niceSelect();
			}
		});
	},
}
$(function() {
	//调用初始化方法
	loanApplyObj.init();
	//调用操作事件方法
	loanApplyObj.events();
});