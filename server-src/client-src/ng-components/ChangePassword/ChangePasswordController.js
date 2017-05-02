"use strict";

// Change Password Controller
angular.module('ttc').controller('changePasswordController', ['$scope', 'UserService', '$modalInstance', '$window', 'MemberService',
	function ($scope, UserService, $modalInstance, $window, MemberService) {

		$scope.member = {};

		$scope.Save = () => {
			MemberService.changePassword($scope.member)
				.then(() => {
					$modalInstance.close('Yes');
					$window.alert('Your new password has been saved');
				})
				.catch($window.alert);
		};

		$scope.Cancel = () => {
			$modalInstance.dismiss('No');
		};
	}]);