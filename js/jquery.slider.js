var slider = (function () {
  var startX,
    os = 0,
    minOffset = 50,
    dir,
    touching = false,
    isRun = false;

  var $container = $(".slider-container");
  var $silder = $container.find(".slider");
  var $li = $silder.find("li");
  var imgList = $li.length;
  var width = $li.width();
  var $dot = $("<ul class='dot'></ul>");
  for (var i = 0; i < imgList; i++) {
    if (i == 0) {
      $("<li class='active'>" + (i + 1) + "</li>").appendTo($dot);
    } else {
      $("<li>" + (i + 1) + "</li>").appendTo($dot);
    }
  }
  $dot.appendTo($container);
  var $dotLi = $dot.find("li");

  function Node() {
    return {
      idx: null,
      tag: null,
      next: null,
      prev: null,
    };
  }

  var head = new Node();
  var first = head;

  function setCircle() {
    var cur = head;
    $li.each(function (i, item) {
      var n = new Node();
      n.idx = i;
      n.tag = item;
      n.prev = cur;
      cur.next = n;
      cur = n;
    });
    head = head.next;
    cur.next = head;
    head.prev = cur;
    first = head;
  }

  function setList() {
    var cur = head;
    $li.each(function (i, item) {
      var n = new Node();
      n.idx = i;
      n.tag = item;
      n.prev = cur;
      cur.next = n;
      cur = n;
    });
    head = head.next;
    first = head;
  }

  function tick(flag) {
    if (slider.autoRun && !touching) {
      if (flag) {
        if (dir) {
          slider.prev();
        } else {
          slider.next();
        }
      }
    }
    setTimeout(function () {
      tick(true);
    }, slider.tickTime);
  }

  function sort(os) {
    os = os || 0;
    var cur = first;
    var x = 0;
    if (slider.isCircle) {
      $(first.prev.tag).css("transform", "translateX(" + (-width + os) + "px)");
      while (cur !== first.prev) {
        $(cur.tag).css("transform", "translateX(" + (x + os) + "px)");
        x += width;
        cur = cur.next;
      }
    } else {
      while (cur.next) {
        $(cur.tag).css("transform", "translateX(" + (x + os) + "px)");
        x += width;
        cur = cur.next;
      }
      $(cur.tag).css("transform", "translateX(" + (x + os) + "px)");
      $(first.prev.tag).css("transform", "translateX(" + (-width + os) + "px)");
    }
    $(window).trigger("appear"); //trigger for lazyLoad
  }

  function resize() {
    $(window).resize(function () {
      width = $li.width();
      sort();
    });
  }

  return {
    autoRun: true,
    isCircle: true,
    dur: 600,
    tickTime: 5000,
    init: function (options) {
      $.extend(this, options);
      dir = !this.isCircle && this.autoRun ? false : null; //turn left :false ; turn right:ture
      if (this.isCircle) {
        setCircle();
      } else {
        setList();
      }
      sort();
      tick(false);
      resize();

      $container
        .on("touchstart touchend", function (e) {
          if (e.type === "touchstart") {
            var touch = e.originalEvent.targetTouches[0];
            startX = touch.pageX;
            touching = true;
          } else {
            touching = false;
            if (Math.abs(os) > minOffset) {
              if (os > 0) {
                if (!slider.isCircle && first.idx == 0) {
                  slider.back();
                } else {
                  slider.prev();
                }
              } else {
                if (!slider.isCircle && first.idx == imgList - 1) {
                  slider.back();
                } else {
                  slider.next();
                }
              }
            } else {
              slider.back();
            }
          }
        })
        .on("touchmove", function (e) {
          e.originalEvent.preventDefault();
          var touch = e.originalEvent.targetTouches[0];
          var x = touch.pageX;
          os = x - startX;
          if (!isRun) {
            sort(os);
          }
        });
    },
    next: function () {
      if (!isRun) {
        isRun = true;
        $({ end: os }).animate(
          { end: -width },
          {
            duration: slider.dur,
            step: function (now, fx) {
              sort(now);
            },
            complete: function () {
              isRun = false;
              first = first.next;
              $dotLi.removeClass("active").eq(first.idx).addClass("active");
              os = 0;
              if (dir || (!slider.isCircle && slider.autoRun)) {
                dir = first.idx == imgList - 1 ? true : false;
              }
            },
          }
        );
      }
    },
    prev: function () {
      if (!isRun) {
        isRun = true;
        $({ end: os }).animate(
          { end: width },
          {
            duration: slider.dur,
            step: function (now, fx) {
              sort(now);
            },
            complete: function () {
              isRun = false;
              first = first.prev;
              $dotLi.removeClass("active").eq(first.idx).addClass("active");
              os = 0;
              if (dir || (!slider.isCircle && slider.autoRun)) {
                dir = first.idx == 0 ? false : true;
              }
            },
          }
        );
      }
    },
    back: function () {
      isRun = true;
      $({ end: os }).animate(
        { end: 0 },
        {
          duration: slider.dur / 2,
          step: function (now, fx) {
            sort(now);
          },
          complete: function () {
            isRun = false;
          },
        }
      );
    },
  };
})();
