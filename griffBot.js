//The Griffon Bot!
var _ = require('lodash');

var http = require('http');
var count = 0;

// var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
// var RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;
// var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;


const { RTMClient } = require('@slack/rtm-api');
const griffBot = new RTMClient(token);

// var griffBot = new RtmClient(token, {logLvel: 'debug'});

var teamConversationList = {};
var teamMembersLists = {};

var mobileEnrollmentConversation;

griffBot.on('message', (event) => {
  console.log(event);

  if (event.channel != "CSHRSC9GW" &&
      event.channel != "GTLA3JPPB")
    return;

  if (event.text.includes('enroll in one acre fund')) {
    console.log('hi')
    griffBot.sendMessage(
      "Great! Are you currently a One Acre Fund farmer?",
      event.channel,
      function (){
        console.log('Sassed em good, boss');
      }
    );
  }
  else if (event.text.includes('yes')) {
    griffBot.sendMessage(
      "Welcome back to One Acre Fund! What's your Account Number?",
      event.channel,
      function (){
        console.log('Sassed em good, boss');
      }
    );
  }
  else if (event.text.includes('no')) {
    griffBot.sendMessage(
      "It's a pleasure to meet you! 😊 Where is your field located?",
      event.channel,
      function (){
        console.log('Sassed em good, boss');
      }
    );
  }
  else if (event.text.includes('district') ||
          event.text.includes('site')) {
    griffBot.sendMessage(
      "Perfect! That's a beautiful spot. How big is your field?",
      event.channel,
      function (){
        console.log('Sassed em good, boss');
      }
    );
  }
  else if (event.text.includes('acres')) {
    griffBot.sendMessage(
      "Wow! 🤩 That's a lot of land! What color is the soil?",
      event.channel,
      function (){
        console.log('Sassed em good, boss');
      }
    );
  }
  else if (event.text.includes('red') ||
   event.text.includes('grey')) {
     griffBot.sendMessage(
       "Hmmm, sounds like we should work on that... 🤔 Have you ever used lime before?",
       event.channel,
       function (){
         console.log('Sassed em good, boss');
       }
     );
   }
   else if(event.text.includes('brown') ||
          event.text.includes('black')) {
    griffBot.sendMessage(
      "Sounds like a healthy field! 🥰 Have you ever planted in this field before?",
      event.channel,
      function (){
        console.log('Sassed em good, boss');
      }
    );
    }
    else if(event.text.includes('tomato') ||
           event.text.includes('greens')) {
     griffBot.sendMessage(
       "Sounds yummy! 😋 Are you married?",
       event.channel,
       function (){
         console.log('Sassed em good, boss');
       }
     );
   }
   else if(event.text.includes('lovely')) {
    griffBot.sendMessage(
      "Wonderful! How many kids do you have?",
      event.channel,
      function (){
        console.log('Sassed em good, boss');
      }
    );
  }
  else if(event.text.includes('kids')) {
   griffBot.sendMessage(
     "OK! We recommend that you purchase the following order: \r\n " +
     " - 5 acres of Simba 527 Maize 🌽 (30,300 RWF)\r\n " +
     " - 20 Kg of DAP 245 Fertilizer 🚜 (20,450 RWF)\r\n " +
     " - 1 gruevellia tree package 🌳 (free)\r\n " +
     " - 1 SunKing Pro 2 🔆 (35,200 RWF)\r\n" +
     "Total 💰: 85,950 RWF ",
     event.channel,
     function (){
       console.log('Sassed em good, boss');
     }
   );
 }
  else if (event.text.includes('maize') ||
    event.text.includes('beans') ||
    event.text.includes('groundnuts')
  ) {
      griffBot.sendMessage(
        "Great! How big is your field?",
        event.channel,
        function (){
          console.log('Sassed em good, boss');
        }
      );
    }

});

(async () => {
  await griffBot.start();
})();
