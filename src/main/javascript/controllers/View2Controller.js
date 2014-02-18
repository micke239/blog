angular.module('App.controllers')
  .controller('View2Controller', ['$scope', "versionService", function($scope, versionService) {
  	versionService.getVersion().then(function(data) {
  		$scope.viewName = data.version;
  	}, function(data) {
  		$scope.viewName = "fail"
  	});
  }]);