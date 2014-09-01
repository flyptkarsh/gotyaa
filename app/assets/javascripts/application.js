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
//= require angular-rails-templates
//= require_tree ./templates
//= require_tree .


var app = angular.module('GotyaaApp', ['templates']);

app.controller('GotyaaController', ['$scope', function($scope) {
    
    $scope.messages = [];
   
    
    $scope.submit = function() {
      if ($scope.smsContent) {
        $scope.messages.push(this.smsContent);
        $scope.smsContent = '';
      }
    };
    $scope.removeMessage = function(message) {
      console.log('clicked removeMessage'); 
      var i = $scope.messages.indexOf(message); 
      $scope.messages.splice(i, 1);
    }; 
}]);

app.controller('RecipientsController', ['$scope', function($scope) { 

    function RecipientsController() {
    $scope.recipients = [];
    this.recipient = [
      { name: 'bob', phone_number: '408 555 1212' }
    ]; 
  }; 

  $scope.submit = function() {
    console.log('RecipientsController submit clicked'); 
    if ($scope.recipient) {
      $scope.recipients.push(this.recipient);
      $scope.recipient = ''; 
    }
  };
}]);  

