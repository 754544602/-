/***
 * 
 *
 * C(21)拖拽添加数据 
 * 
 * 
 * 
 */
var dragEvent = {
	/**
	 * 
	 * 点击添加按钮,新增一条数据
	 * 
	 */
	clickAddData: function() { 
		$(".add-div-btn").off().on("click", function() {
			var i = $(".yt-drag-list div").length + 1;
			var li = '<div class="yt-drag">第' + i + '条数据</div>';
			$(this).prev().append(li);
		});
	},
	/**
	 * 
	 * 执行数据拖拽操作option.selObj 数据列表区域标识;option.dataFram 数据框区域标识;
	 * 
	 * @param {Object} option 当前对象
	 */
	drageData: function(option) { 
		var yt_drag = {
			mouse_left: 0,
			mouse_top: 0,
			drag_down: [],
		};
		/**
		 * 
		 * 左侧div数据鼠标按下事件
		 * 
		 */
		option.selObj.delegate("div", "mousedown", function(e) {
			//获取窗体纵向,横向滚动条位置
			var scrollTop = $(window).scrollTop();
			var scrollLeft = $(window).scrollLeft();
			//当前选中对象
			var thisData = $(this);
			//给选中添加样式
			thisData.addClass("data-sel-styl");
			//1.获取当前选中div的偏移位置
			var offset = $(this).offset();
			//2.存储获取鼠标指针纵坐标横坐标的值,给拖拽Div加位置
			var css_data = {
				left: e.pageX - scrollLeft,
				top: e.pageY - scrollTo
			}
			//3.遍历所有的数据框
			option.dataFram.each(function() {
				//4.得到当前数据框偏移位置
				var offset = $(this).offset();
				//5.存储当前数据框的上坐标,左坐标;
				yt_drag.drag_down.push({
					element: $(this),
					top: offset.top,
					left: offset.left,
					right: offset.left + $(this).width(),
					bottom: offset.top + $(this).height()
				})
			});
			//e.pageX鼠标指针左边位置减去当前数据框偏移左坐标
			yt_drag.mouse_left = e.pageX - offset.left;
			//鼠标指针右边位置减去当前数据框偏移上坐标
			yt_drag.mouse_top = e.pageY - offset.top;
			//6.追加一个存放选中数据的div
			$("body").append('<div class="yt-drag-div"><div class="drag-clone-div" style="width:52px;"></div></div>');
			//7.克隆当前选中数据的div并追加类样式
			$(".drag-clone-div").append($(".data-sel-styl").clone().css(css_data).addClass("drag-clone").removeClass("data-sel-styl"));
			/**
			 * 
			 * 鼠标移动操作事件
			 * 
			 */
			$("body .yt-drag-div").mousemove(function(e) {
				//获取鼠标移动时指针位置
				var left = e.pageX;
				var top = e.pageY;
				//给拖拽显示的div添加样式
				$(".drag-clone").css({
					left: e.pageX - yt_drag.mouse_left - scrollLeft,
					top: e.pageY - yt_drag.mouse_top - scrollTop
				});
				//遍历数据框
				$.each(yt_drag.drag_down, function(i, n) {
					//8.判断选中数据是否移动在数据框范围内
					if(left > n.left && left < n.right && top > n.top && top < n.bottom) {
						//是,加上红色标识框
						n.element.addClass("yt-drag-down-ative");
						option.selObj.find("div").removeClass("data-sel-styl");
					} else {
						//否则移除样式
						n.element.removeClass("yt-drag-down-ative");
					}
				});
			});
			/*
			 * 
			 * 
			 * 鼠标松开操作事件
			 * 
			 */
			$("body .yt-drag-div").mouseup(function(e) {
				/**
				 * 获取是否自己定位摆放拖拽内容参数,true是,false默认值
				 */
				var isDragPosition = option.isPosition==undefined?false:option.isPosition;
				if(isDragPosition){
					//获取鼠标移动时指针位置
					var left = e.pageX;
					var top = e.pageY;
					//不存在,删除拖拽生成的数据,判断是否有悬浮到数据框区域
					if(!$(".yt-drag-down").hasClass("yt-drag-down-ative")){
						//删除拖拽数据
						$(".drag-clone").remove();
						//删除选中数据添加的样式
						option.selObj.find("div").removeClass("data-sel-styl");
					}else{
					    //重新计算left和top,给数据框加定位
						$(".drag-clone").css({
							left: $(".drag-clone").offset().left - $(".yt-drag-down-ative").offset().left,
							top: $(".drag-clone").offset().top - $(".yt-drag-down-ative").offset().top
						});
						$(".drag-clone").css("position","absolute");
						$(".yt-drag-down-ative").css("position","relative");
					}
				}
				//获取鼠标松开后的回调方法
				var mouseupFunction = option.mouseupFunction;
				//判断回调方法是否存在
				if(mouseupFunction) {
					mouseupFunction(option.dataFram, thisData);
				}
				//9.删除存在选中数据的div
				$(".yt-drag-div").remove();
				//10.删除克隆的div
				$(".yt-drag-div .drag-clone-div").remove();
				//11.移除数据框在悬浮范围内的样式
				option.dataFram.removeClass("yt-drag-down-ative");
			});
		});
	}
}
