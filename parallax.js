window.addEventListener("scroll", function(e){
  // for all containers ("animal" class), get scroll position where:
  // 0% = when container first enters bottom of screen (i.e. when distance scrolled = distance from top of document
  // 100% = when container first leaves top of screen (i.e. when distance scrolled = distance from top of document + container height + viewport height)\
  // should be similar to svg code?
  // for all children... check class type
  // if class = "layer0/layer1/layer2/layer3/cloud/etc." then do... etc.
  $(".animal).each(function() {
    if ($(document).scrollTop()>$(this).top()) {
      $(this).css("margin-top", ($(document).scrollTop() - $(this).top()) + "px");
    }
  });
});
