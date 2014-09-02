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
//= require_tree ./templates
//= require_tree .

// creates the entire angular application 
var app = angular.module('GotyaaApp', ['ngResource', 'templates'])
  // configures $resource for the factories 
  .config(['$resourceProvider', function ($resourceProvider) {}])
  // factory for making ajaxy angular calls to the message database
  .factory('GotYaas', ['$resource', function($resource) {
    return $resource('http://localhost:3000/got_yaas');
  }])
  // controls adding the message and creating a new gotyaa 
  .controller('GotyaaController', ['$scope', function($scope) {
   
    // // pulls the sent gotYaas from the database
    // $scope.savedGotYaas = GotYaas.query(function(messages){
    //   return messages 
    //   }); 
    
    $scope.messages = [];

    // adds the content to the message 
    $scope.submit = function() {
      if ($scope.smsContent) {
        $scope.messages.push(this.smsContent);
        $scope.smsContent = '';
      }
    };
    // deletes a gotyaa before it is sent 
    $scope.removeMessage = function(message) {
      console.log('clicked removeMessage'); 
      var i = $scope.messages.indexOf(message); 
      $scope.messages.splice(i, 1);
    }; 

    $scope.addRecipient =function(message){
      console.log('clicked addRecipient'); 
    };

    $scope.sendMessage = function(message){
      console.log('clicked addRecipient'); 
    
    }; 

  }])

  // factory to make angular ajaxy requests to database 
  .factory('Recipients', ['$resource', function($resource) {
   // makes http request to the server 
   return $resource('http://localhost:3000/got_yaas/1/recipients');
  }]) 
  // controls adding the recipients to a new gotyaa 
  .controller('RecipientsController', ['$scope', function($scope) { 
    
    $scope.recipients = [];
    //submits a new recipient in the browser 
    $scope.submitRecipient = function() {
    console.log('RecipientsController submit clicked'); 
    if ($scope.recipient) {
      $scope.recipients.push(this.recipient);
      $scope.recipient = ''; 
    }
    };
  }]) 
  // makes a get request to the back-end for message status, displays status
  .controller('SentGotyaaController', ['$scope', 'Recipients','GotYaas', function($scope, Recipients, GotYaas) { 
    // pulls the sent gotYaas from the database
    $scope.savedGotYaas = GotYaas.query(function(messages){
      return messages 
      }); 
    //returns all recipients in a promise 
    $scope.recipients = Recipients.query(function(recipients){
      return recipients 
      });  

  }
]); 