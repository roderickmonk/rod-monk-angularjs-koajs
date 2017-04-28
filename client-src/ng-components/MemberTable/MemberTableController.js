"use strict";

angular.module('ttc').controller('MemberTableController', ['$scope', 'MemberService', 'UserService', '$window',
	function ($scope, MemberService, UserService, $window) {

		$scope.user = UserService;
		$scope.unpaidonly = false;
		$scope.notrenewedonly = false;
		$scope.allemailaddresses = [];

		MemberService.getAllEmailAddresses()
			.then(emailaddresses => $scope.allemailaddresses = emailaddresses)
			.catch($window.alert);

		MemberService.getAllMembers()
			.then(members => $scope.members = members)
			.catch($window.alert);

		$scope.TogglePaid = member => {
			member.paid = !member.paid;
			MemberService.saveMember(member)
				.catch($window.alert);
		}

		$scope.ToggleStudent = member => {
			member.student = !member.student;
			MemberService.saveMember(member)
				.catch($window.alert);
		}

		$scope.SelectExec = member =>
			MemberService.saveMember(member)
				.catch($window.alert);

		$scope.UpdateFamilyEmailAddress = member => {

			if (member.familyemailaddress == "" || $scope.allemailaddresses.indexOf(member.familyemailaddress) >= 0)
				MemberService.saveMember(member)
					.catch($window.alert);
			else
				$window.alert('Family Email Address is Unknown - Not Saved');
		}
	}]);