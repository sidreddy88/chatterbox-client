// YOUR CODE HERE:


var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  messages: [],
  friends:[]
};


app.init = function () {


};

app.send = function (message) {
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');

    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });

};

app.fetch = function() {
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      app.messages = data.results;
      app.clearMessages();
      for (var i =0; i < app.messages.length; i++) {
        app.addMessage(app.messages[i]);
      }
      console.log('chatterbox: Message received');
      console.log(data);
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.clearMessages = function () {
  $("#chats").empty();
};

app.addMessage = function(message) {
  var $messageBlock = $('<div class="message"></div>');
  var $userLink = $("<a href='#' class='username'></a>");
  $userLink.attr('data-user-id', message.username);
  $userLink.on("click", app.addFriend(message.username));
  $userLink.html(message.username + ":");
  $messageBlock.append($userLink);
  $messageBlock.append(" " + message.text);
  $("#chats").append($messageBlock);
};

app.addRoom = function(room) {
  var $roomBlock = $('<div></div>');
  $roomBlock.append(room.text);
  $("#roomSelect").append($roomBlock);
};

var message = {
  'username': 'shawndrost',
  'text': 'trololo',
  'roomname': '4chan'
};

app.addFriend = function (username) {
   app.friends.push(username);
}

app.submit = function(message) {

}

$("form").submit(function (event) {
  event.preventDefault();
  var messageText = $(this).find("textarea[name='message']").val();
  var messageObj = {};
  messageObj.text = messageText;
  messageObj.username = "anon";
  messageObj.roomname = "lobby";
  app.send(messageObj);
});

setInterval(app.fetch, 5000);




