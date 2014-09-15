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
    return $resource('/got_yaas/:gotYaaId', {gotYaaId: '@gotYaaId'});
  }])
  // factory to make angular ajaxy requests to database 
  .factory('Recipients', ['$resource', function($resource) {
   // makes HTTP request to the server 
   return $resource('/recipients/:id', {id: '@id'});
  }])
  .factory('TwilioMessage', ['$resource', function($resource) {
   // makes HTTP request to the server 
   return $resource('/twilio/message');
  }])
  .factory('TwilioResponse', ['$resource', function($resource) {
   // makes HTTP request to the server 1
   return $resource('/twilio/response');
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
      $scope.messagesPending = [];  
    };
  }])    
  // makes a get request to the back-end for message status, displays status
  .controller('SentGotyaaController', ['$scope', 'Recipients','GotYaas', '$http', 'TwilioMessage', 'TwilioResponse', function($scope, Recipients, GotYaas, $http, TwilioMessage, TwilioResponse) { 
    
    // pulls the sent gotYaas from the database
    $scope.refreshGotYaas = function(){
    console.log('refresh triggered'); 
    $scope.savedGotYaas = GotYaas.query(function(messages){
      return messages 
      }); 
    }; 

    //returns all recipients in a promise 
    $scope.refreshRecipients = function(){
      console.log('refresh recipients'); 
      $scope.recipients = Recipients.query(function(recipients){
      return recipients 
      }); 
    }; 

    $scope.updateRecipients = function() {
      $http.put("/recipients"); 
      console.log('updateRecipients triggered'); 
    };  

    $scope.updateRecipients(); 

    $scope.refreshAll = function() {
      $scope.refreshRecipients(); 
      $scope.refreshGotYaas();
      $scope.updateRecipients(); 
    }; 

    $scope.refreshRecipients(); 
    $scope.refreshGotYaas(); 
    // returns the ID of the clicked gotyaa
    $scope.thisGotyaa = function(gotYaaId, gotYaaContent) { 
      currentDOMGotYaaId = gotYaaId; 
      currentDOMGotYaaContent = gotYaaContent; 
      console.log(currentDOMGotYaaId, currentDOMGotYaaContent);  
    };

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
    // Deletes a gotYaa message from the database
    $scope.deleteGotYaa = function() {
      GotYaas.delete({gotYaaId: currentDOMGotYaaId});
      $scope.refreshGotYaas();   
    }; 
    // checks Twilio for any new messages 
    $scope.checkForResponses = function(){
      var newTwilioResponse = new TwilioResponse(); 
      console.log(newTwilioResponse);  
    }; 
  }
]); 