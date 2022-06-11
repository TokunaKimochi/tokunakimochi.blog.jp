import $ from 'jquery';

const watchJumpScroll = function() {
  setTimeout(watch, 0 * 1000);

  function watch() {
    const jump = sharpStr => {
      const str = sharpStr.slice(1);
      // getElementById に空文字列を渡すと警告が出る
      if (!str) return;
      const dom = document.getElementById(str);
      // 存在確認 IE 非対応
      if (!dom.isConnected) return;
      const top = $(dom).offset().top;
      $('html, body').animate({ scrollTop: top }, 500, 'swing');
    };

    const hash = window.location.hash;
    if (hash) jump(hash);

    $('a[href^="#"]').on('click', e => {
      e.preventDefault();
      const href = $(e.currentTarget).attr('href');
      jump(href);
    });
  }
};

export default watchJumpScroll;
