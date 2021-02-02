//#region/*高亮替换 highLight*/
ko.bindingHandlers.highLight = {
  update: function (element, valueAccessor) {
    var css = $(element).attr("heigh-color") || "alert-danger";
    var key = ko.unwrap(valueAccessor());
    var html = $(element).text();
    if (key) {
      html = html.replace(
        new RegExp("[" + key.split("").join("][") + "]", "ig"),
        function (match) {
          return "<span class='" + css + "'>" + match + "</span>";
        }
      );
    }
    $(element).html(html);
  },
};
//#endregion
