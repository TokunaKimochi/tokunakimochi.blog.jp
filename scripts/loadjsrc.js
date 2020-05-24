// https://github.com/muicss/loadjs
'use strict';

loadjs('https://cdn.jsdelivr.net/npm/ie-buster@1.1.0/dist/ie-buster.min.js', 'ie');

loadjs.ready('ie', {
  success: function() {
    ieBuster({
      mainText: 'Internet Explorer ではこのページは表示できません。今すぐ Microsoft Edge を入手してください。',
      linkText: '今すぐ無料で入手',
      linkUrl: 'https://www.microsoft.com/edge'
    });
  }
});
