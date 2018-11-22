$(document).ready(function() {
    $("#top_hamburger").click(function() {
        if ($("#top_menu").height() > 0) {
            $("#top_menu").css("height", "0px");
            $("#top_menu li").css("height", "0px");
            $("#top_menu li").css("color", "transparent");
            $("#top_hamburger").css("transform", "rotate(0deg)");
        } else {
            $("#top_menu").css("height", "50px");
            $("#top_menu li").css("height", "20px");
            $("#top_menu li").css("color", "#fff");
            $("#top_hamburger").css("transform", "rotate(90deg)");
        }
    });
    var timer = setInterval(changeFirefly, 100);
});
function changeFirefly() {
    var position = $("#firefly_test").position();
    $("#firefly_test").css("background", "rgba(253, 239, 195, " + Math.random());
    $("#firefly_test").css("top", position.top);
    $("#firefly_test").css("left", position.left);
}
