$.fn.pager = function (options) {
  var opt = $.extend({}, $.fn.pager.defaults, options);
  if (opt.btnCount < 3) {
    opt.btnCount = 3;
  }
  opt.pageSize = parseInt(opt.pageSize);
  if (opt.pageSize < 1) {
    opt.pageSize = 1;
  }
  opt.pageCount = Math.ceil(opt.resultCount / opt.pageSize);
  return this.each(function () {
    var base = new $.fn.pager.base(opt, $(this));
    base.render();
  });
};

$.fn.pager.defaults = {
  resultCount: 0, //总记录数
  pageSize: 10, //每页记录数
  btnCount: 6, //最大分布数
  pageCount: 0, //页数
  curPage: 0, //当前页码
  showPage: function (num) {},
  //返回当前分页
  renderNav: function (type, pageNo) {
    var nav = '<li><a href="javascript:void(0);">' + (pageNo + 1) + "</a></li>";
    if (pageNo == this.curPage) {
      nav = '<li class="active"><span>' + (pageNo + 1) + "</span></li>";
    }
    if (type == "prev") {
      nav = '<li><a href="javascript:void(0);">«上一页</a></li>';
    } else if (type == "next") {
      nav = '<li><a href="javascript:void(0);">下一页»</a></li>';
    } else if (type == "first") {
      nav = '<li><a href="javascript:void(0);">«首页</a></li>';
    } else if (type == "last") {
      nav = '<li><a href="javascript:void(0);">尾页»</a></li>';
    }
    return nav;
  },
};

$.fn.pager.base = function (opt, el, base) {
  return {
    render: function () {
      el.html("");
      var text = '<ul class="pagination"></ul>';
      el.append(text);
      $(opt.renderNav("first"))
        .appendTo(el.find("ul.pagination"))
        .on("click", function () {
          that.show(0, "first");
          return false;
        });
      var that = this;
      $(opt.renderNav("prev"))
        .appendTo(el.find("ul.pagination"))
        .on("click", function () {
          that.showPrev();
          return false;
        });
      var last = opt.btnCount - 2;
      if (opt.pageCount < opt.btnCount) {
        for (var i = 0; i < opt.pageCount; i++) {
          this.nav(i);
        }
      } else {
        var ids = {};
        ids[0] = 0;
        var flag = true;
        var min = opt.curPage - 1;
        var max = opt.curPage + 1;
        ids[opt.curPage] = opt.curPage;
        ids[opt.pageCount - 1] = opt.pageCount - 1;
        while (last > 0) {
          if (flag) {
            if (min > 0) {
              ids[min] = min;
              min--;
              last--;
            }
          } else {
            if (max <= opt.pageCount - 1) {
              ids[max] = max;
              max++;
              last--;
            }
          }
          flag = !flag;
        }
        var arr = [];
        for (var key in ids) {
          arr.push(ids[key]);
        }
        arr.sort(function (a, b) {
          return a - b;
        });
        for (var i = 0; i < arr.length; i++) {
          this.nav(arr[i]);
        }
      }
      var that = this;
      $(opt.renderNav("next"))
        .appendTo(el.find("ul.pagination"))
        .on("click", function () {
          that.showNext();
          return false;
        });
      $(opt.renderNav("last"))
        .appendTo(el.find("ul.pagination"))
        .on("click", function () {
          that.show(opt.pageCount - 1, "last");
          return false;
        });
      this.showText();
    },
    nav: function (num) {
      var that = this;
      $(opt.renderNav("nav", num))
        .attr("tag", num)
        .appendTo(el.find("ul.pagination"))
        .on("click", function () {
          var num = parseInt($(this).attr("tag"));
          that.show(num);
          return false;
        });
    },
    showNext: function () {
      opt.curPage++;
      if (opt.curPage > opt.pageCount - 1) {
        opt.curPage = opt.pageCount - 1;
        return false;
      }
      this.show(opt.curPage);
    },
    showPrev: function () {
      opt.curPage--;
      if (opt.curPage < 0) {
        opt.curPage = 0;
        return false;
      }
      this.show(opt.curPage);
    },
    show: function (num, type) {
      if (
        (opt.curPage == 0 && type == "first") ||
        (opt.curPage == opt.pageCount - 1 && type == "last")
      ) {
        return false;
      }
      if (opt.curPage != num) {
        opt.curPage = num;
      }
      this.render();
      opt.showPage(num);
    },
    showText: function () {
      var that = this;
      var nav =
        '<li><span class="tip">共 ' +
        opt.pageCount +
        " 页 - " +
        opt.pageCount * opt.pageSize +
        " 条数据 - " +
        opt.pageSize +
        " 条 / 页</span></li>";
      $(nav).appendTo(el.find("ul.pagination"));
    },
    changePageNo: function (cur, el) {
      var re = /^[0-9]*[1-9][0-9]*$/;
      if (!re.test(cur)) {
        el.val(opt.curPage + 1);
        return false;
      }
      cur = +cur;
      if (cur > opt.pageCount) {
        el.val(opt.curPage + 1);
        return false;
      }
      this.show(cur - 1);
    },
    changePageSize: function (_pageSize, el) {
      var re = /^[0-9]*[1-9][0-9]*$/;
      if (!re.test(_pageSize)) {
        el.val(opt.pageSize + 1);
        return false;
      }
      if (opt.clearCache) {
        opt.clearCache();
      }
      opt.pageSize = +_pageSize;
      opt.curPage = 0;
      opt.pageCount = Math.ceil(opt.resultCount / opt.pageSize);
      this.render();
      opt.showPage(0);
    },
  };
};
