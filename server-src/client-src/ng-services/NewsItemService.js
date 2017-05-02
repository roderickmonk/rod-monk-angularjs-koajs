"use strict";

// NewsItemService provides a means for the controllers to share access to the news items
angular.module('ttc').factory('NewsItemService', ['$http',
	function ($http) {

		return {
			// Get a new ObjectId to identify the new News Item
			getNewObjectId: () => $http.get('/api/newsitem/objectid')
				.then(response => response.data),

			getAll: () => $http.get('/api/newsitem')
				.then(response => response.data),

			retrieveFiles: (newsitemid) => $http.get(`/api/newsitem/${newsitemid}/files`)
				.then(response => response.data),

			removeNewsItem: (newsitemid) => $http.delete(`/api/newsitem/${newsitemid}`)
				.then(response => response.data),

			publishNewsItem: (newsitem) => $http.post('/api/newsitem/publish', newsitem)
				.then(response => response.data)
		}
	}
]);