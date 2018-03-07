'use strict';
var app=angular.module('myApp', ['ngSanitize']);
/* Exception handling */
/*app.config(function ($provide) {
	$provide.decorator('$exceptionHandler', function ($delegate) {
		return function (exception, cause) {
			$delegate(exception, cause);
			alert('Error occurred! Please contact admin.');
		};
	});
});*/
app.controller('myCtrl', function($scope, $http) {
	$http.get("item-data.json")
	.then(function(response) {
		$scope.CatalogEntryView = response.data.CatalogEntryView;
	});
});
app.filter('slice', function() {
	return function(arr, start, end) {
		return arr.slice(start, end);
	};
});
