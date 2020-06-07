jQuery(window).on('pageshow', function() {
  'use strict';

  var hash = window.location.hash;
  setTimeout(jump, 0, hash);

  jQuery('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    var href = jQuery(this).attr('href');
    setTimeout(jump, 0, href);
  });

  function jump(sharpStr) {
    var str = sharpStr.slice(1);
    // getElementById に空文字列を渡すと警告が出る
    if (!str) return;
    var dom = document.getElementById(str);
    // 存在確認 IE 非対応
    if (!dom.isConnected) return;
    var rect = dom.getBoundingClientRect();
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var top = rect.top + scrollTop;
    jQuery('html, body').animate({ scrollTop: top }, 500, 'swing');
  }
});
