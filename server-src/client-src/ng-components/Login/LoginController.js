"use strict";

const moment = require('moment');

// Login Controller
angular.module('ttc').controller("loginCtrl", ['$scope', 'UserService', '$modalInstance', '$window', 'MemberService',
	function ($scope, UserService, $modalInstance, $window, MemberService) {

		$scope.TTCDebug = false;

		$scope.member = {};
		$scope.already_have_a_password = 'Yes'; // As a default

		$scope.Login = () => {

			MemberService.loginMember($scope.already_have_a_password == 'Yes', $scope.member)
				.then(privileges => {
					UserService.loggedIn(privileges);
					$window.alert('Login Successful!');
					$modalInstance.close('Yes');
				})
				.catch(err => $window.alert(`Failure: ${err.data}, Status: ${err.status}`));
		}

		$scope.normalizeCanadianPostalCodes = () => {
			$scope.member.postcode = $scope.member.postcode.replace(' ', '').toUpperCase();
		};

		$scope.Cancel = () => {
			$modalInstance.dismiss('No');
		};

	}
]);