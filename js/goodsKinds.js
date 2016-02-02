   //滚动条
 
function loaded () {
    var myScroll;
	    myScroll = new IScroll('#wrapper', {  
            probeType: 2,
            scrollbars: false, 
            mouseWheel: true, 
            fadeScrollbars: false,
            bounce:true, 
            interactiveScrollbars:true, 
            shrinkScrollbars:'scale',
            click: true ,
            keyBindings:true, 
            momentum:true
        });  
	document.addEventListener('DOMContentLoaded',loaded, false);
}
$(function (){
	loaded();
	$("#goodsKindLabel div").on("click",function (e){
		var target=e.target;
		var parentNode;
		if( $(target).hasClass("J_lbox")){
			parentNode =  $(target);
		}else{
			parentNode = $(target).parents(".J_lbox");
		}
		var _id =  $(parentNode).attr("id");
		$("#kindBox").show();
		$("#"+_id+"Term").show();
		$("#"+_id+"Term").siblings("div").hide();
		$(parentNode).addClass("selected");
		$(parentNode).siblings("div").removeClass("selected");

		if($(parentNode).hasClass("selected")){
			$(parentNode).find(".downArr").addClass("hide");
			$(parentNode).find(".upArr").removeClass("hide");
		}
		if(!$(parentNode).siblings("div").hasClass("selected")){
			$(parentNode).siblings("div").find(".downArr").removeClass("hide");
			$(parentNode).siblings("div").find(".upArr").addClass("hide");
		}

	})
	$("#kindBox").on("click",function (){
		$("#kindBox").hide();
		$("#tabLabel > div").hide();
		$("#goodsKindLabel > div").removeClass("selected");
		$("#goodsKindLabel > div").find(".downArr").removeClass("hide");
		$("#goodsKindLabel > div").find(".upArr").addClass("hide");
	})
})