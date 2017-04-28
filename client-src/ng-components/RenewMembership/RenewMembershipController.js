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

		$scope.normalizeCanadianPostalCodes = () => {
			$scope.member.postcode = $scope.member.postcode.replace(' ', '').toUpperCase();
		};

		$scope.normalizePrimaryPhoneNumber = () => {
			$scope.member.primaryphone = normalizePhoneNumber($scope.member.primaryphone);
		};

		$scope.normalizeAlternativePhoneNumber = () => {
			$scope.member.alternativephone = normalizePhoneNumber($scope.member.alternativephone);
		};

		// Opens the Mission & Values modal
		$scope.openReleaseOfLiability = () => {
			console.log('Open Modal');
			var modalInstance = $modal.open({
				templateUrl: '/client-build/ng-templates/release-of-liability-waiver-and-claims.html',
				controller: 'ReleaseOfLiabilityController',
				size: '',
				backdrop: true,
				resolve: {}
			});

			//modalInstance.result.then(() => { }, () => { });
		};

		// Opens the Mission & Values modal
		$scope.openCommunicationsConsent = () => {
			var modalInstance = $modal.open({
				templateUrl: '/client-build/ng-templates/communications-consent.html',
				controller: 'CommunicationsConsentController',
				size: '',
				backdrop: true,
				resolve: {}
			});

			//modalInstance.result.then(() => { }, () => { });
		};

		// Opens the Mission & Values modal
		$scope.openPhotographConsent = () => {
			var modalInstance = $modal.open({
				templateUrl: '/client-build/ng-templates/photograph-consent.html',
				controller: 'PhotographConsentController',
				size: '',
				backdrop: true,
				resolve: {}
			});

			//modalInstance.result.then(() => { }, () => { });
		};

		// Opens the Mission & Values modal
		$scope.openFeeStructure = () => {
			var modalInstance = $modal.open({
				templateUrl: '/client-build/ng-templates/fees.html',
				controller: 'FeeStructureController',
				size: 'sm',
				backdrop: true,
				resolve: {}
			});

			//modalInstance.result.then(() => { }, () => { });
		};

	}]);

angular.module('ttc')
	.controller('FeeStructureController', ['$scope', '$modalInstance',
		function ($scope, $modalInstance) {

			$scope.Close = () => { $modalInstance.dismiss('cancel'); };
		}]);
