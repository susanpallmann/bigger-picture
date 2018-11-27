$(document).ready(function() {
    scrollValue = $(document).scrollTop();
    spaceHeight = $(".animal .heroboundary").height();
    $("#top_hamburger").click(function() {
        if ($("#top_menu").height() > 0) {
            $("#top_menu li").css("font-size", "0");
            $("#top_menu li").css("color", "transparent");
            $("#top_hamburger").css("transform", "rotate(0deg)");
        } else {
            $("#top_menu li").css("font-size", "1.2em");
            $("#top_menu li").css("color", "#fff");
            $("#top_hamburger").css("transform", "rotate(90deg)");
        }
    });
    window.setInterval(checkScroll, 30);
});

function checkScroll() {
  var currentScroll = $(document).scrollTop();
  if (scrollValue != currentScroll) {
      updatePage(scrollValue, currentScroll);
  }
}
function updatePage(prevScroll, currentScroll) {
    currentScroll = $(document).scrollTop();
    $(".animal").each(function() {
      $(this).find(".firefly-test").each(function() {
        if(Math.random() < 0.05) {
          var value = Math.random();
          $(this).css("opacity", value*value);
          var position = $(this).position();
          $(this).css("transform", "translateX(" + position.top + 100*(Math.random()-0.5) + "px) translateY(" + position.left + 100*(Math.random()-0.5) + "px)");
        }
      });
      if (isScrolledIntoView($(this))) {
        var offsetAmount = currentScroll - $(this).offset().top;
        var space = $(this).children(".heroboundary");
        if (offsetAmount > spaceHeight) {
          offsetAmount = spaceHeight;
        }
        $(this).find(".background").css("transform", "translateY(" + 0.05*offsetAmount + "px)");
        $(this).find(".midback").css("transform", "translateY(" + 0.025*offsetAmount + "px)");
        $(this).find(".midground").css("transform", "translateY(" + 0.025*(spaceHeight - offsetAmount) + "px)");
        $(this).find(".foreground").css("transform", "translateY(" + 0.05*(spaceHeight - offsetAmount) + "px)");
      }
    });
    scrollValue = currentScroll;
}

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = elem.offset().top;
    var elemBottom = elemTop + elem.height();
    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
}
