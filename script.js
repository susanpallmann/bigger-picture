$(document).ready(function() {
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
    var timer = setInterval(changeFireflyColor, 1000);
});
function changeFireflyColor() {
    $(".firefly_test").each(function() {
        var position = $(this).position();
        $(this).css("opacity", Math.random());
        $(this).css("top", position.top + 50*(Math.random()-0.5));
        $(this).css("left", position.left + 50*(Math.random()-0.5));
    });
}
