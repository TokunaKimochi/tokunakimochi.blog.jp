import jQuery from 'jquery';
import Hammer from 'hammerjs';
import WebFont from 'webfontloader';
import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faLink } from '@fortawesome/free-solid-svg-icons';

library.add(faLink);
dom.watch();

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

const mySlugify = (s, env) => {
  let id = encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-'));
  if (typeof env.mdTxtId === 'string') {
    id = `${env.mdTxtId}-${id}`;
  }
  return id;
};

md.use(markdownItAnchor, {
  slugify: mySlugify,
  permalink: true,
  permalinkClass: 'md-header-anchor',
  permalinkSymbol: '<i class="fas fa-link"></i>',
  permalinkBefore: true
});

jQuery(function($){
  $('textarea.markdown').replaceWith( function() {
    const env = {};
    env.mdTxtId = $(this).attr('id');
    return $('<div/>').html(md.render(this.value, env));
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
import './hatena-blogcard-helper.js';

jQuery(function($){
  const selector = ( $('#more').length === 0 ) ? null : '#more > div';
  const divMd = $('div.article-body-inner > div');
  divMd.wrapLinkImg();
  divMd.prismHelper().bq2another().declareCite().em2another().hatenaBlogcardHelper();
  const anchor = divMd.find('a');
  anchor.aEle2fn(selector).nivolboxHelper('livedoorBlog');
});

WebFont.load({
  google: {
    families: ['Lily Script One', 'Niconne', 'Vollkorn', 'Roboto Mono']
  }
});
