$("#burger").click(function() {
    if ($("#top_menu").is(":visible")) {
        $("#top_menu").css("display", "none");
        $("#burger").css("transform", "rotate(90deg)");
    } else {
        $("#ul_id").css("display", "inline-block");
        $("#burger").css("transform", "rotate(0deg)");
    }
});
