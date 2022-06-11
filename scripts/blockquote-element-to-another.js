import $ from 'jquery';

$.fn.bq2another = function() {

  const main = function() {

    const titleIdObj = {};
    const hasOwnP = Object.prototype.hasOwnProperty;
    const slugify = function(s) {
      let i = 2;
      const titleId = encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-'));
      let uni = titleId;
      while (hasOwnP.call(titleIdObj, uni)) uni = titleId + '-' + i++;
      titleIdObj[uni] = true;
      return uni;
    };

    return dom.each(function() {

      const jqueryObj = $(this);
      const pEle = jqueryObj.children().first();
      let htm;
      if (pEle.is('p')) {
        htm = pEle.html();
      }
      // blockquote 要素内だけで完結
      else {
        htm = jqueryObj.html();
      }

      // &>
      if (/^\s*(&>|&amp;&gt;)(\|([^|]*)\|)*\s*(\S[^\0]*)$/.test(htm)) {
        let flag = RegExp.$2;
        let title = RegExp.$3;
        let body = RegExp.$4;

        // body が <p> の外にある
        if (/^\|([^|]*)\|\s*$/.test(body)) {
          flag = true;
          title = RegExp.$1;
          pEle.remove();
          body = jqueryObj.html();
        }
        else {
          body = '<p>' + body + '</p>';
        }

        // &>|title| body
        if (title) {
          const tiId = '_note-' + slugify(title);
          const plink = '<a class="md-header-anchor" href="#' + tiId + '"><i class="fa-solid fa-link"></i></a>';
          jqueryObj.replaceWith('<aside class="note"><h4 id="' + tiId + '" class="note">' + plink + title + '</h4>' + body + '</aside>');
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

  const jqueryObj = this;
  const dom = jqueryObj.find('blockquote');
  main();
  return this;
};
