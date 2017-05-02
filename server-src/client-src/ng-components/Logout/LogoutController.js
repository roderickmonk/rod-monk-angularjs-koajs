"use strict";

// Logout Controller
angular.module('ttc').controller('logoutCtrl', ['$scope', '$modalInstance', 'UserService',
	function ($scope, $modalInstance, UserService) {
		$scope.ok = function () {
			UserService.loggedOut();
			$modalInstance.close('Yes');
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('No');
		};
	}]);