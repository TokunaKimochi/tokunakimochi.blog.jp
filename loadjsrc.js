// https://github.com/muicss/loadjs
'use strict';

loadjs([ '//tokunakimochi.github.io/tokunakimochi.blog.jp/tokunakimochi-blog-jp.min.css'
         , '//tokunakimochi.github.io/prism/themes/prism-bootstrap.css'
         , '//tokunakimochi.github.io/prism/plugins/line-numbers/prism-bootstrap-line-numbers.css'
         , '//tokunakimochi.github.io/prism/plugins/line-highlight/prism-bootstrap-line-highlight.css'
         , '//tokunakimochi.github.io/Nivo-Lightbox/nivo-lightbox.min.css' ], 'css');

loadjs('//tokunakimochi.github.io/tokunakimochi.blog.jp/tokunakimochi-blog-jp.iife.min.js', 'pre');

loadjs([ '//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'
         , '//ajax.googleapis.com/ajax/libs/hammerjs/2.0.8/hammer.min.js'
         , '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js' ], 'dep');

loadjs.ready(['css', 'pre', 'dep'], {
  success: function() {
    WebFont.load({
      google: {
        families: ['Lobster Two', 'Niconne', 'Vollkorn', 'Roboto Mono']
      }
    });
    loadjs([ '//parts.blog.livedoor.jp/js/design.js'
             , '//tokunakimochi.github.io/tokunakimochi.blog.jp/tokunakimochi-blog-jp.min.js' ]);
  }
});
