$(document).ready(function() {
    $(".welcome").hide(0).delay(500).fadeIn(3000, function() {
        $(".my").hide(0).delay(500).fadeIn(3000, function() {
            $(".here").hide(0).delay(500).fadeIn(3000);
            $(".buttons").hide(0).delay(500).fadeIn(3000);
              $(".rotate").hide(0).delay(500).fadeIn(3000);
        });
    });
});

$(".arrow").click(function(){
  $('html, body').animate({
      scrollTop: $(".projects").offset().top
  }, 1000);
})
