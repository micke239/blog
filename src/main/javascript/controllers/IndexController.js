angular.module('App.controllers')
  .controller('IndexController', ["$scope", function($scope) {
    "use strict";
    
    $scope.myVar = "hello";
  }]);