(function($) {
  $.fn.nivolboxHelper = function(location) {
    'use strict';

    var main = function() {
      return dom.each(function() {
        var anchor = $(this);
        var title = anchor.attr('title');
        if (title && /^\s*\{([^}]+)}\s*$/.test(title)) {
          var local_title, lightbox_flag, lightbox_gallery_state, lightbox_type_flag;
          var lbox_attr = RegExp.$1;
          var split_arr = lbox_attr.split(',');
          for (var i = 0; i < split_arr.length; i++) {
            // lightbox:[] or lbox:[]
            if (/^\s*l(?:ight)?box:\s*\[([^\]]*)\]\s*$/.test(split_arr[i])) {
              var lightbox_arr = RegExp.$1.split(/\s+/);
              lightbox_flag = 1;
              lightbox_gallery_state = 'do';
              lightbox_type_flag = 0;
              for (var n = 0; n < lightbox_arr.length; n++) {
                if (/^\s*$/.test(lightbox_arr[n])) {
                  continue;
                }
                else if (lightbox_type_flag === 0 && lightbox_arr[n] === 'ajax') {
                  anchor.attr('data-lightbox-type', 'ajax');
                  lightbox_type_flag = 1;
                }
                else if (lightbox_type_flag === 0 && lightbox_arr[n] === 'iframe') {
                  anchor.attr('data-lightbox-type', 'iframe');
                  lightbox_type_flag = 1;
                }
                else if (lightbox_type_flag === 0 && lightbox_arr[n] === 'inline') {
                  anchor.attr('data-lightbox-type', 'inline');
                  lightbox_type_flag = 1;
                }
                else {
                  anchor.attr('data-lightbox-gallery', lightbox_arr[n]);
                  lightbox_gallery_state = 'done';
                }
              }
            }
            // lightbox:'タイトル文字列' or lbox:'タイトル文字列'（空文字列）ではマッチしないように！
            else if (/^\s*l(?:ight)?box:\s*'([^']+)'\s*$/.test(split_arr[i])) {
              lightbox_flag = 1;
              local_title = RegExp.$1;
            }
            // title:'タイトル文字列'（空文字列）ではマッチしないように！
            else if (/^\s*title:\s*'([^']+)'\s*$/.test(split_arr[i])) {
              local_title = RegExp.$1;
            }
            anchor.attr('title', local_title);
          }
          if (lightbox_flag === 1) {
            anchor.addClass('lightbox');
            if (lightbox_gallery_state === 'do') {
              var article_id;
              // livedoor Blog 固有処理
              if (location_copy === 'livedoorBlog') {
                var article_href = anchor.closest('article').find('.article-title > a').attr('href');
                if ( article_href ) {
                  article_id = /([^\/.]+)\.html$/.test(article_href) ? RegExp.$1 : 'lightbox-gallery-other-all';
                }
                else {
                  article_id = 'lightbox-gallery-other-all';
                }
              }
              else {
                article_id = 'lightbox-gallery-other-all';
              }
              anchor.attr('data-lightbox-gallery', article_id);
              lightbox_gallery_state = 'done';
            }
            // local_title が未定義, 0 は js界の慣習?
            if (local_title === void 0) {
              var img_alt = anchor.find('img').attr('alt');
              if (img_alt && /\S+/.test(img_alt)) {
                anchor.attr('title', img_alt);
              }
              else {
                anchor.attr('title', 'No title image');
              }
            }
          }
          else {
            anchor.remove();
          }
        }
      });
    };

    var jqueryObj = $(this);
    var location_copy = location;

    var dom;
    if (jqueryObj.is('a')) {
      dom = jqueryObj.filter('[title]');
    }
    else {
      dom = jqueryObj.find('a').filter('[title]');
    }

    main().filter('.lightbox').nivoLightbox();
    return this;
  };
}(jQuery));
