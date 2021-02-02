//#region 图片延时加载
ko.bindingHandlers.lazyLoad = {
  init: function (
    element,
    valueAccessor,
    allBindings,
    viewModel,
    bindingContext
  ) {
    var isLazy = !!ko.unwrap(valueAccessor());
    if (isLazy) {
      function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        var $window = $(window);

        var height = window.innerHeight || $window.height();
        var width = window.innerWidth || $window.width();

        return !(
          rect.top > height ||
          rect.left > width ||
          rect.right < 0 ||
          rect.bottom < 0
        );
      }
      var eventList = "appear resize scroll load";
      var resPath = allBindings().resPath ? allBindings().resPath : "";
      $(element)
        .find("img[data-src]")
        .each(function (index, el) {
          function getLS() {
            if (localStorage == undefined) {
              return {};
            }
            return localStorage;
          }
          var ls = getLS();
          var src = resPath + $(el).attr("data-src");
          if (!ls[src]) {
            $(this).attr("src", "/images/load.jpg");
            var handler = function () {
              ls[src] = 1;
              if ($(el).is(":visible") && isElementInViewport(el)) {
                $(el)
                  .on("error", function () {
                    $(this).attr("src", "/images/load-error.jpg");
                  })
                  .attr("src", src);
                $(this).off(eventList, handler);
              }
            };
            $(window).on(eventList, handler);
            setTimeout(function () {
              handler();
            }, 50);
          } else {
            $(el).attr("src", resPath + $(el).attr("data-src"));
          }
        });
    }
  },
};
//#endregion
