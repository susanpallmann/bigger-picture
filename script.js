$(document).ready(function() {
    prev_scroll = $(document).scrollTop();
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
    window.addEventListener("scroll", changeFireflyColor);
});
function changeFireflyColor() {
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
    $(".animal").each(function() {
      var this_scroll = $(document).scrollTop();
      if ($(document).scrollTop()>$(this).offset().top) {
        console.log($(document).scrollTop());
        console.log($(this).top);
        $(this).css("margin-top", $(this).css("margin-top").replace(/[^-\d\.]/g, '') + this_scroll - prev_scroll);
        prev_scroll = this_scroll;
      }
    });
}
