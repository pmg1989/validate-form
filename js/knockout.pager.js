//#region/*分页组件 pager*/

ko.components.register("pager", {
  viewModel: function (params) {
    var that = this;
    /*数据总条数*/
    this.count = params.count;
    /*每页显示数*/
    this.pageSize = ko.toJS(params.size);
    /*可显示页码数目*/
    this.pageBtnCount = params.btnCount || 7;
    /*总页数*/
    this.pageCount = ko.computed(function () {
      return Math.ceil(this() / that.pageSize);
    }, this.count);
    /*当前页码*/
    this.cur = params.no || ko.observable(0);
    this.pageCur = ko.computed({
      read: function () {
        return that.cur() + 1;
      },
    });
    /*回调函数*/
    this.showContent = params.show;
    /*页码*/
    this.pageNumber = ko.computed(function () {
      var arr = [];
      var cur = that.cur();
      var pageCount = that.pageCount();
      if (pageCount <= that.pageBtnCount) {
        for (var i = 0; i < pageCount; i++) {
          arr.push(i + 1);
        }
      } else {
        var ids = {};
        ids[0] = 0;
        var flag = true;
        var min = cur - 1;
        var max = cur + 1;
        ids[cur] = cur;
        ids[pageCount - 1] = pageCount - 1;
        var last = that.pageBtnCount - 1;
        while (last > 0) {
          if (flag) {
            if (min > 0) {
              ids[min] = min;
              min--;
              last--;
            }
          } else {
            if (max <= pageCount - 1) {
              ids[max] = max;
              max++;
              last--;
            }
          }
          flag = !flag;
        }
        for (var key in ids) {
          arr.push(ids[key] + 1);
        }
        arr.sort(function (a, b) {
          return a - b;
        });
      }
      return arr;
    }, this.pageCount);
    this.showFirstPage = function () {
      if (that.pageCur() > 1) {
        that.cur(0);
        if (that.showContent) {
          that.showContent(0);
        }
      }
    };
    this.showLastPage = function () {
      if (that.pageCur() !== that.pageCount()) {
        that.cur(that.pageCount() - 1);
        if (that.showContent) {
          that.showContent(that.cur());
        }
      }
    };
    this.showPrevPage = function () {
      that.cur() > 0 && that.cur(that.cur() - 1);
      if (that.showContent) {
        that.showContent(that.cur());
      }
    };
    this.showNextPage = function () {
      that.cur(that.cur() + 1);
      if (that.showContent) {
        that.showContent(that.cur());
      }
    }.bind(this);
    this.showCurPage = function (cur) {
      if (cur === that.pageCur()) {
        return false;
      }
      that.cur(cur - 1);
      if (that.showContent) {
        that.showContent(cur - 1);
      }
    };
  },
  template:
    '<div class="pager">\
        <ul class="pagination">\
            <li><a href="javascript:void(0);" data-bind="click:showFirstPage">«首页</a></li>\
            <li><a href="javascript:void(0);" data-bind="click:showPrevPage">«上一页</a></li>\
            <!-- ko foreach:pageNumber -->\
            <li data-bind="css:{\'active\':$data === $parent.pageCur()}">\
                <a href="javascript:void(0);" data-bind="text:$data,click:function(){ $parent.showCurPage($data); }"></a>\
            </li>\
            <!-- /ko -->\
            <li data-bind="visible:pageCur() < pageCount()"><a href="javascript:void(0);" data-bind="click:showNextPage">下一页»</a></li>\
            <li data-bind="visible:pageCur() < pageCount()"><a href="javascript:void(0);" data-bind="click:showLastPage">尾页»</a></li>\
            <li>共 <span data-bind="text:pageCount"></span> 页 - <span data-bind="text:count"></span> 条数据 - <span data-bind="text:pageSize"></span> 条 / 页</li>\
        </ul>\
    </div>',
});
//#endregion
