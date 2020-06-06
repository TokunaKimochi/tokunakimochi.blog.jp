(function($) {
  $(window).on('load', function() {
    'use strict';

    var hash = window.location.hash;
    go(hash);

    $('a[href^="#"]').click(function(e) {
      e.preventDefault();
      var href = $(this).attr('href');
      go(href);
    });

    function go(str) {
      var id = str.slice(1);
      var elem = document.getElementById(id);
      if (!elem) return;
      elem.scrollIntoView({behavior: "smooth"});
    };
  });}(jQuery));
