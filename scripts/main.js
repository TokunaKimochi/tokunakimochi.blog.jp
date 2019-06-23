import jQuery from 'jquery';
import Hammer from 'hammerjs';
import markdownIt from 'markdown-it';

const md = new markdownIt('default', {
  html: true,
  highlight: function (str, lang) {
    if (lang) {
      try {
        return '<pre class="language-' +
          lang +
          ' line-numbers"><code class="language-' +
          lang +
          '">' +
          md.utils.escapeHtml(str) +
          '</code></pre>';
      }
      catch (__) { return null; }
    }
    else {
      return '<pre><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
  }
});

jQuery(function($){
  $('textarea.markdown').replaceWith( function() {
    return $('<div/>').html(md.render(this.value));
  });
});

import Prism from 'prismjs';

import 'jquery-hammerjs';
import 'nivo-lightbox';

import './a-element-to-footnote.js';
import './prism-helper.js';
import './declare-cite.js';
import './em-element-to-another.js';
import './blockquote-element-to-another.js';
import './nivo-lightbox-helper.js';
import './wrap-a-link-around-img.js';

jQuery(function($){
  const selector = ( $('#more').length === 0 ) ? null : '#more > div';
  const divMd = $('div.article-body-inner > div');
  divMd.wrapLinkImg();
  divMd.prismHelper().bq2another().declareCite().em2another();
  const anchor = divMd.find('a');
  anchor.aEle2fn(selector).nivolboxHelper('livedoorBlog');
});
