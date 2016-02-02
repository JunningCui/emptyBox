;(function (doc, win) {
    var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function () {
        var clientWidth = docEl.clientWidth;
        var clientHeight = docEl.clientHeight;
        if (!clientWidth) return;
        if (clientHeight < 350) {
            clientHeight = 480;
        };
        if (clientWidth < clientHeight) {
            docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
        }else{
            
            docEl.style.fontSize = 50 * (clientWidth / 1136) + 'px';
        }
      };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);



     // var _self = this;
     // _self.width = 640;//设置默认最大宽度
     // _self.fontSize = 100;//默认字体大小
     // _self.widthProportion = function(){
     //    var p = (document.body&&document.body.clientWidthdocument.getElementsByTagName("html")[0].offsetWidth)/_self.width;return p>1?1:p<0.5?0.5:p;};
     // _self.changePage = function(){
     //    document.getElementsByTagName("html")[0].setAttribute("style","font-size:"+_self.widthProportion()*_self.fontSize+"px !important");
     // }
     // _self.changePage();
     // window.addEventListener("resize",function(){
     //      _self.changePage();
     //    },false);


 // function setFontSize() {
 //        // 获取window 宽度
 //        // zepto实现 $(window).width()就是这么干的
 //        var winWidth =  window.innerWidth,
 //            winHeight =  window.innerHeight;
 //        if(winWidth < winHeight){
 //            doc.documentElement.style.fontSize = (winWidth / 640) * 100 + 'px' ;
 //             console.log("winWidth")
 //        }else{
 //            doc.documentElement.style.fontSize = (winWidth / 1136) * 100 + 'px' ;
 //            console.log("winHeight")
 //        }
 //    }
 //    var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';
 //    var timer = null;
 //    win.addEventListener(evt, function () {
 //        clearTimeout(timer);
 //        timer = setTimeout(setFontSize, 300);
 //    }, false);
 //    win.addEventListener("pageshow", function(e) {
 //        if (e.persisted) {
 //            clearTimeout(timer);
 
 //            timer = setTimeout(setFontSize, 300);
 //        }
 //    }, false);
 //    // 初始化
 //    setFontSize();
})(document, window);
    