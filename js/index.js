     
        var myScroll;
        var pullDownEl, pullDownL;  
        var pullUpEl, pullUpL;  
        var Downcount = 0 ,Upcount = 0;  
        var loadingStep = 0;//加载状态0默认，1显示加载状态，2执行加载数据，只有当为0时才能再次加载，这是防止过快拉动刷新
        function pullDownAction() {//下拉事件  
            var el, li, i;  
            el = $('#newLoad');  
            el.html('');
            $.ajax({
                type:"GET",
                url:"newProductsData.json",
                data:{},
                dataType:"text",
                success: function (data){
                    var html='';
                    data = $.parseJSON(data);
                    $.each(data,function (i,e){
                        html +='<li data-value="lancome"><div class="pImgS"><img src="img/img1.png" alt="兰蔻Lancome 小黑瓶精华肌底液"></div><div class="pDetail"><p class="pTitle"><a href="productDetail.html"></a>兰蔻Lancome 小黑瓶精华肌底液add</p><div class="pOperation"><div class="addToShopCart"><span class="J_add">-</span><span class="J_num">0</span><span class="J_subtract">+</span></div><span>小计<span class="J_singleTotalA redFont">€16</span></span><div class="deleteBtn fr"><i class="icon iconfont">&#xe600;</i></div></div></div></li>';
                    })
                    $('#J_productList').prepend(html);
                    li = $("<li></li>");  
                Downcount++;  
                },
                error: function (jqXHR, textStatus, errorThrown){
                    console.log(jqXHR.status)
                }
            })
            setTimeout(function() {  
            
            li.text('新增加了' + Downcount + "条商品信息哦");  
            pullDownEl.removeClass('loading');  
            pullDownL.html('下拉显示更多...');  
            pullDownEl['class'] = pullDownEl.attr('class');  
            pullDownEl.attr('class','').hide();  
            myScroll.refresh();  
            el.show();
            el.prepend(li);
            loadingStep = 0;
            }, 1000); //1秒 
            setTimeout(function (){
                el.hide();
            },2000)   
        }  
        function pullUpAction() {//上拉事件  
         var el, li, i;  
            el = $('#add');  
            el.remove();
            Upcount = 0;
            setTimeout(function() {  
            for (i = 0; i < 3; i++) {  
                li = $("<li></li>");  
                Upcount++;  
            }  
            li.text('new Add ' + Upcount + " ！");  
            el.append(li); 
            pullUpEl.removeClass('loading');  
            pullUpL.html('上拉显示更多...');  
            pullUpEl['class'] = pullUpEl.attr('class');  
            pullUpEl.attr('class','').hide();  
            myScroll.refresh();  
            loadingStep = 0;  
            }, 1000);  
        }  



    function loaded() {  
        pullDownEl = $('#pullDown');  
        pullDownL = pullDownEl.find('.pullDownLabel');  
        pullDownEl['class'] = pullDownEl.attr('class');  
        pullDownEl.attr('class','').hide();  
          
        pullUpEl = $('#pullUp');  
        pullUpL = pullUpEl.find('.pullUpLabel');  
        pullUpEl['class'] = pullUpEl.attr('class');  
        pullUpEl.attr('class','').hide();  
          
        myScroll = new IScroll('#wrapper', {  
            probeType: 2,
            scrollbars: false,
            mouseWheel: true,
            fadeScrollbars: false,
            bounce:true,//边界反弹  
            interactiveScrollbars:true,
            shrinkScrollbars:'scale', 
            click: true ,
            keyBindings:true,
          //  disableMouse: true,
            momentum:true
        });  
        //滚动时 
//滚动超过200。返回顶部
        heightLi = $("#wrapper").find('li').height();
        myScroll.on('scrollEnd', function(){ 
            var Y = Math.abs(myScroll.absStartY);
            console.log(Y+">>>>>>>>>"+heightLi * 3)
            if(Y > heightLi){
                $("#topBar").css("display","block");
            } else{
                $("#topBar").css("display","none");
                }
            })
//去掉及时刷新 start 
        myScroll.on('scroll', function(){  
            if(loadingStep == 0 && !pullDownEl.attr('class').match('flip|loading') && !pullUpEl.attr('class').match('flip|loading')){  
            if (this.y > 5) {  
                //下拉刷新效果  
                pullDownEl.attr('class',pullUpEl['class'])  
                pullDownEl.show();  
                myScroll.refresh();  
                pullDownEl.addClass('flip');  
                pullDownL.html('准备刷新...');  
                loadingStep = 1;  
            }else if (this.y < (this.maxScrollY - 5)) {  
                //上拉刷新效果  
                pullUpEl.attr('class',pullUpEl['class'])  
                pullUpEl.show();  
                myScroll.refresh();  
                pullUpEl.addClass('flip');  
                pullUpL.html('准备刷新...');  
                loadingStep = 1;  
            }  
            }  
        });  
        //滚动完毕  
        myScroll.on('scrollEnd',function(){  
            if(loadingStep == 1){  
            if (pullUpEl.attr('class').match('flip|loading')) {  
                    pullUpEl.removeClass('flip').addClass('loading');  
                pullUpL.html('Loading...');  
                loadingStep = 2;  
                   pullUpAction();  
            }else if(pullDownEl.attr('class').match('flip|loading')){  
                pullDownEl.removeClass('flip').addClass('loading');  
                pullDownL.html('Loading...');  
                loadingStep = 2;  
               pullDownAction();  
            }  
            }  
        });
//去掉及时刷新 end




//去结算弹出导购选择  start
        $("#goCheck").live("click",function (){
            $(this).addClass("selected");
            $.fn.popDiv("#popBox");
        });
        $(".selectSalesComponent").find("li").on("click",function (){
            $(this).siblings("li").find("input[name='salesName']").removeAttr('checked');
            $(this).find("input[name='salesName']").attr('checked',true);
            $(".popDiv").hide();
            //此处提交表单，跳转页面至结算
            window.location.href = "../settleAccounts.html";
        })
      }  
//去结算弹出导购选择  end
      document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
$(function (){
    $(".pTitle").live("click",function (e){
        e.preventDefault(); 
        e.stopPropagation();
        var target=e.target;
        _href=$(target).find('a').attr('href');
        if(_href != null){
            window.location.href = _href;
        }
    })
})
