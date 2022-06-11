import $ from 'jquery';

$.fn.aEle2fn = function(selector) {

  const main = function() {

    const escape_m_char = (function(){
      const character = {
        '%{': '&#x7b;',
        '%}': '&#x7d;',
        "%'": '&#x27;',
        '%(': '&#x28;',
        '%)': '&#x29;'
      };
      return function(t) {
        return t.replace(/%[{}'()]/g, function(c) {
          return character[c];
        });
      };
    }());

    const append_li_a = function(target, title, each_index) {
      target.find('ol.footnote').append('<li id="fn' + each_index + '">');
      // title 内の可読性向上インデントを削除
      title = title.replace(/\n\s*/g, '');
      // 独自メタキャラをエスケープ
      title = escape_m_char(title);
      // 区切り文字もキャプチャ
      // {テキスト}(URI)
      const splits = title.split(/(\{[^}]+}\([^)]+\))/);
      let attr_href, attr_title, text;
      let tooltip = '';
      for (let i = 0; i < splits.length; i++) {
        if (/^\s*$/.test(splits[i])) {
          continue;
        }
        else if (/\{([^}]+)}\(\s*([^\s)']+)\s*'([^')]+)'\s*\)/.test(splits[i])) {
          attr_href = RegExp.$2;
          attr_title = RegExp.$3;
          text = RegExp.$1;
          tooltip += text;
          target.find('#fn' + each_index).append('<a class="another-destination" href="' + attr_href + '" title="' + attr_title + '">' + text);
        }
        else if (/\{([^}]+)}\(\s*([^\s)]+)\s*\)/.test(splits[i])) {
          attr_href = RegExp.$2;
          text = RegExp.$1;
          tooltip += text;
          target.find('#fn' + each_index).append('<a class="another-destination" href="' + attr_href + '">' + text);
        }
        else {
          tooltip += splits[i];
          target.find('#fn' + each_index).append('<a href="#r' + each_index + '">' + splits[i]);
        }
      }
      return tooltip;
    };

    let fnum = 0;
    if (len === 0) {
      return dom.each(function(index) {
        // ターゲットになるdivは複数
        const div = $(this).closest('div');
        const title = $(this).attr('title');
        if ( title ) {
          if (div.find('hr.footnote').length === 0) {
            div.append('<hr class="footnote">').append($('<p class="footnote">').append('<ol class="footnote">'));
            fnum = 1;
          }
          const tooltip = append_li_a(div, title, index);
          $(this).replaceWith('<sup class="footnote"><a href="#fn' + index + '" id="r' + index + '" title="' + tooltip + '">' + fnum + '</a></sup>');
          fnum++;
        }

      });
    }
    else {
      // ターゲットのdivは一つ
      const target = $(selector_copy);
      return dom.each(function(index) {
        const title = $(this).attr('title');
        if ( title ) {
          if (index === 0) {
            target.append('<hr class="footnote">').append($('<p class="footnote">').append('<ol class="footnote">'));
            fnum = 1;
          }
          const tooltip = append_li_a(target, title, index);
          $(this).replaceWith('<sup class="footnote"><a href="#fn' + index + '" id="r' + index + '" title="' + tooltip + '">' + fnum + '</a></sup>');
          fnum++;
        }

      });
    }
  };

  const jqueryObj = this;
  const len = selector ? $(selector).length : 0;
  const selector_copy = selector;

  let dom;
  if (jqueryObj.is('a')) {
    dom = jqueryObj.filter('[href = "#f"]');
  }
  else {
    dom = jqueryObj.find('a').filter('[href = "#f"]');
  }

  main();
  return this;
};
