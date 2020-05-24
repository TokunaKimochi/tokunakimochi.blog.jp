// https://github.com/muicss/loadjs
'use strict';

loadjs('https://cdn.jsdelivr.net/npm/ie-buster@1.1.0/dist/ie-buster.min.js', 'ie');

loadjs([ 'https://tokunakimochi.github.io/tokunakimochi.blog.jp/tokunakimochi-blog-jp.min.css'
         , 'https://tokunakimochi.github.io/Nivo-Lightbox/nivo-lightbox.min.css' ], 'css');

loadjs('https://tokunakimochi.github.io/tokunakimochi.blog.jp/tokunakimochi-blog-jp.iife.min.js', 'pre');

loadjs([ 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'
         , 'https://ajax.googleapis.com/ajax/libs/hammerjs/2.0.8/hammer.min.js'
         , 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js'
         , 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.13.0/js/all.min.js' ], 'dep');

loadjs.ready('ie', {
  success: function() {
    ieBuster({
      mainText: 'Internet Explorer ではこのページは表示できません。今すぐ Microsoft Edge を入手してください。',
      linkText: '今すぐ無料で入手',
      linkUrl: 'https://www.microsoft.com/edge'
    });
  }
});

loadjs.ready(['css', 'pre', 'dep'], {
  success: function() {
    loadjs([ '//parts.blog.livedoor.jp/js/design.js'
             , 'https://tokunakimochi.github.io/tokunakimochi.blog.jp/tokunakimochi-blog-jp.min.js' ]);
  }
});
