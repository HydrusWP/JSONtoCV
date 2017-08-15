$(document).ready(function() {

    var overlay = $("#overlay");

    $(".x").click(function() {
        overlay.fadeOut(500);
    });
    $(".open").click(function() {
        overlay.fadeIn(500);
    });

});
