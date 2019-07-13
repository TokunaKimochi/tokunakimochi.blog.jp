(function($) {
  $.fn.hatenaBlogcardHelper = function() {
    'use strict';

    var main = function() {
      return dom.each(function() {

        var jqueryObj = $(this);
        var txt = jqueryObj.parent().text().trim();
        var permanentLink = jqueryObj.attr('href').trim();
        if (txt === permanentLink) {
          var title = jqueryObj.attr('title') || 'はてなブログカード';
          var re = /(?:https?:)?\/\/(?:www\.)?(?:[^./]+\.)?hatena/;
          var classNames = re.test(permanentLink) ? 'hatena-blogcard hbc-for-hatena' : 'hatena-blogcard hbc-for-international';
          permanentLink = encodeURIComponent( permanentLink );
          jqueryObj.replaceWith('<iframe src="https://hatenablog-parts.com/embed?url=' + permanentLink +
                                '" title="' + title + '" class="' + classNames + '" scrolling="no" frameborder="0"></iframe>');
        }
      });
    };

    var jqueryObj = $(this);
    var dom = jqueryObj.find('p a:only-child');
    main();
    return this;
  };
}(jQuery));
