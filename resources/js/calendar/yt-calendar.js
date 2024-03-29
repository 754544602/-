/**
 * C14 日期选择框控件
 */
jQuery.fn.extend({
	calendar: function(c) {
		function dateFormat(fmt, d) { //author: meizz 
			var o = {
				"M+": d.getMonth() + 1, //月份 
				"d+": d.getDate(), //日 
				"H+": d.getHours(), //小时 
				"m+": d.getMinutes(), //分 
				"s+": d.getSeconds(), //秒 
				"q+": Math.floor((d.getMonth() + 3) / 3), //季度 
				"S": d.getMilliseconds() //毫秒 
			};
			if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
			for(var k in o)
				if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			return fmt;
		}
		function uuid(len, radix) {
			    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
			    var uuid = [], i;
			    radix = radix || chars.length;
			 
			    if (len) {
			      // Compact form
			      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
			    } else {
			      // rfc4122, version 4 form
			      var r;
			 
			      // rfc4122 requires these characters
			      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
			      uuid[14] = '4';
			 
			      // Fill in random data.  At i==19 set the high bits of clock sequence as
			      // per rfc4122, sec. 4.1.5
			      for (i = 0; i < 36; i++) {
			        if (!uuid[i]) {
			          r = 0 | Math.random()*16;
			          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			        }
			      }
			    }
			 
			    return uuid.join('');
			}
		$(this).each(function (i,n){
			
			/*取得当前要设置的输入框*/
			var n = $(n);
			//n.wrap("<div class='calendar-box'></div>");
			
			function r() { //日期的点击选中事件
				$("#" + c.controlId).find(".tabD a").mouseup(function() {
					var a = new Date($("#" + c.controlId).find(".currentYear").text() + "/" + $("#" + c.controlId).find(".currentMonth").text() + "/1");
					if($(this).hasClass("prevD")) {
						a.setMonth(a.getMonth() - 1);
						a.setDate($(this).text());
						var b = c.speed;
						c.speed = 0;
						$("#" + c.controlId).find(".prevMonth").triggerHandler("mouseup");
						c.speed = b
					} else if($(this).hasClass("nextD")) {
						a.setMonth(a.getMonth() + 1);
						a.setDate($(this).text());
						b = c.speed;
						c.speed = 0;
						$("#" + c.controlId).find(".nextMonth").triggerHandler("mouseup");
						c.speed = b;
					}
					var d = $(this).text();
					if(c.dateFmt != "yyyy-MM-dd HH:mm:ss" && c.dateFmt != "yyyy-MM-dd HH:mm") {
						a = a.getFullYear() + "-" + (Number(a.getMonth() + 1) < 10 ? "0" + Number(a.getMonth() + 1) : Number(a.getMonth() + 1)) + "-" + (Number(d) < 10 ? "0" + d : d);
						n.val(a);
					}
	
					$("#" + c.controlId + " div table a").removeClass("select");
					$("#" + c.controlId + " .tabD a:contains('" + d + "')").each(function() {
						d == $(this).text() && !$(this).hasClass("prevD") && !$(this).hasClass("nextD") && $(this).addClass("select");
					});
					if(c.dateFmt != "yyyy-MM-dd HH:mm:ss" && c.dateFmt != "yyyy-MM-dd HH:mm") {
						//c.isPosi是false的时候代表是正常的日期控件,选中日期后就要删除当前的日期控件
						if(c.promHide && c.isPosi == false) {
							$("#" + c.controlId).remove();
						}
						//回调
						c.callback();
					}
	
					/*追加移除默认的当前日期 类样式*/
					//$("#" + c.controlId + " div table a")..removeClass('current');
					
				}).hover(function() {
						$(this).addClass("hover");
					},
					function() {
						$(this).removeClass("hover");
					});
			}
	
			function u() { //月份的点击选中
				$("#" + c.controlId).find(".tabM a").mouseup(function() {
					if(c.dateFmt == "yyyy-MM" || c.dateFmt == "MM") {
						var d = $(this).attr("val");
						$("#" + c.controlId).find(".currentMonth").text(Number($(this).attr("val")) + 1);
						var a = new Date(Number($("#" + c.controlId).find(".currentYear").text()) + "/" + Number($("#" + c.controlId).find(".currentMonth").text()) + "/1");
						if(c.dateFmt == "MM") {
							a = Number(a.getMonth() + 1) < 10 ? "0" + Number(a.getMonth() + 1) : Number(a.getMonth() + 1);
						} else {
							a = a.getFullYear() + "-" + (Number(a.getMonth() + 1) < 10 ? "0" + Number(a.getMonth() + 1) : Number(a.getMonth() + 1));
						}
						n.val(a);
						$("#" + c.controlId + " div table a").removeClass("select");
						if(c.promHide) {
							c.callback();
							$("#" + c.controlId).remove();
						}
					} else{
						var a = s(Number($("#" + c.controlId).find(".currentYear").text()), Number($(this).attr("val")));
						D(a);
						r();
						$("#" + c.controlId).find(".currentMonth").text(Number($(this).attr("val")) + 1);
						$("#" + c.controlId).find('.calTitle').css('border-bottom', 'none');
						$("#" + c.controlId).height(242);
						$("#" + c.controlId).find(".btCurrentYear").hide();
						$("#" + c.controlId).find(".t_date div,.t_date,.currentYearText").show();
						$("#" + c.controlId).find(".t_date div:eq(0)").css("width", "50%");
					}
	
				}).hover(function() {
						$(this).addClass("hover");
					},
					function() {
						$(this).removeClass("hover");
					});
			}
			function v() { //年份的点击选中
				$("#" + c.controlId).find(".tabY a").mouseup(function() {
	
					if(c.dateFmt == "yyyy-MM") {
						if(!($("#" + c.controlId).find(".enabled > .tabM").length > 0)) {
							var a = z(Number($("#" + c.controlId).find(".currentYear").text()));
							E(a);
							u();
						}
						$("#" + c.controlId).find('.calTitle').css('border-bottom', '1px solid #e5e5e5');
						$("#" + c.controlId).height(146);
						$("#" + c.controlId).find(".t_date div:eq(1)").hide();
					} else if(c.dateFmt == "yyyy-MM-dd" || c.dateFmt == "yyyy-MM-dd HH:mm" ||c.dateFmt == "yyyy-MM-dd HH:mm:ss") {
						var a = s(Number($(this).text()), Number($("#" + c.controlId).find(".currentMonth").text()) - 1);
						D(a);
						r();
						$("#" + c.controlId).height(242);
	
					} else if(c.dateFmt == "yyyy") {
						var d = $(this).text();
						$("#" + c.controlId).find(".currentYear").text(Number($(this).text()));
						var a = new Date($("#" + c.controlId).find(".currentYear").text() + "/1/1");
						a = a.getFullYear();
						n.val(a);
						$("#" + c.controlId + " div table a").removeClass("select");
						if(c.promHide) {
							c.callback();
							$("#" + c.controlId).remove();
						}
					}
					$("#" + c.controlId).find(".currentYear").text(Number($(this).text()));
					$("#" + c.controlId).find('.calTitle').css('border-bottom', 'none');
					$("#" + c.controlId).find(".btCurrentYear").hide();
					$("#" + c.controlId).find(".t_date div:eq(0),.t_date,.currentYearText").show();
					$("#" + c.controlId).find(".t_date div:eq(0)").css("width", "50%");
					$("#" + c.controlId).find(".t_date div:eq(1)").show();
	
				}).hover(function() {
						$(this).addClass("hover");
					},
					function() {
						$(this).removeClass("hover");
					});
			}
	
			function s(a, b) { //初始化时间的列表
				newDate = new Date(a, b, 1);
				newDate.setDate(0);
				var d = 1,
					h = newDate.getDate();
				newDate.setDate(1);
				newDate.setMonth(newDate.getMonth() + 1);
				var m = newDate.getDay();
				if(m == 0) m = 7;
				h = h - m + 1;
				newDate.setMonth(newDate.getMonth() + 1);
				newDate.setDate(0);
				var o = newDate.getDate(),
					g = "<table class='tabD'>";
				g += "<tr><th>周日</th><th>周一</th><th>周二</th><th>周三</th><th>周四</th><th>周五</th><th>周六</th></tr>";
				var i = w(),
					l = "",
					p = "",
					t = "";
				c.complement || (t = "style='display:none'");
				var upperLimit = !!c.upperLimit ? (Object.prototype.toString.call(c.upperLimit) === "[object String]" ? new Date(c.upperLimit) : (Object.prototype.toString.call(c.upperLimit) === "[object Function]" ? new Date(c.upperLimit()):(!!c.upperLimit.val() ? new Date(c.upperLimit.val()) : NaN))) : c.upperLimit;
				var lowerLimit = !!c.lowerLimit ? (Object.prototype.toString.call(c.lowerLimit) === "[object String]" ? new Date(c.lowerLimit) : (Object.prototype.toString.call(c.lowerLimit) === "[object Function]" ? new Date(c.lowerLimit()):(!!c.lowerLimit.val() ? new Date(c.lowerLimit.val()) : NaN))) : c.lowerLimit;
          if(!isNaN(lowerLimit)){
            lowerLimit.setTime(lowerLimit.getTime()-24*60*60*1000); 
          }
				for(var x = 0; x < 6; x++) {
					g += "<tr>";
					for(var y = 0; y < 7; y++) {
						var j = x * 7 + y + 1 - m;
						p = l = "";
						if(!isNaN(lowerLimit) && lowerLimit > new Date(newDate.getFullYear(), newDate.getMonth(), j) || !isNaN(upperLimit) && new Date(newDate.getFullYear(), newDate.getMonth(), j) > upperLimit){
							if(0 < j && j <= o) {
								if(newDate.getFullYear() == e && newDate.getMonth() == f && j == q) l = "current";
								g += "<td><span class='" + l + "'>" + j + "</span></td>"
							} else if(j <= 0) {
							if(newDate.getFullYear() == e && newDate.getMonth() - 1 == f && h == q) l = "current";
								g += "<td><span class='" + l + "' " + t + ">" + h + "</span></td>";
								h++
							} else {
								if(j > o) {
									if(newDate.getFullYear() == e && newDate.getMonth() + 1 == f && d == q) l = "current";
									g += "<td><span class='" + l + "' " + t + ">" + d + "</span></td>";
									d++
								}
							}
						}else if(0 < j && j <= o) {
							if(newDate.getFullYear() == e && newDate.getMonth() == f && j == q) l = "current";
							if(newDate.getFullYear() == i.getFullYear() && newDate.getMonth() == i.getMonth() && j == i.getDate()) p = "select";
							g += "<td><a class='" + p + " " + l + "'>" + j + "</a></td>";
						} else if(j <= 0) {
							if(newDate.getFullYear() == e && newDate.getMonth() - 1 == f && h == q) l = "current";
							if(newDate.getFullYear() == i.getFullYear() && newDate.getMonth() - 1 == i.getMonth() && h == i.getDate()) p = "select";
							g += "<td><a class='prevD " + p + " " + l + "' " + t + ">" + h + "</a></td>";
							h++
						} else if(j > o) {
							if(newDate.getFullYear() == e && newDate.getMonth() + 1 == f && d == q) l = "current";
							if(newDate.getFullYear() == i.getFullYear() && newDate.getMonth() + 1 == i.getMonth() && d == i.getDate()) p = "select";
							g += "<td><a class='nextD " + p + " " + l + "' " + t + ">" + d + "</a></td>";
							d++
						}
						g = g.replace("class=' '", "");
					}
					g += "</tr>";
				}
				g += "</table>";
				return g;
			}
			//初始化月份的列表
			function z(a) {
				var b = w(),
					d = "<table class='tabM'>";
				d += "<tr>";
				d += "<td><a val='0' " + (a == b.getFullYear() && 0 == b.getMonth() ? "class='select'" : "") + " " + (a == e && 0 == f ? "class='current'" : "") + ">\u4e00\u6708</a></td>";
				d += "<td><a val='1' " + (a == b.getFullYear() && 1 == b.getMonth() ? "class='select'" : "") + " " + (a == e && 1 == f ? "class='current'" : "") + ">\u4e8c\u6708</a></td>";
				d += "<td><a val='2' " + (a == b.getFullYear() && 2 == b.getMonth() ? "class='select'" : "") + " " + (a == e && 2 == f ? "class='current'" : "") + ">\u4e09\u6708</a></td>";
				d += "<td><a val='3' " + (a == b.getFullYear() && 3 == b.getMonth() ? "class='select'" : "") + " " + (a == e && 3 == f ? "class='current'" : "") + ">\u56db\u6708</a></td>";
				d += "</tr>";
				d += "<tr>";
				d += "<td><a val='4' " + (a == b.getFullYear() && 4 == b.getMonth() ? "class='select'" : "") + " " + (a == e && 4 == f ? "class='current'" : "") + ">\u4e94\u6708</a></td>";
				d += "<td><a val='5' " + (a == b.getFullYear() && 5 == b.getMonth() ? "class='select'" : "") + " " + (a == e && 5 == f ? "class='current'" : "") + ">\u516d\u6708</a></td>";
				d += "<td><a val='6' " + (a == b.getFullYear() && 6 == b.getMonth() ? "class='select'" : "") + " " + (a == e && 6 == f ? "class='current'" : "") + ">\u4e03\u6708</a></td>";
				d += "<td><a val='7' " + (a == b.getFullYear() && 7 == b.getMonth() ? "class='select'" : "") + " " + (a == e && 7 == f ? "class='current'" : "") + ">\u516b\u6708</a></td>";
				d += "</tr>";
				d += "<tr>";
				d += "<td><a val='8' " + (a == b.getFullYear() && 8 == b.getMonth() ? "class='select'" : "") + " " + (a == e && 8 == f ? "class='current'" : "") + ">\u4e5d\u6708</a></td>";
				d += "<td><a val='9' " + (a == b.getFullYear() && 9 == b.getMonth() ? "class='select'" : "") + " " + (a == e && 9 == f ? "class='current'" : "") + ">\u5341\u6708</a></td>";
				d += "<td><a val='10' " + (a == b.getFullYear() && 10 == b.getMonth() ? "class='select'" : "") + " " + (a == e && 10 == f ? "class='current'" : "") + ">\u5341\u4e00\u6708</a></td>";
				d += "<td><a val='11' " + (a == b.getFullYear() && 11 == b.getMonth() ? "class='select'" : "") + " " + (a == e && 11 == f ? "class='current'" : "") + ">\u5341\u4e8c\u6708</a></td>";
				d += "</tr>";
				d += "</table>";
				return d;
			}
			//初始化年份的列表
			function A(a) {
				$("#" + c.controlId).find(".btNowCurrentYear").text(a);
				var startYear = 0,
					endYear = 0,
					nowYear = 0,
					a = Math.floor(a / 10) * 10;
				var b = "<table class='tabY'>",
					d = w(),
					h = "",
					m = "",
					o = "";
				c.complement || (o = "style='display:none'");
				for(var g = 0; g < 3; g++) {
					b += "<tr>";
					for(var i = 0; i < 4; i++) {
						m = h = "";
						if(g + 1 * i + 1 != 1 && (g + 1) * (i + 1) != 12) {
							if(a == d.getFullYear()) h = "select";
							if(a == e) m = "current";
							b += "<td><a class='" + h + " " + m + "' >" + a + "</a></td>";
							nowYear = a;
							a++
						} else if(g + 1 * i + 1 == 1) {
							if(a - 1 == d.getFullYear()) h = "select";
							if(a - 1 == e) m = "current";
							b += "<td><a class='prevY " + h + " " + m + "' " + o + ">" + (a - 1) + "</a></td>";
							nowYear = a - 1;
						} else {
							if(a == d.getFullYear()) h = "select";
							if(a == e) m = "current";
							b += "<td><a class='nextY " + h + " " + m + "' " + o + ">" + a + "</a></td>";
							nowYear = a;
						}
						if(g == 0 && i == 0) {
							startYear = nowYear;
						}
						if(g == 2 && i == 3) {
							endYear = nowYear;
						}
					}
					b += "</tr>";
				}
				b += "</table>";
				$("#" + c.controlId).find(".btCurrentYear").text(startYear + "-" + endYear);
	
				return b;
			}
	
			function B(a) { //向后切换
				var b = $("#" + c.controlId).find(".reserve"),
					d = $("#" + c.controlId).find(".enabled");
				b.stop();
				d.stop();
				b.removeClass("reserve").addClass("enabled");
				d.removeClass("enabled").addClass("reserve");
				b.css({
					"margin-left": d.width() + "px",
					"margin-top": "0px"
				});
				b.empty().append(a);
				b.animate({
						"margin-left": "0px"
					},
					c.speed);
				d.animate({
						"margin-left": "-" + d.width() + "px"
					},
					c.speed,
					function() {
						d.empty();
					});
			}
	
			function C(a) { //向前切换
				var b = $("#" + c.controlId).find(".reserve"),
					d = $("#" + c.controlId).find(".enabled");
				b.stop();
				d.stop();
				b.removeClass("reserve").addClass("enabled");
				d.removeClass("enabled").addClass("reserve");
				b.css({
					"margin-left": "-" + d.width() + "px",
					"margin-top": "0px"
				});
				b.empty().append(a);
				b.animate({
						"margin-left": "0px"
					},
					c.speed);
				d.animate({
						"margin-left": d.width() + "px"
					},
					c.speed,
					function() {
						d.empty();
					});
			}
	
			function D(a) {
				var b = $("#" + c.controlId).find(".reserve"),
					d = $("#" + c.controlId).find(".enabled");
				b.stop();
				d.stop();
				b.removeClass("reserve").addClass("enabled");
				d.removeClass("enabled").addClass("reserve");
				$("#" + c.controlId).css({
					"z-index": 1
				});
	
				b.css({
					"z-index": -1
				});
				d.css({
					"z-index": -1
				});
				b.css({
					"margin-left": "0px",
					"margin-top": d.height() + "px"
				});
				b.empty().append(a);
				b.animate({
						"margin-top": "0px"
					},
					c.speed);
				d.animate({
						"margin-top": "-" + d.width() + "px"
					},
					c.speed,
					function() {
						d.empty();
						$("#" + c.controlId).css({
							"z-index": 0
						});
						b.css({
							"z-index": 0
						});
						d.css({
							"z-index": 0
						})
					});
			}
	
			
	
			/*设置 年 月 日 选单 的切换*/
			function E(a) {
				var b = $("#" + c.controlId).find(".reserve"),
					d = $("#" + c.controlId).find(".enabled");
				b.stop();
				d.stop();
				b.removeClass("reserve").addClass("enabled");
				d.removeClass("enabled").addClass("reserve");
				$("#" + c.controlId).css({
					"z-index": 1
				});
				b.css({
					"z-index": -1
				});
				d.css({
					"z-index": -1
				});
				b.css({
					"margin-left": "0px",
					"margin-top": "-" + d.height() + "px"
				});
				b.empty().append(a);
				b.animate({
						"margin-top": "0px"
					},
					c.speed);
				d.animate({
						"margin-top": d.width() + "px"
					},
					c.speed,
					function() {
						d.empty();
						$("#" + c.controlId).css({
							"z-index": 0
						});
						b.css({
							"z-index": 0
						});
						d.css({
							"z-index": 0
						});
					});
			}
			/*转换日期格式*/
			function w() {
				re = /(\d\d\d\d)(\W)?(\d\d)(\W)?(\d\d)/g;
				var a = n.val();
				a = a.replace(re, "$1/$3/$5@").split("@")[0];
				return new Date(a);
			}
			/*获取input 距离父级单位的 左边距 和 上边距*/
			function F(a) {
				var b = [];
				b.x = a.offsetLeft;
				for(b.y = a.offsetTop; a = a.offsetParent;) {
					b.x += a.offsetLeft;
					b.y += a.offsetTop;
				}
				return b;
			}
	
			function start() {
				/*获取当前时间*/
				today = new Date;
				var e = today.getFullYear(),
					f = today.getMonth(),
					q = today.getDate(),
					k = "";
	
				k += "<div id='" + c.controlId + "'class='calendar'>";
				k += "<div class='calMain'>";
				k += "<div class='calTitle'>";
	
				k += "<div class='t_date'>";
				k += "<div><a class='prevYear'></a><span class='btCurrentYear'></span><span style='display:none' class='btNowCurrentYear'></span><span class='currentYearText'><a class='currentYear'>" + Number(e) + "</a>\u5e74</span><a class='nextYear'></a></div>";
				k += "<div><a class='prevMonth'></a>";
				k += "<span class='currentMonthText'><a class='currentMonth'>" + Number(f + 1) + "</a>\u6708</span>";
				k += "<a class='nextMonth'></a></div>";
				k += "</div>";
	
				k += "</div>";
				k += "<div class='calContent'>";
				k += "<div class='reserve'>";
				k += "</div>";
				k += "<div class='enabled'>";
				k += s(e, f);
				k += "</div>";
				k += "</div>";
				k += "</div>";
				k += "</div>";
				$('body').find('#' + c.controlId).remove();
				
				//判断是否是直接显示在页面上的日历
				if(c.isPosi){
					//追加在当前区域
					$(n).append(k);
					$("#"+c.controlId).css("display","block");
				}else{
					//否是正常的日期控件,追加在body内的
					$("body").append(k);
				}
				r();
				$("#" + c.controlId).find(".prevMonth").mouseup(function() {
					/*判断日期列表是否存在*/
					/*	if($("#" + c.controlId).find(".enabled > .tabD").length > 0) {*/
	
					var a = $("#" + c.controlId).find(".currentYear"),
						b = $("#" + c.controlId).find(".currentMonth"),
						d = s(Number(a.text()), Number(b.text()) - 2);
					C(d);
					if(Number(b.text()) != 1) b.text(Number(b.text()) - 1);
					else {
						a.text(Number(a.text()) - 1);
						b.text("12");
					}
					r();
					/*} else if($("#" + c.controlId).find(".enabled > .tabM").length > 0) {
						d = z(Number($("#" + c.controlId).find(".currentYear").text()) - 1);
						C(d);
						u();
						$("#" + c.controlId).find(".currentYear").text(Number($("#" + c.controlId).find(".currentYear").text()) - 1);
					} else if($("#" + c.controlId).find(".enabled > .tabY").length > 0) {
						d = A(Number($("#" + c.controlId).find(".currentYear").text()) - 10);
						C(d);
						v();
						$("#" + c.controlId).find(".currentYear").text(Number($("#" + c.controlId).find(".currentYear").text()) - 10);
					}*/
				});
				$("#" + c.controlId).find(".nextMonth").off("mouseup").mouseup(function(e) {
					//阻止事件冒泡
					$yt_common.eventStopPageaction(e);
					
					if($("#" + c.controlId).find(".enabled > .tabD").length > 0) {
						var a = $("#" + c.controlId).find(".currentYear"),
							b = $("#" + c.controlId).find(".currentMonth"),
							d = s(Number(a.text()), Number(b.text()));
						B(d);
						if(Number(b.text()) != 12) b.text(Number(b.text()) + 1);
						else {
							a.text(Number(a.text()) + 1);
							b.text("1");
						}
						r();
					} else if($("#" + c.controlId).find(".enabled > .tabM").length > 0) {
						d = z(Number($("#" + c.controlId).find(".currentYear").text()) + 1);
						B(d);
						u();
						$("#" + c.controlId).find(".currentYear").text(Number($("#" + c.controlId).find(".currentYear").text()) + 1);
					} else if($("#" + c.controlId).find(".enabled > .tabY").length > 0) {
						d = A(Number($("#" + c.controlId).find(".currentYear").text()) + 10);
						B(d);
						v();
						$("#" + c.controlId).find(".currentYear").text(Number($("#" + c.controlId).find(".currentYear").text()) + 10);
					}
				});
				/*点击显示月份选单*/
				$("#" + c.controlId).find(".currentMonthText").mouseup(function() {
					if(!($("#" + c.controlId).find(".enabled > .tabM").length > 0)) {
						var a = z(Number($("#" + c.controlId).find(".currentYear").text()));
						E(a);
						u();
					}
					$("#" + c.controlId).find('.calTitle').css('border-bottom', '1px solid #e5e5e5');
					$("#" + c.controlId).height(146);
					$("#" + c.controlId).find(".t_date div:eq(1)").hide();
	
				});
	
				$("#" + c.controlId).find(".prevYear").mouseup(function() {
					if($("#" + c.controlId).find(".btCurrentYear:visible").length > 0) {
						var a = A(Number($("#" + c.controlId).find(".btNowCurrentYear").text()) - 10)
						E(a);
						v();
						return;
					}
	
					if($("#" + c.controlId).find(".enabled > .tabD").length > 0) {
						var a = s(Number($("#" + c.controlId).find(".currentYear").text()) - 1, Number($("#" + c.controlId).find(".currentMonth").text()) - 1);
						D(a);
						r();
					}
	
					$("#" + c.controlId).find(".currentYear").text(Number($("#" + c.controlId).find(".currentYear").text()) - 1);
	
				});
				$("#" + c.controlId).find(".nextYear").mouseup(function() {
					if($("#" + c.controlId).find(".btCurrentYear:visible").length > 0) {
						var a = A(Number($("#" + c.controlId).find(".btNowCurrentYear").text()) + 10)
						E(a);
						v();
						return;
					}
					if($("#" + c.controlId).find(".enabled > .tabD").length > 0) {
						var a = s(Number($("#" + c.controlId).find(".currentYear").text()) + 1, Number($("#" + c.controlId).find(".currentMonth").text()) - 1);
						D(a);
						r();
					}
					$("#" + c.controlId).find(".currentYear").text(Number($("#" + c.controlId).find(".currentYear").text()) + 1);
	
				});
				/*点击显示年份选单*/
				$("#" + c.controlId).find(".currentYearText").mouseup(function() {
					if(!($("#" + c.controlId).find(".enabled > .tabY").length > 0)) {
						var a = A(Number($("#" + c.controlId).find(".currentYear").text()));
						E(a);
						v();
					}
					$("#" + c.controlId).find('.calTitle').css('border-bottom', '1px solid #e5e5e5');
					$("#" + c.controlId).height(146);
					$("#" + c.controlId).find(".t_date div:eq(1)").hide();
					$("#" + c.controlId).find(".t_date .currentYearText").hide();
					$("#" + c.controlId).find(".t_date .btCurrentYear").show();
					$("#" + c.controlId).find(".t_date div:eq(0)").css("width", "150px");
	
				});
				//设置弹出框的默认背景样式
				$(n).addClass('calendar-input-bg');
				var inputWidth, paddingLeft, paddingRight;
				//计算背景图的定位距离
				paddingLeft = parseInt($(n).css('padding-left')); //左内边距
				paddingRight = parseInt($(n).css('padding-right')); //右内边距
				inputWidth = $(n).width() - (paddingLeft) - (paddingLeft != 0 ? 5 : 10); //实际距离
				$(n).css('background-position', (inputWidth) + 'px 7px');
	
				//输入框的悬浮事件
				n.mouseover(function() {
					$(n).css('background-position', (inputWidth) + 'px -25px');
				});
				n.blur(function() {
					$(n).css('background-position', (inputWidth) + 'px 7px');
				});
				/*追加日期弹出框按钮*/
				var todayText = "今天";
				var leftDoc = '';
				if(c.dateFmt == "yyyy-MM" || c.dateFmt == "MM") {
					todayText = "本月";
				} else if(c.dateFmt == "yyyy") {
					todayText = "本年";
				}
				var ccEle = '<button class="close">关闭</button>';
				if(c.dateFmt == "yyyy-MM-dd HH:mm:ss") {
					leftDoc = '<div class="calendar-hms"><input class="tH" type="text" value="12" /><span>:</span><input type="text" class="tm" value="12" /><span>:</span><input class="tS" type="text" value="12" /></div>';
					ccEle = '<button class="confirm">确定</button>';
				}else if(c.dateFmt == "yyyy-MM-dd HH:mm") {
					leftDoc = '<div class="calendar-hms"><input class="tH" type="text" value="12" /><span>:</span><input type="text" class="tm" value="12" /></div>';
					ccEle = '<button class="confirm">确定</button>';
				}
				
			  var upperLimit = !!c.upperLimit ? (Object.prototype.toString.call(c.upperLimit) === "[object String]" ? new Date(c.upperLimit) : (Object.prototype.toString.call(c.upperLimit) === "[object Function]" ? new Date(c.upperLimit()):(!!c.upperLimit.val() ? new Date(c.upperLimit.val()) : NaN))) : c.upperLimit;
        var lowerLimit = !!c.lowerLimit ? (Object.prototype.toString.call(c.lowerLimit) === "[object String]" ? new Date(c.lowerLimit) : (Object.prototype.toString.call(c.lowerLimit) === "[object Function]" ? new Date(c.lowerLimit()):(!!c.lowerLimit.val() ? new Date(c.lowerLimit.val()) : NaN))) : c.lowerLimit;
        if(!isNaN(lowerLimit)){
            lowerLimit.setTime(lowerLimit.getTime()-24*60*60*1000); 
          }
				//判断是否是日历控件
				if(c.isPosi){
					//不要底部按钮只给提示信息
					var dateButtonBox = $('<div class="buttonBox">' + leftDoc + '<div class="buttonList" style="color:#4387cd;">*点击日期可查看当天填报信息</div></div>');
				}else{
					//要底部按钮
					var dateButtonBox = $('<div class="buttonBox">' + leftDoc + '<div class="buttonList"><button class="empty">清空</button><button class="today">' + todayText + '</button>' + ccEle + '</div></div>');
				}
				//var dateButtonBox = $('<div class="buttonBox">' + leftDoc + '<div class="buttonList"><button class="empty">清空</button><button class="today">' + todayText + '</button>' + ccEle + '</div></div>');
				if(!isNaN(lowerLimit) && lowerLimit > new Date() || !isNaN(upperLimit) && new Date() > upperLimit){
				    dateButtonBox.find(".today").addClass("disable");
        		}
				/**
				 * 
				 * 判断时间文本框是否有值,有值截取时分秒赋值给时分秒的框
				 * 没有数据则,给赋值当前默认时间
				 * 
				 */
				//获取文本框的值
				var inpuVal = $(n).val();
				if(inpuVal != "") {
					inpuVal = new Date(inpuVal.replace(/-/g, "/"));
				} else {
					inpuVal = new Date();
				}
				//小时
				dateButtonBox.find(".calendar-hms input:eq(0)").val(inpuVal.getHours()<10?"0"+inpuVal.getHours():inpuVal.getHours());
				//分钟
				dateButtonBox.find(".calendar-hms input:eq(1)").val(inpuVal.getMinutes()<10?"0"+inpuVal.getMinutes():inpuVal.getMinutes());
				//秒
				dateButtonBox.find(".calendar-hms input:eq(2)").val(inpuVal.getSeconds()<10?"0"+inpuVal.getSeconds():inpuVal.getSeconds());
				//输入框获取焦点选中
				dateButtonBox.find(".calendar-hms input").focus(function() {
					this.select();
				}).keyup(function() {
					if($(this).val() == ''){
						$(this).val('00');
					}
					$(this).val($(this).val().replace(/[^0-9]/ig, ""));
					if($(this).val().length > 2) {
						$(this).val($(this).val().substr(0, 2));
					}
					if(Number($(this).val()) > 23 && $(this).hasClass("tH")) {
						$(this).val(23);
					}
					if(Number($(this).val()) > 59 && !$(this).hasClass("tH")) {
						$(this).val(59);
					}
				}).bind("paste input", function() { //CTR+V事件处理  
					if($(this).val() == ''){
						$(this).val('00');
					}
					$(this).val($(this).val().replace(/[^0-9]/ig, ""));
					if($(this).val().length > 2) {
						$(this).val($(this).val().substr(0, 2));
					}
					if(Number($(this).val()) > 23 && $(this).hasClass("tH")) {
						$(this).val(23);
					}
					if(Number($(this).val()) > 59 && !$(this).hasClass("tH")) {
						$(this).val(59);
					}
				}).css("ime-mode", "disabled"); //CSS设置输入法不可用  
				//输入框中键盘落下事件
				dateButtonBox.find(".calendar-hms input").off("keydown").on("keydown", function(event) {
					//向下键
					if(event.keyCode == 40) {
						if($(this).val() == 0) {
							$(this).val(59);
						} else {
							$(this).val((Number($(this).val()) - 1)<10?("0"+(Number($(this).val()) - 1)):(Number($(this).val()) - 1));
						}
					}
					//向上键
					if(event.keyCode == 38) {
						$(this).val((Number($(this).val()) + 1)<10?("0"+(Number($(this).val()) + 1)):(Number($(this).val()) + 1));
						if(Number($(this).val()) > 23 && $(this).hasClass("tH")) {
							$(this).val('00');
						}
						if(Number($(this).val()) > 59 && !$(this).hasClass("tH")) {
							$(this).val('00');
						}
	
					}
				});
				/*清空*/
				$(dateButtonBox).find('.empty').unbind('click').bind('click', function() {
					$(n).val('');
					$(n).css('background-position', (inputWidth) + 'px 7px');
					c.emptyCallback();
					$("#" + c.controlId).remove();
				});
				/*今天*/
				$(dateButtonBox).find('.today:not(.disable)').unbind('click').bind('click', function() {
					$(n).val(dateFormat(c.dateFmt,new Date()));
					$(n).css('background-position', (inputWidth) + 'px 7px');
					c.callback();
					$("#" + c.controlId).remove();
				});
				/*关闭*/
				$(dateButtonBox).find('.close').unbind('click').bind('click', function() {
					$(n).css('background-position', (inputWidth) + 'px 7px');
					$("#" + c.controlId).remove();
				});
				/*确定*/
				$(dateButtonBox).find('.confirm').unbind('click').bind('click', function() {
					var hVal = $("#" + c.controlId).find(".tH").val() | 0;
					var mVal = $("#" + c.controlId).find(".tm").val() | 0;
					var sVal = $("#" + c.controlId).find(".tS").val() | 0;
					var a = new Date($("#" + c.controlId).find(".currentYear").text() + "/" + $("#" + c.controlId).find(".currentMonth").text() + "/" + ($("#" + c.controlId).find(".tabD a.select").text() || $("#" + c.controlId).find(".tabD a.current").text()) + " " + hVal + ":" + mVal + ":" + sVal);
					$(n).val(dateFormat(c.dateFmt, a));
					$(n).css('background-position', (inputWidth) + 'px 7px');
					c.callback();
					$("#" + c.controlId).remove();
				});
				$("#" + c.controlId).append(dateButtonBox);
			}
			/*初始化控件  参数*/
			c = jQuery.extend({
					controlId: "calendar"+uuid(8, 16),
					speed: 200,
					complement: true,
					readonly: true,
					upperLimit: NaN,
					lowerLimit: NaN,
					nowData: true,
					promHide: true,
					isPosi:false,//是否独立显示日期控件
					dateFmt: "yyyy-MM-dd",
					callback: function() {},
					emptyCallback: function() {}
				},
				c || {});
			
			/*设置readonly*/
			if(c.readonly) {
				n.attr("readonly", true);
				n.bind("keydown",
					function() {
						if(event.keyCode == 8) event.keyCode = 0
					});
			}
			/*获取当前时间*/
			today = new Date;
			var e = today.getFullYear(),
				f = today.getMonth(),
				q = today.getDate(),
				k = "";
			/*点击显示月份选单*/
	
			/*点击显示年份选单*/
			//设置弹出框的默认背景样式
			var inputWidth, paddingLeft, paddingRight;
			$(n).addClass('calendar-input-bg');
			//计算背景图的定位距离
			paddingLeft = parseInt($(n).css('padding-left')); //左内边距
			paddingRight = parseInt($(n).css('padding-right')); //右内边距
			inputWidth = $(n).width() - (paddingLeft) - (paddingLeft != 0 ? 5 : 10); //实际距离
			$(n).css('background-position', (inputWidth) + 'px 7px');
			//输入框的点击事件
			if(c.nowData) {
				//默认选中当前时间
				 var upperLimit = !!c.upperLimit ? (Object.prototype.toString.call(c.upperLimit) === "[object String]" ? new Date(c.upperLimit) : (Object.prototype.toString.call(c.upperLimit) === "[object Function]" ? new Date(c.upperLimit()):(!!c.upperLimit.val() ? new Date(c.upperLimit.val()) : NaN))) : c.upperLimit;
        var lowerLimit = !!c.lowerLimit ? (Object.prototype.toString.call(c.lowerLimit) === "[object String]" ? new Date(c.lowerLimit) : (Object.prototype.toString.call(c.lowerLimit) === "[object Function]" ? new Date(c.lowerLimit()):(!!c.lowerLimit.val() ? new Date(c.lowerLimit.val()) : NaN))) : c.lowerLimit;
        if(!isNaN(lowerLimit)){
            lowerLimit.setTime(lowerLimit.getTime()-24*60*60*1000); 
          }
        if(!(!isNaN(lowerLimit) && lowerLimit > new Date() || !isNaN(upperLimit) && new Date() > upperLimit)){
            $(n).val(dateFormat(c.dateFmt,new Date()));
        }
				
			}
			//判断是否独立显示控件的参数值
			if(c.isPosi){
				//直接调用日历控件初始化方法
				start();
			}else{
				//点击 或 获取焦点时 初始化日期选择框的弹出位置
				n.bind("click focus",
					function(e){
						if(/*$("#" + c.controlId + ":hidden").length != 0*/true) {
							start();
							var a = $("#" + c.controlId),
								b = F(n[0]),
								d = b.x + Number($(n).get(0).clientLeft) - 1;
							b = $(n).offset().top - $(window).scrollTop() + Number($(n).get(0).clientHeight) + 2;
							
							if((b+244)>$(window).height()){
								b = $(n).offset().top - $(window).scrollTop() - 244;
							}
							if((d+222) >$(window).width()){
								d = $(n).offset().left - $(window).scrollLeft() - 222 + $(n).get(0).clientWidth + 2;
							}
							a.css({
								top: b,
								left: d
							});
							d = $("#" + c.controlId).width();
							b = $("#" + c.controlId).height();
		
							$(n).css('background-position', (inputWidth) + 'px -57px');
							a.width(0);
							a.height(0);
							a.css('display', 'block').css({
								width: d + "px",
								height: b + "px"
							});
							var inpv = new Date();
							if(n.val() != '' && n.val() != undefined) {
								inpv = new Date(n.val().replace(/-/g, "/"));
							}
							//年月
							if(c.dateFmt == "yyyy-MM" || c.dateFmt == "MM") {
								//因为在IE8中,格式化日期格式,必须带有年月日,不够补齐进行转换
								if(c.dateFmt == "yyyy-MM") {
									inpv = new Date(n.val().replace(/-/g, "/") + "/01");
								} else {
									var currDate = new Date();
									inpv = new Date(currDate.getYear() + "/" + n.val() + "/01");
								}
								var ai = z(Number(inpv.getFullYear()));
								E(ai);
								u();
								$("#" + c.controlId).find(".currentYear").text(Number(inpv.getFullYear()));
								$("#" + c.controlId).find(".currentMonth").text(Number(inpv.getMonth() + 1));
		
								if(c.dateFmt == "MM") {
									$("#" + c.controlId).height(116);
									$("#" + c.controlId).find(".calTitle").hide();
								} else {
									$("#" + c.controlId).height(146);
									$("#" + c.controlId).find(".t_date div:eq(1)").hide();
									$("#" + c.controlId).find(".t_date div:eq(1)").hide();
									$("#" + c.controlId).find(".t_date .currentYearText").show();
									$("#" + c.controlId).find(".t_date .btCurrentYear").hide();
									$("#" + c.controlId).find(".t_date div:eq(0)").css("width", "150px");
								}
		
							} else if(c.dateFmt == "yyyy-MM-dd") { //年月日
								var ai = s(inpv.getFullYear(), inpv.getMonth());
								D(ai);
								r();
								$("#" + c.controlId).find(".currentYear").text(Number(inpv.getFullYear()));
								$("#" + c.controlId).find(".currentMonth").text(Number(inpv.getMonth() + 1));
								$("#" + c.controlId).height(242);
								$("#" + c.controlId).find(".btCurrentYear").hide();
								$("#" + c.controlId).find(".t_date div,.t_date,.currentYearText").show();
								$("#" + c.controlId).find(".t_date div:eq(0)").css("width", "50%");
							} else if(c.dateFmt == "yyyy") { //年
								//因为在IE8中,格式化日期格式,必须带有年月日,不够补齐进行转换
								inpv = new Date(n.val().replace(/-/g, "/") + "/01/01");
								var a = A(Number(Number(inpv.getFullYear())));
								E(a);
								v();
								$("#" + c.controlId).find('.calTitle').css('border-bottom', '1px solid #e5e5e5');
								$("#" + c.controlId).height(146);
								$("#" + c.controlId).find(".t_date div:eq(1)").hide();
								$("#" + c.controlId).find(".t_date .currentYearText").hide();
								$("#" + c.controlId).find(".t_date .btCurrentYear").show();
								$("#" + c.controlId).find(".t_date div:eq(0)").css("width", "150px");
							}
		
						}
						//阻止事件冒泡
						$yt_common.eventStopPageaction(e);
					});
					
					
					$(document).mousedown(function(a) {
						if(($(a.target).parentsUntil("#" + c.controlId).parent().length == 0 ||
								$(a.target).parentsUntil("#" + c.controlId).parent()[0].id != c.controlId)) {
							$("#" + c.controlId).remove();
						}
					});
					$("*").scroll(function (){
						$("#" + c.controlId).remove();
					});
					$(window).scroll(function (){
						$("#" + c.controlId).remove();
					});
			}
		});
	}
});