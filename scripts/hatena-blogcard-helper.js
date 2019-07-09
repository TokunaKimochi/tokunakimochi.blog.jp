(function($) {
  $.fn.hatenaBlogcardHelper = function() {
    'use strict';

    var main = function() {
      return dom.each(function() {

        var jqueryObj = $(this);
        var txt = jqueryObj.parent().text();
        var permanentLink = jqueryObj.attr('href');
        if (txt.trim() === permanentLink.trim()) {
          var title = jqueryObj.attr('title') || 'はてなブログカード';
          permanentLink = encodeURIComponent( permanentLink );
          jqueryObj.replaceWith('<iframe src="https://hatenablog-parts.com/embed?url=' + permanentLink +
                                '" title="' + title + '" class="hatena-blogcard" scrolling="no" frameborder="0"></iframe>');
        }
      });
    };

    var jqueryObj = $(this);
    var dom = jqueryObj.find('p a:only-child');
    main();
    return this;
  };
}(jQuery));
