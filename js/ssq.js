	


var  loadArea= function(pid,provinceId,cityId,areaId,areaName){
	
	
	var  data_arr = new Array();
	
	data_arr.push("productId="+pid);
	data_arr.push("provinceId="+provinceId);
	data_arr.push("cityId="+cityId);
	data_arr.push("districtId="+areaId);
	data_arr.push("areaName="+areaName);
	
	$.ajax({
		type : "post", 
		data:data_arr.join("&")+'&math='+Math.random(),
		url : $("#path").val()+"/item/stock",
		dataType:"json",
		success : function(msg) {
			if(msg === '0'){
				
	                alert("库存服务异常！")
	               
			}
			/*{"istate":1,"productId":2003519749245145,
			 * "skuStockDtos":[
			 * {"futuresQty":0,"skuId":142917427878486852,"spotQty":0},
			 * {"futuresQty":0,"skuId":142917427878414462,"spotQty":0},
			 * {"futuresQty":0,"skuId":142917427878497652,"spotQty":0},
			 * {"futuresQty":0,"skuId":142917427878400196,"spotQty":0}],"supply":0}*/
			if(msg.skuStockDtos!=''){
				$.each(eval(msg.skuStockDtos),function(i,n){
					//skuid 太长 溢出了
					var skuid = n.skuIdV;
					var futuresQty = n.futuresQty;
					var spotQty =n.spotQty;
					$('li[skuqty]').each(function(j,m){
						if ( $(this).attr('skuid') != undefined ){
							if (skuid === $(this).attr('skuid')){
								/*var apec_type=$(this).closest('.p-amount').attr('spec_type');
								if (apec_type ==='0'){
									$(this).find('.stock').text(spotQty);
								};
								if (apec_type === '1'){
									$(this).find('.stock').text(futuresQty);
								};*/
								//重置库存
								$(this).attr('skuqty',spotQty);
								if(0==spotQty){
									$("#wuh").show();
									$("#xianh").hide();
								}else{
									$("#wuh").hide();
									$("#xianh").show();
								}
							}
						}
					});

				});
			}
			
			//重新选择第一个sku
			//$("li[showattrvalid_sku]").first().click();
			
			 //首先获取第一个展示属性，并添加样式first,last
			 var theFirstShowAttrElement = $("li[showAttrValId]").filter(".select").attr("showAttrValId");
			 $("li[showAttrValId_sku='"+theFirstShowAttrElement+"']").show().first().click();			
		},
		error:function(){
			//alert("服务异常!");
			$.dialog({
                content : "调用库存服务异常！",
                title:'',
                time: 1000,
                lock : true
			});
		}
	});
	
}

//配送地址
    $("#btn-select-region").on("click", function() {
        $("body").append('<div id="mask" class="mask"></div>');
		$("html").addClass("lockscreen"),
        $("body").addClass("lockscreen"),
        $("#J_filterWrap").addClass("show");
    })
	
    $("#mask,.closeBtn").live("click", function() {
        $("#mask").remove(),
        $("html").removeClass("lockscreen"),
        $("body").removeClass("lockscreen"),
        $("#J_filterWrap").removeClass("show")
    })
	
	//选中属性，添加样式
    $(".J_filterContents").each(function(a, e) {
        var t = $(e).find("li");
        t.click(function(a) {
            $(this).hasClass("active") ? $(this).removeClass("active") : $(this).addClass("active").siblings("li").removeClass("active")
        })
    })

    $(".data_city").bind("click", function(){
			/*var _this = $(this),
				_this_val = $.trim(_this.attr("data-info")),
				_this_val_new = "",
				closest_city = _this.closest("#select_city_area");
			//查市区
			$.sendAjax("/area/"+_this_val_new+".html","get",function(data){
				$("#show_city").html("");	//清空
				var data = $.parseJSON(data),
					html = "";
				$.each(data,function(key,entry){
					html += '<li><a href="javascript:void(0);" data-info="'+entry.code+'" class="data_area" >'+entry.name+'</a></li>';

				});
				$("#show_city").append(html);
			});*/
			$("#stock_province_item").hide();
			$("#stock_city_item").show();

	 });	// 选择城市

   //选择地区
	$(".filter-bd").on("click",".data_area",function(){
				$("#stock_city_item").hide();
				$("#stock_area_item").show();
	});
    $(".filter-bd").on("click",".select_area_js",function(){
		
		var stock= $("#stock_province_item li.active").text();
		var city= $("#stock_city_item li.active").text();
		var area= $("#stock_area_item li.active").text();
		var velcity=stock + " " + city + " " + area;
		$(".address span").text("");
		$(".address span").append(velcity);

	}); //选择地区
    
  //初始化，显示客户默认收货地址
	var areaIdKey = $("#areaIdKey").val();
	if( "" != areaIdKey ){
		var array_area = areaIdKey.split(',');
		$('.provi_city_area_id').attr('provinceId',array_area[0]);
		$('.provi_city_area_id').attr('cityId',array_area[1]);
		$('.provi_city_area_id').attr('areaId',array_area[2]);
		$('.provi_city_area_id').html(array_area[3]);
		
		//更新库存信息
		var pid = $("#PID").val();
		var provinceId = array_area[0];
		var cityId = array_area[1];
		var areaId = array_area[2];
		var totalAddress = array_area[3];
		loadArea(pid,provinceId,cityId,areaId,totalAddress);
	}else{
		$("#btn-select-region").click();
	}
	
//-------------------定义函数---------------------------
//回退，关闭选择省市区页面
$("#mask,.closeBtn").live("click", function() {
	closePage();
})



//去除锁屏，以及关闭省市区选择页面
function closePage(){
	$("#mask").remove(),
    $("html").removeClass("lockscreen"),
    $("body").removeClass("lockscreen"),
    $("#J_filterWrap").removeClass("show")
}

//配送地址
$("#btn-select-region").on("click", function() {
    $("body").append('<div id="mask" class="mask"></div>');
	$("html").addClass("lockscreen"),
    $("body").addClass("lockscreen"),
    
    $("#J_filterWrap").addClass("show");
	
	
	//隐藏省份,市区 ,显示country
	$("#stock_province_item").show();
	$("#stock_city_item").hide();
	$("#stock_area_item").hide();
	//异步加载省份信息,判断页面是否已加载过
	if($("#stock_province_item li").size()<=0){
		getProvice();
	}
	
})


//选择省市区，添加样式,去除同辈元素
$(".filter-bd li").live("click", function() {
	$(this).addClass("active").siblings("li").removeClass("active");
	//获取，当前li标签的flag的值
	var content = $.trim($(this).children().attr("flag"));
	//如果选择的省份信息
	if("provice"==content){
		var provice_id = $.trim($(this).children().attr("provice_id"));
		//获取市区信息
		getCity(provice_id);
		
	}else if("city"==content){
		var city_id = $.trim($(this).children().attr("city_id"));
		//获取市区信息
		getCountry(city_id);
		
	}else if("area"==content){
		//关闭
//		closePage();
		//获取已选择的省市区
		var provice_ele = $("#stock_province_item li").filter(".active").children();
		var city_ele = $("#stock_city_item li").filter(".active").children();
		var country_ele = $("#stock_area_item li").filter(".active").children();
		//重置配送地址
		var totalAddress = provice_ele.html()+" "+city_ele.html()+" "+country_ele.html();
		//重置页面显示
		$(".provi_city_area_id").attr('provinceId',provice_ele.attr("provice_id"))
								.attr('cityId',city_ele.attr("city_id"))
								.attr('areaId',country_ele.attr("area_id"))
								.html(totalAddress);
		//更新库存信息
		var pid = $("#PID").val();
		var provinceId = provice_ele.attr("provice_id");
		var cityId = city_ele.attr("city_id");
		var areaId = country_ele.attr("area_id");
		loadArea(pid,provinceId,cityId,areaId,totalAddress);
		 $("#J_filterWrap").removeClass("show");
		 $("#mask").remove();
		 $("#mask").remove();
	}
});
//初始省份信息
function getProvice(){
	$("#stock_province_item ul").html("");
	
	$.ajax({
		type : "get",
		url :"./js/province.json",
		dataType : "json",
		   success: function(res){
			   if(res==null ||res =="") {return false;}
			   //var pros=eval('(' + res + ')');
			//   $("#cityId").append('<option value=""  >'+请选择+'</option> ');
			   for (var i = 0; i < res.length; i++) {
				   $("#stock_province_item ul").append('<li><a href="javascript:void(0);" provice_id="'+res[i].provinceid+'" flag = "provice"  class="data_provice">'+res[i].provincename+'</a></li>');
			   }
			   /*if(cityId!=null){
				   $("#cityId").val(cityId);
			   }
			   */
		   },
			error:function(){
				alert("网络连接超时，请您稍后重试");
		   }
		}); 
}



//初始化市区信息
function getCity(provice_id){
	//隐藏省份,显示市区
	$("#stock_province_item").hide();
	$("#stock_city_item").show();
	//清除页面缓存旧信息
	$("#stock_city_item ul").html("");
	var  condition = "provinceId="+provice_id;
	$.ajax({
		type : "post",
		url :$("#path").val()+"/address/getCity",
		data : condition,
		dataType : "json",
		   success: function(res){
			   if(res==null ||res =="") {return false;}
			   for (var i = 0; i < res.length; i++) {
				   $("#stock_city_item ul").append('<li><a href="javascript:void(0);" city_id="'+res[i].cityid+'" flag = "city" class="data_area">'+res[i].cityname+'</a></li>');
			   }
			   /*if(cityId!=null){
				   $("#cityId").val(cityId);
			   }*/
			   
		   },
			error:function(){
				alert("网络连接超时，请您稍后重试");
		   }
		}); 
	
	
	
}


//加载区域信息
function getCountry(city_id){
	//隐藏省份,市区 ,显示country
	$("#stock_province_item").hide();
	$("#stock_city_item").hide();
	$("#stock_area_item").show();
	//清除页面缓存旧信息
	$("#stock_area_item ul").html("");
	var  condition = "cityId="+city_id;
	
	$.ajax({
		type : "post",
		url :$("#path").val()+"/address/getArea",
		data : condition,
		dataType : "json",
		success: function(res){
		   if(res==null ||res =="") {return false;}
		//   $("#cityId").append('<option value=""  >'+请选择+'</option> ');
		   for (var i = 0; i < res.length; i++) {
			   $("#stock_area_item ul").append('<li><a href="javascript:void(0);" area_id="'+res[i].countyid+'" flag = "area" class="select_area_js">'+res[i].countyname+'</a></li>');
		   }
		   /*if(cityId!=null){
			   $("#cityId").val(cityId);
		   }*/
		   
		},
			error:function(){
				alert("网络连接超时，请您稍后重试");
		   }
		}); 
	
}
