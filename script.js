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
    var timer = setInterval(changeFirefly, 100);
});
function changeFirefly() {
    $(".firefly_test").each(function() {
        var position = $(this).position();
        $(this).css("background-image", "radial-gradient(rgba(253, 239, 195, " + Math.random() + "), transparent, transparent)");
        $(this).css("top", position.top + 30*(Math.random()-0.5));
        $(this).css("left", position.left + 30*(Math.random()-0.5));
    });
}
