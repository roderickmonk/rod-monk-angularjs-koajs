"use strict";

// Renew Membership Controller
angular.module('ttc').controller('renewMembershipCtrl', ['$scope', 'placesService', 'MemberService', '$modalInstance', '$window', '$modal',
	function ($scope, placesService, MemberService, $modalInstance, $window, $modal) {

		$scope.member = {};
		$scope.allemailaddresses = [];
		$scope.places = placesService.get();
		$scope.TTCDebug = false;

		MemberService.getAllEmailAddresses()
			.then(emailaddresses => $scope.allemailaddresses = emailaddresses)
			.catch($window.alert);

		MemberService.getMember()
			.then(member => {
				$scope.member = member;
				$scope.confirmemailaddress = member.emailaddress;
				$scope.member.student = false;
				$scope.member.liabilityagreed = false;
				$scope.member.communicationsagreed = false;
				$scope.member.photoagreed = false;
			})
			.catch($window.alert);

		$scope.Submit = () => {
			MemberService.saveMember($scope.member)
				.then(() => {
					$modalInstance.close('Yes');
					$window.alert('Renewal Application Accepted.  All fees must be paid on or before March 31st.');
				})
				.catch($window.alert);
		}

		$scope.Cancel = () => {
			$modalInstance.dismiss('No');
		};

		// Opens the Mission & Values modal
		$scope.openReleaseOfLiability = () => {
			console.log('Open Modal');
			var modalInstance = $modal.open({
				templateUrl: 'ng-templates/release-of-liability-waiver-and-claims.html',
				controller: 'ReleaseOfLiabilityController',
				size: '',
				backdrop: true,
				resolve: {}
			});
		};

		// Opens the Communications modal
		$scope.openCommunicationsConsent = () => {
			var modalInstance = $modal.open({
				templateUrl: 'ng-templates/communications-consent.html',
				controller: 'CommunicationsConsentController',
				size: '',
				backdrop: true,
				resolve: {}
			});
		};

		// Opens the Photo consent modal
		$scope.openPhotographConsent = () => {
			var modalInstance = $modal.open({
				templateUrl: 'ng-templates/photograph-consent.html',
				controller: 'PhotographConsentController',
				size: '',
				backdrop: true,
				resolve: {}
			});
		};

		// Opens the Fees modal
		$scope.openFeeStructure = () => {
			var modalInstance = $modal.open({
				templateUrl: 'ng-templates/fees.html',
				controller: 'FeeStructureController',
				size: 'sm',
				backdrop: true,
				resolve: {}
			});
		};
	}]);

angular.module('ttc')
	.controller('FeeStructureController', ['$scope', '$modalInstance',
		function ($scope, $modalInstance) {

			$scope.Close = () => { $modalInstance.dismiss('cancel'); };
		}]);
