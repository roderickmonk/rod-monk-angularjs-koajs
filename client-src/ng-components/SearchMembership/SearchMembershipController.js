"use strict";

// Search Membership Controller
angular.module('ttc').controller('SearchMembershipCtrl', ['$scope', 'MemberService', '$window',
	function ($scope, MemberService, $window) {

		MemberService.getAllMembers()
			.then(data => $scope.members = data)
			.catch($window.alert);
	}]);
