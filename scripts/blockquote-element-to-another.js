(function($) {
  $.fn.bq2another = function() {
    'use strict';

    var main = function() {
      return dom.each(function() {

        var jqueryObj = $(this);
        var pEle = jqueryObj.children().first();
        var htm;
        if (pEle.is('p')) {
          htm = pEle.html();
        }
        // blockquote 要素内だけで完結
        else {
          htm = jqueryObj.html();
        }

        // &>
        if (/^\s*(&>|&amp;&gt;)(\|([^|]*)\|)*\s*(\S[^\0]*)$/.test(htm)) {
          var flag = RegExp.$2;
          var title = RegExp.$3;
          var body = RegExp.$4;

          // body が <p> の外にある
          if (/^\|([^|]*)\|\s*$/.test(body)) {
            flag = true;
            title = RegExp.$1;
            pEle.remove();
            body = jqueryObj.html();
          }
          else {
            body = '<p>' + body + '</p>'
          }

          // &>|title| body
          if (title) {
            jqueryObj.replaceWith('<aside class="note"><h4 class="note">' + title + '</h4>' + body + '</aside>');
          }
          // &>|| body
          else if (flag) {
            jqueryObj.replaceWith('<aside class="note">' + body + '</aside>');
          }
          // &> body
          else {
            jqueryObj.replaceWith('<div class="output-message">' + body + '</div>');
          }
        }
      });
    };

    var jqueryObj = $(this);
    var dom = jqueryObj.find('blockquote');
    main();
    return this;
  };
}(jQuery));
