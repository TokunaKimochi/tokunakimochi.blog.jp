import $ from 'jquery';

$.fn.declareCite = function() {

  const main = function() {
    return dom.each(function() {

      const jqueryObj = $(this);
      let txtArr = [];
      const htm = jqueryObj.html();

      if ((txtArr = htm.match(/^--\s+(\S.*)$/)) !== null) {
        jqueryObj.replaceWith('<footer><cite>' + txtArr[1] + '</cite></footer>');
      }
    });
  };

  const jqueryObj = this;
  const dom = jqueryObj.find('blockquote p:last-child');
  main();
  return this;
};
