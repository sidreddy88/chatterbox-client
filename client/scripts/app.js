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

// app.fetch = function () {
//   debugger;
//   var chaterbox = Parse.Object.extend("chatterbox");
//   var query = new Parse.Query(chaterbox);
//   // Sorts the results in ascending order by the score field
//    query.ascending("createdAt");
//    query.find({
//   success: function(results) {
//     alert("Successfully retrieved " + results.length + " scores.");
//     // Do something with the returned Parse.Object values
    
//   },
//   error: function(error) {
//     alert("Error: " + error.code + " " + error.message);
//   }

// });

// };

app.fetch = function() {
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      app.messages = data.results;
      app.clearMessages();
      for (var i =0; i < app.messages.length; i++) {
        var object = app.messages[i];
        object["username"] = _.escape(object["username"]);
        object["text"] = _.escape(object["text"]);
        object["roomname"] = _.escape(object["roomname"]);
        app.addMessage(object);
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




