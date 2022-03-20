const watchJumpScroll = function() {
  'use strict';
  setTimeout(watch, 1 * 1000);

  function watch() {
    const jump = sharpStr => {
      const str = sharpStr.slice(1);
      // getElementById に空文字列を渡すと警告が出る
      if (!str) return;
      const dom = document.getElementById(str);
      // 存在確認 IE 非対応
      if (!dom.isConnected) return;
      const top = jQuery(dom).offset().top;
      jQuery('html, body').animate({ scrollTop: top }, 500, 'swing');
    };

    const hash = window.location.hash;
    if (hash) jump(hash);

    jQuery('a[href^="#"]').on('click', e => {
      e.preventDefault();
      const href = jQuery(e.currentTarget).attr('href');
      jump(href);
    });
  }
};

export default watchJumpScroll;
