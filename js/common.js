;(function (doc, win) {
    var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function () {
        var clientWidth = docEl.clientWidth;
        var clientHeight = docEl.clientHeight;
        if (!clientWidth) return;
        if (clientWidth < clientHeight) {
            docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
        }else{
          docEl.style.fontSize = 50 * (clientWidth / 1136) + 'px';
        }
      };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);   
})(document, window);

    