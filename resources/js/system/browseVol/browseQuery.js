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
	sortTypea: '', //排序方式
	pageIndexa: 0, //分页页数
	init: function() {

		/**
		 * 
		 * 此方法里可写对数据的初始化获取显示等操作
		 * 	
		 * 如：
		 * //初始化页面select控件
		 * $("select").niceSelect();
		 * 
		 */
		//日期格式化
		$("#txtDate1").calendar({
			speed: 0, //日期列表展开显示速度, 参数"slow","normal","fast"，或毫秒数值，默认：200     
			complement: true, // 是否显示日期或年空白处的前后月的补充,默认：true     
			readonly: true, // 目标对象是否设为只读，默认：true     
			lowerLimit: "2010/01/01", // 日期下限，默认：NaN(不限制)     
			nowData: false, //默认选中当前时间,默认true  
			dateFmt: "yyyy-MM-dd",
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
			dateFmt: "yyyy-MM-dd",
			callback: function() { // 点击选择日期后的回调函数  
				//alert("您选择的日期是：" + $("#txtDate").val());  
			}
		});
		/** 
		 * 调用分页方法 
		 * $('页面分页区域自定义的类名或ID'); 
		 */
		loanApplyObj.getBrowseTotalListByParams(1);
	},
	events: function() {
		/**
		 * 
		 * 此方法里写页面里一些操作按钮的点击事件等其他事件的操作
		 * 
		 * 如：
		 * 
		 *
		 * 
		 */
		var pageIndex = 1;
		//查询数据按钮
		$(".query-btn").click(function() {
			//查询浏览量数据
			loanApplyObj.getBrowseTotalListByParams(1);
		});
		//按日期排序按钮
		$(".query-data-btn").click(function() {
			//按日期排序
			loanApplyObj.sortTypea = 'lastTime';
			loanApplyObj.getBrowseTotalListByParams(1);
		});
		//按次数排序按钮
		$(".query-num-btn").click(function() {
			//按次数排序
			loanApplyObj.sortTypea = 'browseFrequency';
			loanApplyObj.getBrowseTotalListByParams(1);
		});
		//分页 页数
		$(".page-num").click(function() {
			//递加浏览条数
			pageIndex = pageIndex + 1;
			loanApplyObj.getBrowseTotalListByParams(pageIndex);
		});
		//重置按钮
		$(".assist-btn").click(function() {
			$("#txtDate1").val('');
			$("#txtDate2").val('');
			loanApplyObj.getBrowseTotalListByParams(1);
		});
		//跳转页面
		$(".payment-table").on('click','.jump-url',function(){
			window.location.href =$yt_option.websit_path + "view/browseVol/browseDetailed.html";
		});
	},
	/**
	 * 
	 * 操作事件方法(方法名不可变更)
	 * 
	 */
	//浏览量汇总查询
	getBrowseTotalListByParams: function(pageIndex) {
		//取值
		var startDate = $("#txtDate1").val(); //开始日期
		var endDate = $('#txtDate2').val(); //结束日期
		var sortType = loanApplyObj.sortTypea; //排序方式
		var pageNum = 15;
		if(pageIndex == 1) {
			$(".payment-table tbody").empty();
		}
		$.ajax({
			type: "post",
			url: "widget/browse/getBrowseTotalListByParams",
			async: false,
			//执行查询操作
			data: {
				startDate: startDate,
				endDate: endDate,
				sortType: sortType,
				pageIndex: pageIndex,
				pageNum: pageNum
			},
			success: function(data) {
				console.info(data);
				if(data.flag == 0) {
					var trStr = "";
					if(data.data.total > 0) {
						$('.page-ing').show();
						$('.page-ing').text("加载更多...");
						if(data.data.rows.length > 0) {
							$.each(data.data.rows, function(i, n) {
								trStr += '<tr>' +
									'<td><span style="float: left;">' + "(" + n.widgetCode + ")" + n.widgetName + '</span></td>' +
									'<td><a class="yt-link jump-url" style="float: right;">' + n.BROWSE_FREQUENCY + '</a></td>' +
									'<td>' + n.LAST_BROWSING_TIME + '</td>' +
									'</tr>';
							});
						} else {
							$('.page-ing').text("暂无更多数据");
							
						}
						$(".payment-table tbody").append(trStr);
					} else {
						$('.page-ing').hide();
						//添加暂无数据
						$(".payment-table tbody").append(sysCommon.noDataTrStr(3));
					}
				}
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