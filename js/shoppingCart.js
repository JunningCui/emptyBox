    String.prototype.getNum = function(){
      return parseInt(this.replace(/[^0-9]/ig,"")); 
  }
  Number.prototype.toPercent = function(){
    var strData = parseFloat(this)*100;
    var ret = strData.toString()+"%";
    return ret;
}
  $(function (){  
    //欧元转换人民币
    var RexchangeE = function (R){
        var RMB = R,
        rate = $("input[name='exchangeRate']").val();
        return RMB/rate;
    }
    var EexchangeR = function (E){
        var Euro = E,
        rate = $("input[name='exchangeRate']").val();
        return Euro * rate;
    }
    //计算国内总价
    var  countAllmoneyInside = function (){
          var allMoney = 0;
          $("input[name='singlePriceInside'").each(function (){
            allMoney += this.val() * $(this).siblings("input[name='singlePurQuan']");
          });
    }
    //计算所有价钱
    var countAllmoney = function(){
      var countSingleA = $(".countSingleA"),
          countAllMoney = 0 ;
      for (var i = 0; i <= countSingleA.length - 1; i++) {
        countAllMoney +=parseInt($(countSingleA[i]).text().getNum());
      };
        $("#J_AllAcount").text("€"+countAllMoney);
        $("input[name='AllAcount']").val(countAllMoney);
    }
    var goCheck  = function (){
        //去结算改变
        var $goCheck = $("#allProQuan"),
          num = 0;
        $(".J_num").each(function(){
            num += parseInt($(this).text());
        });
        $goCheck.text("("+num+")");
    }

    var saveForInside = function (){
      var allPriceInside = 0;
      var allPrice = EexchangeR($("input[name='AllAcount']").val());
        $("input[name='singlePriceInside']").each(function(){
          allPriceInside += $(this).val() * $(this).siblings("input[name='singlePurQuan']").val();
        });
      var saveCompare = allPriceInside - allPrice;
      $(".saveCompare").find('span').text("￥"+saveCompare)
    }
    var kgCount = function (){
       var allKg = 0;
      $("input[name='singleKg']").each(function (){
        allKg += $(this).val() * $(this).siblings("input[name='singlePurQuan']").val();
      });
      return allKg;
    }
    var kgCountFlag = function (allKg){
      if(allKg <= 3){
        $J_degreeBox = $("#J_degreeBox");
        return true;
      }else{
          $.fn.popDiv({
            id:"#overWeightBox",
            confirmBtn:"#confirmBtn",
            cancelBtn:"#cancelBtn",
            headTitle:'箱子已超重',
            confirmBtnText:'再开一箱',
            cancelBtnText:'取消',
            confirmBtnEvent:function (callback){
               $("#confirmBtn").on('click',function(){
                    console.log("再开一箱咯");
                }) 
            },
            cancelBtnEvent:function (callback){
               $("#cancelBtn").on('click',function(){
                     return false;
                }) 
            }
        });
       
      }
    }
    var kgChangeShow = function (){
      //已确认更改kg
        var allKg = kgCount(),
        $J_degreeBox = $("#J_degreeBox"),
        $J_kgProgress = $(".J_kgProgress");

        if(allKg > 0 && allKg <= 1){
          $seclectLi = $J_degreeBox.find('.J_kg1');
          $seclectLi.addClass("seclected").siblings("li").removeClass("seclected").find('.J_kgProgress').css('width','0');;
          $seclectLi.find('.J_kgProgress').css('width',(allKg/1).toPercent());
          $seclectLi.siblings('li').find('.J_kgProgress').css('width','0%');
        }else if(allKg > 1 && allKg <= 2){
          $seclectLi = $J_degreeBox.find('.J_kg2');
          $seclectLi.addClass("seclected").next("li").removeClass("seclected").find('.J_kgProgress').css('width','0');
          $seclectLi.find('.J_kgProgress').css('width',((allKg-1)/1).toPercent());
          $seclectLi.prev('li').find('.J_kgProgress').css('width','100%');
        }else if(allKg > 2 && allKg <= 3){
          $seclectLi = $J_degreeBox.find('.J_kg3');
          $seclectLi.addClass("seclected").siblings('li').addClass("seclected");
          $seclectLi.find('.J_kgProgress').css('width',((allKg-2)/1).toPercent());
          $seclectLi.siblings('li').find('.J_kgProgress').css('width','100%');
        }else{
          $J_degreeBox.find('li').removeClass('seclected').find('.J_kgProgress').css('width','0%');
        }
    }
    var subtractQuan = function (num){
      //减少
      if(num <= 1){
        return 0;i
      }
      return --num;
    }
    var addQuan  = function  (num,singlePurQuan) {
      //预判断是否能再添加商品
      $singlePurQuan.val(_num+1);
      var allKg = kgCount();
      if(kgCountFlag(allKg)){
        return ++num;
      }else{
        return num;
      }
      //增加
    }
    var removeProduct = function(li){
      //移除整个产品
      $(li).parents("li").remove();
      countAllmoney();
    } 
    
//////////////////////////////////////////
    goCheck();
    countAllmoney();
    saveForInside();
    kgChangeShow();
    $(".pOperation").live("click tap",function (e){
        e = e || window.target;
        var target = e.target || e.srcElement,
        nodeName = e.srcElement.nodeName ,
        parentNodeName = e.srcElement.parentElement.nodeName;
        //判断是否为操作按钮
        if(nodeName != 'I' ||  parentNodeName!= "SPAN"){
          return;
        }
        //判断是数量加减或删除
        var $this = $(this),
            parentSpan = $(target).parent("span")
          _class = $(parentSpan).attr("class"),
          $singlePurQuan = $this.find("input[name='singlePurQuan']"),
          _num = parseInt($singlePurQuan.val()),
          $singlePurQuanShow = $this.find(".J_num"),
          $J_singleTotalA = $this.find(".J_singleTotalA"),
          $countSingleA = $J_singleTotalA.find(".countSingleA");
        var singleAcount = $this.find("input[name='singlePrice']").val().getNum();
        switch (_class){
          case "J_subtract": _num = subtractQuan(_num);break;
          case "J_add":_num = addQuan(_num,$singlePurQuan);break;
          case "J_deleteBtn":removeProduct($this);kgChangeShow();return;
          case "singlePurQuan": return;
          default: return;
        }
        $singlePurQuan.val(_num);
        $singlePurQuanShow.text(_num)
        $countSingleA.text("€" + singleAcount * _num);
        countAllmoney();
        saveForInside();
        goCheck();
        kgChangeShow();
    });
  })