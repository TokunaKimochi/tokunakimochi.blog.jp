(function($) {
  $.fn.em2another = function() {
    'use strict';

    var main = function() {
      return dom.each(function() {

        var jqueryObj = $(this);
        var txtArr = [];
        var htm = jqueryObj.html();

        if ((txtArr = htm.match(/^\|([^|]+)\|$/)) !== null) {
          jqueryObj.replaceWith('<span class="menu">' + txtArr[1] + '</span>');
        }
        else if ((txtArr = htm.match(/^@([^@]+)@$/)) !== null) {
          jqueryObj.replaceWith('<span class="dialog">' + txtArr[1] + '</span>');
        }
        else if ((txtArr = htm.match(/^\{([^{}]+)\}$/)) !== null) {
          jqueryObj.replaceWith('<span class="key-word">' + txtArr[1] + '</span>');
        }
        else if ((txtArr = htm.match(/^\[([^\[\]]+)\]$/)) !== null) {
          jqueryObj.replaceWith('<kbd class="from-em">' + txtArr[1] + '</kbd>');
        }
      });
    };

    var jqueryObj = this;
    var dom = jqueryObj.find('em');
    main();
    return this;
  };
}(jQuery));
