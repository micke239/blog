angular.module('App.filters').
	filter('interpolate', ['versionService',
	  function(versionService) {
	    "use strict";
	    var version;

	    versionService.getVersion().then(function(data) {
	    	version = data.version;
	    });
	
	    return function(text) {
	      return String(text).replace(/\%VERSION\%/mg, version);
	    };
	  }
	]);