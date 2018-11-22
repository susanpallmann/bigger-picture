$(document).ready(function() {
    $("#top_hamburger").click(function() {
        if ($("#top_menu").is(":visible")) {
            $("#top_menu").css("display", "none");
            $("#top_menu li").css("height", "0px");
            $("#top_hamburger").css("transform", "rotate(0deg)");
        } else {
            $("#top_menu").css("display", "block");
            $("#top_menu li").css("height", "20px");
            $("#top_hamburger").css("transform", "rotate(90deg)");
        }
    });
});
