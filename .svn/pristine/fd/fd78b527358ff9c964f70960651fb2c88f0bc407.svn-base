(function($) {
	var ueditInit = {
		init:function(obj, opt) {
			//判断是默认样式还是美化过的样式true/false
			if(opt.isDefault){
				//实例化编辑器
				//uedit-synopsis是富文本编辑器自定义的id名
				var ue = UE.getEditor(opt.idName, {
					//工具栏选项
					toolbars: [
						['undo', 'redo', '|',
						'bold', 'italic', 'underline', 'forecolor', '|',
						'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify','simpleupload','insertimage','fullscreen'
					]
					],
					initialFrameHeight: (opt.ueditHeight == "" ? "280" : opt.ueditHeight), //设置编辑器高度
					scaleEnabled: true, //是否显示滚动条
					autoHeightEnabled: false, //自适应高度  
					autoFloatEnabled: false,
					elementPathEnabled: false,
					autoClearinitialContent: true,
					catchRemoteImageEnable: false,
					autoSyncData: false,
					//纯文本粘贴模式下的过滤规则
					'filterTxtRules': function() {
						function transP(node) {
							node.tagName = 'p';
							node.setStyle();
						}
						return {
							//直接删除及其字节点内容
							'-': 'script style object iframe embed input select',
							'p': {
								$: {}
							},
							'br': {
								$: {}
							},
							'div': {
								'$': {}
							},
							'table': {
								'$': {
									'tr': {
										'td': {}
									}
								}
							},
							//'img':{'$':{'src':{}}},
							'img': function(node) {
								var txt = !!node.innerText();
								if(txt) {
									node.parentNode.insertAfter(UE.uNode.createText(''), node);
								}
								node.parentNode.removeChild(node, node.innerText())
							},
							'caption': transP,
							'th': transP,
							'tr': transP,
							'h1': {
								'$': {}
							},
							'h2': transP,
							'h3': transP,
							'h4': transP,
							'h5': transP,
							'h6': transP,
							'li': transP,
							'td': function(node) {
								//没有内容的td直接删掉
								var txt = !!node.innerText();
								if(txt) {
									node.parentNode.insertAfter(UE.uNode.createText(' &nbsp; &nbsp;'), node);
								}
								node.parentNode.removeChild(node, node.innerText())
							}
						}
					}()
				});
				/*ue.addListener('afterinserthtml', function() {
					var html = ue.getContent();
					html = html.replace(/<img[^>]*>/i, '');
					ue.setContent(html, false);
				});*/
		        //判断是否有字数限制
				if(opt.fontLen !=""){
					ue.ready(function(){
						//将当前输入字数追加到文本编辑器中
				        var currFontNumStr = '<div class="uedit-font-number">已输入0个字，您还可以输入'+opt.fontLen+'个字</div>';
				        $("#"+opt.idName).append($(currFontNumStr));
					});
				    //文本编辑器的内容更改事件
					ue.addListener('selectionchange', function() {
						var txt = this.getContent();
						txt = txt.replace(/<[^>]+>/g, "");
						//验证字数
						if(txt.length > parseInt(opt.fontLen)) {
							$("#"+opt.idName+" .uedit-font-number").text('请不要超过'+opt.fontLen+'个字').css('color', 'red');
							//添加红色边框
							$("#"+opt.idName+" .edui-editor").addClass("valid-hint");
						} else {
							$("#"+opt.idName+" .uedit-font-number").text('已输入' + txt.length + '个字，您还可以输入' + (parseInt(opt.fontLen) - txt.length) + '个字').css('color', '#999');
							//清除红色边框
							$("#"+opt.idName+" .edui-editor").removeClass("valid-hint");
						}
						//判断是否是必填字段
						if(opt.validMsg !=""){
							if(txt.length > 0) {
								//清除红色边框
								$("#"+opt.idName+" .edui-editor").removeClass("valid-hint");
								$("#"+opt.idName).next().text('');
							}else{
								//添加红色边框
								$("#"+opt.idName+" .edui-editor").addClass("valid-hint");
								$("#"+opt.idName).next().text(opt.validMsg);
							}
						}
					});
				}
			}else{
				var ueTwo = UE.getEditor(opt.idName, {
					//工具栏选项'insertimage'上传图片
					toolbars: [
						['undo', 'redo', '|',
						'bold', 'italic', 'underline', 'forecolor', '|',
						'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify'
					]
					],
					initialFrameHeight: (opt.ueditHeight == "" ? "280" : opt.ueditHeight), //设置编辑器高度
					scaleEnabled: true, //是否显示滚动条
					autoHeightEnabled: false, //自适应高度  
					autoFloatEnabled: false,
					elementPathEnabled: false,
					autoClearinitialContent: true,
					enableAutoSave: false, //是否保留自动保存
					catchRemoteImageEnable: false,
					autoSyncData: false,
					//纯文本粘贴模式下的过滤规则
					'filterTxtRules': function() {
						function transP(node) {
							node.tagName = 'p';
							node.setStyle();
						}
						return {
							//直接删除及其字节点内容
							'-': 'script style object iframe embed input select',
							'p': {
								$: {}
							},
							'br': {
								$: {}
							},
							'div': {
								'$': {}
							},
							'table': {
								'$': {
									'tr': {
										'td': {}
									}
								}
							},
							//'img':{'$':{'src':{}}},
							'img': function(node) {
								var txt = !!node.innerText();
								if(txt) {
									node.parentNode.insertAfter(UE.uNode.createText(''), node);
								}
								node.parentNode.removeChild(node, node.innerText())
							},
							'caption': transP,
							'th': transP,
							'tr': transP,
							'h1': {
								'$': {}
							},
							'h2': transP,
							'h3': transP,
							'h4': transP,
							'h5': transP,
							'h6': transP,
							'li': transP,
							'td': function(node) {
								//没有内容的td直接删掉
								var txt = !!node.innerText();
								if(txt) {
									node.parentNode.insertAfter(UE.uNode.createText(' &nbsp; &nbsp;'), node);
								}
								node.parentNode.removeChild(node, node.innerText())
							}
						}
					}()
				});
				/*ueTwo.addListener('afterinserthtml', function() {
					var html = ueTwo.getContent();
					html = html.replace(/<img[^>]*>/i, '');
					ueTwo.setContent(html, false);
				});*/
				//工具栏美化过的编辑器初始化
				ueTwo.ready(function () {
					$("#"+opt.idName).find(".edui-default .edui-button.edui-for-undo .edui-icon").html('<img style="width:20px;float: left;" src="../../resources/images/uedit/undo-icon.png"/>');
					$("#"+opt.idName).find(".edui-default .edui-default .edui-button.edui-for-redo .edui-icon").html('<img style="width:20px;float: left;" src="../../resources/images/uedit/redo-icon.png"/>');
					$("#"+opt.idName).find(".edui-default .edui-default .edui-button.edui-for-bold .edui-icon").html('<img style="width:20px;float: left;" src="../../resources/images/uedit/bold-icon.png"/>');
					$("#"+opt.idName).find(".edui-default .edui-default .edui-button.edui-for-italic .edui-icon").html('<img style="width:20px;" src="../../resources/images/uedit/italic-icon.png"/>');
					$("#"+opt.idName).find(".edui-default .edui-default .edui-button.edui-for-underline .edui-icon").html('<img style="width:20px;" src="../../resources/images/uedit/underline-icon.png"/>');
					$("#"+opt.idName).find(".edui-default .edui-default .edui-for-forecolor .edui-icon").html('<img style="width:20px;" src="../../resources/images/uedit/forecolor-icon.png"/>');
					$("#"+opt.idName).find(".edui-default .edui-default .edui-button.edui-for-justifyleft .edui-icon").html('<img style="width:20px;float: left;" src="../../resources/images/uedit/justifyleft-icon.png"/>');
					$("#"+opt.idName).find(".edui-default .edui-default .edui-button.edui-for-justifycenter .edui-icon").html('<img style="width:20px;float: left;" src="../../resources/images/uedit/justifycenter-icon.png"/>');
					$("#"+opt.idName).find(".edui-default .edui-default .edui-button.edui-for-justifyright .edui-icon").html('<img style="width:20px;float: left;" src="../../resources/images/uedit/justifyright-icon.png"/>');
					$("#"+opt.idName).find(".edui-default .edui-default .edui-button.edui-for-justifyjustify .edui-icon").html('<img style="width:20px;float: left;" src="../../resources/images/uedit/justifyjustify-icon.png"/>');
				    //添加样式
				    $("#"+opt.idName).find('.edui-toolbar .edui-button .edui-icon').css({'text-align':'center','background':'none'});
				    $("#"+opt.idName).find('.edui-default:not(.edui-button-wrap) .edui-toolbar .edui-menubutton .edui-icon').css({'text-align':'center','background':'none'});
				    $("#"+opt.idName).find('.edui-default:not(.edui-button-wrap) .edui-toolbar .edui-splitbutton .edui-icon').css({'text-align':'center','background':'none'});
				   //判断是否有字数限制
					if(opt.fontLen !=""){
					   	//将当前输入字数追加到文本编辑器中
				       var currFontNumStr = '<div class="uedit-font-number">已输入0个字，您还可以输入'+opt.fontLen+'个字</div>';
				       $("#"+opt.idName).append($(currFontNumStr));
				   }
				});
				//判断是否有字数限制
				if(opt.fontLen !=""){
				    //文本编辑器的内容更改事件
					ueTwo.addListener('selectionchange', function() {
						var txt = this.getContent();
						txt = txt.replace(/<[^>]+>/g, "");
						//验证字数
						if(txt.length > parseInt(opt.fontLen)) {
							$("#"+opt.idName+" .uedit-font-number").text('请不要超过'+opt.fontLen+'个字').css('color', 'red');
							//添加红色边框
							$("#"+opt.idName+" .edui-editor").addClass("valid-hint");
						} else {
							$("#"+opt.idName+" .uedit-font-number").text('已输入' + txt.length + '个字，您还可以输入' + (parseInt(opt.fontLen) - txt.length) + '个字').css('color', '#999');
							//清除红色边框
							$("#"+opt.idName+" .edui-editor").removeClass("valid-hint");
						}
						//判断是否是必填字段
						if(opt.validMsg !=""){
							if(txt.length > 0) {
								//清除红色边框
								$("#"+opt.idName+" .edui-editor").removeClass("valid-hint");
								$("#"+opt.idName).next().text('');
							}else{
								//添加红色边框
								$("#"+opt.idName+" .edui-editor").addClass("valid-hint");
								$("#"+opt.idName).next().text(opt.validMsg);
							}
						}
					});
				}
			}
		}
	};
	$.fn.extend({
		ueditInit: function(opt) {
			var defaults = {
				isDefault:true,//是否是默认的样式,默认true,false工具栏图标是美化过的
				validMsg:'',//验证提示信息"请输入xxxx",默认空
				idName:'',//文本编辑器的Id名称
				ueditHeight:'',//编辑器高度设置默认280
				fontLen:''//字数验证,默认空
			}
			// opt.controlClass 控件类名
			// opt.callback 回调函数
			// opt.dataUrl  数据请求路径,接口访问路径,json文件访问路径
			//整合参数配置
			var options = $.extend(defaults, opt);
			this.ytUeditControl = ueditInit;
			this.ytUeditControl.init($(this), options);
			return $(this);
		}
	});
})(jQuery);
