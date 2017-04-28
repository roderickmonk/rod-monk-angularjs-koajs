"use strict";

// Search Membership Controller
angular.module('ttc').controller('SearchMembershipCtrl', ['$scope', 'MemberService', '$window',
	function ($scope, MemberService, $window) {

		MemberService.getAllMembers()
			.then(members => $scope.members = members)
			.catch($window.alert);
	}]);
