import $ from 'jquery';

$.fn.em2another = function() {

  const main = function() {
    return dom.each(function() {

      const jqueryObj = $(this);
      let txtArr = [];
      const htm = jqueryObj.html();

      if ((txtArr = htm.match(/^\|([^|]+)\|$/)) !== null) {
        jqueryObj.replaceWith('<span class="menu">' + txtArr[1] + '</span>');
      }
      else if ((txtArr = htm.match(/^@([^@]+)@$/)) !== null) {
        jqueryObj.replaceWith('<span class="dialog">' + txtArr[1] + '</span>');
      }
      else if ((txtArr = htm.match(/^\{([^{}]+)\}$/)) !== null) {
        jqueryObj.replaceWith('<span class="key-word">' + txtArr[1] + '</span>');
      }
      else if ((txtArr = htm.match(/^\[([^\[\]]+)\]$/)) !== null) {
        jqueryObj.replaceWith('<kbd class="from-em">' + txtArr[1] + '</kbd>');
      }
    });
  };

  const jqueryObj = this;
  const dom = jqueryObj.find('em');
  main();
  return this;
};
