import $ from 'jquery';

$.fn.hatenaBlogcardHelper = function() {

  const main = function() {
    return dom.each(function() {

      const jqueryObj = $(this);
      const txt = jqueryObj.parent().text().trim();
      const permanentLinkEnc = jqueryObj.attr('href').trim();
      const permanentLinkDec = decodeURIComponent( permanentLinkEnc );
      if (txt === permanentLinkDec) {
        const title = jqueryObj.attr('title') || 'はてなブログカード';
        const re = /(?:https?:)?\/\/(?:www\.)?(?:[^./]+\.)?hatena/;
        const classNames = re.test(permanentLinkDec) ? 'hatena-blogcard hbc-for-hatena' : 'hatena-blogcard hbc-for-international';
        jqueryObj.replaceWith('<iframe src="https://hatenablog-parts.com/embed?url=' + permanentLinkEnc +
                              '" title="' + title + '" class="' + classNames + '" scrolling="no" frameborder="0"></iframe>');
      }
    });
  };

  const jqueryObj = this;
  const dom = jqueryObj.find('p a:only-child');
  main();
  return this;
};
