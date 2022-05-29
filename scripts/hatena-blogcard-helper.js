(function($) {
  $.fn.hatenaBlogcardHelper = function() {
    'use strict';

    var main = function() {
      return dom.each(function() {

        var jqueryObj = $(this);
        var txt = jqueryObj.parent().text().trim();
        var permanentLinkEnc = jqueryObj.attr('href').trim();
        var permanentLinkDec = decodeURIComponent( permanentLinkEnc );
        if (txt === permanentLinkDec) {
          var title = jqueryObj.attr('title') || 'はてなブログカード';
          var re = /(?:https?:)?\/\/(?:www\.)?(?:[^./]+\.)?hatena/;
          var classNames = re.test(permanentLinkDec) ? 'hatena-blogcard hbc-for-hatena' : 'hatena-blogcard hbc-for-international';
          jqueryObj.replaceWith('<iframe src="https://hatenablog-parts.com/embed?url=' + permanentLinkEnc +
                                '" title="' + title + '" class="' + classNames + '" scrolling="no" frameborder="0"></iframe>');
        }
      });
    };

    var jqueryObj = this;
    var dom = jqueryObj.find('p a:only-child');
    main();
    return this;
  };
}(jQuery));
