$(document).ready(function() {
    autoScrollSpeed = 4;
    animationIterations = 0;
    autoScroll = false;
    scrollValue = $(document).scrollTop();
    spaceHeight = $(".animal .heroboundary").height();
    $("#top_hamburger").click(function() {
        if ($("#top_menu").height() > 0) {
            $(this).addClass("closed");
            $("#top_menu li").css("font-size", "0");
            $("#top_menu li").css("color", "transparent");
            setTimeout(function() {
              $("#top_hamburger").removeClass("closed");
            }, 1000);
        } else {
            $(this).addClass("open");
            $("#top_menu li").css("font-size", "1.2em");
            $("#top_menu li").css("color", "#fff");
            setTimeout(function() {
              $("#top_hamburger").removeClass("closed");
            }, 1000);
        }
    });
    window.setInterval(checkScroll, 30);
    $(".button#auto-scroll").click(function() {
      if (autoScroll == false) {
        autoScroll = true;
        $(".button#auto-scroll").css("background-color", "#F3AF52");
      } else {
        autoScroll = false;
        $(".button#auto-scroll").css("background-color", "#777");
      }
    });
});

function checkScroll() {
  var currentScroll = $(document).scrollTop();
  updatePageIdle();
  if (scrollValue != currentScroll) {
      updatePageOnScroll(scrollValue, currentScroll);
  }
}
function updatePageOnScroll(prevScroll, currentScroll) {
    currentScroll = $(document).scrollTop();
    $(".animal").each(function() {
      if (isScrolledIntoView($(this))) {
        var offsetAmount = currentScroll - $(this).offset().top;
        var space = $(this).children(".heroboundary");
        if (offsetAmount > spaceHeight) {
          offsetAmount = spaceHeight;
        }
        var parallaxDistance = offsetAmount + $(window).height();
        var totalParallax = spaceHeight + $(window).height();
        var scrollFraction = parallaxDistance/totalParallax;
        var heroHeight = $(this).find(".hero").height();
        if (parallaxDistance < 0) {
          parallaxDistance = 0;
        }
        if (scrollFraction > 0.3) {
          $(this).find(".hero h2.fadeInUp").removeClass();
          $(this).find(".hero h2.text-first").removeClass().addClass("fadeInUp");
        } else if (scrollFraction > 0.6) {
          $(this).find(".hero h2.fadeInUp").removeClass();
          $(this).find(".hero h2.text-second").removeClass().addClass("fadeInUp");
        }
        var backgroundTrans = ($(this).find(".background").height()-heroHeight)*scrollFraction;
        var midbackTrans = ($(this).find(".midback").height()-heroHeight)*scrollFraction;
        var midgroundTrans = -1*($(this).find(".midground").height()-heroHeight)*scrollFraction;
        var foregroundTrans = -1*($(this).find(".foreground").height()-heroHeight)*scrollFraction;
        $(this).find(".background").css("transform", "translateY(" + backgroundTrans + "px)");
        $(this).find(".midback").css("transform", "translateY(" + midbackTrans + "px)");
        $(this).find(".midground").css("transform", "translateY(" + midgroundTrans + "px)");
        $(this).find(".foreground").css("transform", "translateY(" + foregroundTrans + "px)");
        $(this).find(".scene-lit").css("opacity", (scrollFraction*4 - 2))
      }
    });
    scrollValue = currentScroll;
}

function updatePageIdle() {
  $(".firefly_test").each(function() {
    if (isScrolledIntoView($(this)) && Math.random() < 0.01) {
      var scaleFactor = Math.random() + 0.5;
      $(this).css("transform", "translate(" + (Math.random()*100) + "px, " + (Math.random()*100) + "px) scale(" + scaleFactor + ", " + scaleFactor + ")");
    }
  });
  if (autoScroll == true) {
    $(document).scrollTop($(document).scrollTop() + autoScrollSpeed);
  }
}

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = elem.offset().top;
    var elemBottom = elemTop + elem.height();
    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
}
