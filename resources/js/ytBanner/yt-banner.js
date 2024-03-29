/* ytBanner - v2.1.3 - https://github.com/happyfreelife/ytBanner - 2016-12-13 */ ! function(a, b) {
	"function" == typeof define && define.amd ? define(b(a, document)) : "undefined" != typeof exports ? module.exports = b(a, document) : (a.ytBanner = a.ytBanner || {}, a.ytBanner.Global = b(a, document))
}(window, function(a, b) {
	var c = {
		isLTIE8: /msie (6.0|7.0)/i.test(navigator.userAgent),
		isSupportTouch: "ontouchstart" in a,
		isMobile: !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/),
		isSupportTransition: function() {
			var a = b.body.style || b.documentElement.style;
			return void 0 !== a.transition || void 0 !== a.WebkitTransition
		}(),
		transformProperty: "string" == typeof b.body.style.transform ? "transform" : "WebkitTransform",
		prevArrow: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAABuCAMAAAC0hHtLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjdGOUJEQTlBRjU5MTFFNUFFQjJBQzRBNEM1MkYzMzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjdGOUJEQUFBRjU5MTFFNUFFQjJBQzRBNEM1MkYzMzEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCN0Y5QkRBN0FGNTkxMUU1QUVCMkFDNEE0QzUyRjMzMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCN0Y5QkRBOEFGNTkxMUU1QUVCMkFDNEE0QzUyRjMzMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhEdN5oAAAAGUExURf///////1V89WwAAAACdFJOU/8A5bcwSgAAARBJREFUeNq82EEOwDAIA8Hl/58OH4gizSG9R20D2Isbe7JThcfCt4UfGf5beCXhTYYFCOsWljvskrC5wp4MWzmcgHBwwnkLxzSc7lAUQi0JJSg79jp3Fa5QJ0N5DVU5FPPQA0LrCB0nNKrQ30JbDN00NOHQu0PLD0khBIyQS0KcCSkohKeQuUJUCwkvBMOQJ0MMDek1hN6GmfcnYvt38r1wHbju3Gfc1zxHPLesE6xLrIOsu6zz7CvsY+yb7NPMBcwhzD3MWcx1zJHMrczJzOW8B/DewXsO71W8x/HeyHsq78W8h/PezzkD5xqco3BuwzkR51Kcg3Huxjkf54qcY3Juyjkt58KcQzuUa86+zxFgAFs9FmHsomPPAAAAAElFTkSuQmCC",
		nextArrow: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAABuCAMAAAC0hHtLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QURDRjhFMjJBRjU4MTFFNUIzMzhBRTk0RUZERDg4OUEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QURDRjhFMjNBRjU4MTFFNUIzMzhBRTk0RUZERDg4OUEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBRENGOEUyMEFGNTgxMUU1QjMzOEFFOTRFRkREODg5QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBRENGOEUyMUFGNTgxMUU1QjMzOEFFOTRFRkREODg5QSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqC2oS0AAAAGUExURf///////1V89WwAAAACdFJOU/8A5bcwSgAAARxJREFUeNq82MtuwlAQRMHT///TKEJRILzsWuAtKgmwPbenm12VuRlsBpvBZrAZbAabwWawGWwGm8FmsBlsBpvBZrAZbAabwWawGWwGm8FmsBlsBt9+lrl38MOvz9xr+PH+Zu4VPPAEZ+45PPSOZu4ZPDiFMvcID8/ZzP2HJ06SzN3DU2dl5m7hyTSQuT94Ou9k7hdCosvcFVJmzdwPxFTeVx1+T/xf8D7gfcfnDJ9rfI/wvcU5gXMJ5yDOXZzzeK7gOYbnJp7TmAswh2DuwZyFuQ5zJOZWzMmYy3EPwL0D9xzcq3CPw70R91Tci3EPx70fewbsNbBHwd4GeyLspbAHw94Nez7sFbHHxN4Ue1rshbGH1qisPbtdFwEGAFZuFsthqI7FAAAAAElFTkSuQmCC",
		prevThumbBtn: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REI4MjIyMTU4OTAyMTFFNkFEM0VDOUJCMDg3MkUwMjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REI4MjIyMTY4OTAyMTFFNkFEM0VDOUJCMDg3MkUwMjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEQjgyMjIxMzg5MDIxMUU2QUQzRUM5QkIwODcyRTAyNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEQjgyMjIxNDg5MDIxMUU2QUQzRUM5QkIwODcyRTAyNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkyMmQIAAAQJSURBVHjatJdPTBR3FMdnZmfrLtvFABXoH5SQKNiCtpc2VcFYeuViDzVBExM9wN68kMCxF7i0nABJJHJsQ3orx7omFkw2HKBLaFNjomhCKiLr7s7iusuu34ffIRudmf3tRif5ZHdnf/P7vt977/d+b3RN/QqBU+A4+AwcAh/yvzTYBI/BP2ARWCqT6gpjDoMfwBl+/wBkwEuwyzE+3q/h/XXwF/id36s24Cq4ABrBM65q1+O5Io0Rb9WDJ+BXcMNNwOdyXwR/Bj+CHU70kgJ6mQUVOTYBAuB7cALEnMLiNJnEdxIcofuKiqFy84jO0D0EEeaJqwHitlka8QgY2ru5CqCF4pcZTscQ/AK6uHKjgiSWML3gb9Nl3HPQCo6BeScDLoGL4IGiy3UmZKavr6+1v7+/bWNjI7e1tZXgjnAz4iuQBH+XrqCR2Sq/UwoG2OKpwcHBzsnJyZNyM5FI5Hp6eu7E43E3IyQnwvyU3fXE9sAV0A3+r0Q8Eol02eLpdFqrra2V+cz5+fn73AFOz2bBp/yMGdyz58BWheKdExMTsr20VCqlBYPBvQGxWOyZSx6UziFa34m2GPA1t4lVgdu7IH7SFq+pqdF8Pp82Ojp6b3Z29j9WRK/L4q74xmDWmyVlVcXtJ5zER0ZGlnDbr7CDdjmu02DBscq4Xx5Ic+VviY+NjdniQU5cVPCmaB42WHxyZR54MTAw8EXpyiXm9sqHh4crEbcv0fzI5IMFL3FsrU+mpqb2sz0QCGj5fL4wNDS0Nj4+vlqFuO3VkEq1y3d0dBzcMzmX03Rd10zT1HZ2dnZnZmakYuarEN+/DJZRL0OCc3NzD5aWlpJ+v18zDEPLZDJaXV2df3V19VxbW1ujYvFyOoktgweD32Ogub29ne3t7Y0uLy+nJPbiBcuytJaWluDi4uJZGFFfhRGi+dTgMRnycKHcDyaTySxy4dbKykpKst82oqmp6UAVRhSpuS4GxBlHX7kHkP3Z7u7uckakFYzwUTNusFNZp0WaihFunlhYWDjb3t5ezzpfrsFdt88CKQhR0KCQyXtGSDicPNHc3HwAlbKdie01RwM1LTv7f2NbHVY14k1PhEKvHbi2tvbcI5z2cbzJ439/+8kxfBM0V5JE9MTtaDT6FAUqj6J0f3p6+p5HOHVq3GSj+5bYdfAtuyLVlkzibYTD4QC8YvFgMx08WWBLdhcMvMumVGdGFyhsuIgrNaWSPHfYHbWyh1Npyw3Opbu05Ue4oAjD7fliIg3jn+Ao+JKry1ZRau2EE28ugGtgQ/XNSGL5B4/Mz9nDFUpcXe7VTF5aP2ZRmgE/uXVcKqsS9513eTktlIi+l5fTN6vXadDBhGrgPbuYbTLO/9LlSq/nrwQYANVjpXwdco3fAAAAAElFTkSuQmCC",
		nextThumbBtn: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDNEMERGQUY4OTAyMTFFNkJCMDZEOTRDNkUxQTNCREQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDNEMERGQjA4OTAyMTFFNkJCMDZEOTRDNkUxQTNCREQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEM0QwREZBRDg5MDIxMUU2QkIwNkQ5NEM2RTFBM0JERCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEM0QwREZBRTg5MDIxMUU2QkIwNkQ5NEM2RTFBM0JERCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pj3A5lwAAAQmSURBVHjarJfdT1tlHMfPS18oteNthRrFLSSzaNLpEm90K4ZgSAyYkKiZUZfswgvhgsT4H3ivN0vAC0l2uYXo1bxkTXBgMiABh2i4soAxbSfd+kJXoK3fX/2epdnOOX3KdpIPLafnPL/v7+V5nt+ja+pXELwDXgMvgzB4gb8VQAbsgT/AMiiqDKorPPMK+BBc4ncfOACHoMJnTN5v5/0dcAf8yO8nFvAF+AT0gn16VXF5r0YxEq1ukAY3wA9OBkyH+2LwW3AZlDjQIQ3oTRyq8dkHoA28B86Du3ZpsRtM8jsDzjB8NcVUOUVEZ+qSYIp14ihAwnadInaBoT2fqwr6afwq02mbgu9AjJ4bDiE+ZBHKoF7F6MgzD8FZ8Cr42U7AFfA5+MthULlXjEajPdPT09FQKNS2vb2d5hhGCyIugBz4rTEFvaxW+T/vIOAwFot1Li4uxjs7O8VzbWpqamN2dnYTX0MUUlOoiRA/ZXalLeWXubDkXUJampycPCfGC4VC/cbMzMwbEBHjexWFdFgOhing8Zz9umH6OF2VcDgcnJiYiJimqRWLRc3v92tjY2N9mUymtrKysseaMBREiNgIuCUC4uAjkG0SQu/6+noKRn1DQ0M9Ho+nUUQknU5rq6uru4oijsFL4HcR8AF4iwLcQlgfdGFhYQdG22xESCQ0REJFRJVT/m8R8DHDUVKo5HrFi4g2XHYiGIm9JlNU7nukHmTAT8EpUFZcVB6LsCLxZE2kUqkqRKQowjGl4JEM9hnX7KMWVjZLxG4ul9OGh4dP+3w+vVQqafjUxsfHI4lEIptMJh/QUycBZeMZ1ngZ4Hhubm4HhiuSCl3XtaOj//0YHBzsYLG5XgZ3KLNFAfX5PDAw0Lu5uTnc1dXlPTg40AzD0Lxer9RAbn5+XlbUQBPbJflzv0munIx3Ly8vv9vf3x+Q/Iv3gUBAw1TNj4yMJLLZbNkl/FYK9g1uPEGFZfQp4319fX7LeHt7u7axsZFHUd5GXZTpfc0lhWIzKQLuMVemgvGCm/F4PH47n8+XFRwyafOewU7FioLbVcZO2L20tOTouaJxq8EVm3etIkyAniYvlrDxRCORiK3nDHtQcUfsoc2iNQ1vsK0OuQxgbm1tPazLDwZP6rm1HYutm40NSZHr8/vcE2yrdm1tLdPR0eFDX3AKqdgfHR29A+OPWixi6Q+v8ezw1Fr9PXibXZFh87IUzjG6oSANi2i/ovEqW7JfwZcnbUp1DnTM3zwtGFdqSmVH/IU9wln2cE+25XoLfaD17hk6JG15qtnBRBrGBXAOvElvyyc4G1gFJ9FcAl+Bf1RPRlKUt7hDvs7uxQp9VeFoJofWF3lonQPfOB1Wn8fhVGc67A6nP/FE9Eyn48bV66LstCyoMO9V6d2/zPOfDLnS8fw/AQYANJumLDwDguMAAAAASUVORK5CYII=",
		loadingImage: "data:image/gif;base64,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"
	};
	return c
}),
function(a, b) {
	"function" == typeof define && define.amd ? define(function() {
		return b(a, document)
	}) : "undefined" != typeof exports ? module.exports = b(a, document) : (a.ytBanner = a.ytBanner || {}, a.ytBanner.Banner = b(a, document))
}(window, function(a, b) {
	function c(a, b) {
		this.$elem = $(a), this.options = b
	}
	return c
}),
function(a, b) {
	"function" == typeof define && define.amd ? define(["global", "banner", "default-style", "add-element"], function(c, d) {
		return b($, a, document, c, d)
	}) : "undefined" != typeof exports ? module.exports = b($, a, document, require("global"), require("banner"), require("default-style"), require("add-element")) : (a.ytBanner = a.ytBanner || {}, b($, a, document, a.ytBanner.Global, a.ytBanner.Banner))
}(window, function(a, b, c, d, e) {
	e.prototype.init = function() {
		this.$list = this.$elem.children().first(), this.$item = this.$list.children(), this.len = this.$item.length, this.currentIndex = 0, this.activeIndex = 0, this.latestIndex = 0, this.isHovered = !1, this.isAnimated = !1, d.isSupportTouch && (this.options.animation = "slide");
		var a = this,
			b = this.$elem,
			c = this.$list,
			e = this.$item,
			f = this.options,
			g = [],
			h = new RegExp("\\?thumb=(.*\\.(gif|jpg|jpeg|png))$");
		if(f.init.call(a, b, e), "static" === b.css("position") && b.css("position", "relative"), b.css({
				tapHighlightColor: "transparent",
				userSelect: "none"
			}), c.width(2 * a.len * 100 + "%").wrap('<div class="tb-list"/>'), f.adaptive && ("none" === b.css("maxWidth") && b.css("maxWidth", "100%"), setTimeout(function() {
				c.height(b.height())
			}, 50), e.each(function() {
				var a = $(this).children("img"),
					b = a.attr("src") || a.attr("data-src");
				a.css({
					display: "block",
					maxWidth: "100%"
				}), a.attr("data-src") && $(this).data("origin", b), $(this).data("thumb", b)
			})), f.adaptive || e.each(function() {
				var a = $(this).children("img"),
					c = a.attr("src") || a.attr("data-src");
				a.attr("data-src") ? $(this).data("origin", c) : $(this).css("backgroundImage", "url(" + c + ")"), $(this).data("thumb", c).height(b.height()), a.remove()
			}), e.width(b.width()), !(a.len <= 1)) {
			try {
				e.each(function() {
					var b = $(this).data("thumb");
					g.push(b.match(h) ? b.match(h)[1] : b), a.thumbArr = g
				})
			} catch(i) {}
			"slide" === f.animation && (d.isSupportTransition && (c.css(d.transformProperty, "translate3d(0, 0, 0)"), c.css("transition", "transform " + f.duration + "ms")), c.css("left", 0), e.css("float", "left").first().show().siblings().hide(), e.first().clone(!0).addClass("first-clone").hide().appendTo(c), e.last().clone(!0).addClass("last-clone").hide().prependTo(c)), "fade" === f.animation && c.before(c.clone(!0).css({
				position: "absolute",
				top: 0,
				left: 0
			})), "fade" !== f.animation && "flash" !== f.animation || e.first().siblings().css("opacity", 0), a.defaultStyle(), a.addElement().arrow()
		}
	}
}),
function(a, b) {
	"function" == typeof define && define.amd ? define(["global", "banner"], function(c, d) {
		return b($, a, document, c, d)
	}) : "undefined" != typeof exports ? module.exports = b($, a, document, require("global"), require("banner")) : (a.ytBanner = a.ytBanner || {}, b($, a, document, a.ytBanner.Global, a.ytBanner.Banner))
}(window, function(a, b, c, d, e) {
	e.prototype.defaultStyle = function() {
		var a = ".tb-list,\n.tb-list > *,\n.tb-thumb dl{\n    position: relative;\n    overflow: hidden;\n}\n.tb-list > * > *{\n    position: relative;\n    float: left;\n    min-height: 1px;\n    background-repeat: no-repeat;\n    background-position: center top;\n}\n.tb-list > .touching{\n    -webkit-transition-duration: 0ms !important;\n    transition-duration: 0ms !important;\n}\n.tb-arrow{\n    width: 100%;\n}\n.tb-arrow a{\n    position: absolute;\n    top: 0;\n    cursor: pointer;\n}\n.tb-arrow a.prev{\n    left: 0;\n}\n.tb-arrow a.next{\n    right: 0;\n}\n.tb-arrow a img{\n    display: inline-block;\n    max-height: 100%;\n}\n.tb-btn a{\n    display: inline-block;\n    width: 10px;\n    height: 10px;\n    margin: 0 5px;\n    background-color: #fff;\n    border-radius: 50%;\n    cursor: pointer;\n}\n.tb-btn a.active{\n    background-color: #09c;\n}\n.tb-thumb{\n    position: absolute;\n    bottom: 10px;\n    left: 0;\n    width: 100%;\n    overflow: hidden;\n}\n.tb-thumb a{\n    position: absolute;\n    width: 32px;\n    height: 32px;\n    background-repeat: no-repeat;\n    cursor: pointer;\n}\n.tb-thumb dl dd{\n    position: relative;\n    float: left;\n    margin-left: 0;\n    overflow: hidden;\n    cursor: pointer;\n}\n.tb-thumb dl dd img{\n    position: relative;\n    display: block;\n    width: 100%;\n}\n.tb-loading{\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n}\n.tb-loading img{\n    position: absolute;\n    left: 50%;\n    width: 40px;\n    height: 40px;\n    margin-left: -20px;\n}\n";
		$("#tb-default-style").length || $("head").append('<style id="tb-default-style">\n' + a + "</style>")
	}
}),
function(a, b) {
	"function" == typeof define && define.amd ? define(["global", "banner"], function(c, d) {
		return b($, a, document, c, d)
	}) : "undefined" != typeof exports ? module.exports = b($, a, document, require("global"), require("banner")) : (a.ytBanner = a.ytBanner || {}, b($, a, document, a.ytBanner.Global, a.ytBanner.Banner))
}(window, function(a, b, c, d, e) {
	e.prototype.setStyle = function(a) {
		var b = this.options,
			c = this.$elem,
			e = this.$arrow,
			f = this.$arrowBox,
			g = this.$btn,
			h = this.$btnBox,
			i = this.$thumb,
			j = this.$thumbList,
			k = this.$thumbSlideBtn,
			l = this.$thumbBox;
		switch(a) {
			case "arrow":
				"none" === e.css("backgroundImage") && (e.height() || e.height(parseInt(.1 * c.height())), e.filter(".prev").html('<img src="' + d.prevArrow + '">'), e.filter(".next").html('<img src="' + d.nextArrow + '">'), e.find("img").on("dragstart", function() {
					return !1
				}));
				break;
			case "arrowBoxPos":
				"auto" === f.css("top") && "auto" === f.css("bottom") && f.css({
					top: "50%",
					marginTop: -e.outerHeight() / 2
				}), "auto" === f.css("left") && "auto" === f.css("right") && f.css({
					left: "50%",
					marginLeft: -f.width() / 2
				}), c.append(f.css("position", "absolute"));
				break;
			case "btnBoxPos":
				"auto" === h.css("top") && "auto" === h.css("bottom") && h.css("bottom", 10), "auto" === h.css("left") && "auto" === h.css("right") && h.css({
					width: "100%",
					textAlign:"center"
					/*marginLeft: -g.outerWidth(!0) * g.length / 2*/
				}), c.append(h.css("position", "absolute"));
				break;
			case "thumb":
				i.each(function() {
					$(this).find("img")[0].complete ? $(this).find("img").css("marginTop", function() {
						return($(this).parent().height() - $(this).height()) / 2
					}) : $(this).find("img").on("load", function() {
						$(this).css("marginTop", function() {
							return($(this).parent().height() - $(this).height()) / 2
						})
					})
				}), i.css({
					width: b.thumb.width,
					height: b.thumb.height,
					marginRight: b.thumb.gap
				}), i.last().css("marginRight", 0);
				break;
			case "thumbSlideBtn":
				k.css("top", (j.height() - k.height()) / 2);
				break;
			case "thumbList":
				j.css({
					left: 0,
					width: i.outerWidth(!0) * i.length - b.thumb.gap
				});
				break;
			case "thumbBox":
				var m, n, o = i.outerWidth(!0);
				m = $.isNumeric(b.thumb.visible) ? Math.min(b.thumb.visible, parseInt(c.width() / o)) : parseInt(c.width() / o), n = o * m - b.thumb.gap, l.css({
					left: "50%",
					width: n,
					height: j.height(),
					marginLeft: -n / 2
				}), j.width() <= l.width() ? k.hide() : (k.filter(".prev").css({
					left: b.thumb.gap,
					backgroundImage: "url(" + d.prevThumbBtn + ")"
				}), k.filter(".next").css({
					right: b.thumb.gap,
					backgroundImage: "url(" + d.nextThumbBtn + ")"
				}))
		}
	}
}),
function(a, b) {
	"function" == typeof define && define.amd ? define(["global", "banner", "set-style", "bind-animation"], function(c, d) {
		return b($, a, document, c, d)
	}) : "undefined" != typeof exports ? module.exports = b($, a, document, require("global"), require("banner"), require("set-style"), require("bind-animation")) : (a.ytBanner = a.ytBanner || {}, b($, a, document, a.ytBanner.Global, a.ytBanner.Banner))
}(window, function(a, b, c, d, e) {
	e.prototype.addElement = function() {
		function a() {
			e.before.call(b, b.$elem, b.$item, b.currentIndex)
		}
		var b = this,
			c = this.$elem,
			e = (this.$list, this.options);
		return {
			arrow: function() {
				return !e.arrow || d.isMobile ? void b.addElement().btn() : (c.append('<div class="tb-arrow"><a class="prev"></a><a class="next"></a></div>'), b.$arrowBox = $(".tb-arrow", c), b.$arrow = $(".tb-arrow a", c), b.setStyle("arrow"), b.setStyle("arrowBoxPos"), b.$arrow.on({
					click: function() {
						b.isAnimated || (a(), $(this).hasClass("prev") ? b.currentIndex-- : b.currentIndex++, b.play())
					},
					selectstart: function() {
						return !1
					}
				}), void b.addElement().btn())
			},
			btn: function() {
				if(!e.btn) return void b.addElement().thumb();
				for(var f = 0, g = ""; f < b.len; f++) g += "<a><i></i></a>";
				c.append($('<div class="tb-btn"/>').append(g)), b.$btnBox = $(".tb-btn", c), b.$btn = $(".tb-btn a", c), b.$btn.first().addClass("active"), b.setStyle("btnBoxPos"), "ol" === e.btn && b.$btn.find("i").each(function(a) {
					$(this).text(a + 1)
				}), d.isMobile || b.$btn.on(b.options.useHover ? "mouseenter" : "click", function() {
					b.isAnimated || (a(), b.currentIndex = $(this).index(), b.play())
				}), b.addElement().thumb()
			},
			thumb: function() {
				if(!("object" == typeof e.thumb && parseInt(e.thumb.width) > 0 && parseInt(e.thumb.height) > 0 && parseInt(e.thumb.gap) >= 0)) return void b.bindAnimation();
				for(var d, f = 0, g = ""; f < b.len; f++) d = b.thumbArr[f], g += '<dd><img src="' + d + '"></dd>';
				c.append('<div class="tb-thumb"><dl>' + g + '</dl><a class="prev disabled"></a><a class="next"></a></div>'), b.$thumbBox = $(".tb-thumb", c), b.$thumbSlideBtn = $(".tb-thumb a", c), b.$thumbList = $(".tb-thumb dl", c), b.$thumb = $(".tb-thumb dl dd", c), b.setStyle("thumb"), b.setStyle("thumbSlideBtn"), b.setStyle("thumbList"), b.setStyle("thumbBox"), b.$thumb.first().addClass("active"), b.$thumb.on(b.options.useHover ? "mouseenter" : "click", function() {
					b.isAnimated || (a(), b.currentIndex = $(this).index(), b.play())
				}), b.$thumbSlideBtn.on({
					click: function() {
						if(!$(this).hasClass("disabled")) {
							var a, d, e = b.$thumbBox,
								f = b.$thumbList,
								g = b.$thumb,
								h = parseInt(f.css("left"));
							a = $.isNumeric(b.options.thumb.visible) ? Math.min(b.options.thumb.visible, parseInt(c.width() / g.outerWidth(!0))) : parseInt(c.width() / g.outerWidth(!0)), d = $(this).hasClass("prev") ? Math.min(h + g.outerWidth(!0) * a, 0) : Math.max(h - g.outerWidth(!0) * a, e.width() - f.width()), b.animation.thumbListSlide(d)
						}
					},
					selectstart: function() {
						return !1
					}
				}), b.bindAnimation()
			}
		}
	}
}),
function(a, b) {
	"function" == typeof define && define.amd ? define(["global", "banner", "bind-event"], function(c, d) {
		return b($, a, document, c, d)
	}) : "undefined" != typeof exports ? module.exports = b($, a, document, require("global"), require("banner"), require("bind-event")) : (a.ytBanner = a.ytBanner || {}, b($, a, document, a.ytBanner.Global, a.ytBanner.Banner))
}(window, function(a, b, c, d, e) {
	e.prototype.bindAnimation = function() {
		function a() {
			g.after.call(f, f.$elem, f.$item, f.currentIndex)
		}

		function b() {
			f.currentIndex = f.currentIndex === f.len ? 0 : f.currentIndex === -1 ? f.len - 1 : f.currentIndex
		}
		var c, e, f = this,
			g = this.options,
			h = this.$elem,
			i = this.$list,
			j = i.children(),
			k = this.$thumbBox,
			l = this.$thumbList,
			m = this.$thumb,
			n = this.$thumbSlideBtn,
			o = this.animation = {};
		o.slide = function() {
			var a = !0;
			f.currentIndex !== f.latestIndex && (f.currentIndex < f.latestIndex && (a = !1), a === !1 && i.css("left", "-100%"), j.eq(f.currentIndex + 1).show(), d.isSupportTransition && setTimeout(function() {
				f.isAnimated = !0;
				var b = a ? "translate3d(" + -j.width() + "px, 0, 0)" : "translate3d(" + j.width() + "px, 0, 0)";
				i.css(d.transformProperty, b), setTimeout(f.animation.slideCallback, g.duration - 50)
			}, 50), d.isSupportTransition || (f.isAnimated = !0, i.animate({
				left: a ? "-100%" : 0
			}, g.duration, f.animation.slideCallback)), f.activeBtnAndThumb())
		}, o.fade = function() {
			b(), f.isAnimated = !0, i.css("left", 100 * -f.currentIndex + "%"), j.eq(f.currentIndex).animate({
				opacity: 1
			}, {
				duration: .8 * g.duration,
				complete: f.animation.fadeCallback
			}), f.activeBtnAndThumb()
		}, o.flash = o.fade, o.none = function() {
			b(), j.eq(f.currentIndex).show().siblings().hide(), f.activeBtnAndThumb(), j.eq(f.currentIndex).data("origin") || a()
		}, o.thumbListSlide = function() {
			l.is(":animated") || (c = $.isNumeric(g.thumb.visible) ? Math.min(g.thumb.visible, parseInt(h.width() / m.outerWidth(!0))) : parseInt(h.width() / m.outerWidth(!0)), e = $.isNumeric(arguments[0]) ? arguments[0] : Math.max(-parseInt(f.activeIndex / c) * m.outerWidth(!0) * c, k.width() - l.width()), l.stop(!0, !1).animate({
				left: e
			}, function() {
				var a = parseInt(l.css("left"));
				a ? Math.abs(a) + k.width() === l.width() ? n.filter(".next").addClass("disabled").siblings("a").removeClass("disabled") : n.removeClass("disabled") : n.filter(".prev").addClass("disabled").siblings("a").removeClass("disabled")
			}))
		}, o.slideCallback = function() {
			f.isAnimated = !1, f.latestIndex = f.currentIndex = f.currentIndex === -1 ? f.len - 1 : f.currentIndex === f.len ? 0 : f.currentIndex, i.css({
				left: 0,
				transition: "none"
			}), i.css(d.transformProperty, "translate3d(0, 0, 0)"), j.eq(f.currentIndex + 1).show().siblings().hide(), setTimeout(function() {
				i.css("transition", "transform " + g.duration + "ms")
			}, 50), j.eq(f.currentIndex).data("origin") || a(), f.useAuto && !f.isHovered && f.setPlayTimer()
		}, o.fadeCallback = function() {
			f.isAnimated = !1, "fade" === g.animation && (i.prev().css("left", 100 * -f.currentIndex + "%"), i.prev().html(i.html())), j.eq(f.currentIndex).siblings().css("opacity", 0), j.eq(f.currentIndex).data("origin") || a(), f.useAuto && !f.isHovered && f.setPlayTimer()
		}, setTimeout(function() {
			g.before.call(f, f.$elem, f.$item, 0), f.currentIndex || j.eq(f.currentIndex).data("origin") || a()
		}, 50), f.bindEvent().widthChangeEvent(), f.bindEvent().touchEvent()
	}
}),
function(a, b) {
	"function" == typeof define && define.amd ? define(["global", "banner", "lazyload"], function(c, d) {
		return b($, a, document, c, d)
	}) : "undefined" != typeof exports ? module.exports = b($, a, document, require("global"), require("banner"), require("lazyload")) : (a.ytBanner = a.ytBanner || {}, b($, a, document, a.ytBanner.Global, a.ytBanner.Banner))
}(window, function(a, b, c, d, e) {
	e.prototype.bindEvent = function() {
		var a, b, c, e, f, g, h, i, j = this,
			k = j.options,
			l = this.$elem,
			m = this.$list,
			n = m.children();
		return {
			widthChangeEvent: function() {
				setInterval(function() {
					n.width(l.width()), k.adaptive && (m.height(n.filter(":visible").height()), l.height(m.height())), "fade" === k.animation && m.prev().children().width(l.width()), k.arrow && j.$arrowBox.css("marginLeft", function() {
						return -j.$elem.width() / 2
					})
				}, 50), $.isNumeric(k.auto) && k.auto > 0 && (j.useAuto = !0, j.setPlayTimer()), j.lazyload()
			},
			touchEvent: function() {
				function o(d) {
					d.preventDefault(), j.isAnimated || (a = d.touches[0], b = Date.now(), c = a.pageX - l.offset().left)
				}

				function p(b) {
					if(b.preventDefault(), !j.isAnimated) {
						if(a = b.touches[0], e = a.pageX - l.offset().left, f = e - c, k.before.call(j, j.$elem, j.$item, j.currentIndex), !m.hasClass("touching")) {
							if(f < 0) g = !0, j.currentIndex++;
							else {
								if(!(f > 0)) return;
								g = !1, j.currentIndex--
							}
							g === !1 && m.css("left", "-100%"), n.eq(j.currentIndex + 1).show(), m.addClass("touching")
						}
						m.css(d.transformProperty, "translate3d(" + f + "px, 0, 0)"), j.lazyload(j.currentIndex)
					}
				}

				function q(a) {
					if(a.preventDefault(), !j.isAnimated && f) {
						j.isAnimated = !0, i = Date.now(), h = i - b;
						var c;
						(h < 300 || Math.abs(f) >= n.width() / 2) && (c = g ? "translate3d(" + -n.width() + "px, 0, 0)" : "translate3d(" + n.width() + "px, 0, 0)", j.activeBtnAndThumb()), h > 300 && Math.abs(f) < n.width() / 2 && (c = "translate3d(0, 0, 0)", g ? j.currentIndex-- : j.currentIndex++), m.removeClass("touching").css(d.transformProperty, c), setTimeout(function() {
							j.animation.slideCallback()
						}, k.duration), f = 0
					}
				}
				d.isSupportTouch && (l[0].addEventListener("touchstart", o, !1), l[0].addEventListener("touchmove", p, !1), l[0].addEventListener("touchend", q, !1))
			}
		}
	}
}),
function(a, b) {
	"function" == typeof define && define.amd ? define(["global", "banner"], function(c, d) {
		return b($, a, document, c, d)
	}) : "undefined" != typeof exports ? module.exports = b($, a, document, require("global"), require("banner")) : (a.ytBanner = a.ytBanner || {}, b($, a, document, a.ytBanner.Global, a.ytBanner.Banner))
}(window, function(a, b, c, d, e) {
	e.prototype.lazyload = function() {
		function a() {
			e.after.call(c, c.$elem, c.$item, c.currentIndex)
		}

		function b() {
			function b() {
				"slide" === e.animation && (e.adaptive && h.children().last().html(i.first().html()), h.children().last().attr("style", function() {
					return i.first().attr("style")
				}).hide().data("origin", "")), j.data("origin", ""), a()
			}
			if(f === -1 && (j = h.children().first()), e.adaptive ? j.find("img[data-src]").attr("src", k) : j.css("backgroundImage", "url(" + k + ")"), f) j.data("origin", ""), g.find(".tb-loading").fadeOut(400, function() {
				$(this).remove()
			}), "slide" === e.animation && (f === -1 && (e.adaptive && i.last().html(h.children().first().html()), i.last().attr("style", function() {
				return h.children().first().attr("style")
			}).hide().data("origin", "")), f === c.len - 1 && (e.adaptive && h.children().first().html(i.last().html()), h.children().first().attr("style", function() {
				return i.last().attr("style")
			}).hide().data("origin", ""))), a();
			else {
				var d = new Image;
				d.src = k, d.complete ? b() : d.onload = b
			}
		}
		var c = this,
			e = this.options,
			f = arguments[0] || 0,
			g = this.$elem,
			h = this.$list,
			i = this.$item,
			j = i.eq(f),
			k = j.data("origin");
		if(k)
			if(f) {
				var l;
				l = "rgba(0, 0, 0, 0)" === g.css("backgroundColor") || "transparent" === g.css("backgroundColor") ? "#fff" : g.css("backgroundColor");
				var m = '<div class="tb-loading"><img src="' + d.loadingImage + '"></div>';
				j.append(m), "slide" === e.animation && f === -1 && h.children().first().append(m), $(".tb-loading").css({
					background: l,
					height: g.height()
				}), $(".tb-loading img").css("top", function() {
					return(g.height() - $(this).height()) / 2
				}), "fade" !== e.animation && "flash" !== e.animation || $(".tb-loading").hide().fadeIn();
				var n = new Image;
				f === -1 && (k = i.last().data("origin")), n.src = k, n.complete ? b() : n.onload = b
			} else b()
	}
}),
function(a, b) {
	"function" == typeof define && define.amd ? define(["global", "banner", "init"], function(c, d) {
		return b($, a, document, c, d)
	}) : "undefined" != typeof exports ? module.exports = b($, a, document, require("global"), require("banner"), require("init")) : (a.ytBanner = a.ytBanner || {}, b($, a, document, a.ytBanner.Global, a.ytBanner.Banner))
}(window, function(a, b, c, d, e) {
	e.prototype.play = function() {
		this.activeIndex = this.currentIndex, this.animation[this.options.animation](), this.lazyload(this.currentIndex)
	}, e.prototype.setPlayTimer = function() {
		var a = this,
			b = function() {
				a.isHovered = !0, clearInterval(a.playTimer)
			},
			c = function() {
				a.isHovered = !1, a.isAnimated || a.setPlayTimer()
			};
		clearInterval(a.playTimer), a.playTimer = setInterval(function() {
			a.options.before.call(a, a.$elem, a.$item, a.currentIndex), a.currentIndex++, a.play()
		}, a.options.auto), a.$elem.off("mouseenter"), a.$elem.off("mouseleave"), a.$elem.on({
			mouseenter: b,
			mouseleave: c
		})
	}, e.prototype.activeBtnAndThumb = function() {
		this.activeIndex = this.currentIndex === this.len ? 0 : this.currentIndex === -1 ? this.len - 1 : this.currentIndex, this.$btn && this.$btn.eq(this.activeIndex).addClass("active").siblings().removeClass("active"), this.$thumb && (this.$thumb.eq(this.activeIndex).addClass("active").siblings().removeClass("active"), this.$thumbSlideBtn.is(":visible") && this.animation.thumbListSlide())
	}, e.prototype.switchTo = function() {
		if(!this.isAnimated) {
			if($.isNumeric(arguments[0]) && (arguments[0] < 0 || arguments[0] > this.len)) throw new Error("ytBanner's index overflow!");
			switch(this.options.before.call(this, this.$elem, this.$item, this.currentIndex), arguments[0]) {
				case "prev":
					this.currentIndex--;
					break;
				case "next":
					this.currentIndex++;
					break;
				default:
					this.currentIndex = arguments[0]
			}
			this.play()
		}
	}, $.fn.ytBanner = function(a) {
		if(d.isLTIE8) throw new Error("ytBanner cannot work under IE8!");
		return this.each(function() {
			var b = $(this).data("ytBanner");
			b ? "prev" === a ? b.switchTo.call(b, "prev") : "next" === a ? b.switchTo.call(b, "next") : $.isNumeric(a) && b.switchTo.call(b, a) : (options = $.extend(!0, {}, $.fn.ytBanner.defaults, "object" == typeof a && a), $(this).data("ytBanner", b = new e(this, options)), b.init())
		})
	}, $.fn.ytBanner.defaults = {
		animation: "slide",
		adaptive: !1,
		useHover: !1,
		arrow: !1,
		btn: !0,
		auto: 5e3,
		duration: 800,
		init: $.noop,
		before: $.noop,
		after: $.noop,
		thumb: {}
	}
});