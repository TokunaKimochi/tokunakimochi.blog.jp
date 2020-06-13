(function($) {
  $.fn.wrapLinkImg = function() {
    'use strict';

    var main = function() {
      return dom.each(function() {

        var image = $(this);
        var title = image.attr('title');

        if (title && /^\s*#dl(\s+(\S.*))*$/.test(title)) {
          var img_title = RegExp.$2;
          var src = image.attr('src');
          var anchor = $('<a/>').attr('href', src);
          if (img_title !== '') {
            anchor.attr('title', img_title);
          }
          image.removeAttr('title').wrap(anchor);
        }
      });
    };

    var jqueryObj = this;
    var dom;
    if (jqueryObj.is('img')) {
      dom = jqueryObj.filter('[title]');
    }
    else {
      dom = jqueryObj.find('img').filter('[title]');
    }

    main();
    return this;
  };
}(jQuery));
