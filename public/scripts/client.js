/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  timeago.render(document.querySelectorAll('.need_to_be_rendered'));
  
  function createTweetElement(tweetObj) {
    const $tweet = $(`<article class="tweet"></article>`);

    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const header = `
    <div class="tweet-header">
      <div class="name-avatar">
        <img src="${escape(tweetObj.user.avatars)}" width="50" height="50">
        <h2>${escape(tweetObj.user.name)}</h2>
      </div>
      <h3>${escape(tweetObj.user.handle)}</h3>
    </div>
    `;
    $tweet.append(header);

    const body = `
    <p class="tweet-body">${escape(tweetObj.content.text)}</p>
    `;
    $tweet.append(body);

    const footer = `
    <footer class="tweet-footer">
      <p class="need_to_be_rendered" datetime="${escape(tweetObj.created_at)}"></p>
      <div class="logos">
        <i class="fas fa-flag"></i>
        <i class="fas fa-heart"></i>
        <i class="fas fa-retweet"></i>
      </div>
    </footer>
    `
    $tweet.append(footer);
    console.log("date being passed: ", tweetObj.created_at);
    return $tweet;
  }

  function renderTweets(tweets) {
    for (let i = tweets.length - 1; i >= 0; i--) {
      const renderedTweet = createTweetElement(tweets[i]);
      // console.log("rendered tweet: ", renderedTweet);

      $("#tweet-container").append(renderedTweet);
    }
  };

///////////////////////////////////////////////////

$("form").submit(function(event) {
  event.preventDefault();
  let characterCount = $("#tweet-text").val().length;

  if (characterCount === 0 || characterCount > 140) {
    return alert("Tweet empty or too long")
  }
  serialized = $(this).serialize();

  $.ajax('/tweets', { method: 'POST', data: serialized })
  .then(function () {
    // console.log('Success: ', tweets);
    $("#tweet-text").val("")
    $("#tweet-container").empty();
  })
  .then(function() {
    loadTweets();
  });

  console.log("Serialized data: ", serialized);
  timeago.render(document.querySelectorAll('.need_to_be_rendered'));
  
});

function loadTweets() {
  $.ajax('/tweets', { method: 'GET' })
  .then(function (tweets) {
    console.log('Success: ', tweets);
    
    renderTweets(tweets)
  });
}
loadTweets();
// renderTweets(loadTweets());
// Timeago rendering
// timeago.render(document.querySelectorAll('.need_to_be_rendered'));
});
