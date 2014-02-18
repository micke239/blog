angular.module('App.services')
	.factory('versionService', ["$http", "$q", function($http, $q) {
		var deferred;

		var getVersion = function() {
			if (!deferred) {
				deferred = $q.defer();
				$http.get("/version")
					.success(function(data) {
						deferred.resolve(data);
					})
					.error(function(data) {
						deferred.reject(data);
					});	
			}
			
			return deferred.promise;
		};

		return {
			getVersion : getVersion
		};
	}]);