angular.module('App.directives')
  .directive('appVersion', ['versionService',
    function(versionService) {
      "use strict";

      return function(scope, elm, attrs) {
      	versionService.getVersion().then(function(data) {
			elm.text(data.version);
      	});   
      };
    }
  ]);