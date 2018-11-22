$("#hamburger").click(function() {
    alert("this works");
    if ($("#top_menu").is(":visible")) {
        $("#top_menu").css("display", "none");
        $("#hamburger").css("transform", "rotate(90deg)");
    } else {
        $("#top_menu").css("display", "block");
        $("#hamburger").css("transform", "rotate(0deg)");
    }
});
