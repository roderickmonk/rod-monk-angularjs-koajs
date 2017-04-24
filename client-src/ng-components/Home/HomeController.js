"use strict";

angular.module('ttc')
.controller("HomeController", ['$scope', 'MemberService', '$modal', '$log', 'NewsItemService',
function ($scope, MemberService, $modal, $log, NewsItemService) {
	
	$scope.MemberCount 	= 		0;
	MemberService.countMembers () 
		.then (data=> {console.log ('data count: ', data); $scope.MemberCount = data;});
	
	$scope.onClick = function (points, evt) {
		console.log(points, evt);
	};
	
	NewsItemService.getAll ()
		.then (function (NewsItems) {$scope.NewsItems = NewsItems;});

	// Opens the Mission & Values modal
	$scope.openMissionAndValues = function () {
		$log.info ('Open Modal');
		var modalInstance = $modal.open({
			templateUrl: '/client-build/ng-templates/mission-and-values.html',
			controller: 'MissionAndValuesController',
			size: '',
			backdrop: true,
			resolve: {}
		});

		modalInstance.result.then(function () {
			$log.info ('Modal closed at: ' + new Date());
		}, function () {
			$log.info ('Modal dismissed at: ' + new Date());
		});
	};
}]);

angular.module('ttc')
.controller('MissionAndValuesController', ['$scope', '$modalInstance',
	function ($scope, $modalInstance) {

		$scope.Close = function () {
			$modalInstance.dismiss ('cancel');
		};
	}]);
