angular.module("App").config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: '/markup/partial1.html',
      controller: 'View1Controller'
    });
    $routeProvider.when('/view2', {
      templateUrl: '/markup/partial2.html',
      controller: 'View2Controller'
    });
    $routeProvider.otherwise({
      redirectTo: '/view1'
    });
  }
]);