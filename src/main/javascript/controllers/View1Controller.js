angular.module('App.controllers')
  .controller('View1Controller', function($scope) {
    "use strict";

    $scope.viewName = "View 1";
    $scope.phones = [{
      'name': 'Nexus S',
      'snippet': 'Fast just got faster with Nexus S.'
    }, {
      'name': 'Motorola XOOM™ with Wi-Fi',
      'snippet': 'The Next, Next Generation tablet.'
    }, {
      'name': 'MOTOROLA XOOM™',
      'snippet': 'The Next, Next Generation tablet.'
    }];
  });