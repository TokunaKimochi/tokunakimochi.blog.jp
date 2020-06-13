(function($) {
  $.fn.declareCite = function() {
    'use strict';

    var main = function() {
      return dom.each(function() {

        var jqueryObj = $(this);
        var txtArr = [];
        var htm = jqueryObj.html();

        if ((txtArr = htm.match(/^--\s+(\S.*)$/)) !== null) {
          jqueryObj.replaceWith('<footer><cite>' + txtArr[1] + '</cite></footer>');
        }
      });
    };

    var jqueryObj = this;
    var dom = jqueryObj.find('blockquote p:last-child');
    main();
    return this;
  };
}(jQuery));
