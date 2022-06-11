import $ from 'jquery';

$.fn.wrapLinkImg = function() {

  const main = function() {
    return dom.each(function() {

      const image = $(this);
      const title = image.attr('title');

      if (title && /^\s*#dl(\s+(\S.*))*$/.test(title)) {
        const img_title = RegExp.$2;
        const src = image.attr('src');
        const anchor = $('<a/>').attr('href', src);
        if (img_title !== '') {
          anchor.attr('title', img_title);
        }
        image.removeAttr('title').wrap(anchor);
      }
    });
  };

  const jqueryObj = this;
  let dom;
  if (jqueryObj.is('img')) {
    dom = jqueryObj.filter('[title]');
  }
  else {
    dom = jqueryObj.find('img').filter('[title]');
  }

  main();
  return this;
};
