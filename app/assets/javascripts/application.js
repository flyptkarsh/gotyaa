// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//= require jquery
//= require jquery_ujs

//= require angular
//= require angular-animate
//= require angular-resource
//= require angular-rails-templates
//= require_tree .

// creates the entire angular application 
var app = angular.module('GotyaaApp', ['ngResource', 'templates'])
  // configures $resource for the factories 
  .config(['$resourceProvider', function ($resourceProvider) {}])
  // factory for making ajaxy angular calls to the message database
  .factory('GotYaas', ['$resource', function($resource) {
    return $resource('http://igotyaa.herokuapp.com/got_yaas');
  }])
  // controls adding the message and creating a new gotyaa 
  .controller('GotyaaController', ['$scope', 'Recipients','GotYaas', function($scope, Recipients, GotYaas, TwilioMessage) {
   
    $scope.messagesPending = [];

    // adds the content to the message 
    $scope.submit = function() {
      if ($scope.smsContent) {
        $scope.messagesPending.push(this.smsContent);
        $scope.smsContent = '';
      }
    };
    // deletes a gotyaa before it is sent 
    $scope.removeMessage = function(message) {
      console.log('clicked removeMessage'); 
      var i = $scope.messagesPending.indexOf(message); 
      $scope.messagesPending.splice(i, 1);
    }; 
    // saves message to the db
    $scope.saveMessage = function(message, current_user_id ){
      console.log("save message clicked"); 
      var newGotyaa = new GotYaas(); 
      newGotyaa.user_id = current_user_id; 
      newGotyaa.content = message; 
      newGotyaa.$save();
      $scope.messages = GotYaas.query(function(messages){
        return messages 
        }); 
    };
    $scope 
  }])
  // factory to make angular ajaxy requests to database 
  .factory('Recipients', ['$resource', function($resource) {
   // makes HTTP request to the server 
   return $resource('http://igotyaa.herokuapp.com/recipients');
  }])
  .factory('TwilioMessage', ['$resource', function($resource) {
   // makes HTTP request to the server 
   return $resource('http://igotyaa.herokuapp.com/twilio/message');
  }])
  .factory('TwilioResponse', ['$resource', function($resource) {
   // makes HTTP request to the server 
   return $resource('http://igotyaa.herokuapp.com/twilio/response');
  }])     
  // makes a get request to the back-end for message status, displays status
  .controller('SentGotyaaController', ['$scope', 'Recipients','GotYaas', '$interval', 'TwilioMessage', function($scope, Recipients, GotYaas, $interval, TwilioMessage) { 

    // pulls the sent gotYaas from the database
    $scope.savedGotYaas = GotYaas.query(function(messages){
      return messages 
      }); 
    //returns all recipients in a promise 
    $scope.recipients = Recipients.query(function(recipients){
      return recipients 
      }); 
    
    // returns the ID of the clicked gotyaa
    $scope.thisGotyaa = function(gotYaaId, gotYaaContent) { 
      currentDOMGotYaaId = gotYaaId; 
      currentDOMGotYaaContent = gotYaaContent;  
    };

    // $scope.sendSMS = function(number) {
    //   var newTwilioSMSParams = new TwilioMessage(); 
    //   newTwilioSMSParams.from = '+16467621226'; 
    //   newTwilioSMSParams.to = number;
    //   newTwilioSMSParams.body = currentDOMGotYaaContent; 
    //   console.log(newTwilioSMSParams); 
    //   newTwilioSMSParams.$save();
    // }; 

    // submits and texts the recipient
    $scope.submitRecipient = function(recipient) {
    console.log(recipient, currentDOMGotYaaId);
      var newRecipient = new Recipients(); 
       newRecipient.name = $scope.recipient.name; 
       // formatting the phone number for twilio
       newRecipient.phone_number = ('+1' + $scope.recipient.phone_number); 
       newRecipient.got_yaa_id = currentDOMGotYaaId; 
       newRecipient.has_responded = false; 
       // sending the Twilio SMS 
      var newTwilioSMSParams = new TwilioMessage(); 
      newTwilioSMSParams.from = '+16467621226'; 
      newTwilioSMSParams.to = newRecipient.phone_number; 
      newTwilioSMSParams.body = currentDOMGotYaaContent; 
      console.log(newTwilioSMSParams); 
      newTwilioSMSParams.$save();
      console.log(newTwilioSMSParams);
      newRecipient.message_sent = true; 
      newRecipient.$save();
      $scope.recipient= []; 
    };
    // checks Twilio for any new messages 
    $scope.checkForResponses = function(){
      var newTwilioResponse = TwilioResponse.get();  
      console.log(newTwilioResponse); 
    }; 
  }
]); 