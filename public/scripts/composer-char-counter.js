$(document).ready(function() {
  // let counterElement = $(this).parent().find(".counter");
  let characterCount = $("#tweet-text").val().length;
  let countClass = "counter";

  function redCounter(count) {
    if (count < 0) {
      $(".counter").css({"color": "red"});
      return;
    } 
    $(".counter").css({"color": "#545149"});
  }
  
  $("#tweet-text").keyup(function () {
    let counterElement = $(this).parent().find(".counter");
    let characterCount = 140 - $("#tweet-text").val().length;
    $(counterElement).text(characterCount);
    
    redCounter(characterCount);
    
    // console.log("characterCount: ", characterCount)
  })
  // Timeago rendering
  // timeago.render(document.querySelectorAll('.need_to_be_rendered'));
});
