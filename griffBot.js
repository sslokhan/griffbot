//The Griffon Bot!
var _ = require('lodash');

var http = require('http');
var count = 0;

var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RtmClient = require('@slack/client').RtmClient;

var token = 'xoxb-85805621765-LgmWgVwB7eaa4ZiRi3DHCwfh';
var griffBot = new RtmClient(token, {logLvel: 'debug'});

var teamConversationList = {};
var teamMembersLists = {};

var mobileEnrollmentConversation;

//Start the Real Time Messaging app!
griffBot.start();

//Check to see if we're authenticated
griffBot.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
  console.log('Logged in as ' + rtmStartData.self.name + ' of team ' + rtmStartData.team.name + ', but not yet connected');
  console.log('Start Data: ');
  //console.log(rtmStartData);

  teamConversationList = rtmStartData.channels;
  teamMembersLists = rtmStartData.users;
  //
  console.log('All the conversations: ');
  console.log(teamConversationList);
  //
  // console.log('All the team members: ');
  // console.log(teamMembersLists);

});


griffBot.on(RTM_EVENTS.MESSAGE, function (message) {
  // Listens to all `message` events from the team

  console.log('New message: ');
  console.log(message);

  if (message.text == null)
    return;
  //if (message.text)
  if (message.text.indexOf('hey eric') > -1 ) {
    //then we shoudl respond with sarcasm!
    griffBot.sendMessage(
      ':face_with_rolling_eyes: ' + message.text,
      message.channel,
      function (){
        console.log('Sassed em good, boss');
      }
    );
  }
  else if (message.text.indexOf('cool') > -1) {
    griffBot.sendMessage('#YOLO :sunglasses:', message.channel);
  }
  else if (message.text.length > 150) {
    griffBot.sendMessage('Let me summarize this for the team: blah blah blah', message.channel);
  }
  else if (message.text.indexOf('mobile') > -1) {
    griffBot.sendMessage(':lark:', message.channel);
  }
  else if (message.text.indexOf('good job team') > -1) {
    griffBot.sendMessage(':benny: Team? Haha, you mean me?', message.channel);
  }
  else if (message.text.length <10 ) {

      
      count = count +1;

      if (count <10)
        return;
      else count=0;


      url='http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+message.text;
        // After the response is completed, parse it and log it to the console

      var request = http.get(url, function (response) {
          // data is streamed in chunks from the server
          // so we have to handle the "data" event    
          var buffer = "", 
              data,
              route;

          response.on("data", function (chunk) {
              buffer += chunk;
          }); 

          response.on("end", function (err) {
              // finished transferring data
              // dump the raw data
              console.log(buffer);
              console.log("\n");
              data = JSON.parse(buffer);
              console.log(data);
              griffBot.sendMessage(message.text+' '+data.data.url, message.channel);
              return;
          
          }); 
      }); 
  }
  
  else if (message.text.indexOf('good job team') > -1) {
    griffBot.sendMessage(':benny: Team? Haha, you mean me?', message.channel);
  }
  else if (message.text.indexOf('eric') > -1 && message.text.indexOf('question') > -1) {
    console.log('we got a question boss!');

    griffBot.sendMessage(
      ':thinking_face: Interesting...Interesting.',
      message.channel,
      function (){
        console.log('Sassed em good, boss');
      }
    );
  }
});

// you need to wait for the client to fully connect before you can send messages
griffBot.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function () {

  console.log('Connected to the server');

  //Ok, let's print the mobile enrollment conversation
  mobileEnrollmentConversation =  _.filter(teamConversationList,
      {name: 'mobile-enrollment'}
  )[0];
});

