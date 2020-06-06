jQuery(window).on('load', function() {
  'use strict';

  var hash = window.location.hash;
  go(hash);

  jQuery('a[href^="#"]').click(function(e) {
    e.preventDefault();
    var href = jQuery(this).attr('href');
    go(href);
  });

  function go(str) {
    // `#' をカット
    var id = str.slice(1);
    // getElementById に空文字列を渡すと警告が出る
    if (!id) return;
    var elem = document.getElementById(id);
    if (!elem) return;
    elem.scrollIntoView({behavior: "smooth"});
  }
});
