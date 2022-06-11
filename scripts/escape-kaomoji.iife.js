const escapeKaomoji = (function() {

  let JSONURI = './init.json';
  let kaomojiArr = ['(^_^)'];

  return {

    setJSONURI: function(val) {
      JSONURI = val;
      return this;
    },

    addKaomoji: function(val) {
      if ( Array.isArray(val) ) { kaomojiArr = kaomojiArr.concat(val); }
      return this;
    },

    fetchJSONEscKaomoji: function(val) {
      const that = this;
      return new Promise(function(res){
        if (val) that.setJSONURI(val);
        let ajax = new window.XMLHttpRequest();
        ajax.open('GET', JSONURI, true);
        ajax.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        const supportsJSON = (function() {
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
            const data = supportsJSON ? this.response : JSON.parse(this.responseText);
            const kaomojiFromJSON = data.KaomojiArray;
            that.addKaomoji(kaomojiFromJSON);
            that.escKaomoji();
            res();
          }
          else {
            console.log('データ取得失敗');
            res();
          }
        };
        ajax.ontimeout = function() {
          if (this) {
            this.abort();
            ajax = null;
            console.log('タイムアウト');
            res();
          }
        };
        ajax.onerror = function() {
          ajax = null;
          console.log('エラー');
          res();
        };

        ajax = null;
      });

    },

    escKaomoji: function(val) {
      if (val) { this.addKaomoji(val); }

      const markdownClassArr = document.getElementsByClassName('markdown');

      // Markdown で使われる文字を文字参照にする定義
      const entityify = (function(){
        const character = {
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
      for (let i = 0; i < markdownClassArr.length; i++) {
        let manuscript = markdownClassArr[i].value;
        // 顔文字を一つずつ
        for (let j = 0; j < kaomojiArr.length; j++) {
          let fromindex = 0;
          const searchVal = ' ' + kaomojiArr[j] + ' ';
          const replacement = '<span class="kaomoji"><code>' + kaomojiArr[j] + '</code></span>';
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

export default escapeKaomoji;
