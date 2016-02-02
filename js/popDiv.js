;(function ($){
	$.fn.popDiv = function (options){
		var defaults = {
			id:'#popBox',
			confirmBtn: '',
			cancelBtn: '',
			headTitle:'标题',
			confirmBtnText:'确定',
			cancelBtnText:'取消',
			confirmBtnEvent:function (){alert("Ok")},
			cancelBtnEvent:function (){}
		}
		var ops = $.extend(defaults,options);
		var pop = {
			init : function (){
					$(".popDiv").each(function (){
						var el = this;
						var _idFlag = $(this).find(ops.id);
						var _confirmBtn = $(ops.confirmBtn);
						var _cancelBtn = $(ops.cancelBtn);
						if(_idFlag.length == 0){
							return;
						}else{
								pop.show(_idFlag);
					            pop.hide(_idFlag);
					            pop.headTitlePutText(ops.headTitle);
					       // 判断是否有按钮事件
					        if(_confirmBtn == ''){
					        	return;
					        }else{
					        	ops.confirmBtnEvent();
					        	pop.btnPutText(_confirmBtn,ops.confirmBtnText)
					        }
					        if(_cancelBtn == ''){
					        	return;
					        }else{
					        	pop.btnPutText(_cancelBtn,ops.cancelBtnText)
					        	ops.cancelBtnEvent();
					        }
						}
					})
				},
			hide : function (_idFlag){
				   $(_idFlag).siblings(".popBg").on('click',function (){
				 	$(".popDiv").hide();
				   });
			},
			show : function (_idFlag){
				$(_idFlag).parents(".popDiv").show();
			},
			btnPutText : function (_btn,btnText){
				$(_btn).text(btnText)
			},
			headTitlePutText :function (headTitle){
				$(ops.id).find(".tipHead").text(headTitle)
			}
		}
		pop.init();
	}
})(Zepto)