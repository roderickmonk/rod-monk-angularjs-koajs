"use strict";

// Controller for the main Index.html page
angular.module('ttc').controller('IndexController', ['$scope', 'UserService', '$modal',
	function ($scope, UserService, $modal) {
		$scope.user = UserService;

		// Opens the modals
		$scope.open = function (whichSize, whichModal, whichController) {
			var modalInstance = $modal.open({
				templateUrl: whichModal,
				controller: whichController,
				size: whichSize,
				backdrop: true,
				resolve: {}
			});

			modalInstance.result.then(function () {
			}, function () {
			});
		};
	}
]);
