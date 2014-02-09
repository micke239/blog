angular.module('App.controllers', []);
angular.module('App.directives', []);
angular.module('App.filters', []);
angular.module('App.services', []);

// Declare app level module which depends on filters, and services
angular.module('App', [
  'ngRoute',
  'App.services',
  'App.directives',
  'App.filters',
  'App.controllers'
]);