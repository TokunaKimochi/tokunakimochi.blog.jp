(function($) {
  $.fn.prismHelper = function() {
    'use strict';

    // 子要素を除いたテキストノードを取得
    var getNodeText = function(elem) {
      var text = '', i;
      for (i = 0; i < elem.childNodes.length; i++) {
        // Node.TEXT_NODE => 3
        if (elem.childNodes[i].nodeType === 3){
          text += elem.childNodes[i].data;
        }
      }
      return text;
    };

    var stretchDiv = function() {
      var div, prevElem, nextElem, divHeight, divMarginTop, prevMarginBottom, divMarginBottom, nextMarginTop,
          parentElem, parentPaddingBottom, windowWidth, divWidth, offset, myPx, familyPx;
      div = $(this).parents('div.named').eq(0);
      prevElem = div.prev();
      nextElem = div.next();
      // position: static => absolute
      if (! div.hasClass('stretched')){
        divHeight = div.outerHeight(true);
        // 長子の場合は margin-top の調整は不要
        if (prevElem.length){
          divMarginTop = Number(div.css('margin-top').replace('px', ''));
          prevMarginBottom = Number(prevElem.css('margin-bottom').replace('px', ''));
          div.data('mypx', divMarginTop);
          // マージンの相殺を勘案
          if (prevMarginBottom >= divMarginTop){
            div.css('margin-top', 0);
          }
          else {
            div.css('margin-top', divMarginTop - prevMarginBottom);
          }
        }

        if (nextElem.length){
          divMarginBottom = Number(div.css('margin-bottom').replace('px', ''));
          nextMarginTop = Number(nextElem.css('margin-top').replace('px', ''));
          div.data('familypx', nextMarginTop);
          // マージンの相殺を勘案
          if (divMarginBottom >= nextMarginTop){
            nextElem.css('margin-top', divHeight);
          }
          else {
            nextElem.css('margin-top', divHeight + nextMarginTop - divMarginBottom);
          }
        }
        else {
          parentElem = div.parent();
          parentPaddingBottom = Number(parentElem.css('padding-bottom').replace('px', ''));
          div.data('familypx', parentPaddingBottom);
          parentElem.css('padding-bottom', divHeight + parentPaddingBottom);
        }
        div.addClass('stretched');
        div.css('max-width', document.body.clientWidth);
        // Returns width of browser viewport
        windowWidth = $(window).width();
        divWidth = div.outerWidth(true);
        offset = (windowWidth - divWidth) / 2;
        div.offset({left: offset});
      }
      // position: absolute => static
      else {
        if (prevElem.length){
          myPx = Number(div.data('mypx'));
          div.css('margin-top', myPx);
        }

        familyPx = Number(div.data('familypx'));
        if (nextElem.length){
          nextElem.css('margin-top', familyPx);
        }
        else {
          div.parent().css('padding-bottom', familyPx);
        }
        div.removeClass('stretched');
        div.css('max-width', '');
        div.css('left', '');
      }
    };

    var main = function() {
      return dom.each(function(index) {

        var jqueryObj = $(this);
        var txtArr = [], splitArr = [], lineNumArr = [], highlightLineArr = [], titleArr = [], codeNoClassArr = [];
        var numberingClassname, txt, anchor, h3Id, stretchButton, pre, code, specifyLng, i, classname, score, flag, title, codeNoClass;

        if (jqueryObj.is('h3')) {
          numberingClassname = 'code-No_' + index;
          // 本当に直前の <h3> か pre をチェック！
          pre = jqueryObj.next('pre');
          if (pre.length) {
            txt = getNodeText(jqueryObj[0]);
            anchor = jqueryObj.children('a');
            h3Id = jqueryObj.attr('id');
            stretchButton = '';
            // エスケープ
            if (/^\s*'/.test(txt)) {
              txt = txt.slice(1);
              jqueryObj.text(txt);
            }
            // 省略記法。タイトルと言語の指定を同時にする
            else if ((txtArr = txt.match(/^\s*\+\+([a-zA-Z0-9]+)\s*$/)) !== null) {
              pre.addClass( numberingClassname );
              jqueryObj.replaceWith( function() {
                return $('<h3 id="' + h3Id + '" class="filename ' + numberingClassname + '">' + txtArr[1] +
                         '</h3>').prepend(anchor);
              });
              specifyLng = 'language-' + txtArr[1];
              pre.addClass(specifyLng + ' line-numbers');
              code = pre.children('code');
              if (code.length) {
                code.addClass(specifyLng);
              }
            }
            else if ((txtArr = txt.match(/^\s*\+=(.+)$/)) !== null) {
              pre.addClass( numberingClassname );
              splitArr = txtArr[1].split(/\s+/);
              for (i = 0; i < splitArr.length; i++) {
                if (/^\s*$/.test(splitArr[i])) {
                  continue;
                }
                else if ((lineNumArr = splitArr[i].match(/^:([0-9]+)$/)) !== null) {
                  if (pre.hasClass('line-numbers')) {
                    pre.attr('data-start', lineNumArr[1]);
                    pre.attr('data-line-offset', --lineNumArr[1]);
                    if (score > 50) break;
                    score += 50;
                    flag = 't';
                  }
                }
                else if ((highlightLineArr = splitArr[i].match(/^!:([0-9,\-]+)$/)) !== null) {
                  pre.attr('data-line', highlightLineArr[1]);
                  if (score > 50) break;
                  score += 50;
                  flag = 't';
                }
                // ClassName 追加のオプション群
                else if (/--scroll-x|-S/.test(splitArr[i])) {
                  pre.addClass('scroll-x');
                  stretchButton = '<button class="stretch-x"></button>';
                }
                else if (/--jp-monospace|-J/.test(splitArr[i])) {
                  pre.addClass('jp-monospace');
                }
                else {
                  if (score % 50 && flag) break;
                  titleArr.push(splitArr[i]);
                  score++;
                  flag = void 0;
                }
              }
              if (titleArr.length) {
                title = titleArr.join(' ');
                jqueryObj.replaceWith( function() {
                  return $('<h3 id="' + h3Id + '" class="filename ' + numberingClassname + '">' + title +
                           stretchButton + '</h3>').prepend(anchor);
                });
              }
              else {
                pre.removeClass( numberingClassname );
                jqueryObj.remove();
              }
            }
          }
        }
        else if (jqueryObj.is('pre')) {
          classname = jqueryObj.attr('class');
          if ( classname ) {
            splitArr = classname.split(/\s+/);
            for (i = 0; i < splitArr.length; i++) {
              if ((codeNoClassArr = splitArr[i].match(/(code-No_[0-9]+)/)) !== null) {
                codeNoClass = '.' + codeNoClassArr[1];
                if ($( codeNoClass ).length === 2) {
                  $( codeNoClass ).wrapAll('<div class="wrapping-code named add-box-shadow" />');
                  flag = 't';
                }
              }
            }
          }
          if (! flag) {
            jqueryObj.wrap('<div class="wrapping-code add-box-shadow" />');
          }
        }
      });
    };

    var jqueryObj = this;
    var dom = jqueryObj.find('h3');
    main();
    Prism.highlightAll();
    dom = $('pre');
    main();
    $(document).on('click', '.stretch-x', stretchDiv);

    return this;
  };
}(jQuery));
