"use strict";

const util = require('../../assets/js/util.js');

// Join Controller
angular.module('ttc').controller('NewMembershipController', ['$scope', 'placesService', '$modalInstance', '$window', '$modal', 'MemberService',
	function ($scope, placesService, $modalInstance, $window, $modal, MemberService) {

		$scope.TTCDebug = false;

		$scope.new_applicant = true;
		$scope.member = {};
		// Default the checkboxes to unchecked
		$scope.member.liabilityagreed = $scope.member.communicationsagreed = $scope.member.photoagreed = $scope.member.student = false;

		$scope.places = placesService.get();

		$scope.Submit = function () {

			// Record the year of the application request
			$scope.member.joiningyear = moment().year();

			MemberService.saveNewMember($scope.member)
				.then(function () {
					$modalInstance.close('Yes');
					$window.alert('Your application to join the Tsawwassen Tennis Club has been saved.  ' +
						'Membership fees are due by March 31.  The fee structure and payment instructions can be found on the About Us page. ' +
						'Once your fees are paid, you will be able to Login using your email address and the password you provided.');
				})
				.catch($window.alert);
		}

		$scope.Cancel = function () {
			$modalInstance.dismiss('No');
		}

		$scope.normalizeCanadianPostalCodes = () => {
			$scope.member.postcode = $scope.member.postcode.replace(' ', '').toUpperCase();
		}

		$scope.normalizePrimaryPhoneNumber = () => {
			$scope.member.primaryphone = util.normalizePhoneNumber($scope.member.primaryphone);
		}

		$scope.normalizeAlternativePhoneNumber = () => {
			$scope.member.alternativephone = util.normalizePhoneNumber($scope.member.alternativephone);
		};

		// Opens the Mission & Values modal
		$scope.openReleaseOfLiability = () => {
			var modalInstance = $modal.open({
				templateUrl: 'ng-templates/release-of-liability-waiver-and-claims.html',
				controller: 'ReleaseOfLiabilityController',
				size: '',
				backdrop: true,
				resolve: {}
			});

			modalInstance.result.then(() => {
			}, () => {
			});
		};

		// Opens the Mission & Values modal
		$scope.openCommunicationsConsent = function () {
			var modalInstance = $modal.open({
				templateUrl: 'ng-templates/communications-consent.html',
				controller: 'CommunicationsConsentController',
				size: '',
				backdrop: true,
				resolve: {}
			});

			modalInstance.result.then(function () {
			}, function () {
			});
		};

		// Opens the Mission & Values modal
		$scope.openPhotographConsent = function () {
			var modalInstance = $modal.open({
				templateUrl: 'ng-templates/photograph-consent.html',
				controller: 'PhotographConsentController',
				size: '',
				backdrop: true,
				resolve: {}
			});

			modalInstance.result.then(function () {
			}, function () {
			});
		};

		// Open the Fee Structure modal
		$scope.openFeeStructure = function () {
			var modalInstance = $modal.open({
				templateUrl: 'ng-templates/fees.html',
				controller: 'NewMembershipFeeStructureController',
				size: 'sm',
				backdrop: true,
				resolve: {}
			});

			modalInstance.result.then(function () {
			}, function () {
			});
		};
	}]);

angular.module('ttc')
	.controller('NewMembershipFeeStructureController', ['$scope', '$modalInstance',
		function ($scope, $modalInstance) {

			$scope.Close = function () {
				$modalInstance.dismiss('cancel');
			};
		}]);