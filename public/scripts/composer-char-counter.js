$(document).ready(function() {
  $("#tweet-text").keyup(function() {
    let counterElement = $(this).parent().find(".counter");
    let characterCount = 140 - $("#tweet-text").val().length;
    $(counterElement).text(characterCount);
    
    redCounter(characterCount);
    
  });
});

const redCounter = function(count) {
  if (count < 0) {
    $(".counter").css({"color": "red"});
    return;
  }
  $(".counter").css({"color": "#545149"});
};