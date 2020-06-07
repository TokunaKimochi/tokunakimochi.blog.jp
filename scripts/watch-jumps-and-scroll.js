jQuery(window).on('pageshow', function() {
  'use strict';

  var hash = window.location.hash;
  setTimeout(jump, 0, hash);

  jQuery('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    var href = jQuery(this).attr('href');
    jump(href);
  });

  function jump(str) {
    // `#' をカット
    var id = str.slice(1);
    // getElementById に空文字列を渡すと警告が出る
    if (!id) return;
    var elem = document.getElementById(id);
    if (!elem) return;
    elem.scrollIntoView({behavior: "smooth"});
  }
});
