"use strict";

angular.module('ttc').controller('NewsCtrl', ['$scope', 'NewsItemService', '$window', ($scope, NewsItemService, $window) => {

	const GetAllNewsItems = () =>
		NewsItemService.getAll()
			.then(NewsItems => $scope.NewsItems = NewsItems)
			.catch($window.alert);

	$scope.RemoveNewsItem = (newsItem) =>
		NewsItemService.removeNewsItem(newsItem._id)
			// Refresh the set of newsitems
			.then(GetAllNewsItems)
			.catch($window.alert);

	GetAllNewsItems();
}]);

angular.module('ttc').controller('NewsItemFilesController', ['$scope', 'NewsItemService', ($scope, NewsItemService) =>

	NewsItemService.retrieveFiles($scope.$parent.NewsItem._id)
		.then(NewsItemFiles => $scope.NewsItemFiles = NewsItemFiles)
]);
