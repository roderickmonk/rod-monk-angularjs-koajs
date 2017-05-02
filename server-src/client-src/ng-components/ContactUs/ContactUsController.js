"use strict";

angular.module('ttc')
	.controller("ContactUsController", ['$scope', '$http', ($scope, $http) =>

		$http.get('ng-components/ContactUs/ttc_exec.json')
			.then(response => $scope.executive = response.data)]);