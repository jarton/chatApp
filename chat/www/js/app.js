// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('chatController', function($scope, server){
	$scope.num = 0;
	//server.getMsg(this.num).then(function(data){
	//$scope.messages = data;	
	//});
	$scope.msg = "";
	var update = function recusive () {
			console.log("rec called")
			server.getMsg(this.num).then(function(data){
				$scope.messages = data;	
				recusive();
			});
	};
	$scope.sendChat = function(msg){
		server.sendChat(msg);
	}; 
	update();
	//var timer = setInterval(update, 1000);             	
})

.factory('server', function($http){
	var server = {
		getMsg: function(num) {
			var promise = $http.get('http://localhost:8080/poll/'+num)
				.then(function(res) {
					console.log(res.data.append);
					return res.data.append;	
				});
			return promise;
		},
		sendChat: function(msg){
			$http.get('http://localhost:8080/msg/'+msg);
		} 
	};
	return server;
});

