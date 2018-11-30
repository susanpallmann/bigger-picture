$(document).ready(function() {
    
    /* Adjust these global variables */
    // Speed of population number animation (milliseconds). Ideally, keep it divisible by 30.
    populationAnimSpeed = 510;
    // Speed of hamburger animation (milliseconds). Should match CSS animation speed.
    hamburgerAnimSpeed = 400;
    /* End adjustable variables */
    
    /* Do not adjust these global variables */
    populationNumberTimer = populationAnimSpeed/30;
    autoScroll = false;
    scrollValue = $(document).scrollTop();
    spaceHeight = $(".animal .heroboundary").height();
    /* End global variables */
    
    $("#top_hamburger").click(function() {
        if ($(this).hasClass("animcomplete")) {
            $(this).removeClass("animcomplete");
            $(this).addClass("closed");
            $("#top_menu li").css("font-size", "0");
            $("#top_menu li").css("color", "transparent");
            setTimeout(function() {
              $("#top_hamburger").removeClass("closed");
            }, hamburgerAnimSpeed);
        } else {
            $(this).addClass("open");
            $("#top_menu li").css("font-size", "1.2em");
            $("#top_menu li").css("color", "#fff");
            setTimeout(function() {
              $("#top_hamburger").removeClass("open");
              $("#top_hamburger").addClass("animcomplete");
            }, hamburgerAnimSpeed);
        }
    });
    window.setInterval(checkScroll, 30);
    $(".button#auto-scroll").click(function() {
      if (!autoScroll) {
        autoScroll = true;
        $(".button#auto-scroll").css("background-color", "#F3AF52");
      } else {
        autoScroll = false;
        $(".button#auto-scroll").css("background-color", "#777");
      }
    });
    updatePageOnScroll(scrollValue, scrollValue);
});

function checkScroll() {
  var currentScroll = $(document).scrollTop();
  updatePageIdle();
  if (scrollValue != currentScroll) {
      updatePageOnScroll(scrollValue, currentScroll);
  }
}
function updatePageOnScroll(prevScroll, currentScroll) {
    currentScroll = $(document).scrollTop();
    $(".animal").each(function() {
      var heroTop = $(this).find(".hero").offset().top;
      if (isScrolledIntoView($(this))) {
        var offsetAmount = currentScroll - $(this).offset().top;
        var space = $(this).children(".heroboundary");
        if (offsetAmount > spaceHeight) {
          offsetAmount = spaceHeight;
        }
        var parallaxDistance = offsetAmount + $(window).height();
        var totalParallax = spaceHeight + $(window).height();
        var scrollFraction = parallaxDistance/totalParallax;
        var heroHeight = $(this).find(".hero").height();
        if (parallaxDistance < 0) {
          parallaxDistance = 0;
        }
        if (Math.abs($(this).find(".hero").offset().top - currentScroll) < 2) {
            console.log("yes");
            if (autoScroll) {
                scrollDownOne();
                setTimeout(scrollDownOne, 15);
            }
        }
        if (scrollFraction > 0.3) {
          $(this).find(".hero h2.fadeInUp").removeClass();
          $(this).find(".hero h2.text-first").removeClass().addClass("fadeInUp");
        } else if (scrollFraction > 0.6) {
          $(this).find(".hero h2.fadeInUp").removeClass();
          $(this).find(".hero h2.text-second").removeClass().addClass("fadeInUp");
        }
        var backgroundTrans = ($(this).find(".background").height()-heroHeight)*scrollFraction;
        var midbackTrans = ($(this).find(".midback").height()-heroHeight)*scrollFraction;
        var midgroundTrans = -1*($(this).find(".midground").height()-heroHeight)*scrollFraction;
        var foregroundTrans = -1*($(this).find(".foreground").height()-heroHeight)*scrollFraction;
        $(this).find(".text").css("transform", "translateY(" + (-1*offsetAmount) + "px)");
        $(this).find(".background").css("transform", "translateY(" + backgroundTrans + "px)")
                                   .css("filter", "blur(" + (1-scrollFraction) + ")");
        $(this).find(".midback").css("transform", "translateY(" + midbackTrans + "px)");
        $(this).find(".midground").css("transform", "translateY(" + midgroundTrans + "px)");
        $(this).find(".foreground").css("transform", "translateY(" + foregroundTrans + "px)");
        $(this).find(".scene-lit").css("opacity", (scrollFraction*4 - 2));
        $(this).find(".blueoverlay").css("background-color", "rgba(28, 69, 84, " + (1-scrollFraction) + ")");
      }
    });
    scrollValue = currentScroll;
}

function updatePageIdle() {
  $(".firefly_test").each(function() {
    if (isScrolledIntoView($(this)) && Math.random() < 0.01) {
      var scaleFactor = Math.random() + 0.5;
      $(this).css("transform", "translate(" + (Math.random()*100) + "px, " + (Math.random()*100) + "px) scale(" + scaleFactor + ", " + scaleFactor + ")");
    }
  });
  if (autoScroll) {
    scrollDownOne();
    setTimeout(scrollDownOne, 7);
    setTimeout(scrollDownOne, 8);
    setTimeout(scrollDownOne, 7);
  }
  var populationCounter = $(".populationNumber").length;
  $(".populationNumber").each(function() {
    var targetNumber = Number($(this).attr("alt").replace(",", ""));
    if (isScrolledIntoView($(this))) {
      if (populationNumberTimer > 0) {
        $(this).text(Math.round(((populationAnimSpeed/30-populationNumberTimer)/(populationAnimSpeed/30))*targetNumber).toLocaleString());
        populationNumberTimer --;
      } else {
        $(this).text(targetNumber.toLocaleString());
      }
    } else {
      $(this).text("0");
      populationCounter --;
      if (populationCounter <= 0) {
        populationNumberTimer = populationAnimSpeed/30;
      }
    }
  });
  $(".footprint").each(function() {
    if(isScrolledIntoView($(this))) {
      $(this).fadeTo(1, 1);
    } else {
      $(this).css("opacity", "0");
    }
  });
}
function scrollDownOne() {
  $(document).scrollTop($(document).scrollTop() + 1);
}
function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = elem.offset().top;
    var elemBottom = elemTop + elem.height();
    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
}
