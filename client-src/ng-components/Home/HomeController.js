"use strict";

angular.module('ttc')
	.controller("HomeController", ['$scope', 'MemberService', '$modal', 'NewsItemService',
		function ($scope, MemberService, $modal, NewsItemService) {

			$scope.MemberCount = 0;
			MemberService.countMembers()
				.then(data => $scope.MemberCount = data);

			$scope.onClick = function (points, evt) {
				console.log(points, evt);
			};

			NewsItemService.getAll()
				.then(function (NewsItems) { $scope.NewsItems = NewsItems; });

			// Opens the Mission & Values modal
			$scope.openMissionAndValues = function () {
				var modalInstance = $modal.open({
					templateUrl: '/client-build/ng-templates/mission-and-values.html',
					controller: 'MissionAndValuesController',
					size: '',
					backdrop: true,
					resolve: {}
				});

				modalInstance.result.then(() => {
				}, () => {
				});
			};
		}]);

angular.module('ttc')
	.controller('MissionAndValuesController', ['$scope', '$modalInstance',
		function ($scope, $modalInstance) {

			$scope.Close = function () {
				$modalInstance.dismiss('cancel');
			};
		}]);
