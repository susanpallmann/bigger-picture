$(document).ready(function() {
    scrollValue = $(document).scrollTop();
    spaceHeight = $(".animal .space").height();
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
    //window.setInterval(checkScroll, 10);
    window.addEventListener("scroll", updatePage);
});

function checkScroll() {
  var currentScroll = $(document).scrollTop();
  if (scrollValue != currentScroll) {
      updatePage(scrollValue, currentScroll);
      scrollValue = currentScroll;
  }
}
function updatePage(prevScroll, currentScroll) {
    $(".firefly_test").each(function() {
        if(Math.random() < 0.05) {
            var value = Math.random();
            $(this).css("opacity", value*value);
            var position = $(this).position();
            $(this).css("top", position.top);
            $(this).css("left", position.left);
            $(this).css("top", position.top + 100*(Math.random()-0.5));
            $(this).css("left", position.left + 100*(Math.random()-0.5));
        }
    });
    currentScroll = $(document).scrollTop();
    $(".animal").each(function() {
      var offsetAmount = currentScroll - $(this).offset().top;
      if (currentScroll <= $(this).offset().top && $(this).children(".space").height() < spaceHeight) {
        $(this).css("padding-top", currentScroll - $(this).offset().top + "px");
        $(this).children(".space").height(spaceHeight - currentScroll + $(this).offset().top);
      }
      if (currentScroll > $(this).offset().top && $(this).children(".space").height() > 0) {
        $(this).css("padding-top", offsetAmount + "px");
        $(this).children(".space").height(spaceHeight - offsetAmount);
      }
    });
    scrollValue = currentScroll;
}
