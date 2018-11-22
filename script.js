$("#hamburger").click(function() {
    if ($("#top_menu").is(":visible")) {
        $("#top_menu").css("display", "none");
        $("#hamburger").css("transform", "rotate(90deg)");
    } else {
        $("#top_menu").css("display", "inline-block");
        $("#hamburger").css("transform", "rotate(0deg)");
    }
});
