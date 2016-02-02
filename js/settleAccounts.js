var myScroll;
function loaded () {
	var myScrollArr =[];
	$(".HWrapperBox").each(function (i,e){
		var _Hwrapper = $(this).children("div")[0];
		var _id ="#"+ $(_Hwrapper).attr('id');
		myScrollArr[i] = new IScroll(_id, { scrollX: true, scrollY: false, mouseWheel: true });
	})
	//var myScroll = new IScroll("#wrapper", { scrollX: true, scrollY: false, mouseWheel: true });
	var	myScroll = new IScroll('#wrapper', { mouseWheel: true, tap: true });
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
}
function resizeScrollEle(){
	$(".Hscroller").each(function (){
		var HSli = $(this).find('li');
		//加50防止li宽度不够
	 	$(this).width(HSli.length * $(HSli[0]).width()+150);
	})
}
$(document).ready(function (){
	resizeScrollEle();
 	loaded();

 	$("#submitBtn").on('click',function (){
 		var inCash = $("#inCash").attr("checked");
 		// $("input[name='payment']").each(function (){
 		// 	inCash$(this).attr("id");
 		// })
 		if(inCash){
	 			$.fn.popDiv({
		            id:"#barCodeBox",
		            confirmBtn:"#confirmBtn",
		            cancelBtn:"",
		            headTitle:'感谢您选择空箱子服务<br>请向收银员出示此条码付款',
		            confirmBtnEvent:function (){
		               $("#confirmBtn").on('click',function(){
		                    console.log("再开一箱咯");
		                }) 
		            }
		        });
 			}else{
 				window.location.href = "###";
 			}
 	})
  
    // 苹果手机采用CSS1
    if(/iphone/i.test(navigator.userAgent)){
        $(".contentWrap").addClass("mt1s8");
       // alert("iphone")
    }
    // 安卓手机采用CSS2
    if(/android/i.test(navigator.userAgent)){
    	$(".contentWrap").css("padding-top","0.89rem");
    	// alert("android")
    }
             
 	
})


	



