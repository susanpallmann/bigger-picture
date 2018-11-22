$(document).ready(function() {
    $("#top_hamburger").click(function() {
        if ($("#top_menu").is(":visible")) {
            $("#top_menu").css("display", "none");
            $("#top_hamburger").css("transform", "rotate(90deg)");
        } else {
            $("#top_menu").css("display", "block");
            $("#top_hamburger").css("transform", "rotate(0deg)");
        }
    });
});
