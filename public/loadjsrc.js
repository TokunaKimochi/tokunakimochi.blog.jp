// https://github.com/muicss/loadjs
'use strict';

loadjs([ 'https://cdn.jsdelivr.net/npm/sanitize.css@10.0.0/sanitize.min.css'
         , './tokunakimochi-blog-jp.min.css'
         , 'https://tokunakimochi.github.io/prism/themes/prism-bootstrap.css'
         , 'https://tokunakimochi.github.io/prism/plugins/line-numbers/prism-bootstrap-line-numbers.css'
         , 'https://tokunakimochi.github.io/prism/plugins/line-highlight/prism-bootstrap-line-highlight.css'
         , 'https://tokunakimochi.github.io/Nivo-Lightbox/nivo-lightbox.min.css' ], 'css');

loadjs('./tokunakimochi-blog-jp.iife.min.js', 'pre');

loadjs([ 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'
         , 'https://ajax.googleapis.com/ajax/libs/hammerjs/2.0.8/hammer.min.js'
         , 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js' ], 'dep');

loadjs.ready(['css', 'pre', 'dep'], {
  success: function() {
    WebFont.load({
      google: {
        families: ['Lily Script One', 'Niconne', 'Vollkorn', 'Roboto Mono']
      }
    });
    loadjs([ '//parts.blog.livedoor.jp/js/design.js'
             , './tokunakimochi-blog-jp.min.js' ]);
  }
});
