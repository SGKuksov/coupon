(function($) {
  var truncate = function(el) {
    var text = el.text(),
          height = el.height(),
          clone = el.clone();
          // original = el.clone();
          // originalClass = original.className;

          // if ( el.nextAll().hasClass(originalClass) !=  clone.className ) {
          //   original.css ({
          //     position: 'absolute',
          //     visibility: 'hidden',
          //     display: 'none',
          //     height: 'auto'
          //   });
          //   el.after(original);
          // }

    clone.css({
          position: 'absolute',
          visibility: 'hidden',
          height: 'auto'
        });


      el.after(clone);

      var l = text.length - 1;
      for (; l >= 0 && clone.height() > height; --l) {
          clone.text(text.substring(0, l) + '...');
      }

      el.text(clone.text());
      clone.remove();
  };

  $.fn.truncateText = function() {
      return this.each(function () {
          truncate($(this));
      });
  };
}(jQuery));
