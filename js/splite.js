(function($) {
  var spliter = function(el) {
      var str = el.html();

      str = str.split(",").join("<br />\n");
      el.html(str);
  };

  $.fn.splitText = function() {
      return this.each(function () {
          spliter($(this));
      });
  };
} (jQuery));
