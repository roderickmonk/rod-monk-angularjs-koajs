"use strict";

// Search Membership Controller
angular.module('ttc').controller('SearchMembershipCtrl', ['$scope', 'MemberService', '$window',

	($scope, MemberService, $window) =>

		MemberService.getAllMembers()
			.then(members => $scope.members = members)
			.catch(err => $window.alert(JSON.stringify(err, null, 4)))

]);
