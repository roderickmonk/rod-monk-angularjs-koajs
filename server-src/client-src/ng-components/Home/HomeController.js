"use strict";

angular.module('ttc')
	.controller("HomeController", ['$scope', 'MemberService', '$modal', 'NewsItemService',
		function ($scope, MemberService, $modal, NewsItemService) {

			$scope.MemberCount = 0;
			MemberService.countMembers()
				.then(data => $scope.MemberCount = data);

			$scope.onClick = (points, evt) => {
				console.log(points, evt);
			};

			NewsItemService.getAll()
				.then(newsItems => $scope.NewsItems = newsItems);

			// Opens the Mission & Values modal
			$scope.openMissionAndValues = () => {
				var modalInstance = $modal.open({
					templateUrl: 'ng-templates/mission-and-values.html',
					controller: 'MissionAndValuesController',
					size: '',
					backdrop: true,
					resolve: {}
				});
			};
		}]);

angular.module('ttc')
	.controller('MissionAndValuesController', ['$scope', '$modalInstance',
		function ($scope, $modalInstance) {

			$scope.Close = () => {
				$modalInstance.dismiss('cancel');
			};
		}]);
