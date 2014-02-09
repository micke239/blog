angular.module("App").config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/markup/partial1.html',
      controller: 'IndexController'
    });
    $routeProvider.when('/view2', {
      templateUrl: '/markup/partial2.html',
      controller: 'View2Controller'
    });
    $routeProvider.otherwise({
      redirectTo: '/'
    });
  }
]);