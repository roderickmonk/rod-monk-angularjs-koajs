"use strict";

angular.module('ttc')
	.controller("ContactUsController", ['$scope', '$http', function ($scope, $http) {

		$scope.executive = [];

		$http.get('/client-build/ng-components/ContactUs/ttc_exec.json')
			.then(response => $scope.executive = response.data);

	}]);