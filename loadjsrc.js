// https://github.com/muicss/loadjs
'use strict';

loadjs([ 'https://tokunakimochi.github.io/tokunakimochi.blog.jp/tokunakimochi-blog-jp.min.css'
         , 'https://tokunakimochi.github.io/prism/themes/prism-bootstrap.css'
         , 'https://tokunakimochi.github.io/prism/plugins/line-numbers/prism-bootstrap-line-numbers.css'
         , 'https://tokunakimochi.github.io/prism/plugins/line-highlight/prism-bootstrap-line-highlight.css'
         , 'https://tokunakimochi.github.io/Nivo-Lightbox/nivo-lightbox.min.css' ], 'css');

loadjs('https://tokunakimochi.github.io/tokunakimochi.blog.jp/tokunakimochi-blog-jp.iife.min.js', 'pre');

loadjs([ 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'
         , 'https://ajax.googleapis.com/ajax/libs/hammerjs/2.0.8/hammer.min.js'
         , 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js' ], 'dep');

loadjs.ready(['css', 'pre', 'dep'], {
  success: function() {
    WebFont.load({
      google: {
        families: ['Lobster Two', 'Niconne', 'Vollkorn', 'Roboto Mono']
      }
    });
    loadjs([ '//parts.blog.livedoor.jp/js/design.js'
             , 'https://tokunakimochi.github.io/tokunakimochi.blog.jp/tokunakimochi-blog-jp.min.js' ]);
  }
});
