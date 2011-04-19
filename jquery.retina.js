(function($) {
  $.fn.retina = function(options) {
    var settings = { 
      "retina-background" : false,
      "retina-suffix" : "@2x"
    };
    if (options) {
      $.extend(settings, options);
    }
    var preload = function(path, callback) {
      var img = new Image();
      img.onload = function() { callback(img) };
      img.src = path;
    };
    if (window.devicePixelRatio > 1) {
      this.each(function() {
        var element = $(this);
        if (this.tagName.toLowerCase() == "img" && element.attr("src")) {
          var path = element.attr("src").replace(/\.(?!.*\.)/, settings["retina-suffix"] +".");
          preload(path, function(img) {
            element.attr("src", img.src);
            var imgHtml = $("<div>").append(element.clone()).remove().html();
            if (!(/(width|height)=["']\d+["']/.test(imgHtml))) {
              element.attr("width", img.width / 2);
            }
          });
        }
        if (settings["retina-background"]) {
          var backgroundImageUrl = element.css("background-image");
          if (/^url\(.*\)$/.test(backgroundImageUrl)) {
            var path = backgroundImageUrl.substring(4, backgroundImageUrl.length - 1).replace(/\.(?!.*\.)/, settings["retina-suffix"] +".");
            preload(path, function(img) {
              element.css("background-image", "url(" + img.src + ")");
              if (element.css("background-size") == "auto auto") {
                element.css("background-size", (img.width / 2) + "px auto");
              }
            });
          }
        }
      });
    }
  };
})(jQuery);