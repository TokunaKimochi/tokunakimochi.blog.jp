;(function(window, namespace){
    'use strict';

    window[namespace] = (function() {

        var JSONURI = './init.json';
        var kaomojiArr = ['(^_^)'];

        return {

            setJSONURI: function(val) {
                JSONURI = val;
                return this;
            },

            addKaomoji: function(val) {
                kaomojiArr = kaomojiArr.concat(val);
                return this;
            },

            usingJSONEscKomoji: function(val) {
                if (val) this.setJSONURI(val);
                var that = this;
                var ajax = new window.XMLHttpRequest();
                ajax.open('GET', JSONURI, true);
                ajax.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

                var supportsJSON = (function() {
                    try { ajax.responseType = 'json'; }
                    catch(e) { return false; }
                    return 'response' in ajax && ajax.responseType === 'json';
                }());

                ajax.timeout = 5000;
                ajax.send(null);

                ajax.onload = function() {
                    // ステータスコードを調べる
                    if ( (this.status >= 200 && this.status < 300) || (this.status === 304) ) {
                        // ページの更新
                        var data = supportsJSON ? this.response : JSON.parse(this.responseText);
                        var kaomojiFromJSON = data.KaomojiArray;
                        that.addKaomoji(kaomojiFromJSON);
                        that.escKaomoji();
                    }
                    else {
                        console.log('データ取得失敗');
                    }
                };
                ajax.ontimeout = function() {
                    if (this) {
                        this.abort();
                        ajax = null;
                        console.log('タイムアウト');
                    }
                };
                ajax.onerror = function() {
                    ajax = null;
                    console.log('エラー');
                };

                ajax = null;

            },

            escKaomoji: function() {
                var markdownClassArr = document.getElementsByClassName('markdown');

                // Markdown で使われる文字を文字参照にする定義
                var entityify = (function(){
                    var character = {
                        '*': '&#x2a;',
                        '_': '&#x5f;',
                        '~': '&#x7e;',
                        '`': '&#x60;',
                        '[': '&#x5b;',
                        ']': '&#x5d;',
                        '(': '&#x28;',
                        ')': '&#x29;',
                        ':': '&#x3a;'
                    };
                    return function(t) {
                        return t.replace(/[*_~`\[\]():]/g, function(c) {
                            return character[c];
                        });
                    };
                }());

                // 記事および、もっと読むが一単位のループ
                for (var i = 0; i < markdownClassArr.length; i++) {
                    var manuscript = markdownClassArr[i].value;
                    // 顔文字を一つずつ
                    for (var j = 0; j < kaomojiArr.length; j++) {
                        var fromindex = 0;
                        var searchVal = ' ' + kaomojiArr[j] + ' ';
                        var replacement = '<span class="kaomoji"><code>' + kaomojiArr[j] + '</code></span>';
                        while (fromindex !== -1) {
                            fromindex = manuscript.indexOf(searchVal, fromindex);
                            if (fromindex !== -1) {
                                manuscript = manuscript.replace(searchVal, replacement);
                                manuscript = manuscript.replace(kaomojiArr[j], entityify);
                                fromindex += 31;
                            }
                        }
                    }

                    markdownClassArr[i].value = manuscript;
                }
            }
        };
    }());

    // デフォルトの動作を指定
    window[namespace].usingJSONEscKomoji('/config/init.json');

}(this, 'tokunakimochiBlogJpJavascript'));
