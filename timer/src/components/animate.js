$(document).ready(function() {
    console.log("I'm ready");
    $("#nav").click(function (){
            console.log("click!");
                $('html, body').animate({
                    scrollTop: $("#learn_more").offset().top
                }, 500);
    });
});
