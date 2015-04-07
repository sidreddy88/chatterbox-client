// YOUR CODE HERE:


var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  messages: [],
  friends:[]
};

$('body').append('<div id="friends">FRIENDS</div>');
// $('body').append('<div id="chats"></div>');
// $('body').append('<div id="roomSelect"></div>');

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
  debugger;
  $userLink.on("click", app.addFriend);
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

app.addFriend = function () {
  debugger;
   app.friends.push($(this).data('userId'));
   app.displayFriends();
}

app.displayFriends = function () {
   $("#friends").empty();
   var friends = app.friends;
   for (var i = 0 ; i < friends.length; i++) {
     var $friend = $('<div></div>');
     $friend.append(friends[i]);
     $("#friends").append($friend);    
   }
};

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

$( "#inputValue" ).on( "keydown", function(event) {
  if(event.which == 13) {
    debugger;
    var messageText = $('#inputValue').val();
    prompt("What message do you want to send");
  }
        
});


setInterval(app.fetch, 5000);




