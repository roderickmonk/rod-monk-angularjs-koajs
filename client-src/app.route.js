"use strict";

angular.module('ttc').config(['$routeProvider', function ($routeProvider, $scope)
	{
		console.log ('Testing.....');
		
		$routeProvider.when('/Home', {
				templateUrl: '/client-build/ng-components/Home/Home.html',
				controller: 'HomeController'
			})
			.when('/Calendar', {
				templateUrl: '/client-build/ng-components/Calendar/Calendar.html'
			})
			.when('/News', {
				templateUrl: 	'/client-build/ng-components/News/News.html',
				controller: 	'NewsCtrl'
			})
			.when('/SearchMembership', {
				templateUrl: 	'/client-build/ng-components/SearchMembership/SearchMembership.html',
				controller: 	'SearchMembershipCtrl'
			})
			.when('/eBlasts', {
				templateUrl: 	'/client-build/ng-components/eBlasts/eBlasts.html',
				controller: 	'eBlastsCtrl'
			})
			.when('/JuniorProgram', {
				templateUrl: 	'/client-build/ng-components/JuniorProgram/JuniorProgram.html'
			})
			.when('/AdultProgram', {
				templateUrl: 	'/client-build/ng-components/AdultProgram/AdultProgram.html'
			})
			.when('/HowToFindUs', {
				templateUrl: 	'/client-build/ng-components/HowToFindUs/HowToFindUs.html'
			})
			.when('/AboutUs', {
				templateUrl: 	'/client-build/ng-components/AboutUs/AboutUs.html'
			})
			.when('/ContactUs', {
				templateUrl: 	'/client-build/ng-components/ContactUs/ContactUs.html',
				controller: 	'ContactUsController'
			})
			.when('/MemberTable', {
				templateUrl: 	'/client-build/ng-components/MemberTable/MemberTable.html',
				controller: 	'MemberTableController'
			})
			.otherwise({
				redirectTo: '/Home'
			});
    }]);
