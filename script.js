$(document).ready(function() {
    
    /* Adjust these global variables */
    // Speed of population number animation (milliseconds). Ideally, keep it divisible by 30.
    populationAnimSpeed = 510;
    // Speed of hamburger animation (milliseconds). Should match CSS animation speed.
    hamburgerAnimSpeed = 400;
    // The minimum width (px) at which dynamic opacity functions still occur.
    mediaCutOff = 750;
    // The vertical speed of the sun for a given species.
    sunVerticalBison = -200;
    sunVerticalDevil = -300;
    sunVerticalTamarin = -300;
    sunVerticalCondor = -200;
    sunVerticalAddax = -200;
    sunVerticalStickbug = -300;
    sunVerticalRhino = 200;
    // The horizontal speed of the sun for a given species.
    sunHorizontalBison = 200;
    sunHorizontalDevil = 200;
    sunHorizontalTamarin = 100;
    sunHorizontalCondor = 200;
    sunHorizontalAddax = 200;
    sunHorizontalStickbug = 100;
    sunHorizontalRhino = -200;
    /* End adjustable variables */
    
    /* Do not adjust these global variables */
    populationNumberTimer = populationAnimSpeed/30;
    scrollValue = $(document).scrollTop();
    spaceHeight = $(".animal .heroboundary").height();
    screenWidth = screen.width;
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
    $(".toTop").click(scrollToTop);
    $("h1").click(scrollToTop);
    window.setInterval(checkScroll, 30);
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
        if (scrollFraction > 0.3) {
          $(this).find(".hero h2.fadeInUp").removeClass();
          $(this).find(".hero h2.text-first").removeClass().addClass("fadeInUp");
        } else if (scrollFraction > 0.6) {
          $(this).find(".hero h2.fadeInUp").removeClass();
          $(this).find(".hero h2.text-second").removeClass().addClass("fadeInUp");
        }
        var backgroundTrans = ($(this).find(".background").height()-heroHeight)*scrollFraction;
        var waterfallTrans = (($(this).find("#waterfall").height()-heroHeight)*scrollFraction)*3;
        var midbackTrans = ($(this).find(".midback").height()-heroHeight)*scrollFraction;
        var midgroundTrans = -1*($(this).find(".midground").height()-heroHeight)*scrollFraction;
        var foregroundTrans = -1*($(this).find(".foreground").height()-heroHeight)*scrollFraction;
        $(this).find(".text").css("transform", "translateY(" + (-1*offsetAmount) + "px)");
        var thisId = $(this).attr("id");
        if (thisId === "bison") {
            $(this).find(".sun").css("transform", "translate(" + (Math.sqrt(1-scrollFraction)*sunHorizontalBison) + "px, " + (Math.sqrt(scrollFraction)*sunVerticalBison) + "px)");
        } else if (thisId === "devil") {
            $(this).find(".sun").css("transform", "translate(" + (Math.sqrt(1-scrollFraction)*sunHorizontalDevil) + "px, " + (Math.sqrt(scrollFraction)*sunVerticalDevil) + "px)");
        } else if (thisId === "tamarin") {
            $(this).find(".sun").css("transform", "translate(" + (Math.sqrt(1-scrollFraction)*sunHorizontalTamarin) + "px, " + (Math.sqrt(scrollFraction)*sunVerticalTamarin) + "px)");
        } else if (thisId === "condor") {
            $(this).find(".sun").css("transform", "translate(" + (Math.sqrt(1-scrollFraction)*sunHorizontalCondor) + "px, " + (Math.sqrt(scrollFraction)*sunVerticalCondor) + "px)");
        } else if (thisId === "addax") {
            $(this).find(".sun").css("transform", "translate(" + (Math.sqrt(1-scrollFraction)*sunHorizontalAddax) + "px, " + (Math.sqrt(scrollFraction)*sunVerticalAddax) + "px)");
        } else if (thisId === "stickbug") {
            $(this).find(".sun").css("transform", "translate(" + (Math.sqrt(1-scrollFraction)*sunHorizontalStickbug) + "px, " + (Math.sqrt(scrollFraction)*sunVerticalStickbug) + "px)");
        } else if (thisId === "rhino") {
            $(this).find(".sun").css("transform", "translate(" + (Math.sqrt(1-scrollFraction)*sunHorizontalRhino) + "px, " + (Math.sqrt(scrollFraction)*sunVerticalRhino) + "px)");
        }
        $(this).find(".background").css("transform", "translateY(" + backgroundTrans + "px)");
        $(this).find(".midback").css("transform", "translateY(" + midbackTrans + "px)");
        $(this).find(".midground").css("transform", "translateY(" + midgroundTrans + "px)");
        $(this).find("#waterfall").css("transform", "translateY(" + waterfallTrans + "px)");
        $(this).find(".foreground").css("transform", "translateY(" + foregroundTrans + "px)");
        $(this).find(".scene-lit").css("opacity", (scrollFraction*4 - 2));
        if ($(this).attr("id") === "rhino") {
            if (scrollFraction > 0.4) {
                if (screenWidth > mediaCutOff) {
                    $(this).find(".sun").css("filter", "");
                    $(this).find(".background").css("filter", "");
                    $(this).find(".midback").css("filter", "");
                    $(this).find(".midground").css("filter", "");
                }
                $(this).find(".nightsky").css("opacity", "1");
                $(this).find("#star1").css("opacity", "1");
                if (scrollFraction > 0.45) {
                    $(this).find("#star2").css("opacity", "1");
                } else {
                    $(this).find("#star2").css("opacity", "0");
                }
                if (scrollFraction > 0.47) {
                    $(this).find("#star3").css("opacity", "1");
                } else {
                    $(this).find("#star3").css("opacity", "0");
                }
                if (scrollFraction > 0.50) {
                    $(this).find("#star4").css("opacity", "1");
                } else {
                    $(this).find("#star4").css("opacity", "0");
                }
                if (scrollFraction > 0.55) {
                    $(this).find("#star5").css("opacity", "1");
                } else {
                    $(this).find("#star5").css("opacity", "0");
                }
                if (scrollFraction > 0.6) {
                    $(this).find(".night:not(.stars)").css("opacity", "1");
                } else {
                    $(this).find(".night:not(.stars)").css("opacity", "0");
                }
            } else {
                $(this).find(".nightsky").css("opacity", "0");
                $(this).find(".night").css("opacity", "0");
                if (screenWidth > mediaCutOff) {
                  $(this).find(".sun").css("filter", "blur(" + ((0.55-scrollFraction)*32) + "px)");
                  $(this).find(".background").css("filter", "blur(" + ((0.55-scrollFraction)*32) + "px) saturate(" + (scrollFraction/2+0.775) + ")");
                  $(this).find(".midback").css("filter", "blur(" + ((0.55-scrollFraction)*16) + "px) saturate(" + (scrollFraction/2+0.775) + ")");
                  $(this).find(".midground").css("filter", "blur(" + ((0.55-scrollFraction)*8) + "px) saturate(" + (scrollFraction/2+0.775) + ")");
                }
            }
            $(this).find(".blueoverlay").css("background-color", "rgba(28, 69, 84, " + ((scrollFraction*(1/2))+(1/4)) + ")");
        } else {
            if (scrollFraction < 0.7 && screenWidth > mediaCutOff) {
                $(this).find(".sun").css("filter", "blur(" + ((0.7-scrollFraction)*32) + "px)");
                $(this).find(".background").css("filter", "blur(" + ((0.7-scrollFraction)*32) + "px) saturate(" + (scrollFraction/2+0.65) + ")");
                $(this).find(".midback").css("filter", "blur(" + ((0.7-scrollFraction)*16) + "px) saturate(" + (scrollFraction/2+0.65) + ")");
                $(this).find(".midground").css("filter", "blur(" + ((0.7-scrollFraction)*8) + "px) saturate(" + (scrollFraction/2+0.65) + ")");
            } else if (screenWidth > mediaCutOff) {
                $(this).find(".sun").css("filter", "");
                $(this).find(".background").css("filter", "");
                $(this).find(".midback").css("filter", "");
                $(this).find(".midground").css("filter", "");
            }
            $(this).find(".blueoverlay").css("background-color", "rgba(28, 69, 84, " + (1-scrollFraction) + ")");
        }
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
  $(".footprint-first").each(function() {
    if(isScrolledIntoFullView($(this))) {
      $(this).css("opacity", "1");
    } else {
      $(this).css("opacity", "0");
    }
  });
  $(".footprint-second").each(function() {
    var element = $(this);
    if(isScrolledIntoFullView($(this))) {
      setTimeout(function() {
        element.css("opacity", "1");
      }, 500);
    } else {
      $(this).css("opacity", "0");
    }
  });
  $(".footprint-third").each(function() {
    var element = $(this);
    if(isScrolledIntoFullView($(this))) {
      setTimeout(function() {
        element.css("opacity", "1");
      }, 1000);
    } else {
      $(this).css("opacity", "0");
    }
  });
}
function fadeIn(element) {
    element.css("opacity", "1");
}
function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = elem.offset().top;
    var elemBottom = elemTop + elem.height();
    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
}
function isScrolledIntoFullView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = elem.offset().top;
    var elemBottom = elemTop + elem.height();
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
function scrollToTop() {
    var scrollPosition = $(document).scrollTop()/2 - 10;
    window.scrollTo(0, scrollPosition);
    if (scrollPosition > 0) {
        setTimeout(scrollToTop, 10);
    }
}
